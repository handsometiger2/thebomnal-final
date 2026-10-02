import React, { useState } from 'react';
import { ExternalLink, Maximize2, X, Sparkles, Building, Layers, Eye, Compass, Phone } from 'lucide-react';
import { APARTMENT_GALLERY_ITEMS, REALTOR_INFO } from '../data/mockData';
import { GalleryItem } from '../types';

interface ApartmentGallerySectionProps {
  onOpenConsultWithTopic?: (topic: string) => void;
}

export const ApartmentGallerySection: React.FC<ApartmentGallerySectionProps> = ({
  onOpenConsultWithTopic
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const categories = [
    { key: 'all', label: '전체 갤러리' },
    { key: 'exterior', label: '단지 전경 & 랜드마크' },
    { key: 'plan', label: '세대 대표 평면도' },
    { key: 'landscape', label: '테마 조경 & 정원' },
    { key: 'interior', label: '인테리어 & 커뮤니티' }
  ];

  const filteredItems = selectedCategory === 'all'
    ? APARTMENT_GALLERY_ITEMS
    : APARTMENT_GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section id="apartment-gallery" className="py-20 md:py-28 bg-[#FFFFFF] text-[#141414] relative border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Architectural Model &amp; Living Exhibition</span>
            </div>
            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414] mb-3">
              아파트 주거 갤러리
            </h2>
            <div className="w-12 h-0.5 bg-[#7A0016] mb-4" />
            <p className="text-sm sm:text-base text-[#555555] font-sans-clean max-w-xl">
              e편한세상월배를 비롯한 월성동 주요 랜드마크 단지의 전경, 대표 평면도, 
              친환경 단지 조경, 호텔식 커뮤니티 공간을 고해상도 갤러리로 확인하세요.
            </p>
          </div>

          {/* Launch External 3D Gallery Applet CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              id="launch-external-gallery-btn"
              href={REALTOR_INFO.apartmentGalleryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#7A0016] hover:bg-[#580010] text-[#FAF8F5] text-xs font-semibold tracking-wider transition-all shadow-md active:scale-95"
            >
              <Compass className="w-4 h-4 text-[#C5A880]" />
              <span>아파트 갤러리 3D/VR 뷰 바로가기</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={REALTOR_INFO.naverLandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-[#FAF8F5] hover:bg-[#EAE4DC] border border-[#D5CCC0] text-[#141414] text-xs font-semibold tracking-wider transition-all"
            >
              <span>네이버 확인매물</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-[#F0EBE3]">
          {categories.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-xs font-sans-clean font-medium transition-all ${
                selectedCategory === cat.key
                  ? 'bg-[#7A0016] text-[#FAF8F5] shadow-xs'
                  : 'bg-[#FAF8F5] text-[#555555] hover:bg-[#EAE4DC] border border-[#E2DAD0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E6DFC5] shadow-2xs hover:shadow-xl hover:border-[#7A0016]/40 transition-all duration-300 flex flex-col cursor-pointer"
              onClick={() => setActiveModalItem(item)}
            >
              {/* Image Frame */}
              <div className="relative aspect-[4/3] bg-neutral-100 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop';
                  }}
                />
                
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[10px] font-sans-clean font-bold text-[#7A0016] shadow-xs">
                  {item.categoryLabel}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-white/95 text-xs font-semibold text-[#141414] flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5 text-[#7A0016]" />
                    <span>상세 뷰어 보기</span>
                  </div>
                </div>
              </div>

              {/* Information Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-serif-luxury tracking-widest text-[#A68A64] uppercase font-bold block mb-1">
                    {item.complexName}
                  </span>
                  <h3 className="font-korean-serif text-sm font-bold text-[#141414] group-hover:text-[#7A0016] transition-colors line-clamp-1 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#666666] font-sans-clean line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                {item.specs && (
                  <div className="mt-3 pt-3 border-t border-[#F0EBE3] text-[11px] text-[#888888] font-sans-clean">
                    {item.specs}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Promotional Banner Inside Gallery for 3D Cyber Model House */}
        <div className="mt-16 bg-[#FAF8F5] rounded-3xl p-8 md:p-12 border border-[#E6DFC5] shadow-md relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold block mb-2">
                Digital Model House &amp; Cyber Tour
              </span>
              <h3 className="font-korean-serif text-2xl sm:text-3xl font-bold text-[#141414] mb-3">
                아파트 갤러리 전용 웹사이트에서 3D 공간을 직접 체험해 보세요
              </h3>
              <p className="text-xs sm:text-sm text-[#555555] font-sans-clean leading-relaxed max-w-2xl mb-6">
                외부 전용 갤러리 플랫폼(AI Studio Applet)을 통해 세대별 조망, 단지 동배치도, 
                사이버 모델하우스 평면 투어를 인터랙티브하게 경험하실 수 있습니다.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={REALTOR_INFO.apartmentGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-full bg-[#7A0016] hover:bg-[#580010] text-[#FAF8F5] text-xs font-semibold tracking-wider inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <Eye className="w-4 h-4 text-[#C5A880]" />
                  <span>아파트 갤러리 사이트 새 탭에서 열기</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {onOpenConsultWithTopic && (
                  <button
                    type="button"
                    onClick={() => onOpenConsultWithTopic('아파트 갤러리 및 실매물 단지 투어')}
                    className="px-5 py-3.5 rounded-full bg-white hover:bg-neutral-100 border border-[#D5CCC0] text-[#141414] text-xs font-semibold tracking-wider transition-all"
                  >
                    단지 방문 투어 예약
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs aspect-square rounded-2xl bg-white p-3 border border-[#DFD7CB] shadow-lg flex flex-col justify-between">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                    alt="Cyber tour preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-[10px] font-bold text-[#7A0016]">
                      3D / VR LIVE
                    </span>
                  </div>
                </div>
                <div className="pt-2 text-center">
                  <p className="text-xs font-bold text-[#141414]">월성동 랜드마크 사이버 투어</p>
                  <p className="text-[10px] text-[#777777] mt-0.5">e편한세상월배 · 아이파크 1·2차 외</p>
                  <a
                    href={REALTOR_INFO.apartmentGalleryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 block w-full py-2 rounded-lg bg-[#141414] text-white text-[11px] font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    갤러리 바로가기 ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Gallery Lightbox Modal */}
      {activeModalItem && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActiveModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-[#DFD7CB] flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#F0EBE3] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-serif-luxury tracking-widest text-[#7A0016] uppercase font-bold">
                  {activeModalItem.complexName} · {activeModalItem.categoryLabel}
                </span>
                <h3 className="font-korean-serif text-lg sm:text-xl font-bold text-[#141414]">
                  {activeModalItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalItem(null)}
                className="w-9 h-9 rounded-full bg-[#FAF8F5] hover:bg-neutral-200 text-[#555555] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="relative flex-1 bg-black/95 flex items-center justify-center overflow-hidden min-h-[300px] max-h-[500px]">
              <img
                src={activeModalItem.image}
                alt={activeModalItem.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Description & Actions */}
            <div className="p-6 bg-[#FAF8F5] border-t border-[#F0EBE3] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm text-[#333333] font-sans-clean leading-relaxed max-w-xl">
                  {activeModalItem.caption}
                </p>
                {activeModalItem.specs && (
                  <p className="text-[11px] text-[#7A0016] font-semibold mt-1">
                    {activeModalItem.specs}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <a
                  href={`tel:${REALTOR_INFO.phone}`}
                  className="px-4 py-2.5 rounded-full bg-[#141414] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-neutral-800 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>대표 직통 문의</span>
                </a>

                <a
                  href={REALTOR_INFO.apartmentGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-[#7A0016] text-[#FAF8F5] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#580010] transition-colors"
                >
                  <span>3D 전체 갤러리</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
