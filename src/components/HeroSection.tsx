import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Sparkles, Building2, CheckCircle2, ShieldCheck, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { REALTOR_INFO, TRUST_POINTS } from '../data/mockData';

interface HeroSectionProps {
  onOpenConsult: () => void;
  onScrollToGallery: () => void;
}

const HERO_SLIDES_2 = [
  {
    id: 'hero-1',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    tag: '단지 상가 입점',
    engTitle: 'e-Pyeonhansesang Wolbae',
    title: 'e편한세상월배 932세대 대단지',
    sub: '상가동 B103호 봄날부동산 실시간 실매물 보유',
    scale: '932세대',
    pyeong: '85㎡ · 111㎡ · 113㎡',
    realtor: '장순조 대표',
  },
  {
    id: 'hero-2',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    tag: '친환경 수경 정원',
    engTitle: 'Eco Central Garden',
    title: 'e편한세상 테마 산책로 & 분수 광장',
    sub: '사계절 푸른 조경과 아이들이 안전한 차 없는 단지',
    scale: '지상 공원형',
    pyeong: '쾌적한 보행로',
    realtor: '단지 전문',
  },
  {
    id: 'hero-3',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
    tag: '남향 와이드 리빙',
    engTitle: 'Living & Interior Spec',
    title: '월배 대표 84㎡A 4Bay 채광 거실',
    sub: '풍부한 일조량과 탁 트인 조망의 로열층 실매물',
    scale: '4Bay 판상형',
    pyeong: '전용 84㎡',
    realtor: '실매물 확인',
  },
  {
    id: 'hero-4',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    tag: '세계적 건축 거장',
    engTitle: 'Wolbae IPARK Landmark',
    title: '월배아이파크 1,296세대 랜드마크',
    sub: '벤 판 베르켈의 독창적 외관과 대단지 인프라',
    scale: '1,296세대',
    pyeong: '59㎡~102㎡',
    realtor: '월성동 전역',
  },
  {
    id: 'hero-5',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
    fallback: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    tag: '본리공원 숲세권',
    engTitle: 'Forest View Living',
    title: '월성삼정그린코아 포레스트',
    sub: '공원 파노라마 숲세권 조망과 감성적 다이닝 공간',
    scale: '숲세권 프리미엄',
    pyeong: '84㎡',
    realtor: '맞춤 컨설팅',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenConsult, onScrollToGallery }) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlideIdx((prev) => (prev + 1) % HERO_SLIDES_2.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setActiveSlideIdx((prev) => (prev === 0 ? HERO_SLIDES_2.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlideIdx((prev) => (prev + 1) % HERO_SLIDES_2.length);
  };

  const current = HERO_SLIDES_2[activeSlideIdx];
  return (
    <section id="hero-section" className="relative overflow-hidden bg-[#FAF8F5] text-[#141414] pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#EAE4DC]">
      {/* Subtle Warm Architectural Ambient Canvas */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#7A0016]/5 via-[#C5A880]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#FAF0E6] to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Luminous Editorial Headline & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Elegant Subtitle Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#DFD7CB] text-[#7A0016] text-xs uppercase tracking-[0.2em] font-sans-clean mb-6 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#7A0016]" />
              <span className="font-semibold">DAEGU WOLSEONG RESIDENTIAL GALLERY</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-korean-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.2] tracking-tight text-[#141414] mb-6">
              월성동 주거의 <br />
              <span className="text-[#7A0016]">새로운 가치</span>를 제안하는 봄날
            </h1>

            {/* Body Copy */}
            <p className="text-[#4A4A4A] font-sans-clean text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              대구 달서구 월성동 <strong>e편한세상월배</strong> 단지 상가(B103호)에서 11년을 주민과 함께해 온
              <strong className="text-[#141414] font-semibold ml-1">장순조 대표 공인중개사</strong>의
              하이엔드 주거 갤러리 &amp; 프라이빗 맞춤 안심 컨시어지.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-10">
              {/* Primary Gallery Button */}
              <a
                id="hero-gallery-direct-btn"
                href={REALTOR_INFO.apartmentGalleryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-[#7A0016] text-[#FAF8F5] font-semibold text-sm tracking-wider hover:bg-[#580010] transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <Building2 className="w-4 h-4 text-[#FAF8F5]" />
                <span>아파트 갤러리 3D/VR 뷰</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              {/* Naver Land Link */}
              <a
                id="hero-naver-land-btn"
                href={REALTOR_INFO.naverLandUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white border border-[#D5CCC0] text-[#141414] font-semibold text-sm tracking-wider hover:border-[#7A0016] hover:text-[#7A0016] transition-all shadow-2xs active:scale-95"
              >
                <span>네이버 실시간 매물</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60" />
              </a>

              {/* Consultation Button */}
              <button
                id="hero-consult-btn"
                type="button"
                onClick={onOpenConsult}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#F4EFE6] border border-[#E2DAD0] text-[#7A0016] font-semibold text-sm tracking-wider hover:bg-[#EDE5DA] transition-all active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>1:1 상담 예약</span>
              </button>
            </div>

            {/* Trust Highlights Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#555555] font-sans-clean pt-6 border-t border-[#EAE4DC] w-full">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#7A0016]" />
                전세사기 안심보장 지정업소
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#7A0016]" />
                100% 협회 공제증서 교부
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#7A0016]" />
                e편한세상월배 상가동 B103호
              </span>
            </div>
          </div>

          {/* Right Column: Luminous Gallery Card Visual */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-white p-3 shadow-xl border border-[#E6DFC5]/80">
              {/* Top Tag & Slide Controls */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-[#F0EBE3] mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7A0016] animate-pulse" />
                  <span className="text-xs font-serif-luxury tracking-widest text-[#7A0016] uppercase font-bold">
                    Featured Gallery Landmark
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#FAF0E6] px-1.5 py-0.5 rounded text-[11px] text-[#7A0016] font-semibold">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="hover:text-[#580010] p-0.5"
                      aria-label="이전 사진"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                    <span className="font-mono text-[10px] px-1">
                      {activeSlideIdx + 1}/{HERO_SLIDES_2.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="hover:text-[#580010] p-0.5"
                      aria-label="다음 사진"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <span className="text-[11px] font-sans-clean px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#7A0016] font-semibold">
                    {current.tag}
                  </span>
                </div>
              </div>

              {/* Main Vivid Image with Fade Transition */}
              <div
                className="relative aspect-[16/11] rounded-xl overflow-hidden mb-3.5 bg-neutral-900 group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {HERO_SLIDES_2.map((slide, idx) => {
                  const isActive = idx === activeSlideIdx;
                  return (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          if (slide.fallback && (e.currentTarget as HTMLImageElement).src !== slide.fallback) {
                            (e.currentTarget as HTMLImageElement).src = slide.fallback;
                          }
                        }}
                      />
                    </div>
                  );
                })}

                <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4 pointer-events-none">
                  <div>
                    <span className="text-[10px] font-serif-luxury tracking-widest text-[#C5A880] uppercase block">
                      {current.engTitle}
                    </span>
                    <h3 className="font-korean-serif text-lg sm:text-xl font-bold text-white transition-all">
                      {current.title}
                    </h3>
                    <p className="text-xs text-[#FAF8F5]/90 font-sans-clean mt-0.5">
                      {current.sub}
                    </p>
                  </div>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#EDE7DD] text-center text-xs mb-3">
                <div>
                  <span className="text-[#888888] text-[10px] block">단지 / 규모</span>
                  <strong className="text-[#141414] font-bold">{current.scale}</strong>
                </div>
                <div>
                  <span className="text-[#888888] text-[10px] block">공간 타입</span>
                  <strong className="text-[#141414] font-bold">{current.pyeong}</strong>
                </div>
                <div>
                  <span className="text-[#888888] text-[10px] block">담당 중개사</span>
                  <strong className="text-[#7A0016] font-bold">{current.realtor}</strong>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={onScrollToGallery}
                  className="w-full py-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#7A0016] hover:text-white text-[#7A0016] text-xs font-semibold tracking-wider transition-all border border-[#7A0016]/30 text-center"
                >
                  단지 갤러리 둘러보기
                </button>
                <a
                  href={REALTOR_INFO.apartmentGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-lg bg-[#141414] hover:bg-[#2A2A2A] text-white text-xs font-semibold tracking-wider transition-all text-center flex items-center justify-center gap-1"
                >
                  <span>3D 뷰어 열기</span>
                  <ExternalLink className="w-3 h-3 text-[#C5A880]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Trust - Light Gallery Aesthetics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16 pt-10 border-t border-[#EAE4DC]">
          {TRUST_POINTS.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-white border border-[#E6DFC5]/80 shadow-2xs hover:border-[#7A0016]/40 transition-all hover:shadow-md"
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="font-serif-luxury text-3xl md:text-4xl font-bold text-[#7A0016]">
                  {item.number}
                </span>
                <span className="text-xs font-serif-luxury text-[#7A0016] font-semibold tracking-wider">
                  {item.unit}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#141414] mb-1.5 font-korean-serif">
                {item.title}
              </h4>
              <p className="text-xs text-[#666666] leading-relaxed font-sans-clean">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
