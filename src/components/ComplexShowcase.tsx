import React, { useState } from 'react';
import { ExternalLink, Building2, MapPin, Check, ChevronRight, Eye, Calendar, Sparkles } from 'lucide-react';
import { APARTMENT_COMPLEXES, REALTOR_INFO } from '../data/mockData';
import { ApartmentComplex } from '../types';

interface ComplexShowcaseProps {
  onSelectComplexForConsult: (complexName: string) => void;
}

export const ComplexShowcase: React.FC<ComplexShowcaseProps> = ({ onSelectComplexForConsult }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'landmark' | 'new' | 'premium'>('all');
  const [activeModalComplex, setActiveModalComplex] = useState<ApartmentComplex | null>(null);

  const filteredComplexes = selectedCategory === 'all'
    ? APARTMENT_COMPLEXES
    : APARTMENT_COMPLEXES.filter(c => c.category === selectedCategory);

  return (
    <section id="complexes" className="py-20 md:py-28 bg-[#FAF8F5] text-[#141414] relative overflow-hidden border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#EAE4DC]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Wolseong Premier Residences</span>
            </div>
            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414] mb-3">
              주요 전문 단지 &amp; 네이버 실매물
            </h2>
            <div className="w-12 h-0.5 bg-[#7A0016] mb-3" />
            <p className="text-sm sm:text-base text-[#555555] font-sans-clean max-w-2xl leading-relaxed">
              봄날공인중개사사무소가 상가동(B103호)에서 직접 관리하는 e편한세상월배를 비롯하여, 
              월성동을 대표하는 하이엔드 주거 단지의 네이버 공식 실매물과 단지 정보를 확인하세요.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              id="showcase-all-naver-btn"
              href={REALTOR_INFO.naverLandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A0016] text-[#FAF8F5] text-xs font-semibold tracking-wider hover:bg-[#580010] transition-colors shadow-md active:scale-95"
            >
              <span>네이버 봄날 매물 전체보기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#7A0016] text-[#FAF8F5] shadow-xs'
                : 'bg-white text-[#555555] hover:bg-[#EAE4DC] border border-[#DFD7CB]'
            }`}
          >
            전체 단지 보기 ({APARTMENT_COMPLEXES.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('landmark')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              selectedCategory === 'landmark'
                ? 'bg-[#7A0016] text-[#FAF8F5] shadow-xs'
                : 'bg-white text-[#555555] hover:bg-[#EAE4DC] border border-[#DFD7CB]'
            }`}
          >
            랜드마크 코어 (e편한세상월배 / 아이파크)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('new')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              selectedCategory === 'new'
                ? 'bg-[#7A0016] text-[#FAF8F5] shadow-xs'
                : 'bg-white text-[#555555] hover:bg-[#EAE4DC] border border-[#DFD7CB]'
            }`}
          >
            신축 대단지 (월성삼정 등)
          </button>
          <button
            type="button"
            onClick={() => setSelectedCategory('premium')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
              selectedCategory === 'premium'
                ? 'bg-[#7A0016] text-[#FAF8F5] shadow-xs'
                : 'bg-white text-[#555555] hover:bg-[#EAE4DC] border border-[#DFD7CB]'
            }`}
          >
            인기 주거 타운 (협성휴포레 외)
          </button>
        </div>

        {/* Complexes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComplexes.map((complex) => {
            const isEpyeonhan = complex.id === 'epyeonhan-wolbae';
            return (
              <div
                key={complex.id}
                className={`rounded-2xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl ${
                  isEpyeonhan
                    ? 'border-[#7A0016]/50 ring-1 ring-[#7A0016]/30'
                    : 'border-[#E6DFC5] hover:border-[#7A0016]/30'
                }`}
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                    <img
                      src={complex.image}
                      alt={complex.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop';
                      }}
                    />

                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Landmark Badge */}
                    {isEpyeonhan && (
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#7A0016] text-white text-[11px] font-semibold tracking-wider shadow-md">
                        봄날 상가동 전담 단지
                      </div>
                    )}

                    {/* Bottom Title on Image */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-[10px] font-serif-luxury tracking-widest text-[#C5A880] uppercase">
                        {complex.subName || 'Wolseong Residence'}
                      </div>
                      <h3 className="font-korean-serif text-xl font-bold tracking-tight">
                        {complex.name}
                      </h3>
                      <p className="text-xs text-[#FAF8F5]/90 line-clamp-1 mt-0.5">
                        {complex.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Complex Specifications */}
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] text-center text-xs">
                      <div>
                        <span className="text-[#888888] text-[10px] block">총 세대수</span>
                        <strong className="text-[#141414] font-semibold">{complex.totalUnits}</strong>
                      </div>
                      <div>
                        <span className="text-[#888888] text-[10px] block">규모</span>
                        <strong className="text-[#141414] font-semibold">{complex.dongCount}</strong>
                      </div>
                      <div>
                        <span className="text-[#888888] text-[10px] block">준공년월</span>
                        <strong className="text-[#141414] font-semibold">{complex.builtYear}</strong>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      {complex.highlights.slice(0, 3).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#444444] font-sans-clean">
                          <Check className="w-3.5 h-3.5 text-[#7A0016] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>

                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs text-[#777777] font-sans-clean pt-2 border-t border-[#F0EBE3]">
                      <MapPin className="w-3.5 h-3.5 text-[#7A0016] shrink-0" />
                      <span className="truncate">{complex.locationDesc}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <a
                    href={complex.naverLandUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 rounded-xl bg-[#03C75A] hover:bg-[#02b150] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>네이버 실매물</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectComplexForConsult(complex.name)}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-[#7A0016] hover:text-white text-[#7A0016] text-xs font-semibold border border-[#7A0016]/30 flex items-center justify-center gap-1 transition-all"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>전담 상담신청</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
