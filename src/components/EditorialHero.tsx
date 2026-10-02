import React from 'react';
import { ArrowRight, ExternalLink, Calendar, MapPin, Sparkles, Building, Phone } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface EditorialHeroProps {
  onOpenConsult: () => void;
  onExploreComplexes: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onOpenConsult,
  onExploreComplexes,
}) => {
  return (
    <section className="relative bg-[#FFFFFF] text-[#141414] overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Subtitle & Pre-heading */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
            <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold">
              Wolseong High-End Residential Concierge
            </span>
          </div>

          <div className="text-xs text-[#777777] font-sans-clean hidden sm:flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#7A0016]" />
            <span>대구광역시 달서구 월성로 132 e편한세상월배 상가동 B103호</span>
          </div>
        </div>

        {/* Hero Title & Vision Statement */}
        <div className="max-w-4xl mb-10">
          <h1 className="font-korean-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#141414] leading-[1.2] mb-6">
            월성동 주거의 새로운 시선, <br />
            공간의 품격을 전하는 <span className="text-[#7A0016] font-serif-luxury italic font-medium">Bomnal</span>
          </h1>
          <p className="text-base sm:text-lg text-[#555555] font-sans-clean leading-relaxed max-w-3xl">
            단순한 매물 중개를 넘어, 가족의 라이프스타일과 미래 가치를 온전히 담아냅니다. <br className="hidden sm:inline" />
            e편한세상월배 단지 내 상가에서 11년간 축적한 정확한 데이터와 신뢰로 
            월성동 주요 프리미엄 단지를 가장 깊이 있게 안내해 드립니다.
          </p>
        </div>

        {/* Massive Image-First Exhibition Banner */}
        <div className="relative w-full rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] lg:aspect-[24/10] bg-neutral-900 shadow-2xl group border border-[#E6DFC5]">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop"
            alt="e편한세상월배 봄날공인중개사사무소 단지 전경"
            className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop';
            }}
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <div className="max-w-3xl">
              <div className="inline-block px-3 py-1 rounded-sm bg-[#7A0016] text-white text-xs font-semibold tracking-wider mb-2">
                FEATURED LANDMARK
              </div>
              <h2 className="font-korean-serif text-xl sm:text-3xl font-bold text-white mb-2">
                e편한세상월배 · 봄날공인중개사사무소 입점 단지
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-sans-clean line-clamp-2 max-w-2xl">
                932세대 대단지 공원형 아파트, 채광 좋은 4Bay 판상형 구조와 친환경 테마 조경.
                상가동 B103호에서 실시간 급매물 및 로열층 동호수를 가장 빠르게 확인하세요.
              </p>
            </div>
          </div>
        </div>

        {/* Hero Quick Navigation Action Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t border-[#F0EBE3]">
          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#complexes"
              onClick={onExploreComplexes}
              className="px-6 py-3.5 rounded-sm bg-[#141414] hover:bg-[#333333] text-white text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>주요 단지 둘러보기</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href={REALTOR_INFO.naverLandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-sm bg-[#03C75A] hover:bg-[#02b150] text-white text-xs sm:text-sm font-semibold tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              <span>네이버 확인매물 연동</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <a
              href="#consultation"
              onClick={onOpenConsult}
              className="px-6 py-3.5 rounded-sm bg-[#FAF8F5] hover:bg-[#F3EFE9] text-[#7A0016] border border-[#DFD7CB] text-xs sm:text-sm font-bold tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#7A0016]" />
              <span>1:1 상담 예약</span>
            </a>
          </div>

          {/* Direct Hotline */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#FAF8F5] rounded-xl border border-[#EAE4DC] self-start sm:self-auto">
            <div className="w-8 h-8 rounded-full bg-[#7A0016] text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-[#777777] block font-sans-clean">장순조 대표 직통전화</span>
              <a href={`tel:${REALTOR_INFO.phone}`} className="text-sm font-bold text-[#141414] hover:text-[#7A0016] font-mono">
                {REALTOR_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
