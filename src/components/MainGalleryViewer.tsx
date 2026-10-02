import React, { useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Phone, Maximize2, MapPin, Building, Sparkles } from 'lucide-react';
import { ComplexGalleryData, GallerySlide } from '../data/galleryData';
import { REALTOR_INFO } from '../data/mockData';

interface MainGalleryViewerProps {
  complex: ComplexGalleryData;
  currentSlideIndex: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onSelectSlide: (index: number) => void;
  onOpenConsult: () => void;
  onOpenComplexDetail: () => void;
}

export const MainGalleryViewer: React.FC<MainGalleryViewerProps> = ({
  complex,
  currentSlideIndex,
  onPrevSlide,
  onNextSlide,
  onSelectSlide,
  onOpenConsult,
  onOpenComplexDetail,
}) => {
  const currentSlide: GallerySlide = complex.slides[currentSlideIndex] || complex.slides[0];

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      onPrevSlide();
    } else if (e.key === 'ArrowRight') {
      onNextSlide();
    }
  }, [onPrevSlide, onNextSlide]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative w-full bg-[#FFFFFF] flex flex-col items-center">
      {/* Immersive Main Image Exhibition Frame */}
      <div className="relative w-full max-w-[1720px] mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/9.2] max-h-[78vh] rounded-none sm:rounded-sm overflow-hidden bg-neutral-900 shadow-xl group">
          {/* Main High-Resolution Photo */}
          <img
            key={`${complex.id}-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center transition-opacity duration-500 select-none"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop';
            }}
          />

          {/* Left Arrow (<) - Sleek minimal chevron as in screenshot */}
          <button
            id="gallery-arrow-left"
            type="button"
            onClick={onPrevSlide}
            aria-label="이전 사진 보기"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-20 sm:w-14 sm:h-24 flex items-center justify-center text-white/80 hover:text-white transition-all drop-shadow-md hover:scale-110 active:scale-95 group-hover:opacity-100"
          >
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
          </button>

          {/* Right Arrow (>) - Sleek minimal chevron as in screenshot */}
          <button
            id="gallery-arrow-right"
            type="button"
            onClick={onNextSlide}
            aria-label="다음 사진 보기"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-20 sm:w-14 sm:h-24 flex items-center justify-center text-white/80 hover:text-white transition-all drop-shadow-md hover:scale-110 active:scale-95 group-hover:opacity-100"
          >
            <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
          </button>

          {/* Subtle Category Pill on Image Top Left */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 text-white text-xs font-mono tracking-widest uppercase">
            <span className="text-[#C5A880] mr-1.5 font-bold">●</span>
            {currentSlide.category}
          </div>

          {/* Top Right Quick Specs Badge */}
          {complex.id === 'epyeonhan' && (
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-[#7A0016]/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm text-white text-xs font-semibold tracking-wider">
              봄날공인중개사 상가동 B103호 전담
            </div>
          )}
        </div>

        {/* Bottom Captions & Concierge Action Bar */}
        <div className="mt-4 sm:mt-6 pb-4 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAEAEA]">
          {/* Slide Description & Architectural Specs */}
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-serif-luxury tracking-widest text-[#7A0016] uppercase font-bold">
              <span>{complex.name}</span>
              <span className="text-neutral-400">·</span>
              <span>{complex.subTitle}</span>
            </div>

            <h2 className="font-korean-serif text-2xl sm:text-3xl font-bold text-[#141414] tracking-tight">
              {currentSlide.title}
            </h2>

            <p className="text-sm sm:text-base text-[#555555] font-sans-clean leading-relaxed">
              {currentSlide.description}
            </p>

            {currentSlide.specs && (
              <p className="text-xs text-[#888888] font-sans-clean pt-0.5">
                <strong className="text-[#141414] font-medium mr-1.5">제원 정보:</strong>
                {currentSlide.specs}
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0">
            {/* Naver Land Direct Button */}
            <a
              id="gallery-naver-btn"
              href={complex.naverLandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-sm bg-[#03C75A] hover:bg-[#02b150] text-white text-xs font-semibold tracking-wider transition-colors shadow-xs"
            >
              <span>네이버 실매물 확인</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Consultation Trigger */}
            <button
              id="gallery-consult-trigger-btn"
              type="button"
              onClick={onOpenConsult}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-sm bg-[#7A0016] hover:bg-[#580010] text-[#FAF8F5] text-xs font-semibold tracking-wider transition-colors shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1:1 전담 상담예약</span>
            </button>

            {/* Direct Phone Call */}
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm bg-neutral-100 hover:bg-neutral-200 text-[#141414] text-xs font-semibold border border-neutral-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#7A0016]" />
              <span>{REALTOR_INFO.phone}</span>
            </a>
          </div>
        </div>

        {/* Thumbnail Filmstrip Preview - Clickable Jump to Any Slide */}
        <div className="mt-4 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2">
          {complex.slides.map((s, idx) => {
            const isSelected = currentSlideIndex === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onSelectSlide(idx)}
                className={`relative shrink-0 w-20 sm:w-28 aspect-[16/10] rounded-sm overflow-hidden border-2 transition-all ${
                  isSelected
                    ? 'border-[#7A0016] ring-2 ring-[#7A0016]/30 opacity-100 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-mono text-center py-0.5 truncate px-1">
                  0{idx + 1}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
