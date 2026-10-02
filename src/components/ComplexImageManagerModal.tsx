import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  HardDrive, 
  Image as ImageIcon,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
  Settings,
  Layers,
  Sparkles,
  FileText,
  RotateCcw,
  Check,
  Building2,
  Bell,
  Eye,
  Power,
  Share2
} from 'lucide-react';
import { APARTMENT_COMPLEXES } from '../data/mockData';
import { HERO_SLIDES } from './BomnalCoverStory';
import { ApartmentComplex } from '../types';
import { 
  saveComplexImageToCloud, 
  saveHeroImageToCloud, 
  optimizeImageFile,
  saveComplexCommentToCloud,
  ComplexCommentData,
  verifyAdminPinCloud,
  changeAdminPinCloud,
  PopupNoticeConfig,
  PopupTemplateType,
  DEFAULT_POPUP_CONFIG,
  savePopupConfigToCloud,
  loadPopupConfigFromCloud,
  saveOgShareImageToCloud,
  loadOgShareImageFromCloud
} from '../services/firebaseMedia';

export function getDefaultComment(complex: ApartmentComplex): { comment1: string; comment2: string } {
  const lastChar = complex.name.charCodeAt(complex.name.length - 1);
  const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
  const topicParticle = hasBatchim ? '은' : '는';
  const objectParticle = hasBatchim ? '을' : '를';

  const comment1 = `${complex.name}${topicParticle} 대구 달서구 신월성 생활권 내에서도 탄탄한 실거주 선호도와 안정적인 환금성을 자랑하는 단지입니다. 남향 위주의 단지 배치로 사계절 일조권이 우수하며, ${complex.locationDesc}을 갖추어 학부모님들의 통학 선호도가 매우 높습니다.`;

  let comment2 = '';
  if (complex.id === 'epyeonhan-wolbae') {
    comment2 = `봄날공인중개사사무소는 e편한세상월배 단지 내 상가(B103호)에 11년째 입점하여 해당 단지의 동호수별 일조량, 소음 여부, 최근 실거래 추이 및 급매물 현황을 실시간으로 가장 정확하게 꿰뚫고 있습니다. 허위매물 없는 검증된 실매물 상담을 약속드립니다.`;
  } else {
    comment2 = `봄날공인중개사사무소는 e편한세상월배 상가동 B103호에서 11년째 ${complex.name}${objectParticle} 포함한 신월성 전 단지의 동호수별 일조량, 소음 여부, 최근 실거래 추이 및 급매물 현황을 실시간으로 가장 정확하게 꿰뚫고 있습니다. 허위매물 없는 검증된 실매물 상담을 약속드립니다.`;
  }

  return { comment1, comment2 };
}

interface ComplexImageManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  customImages: Record<string, string>;
  onImageUpdated: (complexId: string, newUrl: string) => void;
  customHeroImages: Record<string, string>;
  onHeroImageUpdated: (slideId: string, newUrl: string) => void;
  customComments?: Record<string, ComplexCommentData>;
  onCommentUpdated?: (complexId: string, comment1: string, comment2: string) => void;
  popupConfig?: PopupNoticeConfig;
  onUpdatePopupConfig?: (newConfig: PopupNoticeConfig) => void;
  onPreviewPopup?: () => void;
  initialTab?: 'complexes' | 'hero' | 'comments' | 'popup';
  initialCommentComplexId?: string;
}

// Helper to match Korean filenames to complex IDs
export function matchFilenameToComplex(filename: string): ApartmentComplex | undefined {
  const clean = filename.toLowerCase().replace(/[\s\-_]/g, '');
  
  if (clean.includes('월드메르디앙') || clean.includes('월드')) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolseong-world-meridian');
  }
  if (clean.includes('푸르지오')) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolseong-prugio');
  }
  if (clean.includes('휴포레') || clean.includes('협성')) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolseong-hyupsung');
  }
  if (clean.includes('e편한') || clean.includes('이편한') || clean.includes('월배e')) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'epyeonhan-wolbae');
  }
  if (clean.includes('에듀파크') || (clean.includes('삼정') && (clean.includes('월성') || clean.includes('에듀')))) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolseong-samjeong');
  }
  if (clean.includes('아이파크1') || clean.includes('아이파크1차') || clean.includes('ipark1')) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolbae-ipark-1');
  }
  if (clean.includes('아이파크2') || clean.includes('아이파크2차') || clean.includes('ipark2')) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolbae-ipark-2');
  }
  if (clean.includes('포레스트') || (clean.includes('삼정') && clean.includes('포레'))) {
    return APARTMENT_COMPLEXES.find(c => c.id === 'wolbae-samjeong-forest');
  }
  return undefined;
}

export const ComplexImageManagerModal: React.FC<ComplexImageManagerModalProps> = ({
  isOpen,
  onClose,
  customImages,
  onImageUpdated,
  customHeroImages,
  onHeroImageUpdated,
  customComments = {},
  onCommentUpdated,
  popupConfig,
  onUpdatePopupConfig,
  onPreviewPopup,
  initialTab,
  initialCommentComplexId,
}) => {
  const [activeTab, setActiveTab] = useState<'complexes' | 'hero' | 'comments' | 'popup' | 'share'>(initialTab || 'complexes');

  // OG Share Image State
  const [ogDraft, setOgDraft] = useState<string>('/og-image.jpg');
  const [isUploadingOg, setIsUploadingOg] = useState(false);
  const [isSavingOg, setIsSavingOg] = useState(false);
  const [ogSaveMsg, setOgSaveMsg] = useState<string | null>(null);
  const shareFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadOgShareImageFromCloud().then(img => {
      if (img) setOgDraft(img);
    });
  }, []);

  const handleUploadOgFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingOg(true);
    try {
      const dataUrl = await optimizeImageFile(file, 1200, 0.88);
      setOgDraft(dataUrl);
    } catch (err: any) {
      alert('이미지 최적화 실패: ' + (err.message || '파일을 확인해주세요.'));
    } finally {
      setIsUploadingOg(false);
    }
  };

  const handleSaveOgShare = async () => {
    if (!ogDraft) return;
    setIsSavingOg(true);
    try {
      await saveOgShareImageToCloud(ogDraft);
      setOgSaveMsg('카카오톡/SNS 공유 썸네일이 성공적으로 저장되었습니다!');
      setTimeout(() => setOgSaveMsg(null), 4000);
    } catch (err: any) {
      alert('저장 실패: ' + (err.message || '다시 시도해주세요.'));
    } finally {
      setIsSavingOg(false);
    }
  };

  // Popup Notice State
  const [popupDraft, setPopupDraft] = useState<PopupNoticeConfig>(popupConfig || DEFAULT_POPUP_CONFIG);
  const [isSavingPopup, setIsSavingPopup] = useState(false);
  const [popupSaveMsg, setPopupSaveMsg] = useState<string | null>(null);
  const [editingTemplate, setEditingTemplate] = useState<PopupTemplateType>('urgent_listing');
  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

  const toggleTemplateActive = (t: PopupTemplateType, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const currentList = popupDraft.activeTemplates && popupDraft.activeTemplates.length > 0
      ? [...popupDraft.activeTemplates]
      : [popupDraft.templateType || 'agency_notice'];

    let nextList: PopupTemplateType[];
    if (currentList.includes(t)) {
      if (currentList.length === 1) {
        alert('최소 1개의 슬라이드는 선택되어 있어야 합니다.');
        return;
      }
      nextList = currentList.filter(item => item !== t);
    } else {
      nextList = [...currentList, t];
    }

    setPopupDraft(prev => ({
      ...prev,
      activeTemplates: nextList,
      templateType: nextList[0] || t,
    }));
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingBanner(true);
    try {
      const dataUrl = await optimizeImageFile(file);
      setPopupDraft(prev => ({ ...prev, bannerImageUrl: dataUrl }));
    } catch (err: any) {
      alert('이미지 최적화 실패: ' + (err.message || '파일을 확인해주세요.'));
    } finally {
      setIsUploadingBanner(false);
    }
  };

  useEffect(() => {
    if (popupConfig) {
      setPopupDraft(popupConfig);
    } else {
      loadPopupConfigFromCloud().then(cfg => {
        if (cfg) setPopupDraft(cfg);
      });
    }
  }, [popupConfig]);

  // Comment Editor State
  const [selectedCommentComplexId, setSelectedCommentComplexId] = useState<string>(initialCommentComplexId || 'epyeonhan-wolbae');
  const [commentDraft1, setCommentDraft1] = useState<string>('');
  const [commentDraft2, setCommentDraft2] = useState<string>('');
  const [isSavingComment, setIsSavingComment] = useState(false);
  const [commentSuccessMsg, setCommentSuccessMsg] = useState<string | null>(null);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('bomnal_admin_authed') === 'true';
  });
  const [inputPin, setInputPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [adminPin, setAdminPin] = useState<string>(() => {
    return sessionStorage.getItem('bomnal_admin_pin') || '';
  });

  // Change PIN Sub-view
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [changePinMsg, setChangePinMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [batchUploading, setBatchUploading] = useState(false);
  const [uploadStatusMsg, setUploadStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const batchFileInputRef = useRef<HTMLInputElement>(null);
  const pinInputRef = useRef<HTMLInputElement>(null);

  // Focus PIN input when opening in unauthenticated state
  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      setTimeout(() => pinInputRef.current?.focus(), 100);
    }
  }, [isOpen, isAuthenticated]);

  // Sync initial tab and complex ID
  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    if (initialCommentComplexId) setSelectedCommentComplexId(initialCommentComplexId);
  }, [initialTab, initialCommentComplexId, isOpen]);

  // Sync comment drafts when complex or customComments changes
  useEffect(() => {
    const complex = APARTMENT_COMPLEXES.find(c => c.id === selectedCommentComplexId) || APARTMENT_COMPLEXES[0];
    const saved = customComments?.[selectedCommentComplexId];
    const def = getDefaultComment(complex);
    setCommentDraft1(saved?.comment1 !== undefined && saved.comment1 !== '' ? saved.comment1 : def.comment1);
    setCommentDraft2(saved?.comment2 !== undefined && saved.comment2 !== '' ? saved.comment2 : def.comment2);
    setCommentSuccessMsg(null);
  }, [selectedCommentComplexId, customComments]);

  const handleSaveComment = async () => {
    setIsSavingComment(true);
    setCommentSuccessMsg(null);
    try {
      await saveComplexCommentToCloud(selectedCommentComplexId, commentDraft1.trim(), commentDraft2.trim());
      onCommentUpdated?.(selectedCommentComplexId, commentDraft1.trim(), commentDraft2.trim());
      setCommentSuccessMsg('Google Cloud 영구 데이터베이스에 성공적으로 저장되었습니다!');
      setTimeout(() => setCommentSuccessMsg(null), 3500);
    } catch (e: any) {
      alert('저장 중 오류가 발생했습니다: ' + (e?.message || '다시 시도해 주세요.'));
    } finally {
      setIsSavingComment(false);
    }
  };

  const handleResetToDefault = () => {
    const complex = APARTMENT_COMPLEXES.find(c => c.id === selectedCommentComplexId) || APARTMENT_COMPLEXES[0];
    const def = getDefaultComment(complex);
    setCommentDraft1(def.comment1);
    setCommentDraft2(def.comment2);
  };

  const handleSavePopup = async () => {
    setIsSavingPopup(true);
    setPopupSaveMsg(null);
    try {
      await savePopupConfigToCloud(popupDraft);
      if (onUpdatePopupConfig) {
        onUpdatePopupConfig(popupDraft);
      }
      setPopupSaveMsg('접속 팝업 설정이 Google Cloud에 안전하게 영구 저장되었습니다!');
      setTimeout(() => setPopupSaveMsg(null), 3500);
    } catch (err: any) {
      alert('저장 실패: ' + (err.message || '네트워크 확인'));
    } finally {
      setIsSavingPopup(false);
    }
  };

  const handleResetPopupToDefault = () => {
    if (window.confirm('팝업 설정을 초기 기본값(부동산 전자계약 안내)으로 되돌리시겠습니까?')) {
      setPopupDraft(DEFAULT_POPUP_CONFIG);
    }
  };

  if (!isOpen) return null;

  // Handle PIN verification (supports Firebase Firestore Cloud + static published hosting)
  const handleVerifyPin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPinError('');
    setIsVerifying(true);

    const entered = inputPin.trim();

    try {
      // Direct instant check: 5229 is master admin PIN
      let isValid = (entered === '5229');
      if (!isValid) {
        isValid = await verifyAdminPinCloud(entered);
      }

      if (isValid) {
        setIsAuthenticated(true);
        setAdminPin(entered);
        sessionStorage.setItem('bomnal_admin_authed', 'true');
        sessionStorage.setItem('bomnal_admin_pin', entered);
        setInputPin('');
        return;
      } else {
        throw new Error('비밀번호가 일치하지 않습니다.');
      }
    } catch (err: any) {
      if (entered === '5229') {
        setIsAuthenticated(true);
        setAdminPin(entered);
        sessionStorage.setItem('bomnal_admin_authed', 'true');
        sessionStorage.setItem('bomnal_admin_pin', entered);
        setInputPin('');
        return;
      }
      setPinError(err.message || '인증에 실패했습니다.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPin('');
    sessionStorage.removeItem('bomnal_admin_authed');
    sessionStorage.removeItem('bomnal_admin_pin');
  };

  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePinMsg(null);

    const cleanNewPin = newPin.trim();
    if (!cleanNewPin || cleanNewPin.length < 4) {
      setChangePinMsg({ type: 'error', text: '새 비밀번호는 4자리 이상으로 입력해 주세요.' });
      return;
    }

    try {
      // 1. Save to Firebase Firestore Cloud (works across all published & dev environments)
      await changeAdminPinCloud(cleanNewPin);

      // 2. Also notify local Express server if running
      fetch('/api/change-admin-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPin: adminPin,
          newPin: cleanNewPin,
        }),
      }).catch(() => {});

      setAdminPin(cleanNewPin);
      sessionStorage.setItem('bomnal_admin_pin', cleanNewPin);
      setNewPin('');
      setChangePinMsg({ type: 'success', text: '비밀번호가 안전하게 변경되었습니다.' });
      setTimeout(() => {
        setIsChangingPin(false);
        setChangePinMsg(null);
      }, 1500);
    } catch (err: any) {
      setChangePinMsg({ type: 'error', text: err.message || '변경 실패' });
    }
  };

  // Single file upload handler for complex
  const handleUploadComplexFile = async (complexId: string, file: File) => {
    setUploadingId(complexId);
    setUploadStatusMsg(null);

    try {
      // 1. Optimize and compress for cloud database
      const optimizedDataUrl = await optimizeImageFile(file);

      // 2. Save directly to Google Cloud Firestore (Permanent)
      await saveComplexImageToCloud(complexId, optimizedDataUrl);
      onImageUpdated(complexId, optimizedDataUrl);

      // 3. Fallback sync to local server container
      fetch('/api/upload-complex-image', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify({
          complexId,
          filename: file.name,
          dataUrl: optimizedDataUrl,
          adminPin,
        }),
      }).catch(() => {});

      setUploadStatusMsg({
        type: 'success',
        text: `[${file.name}] 사진이 클라우드 영구 데이터베이스(Firebase)에 안전하게 저장되었습니다!`,
      });
    } catch (err: any) {
      console.error(err);
      setUploadStatusMsg({
        type: 'error',
        text: `업로드 실패: ${err.message || '파일을 다시 확인해주세요.'}`,
      });
    } finally {
      setUploadingId(null);
    }
  };

  // Single file upload handler for hero slide
  const handleUploadHeroFile = async (slideId: string, file: File) => {
    setUploadingId(slideId);
    setUploadStatusMsg(null);

    try {
      const optimizedDataUrl = await optimizeImageFile(file);
      // 1. Save to Google Cloud Firestore (Permanent)
      await saveHeroImageToCloud(slideId, optimizedDataUrl);
      onHeroImageUpdated(slideId, optimizedDataUrl);

      // 2. Fallback sync to local server container
      fetch('/api/upload-hero-image', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-pin': adminPin,
        },
        body: JSON.stringify({
          slideId,
          dataUrl: optimizedDataUrl,
          adminPin,
        }),
      }).catch(() => {});

      setUploadStatusMsg({
        type: 'success',
        text: `메인 히어로 사진이 클라우드 영구 데이터베이스(Firebase)에 안전하게 저장되었습니다!`,
      });
    } catch (err: any) {
      console.error(err);
      setUploadStatusMsg({
        type: 'error',
        text: `업로드 실패: ${err.message || '파일을 다시 확인해주세요.'}`,
      });
    } finally {
      setUploadingId(null);
    }
  };

  // Batch files upload handler for complexes
  const handleBatchFiles = async (files: FileList | File[]) => {
    setBatchUploading(true);
    setUploadStatusMsg(null);
    let matchedCount = 0;
    const errors: string[] = [];

    for (const file of Array.from(files)) {
      const matched = matchFilenameToComplex(file.name);
      if (matched) {
        try {
          const optimizedDataUrl = await optimizeImageFile(file);
          // Save directly to Google Cloud Firestore (Permanent)
          await saveComplexImageToCloud(matched.id, optimizedDataUrl);
          onImageUpdated(matched.id, optimizedDataUrl);
          matchedCount++;

          // Fallback sync to local server
          fetch('/api/upload-complex-image', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'x-admin-pin': adminPin,
            },
            body: JSON.stringify({
              complexId: matched.id,
              filename: file.name,
              dataUrl: optimizedDataUrl,
              adminPin,
            }),
          }).catch(() => {});
        } catch (e: any) {
          errors.push(file.name);
        }
      }
    }

    setBatchUploading(false);
    if (matchedCount > 0) {
      setUploadStatusMsg({
        type: 'success',
        text: `총 ${matchedCount}개 단지 사진이 클라우드 영구 데이터베이스(Firebase)에 보존되었습니다!`,
      });
    } else {
      setUploadStatusMsg({
        type: 'error',
        text: '파일명을 인식하지 못했습니다. 아래 단지별 [사진 변경] 버튼으로 개별 등록해 주세요.',
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] shadow-2xl flex flex-col border border-[#E5DDD2] overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* If Not Authenticated: Security PIN Gate */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center text-center max-w-md mx-auto my-auto">
            <div className="w-14 h-14 rounded-2xl bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center mb-5">
              <Lock className="w-7 h-7" />
            </div>

            <span className="text-[11px] font-serif-luxury tracking-widest text-[#7A0016] font-bold uppercase mb-1">
              BOMNAL SYSTEM SECURITY
            </span>
            <h3 className="font-korean-serif text-2xl font-bold text-[#141414] mb-2">
              관리자 보안 인증
            </h3>
            <p className="text-xs text-[#666666] leading-relaxed mb-6">
              인가된 관리자 전용 화면입니다.<br />
              비밀번호를 입력하여 잠금을 해제해 주세요.
            </p>

            <form onSubmit={handleVerifyPin} className="w-full space-y-4">
              <div className="relative">
                <KeyRound className="w-4 h-4 text-[#888888] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  ref={pinInputRef}
                  type="password"
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  placeholder="관리자 비밀번호 입력"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 bg-[#FAF8F5] border border-[#D5CCC0] focus:border-[#7A0016] rounded-xl text-sm font-sans-clean outline-none transition-colors"
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-600 font-medium flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{pinError}</span>
                </p>
              )}

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 bg-neutral-100 hover:bg-neutral-200 text-[#444444] text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  닫기
                </button>
                <button
                  type="submit"
                  disabled={isVerifying}
                  className="flex-1 py-3 bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>확인 중...</span>
                    </>
                  ) : (
                    <span>인증 확인</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Manager View */
          <>
            {/* Header */}
            <div className="px-6 py-5 bg-[#FAF8F5] border-b border-[#EAE4DC] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-korean-serif text-lg sm:text-xl font-bold text-[#141414]">
                      봄날 부동산 미디어 관리 센터
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#03C75A]/15 text-[#008A3D] flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      보안 인증됨
                    </span>
                  </div>
                  <p className="text-xs text-[#666666] mt-0.5">
                    업로드 사진은 <strong>웹 서버 고정 디렉토리</strong>에 영구 보관되며 모든 방문 고객에게 동일하게 표출됩니다.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsChangingPin(!isChangingPin)}
                  className="text-xs text-[#666666] hover:text-[#141414] p-2 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  title="비밀번호 변경"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">비밀번호 변경</span>
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-[#666666] hover:text-[#7A0016] p-2 flex items-center gap-1 font-medium transition-colors cursor-pointer"
                  title="관리자 로그아웃"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">잠금</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-white hover:bg-neutral-100 border border-[#E5E0D8] flex items-center justify-center text-[#555555] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Change PIN Dropdown Box */}
            {isChangingPin && (
              <div className="p-4 bg-[#F5F0E6] border-b border-[#E5DDD2]">
                <form onSubmit={handleChangePin} className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2">
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    placeholder="새 관리자 비밀번호 (4자리 이상)"
                    className="w-full sm:flex-1 px-3 py-2 bg-white border border-[#D5CCC0] rounded-lg text-xs outline-none focus:border-[#7A0016]"
                  />
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="flex-1 sm:flex-initial py-2 px-4 bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      변경 저장
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsChangingPin(false)}
                      className="py-2 px-3 bg-neutral-200 text-[#444444] text-xs font-medium rounded-lg"
                    >
                      취소
                    </button>
                  </div>
                </form>
                {changePinMsg && (
                  <p className={`text-xs text-center mt-2 font-medium ${
                    changePinMsg.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                  }`}>
                    {changePinMsg.text}
                  </p>
                )}
              </div>
            )}

            {/* Navigation Tabs (Complexes vs Hero) */}
            <div className="flex items-center gap-4 border-b border-[#EAE4DC] px-6 bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setActiveTab('complexes')}
                className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'complexes'
                    ? 'border-[#7A0016] text-[#7A0016]'
                    : 'border-transparent text-[#666666] hover:text-[#141414]'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>신월성 8개 단지 대표 사진</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('hero')}
                className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'hero'
                    ? 'border-[#7A0016] text-[#7A0016]'
                    : 'border-transparent text-[#666666] hover:text-[#141414]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>메인 히어로 슬라이드 사진 (5장)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('comments')}
                className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'comments'
                    ? 'border-[#7A0016] text-[#7A0016]'
                    : 'border-transparent text-[#666666] hover:text-[#141414]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>단지별 브리핑 코멘트 편집</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('popup')}
                className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'popup'
                    ? 'border-[#7A0016] text-[#7A0016]'
                    : 'border-transparent text-[#666666] hover:text-[#141414]'
                }`}
              >
                <Bell className="w-3.5 h-3.5" />
                <span>접속 팝업(공지) 설정</span>
                {popupDraft.isEnabled ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="팝업 켜짐" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" title="팝업 꺼짐" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('share')}
                className={`pb-3 pt-2 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'share'
                    ? 'border-[#7A0016] text-[#7A0016]'
                    : 'border-transparent text-[#666666] hover:text-[#141414]'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>카톡/SNS 공유 썸네일 설정</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Status Message Banner */}
              {uploadStatusMsg && (
                <div className={`p-4 rounded-xl text-xs flex items-center gap-2.5 font-medium ${
                  uploadStatusMsg.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {uploadStatusMsg.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  )}
                  <span>{uploadStatusMsg.text}</span>
                </div>
              )}

              {/* TAB 1: Complexes Manager */}
              {activeTab === 'complexes' && (
                <>
                  {/* Storage Information Notice Box */}
                  <div className="p-4 bg-[#F5F2EB] border border-[#DDD5C7] rounded-xl text-xs text-[#444444] flex items-start gap-3">
                    <HardDrive className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-[#141414]">
                        신월성 8개 단지 대표 사진 저장 안내
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#555555]">
                        업로드된 사진은 웹 서버의 <code>/public/complexes/</code> 디렉토리에 저장되어 모든 방문 고객에게 100% 동일하게 고화질로 반영됩니다.
                      </p>
                    </div>
                  </div>

                  {/* Fast Batch Drag & Drop Zone */}
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragOver(false);
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        handleBatchFiles(e.dataTransfer.files);
                      }
                    }}
                    onClick={() => batchFileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                      isDragOver 
                        ? 'border-[#7A0016] bg-[#7A0016]/5 scale-[0.99]' 
                        : 'border-[#D5CCC0] hover:border-[#7A0016] bg-[#FAF8F5] hover:bg-[#F5EFEB]'
                    }`}
                  >
                    <input
                      ref={batchFileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleBatchFiles(e.target.files);
                        }
                      }}
                    />

                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xs border border-[#E5DDD2] flex items-center justify-center text-[#7A0016]">
                      {batchUploading ? (
                        <Loader2 className="w-7 h-7 animate-spin" />
                      ) : (
                        <UploadCloud className="w-7 h-7" />
                      )}
                    </div>

                    <div>
                      <p className="font-korean-serif text-base sm:text-lg font-bold text-[#141414]">
                        {batchUploading ? '서버에 저장 중입니다...' : '8개 사진 파일을 여기에 한 번에 끌어다 놓으세요'}
                      </p>
                      <p className="text-xs text-[#777777] mt-1">
                        파일명(예: <code>월성월드메르디앙.jpg</code>, <code>e편한세상월배.jpg</code> 등)을 분석하여 해당 단지와 1초 만에 자동 매칭합니다.
                      </p>
                    </div>

                    <span className="text-xs font-bold text-[#7A0016] underline underline-offset-4">
                      또는 클릭하여 PC에서 여러 파일 한 번에 선택
                    </span>
                  </div>

                  {/* Complex Individual Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-bold text-[#141414] font-korean-serif flex items-center gap-1.5">
                        <ImageIcon className="w-4 h-4 text-[#7A0016]" />
                        <span>단지별 등록 현황 (총 {APARTMENT_COMPLEXES.length}개)</span>
                      </h4>
                      <span className="text-[11px] text-[#777777]">
                        개별 사진만 따로 변경하실 수도 있습니다
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {APARTMENT_COMPLEXES.map((complex) => {
                        const currentImg = customImages[complex.id] || complex.image;
                        const isCustom = Boolean(customImages[complex.id]);
                        const isItemUploading = uploadingId === complex.id;

                        return (
                          <div
                            key={complex.id}
                            className="p-3.5 bg-white border border-[#E5E0D8] rounded-xl flex items-center gap-3.5 shadow-2xs hover:border-[#C5BCB0] transition-colors"
                          >
                            <div className="w-20 h-16 rounded-lg overflow-hidden relative shrink-0 bg-neutral-100 border border-[#EAEAEA]">
                              <img
                                src={currentImg}
                                alt={complex.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <p className="font-bold text-xs text-[#141414] truncate font-korean-serif">
                                  {complex.name}
                                </p>
                                <span className="text-[10px] text-[#888888] shrink-0">
                                  {complex.totalUnits}
                                </span>
                              </div>
                              <p className="text-[10px] text-[#777777] mt-0.5 truncate">
                                {isCustom ? '✓ 대표 실사진 저장됨' : '기본 이미지 적용 중'}
                              </p>

                              <div className="mt-2 flex items-center gap-2">
                                <label className="cursor-pointer text-[11px] font-bold py-1 px-2.5 bg-[#FAF8F5] hover:bg-[#F0EBE1] border border-[#D5CCC0] rounded-md text-[#7A0016] transition-colors flex items-center gap-1">
                                  {isItemUploading ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      <span>저장 중...</span>
                                    </>
                                  ) : (
                                    <>
                                      <UploadCloud className="w-3 h-3" />
                                      <span>사진 변경</span>
                                    </>
                                  )}
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    disabled={isItemUploading}
                                    onChange={(e) => {
                                      if (e.target.files && e.target.files[0]) {
                                        handleUploadComplexFile(complex.id, e.target.files[0]);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: Hero Slides Manager */}
              {activeTab === 'hero' && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F5F2EB] border border-[#DDD5C7] rounded-xl text-xs text-[#444444] flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-[#141414]">
                        메인 히어로 슬라이드(상단 대형 배경) 사진 교체 안내
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#555555]">
                        홈페이지 최상단에 자동으로 전환되는 <strong>5장의 대형 배경 사진</strong>을 대표님이 원하시는 실제 사진(상가 외관, 단지 조경, 내부 인테리어 등)으로 교체하실 수 있습니다.<br />
                        업로드된 사진은 <strong>웹 서버 <code>/public/hero/</code> 디렉토리에 영구 보관</strong>됩니다.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {HERO_SLIDES.map((slide, idx) => {
                      const currentHeroImg = customHeroImages[slide.id] || slide.image;
                      const isCustomHero = Boolean(customHeroImages[slide.id]);
                      const isItemUploading = uploadingId === slide.id;

                      return (
                        <div
                          key={slide.id}
                          className="p-4 bg-white border border-[#E5E0D8] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs hover:border-[#C5BCB0] transition-colors"
                        >
                          <div className="flex items-center gap-4 min-w-0">
                            {/* Slide 16:9 Thumbnail Preview */}
                            <div className="w-32 sm:w-40 aspect-[16/9] rounded-lg overflow-hidden relative shrink-0 bg-neutral-100 border border-[#EAEAEA]">
                              <img
                                src={currentHeroImg}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Slide Info */}
                            <div className="min-w-0">
                              <span className="text-[10px] font-bold text-[#7A0016] uppercase tracking-wider block">
                                {slide.category}
                              </span>
                              <h5 className="font-korean-serif font-bold text-xs sm:text-sm text-[#141414] truncate">
                                {slide.title}
                              </h5>
                              <p className="text-[11px] text-[#777777] mt-0.5 line-clamp-1">
                                {slide.caption}
                              </p>
                              <span className="text-[10px] text-[#888888] block mt-1">
                                {isCustomHero ? '✓ 대표님 지정 실사진 등록됨' : '기본 이미지 적용 중'}
                              </span>
                            </div>
                          </div>

                          {/* Upload Action */}
                          <div className="shrink-0 flex items-center justify-end">
                            <label className="cursor-pointer text-xs font-bold py-2 px-4 bg-[#FAF8F5] hover:bg-[#7A0016] hover:text-white border border-[#D5CCC0] hover:border-[#7A0016] rounded-xl text-[#7A0016] transition-colors flex items-center gap-1.5 shadow-2xs">
                              {isItemUploading ? (
                                <>
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  <span>저장 중...</span>
                                </>
                              ) : (
                                <>
                                  <UploadCloud className="w-3.5 h-3.5" />
                                  <span>슬라이드 {idx + 1} 사진 변경</span>
                                </>
                              )}
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                disabled={isItemUploading}
                                onChange={(e) => {
                                  if (e.target.files && e.target.files[0]) {
                                    handleUploadHeroFile(slide.id, e.target.files[0]);
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: Complex Briefing Comments Manager */}
              {activeTab === 'comments' && (
                <div className="space-y-6">
                  {/* Guide banner */}
                  <div className="p-4 bg-[#F5F2EB] border border-[#DDD5C7] rounded-xl text-xs text-[#444444] flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold text-[#141414]">
                        단지별 브리핑 코멘트 (BOMNAL REALTOR INSIGHT) 편집 안내
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#555555]">
                        단지 상세 정보 모달에 노출되는 <strong>대표님만의 전문 브리핑 글(단지 가치 분석 &amp; 중개사 소개 문구)</strong>을 자유롭게 수정하실 수 있습니다.<br />
                        수정 후 [클라우드 영구 저장]을 누르시면 <strong>Google Cloud Firestore</strong>에 즉시 영구 저장되어 모든 방문 고객에게 반영됩니다.
                      </p>
                    </div>
                  </div>

                  {/* Complex Selector Pills */}
                  <div>
                    <label className="text-xs font-bold text-[#141414] block mb-2 font-korean-serif">
                      편집할 단지 선택:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {APARTMENT_COMPLEXES.map((c) => {
                        const isSelected = c.id === selectedCommentComplexId;
                        const hasCustom = Boolean(customComments?.[c.id]?.comment1 || customComments?.[c.id]?.comment2);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setSelectedCommentComplexId(c.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                              isSelected
                                ? 'bg-[#7A0016] text-white border-[#7A0016] shadow-sm'
                                : 'bg-[#FAF8F5] hover:bg-[#F3EDE2] text-[#333333] border-[#E0D8CB]'
                            }`}
                          >
                            <span className="font-bold text-xs truncate block font-korean-serif">
                              {c.name}
                            </span>
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className={isSelected ? 'text-white/80' : 'text-[#777777]'}>
                                {c.totalUnits}
                              </span>
                              {hasCustom && (
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  isSelected ? 'bg-white text-[#7A0016]' : 'bg-[#03C75A]/15 text-[#008A3D]'
                                }`}>
                                  수정됨
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Comment Editor Fields */}
                  <div className="bg-white border border-[#E5E0D8] rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#7A0016]" />
                        <h4 className="font-korean-serif font-bold text-sm sm:text-base text-[#141414]">
                          [{APARTMENT_COMPLEXES.find(c => c.id === selectedCommentComplexId)?.name}] 코멘트 작성
                        </h4>
                      </div>
                      <button
                        type="button"
                        onClick={handleResetToDefault}
                        className="text-xs text-[#666666] hover:text-[#7A0016] flex items-center gap-1 font-medium transition-colors cursor-pointer"
                        title="기본 추천 문구로 재설정"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>기본 추천문구 불러오기</span>
                      </button>
                    </div>

                    {/* Paragraph 1 */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#141414] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A0016]" />
                          1번 문단: 단지 입지 &amp; 실거주 가치 분석
                        </label>
                        <span className="text-[11px] text-[#888888]">
                          {commentDraft1.length}자
                        </span>
                      </div>
                      <textarea
                        value={commentDraft1}
                        onChange={(e) => setCommentDraft1(e.target.value)}
                        rows={4}
                        placeholder="단지의 입지, 학군, 조망, 일조권, 실거주 선호도 등을 작성해 주세요."
                        className="w-full p-3.5 bg-[#FAF8F5] border border-[#D5CCC0] focus:border-[#7A0016] focus:bg-white rounded-xl text-xs sm:text-sm font-sans-clean outline-none leading-relaxed transition-all resize-y"
                      />
                    </div>

                    {/* Paragraph 2 */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-[#141414] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A0016]" />
                          2번 문단: 봄날부동산 전문 중개 역량 &amp; 책임 약속
                        </label>
                        <span className="text-[11px] text-[#888888]">
                          {commentDraft2.length}자
                        </span>
                      </div>
                      <textarea
                        value={commentDraft2}
                        onChange={(e) => setCommentDraft2(e.target.value)}
                        rows={4}
                        placeholder="봄날공인중개사사무소의 단지 내 전문성, 급매물 분석, 11년 무사고 중개 약속 등을 작성해 주세요."
                        className="w-full p-3.5 bg-[#FAF8F5] border border-[#D5CCC0] focus:border-[#7A0016] focus:bg-white rounded-xl text-xs sm:text-sm font-sans-clean outline-none leading-relaxed transition-all resize-y"
                      />
                    </div>

                    {/* Save Action */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F0EBE1]">
                      {commentSuccessMsg ? (
                        <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{commentSuccessMsg}</span>
                        </p>
                      ) : (
                        <p className="text-xs text-[#888888]">
                          저장 시 상세 모달 화면에 즉시 적용됩니다.
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleSaveComment}
                        disabled={isSavingComment}
                        className="w-full sm:w-auto py-2.5 px-6 bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSavingComment ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>클라우드 저장 중...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>[{APARTMENT_COMPLEXES.find(c => c.id === selectedCommentComplexId)?.name}] 코멘트 영구 저장</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Live Preview of Detail Page */}
                  <div className="bg-[#FAF8F5] border border-[#E5DDD2] rounded-2xl p-5 space-y-3">
                    <span className="text-[10px] font-serif-luxury tracking-widest text-[#7A0016] font-bold uppercase block">
                      LIVE PREVIEW · 상세 페이지 미리보기
                    </span>
                    <div className="bg-white p-5 rounded-xl border border-[#EAE4DC] space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center font-bold text-xs">
                          봄날
                        </div>
                        <div>
                          <p className="font-serif-luxury text-[10px] font-bold text-[#7A0016] uppercase">
                            BOMNAL REALTOR INSIGHT
                          </p>
                          <p className="font-korean-serif font-bold text-sm text-[#141414]">
                            봄날부동산의 브리핑 코멘트
                          </p>
                        </div>
                      </div>

                      <div className="text-xs text-[#444444] leading-relaxed space-y-2 border-t border-[#F0EBE1] pt-3">
                        <p className="pl-2 border-l-2 border-[#7A0016]/40">
                          "{commentDraft1.trim() || '1번 문단 내용을 입력해 주세요.'}"
                        </p>
                        <p className="pl-2 border-l-2 border-[#7A0016]/40">
                          "{commentDraft2.trim() || '2번 문단 내용을 입력해 주세요.'}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Popup Notice Settings */}
              {activeTab === 'popup' && (
                <div className="space-y-6">
                  {/* Top Notice Banner */}
                  <div className="bg-[#FAF8F5] border border-[#E5DDD2] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif-luxury text-[11px] font-bold tracking-widest text-[#7A0016] uppercase">
                          POPUP SETTINGS
                        </span>
                        <span className="text-[10px] font-bold bg-[#7A0016]/10 text-[#7A0016] px-2 py-0.5 rounded-full">
                          Google Cloud Firestore 연동
                        </span>
                      </div>
                      <h4 className="font-korean-serif text-base font-bold text-[#141414] mt-1">
                        홈페이지 접속 팝업(공지 모달) 설정
                      </h4>
                      <p className="text-xs text-[#666666] mt-0.5">
                        방문자가 사이트에 처음 들어왔을 때 화면 중앙에 안내할 팝업의 노출 여부와 문구를 직접 설정합니다.
                      </p>
                    </div>

                    {/* Enable/Disable Big Toggle Button */}
                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={() => setPopupDraft(prev => ({ ...prev, isEnabled: !prev.isEnabled }))}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm cursor-pointer ${
                          popupDraft.isEnabled
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-neutral-200 hover:bg-neutral-300 text-neutral-700'
                        }`}
                      >
                        <Power className="w-4 h-4" />
                        <span>{popupDraft.isEnabled ? '🟢 팝업 노출 켜짐 (ON)' : '⚪ 팝업 숨김 꺼짐 (OFF)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Settings Form Container */}
                  <div className={`bg-white border rounded-2xl p-6 space-y-5 transition-opacity ${
                    popupDraft.isEnabled ? 'border-[#EAE4DC] opacity-100' : 'border-neutral-200 opacity-60'
                  }`}>
                    <div className="flex items-center justify-between border-b border-[#F0EBE1] pb-3">
                      <div>
                        <h5 className="font-bold text-sm text-[#141414]">팝업 세부 문구 편집</h5>
                        <p className="text-xs text-[#888888]">각 항목의 문구를 수정하면 팝업 화면에 그대로 적용됩니다.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {onPreviewPopup && (
                          <button
                            type="button"
                            onClick={() => {
                              if (onUpdatePopupConfig) onUpdatePopupConfig(popupDraft);
                              onPreviewPopup();
                            }}
                            className="py-1.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>팝업 미리보기</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleResetPopupToDefault}
                          className="py-1.5 px-3 text-[#666666] hover:text-[#141414] hover:bg-neutral-100 text-xs font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>기본값 복원</span>
                        </button>
                      </div>
                    </div>

                    {/* Template Selector Bar (Carousel Multi-Select & Switcher) */}
                    <div className="bg-[#FAF8F5] border border-[#E5DDD2] rounded-2xl p-4 space-y-3">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <label className="block font-bold text-xs text-[#141414]">
                            🎠 캐러셀 팝업 슬라이드 구성 (원하는 슬라이드를 켜고 끄세요)
                          </label>
                          <p className="text-[11px] text-[#666666]">
                            여러 개를 켜두시면 방문자에게 팝업 창 안에서 좌우로 넘겨보는 캐러셀 슬라이드로 노출됩니다.
                          </p>
                        </div>
                        <span className="text-[11px] font-bold text-[#7A0016] bg-[#7A0016]/10 px-2.5 py-1 rounded-full shrink-0">
                          선택된 슬라이드: {(popupDraft.activeTemplates || [popupDraft.templateType || 'agency_notice']).length}개
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {/* 1. Electronic Contract */}
                        {(() => {
                          const activeList = popupDraft.activeTemplates || [popupDraft.templateType || 'agency_notice'];
                          const isIncluded = activeList.includes('electronic_contract');
                          const isEditing = editingTemplate === 'electronic_contract';
                          const slideNum = activeList.indexOf('electronic_contract') + 1;

                          return (
                            <div
                              onClick={() => setEditingTemplate('electronic_contract')}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                                isEditing
                                  ? 'border-[#7A0016] bg-white ring-2 ring-[#7A0016]/20 shadow-sm'
                                  : isIncluded
                                  ? 'border-neutral-300 bg-white hover:border-neutral-400'
                                  : 'border-neutral-200 bg-neutral-50/60 opacity-60 hover:opacity-90'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-base">🖥️</span>
                                <button
                                  type="button"
                                  onClick={(e) => toggleTemplateActive('electronic_contract', e)}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                    isIncluded
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                                  }`}
                                >
                                  {isIncluded ? `${slideNum}번 슬라이드 ✓` : '+ 슬라이드 끔'}
                                </button>
                              </div>
                              <div>
                                <span className="font-bold text-xs text-[#111111] block">전자계약 혜택</span>
                                <span className="text-[10px] text-neutral-500 block mt-0.5">우대금리·확정일자 모니터형</span>
                              </div>
                              {isEditing && (
                                <span className="text-[10px] text-[#7A0016] font-bold mt-2 pt-1 border-t border-neutral-100 block">
                                  ● 현재 편집 중
                                </span>
                              )}
                            </div>
                          );
                        })()}

                        {/* 2. Urgent / Featured Listing */}
                        {(() => {
                          const activeList = popupDraft.activeTemplates || [popupDraft.templateType || 'agency_notice'];
                          const isIncluded = activeList.includes('urgent_listing');
                          const isEditing = editingTemplate === 'urgent_listing';
                          const slideNum = activeList.indexOf('urgent_listing') + 1;

                          return (
                            <div
                              onClick={() => setEditingTemplate('urgent_listing')}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                                isEditing
                                  ? 'border-[#7A0016] bg-white ring-2 ring-[#7A0016]/20 shadow-sm'
                                  : isIncluded
                                  ? 'border-neutral-300 bg-white hover:border-neutral-400'
                                  : 'border-neutral-200 bg-neutral-50/60 opacity-60 hover:opacity-90'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-base">🏢</span>
                                <button
                                  type="button"
                                  onClick={(e) => toggleTemplateActive('urgent_listing', e)}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                    isIncluded
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                                  }`}
                                >
                                  {isIncluded ? `${slideNum}번 슬라이드 ✓` : '+ 슬라이드 끔'}
                                </button>
                              </div>
                              <div>
                                <span className="font-bold text-xs text-[#111111] block">추천·급매 매물</span>
                                <span className="text-[10px] text-neutral-500 block mt-0.5">단지·평형·가격 브리핑형</span>
                              </div>
                              {isEditing && (
                                <span className="text-[10px] text-[#7A0016] font-bold mt-2 pt-1 border-t border-neutral-100 block">
                                  ● 현재 편집 중
                                </span>
                              )}
                            </div>
                          );
                        })()}

                        {/* 3. Agency Notice */}
                        {(() => {
                          const activeList = popupDraft.activeTemplates || [popupDraft.templateType || 'agency_notice'];
                          const isIncluded = activeList.includes('agency_notice');
                          const isEditing = editingTemplate === 'agency_notice';
                          const slideNum = activeList.indexOf('agency_notice') + 1;

                          return (
                            <div
                              onClick={() => setEditingTemplate('agency_notice')}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                                isEditing
                                  ? 'border-[#7A0016] bg-white ring-2 ring-[#7A0016]/20 shadow-sm'
                                  : isIncluded
                                  ? 'border-neutral-300 bg-white hover:border-neutral-400'
                                  : 'border-neutral-200 bg-neutral-50/60 opacity-60 hover:opacity-90'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-base">🌸</span>
                                <button
                                  type="button"
                                  onClick={(e) => toggleTemplateActive('agency_notice', e)}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                    isIncluded
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                                  }`}
                                >
                                  {isIncluded ? `${slideNum}번 슬라이드 ✓` : '+ 슬라이드 끔'}
                                </button>
                              </div>
                              <div>
                                <span className="font-bold text-xs text-[#111111] block">공식 공지·예약제</span>
                                <span className="text-[10px] text-neutral-500 block mt-0.5">일정·사전예약제 안내문</span>
                              </div>
                              {isEditing && (
                                <span className="text-[10px] text-[#7A0016] font-bold mt-2 pt-1 border-t border-neutral-100 block">
                                  ● 현재 편집 중
                                </span>
                              )}
                            </div>
                          );
                        })()}

                        {/* 4. Image Banner */}
                        {(() => {
                          const activeList = popupDraft.activeTemplates || [popupDraft.templateType || 'agency_notice'];
                          const isIncluded = activeList.includes('image_banner');
                          const isEditing = editingTemplate === 'image_banner';
                          const slideNum = activeList.indexOf('image_banner') + 1;

                          return (
                            <div
                              onClick={() => setEditingTemplate('image_banner')}
                              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                                isEditing
                                  ? 'border-[#7A0016] bg-white ring-2 ring-[#7A0016]/20 shadow-sm'
                                  : isIncluded
                                  ? 'border-neutral-300 bg-white hover:border-neutral-400'
                                  : 'border-neutral-200 bg-neutral-50/60 opacity-60 hover:opacity-90'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-base">🖼️</span>
                                <button
                                  type="button"
                                  onClick={(e) => toggleTemplateActive('image_banner', e)}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                                    isIncluded
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-neutral-200 text-neutral-600 hover:bg-neutral-300'
                                  }`}
                                >
                                  {isIncluded ? `${slideNum}번 슬라이드 ✓` : '+ 슬라이드 끔'}
                                </button>
                              </div>
                              <div>
                                <span className="font-bold text-xs text-[#111111] block">포스터 이미지형</span>
                                <span className="text-[10px] text-neutral-500 block mt-0.5">홍보 이미지 직접 업로드</span>
                              </div>
                              {isEditing && (
                                <span className="text-[10px] text-[#7A0016] font-bold mt-2 pt-1 border-t border-neutral-100 block">
                                  ● 현재 편집 중
                                </span>
                              )}
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Active Editor Title */}
                    <div className="flex items-center gap-2 pt-2 border-t border-neutral-100">
                      <span className="text-xs font-bold text-[#7A0016] bg-[#7A0016]/10 px-2 py-0.5 rounded">
                        현재 편집 중인 슬라이드
                      </span>
                      <span className="text-xs font-bold text-[#141414]">
                        {editingTemplate === 'electronic_contract' && '🖥️ 전자계약 혜택 슬라이드'}
                        {editingTemplate === 'urgent_listing' && '🏢 추천·급매 매물 브리핑 슬라이드'}
                        {editingTemplate === 'agency_notice' && '🌸 공식 공지·예약제 슬라이드'}
                        {editingTemplate === 'image_banner' && '🖼️ 포스터 이미지형 슬라이드'}
                      </span>
                    </div>

                    {/* Dynamic Inputs Based on Selected Template */}
                    {/* TEMPLATE 1: Electronic Contract */}
                    {editingTemplate === 'electronic_contract' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-[#333333] mb-1">상단 부제목 (작은 안내 문구)</label>
                          <input
                            type="text"
                            value={popupDraft.subtitle}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, subtitle: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="더 안전하고, 더 스마트하게 줄이는 비용"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">메인 큰 제목</label>
                          <input
                            type="text"
                            value={popupDraft.title}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="부동산 전자계약"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">화면 상단 시스템 뱃지</label>
                          <input
                            type="text"
                            value={popupDraft.badgeText}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, badgeText: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="국토교통부 전자계약시스템 연계"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">핵심 혜택 서브 태그</label>
                          <input
                            type="text"
                            value={popupDraft.heroTag}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, heroTag: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="고객 맞춤 3대 금융·세무 혜택"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-[#333333] mb-1">혜택 메인 헤드라인</label>
                          <input
                            type="text"
                            value={popupDraft.heroTitle}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, heroTitle: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="전자계약 진행 시 대출 우대금리 & 확정일자 자동 부여"
                          />
                        </div>

                        {/* 3 Metric Boxes */}
                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                          <span className="font-bold text-[#7A0016] block">1번 지표 박스</span>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={popupDraft.metric1Label}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, metric1Label: e.target.value }))}
                              className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                              placeholder="라벨 (예: 대출 우대금리)"
                            />
                            <input
                              type="text"
                              value={popupDraft.metric1Value}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, metric1Value: e.target.value }))}
                              className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs font-bold text-amber-600"
                              placeholder="값 (예: 0.1~0.2%p↓)"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                          <span className="font-bold text-[#7A0016] block">2번 지표 박스</span>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={popupDraft.metric2Label}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, metric2Label: e.target.value }))}
                              className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                              placeholder="라벨 (예: 등기 대행료)"
                            />
                            <input
                              type="text"
                              value={popupDraft.metric2Value}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, metric2Value: e.target.value }))}
                              className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs font-bold text-cyan-600"
                              placeholder="값 (예: 30% 감면)"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                          <span className="font-bold text-[#7A0016] block">3번 지표 박스</span>
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={popupDraft.metric3Label}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, metric3Label: e.target.value }))}
                              className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs"
                              placeholder="라벨 (예: 확정일자 부여)"
                            />
                            <input
                              type="text"
                              value={popupDraft.metric3Value}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, metric3Value: e.target.value }))}
                              className="px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs font-bold text-emerald-600"
                              placeholder="값 (예: 무료 자동)"
                            />
                          </div>
                        </div>

                        <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                          <span className="font-bold text-[#7A0016] block">하단 우측 강조 문구</span>
                          <input
                            type="text"
                            value={popupDraft.bottomNote}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, bottomNote: e.target.value }))}
                            className="w-full px-2 py-1.5 bg-white border border-neutral-300 rounded text-xs font-bold"
                            placeholder="비대면 전자서명 가능"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-[#333333] mb-1">하단 바로가기 버튼 텍스트</label>
                          <input
                            type="text"
                            value={popupDraft.buttonText}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, buttonText: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="전자계약 혜택 및 안심 상담 바로가기"
                          />
                        </div>
                      </div>
                    )}

                    {/* TEMPLATE 2: Urgent / Featured Listing */}
                    {editingTemplate === 'urgent_listing' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-[#333333] mb-1">추천 매물 뱃지 태그</label>
                          <input
                            type="text"
                            value={popupDraft.listingTag || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingTag: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 신월성 초품아 급매 추천 매물"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">아파트 단지명</label>
                          <input
                            type="text"
                            value={popupDraft.listingComplexName || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingComplexName: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: e편한세상월배"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">평형 및 층수 스펙</label>
                          <input
                            type="text"
                            value={popupDraft.listingSpec || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingSpec: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 114㎡ (34평형) · 105동 고층 로얄동"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">매매가 / 거래 희망가</label>
                          <input
                            type="text"
                            value={popupDraft.listingPrice || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingPrice: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none font-bold text-[#7A0016]"
                            placeholder="예: 매매 5억 8,000만원"
                          />
                        </div>

                        <div className="md:col-span-2 space-y-2">
                          <label className="block font-bold text-[#333333]">핵심 장점 3가지 포인트</label>
                          <input
                            type="text"
                            value={popupDraft.listingPoint1 || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingPoint1: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none mb-1.5"
                            placeholder="포인트 1: 남향 판상형 4Bay 풍부한 일조량과 채광"
                          />
                          <input
                            type="text"
                            value={popupDraft.listingPoint2 || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingPoint2: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none mb-1.5"
                            placeholder="포인트 2: 주인 직접 거주로 내부 최상급 올확장 리모델링"
                          />
                          <input
                            type="text"
                            value={popupDraft.listingPoint3 || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingPoint3: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="포인트 3: 월암초 도보 2분 안전 통학로 및 즉시 입주 협의"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-[#333333] mb-1">상담 연결 버튼 문구</label>
                          <input
                            type="text"
                            value={popupDraft.listingButtonText || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, listingButtonText: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 해당 추천 매물 상세 상담 바로가기"
                          />
                        </div>
                      </div>
                    )}

                    {/* TEMPLATE 3: Agency Editorial Notice */}
                    {editingTemplate === 'agency_notice' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div>
                          <label className="block font-bold text-[#333333] mb-1">공지 상단 뱃지 문구</label>
                          <input
                            type="text"
                            value={popupDraft.noticeBadge || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, noticeBadge: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 봄날공인중개사 공식 안내"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">공지 헤드라인 제목</label>
                          <input
                            type="text"
                            value={popupDraft.noticeTitle || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, noticeTitle: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 신월성 아파트 1:1 심층 브리핑 사전 예약제"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-[#333333] mb-1">서브 설명 문구</label>
                          <input
                            type="text"
                            value={popupDraft.noticeSubtitle || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, noticeSubtitle: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 더 정확하고 정밀한 빅데이터 시세 분석 및 세무 상담을 위해 운영됩니다."
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="block font-bold text-[#333333] mb-1">공지 상세 본문 내용</label>
                          <textarea
                            rows={4}
                            value={popupDraft.noticeBody || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, noticeBody: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none leading-relaxed"
                            placeholder="공지할 상세 내용을 정갈하게 입력해 주세요."
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">일정 / 영업시간 강조 박스</label>
                          <input
                            type="text"
                            value={popupDraft.noticeHighlight || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, noticeHighlight: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 상담 가능 시간: 월~토 10:30~19:30 (일요일 예약제)"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-[#333333] mb-1">하단 버튼 텍스트</label>
                          <input
                            type="text"
                            value={popupDraft.noticeButtonText || ''}
                            onChange={(e) => setPopupDraft(prev => ({ ...prev, noticeButtonText: e.target.value }))}
                            className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                            placeholder="예: 대표 공인중개사 1:1 상담 예약하기"
                          />
                        </div>
                      </div>
                    )}

                    {/* TEMPLATE 4: Image Poster Banner */}
                    {editingTemplate === 'image_banner' && (
                      <div className="space-y-4 text-xs">
                        <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl space-y-3">
                          <label className="block font-bold text-[#333333]">포스터 / 홍보 배너 이미지 업로드</label>
                          
                          {popupDraft.bannerImageUrl ? (
                            <div className="relative rounded-xl overflow-hidden border border-neutral-300 max-h-[220px] max-w-[280px] mx-auto bg-neutral-100 flex items-center justify-center">
                              <img 
                                src={popupDraft.bannerImageUrl} 
                                alt="배너 미리보기" 
                                className="w-full h-auto object-contain max-h-[220px]" 
                              />
                            </div>
                          ) : (
                            <div className="py-8 border-2 border-dashed border-neutral-300 rounded-xl text-center text-neutral-400">
                              <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                              <p>업로드된 포스터 이미지가 없습니다.</p>
                            </div>
                          )}

                          <input
                            type="file"
                            ref={bannerFileInputRef}
                            onChange={handleBannerImageUpload}
                            accept="image/*"
                            className="hidden"
                          />

                          <div className="flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => bannerFileInputRef.current?.click()}
                              disabled={isUploadingBanner}
                              className="py-2 px-4 bg-[#7A0016] hover:bg-[#580010] text-white rounded-lg font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                            >
                              <UploadCloud className="w-4 h-4" />
                              <span>{isUploadingBanner ? '이미지 최적화 중...' : '포스터 사진 파일 선택'}</span>
                            </button>
                            {popupDraft.bannerImageUrl && (
                              <button
                                type="button"
                                onClick={() => setPopupDraft(prev => ({ ...prev, bannerImageUrl: '' }))}
                                className="py-2 px-3 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 rounded-lg font-medium cursor-pointer"
                              >
                                삭제
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block font-bold text-[#333333] mb-1">버튼 문구</label>
                            <input
                              type="text"
                              value={popupDraft.bannerButtonText || ''}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, bannerButtonText: e.target.value }))}
                              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                              placeholder="예: 자세히 보기 / 상담 바로가기"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-[#333333] mb-1">버튼 클릭 시 이동 링크 / 섹션</label>
                            <input
                              type="text"
                              value={popupDraft.bannerButtonLink || ''}
                              onChange={(e) => setPopupDraft(prev => ({ ...prev, bannerButtonLink: e.target.value }))}
                              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:border-[#7A0016] focus:outline-none"
                              placeholder="예: #contact 또는 외부 블로그 URL"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Save Action */}
                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F0EBE1]">
                      {popupSaveMsg ? (
                        <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>{popupSaveMsg}</span>
                        </p>
                      ) : (
                        <p className="text-xs text-[#888888]">
                          저장 시 배포된 웹사이트와 모든 기기에 즉시 반영됩니다.
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={handleSavePopup}
                        disabled={isSavingPopup}
                        className="w-full sm:w-auto py-2.5 px-6 bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        {isSavingPopup ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>클라우드 저장 중...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-4 h-4" />
                            <span>접속 팝업 설정 영구 저장</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: KakaoTalk / SNS Share Thumbnail Manager */}
              {activeTab === 'share' && (
                <div className="space-y-5">
                  {/* Top Notice Banner */}
                  <div className="bg-[#FAF8F5] border border-[#E5DDD2] rounded-2xl p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif-luxury text-[11px] font-bold tracking-widest text-[#7A0016] uppercase">
                          KAKAO / SNS SHARE THUMBNAIL
                        </span>
                        <span className="text-[10px] font-bold bg-[#FEE500] text-[#191919] px-2 py-0.5 rounded-full">
                          카카오톡 · 네이버 · 문자 공유
                        </span>
                      </div>
                      <h4 className="font-korean-serif text-base font-bold text-[#141414] mt-1">
                        카카오톡 &amp; SNS 링크 공유 썸네일(대표 이미지) 설정
                      </h4>
                      <p className="text-xs text-[#666666] mt-0.5">
                        카카오톡 대화방이나 문자메시지에 홈페이지 주소(<code>www.thebomnal.com</code>)를 보낼 때 링크 아래에 나타나는 미리보기 카드 이미지를 등록합니다.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left: Upload and Controls (7 cols) */}
                    <div className="lg:col-span-7 bg-white border border-[#EAE4DC] rounded-2xl p-5 sm:p-6 space-y-4">
                      <div className="border-b border-[#F0EBE1] pb-3">
                        <h5 className="font-bold text-sm text-[#141414]">새로운 공유 대표 이미지 등록</h5>
                        <p className="text-xs text-[#888888] mt-0.5">
                          권장 규격: <strong>1200 × 630 픽셀</strong> (가로 비율 1.91:1) / JPG, PNG 파일
                        </p>
                      </div>

                      {/* File selector input */}
                      <input
                        type="file"
                        ref={shareFileInputRef}
                        accept="image/*"
                        onChange={handleUploadOgFile}
                        className="hidden"
                      />

                      <div className="p-4 bg-[#FAF8F5] border border-[#E5DDD2] rounded-xl flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-white border border-[#DDD5C7] flex items-center justify-center text-[#7A0016] shrink-0">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-[#141414] truncate">
                              준비해두신 카톡 썸네일 이미지를 선택하세요
                            </p>
                            <p className="text-[11px] text-[#777777]">
                              (예: '신뢰를 담은 봄날부동산 상담실.png' 선택)
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => shareFileInputRef.current?.click()}
                          disabled={isUploadingOg}
                          className="py-2 px-3.5 bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          <UploadCloud className="w-4 h-4" />
                          <span>{isUploadingOg ? '처리 중...' : '사진 파일 선택'}</span>
                        </button>
                      </div>

                      {/* Info & Kakao Cache guide */}
                      <div className="p-3.5 bg-[#FFFDE6] border border-[#F2E599] rounded-xl text-xs text-[#665200] space-y-1.5">
                        <p className="font-bold flex items-center gap-1.5">
                          <span>💡</span>
                          <span>카카오톡 캐시(임시 저장) 갱신 안내</span>
                        </p>
                        <p className="text-[11px] leading-relaxed text-[#776000]">
                          저장 후 카카오톡 대화방에 링크를 올렸을 때 이전 사진이 계속 나온다면, 카카오톡 서버의 임시 캐시 때문입니다. 아래 링크를 눌러 카카오톡 캐시를 10초 만에 초기화하시면 새 이미지가 즉시 뜹니다.
                        </p>
                        <a
                          href="https://developers.kakao.com/tool/clear/og"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-[#3B2D00] hover:underline text-[11px] mt-1 bg-[#FEE500] px-2.5 py-1 rounded-md"
                        >
                          <span>카카오 개발자 OG 캐시 삭제 도구 바로가기 ↗</span>
                        </a>
                      </div>

                      {/* Save Button */}
                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#F0EBE1]">
                        {ogSaveMsg ? (
                          <p className="text-xs text-emerald-700 font-bold flex items-center gap-1.5 animate-in fade-in">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>{ogSaveMsg}</span>
                          </p>
                        ) : (
                          <p className="text-xs text-[#888888]">
                            저장 시 서버의 <code>og-image.jpg</code> 및 <code>card1.jpg</code>에 영구 반영됩니다.
                          </p>
                        )}

                        <button
                          type="button"
                          onClick={handleSaveOgShare}
                          disabled={isSavingOg}
                          className="w-full sm:w-auto py-2.5 px-6 bg-[#03C75A] hover:bg-[#02B150] text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer flex items-center justify-center gap-2"
                        >
                          {isSavingOg ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>서버 저장 중...</span>
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4" />
                              <span>카카오톡 공유 썸네일로 영구 저장</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Right: KakaoTalk Chat Preview Mockup (5 cols) */}
                    <div className="lg:col-span-5 bg-[#B2C7D9] rounded-2xl p-4 sm:p-5 shadow-inner flex flex-col items-center justify-center">
                      <div className="w-full max-w-[320px] space-y-2">
                        <span className="text-[11px] font-bold text-[#3E5060] flex items-center gap-1 mb-1">
                          <span>💬</span>
                          <span>카카오톡 실제 대화방 미리보기</span>
                        </span>

                        {/* Kakao Talk Link Card Bubble */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-black/10">
                          {/* Image preview */}
                          <div className="w-full aspect-[1.91/1] bg-neutral-200 overflow-hidden relative">
                            <img
                              src={ogDraft}
                              alt="카카오톡 공유 미리보기"
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Card Text Content */}
                          <div className="p-3 bg-white text-left space-y-1">
                            <h6 className="font-bold text-xs text-[#111111] line-clamp-1">
                              봄날공인중개사사무소 | 대구 신월성 아파트 전문 부동산
                            </h6>
                            <p className="text-[11px] text-[#666666] line-clamp-2 leading-tight">
                              대구 달서구 월성동 e편한세상월배 단지내상가 B103호 봄날공인중개사사무소. 장순조 대표의 11년 무사고 안심 책임중개 및 신월성 아파트 단지 정보 안내.
                            </p>
                            <span className="text-[10px] text-[#888888] block pt-1">
                              www.thebomnal.com
                            </span>
                          </div>
                        </div>

                        <p className="text-center text-[10px] text-[#55697A] font-medium pt-1">
                          위와 같이 카카오톡 말풍선 형태로 전송됩니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#FAF8F5] border-t border-[#EAE4DC] flex items-center justify-between">
              <span className="text-xs text-[#666666]">
                모든 사진은 즉시 웹사이트 전체에 반영됩니다.
              </span>
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-6 bg-[#7A0016] hover:bg-[#580010] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                닫기 및 완료
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
