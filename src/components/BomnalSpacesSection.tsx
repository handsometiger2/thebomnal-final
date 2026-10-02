import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Phone, Eye, Camera } from 'lucide-react';
import { APARTMENT_COMPLEXES, REALTOR_INFO } from '../data/mockData';
import { ApartmentComplex } from '../types';
import { BomnalComplexDetailPage } from './BomnalComplexDetailPage';
import { ComplexCommentData } from '../services/firebaseMedia';

interface BomnalSpacesSectionProps {
  onSelectComplexForConsult: (complexName: string) => void;
  selectedComplex?: ApartmentComplex | null;
  onCloseComplexModal?: () => void;
  onOpenComplexModal?: (complex: ApartmentComplex) => void;
  customImages?: Record<string, string>;
  onOpenImageManager?: () => void;
  customComments?: Record<string, ComplexCommentData>;
}

export const BomnalSpacesSection: React.FC<BomnalSpacesSectionProps> = ({
  onSelectComplexForConsult,
  selectedComplex: externalSelectedComplex,
  onCloseComplexModal: externalOnCloseComplexModal,
  onOpenComplexModal: externalOnOpenComplexModal,
  customImages = {},
  onOpenImageManager,
  customComments = {},
}) => {
  const [filter, setFilter] = useState<'all' | 'landmark' | 'new'>('all');
  const [internalSelectedComplex, setInternalSelectedComplex] = useState<ApartmentComplex | null>(null);

  const selectedComplex = externalSelectedComplex !== undefined ? externalSelectedComplex : internalSelectedComplex;

  const getComplexImage = (complex: ApartmentComplex) => {
    return customImages[complex.id] || complex.image;
  };

  const handleOpenDetail = (complex: ApartmentComplex) => {
    const enrichedComplex: ApartmentComplex = {
      ...complex,
      image: getComplexImage(complex),
    };
    if (externalOnOpenComplexModal) {
      externalOnOpenComplexModal(enrichedComplex);
    } else {
      setInternalSelectedComplex(enrichedComplex);
    }
  };

  const handleCloseDetail = () => {
    if (externalOnCloseComplexModal) {
      externalOnCloseComplexModal();
    } else {
      setInternalSelectedComplex(null);
    }
  };

  const filteredComplexes: ApartmentComplex[] = filter === 'all'
    ? APARTMENT_COMPLEXES
    : APARTMENT_COMPLEXES.filter((c: ApartmentComplex) => c.category === filter);

  return (
    <section id="spaces" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAEAEA] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif-luxury text-xs tracking-[0.3em] text-[#7A0016] uppercase font-bold block mb-2">
            Featured Complexes
          </span>
          <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414]">
            신월성지구 아파트 단지
          </h2>
          <div className="w-8 h-[1px] bg-[#141414] mx-auto my-4" />
          <p className="text-sm sm:text-base text-[#666666] font-sans-clean leading-relaxed break-keep">
            월성·월배 권역을 대표하는 주요 아파트 단지 정보.<br />
            카드를 클릭하시면 단지별 상세 정보와 평형·특징을 한눈에 살펴보실 수 있습니다.
          </p>

          {/* Clean Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-8">
            {[
              { id: 'all', label: 'All' },
              { id: 'landmark', label: 'LANDMARK (대단지)' },
              { id: 'new', label: 'NEW (신축&준신축 단지)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 text-xs font-serif-luxury tracking-wider transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#141414] text-white font-bold border border-[#141414]'
                    : 'bg-[#FAF8F5] text-[#666666] border border-[#D5CCC0] hover:border-[#141414] hover:text-[#141414]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Complexes Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {filteredComplexes.map((complex: ApartmentComplex) => {
            const currentImg = getComplexImage(complex);
            const isCustom = Boolean(customImages[complex.id]);

            return (
              <article
                key={complex.id}
                id={`complex-${complex.id}`}
                className="group flex flex-col justify-between border border-[#EAEAEA] hover:border-[#141414] bg-white transition-all duration-300 hover:shadow-xl overflow-hidden"
              >
                <div>
                  {/* Clean Image Container with click to detail */}
                  <div 
                    onClick={() => handleOpenDetail(complex)}
                    className="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer"
                  >
                    <img
                      src={currentImg}
                      alt={complex.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Minimalist Hover Overlay */}
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 bg-white/95 text-[#141414] text-xs font-serif-luxury tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                        <Eye className="w-3.5 h-3.5 text-[#7A0016]" />
                        상세 정보 보기
                      </span>
                    </div>
                  </div>

                  {/* Card Content (Header & Specs) */}
                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#888888] font-serif-luxury mb-1">
                      <span>{complex.dongCount}</span>
                      <span>{complex.totalUnits}</span>
                    </div>

                    <h3 
                      onClick={() => handleOpenDetail(complex)}
                      className="font-korean-serif text-xl sm:text-2xl font-bold text-[#141414] group-hover:text-[#7A0016] transition-colors cursor-pointer mb-2"
                    >
                      {complex.name}
                    </h3>

                    <p className="text-xs text-[#666666] font-sans-clean line-clamp-1 mb-4">
                      {complex.locationDesc}
                    </p>

                    {/* Area Badges */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {complex.areaTypes.map((type: string) => (
                        <span
                          key={type}
                          className="px-2 py-0.5 bg-[#FAF8F5] text-[#141414] text-[11px] font-serif-luxury border border-[#EAEAEA]"
                        >
                          {type}
                        </span>
                      ))}
                    </div>

                    {/* Key Highlights Bullet points */}
                    <div className="space-y-1.5 border-t border-[#F0F0F0] pt-4">
                      {complex.highlights.slice(0, 2).map((highlight: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-1.5 text-xs text-[#555555]">
                          <span className="text-[#7A0016] font-bold">▪</span>
                          <span className="line-clamp-1">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (Direct Naver Link & Detail Modal Trigger) */}
                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-[#F0F0F0] mt-4 pt-4">
                  <a
                    href={complex.naverLandUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 bg-neutral-100 hover:bg-[#03C75A] text-[#141414] hover:text-white text-xs font-bold transition-all text-center rounded flex items-center justify-center gap-1.5 cursor-pointer font-sans-clean group/btn"
                  >
                    <span className="w-3.5 h-3.5 rounded-full bg-[#03C75A] group-hover/btn:bg-white text-white group-hover/btn:text-[#03C75A] font-black text-[9px] flex items-center justify-center">N</span>
                    <span>실매물</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenDetail(complex)}
                    className="flex-1 py-2.5 px-3 bg-[#141414] hover:bg-[#7A0016] text-white text-xs font-bold transition-colors text-center rounded flex items-center justify-center gap-1 cursor-pointer font-sans-clean"
                  >
                    <span>단지 정보</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Comprehensive Multi-Tab Modal View */}
      {selectedComplex && (
        <BomnalComplexDetailPage
          complex={selectedComplex}
          onClose={handleCloseDetail}
          customComments={customComments}
          onSelectComplex={(c) => {
            const enriched = {
              ...c,
              image: getComplexImage(c),
            };
            if (externalOnOpenComplexModal) {
              externalOnOpenComplexModal(enriched);
            } else {
              setInternalSelectedComplex(enriched);
            }
          }}
        />
      )}
    </section>
  );
};
