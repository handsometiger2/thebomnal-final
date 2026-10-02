import React, { useState } from 'react';
import { ExternalLink, Calendar, MapPin, Building, Check, ArrowRight } from 'lucide-react';
import { APARTMENT_COMPLEXES } from '../data/mockData';
import { ApartmentComplex } from '../types';

interface ComplexShowcaseEditorialProps {
  onSelectComplexForConsult: (complexName: string) => void;
}

export const ComplexShowcaseEditorial: React.FC<ComplexShowcaseEditorialProps> = ({
  onSelectComplexForConsult,
}) => {
  const [filter, setFilter] = useState<'all' | 'landmark' | 'new' | 'premium'>('all');

  const filteredComplexes: ApartmentComplex[] = filter === 'all'
    ? APARTMENT_COMPLEXES
    : APARTMENT_COMPLEXES.filter((c: ApartmentComplex) => c.category === filter);

  return (
    <section id="complexes" className="py-20 sm:py-28 bg-[#FAF8F5] text-[#141414] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
              <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold">
                Wolseong Residential Portfolio
              </span>
            </div>
            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414]">
              월성동 주요 프리미엄 단지
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans-clean mt-2 max-w-2xl leading-relaxed">
              봄날공인중개사사무소가 직접 분석하고 엄선한 월성·월배 권역의 대표 주거 단지 아카이브입니다.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'all', label: '전체 단지' },
              { id: 'landmark', label: '랜드마크 단지' },
              { id: 'new', label: '신축 & 준신축' },
              { id: 'premium', label: '명품 대단지' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  filter === tab.id
                    ? 'bg-[#141414] text-white border-[#141414] shadow-xs'
                    : 'bg-white text-[#555555] border-[#DFD7CB] hover:border-[#141414]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Large Image-Focused Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredComplexes.map((complex: ApartmentComplex) => {
            const isEpyeonhan = complex.id === 'epyeonhan-wolbae';

            return (
              <div
                key={complex.id}
                className="group bg-white rounded-2xl overflow-hidden border border-[#E6DFC5] hover:border-[#7A0016] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Large Architectural Photography Frame */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                  <img
                    src={complex.image}
                    alt={complex.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Top Left Tag */}
                  {isEpyeonhan ? (
                    <div className="absolute top-3 left-3 bg-[#7A0016] text-white px-3 py-1 rounded text-xs font-bold shadow-md">
                      봄날부동산 상가동 입점
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[#141414] px-2.5 py-1 rounded text-[11px] font-bold">
                      {complex.totalUnits}
                    </div>
                  )}

                  {/* Built Year Tag */}
                  <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-neutral-200 px-2.5 py-0.5 rounded text-[10px] font-mono">
                    {complex.builtYear} 준공
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <h3 className="font-korean-serif text-xl font-bold text-[#141414] group-hover:text-[#7A0016] transition-colors">
                        {complex.name}
                      </h3>
                      <span className="text-xs text-[#7A0016] font-semibold">
                        {complex.tagline.split('·')[0]}
                      </span>
                    </div>

                    <p className="text-xs text-[#777777] font-sans-clean mb-4 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#999999]" />
                      <span>{complex.locationDesc}</span>
                    </p>

                    {/* Highlights bullet points */}
                    <ul className="space-y-1.5 mb-6 text-xs text-[#555555] font-sans-clean border-t border-[#F0EBE3] pt-4">
                      {complex.highlights.map((h: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7A0016] mt-1.5 shrink-0" />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Bottom Action Buttons */}
                  <div className="pt-4 border-t border-[#F0EBE3] grid grid-cols-2 gap-2.5">
                    <a
                      href={complex.naverLandUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-lg bg-[#03C75A] hover:bg-[#02b150] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <span>네이버 실매물</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>

                    <button
                      type="button"
                      onClick={() => onSelectComplexForConsult(complex.name)}
                      className="py-2.5 px-3 rounded-lg bg-[#FAF8F5] hover:bg-[#141414] hover:text-white text-[#141414] border border-[#DFD7CB] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Calendar className="w-3 h-3 text-[#7A0016]" />
                      <span>단지 상담</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
