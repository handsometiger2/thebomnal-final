import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ChevronDown, Building2, ExternalLink } from 'lucide-react';
import { REALTOR_INFO, APARTMENT_COMPLEXES } from '../data/mockData';
import { ApartmentComplex } from '../types';

interface BomnalHeaderProps {
  onOpenConsult?: () => void;
  onSelectComplex?: (complex: ApartmentComplex) => void;
}

export const BomnalHeader: React.FC<BomnalHeaderProps> = ({
  onSelectComplex,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('spaces');
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 10);

      const sections = ['spaces', 'curator', 'contact'];
      const scrollPosition = scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const navItems = [
    { id: 'spaces', label: 'COMPLEXES', href: '#spaces', hasDropdown: true },
    { id: 'curator', label: 'ABOUT', href: '#curator' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setDropdownOpen(false);

    if (href === '#' || href === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const targetId = href.replace('#', '');
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleComplexClick = (complex: ApartmentComplex) => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    if (onSelectComplex) {
      onSelectComplex(complex);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/98 backdrop-blur-md border-b border-[#EAEAEA] transition-shadow duration-300 select-none ${
        isScrolled ? 'shadow-md' : 'shadow-xs'
      }`}
    >
      <div className="w-full max-w-[1840px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3 shrink-0 mr-8 xl:mr-12">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#141414] hover:bg-neutral-100 rounded transition-colors cursor-pointer"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#7A0016]" /> : <Menu className="w-5 h-5 text-[#141414]" />}
          </button>

          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            className="flex items-center gap-2 group py-1"
          >
            <span className="font-serif-luxury text-lg sm:text-xl font-bold tracking-[0.25em] text-[#141414] group-hover:text-[#7A0016] transition-colors">
              BOMNAL
            </span>
            <span className="hidden sm:inline-block text-xs text-[#7A0016] font-korean-serif font-semibold border-l border-neutral-300 pl-2.5">
              봄날공인중개사사무소
            </span>
          </a>
        </div>

        {/* Center: Desktop Menu Items with Dropdown on COMPLEXES */}
        <nav className="hidden lg:flex items-center justify-center gap-12 xl:gap-16 2xl:gap-20 flex-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            
            if (item.hasDropdown) {
              return (
                <div
                  key={item.label}
                  className="relative group py-2"
                  onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="flex items-center gap-1.5 py-1 px-2 transition-colors cursor-pointer"
                  >
                    <span
                      className={`font-serif-luxury text-xs xl:text-[13px] tracking-[0.28em] transition-colors uppercase ${
                        isActive ? 'text-[#7A0016] font-bold' : 'text-[#141414] font-medium group-hover:text-[#7A0016]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#7A0016]' : 'text-neutral-400 group-hover:text-[#7A0016]'}`} />
                  </a>

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#7A0016] rounded-full" />
                  )}

                  {/* Dropdown Menu Overlay */}
                  {dropdownOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-88 z-50 animate-fadeIn">
                      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200/90 py-3 overflow-hidden">
                        <div className="px-4 pb-2 mb-1 border-b border-neutral-100 flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#7A0016] font-serif-luxury tracking-wider uppercase flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" />
                            신월성 8개 대표 단지
                          </span>
                          <span className="text-[10px] text-neutral-400">클릭 시 상세페이지 열림</span>
                        </div>
                        <div className="grid grid-cols-1 divide-y divide-neutral-50 max-h-[420px] overflow-y-auto">
                          {APARTMENT_COMPLEXES.map((complex) => (
                            <button
                              key={complex.id}
                              type="button"
                              onClick={() => handleComplexClick(complex)}
                              className="w-full text-left px-4 py-2.5 hover:bg-[#FAF7F2] transition-colors flex items-center justify-between group/item cursor-pointer"
                            >
                              <div className="pr-2">
                                <span className="text-xs font-semibold text-[#141414] group-hover/item:text-[#7A0016] block">
                                  {complex.name}
                                </span>
                                <span className="text-[10px] text-neutral-400 block truncate max-w-[210px]">
                                  {complex.totalUnits} · {complex.locationDesc.split(' ')[0]}
                                </span>
                              </div>
                              <span className="text-[11px] text-[#7A0016] font-medium bg-[#7A0016]/5 px-2 py-0.5 rounded group-hover/item:bg-[#7A0016] group-hover/item:text-white transition-colors shrink-0">
                                상세 보기 ➔
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="group relative flex flex-col items-center py-2 px-2 transition-colors"
              >
                <span
                  className={`font-serif-luxury text-xs xl:text-[13px] tracking-[0.28em] transition-colors flex items-center gap-1 uppercase ${
                    isActive ? 'text-[#7A0016] font-bold' : 'text-[#141414] font-medium group-hover:text-[#7A0016]'
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-6 h-[2px] bg-[#7A0016] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Clean Phone & Naver Blog */}
        <div className="flex items-center gap-2.5 shrink-0 ml-6 lg:ml-10">
          {/* Phone Number */}
          <a
            href={`tel:${REALTOR_INFO.phone}`}
            className="flex items-center gap-2 h-8 px-3.5 rounded-full border border-neutral-200/90 hover:border-[#7A0016] bg-neutral-50/80 hover:bg-white transition-all shadow-2xs group"
            title="대표 공인중개사 직통 전화"
          >
            <Phone className="w-3.5 h-3.5 text-[#7A0016]" />
            <span className="font-serif-luxury text-xs font-semibold tracking-wider text-[#1A1A1A] group-hover:text-[#7A0016] transition-colors tabular-nums">
              {REALTOR_INFO.phone}
            </span>
          </a>

          {/* Subtle Divider */}
          <span className="w-[1px] h-4 bg-neutral-200" />

          {/* Naver Blog Icon only */}
          <a
            href={REALTOR_INFO.naverBlogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full border border-neutral-200 hover:border-[#03C75A] hover:bg-[#03C75A]/5 flex items-center justify-center transition-all group"
            title="봄날 네이버 블로그"
            aria-label="Naver Blog"
          >
            <span className="font-bold text-xs text-[#03C75A] leading-none">N</span>
          </a>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EAEAEA] bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <div key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="py-2 px-3 rounded-lg hover:bg-neutral-50 flex items-center justify-between text-sm font-medium text-[#141414]"
                >
                  <span className="font-serif-luxury font-bold text-[#141414] tracking-widest text-xs">
                    {item.label}
                  </span>
                </a>
                {item.hasDropdown && (
                  <div className="pl-3 pr-2 pt-1 pb-2 grid grid-cols-1 gap-1 bg-neutral-50 rounded-lg mt-1">
                    {APARTMENT_COMPLEXES.map((complex) => (
                      <button
                        key={complex.id}
                        type="button"
                        onClick={() => handleComplexClick(complex)}
                        className="w-full text-left p-2 text-xs font-medium text-neutral-700 hover:text-[#7A0016] hover:bg-white rounded transition-colors flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate">· {complex.name}</span>
                        <span className="text-[10px] text-[#7A0016] font-bold shrink-0">상세보기 ➔</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-[#EAEAEA] space-y-3">
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="w-full py-3 bg-[#7A0016] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-xs font-serif-luxury"
            >
              <Phone className="w-4 h-4" />
              <span>전화 문의: {REALTOR_INFO.phone}</span>
            </a>

            <a
              href={REALTOR_INFO.naverBlogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-lg bg-neutral-100/90 hover:bg-[#03C75A] text-[#333333] hover:text-white text-xs font-medium flex items-center justify-center gap-2 transition-all group"
            >
              <span className="font-black text-xs text-[#03C75A] group-hover:text-white transition-colors">N</span>
              <span className="text-xs font-medium">봄날 네이버 블로그 바로가기</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
