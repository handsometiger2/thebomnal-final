import React, { useState } from 'react';
import { ChevronDown, Menu, Phone, ExternalLink } from 'lucide-react';
import { ComplexGalleryData } from '../data/galleryData';
import { REALTOR_INFO } from '../data/mockData';

interface GalleryHeaderProps {
  complexes: ComplexGalleryData[];
  selectedComplexIndex: number;
  onSelectComplex: (index: number) => void;
  selectedTypeIndex: number;
  onSelectType: (index: number) => void;
  currentSlideIndex: number;
  totalSlides: number;
  onOpenMenuDrawer: () => void;
  onOpenConsult: () => void;
}

export const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  complexes,
  selectedComplexIndex,
  onSelectComplex,
  selectedTypeIndex,
  onSelectType,
  currentSlideIndex,
  totalSlides,
  onOpenMenuDrawer,
  onOpenConsult,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentComplex = complexes[selectedComplexIndex];

  // Format index numbers as 01, 02, etc.
  const formattedCurrent = String(currentSlideIndex + 1).padStart(2, '0');
  const formattedTotal = String(totalSlides).padStart(2, '0');

  return (
    <header
      id="gallery-main-header"
      className="sticky top-0 z-40 bg-white border-b border-[#E8E8E8] text-[#141414] font-sans-clean select-none"
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Title */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            className="flex items-center gap-2 group"
            onClick={(e) => {
              e.preventDefault();
              onSelectComplex(0);
            }}
          >
            <span className="font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.25em] text-[#141414] uppercase">
              B o m n a l
            </span>
            <span className="text-[#C5A880] text-sm hidden sm:inline">|</span>
            <span className="text-xs sm:text-sm font-sans-clean font-semibold tracking-[0.18em] text-[#7A0016] uppercase">
              APARTMENT GALLERY
            </span>
          </a>
        </div>

        {/* Center: Dropdown Selector + Apartment Complex Tabs */}
        <div className="hidden lg:flex items-center gap-2 flex-1 justify-center max-w-4xl">
          {/* Unit Type Dropdown */}
          <div className="relative">
            <button
              id="gallery-type-dropdown-btn"
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3.5 py-1.5 rounded-sm bg-white border border-[#D5D5D5] hover:border-[#141414] text-xs font-medium text-[#141414] flex items-center gap-2 transition-colors whitespace-nowrap shadow-2xs"
            >
              <span>
                {currentComplex.name} ({currentComplex.typeOptions[selectedTypeIndex] || currentComplex.selectedType})
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#555555]" />
            </button>

            {dropdownOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-56 bg-white border border-[#D5D5D5] rounded shadow-lg py-1 z-50 text-xs"
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[10px] text-[#888888] font-bold uppercase tracking-wider border-b border-neutral-100">
                  {currentComplex.name} 평형 선택
                </div>
                {currentComplex.typeOptions.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onSelectType(idx);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-neutral-100 transition-colors flex items-center justify-between ${
                      selectedTypeIndex === idx ? 'font-bold text-[#7A0016] bg-neutral-50' : 'text-[#333333]'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedTypeIndex === idx && <span className="text-[10px]">선택됨</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apartment Tabs Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {complexes.map((c, idx) => {
              const isActive = selectedComplexIndex === idx;
              return (
                <button
                  key={c.id}
                  id={`tab-complex-${c.id}`}
                  type="button"
                  onClick={() => {
                    onSelectComplex(idx);
                    onSelectType(0);
                  }}
                  className={`px-3.5 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#141414] text-white border-[#141414] shadow-xs'
                      : 'bg-white text-[#333333] border-[#E2E2E2] hover:border-[#999999] hover:bg-neutral-50'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Slide Counter (01 / 06) + Menu Drawer Toggle */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          {/* Slide Counter styled exactly like in screenshot */}
          <div className="flex items-baseline font-mono text-sm tracking-widest font-semibold select-none">
            <span className="text-[#7A0016] font-bold">{formattedCurrent}</span>
            <span className="text-[#888888] mx-1">/</span>
            <span className="text-[#141414]">{formattedTotal}</span>
          </div>

          {/* Concierge Call & Information Trigger */}
          <div className="flex items-center gap-2">
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-sm bg-[#FAF8F5] border border-[#D5CCC0] text-[#141414] hover:border-[#7A0016] hover:text-[#7A0016] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#7A0016]" />
              <span>{REALTOR_INFO.phone}</span>
            </a>

            <button
              id="gallery-menu-open-btn"
              type="button"
              onClick={onOpenMenuDrawer}
              className="p-2 rounded-sm text-[#141414] hover:bg-neutral-100 transition-colors flex items-center gap-1.5 border border-[#E5E5E5]"
              title="사무소 정보 &amp; 메뉴"
            >
              <Menu className="w-4 h-4" />
              <span className="text-xs font-semibold hidden sm:inline">메뉴</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-only secondary apartment bar */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 border-t border-[#F0F0F0] bg-[#FAF8F5]">
        {complexes.map((c, idx) => {
          const isActive = selectedComplexIndex === idx;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                onSelectComplex(idx);
                onSelectType(0);
              }}
              className={`px-3 py-1 rounded-sm text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-[#141414] text-white border-[#141414]'
                  : 'bg-white text-[#333333] border-[#E2E2E2]'
              }`}
            >
              {c.name}
            </button>
          );
        })}
      </div>
    </header>
  );
};
