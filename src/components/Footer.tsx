import React from 'react';
import { Phone, ExternalLink, ShieldCheck, ArrowUp } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#0D0D0D] text-[#8C857B] pt-16 pb-24 md:pb-16 border-t border-[#1F1F1F] font-sans-clean text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#222222]">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-[#7A0016] text-[#FAF8F5] flex items-center justify-center font-serif-luxury text-base font-bold tracking-widest">
                B
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-luxury text-xl font-bold tracking-[0.2em] text-[#FAF8F5]">
                  BOMNAL
                </span>
                <span className="text-[#C5A880] text-sm font-serif-luxury">|</span>
                <span className="text-[11px] font-serif-luxury tracking-[0.25em] text-[#C5A880] font-semibold">
                  REAL ESTATE
                </span>
              </div>
            </div>

            <p className="text-[#A59D91] leading-relaxed max-w-sm">
              대구광역시 달서구 월성동 e편한세상월배 전문 11년 무사고 공인중개사사무소. 
              정직한 권리분석과 실거래가 기반의 하이엔드 주거 자산 컨설팅을 제공합니다.
            </p>

            <div className="flex items-center gap-2 text-[#C5A880] pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span className="font-medium">전세사기 안심보장 중개업소 지정 · 100% 공제증서 발급</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-white font-korean-serif text-sm font-bold tracking-wider">
              주요 서비스 바로가기
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <a href="#complexes" className="hover:text-white transition-colors">
                  월성동 주요 단지 소개
                </a>
              </li>
              <li>
                <a
                  href={REALTOR_INFO.naverLandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                >
                  <span>네이버 부동산 실매물</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href={REALTOR_INFO.apartmentGalleryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                >
                  <span>아파트 갤러리 3D/VR 뷰</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-white transition-colors">
                  부동산 소식 &amp; 세무 칼럼
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-white transition-colors">
                  온라인 1:1 상담 예약
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">
                  오시는 길 &amp; 주차 안내
                </a>
              </li>
            </ul>
          </div>

          {/* Business & Legal Registration Info */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-white font-korean-serif text-sm font-bold tracking-wider mb-3">
              사무소 정보 &amp; 문의
            </h4>
            <p>
              <strong className="text-[#DDDDDD]">상호:</strong> {REALTOR_INFO.agencyName}
            </p>
            <p>
              <strong className="text-[#DDDDDD]">대표 공인중개사:</strong> {REALTOR_INFO.name}
            </p>
            <p>
              <strong className="text-[#DDDDDD]">중개업 등록번호:</strong> {REALTOR_INFO.regNumber}
            </p>
            <p>
              <strong className="text-[#DDDDDD]">사업자등록번호:</strong> {REALTOR_INFO.bizNumber}
            </p>
            <p>
              <strong className="text-[#DDDDDD]">소재지:</strong> {REALTOR_INFO.address}
            </p>
            <p className="flex items-center gap-2 pt-1 text-[#E5DFD5]">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <a href={`tel:${REALTOR_INFO.phone}`} className="hover:underline font-semibold">
                {REALTOR_INFO.phone}
              </a>
              <span>/ 유선: {REALTOR_INFO.tel}</span>
            </p>
          </div>
        </div>

        {/* Bottom Copyright & Top Scroll */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#666666]">
          <p>© {new Date().getFullYear()} Bomnal Real Estate (봄날공인중개사사무소). All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#888888] hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <span>맨 위로 가기</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
