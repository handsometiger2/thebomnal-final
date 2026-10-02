import React from 'react';
import { Phone, Calendar, MapPin, Quote, Shield, Award } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface RealtorStoryProps {
  onOpenConsult: () => void;
}

export const RealtorStory: React.FC<RealtorStoryProps> = ({ onOpenConsult }) => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white text-[#141414] border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Portrait & Studio Atmosphere */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-xl border border-[#E6DFC5]">
              <img
                src="/profile.jpg"
                alt="봄날공인중개사사무소 장순조 대표"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-serif-luxury tracking-widest text-[#C5A880] uppercase">
                  Bomnal Real Estate Principal
                </span>
                <h3 className="font-korean-serif text-2xl font-bold mt-1">
                  장순조 <span className="text-sm font-normal text-neutral-300">대표 공인중개사</span>
                </h3>
                <p className="text-xs text-neutral-300 mt-1">
                  e편한세상월배 상가동 B103호 11년 무사고
                </p>
              </div>
            </div>

            {/* Subtle decorative badge */}
            <div className="absolute -bottom-4 -right-4 bg-[#7A0016] text-white p-4 rounded-xl shadow-lg border border-white/20 hidden sm:block">
              <span className="font-serif-luxury text-2xl font-bold block">11<span className="text-sm font-normal">년</span></span>
              <span className="text-[10px] tracking-wider uppercase block text-neutral-200">월성동 대표 공인중개</span>
            </div>
          </div>

          {/* Right Column: Editorial Philosophy & Concierge Message */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
              <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold">
                Philosophy &amp; Commitment
              </span>
            </div>

            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414] leading-[1.25]">
              “집을 중개하는 것을 넘어, <br />
              고객 삶의 가장 따뜻한 <span className="text-[#7A0016]">봄날</span>을 함께 엽니다.”
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#555555] font-sans-clean leading-relaxed">
              <p>
                대구 달서구 월성동은 명문 학군과 쾌적한 주거 인프라가 어우러져 가족의 삶이 깊어지는 특별한 터전입니다. 
                봄날공인중개사사무소는 e편한세상월배 상가동 B103호에서 11년 동안 이웃들의 첫 집 마련, 평형 이동, 
                자산 포트폴리오를 가장 가까이에서 함께해 왔습니다.
              </p>
              <p>
                단순히 숫자로 집을 설명하지 않습니다. 아침 햇살이 어떻게 비치는지, 층간 소음과 바람길은 어떠한지, 
                자녀의 통학로는 얼마나 안전한지까지 꼼꼼히 살피고 정직하게 안내합니다.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#F0EBE3]">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
                <strong className="text-xs font-bold text-[#141414] block">철저한 권리분석</strong>
                <p className="text-[11px] text-[#666666] mt-1">계약 전 등기부 3회 실시간 열람 및 세무 리스크 사전 검증</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
                <strong className="text-xs font-bold text-[#141414] block">실시간 검증 매물 데이터</strong>
                <p className="text-[11px] text-[#666666] mt-1">허위 매물 없는 100% 실매물과 로열동·호수 직접 확인</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
                <strong className="text-xs font-bold text-[#141414] block">1:1 프라이빗 케어</strong>
                <p className="text-[11px] text-[#666666] mt-1">대표 공인중개사가 계약부터 입주까지 전담 책임 중개</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href={`tel:${REALTOR_INFO.phone}`}
                className="px-6 py-3.5 rounded-sm bg-[#7A0016] hover:bg-[#580010] text-white text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>장순조 대표 직통: {REALTOR_INFO.phone}</span>
              </a>

              <button
                type="button"
                onClick={onOpenConsult}
                className="px-6 py-3.5 rounded-sm bg-white hover:bg-neutral-50 text-[#141414] border border-[#DFD7CB] text-xs sm:text-sm font-semibold tracking-wider flex items-center gap-2 transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#7A0016]" />
                <span>방문 상담 예약</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
