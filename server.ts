import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Allow large payload for high-res photo uploads (up to 50MB)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Ensure upload directories exist
const complexUploadDir = path.resolve(__dirname, 'public', 'complexes');
if (!fs.existsSync(complexUploadDir)) {
  fs.mkdirSync(complexUploadDir, { recursive: true });
}
const heroUploadDir = path.resolve(__dirname, 'public', 'hero');
if (!fs.existsSync(heroUploadDir)) {
  fs.mkdirSync(heroUploadDir, { recursive: true });
}

// Statically serve uploaded images
app.use('/complexes', express.static(complexUploadDir));
app.use('/hero', express.static(heroUploadDir));

// Admin PIN Management (server-side only, no client leak)
const CONFIG_FILE = path.resolve(__dirname, '.admin-config.json');

function getValidPins(): string[] {
  let customPin = '';
  if (fs.existsSync(CONFIG_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
      if (data.adminPin) customPin = String(data.adminPin);
    } catch (_) {}
  }
  const defaultPin = process.env.ADMIN_PIN || '5229';
  return [customPin, defaultPin].filter(Boolean);
}

// API: Verify Admin PIN
app.post('/api/verify-admin-pin', (req, res) => {
  const { pin } = req.body;
  const valid = getValidPins().includes(String(pin || '').trim());
  if (valid) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, error: '비밀번호가 일치하지 않습니다.' });
});

// API: Change Admin PIN
app.post('/api/change-admin-pin', (req, res) => {
  const { currentPin, newPin } = req.body;
  if (!getValidPins().includes(String(currentPin || '').trim())) {
    return res.status(401).json({ error: '현재 비밀번호가 일치하지 않습니다.' });
  }
  if (!newPin || String(newPin).trim().length < 4) {
    return res.status(400).json({ error: '새 비밀번호는 4자리 이상이어야 합니다.' });
  }
  fs.writeFileSync(CONFIG_FILE, JSON.stringify({ adminPin: String(newPin).trim() }), 'utf-8');
  return res.json({ success: true });
});

// Helper: Save Base64 Image File
function saveBase64Image(dataUrl: string, targetDir: string, filenamePrefix: string): string {
  const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid dataUrl format');
  }

  const ext = matches[1].includes('png') ? '.png' : '.jpg';
  const safeFilename = `${filenamePrefix}${ext}`;
  const filePath = path.join(targetDir, safeFilename);

  const buffer = Buffer.from(matches[2], 'base64');
  fs.writeFileSync(filePath, buffer);

  // Mirror to dist if dist exists
  const distDir = path.resolve(__dirname, 'dist', path.basename(targetDir));
  if (!fs.existsSync(distDir)) {
    try { fs.mkdirSync(distDir, { recursive: true }); } catch (_) {}
  }
  if (fs.existsSync(distDir)) {
    try { fs.writeFileSync(path.join(distDir, safeFilename), buffer); } catch (_) {}
  }

  return safeFilename;
}

// API: Upload complex image (Protected with Admin PIN)
app.post('/api/upload-complex-image', (req, res) => {
  try {
    const { complexId, filename, dataUrl, adminPin } = req.body;
    const reqPin = req.headers['x-admin-pin'] || adminPin;

    if (!reqPin || !getValidPins().includes(String(reqPin).trim())) {
      return res.status(401).json({ error: '관리자 인증 실패: 접근 권한이 없습니다.' });
    }

    if (!complexId || !dataUrl) {
      return res.status(400).json({ error: 'Missing complexId or dataUrl' });
    }

    const safeFilename = saveBase64Image(dataUrl, complexUploadDir, complexId);
    console.log(`[Upload] Saved complex image for ${complexId}: ${safeFilename}`);

    return res.json({ 
      success: true, 
      imageUrl: `/complexes/${safeFilename}?v=${Date.now()}` 
    });
  } catch (err: any) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// API: List uploaded complex images
app.get('/api/complex-images', (req, res) => {
  try {
    if (!fs.existsSync(complexUploadDir)) {
      return res.json({ images: {} });
    }
    const files = fs.readdirSync(complexUploadDir);
    const images: Record<string, string> = {};
    for (const file of files) {
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        const id = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
        images[id] = `/complexes/${file}`;
      }
    }
    return res.json({ images });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// API: Upload Hero Slide image (Protected with Admin PIN)
app.post('/api/upload-hero-image', (req, res) => {
  try {
    const { slideId, dataUrl, adminPin } = req.body;
    const reqPin = req.headers['x-admin-pin'] || adminPin;

    if (!reqPin || !getValidPins().includes(String(reqPin).trim())) {
      return res.status(401).json({ error: '관리자 인증 실패: 접근 권한이 없습니다.' });
    }

    if (!slideId || !dataUrl) {
      return res.status(400).json({ error: 'Missing slideId or dataUrl' });
    }

    const safeFilename = saveBase64Image(dataUrl, heroUploadDir, slideId);
    console.log(`[Upload] Saved hero image for ${slideId}: ${safeFilename}`);

    return res.json({ 
      success: true, 
      imageUrl: `/hero/${safeFilename}?v=${Date.now()}` 
    });
  } catch (err: any) {
    console.error('Hero upload error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

// API: List uploaded hero images
app.get('/api/hero-images', (req, res) => {
  try {
    if (!fs.existsSync(heroUploadDir)) {
      return res.json({ images: {} });
    }
    const files = fs.readdirSync(heroUploadDir);
    const images: Record<string, string> = {};
    for (const file of files) {
      if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
        const id = file.replace(/\.(jpg|jpeg|png|webp)$/i, '');
        images[id] = `/hero/${file}`;
      }
    }
    return res.json({ images });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

// API: Upload custom OG Share Image (KakaoTalk / SNS thumbnail)
app.post('/api/upload-og-image', (req, res) => {
  try {
    const { dataUrl } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ error: 'Missing dataUrl' });
    }
    const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ error: 'Invalid dataUrl format' });
    }
    const buffer = Buffer.from(matches[2], 'base64');
    
    // Save to public
    const pubOgJpg = path.resolve(__dirname, 'public', 'og-image.jpg');
    const pubOgPng = path.resolve(__dirname, 'public', 'og-image.png');
    const pubCard1 = path.resolve(__dirname, 'public', 'card1.jpg');
    fs.writeFileSync(pubOgJpg, buffer);
    fs.writeFileSync(pubOgPng, buffer);
    fs.writeFileSync(pubCard1, buffer);

    // Also sync to dist if present
    const distDir = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distDir)) {
      try {
        fs.writeFileSync(path.resolve(distDir, 'og-image.jpg'), buffer);
        fs.writeFileSync(path.resolve(distDir, 'og-image.png'), buffer);
        fs.writeFileSync(path.resolve(distDir, 'card1.jpg'), buffer);
      } catch (_) {}
    }

    console.log('[Upload] Saved custom og-image / card1 successfully');
    return res.json({ success: true, imageUrl: `/og-image.jpg?v=${Date.now()}` });
  } catch (err: any) {
    console.error('OG image upload error:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  const portNum = Number(PORT) || 3000;
  app.listen(portNum, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${portNum}`);
  });
}

startServer();
