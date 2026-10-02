import React, { useState, useEffect } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface BomnalCoverStoryProps {
  onExploreSpaces: () => void;
  onOpenConsult: () => void;
  customHeroImages?: Record<string, string>;
}

export const HERO_SLIDES = [
  {
    id: 'hero-1',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    category: 'e편한세상월배 단지내상가',
    title: 'e편한세상월배 · 상가동 B103호 봄날공인중개사사무소',
    caption: 'e편한세상월배 주출입구 상가동 및 단지 전경',
  },
  {
    id: 'hero-2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    category: '단지 조경 & 테마가든',
    title: 'e편한세상월배 · 중앙 테마 수경 가든',
    caption: '사계절 녹음과 자연 채광이 머무는 친환경 중앙 광장',
  },
  {
    id: 'hero-3',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
    category: '실내 구조 & 인테리어',
    title: '월배 84㎡A · 4Bay 와이드 리빙 스페이스',
    caption: '남향 채광과 맞통풍 구조의 감각적인 거실 인테리어',
  },
  {
    id: 'hero-4',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    category: '랜드마크 대단지',
    title: '월배아이파크 · 1,296세대 명품 대단지 & 초품아',
    caption: '특화된 외관 디자인과 풍부한 단지 내 조경 커뮤니티',
  },
  {
    id: 'hero-5',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    category: '숲세권 힐링 주거',
    title: '월성삼정그린코아 · 숲세권 힐링 & 프리미엄 조망',
    caption: '학산공원 숲세권 조망과 쾌적한 주거 환경',
  },
];

export const BomnalCoverStory: React.FC<BomnalCoverStoryProps> = ({
  onExploreSpaces,
  onOpenConsult,
  customHeroImages = {},
}) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slideshow every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden bg-neutral-950 text-white min-h-[680px] sm:min-h-[740px] lg:min-h-[820px] xl:min-h-[880px] 2xl:min-h-[920px] flex items-center border-b border-[#EAE4DC]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 1. Full-Bleed Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === activeSlideIdx;
          const slideImg = customHeroImages?.[slide.id] || slide.image;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slideImg}
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-102 transition-transform duration-10000 ease-out"
                onError={(e) => {
                  if (slide.fallback && (e.currentTarget as HTMLImageElement).src !== slide.fallback) {
                    (e.currentTarget as HTMLImageElement).src = slide.fallback;
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {/* 2. Left-to-Right Ultra-Smooth Decay Gradient */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-neutral-950/85 from-0% via-neutral-950/50 via-35% via-neutral-950/15 via-55% to-transparent to-75%"
        aria-hidden="true"
      />

      {/* 3. Floating Content Layer */}
      <div className="relative z-20 w-full px-5 sm:px-8 lg:px-12 xl:px-14 py-16 sm:py-24 lg:py-32 flex flex-col justify-between min-h-[680px] sm:min-h-[740px] lg:min-h-[820px] xl:min-h-[880px] 2xl:min-h-[920px]">
        {/* Left Side Content */}
        <div className="w-full sm:max-w-[560px] md:max-w-[620px] lg:max-w-[680px] flex flex-col justify-center space-y-5 my-auto text-left">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#E0D8CB] text-xs font-serif-luxury tracking-[0.25em] uppercase self-start">
            <span>Life &amp; Style Editorial</span>
          </div>

          {/* Headline */}
          <h1 className="font-korean-serif text-2xl sm:text-4xl lg:text-[3rem] xl:text-[3.25rem] font-bold tracking-tight text-white leading-[1.3] drop-shadow-md break-keep">
            빛과 바람이 머무는 곳,<br />
            신월성지구의 <span className="italic font-serif-luxury font-medium text-[#E0D8CB] whitespace-nowrap">탁월한 선택!</span>
          </h1>

          <div className="w-12 h-[2px] bg-[#E0D8CB] my-2" />

          {/* Subtitle / Excerpt */}
          <p className="text-xs sm:text-sm lg:text-base text-[#E2DDD5] font-sans-clean leading-relaxed break-keep">
            e편한세상월배에서 11년간 한결같이 지켜온 봄날공인중개사사무소는<br className="hidden sm:inline" />
            정확한 시세 분석과 신뢰할 수 있는 실매물로 최적의 주거 선택을 함께합니다.
          </p>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onExploreSpaces}
              className="px-6 py-3.5 bg-white text-[#141414] hover:bg-[#E0D8CB] font-semibold text-xs tracking-wider flex items-center gap-2 transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              <span>대표 단지 보기</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7A0016]" />
            </button>

            <a
              href={REALTOR_INFO.naverLandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-black/40 hover:bg-black/60 border border-white/30 text-white font-medium text-xs tracking-wider flex items-center gap-1.5 transition-all backdrop-blur-sm shadow-sm"
            >
              <span>네이버 확인매물</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E0D8CB]" />
            </a>

            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="px-5 py-3.5 bg-[#E0D8CB] hover:bg-[#EDE7DE] text-[#1A1A1A] font-semibold text-xs tracking-wider flex items-center gap-1.5 transition-all shadow-sm hover:scale-[1.02]"
            >
              <span>전화 상담</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#7A0016]" />
            </a>
          </div>

          {/* Trust Numbers */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#5E93E5]/30 text-xs">
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold text-[#5E93E5] block drop-shadow-sm">
                11<span className="text-[10px] sm:text-xs text-[#8BB7F5] font-semibold tracking-wider uppercase ml-1">YEARS+</span>
              </span>
              <span className="text-[11px] sm:text-xs text-[#B6D3F8] font-sans-clean font-medium">월성동 전문</span>
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold text-[#5E93E5] block drop-shadow-sm">
                0<span className="text-[10px] sm:text-xs text-[#8BB7F5] font-semibold tracking-wider uppercase ml-1">ACCIDENT</span>
              </span>
              <span className="text-[11px] sm:text-xs text-[#B6D3F8] font-sans-clean font-medium">무사고 안심</span>
            </div>
            <div>
              <span className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold text-[#5E93E5] block drop-shadow-sm">
                100<span className="text-[10px] sm:text-xs text-[#8BB7F5] font-semibold tracking-wider uppercase ml-1">%</span>
              </span>
              <span className="text-[11px] sm:text-xs text-[#B6D3F8] font-sans-clean font-medium">책임중개</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
