import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Building2, Phone, Sparkles, CheckCircle2, Calendar, FileText, Image as ImageIcon } from 'lucide-react';
import { PopupNoticeConfig, DEFAULT_POPUP_CONFIG, loadPopupConfigFromCloud } from '../services/firebaseMedia';

const POPUP_STORAGE_KEY = 'bomnal_electronic_contract_popup_hide_until';

interface BomnalNoticeModalProps {
  customConfig?: PopupNoticeConfig;
  forceOpen?: boolean;
  onClosePreview?: () => void;
}

export const BomnalNoticeModal: React.FC<BomnalNoticeModalProps> = ({
  customConfig,
  forceOpen = false,
  onClosePreview,
}) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [config, setConfig] = useState<PopupNoticeConfig>(customConfig || DEFAULT_POPUP_CONFIG);

  useEffect(() => {
    if (customConfig) {
      setConfig(customConfig);
    } else {
      loadPopupConfigFromCloud().then((cloudCfg) => {
        if (cloudCfg) setConfig(cloudCfg);
      });
    }
  }, [customConfig]);

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    if (config.isEnabled === false) {
      setIsOpen(false);
      return;
    }

    try {
      const hideUntil = localStorage.getItem(POPUP_STORAGE_KEY);
      if (hideUntil) {
        const hideTimestamp = parseInt(hideUntil, 10);
        if (Date.now() < hideTimestamp) {
          return;
        }
      }
    } catch {
      // ignore storage errors
    }
    // Show popup after short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [forceOpen, config.isEnabled]);

  const handleClose = () => {
    setIsOpen(false);
    if (onClosePreview) onClosePreview();
  };

  const handleDismissForever = () => {
    try {
      // Hide for 7 days
      const expireTime = Date.now() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem(POPUP_STORAGE_KEY, expireTime.toString());
    } catch {
      // ignore
    }
    setIsOpen(false);
    if (onClosePreview) onClosePreview();
  };

  const handleActionClick = (targetId = 'contact') => {
    handleClose();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  const template = config.templateType || 'electronic_contract';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-fadeIn select-none">
      <div 
        className="relative w-full max-w-[440px] sm:max-w-[460px] bg-white rounded-3xl shadow-2xl p-6 sm:p-7 pt-5 text-center flex flex-col items-center border border-neutral-100 transform transition-all duration-300 animate-scaleUp overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Right Close 'X' Button */}
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4 z-20 p-2 text-neutral-600 hover:text-neutral-900 rounded-full transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-6 h-6 stroke-[1.75]" />
        </button>

        {/* ---------------------------------------------------- */}
        {/* TEMPLATE 1: Electronic Contract (Default) */}
        {/* ---------------------------------------------------- */}
        {template === 'electronic_contract' && (
          <>
            {/* Top Subtitle Copy */}
            <p className="text-[13px] sm:text-sm text-[#444444] font-medium tracking-tight mb-1.5 font-sans-clean break-keep">
              {config.subtitle}
            </p>

            {/* Main Logo & Big Title */}
            <div className="flex items-center justify-center gap-2 mb-5">
              <h2 className="font-korean-serif text-2xl sm:text-[27px] font-extrabold text-[#111111] tracking-tight leading-none break-keep">
                {config.title}
              </h2>
            </div>

            {/* Central Display Screen Mockup */}
            <div className="w-full relative mb-6">
              <div className="w-full bg-[#1A1A1A] rounded-2xl p-2.5 shadow-xl border-4 border-[#262626]">
                <div className="w-full bg-white rounded-xl overflow-hidden text-left flex flex-col">
                  {/* Screen Top Header */}
                  <div className="bg-[#FAF8F5] px-4 py-2 border-b border-neutral-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
                      <span className="text-[10px] font-bold text-[#7A0016] font-serif-luxury tracking-wider truncate">
                        {config.badgeText}
                      </span>
                    </div>
                    <span className="text-[10px] font-medium text-neutral-500 shrink-0">안심공제 100%</span>
                  </div>

                  {/* Screen Content Hero */}
                  <div className="p-4 sm:p-5 bg-gradient-to-b from-white to-[#FDFBF7] space-y-3.5">
                    <div>
                      <span className="text-[11px] font-bold text-[#7A0016] bg-[#7A0016]/10 px-2 py-0.5 rounded-full inline-block mb-1">
                        {config.heroTag}
                      </span>
                      <h3 className="text-sm sm:text-base font-extrabold text-[#111111] leading-snug break-keep">
                        {config.heroTitle}
                      </h3>
                    </div>

                    {/* 3 Metrics Grid Inside Screen */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div className="bg-neutral-900 text-white rounded-lg p-2.5 text-center flex flex-col justify-between">
                        <span className="text-[10px] text-neutral-400 block truncate">{config.metric1Label}</span>
                        <span className="text-xs sm:text-sm font-bold text-[#FFD700] block mt-1">
                          {config.metric1Value}
                        </span>
                      </div>

                      <div className="bg-neutral-900 text-white rounded-lg p-2.5 text-center flex flex-col justify-between">
                        <span className="text-[10px] text-neutral-400 block truncate">{config.metric2Label}</span>
                        <span className="text-xs sm:text-sm font-bold text-[#00E5FF] block mt-1">
                          {config.metric2Value}
                        </span>
                      </div>

                      <div className="bg-neutral-900 text-white rounded-lg p-2.5 text-center flex flex-col justify-between">
                        <span className="text-[10px] text-neutral-400 block truncate">{config.metric3Label}</span>
                        <span className="text-xs sm:text-sm font-bold text-[#00E676] block mt-1">
                          {config.metric3Value}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-neutral-500 flex items-center justify-between pt-1 border-t border-neutral-100">
                      <span>봄날공인중개사사무소 안심 인증 매물</span>
                      <span className="text-[#7A0016] font-bold">{config.bottomNote}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Monitor Stand Base Mockup */}
              <div className="w-12 h-3 bg-gradient-to-b from-[#C4C4C4] to-[#999999] mx-auto rounded-b-sm" />
              <div className="w-24 h-1.5 bg-[#B0B0B0] mx-auto rounded-full shadow-xs" />
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleActionClick('contact')}
              className="w-full py-4 px-6 bg-[#00C73C] hover:bg-[#00B035] active:scale-[0.99] text-white font-bold text-base sm:text-[17px] rounded-2xl shadow-lg shadow-green-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean mb-3.5 tracking-tight break-keep"
            >
              <span>{config.buttonText}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5] shrink-0" />
            </button>
          </>
        )}

        {/* ---------------------------------------------------- */}
        {/* TEMPLATE 2: Urgent / Featured Listing */}
        {/* ---------------------------------------------------- */}
        {template === 'urgent_listing' && (
          <div className="w-full text-left">
            {/* Top Badge */}
            <div className="flex items-center gap-1.5 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#7A0016] text-white flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#FFD700]" />
                {config.listingTag || '신월성 단독 급매 추천'}
              </span>
              <span className="text-[11px] text-neutral-400 font-medium">실시간 검증 실매물</span>
            </div>

            {/* Complex Name & Spec */}
            <h2 className="font-korean-serif text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {config.listingComplexName}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-1 mb-4 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#7A0016] shrink-0" />
              <span>{config.listingSpec}</span>
            </p>

            {/* Big Price Card */}
            <div className="bg-gradient-to-r from-[#FAF8F5] via-[#FFF9F2] to-[#FAF8F5] border-2 border-[#E5DDD2] rounded-2xl p-4 sm:p-5 mb-4 text-center shadow-xs">
              <span className="text-[11px] font-serif-luxury text-[#7A0016] font-bold tracking-widest uppercase block mb-0.5">
                VERIFIED PRICE · 희망 거래가
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#7A0016] tracking-tight font-serif-luxury">
                {config.listingPrice}
              </div>
            </div>

            {/* Key Advantages */}
            <div className="bg-white border border-neutral-200 rounded-2xl p-4 mb-5 space-y-2 text-xs text-[#333333]">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{config.listingPoint1}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{config.listingPoint2}</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium">{config.listingPoint3}</span>
              </div>
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleActionClick('contact')}
              className="w-full py-4 px-6 bg-[#7A0016] hover:bg-[#580010] active:scale-[0.99] text-white font-bold text-base rounded-2xl shadow-lg shadow-[#7A0016]/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean mb-3.5 tracking-tight"
            >
              <span>{config.listingButtonText || '해당 추천 매물 상세 상담 신청'}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5] shrink-0" />
            </button>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TEMPLATE 3: Agency Editorial Notice */}
        {/* ---------------------------------------------------- */}
        {template === 'agency_notice' && (
          <div className="w-full text-center">
            {/* Elegant Header Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#7A0016]/10 text-[#7A0016] flex items-center justify-center mx-auto mb-3">
              <Building2 className="w-6 h-6 stroke-[1.75]" />
            </div>

            <span className="font-serif-luxury text-[11px] tracking-widest text-[#7A0016] font-bold uppercase block mb-1">
              {config.noticeBadge || 'BOMNAL OFFICIAL NOTICE'}
            </span>

            <h2 className="font-korean-serif text-xl sm:text-2xl font-bold text-[#141414] tracking-tight leading-snug mb-2 break-keep">
              {config.noticeTitle}
            </h2>

            <p className="text-xs text-[#666666] font-medium mb-4 break-keep">
              {config.noticeSubtitle}
            </p>

            {/* Letter Body Card */}
            <div className="bg-[#FAF8F5] border border-[#E5DDD2] rounded-2xl p-4 sm:p-5 text-left text-xs text-[#444444] leading-relaxed mb-4 space-y-3">
              <p className="break-keep">{config.noticeBody}</p>

              {config.noticeHighlight && (
                <div className="p-3 bg-white rounded-xl border border-[#EAE4DC] flex items-center gap-2.5 text-[#7A0016] font-bold text-[11px]">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span>{config.noticeHighlight}</span>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button
              type="button"
              onClick={() => handleActionClick('contact')}
              className="w-full py-4 px-6 bg-[#7A0016] hover:bg-[#580010] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-[#7A0016]/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean mb-3.5 tracking-tight"
            >
              <span>{config.noticeButtonText || '대표 공인중개사 상담 예약'}</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5] shrink-0" />
            </button>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* TEMPLATE 4: Image Poster Banner */}
        {/* ---------------------------------------------------- */}
        {template === 'image_banner' && (
          <div className="w-full">
            {config.bannerImageUrl ? (
              <div className="rounded-2xl overflow-hidden shadow-md border border-neutral-200 mb-4 max-h-[380px] bg-neutral-100 flex items-center justify-center">
                <img 
                  src={config.bannerImageUrl} 
                  alt={config.bannerTitle || '공지 배너'} 
                  className="w-full h-auto object-contain max-h-[380px]"
                />
              </div>
            ) : (
              <div className="w-full py-16 px-4 bg-[#FAF8F5] border-2 border-dashed border-[#D6CEC4] rounded-2xl text-center mb-4 space-y-2">
                <ImageIcon className="w-10 h-10 text-[#7A0016] mx-auto opacity-40" />
                <p className="font-bold text-sm text-[#141414]">등록된 포스터 이미지가 없습니다</p>
                <p className="text-xs text-[#888888]">
                  관리자 창(`F2`)의 팝업 설정 탭에서 원하시는 포스터/안내 이미지(JPG, PNG)를 등록해 주세요.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                if (config.bannerButtonLink && config.bannerButtonLink.startsWith('http')) {
                  window.location.href = config.bannerButtonLink;
                } else {
                  handleActionClick(config.bannerButtonLink?.replace('#', '') || 'contact');
                }
              }}
              className="w-full py-3.5 px-6 bg-[#7A0016] hover:bg-[#580010] active:scale-[0.99] text-white font-bold text-sm sm:text-base rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-clean mb-3.5 tracking-tight"
            >
              <span>{config.bannerButtonText || '자세히 보기'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
            </button>
          </div>
        )}

        {/* Bottom '다시 보지 않기' Text Link (Common to all templates) */}
        <button
          type="button"
          onClick={handleDismissForever}
          className="text-xs sm:text-[13px] text-[#4A68AA] hover:text-[#2E477D] underline underline-offset-4 cursor-pointer font-medium transition-colors"
        >
          다시 보지 않기
        </button>
      </div>
    </div>
  );
};

