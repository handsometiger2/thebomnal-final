import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  getDocFromServer 
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { saveComplexImageToDb, saveHeroImageToDb } from '../utils/indexedDb';

// Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore with specific databaseId if provided
export const db = firebaseConfig.firestoreDatabaseId 
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Connection test as required by Firebase skill
export async function testFirebaseConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection offline, using cached storage.');
    }
  }
}

// Automatic client-side image optimizer for ultra-fast web delivery
export function optimizeImageFile(file: File, maxWidth = 1600, quality = 0.84): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return resolve(e.target?.result as string);
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Export high-quality JPEG (or WebP if supported)
        const optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(optimizedDataUrl);
      };
      img.onerror = () => reject(new Error('이미지를 읽을 수 없습니다.'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('파일 읽기 오류'));
    reader.readAsDataURL(file);
  });
}

// 1. Complexes Firestore Service
export async function saveComplexImageToCloud(complexId: string, imageData: string): Promise<void> {
  // Save to persistent Firestore Cloud Database
  const docRef = doc(db, 'complex_images', complexId);
  await setDoc(docRef, {
    id: complexId,
    imageData,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  // Backup to IndexedDB as well for instant zero-latency loading
  await saveComplexImageToDb(complexId, imageData);
}

export async function loadAllComplexImagesFromCloud(): Promise<Record<string, string>> {
  try {
    const colRef = collection(db, 'complex_images');
    const snapshot = await getDocs(colRef);
    const result: Record<string, string> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.imageData) {
        result[docSnap.id] = data.imageData;
      }
    });
    return result;
  } catch (error) {
    console.error('[Firebase] Failed to load complex images from Firestore:', error);
    return {};
  }
}

// 2. Hero Slideshow Firestore Service
export async function saveHeroImageToCloud(slideId: string, imageData: string): Promise<void> {
  const docRef = doc(db, 'hero_images', slideId);
  await setDoc(docRef, {
    id: slideId,
    imageData,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  await saveHeroImageToDb(slideId, imageData);
}

export async function loadAllHeroImagesFromCloud(): Promise<Record<string, string>> {
  try {
    const colRef = collection(db, 'hero_images');
    const snapshot = await getDocs(colRef);
    const result: Record<string, string> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data && data.imageData) {
        result[docSnap.id] = data.imageData;
      }
    });
    return result;
  } catch (error) {
    console.error('[Firebase] Failed to load hero images from Firestore:', error);
    return {};
  }
}

// 3. Complex Commentary Firestore Service
export interface ComplexCommentData {
  comment1: string;
  comment2: string;
  updatedAt?: string;
}

export async function saveComplexCommentToCloud(
  complexId: string, 
  comment1: string, 
  comment2: string
): Promise<void> {
  const docRef = doc(db, 'complex_comments', complexId);
  await setDoc(docRef, {
    complexId,
    comment1,
    comment2,
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  // Local storage cache backup
  try {
    const raw = localStorage.getItem('bomnal_complex_custom_comments') || '{}';
    const parsed = JSON.parse(raw);
    parsed[complexId] = { comment1, comment2 };
    localStorage.setItem('bomnal_complex_custom_comments', JSON.stringify(parsed));
  } catch (_) {}
}

export async function loadAllComplexCommentsFromCloud(): Promise<Record<string, ComplexCommentData>> {
  try {
    const colRef = collection(db, 'complex_comments');
    const snapshot = await getDocs(colRef);
    const result: Record<string, ComplexCommentData> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data) {
        result[docSnap.id] = {
          comment1: data.comment1 || '',
          comment2: data.comment2 || '',
          updatedAt: data.updatedAt,
        };
      }
    });
    return result;
  } catch (error) {
    console.error('[Firebase] Failed to load complex comments from Firestore:', error);
    try {
      const raw = localStorage.getItem('bomnal_complex_custom_comments');
      return raw ? JSON.parse(raw) : {};
    } catch (_) {
      return {};
    }
  }
}

// Admin PIN Management via Firestore + localStorage fallback
export const DEFAULT_ADMIN_PIN = '5229';

export async function verifyAdminPinCloud(inputPin: string): Promise<boolean> {
  const cleanPin = inputPin.trim();
  if (!cleanPin) return false;

  // Master PIN 5229 is ALWAYS valid unconditionally
  if (cleanPin === '5229' || cleanPin === DEFAULT_ADMIN_PIN) {
    return true;
  }

  try {
    const authDoc = await getDoc(doc(db, 'admin_settings', 'auth'));
    if (authDoc.exists()) {
      const data = authDoc.data();
      if (data?.pin && cleanPin === String(data.pin).trim()) {
        return true;
      }
    }
  } catch (err) {
    console.warn('[Firebase] verifyAdminPinCloud fallback to local:', err);
  }

  // Local storage fallback
  try {
    const localPin = localStorage.getItem('bomnal_custom_admin_pin');
    if (localPin && cleanPin === localPin.trim()) {
      return true;
    }
  } catch (_) {}

  return false;
}

export async function changeAdminPinCloud(newPin: string): Promise<void> {
  const cleanPin = newPin.trim();
  if (!cleanPin || cleanPin.length < 4) {
    throw new Error('새 비밀번호는 4자리 이상이어야 합니다.');
  }

  // 1. Save to Firestore
  try {
    await setDoc(doc(db, 'admin_settings', 'auth'), {
      pin: cleanPin,
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('[Firebase] changeAdminPinCloud error:', err);
  }

  // 2. Save to localStorage
  try {
    localStorage.setItem('bomnal_custom_admin_pin', cleanPin);
  } catch (_) {}
}

// ----------------------------------------------------
// Popup Notice Configuration (Firestore + localStorage)
// ----------------------------------------------------
export type PopupTemplateType = 'electronic_contract' | 'urgent_listing' | 'agency_notice' | 'image_banner';

export interface PopupNoticeConfig {
  isEnabled: boolean;
  templateType: PopupTemplateType;
  activeTemplates?: PopupTemplateType[]; // Multi-slide carousel active templates (e.g. ['urgent_listing', 'agency_notice'])

  // Template 1: Electronic Contract (Default)
  subtitle: string;
  title: string;
  badgeText: string;
  heroTag: string;
  heroTitle: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
  metric3Label: string;
  metric3Value: string;
  bottomNote: string;
  buttonText: string;

  // Template 2: Urgent / Featured Listing
  listingComplexName: string;
  listingSpec: string;
  listingPrice: string;
  listingTag: string;
  listingPoint1: string;
  listingPoint2: string;
  listingPoint3: string;
  listingButtonText: string;

  // Template 3: Agency Editorial Notice
  noticeBadge: string;
  noticeTitle: string;
  noticeSubtitle: string;
  noticeBody: string;
  noticeHighlight: string;
  noticePhone: string;
  noticeButtonText: string;

  // Template 4: Image Poster Banner
  bannerImageUrl: string;
  bannerTitle: string;
  bannerButtonText: string;
  bannerButtonLink: string;

  updatedAt?: string;
}

export const DEFAULT_POPUP_CONFIG: PopupNoticeConfig = {
  isEnabled: false, // 기본값: 팝업 노출 끄기 (필요할 때만 켜기)
  templateType: 'electronic_contract',
  subtitle: '더 안전하고 스마트한 비대면 안심 계약',
  title: '부동산 전자계약',
  badgeText: '국토교통부 전자계약시스템 연계',
  heroTag: '비대면 안심 계약 혜택',
  heroTitle: '전자계약 진행 시 대출 우대금리 & 확정일자 자동 부여',
  metric1Label: '대출 우대금리',
  metric1Value: '0.1~0.2%p↓',
  metric2Label: '확정일자 부여',
  metric2Value: '무료 자동',
  metric3Label: '',
  metric3Value: '',
  bottomNote: '비대면 전자서명 가능',
  buttonText: '전자계약 안심 상담 바로가기',

  // Template 2 defaults
  listingComplexName: 'e편한세상월배',
  listingSpec: '114㎡ (34평형) · 105동 고층 로얄동',
  listingPrice: '매매 5억 8,000만원',
  listingTag: '신월성 초품아 급매 추천 매물',
  listingPoint1: '남향 판상형 4Bay 풍부한 일조량과 채광',
  listingPoint2: '주인 직접 거주로 내부 최상급 올확장 리모델링',
  listingPoint3: '월암초 도보 2분 안전 통학로 및 즉시 입주 협의',
  listingButtonText: '해당 추천 매물 상세 상담 바로가기',

  // Template 3 defaults
  noticeBadge: '봄날공인중개사 공식 안내',
  noticeTitle: '신월성 아파트 1:1 심층 브리핑 사전 예약제',
  noticeSubtitle: '더 정확하고 정밀한 빅데이터 시세 분석 및 세무 상담을 위해 운영됩니다.',
  noticeBody: '봄날공인중개사사무소는 고객 한 분 한 분께 신뢰할 수 있는 최적의 주거 매물을 제안해 드리고자 1:1 맞춤 사전 예약제를 실시합니다. 방문 전 미리 연락해 주시면 원하시는 단지 및 평형별 최신 실거래 비교 자료를 미리 준비해 드립니다.',
  noticeHighlight: '상담 가능 시간: 월~토 10:30~19:30 (일요일 및 야간 사전 예약 가능)',
  noticePhone: '053-642-0008',
  noticeButtonText: '대표 공인중개사 1:1 상담 예약하기',

  // Template 4 defaults
  bannerImageUrl: '',
  bannerTitle: '봄날공인중개사사무소 안내',
  bannerButtonText: '자세히 보기',
  bannerButtonLink: '#contact',
};

const POPUP_CONFIG_STORAGE_KEY = 'bomnal_popup_custom_config';

export async function loadPopupConfigFromCloud(): Promise<PopupNoticeConfig> {
  // 1. Try Firestore
  try {
    const snap = await getDoc(doc(db, 'admin_settings', 'popup'));
    if (snap.exists()) {
      const data = snap.data() as Partial<PopupNoticeConfig>;
      const merged: PopupNoticeConfig = {
        ...DEFAULT_POPUP_CONFIG,
        ...data,
      };
      try {
        localStorage.setItem(POPUP_CONFIG_STORAGE_KEY, JSON.stringify(merged));
      } catch (_) {}
      return merged;
    }
  } catch (err) {
    console.warn('[Firebase] Failed to load popup config from Firestore:', err);
  }

  // 2. Try localStorage
  try {
    const raw = localStorage.getItem(POPUP_CONFIG_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_POPUP_CONFIG, ...JSON.parse(raw) };
    }
  } catch (_) {}

  return DEFAULT_POPUP_CONFIG;
}

export async function savePopupConfigToCloud(config: PopupNoticeConfig): Promise<void> {
  const payload = {
    ...config,
    updatedAt: new Date().toISOString(),
  };

  // 1. Save to Firestore
  try {
    await setDoc(doc(db, 'admin_settings', 'popup'), payload, { merge: true });
  } catch (err) {
    console.error('[Firebase] Failed to save popup config to Firestore:', err);
  }

  // 2. Save to localStorage
  try {
    localStorage.setItem(POPUP_CONFIG_STORAGE_KEY, JSON.stringify(payload));
  } catch (_) {}
}


