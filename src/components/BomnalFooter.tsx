import React from 'react';
import { ArrowUp, ShieldCheck, Lock } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface BomnalFooterProps {
  onOpenAdmin?: () => void;
}

export const BomnalFooter: React.FC<BomnalFooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#141414] text-[#A0A0A0] pt-16 pb-24 lg:pb-16 border-t border-[#222222] font-sans-clean text-xs">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8">
        {/* Top Masthead Row in Footer */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-10 border-b border-[#262626] gap-6">
          <div>
            <h2 className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-[0.25em] text-white uppercase">
              B O M N A L
            </h2>
            <p className="font-serif-luxury text-[11px] tracking-[0.25em] text-[#C5A880] uppercase mt-1">
              Bomnal Real Estate Agency · Daegu Wolseong
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="self-start sm:self-auto flex items-center gap-2 text-white hover:text-[#C5A880] font-serif-luxury text-xs tracking-widest uppercase transition-colors cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-12 border-b border-[#262626]">
          {/* Col 1: About & Mission (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-serif-luxury text-xs tracking-widest uppercase text-white font-bold block">
              About Bomnal
            </span>
            <p className="text-[#888888] leading-relaxed break-keep">
              e편한세상월배 단지 내에서 11년간 축적한 전문성으로 신월성 아파트 실거주 및 투자 고객께 가장 정직하고 확실한 중개를 약속드립니다.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[#C5A880]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>11년 무사고 안심 책임중개 · 100% 공제증서 발급</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-serif-luxury text-xs tracking-widest uppercase text-white font-bold block">
              Quick Navigation
            </span>
            <ul className="space-y-2 text-[#888888]">
              <li>
                <a href="#spaces" className="hover:text-white transition-colors">
                  단지별 안내
                </a>
              </li>
              <li>
                <a
                  href={REALTOR_INFO.naverLandUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#C5A880] flex items-center gap-1 transition-colors"
                >
                  <span>네이버 부동산 실매물 ↗</span>
                </a>
              </li>
              <li>
                <a href="#curator" className="hover:text-white transition-colors">
                  공인중개사 소개
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  오시는 길
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Registration (Col 4) */}
          <div className="lg:col-span-4 space-y-3">
            <span className="font-serif-luxury text-xs tracking-widest uppercase text-white font-bold block">
              Office Information
            </span>
            <ul className="space-y-1.5 text-[#888888]">
              <li>
                <span className="text-[#666666] mr-1.5">상호:</span>
                봄날공인중개사사무소
              </li>
              <li>
                <span className="text-[#666666] mr-1.5">대표:</span>
                {REALTOR_INFO.name} 공인중개사
              </li>
              <li>
                <span className="text-[#666666] mr-1.5">중개등록번호:</span>
                {REALTOR_INFO.regNumber}
              </li>
              <li>
                <span className="text-[#666666] mr-1.5">사업자등록번호:</span>
                {REALTOR_INFO.bizNumber}
              </li>
              <li className="break-keep leading-relaxed pt-0.5">
                <span className="text-[#666666] mr-1.5">소재지:</span>
                대구광역시 달서구 월성로 132, 상가동 B103호 (월성동, e편한세상월배)
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Contact (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-serif-luxury text-xs tracking-widest uppercase text-white font-bold block">
              Direct Contact
            </span>
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="font-serif-luxury text-lg font-bold text-white hover:text-[#C5A880] block transition-colors tracking-tight"
            >
              {REALTOR_INFO.phone}
            </a>
            <div className="space-y-1 text-[11px] text-[#777777]">
              <p>평일 09:30 - 19:30</p>
              <p>일요일·공휴일 예약 운영</p>
            </div>
          </div>
        </div>

        {/* Bottom Fine Print */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#666666] gap-4">
          <p>© {new Date().getFullYear()} 봄날공인중개사사무소 (BOMNAL REAL ESTATE). ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-4">
            <p className="font-serif-luxury tracking-widest uppercase text-[10px]">
              DAEGU WOLSEONG RESIDENTIAL REAL ESTATE
            </p>
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-[11px] text-[#666666] hover:text-[#C5A880] transition-colors cursor-pointer flex items-center gap-1.5 py-1 px-2 rounded hover:bg-neutral-900 border border-transparent hover:border-neutral-800"
                title="관리자 전용 로그인 (Ctrl+Shift+A 또는 클릭)"
              >
                <Lock className="w-3 h-3 text-[#888888]" />
                <span className="text-[10px] tracking-wider uppercase font-semibold">관리자</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
