import React, { useState, useEffect } from 'react';
import { BomnalHeader } from './components/BomnalHeader';
import { BomnalCoverStory } from './components/BomnalCoverStory';
import { BomnalSpacesSection } from './components/BomnalSpacesSection';
import { BomnalDirectorInterview } from './components/BomnalDirectorInterview';
import { BomnalContactSection } from './components/BomnalContactSection';
import { BomnalFooter } from './components/BomnalFooter';
import { FloatingActionBar } from './components/FloatingActionBar';
import { BomnalNoticeModal } from './components/BomnalNoticeModal';
import { ComplexImageManagerModal } from './components/ComplexImageManagerModal';
import { ApartmentComplex } from './types';
import { loadAllComplexImagesFromDb, loadAllHeroImagesFromDb } from './utils/indexedDb';
import { 
  loadAllComplexImagesFromCloud, 
  loadAllHeroImagesFromCloud, 
  loadAllComplexCommentsFromCloud,
  ComplexCommentData,
  testFirebaseConnection,
  PopupNoticeConfig,
  DEFAULT_POPUP_CONFIG,
  loadPopupConfigFromCloud
} from './services/firebaseMedia';

const STORAGE_KEY = 'bomnal_complex_custom_images';
const HERO_STORAGE_KEY = 'bomnal_hero_custom_images';
const COMMENTS_STORAGE_KEY = 'bomnal_complex_custom_comments';

export default function App() {
  const [selectedComplexModal, setSelectedComplexModal] = useState<ApartmentComplex | null>(null);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [adminInitialTab, setAdminInitialTab] = useState<'complexes' | 'hero' | 'comments' | 'popup'>('complexes');
  const [adminInitialComplexId, setAdminInitialComplexId] = useState<string>('epyeonhan-wolbae');

  // Popup notice configuration
  const [popupConfig, setPopupConfig] = useState<PopupNoticeConfig>(DEFAULT_POPUP_CONFIG);
  const [isPreviewPopupOpen, setIsPreviewPopupOpen] = useState(false);

  // Complexes images
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Hero slideshow images
  const [customHeroImages, setCustomHeroImages] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem(HERO_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Complex briefing comments
  const [customComments, setCustomComments] = useState<Record<string, ComplexCommentData>>(() => {
    try {
      const saved = localStorage.getItem(COMMENTS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Sync with Google Cloud Firestore (Permanent) & IndexedDB (Zero-latency offline cache)
  useEffect(() => {
    // 0. Verify connection
    testFirebaseConnection();

    // 1. Load from persistent Google Cloud Firestore (Primary permanent cloud source)
    loadAllComplexImagesFromCloud().then((cloudImages) => {
      if (cloudImages && Object.keys(cloudImages).length > 0) {
        setCustomImages((prev) => ({ ...prev, ...cloudImages }));
      }
    });

    loadAllHeroImagesFromCloud().then((cloudHero) => {
      if (cloudHero && Object.keys(cloudHero).length > 0) {
        setCustomHeroImages((prev) => ({ ...prev, ...cloudHero }));
      }
    });

    loadAllComplexCommentsFromCloud().then((cloudComments) => {
      if (cloudComments && Object.keys(cloudComments).length > 0) {
        setCustomComments((prev) => ({ ...prev, ...cloudComments }));
      }
    });

    loadPopupConfigFromCloud().then((cloudPopup) => {
      if (cloudPopup) {
        setPopupConfig(cloudPopup);
      }
    });

    // 2. Also load from local IndexedDB for immediate zero-latency rendering
    loadAllComplexImagesFromDb().then((dbImages) => {
      if (dbImages && Object.keys(dbImages).length > 0) {
        setCustomImages((prev) => ({ ...dbImages, ...prev }));
      }
    });

    loadAllHeroImagesFromDb().then((dbHero) => {
      if (dbHero && Object.keys(dbHero).length > 0) {
        setCustomHeroImages((prev) => ({ ...dbHero, ...prev }));
      }
    });

    // 3. Fallback static server check
    fetch('/api/complex-images')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.images && Object.keys(data.images).length > 0) {
          setCustomImages((prev) => ({ ...data.images, ...prev }));
        }
      })
      .catch(() => {});

    fetch('/api/hero-images')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.images && Object.keys(data.images).length > 0) {
          setCustomHeroImages((prev) => ({ ...data.images, ...prev }));
        }
      })
      .catch(() => {});
  }, []);

  // Keyboard shortcut & URL hash listener: supports Korean/English layout, Alt+A, Ctrl+Shift+A, F2, or #admin
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in a form input or textarea unless it's an admin hotkey
      const target = e.target as HTMLElement | null;
      const isInput = target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);
      
      const isKeyA = e.code === 'KeyA' || e.key?.toLowerCase() === 'a' || e.key === 'ㅁ';
      const isKeyM = e.code === 'KeyM' || e.key?.toLowerCase() === 'm' || e.key === 'ㅡ';

      // 1. F2 key (simple 1-touch admin toggle)
      if (e.key === 'F2') {
        e.preventDefault();
        setIsImageManagerOpen((prev) => !prev);
        return;
      }

      // 2. Alt + A or Alt + M
      if (e.altKey && (isKeyA || isKeyM)) {
        e.preventDefault();
        setIsImageManagerOpen((prev) => !prev);
        return;
      }

      // 3. Ctrl + Shift + A or Cmd + Shift + A (Mac) or Ctrl + Shift + M
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (isKeyA || isKeyM)) {
        e.preventDefault();
        setIsImageManagerOpen((prev) => !prev);
        return;
      }
    };

    // 4. URL hash check: visiting url with #admin opens admin modal
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        setIsImageManagerOpen(true);
        // Clear hash without reload
        try {
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        } catch (_) {}
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', checkHash);
    };
  }, []);

  const handleImageUpdated = (complexId: string, newUrl: string) => {
    setCustomImages((prev) => {
      const next = { ...prev, [complexId]: newUrl };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
      return next;
    });

    setSelectedComplexModal((prev) => {
      if (prev && prev.id === complexId) {
        return { ...prev, image: newUrl };
      }
      return prev;
    });
  };

  const handleHeroImageUpdated = (slideId: string, newUrl: string) => {
    setCustomHeroImages((prev) => {
      const next = { ...prev, [slideId]: newUrl };
      try { localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };

  const handleCommentUpdated = (complexId: string, comment1: string, comment2: string) => {
    setCustomComments((prev) => {
      const next = { 
        ...prev, 
        [complexId]: { comment1, comment2, updatedAt: new Date().toISOString() } 
      };
      try { localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(next)); } catch (_) {}
      return next;
    });
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSpaces = () => {
    const el = document.getElementById('spaces');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectComplexFromHeader = (complex: ApartmentComplex) => {
    const enriched = {
      ...complex,
      image: customImages[complex.id] || complex.image,
    };
    setSelectedComplexModal(enriched);
    scrollToSpaces();
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#141414] flex flex-col font-sans-clean selection:bg-[#7A0016] selection:text-white">
      {/* 0. Notice Announcement Popup */}
      <BomnalNoticeModal 
        customConfig={popupConfig}
        forceOpen={isPreviewPopupOpen}
        onClosePreview={() => setIsPreviewPopupOpen(false)}
      />

      {/* 0.1 Protected Media Manager Modal (Complexes Photos, Hero Slides, Briefing Comments, and Popup Notice) */}
      <ComplexImageManagerModal
        isOpen={isImageManagerOpen}
        onClose={() => setIsImageManagerOpen(false)}
        customImages={customImages}
        onImageUpdated={handleImageUpdated}
        customHeroImages={customHeroImages}
        onHeroImageUpdated={handleHeroImageUpdated}
        customComments={customComments}
        onCommentUpdated={handleCommentUpdated}
        popupConfig={popupConfig}
        onUpdatePopupConfig={(newCfg) => setPopupConfig(newCfg)}
        onPreviewPopup={() => setIsPreviewPopupOpen(true)}
        initialTab={adminInitialTab}
        initialCommentComplexId={adminInitialComplexId}
      />

      {/* 1. Bomnal Grand Editorial Masthead & Navigation */}
      <BomnalHeader 
        onOpenConsult={scrollToContact} 
        onSelectComplex={handleSelectComplexFromHeader}
      />

      <main className="flex-1 w-full">
        {/* 2. Bomnal Cover Story (with dynamic custom hero slideshow) */}
        <BomnalCoverStory
          onExploreSpaces={scrollToSpaces}
          onOpenConsult={scrollToContact}
          customHeroImages={customHeroImages}
        />

        {/* 3. Bomnal Spaces & Architecture */}
        <BomnalSpacesSection
          onSelectComplexForConsult={() => scrollToContact()}
          selectedComplex={selectedComplexModal}
          onCloseComplexModal={() => setSelectedComplexModal(null)}
          onOpenComplexModal={(complex) => {
            const enriched = {
              ...complex,
              image: customImages[complex.id] || complex.image,
            };
            setSelectedComplexModal(enriched);
          }}
          customImages={customImages}
          customComments={customComments}
        />

        {/* 4. Bomnal People & Curator (장순조 대표 인터뷰) */}
        <BomnalDirectorInterview onOpenConsult={scrollToContact} />

        {/* 5. Bomnal Contact & Location (지도, 연락처, 오시는 길) */}
        <BomnalContactSection />
      </main>

      {/* 6. Bomnal Editorial Publication Footer */}
      <BomnalFooter onOpenAdmin={() => {
        setAdminInitialTab('complexes');
        setIsImageManagerOpen(true);
      }} />

      {/* 7. Minimalist Mobile Floating Bar */}
      <FloatingActionBar onOpenConsult={scrollToContact} />
    </div>
  );
}
