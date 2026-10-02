/**
 * IndexedDB storage for Bomnal Estate images.
 * Provides permanent, client-side storage that survives Cloud Run container restarts.
 */

const DB_NAME = 'BomnalEstateMediaDB';
const DB_VERSION = 1;
const COMPLEX_STORE = 'complex_images';
const HERO_STORE = 'hero_images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(COMPLEX_STORE)) {
        db.createObjectStore(COMPLEX_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(HERO_STORE)) {
        db.createObjectStore(HERO_STORE, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveComplexImageToDb(id: string, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(COMPLEX_STORE, 'readwrite');
      const store = tx.objectStore(COMPLEX_STORE);
      store.put({ id, dataUrl, updatedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('[IndexedDB] Failed to save complex image:', e);
  }
}

export async function loadAllComplexImagesFromDb(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(COMPLEX_STORE, 'readonly');
      const store = tx.objectStore(COMPLEX_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const result: Record<string, string> = {};
        if (Array.isArray(req.result)) {
          for (const item of req.result) {
            if (item.id && item.dataUrl) {
              result[item.id] = item.dataUrl;
            }
          }
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

export async function saveHeroImageToDb(id: string, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(HERO_STORE, 'readwrite');
      const store = tx.objectStore(HERO_STORE);
      store.put({ id, dataUrl, updatedAt: Date.now() });
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (e) {
    console.warn('[IndexedDB] Failed to save hero image:', e);
  }
}

export async function loadAllHeroImagesFromDb(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(HERO_STORE, 'readonly');
      const store = tx.objectStore(HERO_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const result: Record<string, string> = {};
        if (Array.isArray(req.result)) {
          for (const item of req.result) {
            if (item.id && item.dataUrl) {
              result[item.id] = item.dataUrl;
            }
          }
        }
        resolve(result);
      };
      req.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}
