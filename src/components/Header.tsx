import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ExternalLink, Calendar, MapPin } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface HeaderProps {
  onOpenConsultModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '단지소개', href: '#complexes' },
    { label: '아파트 갤러리', href: '#gallery' },
    { label: '네이버 매물', href: REALTOR_INFO.naverLandUrl, isExternal: true },
    { label: '대표 소개', href: '#about' },
    { label: '부동산 소식', href: '#news' },
    { label: '오시는 길', href: '#location' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EAE4DC]'
          : 'bg-white border-b border-[#F0EBE3]'
      }`}
    >
      {/* Top subtle bar */}
      <div className="bg-[#FAF8F5] border-b border-[#EAE4DC] text-xs py-2 px-4 sm:px-8 text-[#555555]">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7A0016] inline-block" />
            <span className="font-sans-clean font-medium text-[#141414]">
              대구 달서구 월성동 전문 · e편한세상월배 상가동 B103호
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px]">
            <span>등록번호: {REALTOR_INFO.regNumber}</span>
            <span className="text-[#CCCCCC]">|</span>
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="font-bold text-[#7A0016] hover:underline flex items-center gap-1"
            >
              <Phone className="w-3 h-3" />
              <span>{REALTOR_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-sm bg-[#7A0016] text-white flex items-center justify-center font-serif-luxury text-xl font-bold tracking-widest shadow-xs group-hover:bg-[#580010] transition-colors">
            B
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="font-serif-luxury text-2xl font-bold tracking-[0.2em] text-[#141414]">
                Bomnal
              </span>
              <span className="text-[#C5A880] text-sm">|</span>
              <span className="text-[11px] font-sans-clean tracking-[0.18em] text-[#7A0016] uppercase font-bold">
                REAL ESTATE
              </span>
            </div>
            <span className="text-[10px] text-[#777777] tracking-wider font-sans-clean">
              봄날공인중개사사무소
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.isExternal ? '_blank' : undefined}
              rel={link.isExternal ? 'noopener noreferrer' : undefined}
              className="text-sm font-sans-clean font-medium text-[#333333] hover:text-[#7A0016] transition-colors flex items-center gap-1 relative py-1"
            >
              <span>{link.label}</span>
              {link.isExternal && <ExternalLink className="w-3 h-3 text-[#999999]" />}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${REALTOR_INFO.phone}`}
            className="px-4 py-2 rounded-sm bg-[#FAF8F5] border border-[#DFD7CB] hover:border-[#7A0016] text-[#141414] hover:text-[#7A0016] text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#7A0016]" />
            <span>010-3260-5229</span>
          </a>

          <a
            href="#consultation"
            onClick={onOpenConsultModal}
            className="px-4 py-2 rounded-sm bg-[#7A0016] hover:bg-[#580010] text-[#FAF8F5] text-xs font-semibold tracking-wider flex items-center gap-1.5 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>상담 예약</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#141414] hover:bg-neutral-100 rounded-sm"
          aria-label="메뉴 열기"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE4DC] px-6 py-6 space-y-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-sans-clean font-medium text-[#141414] hover:text-[#7A0016] flex items-center justify-between py-2 border-b border-neutral-100"
              >
                <span>{link.label}</span>
                {link.isExternal && <ExternalLink className="w-4 h-4 text-neutral-400" />}
              </a>
            ))}
          </nav>

          <div className="pt-2 flex flex-col gap-2.5">
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="w-full py-3 rounded-sm bg-[#FAF8F5] border border-[#DFD7CB] text-[#141414] font-semibold text-center text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#7A0016]" />
              <span>전화 문의: {REALTOR_INFO.phone}</span>
            </a>
            <a
              href="#consultation"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenConsultModal) onOpenConsultModal();
              }}
              className="w-full py-3 rounded-sm bg-[#7A0016] text-white font-semibold text-center text-sm"
            >
              온라인 1:1 상담 예약
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
