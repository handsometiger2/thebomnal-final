import React from 'react';
import { ArrowUpRight, Car, Bus, Train } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

export const BomnalContactSection: React.FC = () => {
  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(REALTOR_INFO.address)}`;

  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-t border-[#E5E5E5] scroll-mt-16 text-[#141414]">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-20">
        
        {/* 2-Column Minimalist Clean Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Big Statement & Narrative (Col 7) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-serif-luxury text-[11px] tracking-[0.25em] text-[#888888] uppercase font-bold block">
              CONTACT
            </span>

            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-[#141414] leading-[1.28] break-keep">
              현재 고민 중인 상태에서<br />
              상담을 시작해 주세요.
            </h2>

            <p className="text-xs sm:text-[13px] text-[#777777] font-sans-clean leading-relaxed max-w-md break-keep">
              아직 모든 조건이 정리되지 않아도 괜찮습니다.  희망하시는 단지와 평형, 이사시기 등 <br />
              현재 단계와 가장 중요한 고민부터 들려주세요.
            </p>

            {/* Mobile & Tel moved from Right Column */}
            <div className="pt-4 flex flex-wrap items-center gap-8 sm:gap-12 border-t border-[#EAEAEA]">
              <div className="space-y-1">
                <span className="font-serif-luxury text-[10px] tracking-[0.25em] text-[#888888] uppercase block font-bold">
                  MOBILE
                </span>
                <a
                  href={`tel:${REALTOR_INFO.phone}`}
                  className="text-sm sm:text-base text-[#141414] hover:text-[#7A0016] font-serif-luxury tracking-wider transition-colors block font-semibold"
                >
                  {REALTOR_INFO.phone}
                </a>
              </div>

              <div className="space-y-1">
                <span className="font-serif-luxury text-[10px] tracking-[0.25em] text-[#888888] uppercase block font-bold">
                  TEL
                </span>
                <a
                  href={`tel:${REALTOR_INFO.tel}`}
                  className="text-sm sm:text-base text-[#141414] hover:text-[#7A0016] font-serif-luxury tracking-wider transition-colors block font-semibold"
                >
                  {REALTOR_INFO.tel}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Directory List with Cinzel Typography */}
          <div className="lg:col-span-5 divide-y divide-[#EAEAEA] border-t border-b border-[#141414]">
            
            {/* 1. BUSINESS HOURS (영업시간) */}
            <div className="py-4 sm:py-5 space-y-1">
              <span className="font-serif-luxury text-[10px] tracking-[0.25em] text-[#888888] uppercase block font-bold">
                HOURS
              </span>
              <div className="text-xs sm:text-[13px] text-[#141414] leading-relaxed font-sans-clean">
                <span className="font-serif-luxury font-semibold">10:30 – 19:30</span>
                <span className="block text-[11px] text-[#888888] pt-0.5">
                  (일요일 및 공휴일은 사전 예약제 운영)
                </span>
              </div>
            </div>

            {/* 2. OFFICE (위치 & 지도) */}
            <div className="py-4 sm:py-5 space-y-1.5">
              <span className="font-serif-luxury text-[10px] tracking-[0.25em] text-[#888888] uppercase block font-bold">
                OFFICE
              </span>
              <div className="text-xs sm:text-[13px] text-[#141414] font-sans-clean break-keep">
                대구광역시 달서구 월성로 132, e편한세상월배 상가동 B103호
              </div>

              {/* NAVER MAP LINK */}
              <div className="pt-0.5">
                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold font-serif-luxury tracking-[0.2em] text-[#141414] border-b border-[#141414] pb-0.5 hover:text-[#7A0016] hover:border-[#7A0016] transition-colors uppercase"
                >
                  <span>NAVER MAP</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>

            {/* 3. PARKING & TRANSIT (독립된 섹션으로 정돈) */}
            <div className="py-4 sm:py-5 space-y-2">
              <span className="font-serif-luxury text-[10px] tracking-[0.25em] text-[#888888] uppercase block font-bold">
                PARKING &amp; TRANSIT
              </span>

              <div className="space-y-1.5 text-xs sm:text-[12px] font-sans-clean text-[#444444]">
                <div className="flex items-start gap-2">
                  <Car className="w-3.5 h-3.5 text-[#03C75A] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141414] font-semibold">자가용:</strong> e편한세상월배 상가주차장 무료 이용
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Bus className="w-3.5 h-3.5 text-[#7A0016] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141414] font-semibold">버스:</strong> ‘e편한세상월배앞’ 하차 (도보 1분 / 성서2번, 달서1번, 달서3번, 달서4(-1)번, 655번)
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Train className="w-3.5 h-3.5 text-[#7A0016] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#141414] font-semibold">지하철:</strong> 1호선 진천역 4번 출구에서 성서2번 환승 후 'e편한세상월배앞' 하차
                  </span>
                </div>

                <p className="text-[11px] text-[#888888] pt-1">
                  * 방문 전 연락 주시면 감사하겠습니다.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
