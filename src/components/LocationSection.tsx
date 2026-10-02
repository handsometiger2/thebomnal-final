import React, { useState } from 'react';
import { MapPin, Navigation, Bus, Train, Car, Copy, Check, ExternalLink, Clock, Phone, Sparkles } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(REALTOR_INFO.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(REALTOR_INFO.address)}`;
  const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(REALTOR_INFO.address)}`;

  return (
    <section id="location" className="py-20 md:py-28 bg-[#FAF8F5] text-[#141414] relative overflow-hidden border-b border-[#EAE4DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Location &amp; Concierge Lounge</span>
          </div>
          <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414] mb-4">
            오시는 길 &amp; 라운지 안내
          </h2>
          <div className="w-12 h-0.5 bg-[#7A0016] mx-auto mb-5" />
          <p className="text-sm sm:text-base text-[#555555] font-sans-clean leading-relaxed">
            e편한세상월배 단지 내 상가동 B103호에 위치하고 있으며, 
            편안하고 쾌적한 1:1 프라이빗 상담 라운지와 전용 무료 주차 공간을 제공합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map Preview Card & Navigation Links */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-[#E6DFC5] shadow-lg">
            {/* Visual Map Representation */}
            <div className="relative aspect-[16/10] bg-neutral-100 overflow-hidden">
              <iframe
                title="봄날공인중개사사무소 위치 지도"
                src={`https://maps.google.com/maps?q=${REALTOR_INFO.coordinates.lat},${REALTOR_INFO.coordinates.lng}&z=17&output=embed`}
                className="w-full h-full border-0 contrast-105 opacity-95 hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#DFD7CB] shadow-md text-left">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7A0016] animate-pulse" />
                  <span className="text-xs font-bold text-[#141414] font-korean-serif">
                    봄날공인중개사사무소
                  </span>
                </div>
                <span className="text-[10px] text-[#7A0016] font-sans-clean font-semibold block mt-0.5">
                  e편한세상월배 상가동 B103호
                </span>
              </div>
            </div>

            {/* Quick Map Actions Bar */}
            <div className="p-5 sm:p-6 bg-white border-t border-[#F0EBE3] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#555555] font-sans-clean">
                <MapPin className="w-4 h-4 text-[#7A0016] shrink-0" />
                <span className="truncate">{REALTOR_INFO.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="px-3.5 py-2 rounded-lg bg-[#FAF8F5] hover:bg-neutral-100 text-[#141414] text-xs font-sans-clean font-medium flex items-center gap-1.5 transition-colors border border-[#DFD7CB]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">복사완료</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#7A0016]" />
                      <span>주소 복사</span>
                    </>
                  )}
                </button>

                <a
                  href={naverMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#03C75A] hover:bg-[#02b150] text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <span>네이버 지도</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href={kakaoMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-[#FEE500] hover:bg-[#ebd400] text-[#141414] text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direction Details & Transit Guides */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6DFC5] shadow-sm">
              <div className="flex items-start gap-3.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#FAF0E6] border border-[#7A0016]/20 flex items-center justify-center shrink-0">
                  <Navigation className="w-5 h-5 text-[#7A0016]" />
                </div>
                <div>
                  <span className="text-[10px] font-serif-luxury tracking-widest text-[#7A0016] uppercase font-bold">
                    Address Information
                  </span>
                  <h3 className="font-korean-serif text-lg font-bold text-[#141414] mt-0.5">
                    봄날공인중개사사무소
                  </h3>
                  <p className="text-xs text-[#555555] mt-1 font-sans-clean leading-relaxed">
                    대구광역시 달서구 월성로 132, e편한세상월배 상가동 B103호 <br />
                    (우편번호: 42749)
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F0EBE3] grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#7A0016]" />
                  <a href={`tel:${REALTOR_INFO.phone}`} className="text-[#141414] font-semibold hover:text-[#7A0016]">
                    {REALTOR_INFO.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#7A0016]" />
                  <span className="text-[#666666]">09:30 - 19:30</span>
                </div>
              </div>
            </div>

            {/* Public Transit Guides */}
            <div className="bg-white rounded-2xl p-6 border border-[#E6DFC5] shadow-sm space-y-3.5">
              <h4 className="text-sm font-bold text-[#141414] font-korean-serif flex items-center gap-2">
                <Bus className="w-4 h-4 text-[#7A0016]" />
                대중교통 &amp; 자가용 이용 안내
              </h4>

              {/* Bus */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#DFD7CB] flex items-center justify-center shrink-0 text-[#7A0016]">
                  <Bus className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#141414] block font-sans-clean">시내버스 이용 시</strong>
                  <p className="text-xs text-[#666666] mt-0.5">
                    <strong>성서2</strong>번 버스 탑승 후 <span className="text-[#7A0016] font-semibold">'e편한세상월배앞'</span> 정류장 하차 (도보 1분)
                  </p>
                </div>
              </div>

              {/* Subway */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#DFD7CB] flex items-center justify-center shrink-0 text-[#7A0016]">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#141414] block font-sans-clean">지하철 이용 시</strong>
                  <p className="text-xs text-[#666666] mt-0.5">
                    대구 1호선 <strong>월배역</strong> 또는 <strong>상인역</strong> 하차 후 시내버스 연계 환승 (약 5~10분 소요)
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-[#DFD7CB] flex items-center justify-center shrink-0 text-[#7A0016]">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-xs font-bold text-[#141414] block font-sans-clean">자가용 및 주차 안내</strong>
                  <p className="text-xs text-[#666666] mt-0.5">
                    네비게이션 'e편한세상월배 상가동' 검색. <strong>상가 전용 고객 주차장 무료 이용</strong> 가능
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
