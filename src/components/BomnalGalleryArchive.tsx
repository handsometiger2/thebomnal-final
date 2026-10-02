import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, ArrowRight, Phone } from 'lucide-react';
import { WOLSEONG_COMPLEXES_GALLERY } from '../data/galleryData';
import { REALTOR_INFO } from '../data/mockData';

interface BomnalGalleryArchiveProps {
  onOpenConsultWithTopic?: (topic: string) => void;
}

export const BomnalGalleryArchive: React.FC<BomnalGalleryArchiveProps> = ({
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
    <section id="gallery" className="py-20 sm:py-28 bg-[#FBF9F5] border-b border-[#EAEAEA] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8">
        {/* Gallery Masthead */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#141414] pb-6 mb-10">
          <div>
            <span className="font-serif-luxury text-xs tracking-[0.3em] text-[#7A0016] uppercase font-bold block mb-2">
              Complex Photo Gallery
            </span>
            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414]">
              단지별 실사진 갤러리
            </h2>
            <p className="text-sm text-[#666666] font-sans-clean mt-2">
              단지 외관부터 조경, 단지 배치도, 평면도 및 내부 구조 실사진 안내
            </p>
          </div>

          {/* Complex Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
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
                  className={`px-4 py-2 text-xs font-sans-clean font-medium tracking-normal whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#141414] text-white border-[#141414]'
                      : 'bg-white text-[#666666] border-[#D5CCC0] hover:border-[#141414]'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Exhibition Stage Frame */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] max-h-[75vh] overflow-hidden bg-neutral-900 border border-[#EAEAEA] shadow-sm group">
          <img
            key={`${complex.id}-${currentSlide.id}`}
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center transition-all duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop';
            }}
          />

          {/* Minimalist Editorial Controls (< PREV / NEXT >) */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="이전 화보"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-20 flex items-center justify-center text-white/90 hover:text-white bg-black/30 hover:bg-black/60 backdrop-blur-xs transition-all"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="다음 화보"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-20 flex items-center justify-center text-white/90 hover:text-white bg-black/30 hover:bg-black/60 backdrop-blur-xs transition-all"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Slide Indicator Badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/90 backdrop-blur-md px-3.5 py-1 text-xs font-mono tracking-widest text-[#141414] border border-[#E0D8CB]">
            <span className="font-bold text-[#7A0016]">{formattedCurrent}</span>
            <span className="mx-1 text-neutral-400">/</span>
            <span>{formattedTotal}</span>
          </div>

          {/* Category Tag */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-black/70 backdrop-blur-md px-3.5 py-1 text-white text-xs font-serif-luxury tracking-widest uppercase">
            {currentSlide.category}
          </div>
        </div>

        {/* Photographic Caption & Editorial Actions */}
        <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#EAEAEA]">
          <div className="space-y-2 max-w-3xl">
            <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold block">
              {complex.name} · {complex.subTitle}
            </span>
            <h3 className="font-korean-serif text-2xl sm:text-3xl font-bold text-[#141414]">
              {currentSlide.title}
            </h3>
            <p className="text-sm text-[#555555] font-sans-clean leading-relaxed">
              {currentSlide.description}
            </p>
            {currentSlide.specs && (
              <p className="text-xs text-[#888888] font-sans-clean pt-1">
                <span className="font-semibold text-[#141414] mr-2">공간 제원:</span>
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
              className="px-5 py-3 bg-[#FAF8F5] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#D5CCC0] text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-all"
            >
              <span>네이버 실시간 매물</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="px-5 py-3 bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-serif-luxury tracking-widest uppercase flex items-center gap-2 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>매물 상담 문의</span>
            </a>
          </div>
        </div>

        {/* Filmstrip Contact Sheet */}
        <div className="mt-4 flex items-center gap-3 overflow-x-auto no-scrollbar py-2">
          {complex.slides.map((s, idx) => {
            const isSelected = currentSlideIdx === idx;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setCurrentSlideIdx(idx)}
                className={`relative shrink-0 w-28 sm:w-36 aspect-[16/10] overflow-hidden transition-all border-2 ${
                  isSelected
                    ? 'border-[#7A0016] opacity-100 scale-102'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={s.image}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[10px] font-mono text-center py-0.5">
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
