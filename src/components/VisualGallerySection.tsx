import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Sparkles, Maximize2 } from 'lucide-react';
import { WOLSEONG_COMPLEXES_GALLERY, ComplexGalleryData } from '../data/galleryData';
import { REALTOR_INFO } from '../data/mockData';

interface VisualGallerySectionProps {
  onOpenConsultWithTopic?: (topic: string) => void;
}

export const VisualGallerySection: React.FC<VisualGallerySectionProps> = ({
  onOpenConsultWithTopic,
}) => {
  const [selectedComplexIdx, setSelectedComplexIdx] = useState(0);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  const complex = WOLSEONG_COMPLEXES_GALLERY[selectedComplexIdx];
  const totalSlides = complex.slides.length;
  const currentSlide = complex.slides[currentSlideIdx];

  const handlePrev = () => {
    setCurrentSlideIdx((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIdx((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const formattedCurrent = String(currentSlideIdx + 1).padStart(2, '0');
  const formattedTotal = String(totalSlides).padStart(2, '0');

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#FFFFFF] text-[#141414] border-b border-[#EAE4DC]">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
              <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold">
                Interactive Visual Gallery
              </span>
            </div>
            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414]">
              아파트 주거 갤러리
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans-clean mt-2 max-w-2xl">
              단지 전경부터 테마 정원, 실제 평면도, 실내 인테리어까지 고화질 아카이브로 확인하세요.
            </p>
          </div>

          {/* Complex Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {WOLSEONG_COMPLEXES_GALLERY.map((c, idx) => {
              const isActive = selectedComplexIdx === idx;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedComplexIdx(idx);
                    setCurrentSlideIdx(0);
                  }}
                  className={`px-4 py-2 rounded-sm text-xs font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#141414] text-white border-[#141414] shadow-xs'
                      : 'bg-white text-[#444444] border-[#E2E2E2] hover:border-[#141414] hover:bg-neutral-50'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Exhibition Viewer Frame */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[75vh] rounded-xl overflow-hidden bg-neutral-900 shadow-xl group border border-[#EAEAEA]">
          <img
            key={`${complex.id}-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center transition-opacity duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop';
            }}
          />

          {/* Left Arrow (<) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="이전 사진"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-20 sm:w-14 sm:h-24 flex items-center justify-center text-white/80 hover:text-white transition-all drop-shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
          </button>

          {/* Right Arrow (>) */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 사진"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-20 sm:w-14 sm:h-24 flex items-center justify-center text-white/80 hover:text-white transition-all drop-shadow-md hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12 stroke-[1.5]" />
          </button>

          {/* Top Left Category Pill */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-white/20 text-white text-xs font-mono tracking-widest uppercase">
            <span className="text-[#C5A880] mr-1.5 font-bold">●</span>
            {currentSlide.category}
          </div>

          {/* Top Right Counter (01 / 06) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/20 font-mono text-sm tracking-widest font-semibold text-white">
            <span className="text-[#FAF8F5] font-bold">{formattedCurrent}</span>
            <span className="text-white/60 mx-1">/</span>
            <span className="text-white/60">{formattedTotal}</span>
          </div>
        </div>

        {/* Captions & Actions */}
        <div className="mt-4 sm:mt-6 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#EAEAEA]">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-serif-luxury tracking-widest text-[#7A0016] uppercase font-bold">
              <span>{complex.name}</span>
              <span className="text-neutral-400">·</span>
              <span>{complex.subTitle}</span>
            </div>
            <h3 className="font-korean-serif text-2xl sm:text-3xl font-bold text-[#141414]">
              {currentSlide.title}
            </h3>
            <p className="text-sm text-[#555555] font-sans-clean leading-relaxed">
              {currentSlide.description}
            </p>
            {currentSlide.specs && (
              <p className="text-xs text-[#888888] font-sans-clean pt-0.5">
                <strong className="text-[#141414] font-medium mr-1.5">상세 제원:</strong>
                {currentSlide.specs}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={complex.naverLandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-sm bg-[#03C75A] hover:bg-[#02b150] text-white text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>네이버 실매물</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => {
                if (onOpenConsultWithTopic) {
                  onOpenConsultWithTopic(`${complex.name} - ${currentSlide.title}`);
                }
              }}
              className="px-5 py-2.5 rounded-sm bg-[#7A0016] hover:bg-[#580010] text-[#FAF8F5] text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>이 공간 상담 예약</span>
            </button>
          </div>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="mt-4 flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar py-2">
          {complex.slides.map((s, idx) => {
            const isSelected = currentSlideIdx === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlideIdx(idx)}
                className={`relative shrink-0 w-24 sm:w-32 aspect-[16/10] rounded-sm overflow-hidden border-2 transition-all ${
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
    </section>
  );
};
