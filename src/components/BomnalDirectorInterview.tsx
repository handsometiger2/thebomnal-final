import React from 'react';
import { Phone, Quote, Check, ArrowRight, Shield, Award, Clock } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface BomnalDirectorInterviewProps {
  onOpenConsult: () => void;
}

export const BomnalDirectorInterview: React.FC<BomnalDirectorInterviewProps> = ({
  onOpenConsult,
}) => {
  return (
    <section id="curator" className="py-20 sm:py-28 bg-[#FFFFFF] border-b border-[#EAEAEA] scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex items-center gap-3 border-b border-[#141414] pb-3 mb-12">
          <span className="font-serif-luxury text-xs tracking-[0.3em] text-[#7A0016] uppercase font-bold">
            Realtor Profile
          </span>
          <span className="text-[#888888] text-xs">|</span>
          <span className="text-xs font-sans-clean text-[#666666]">
            장순조 대표 공인중개사 소개 &amp; 중개 철학
          </span>
        </div>

        {/* 2-Column Asymmetric Profile with Aligned Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Portrait & Studio Profile */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[410px] aspect-[3/4] overflow-hidden bg-neutral-100 border border-[#EAEAEA] rounded-lg shadow-sm">
              <img
                src="/profile.png"
                alt="봄날공인중개사사무소 장순조 대표"
                className="w-full h-full object-cover object-top block"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/profile.jpg';
                }}
              />
            </div>
          </div>

          {/* Right Column: Essay & Curatorial Creed (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6 pt-1">
            {/* Signature Quote Card */}
            <div className="relative bg-gradient-to-br from-[#FAF8F5] to-[#F3ECE4] border border-[#E5DDD2] rounded-2xl p-6 sm:p-8 shadow-xs overflow-hidden">
              {/* Subtle Decorative Background Watermark */}
              <Quote className="absolute right-4 bottom-3 w-20 h-20 text-[#7A0016]/5 pointer-events-none" />

              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7A0016]" />
                <span className="text-[11px] font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-bold">
                  BOMNAL CREED
                </span>
              </div>

              <h2 className="font-korean-serif text-xl sm:text-2xl lg:text-[27px] font-bold text-[#141414] leading-[1.65] break-keep relative z-10">
                “집은 단순히 거래되는 숫자가 아니라,<br className="hidden sm:inline" />
                {' '}한 사람과 가족의 계절이 오롯이 담기는<br className="hidden sm:inline" />
                {' '}<span className="text-[#7A0016] font-extrabold relative inline-block">
                  따뜻한 삶의 터전
                  <span className="absolute bottom-1 left-0 w-full h-[6px] bg-[#7A0016]/15 -z-10 rounded-full" />
                </span>이어야 합니다.”
              </h2>
            </div>

            <div className="space-y-4 text-[#444444] text-sm sm:text-base leading-relaxed font-sans-clean break-keep border-l-2 border-[#7A0016]/30 pl-5">
              <p>
                안녕하세요, 봄날공인중개사사무소 대표 공인중개사 <strong>장순조</strong>입니다.
              </p>
              <p>
                대구 신월성·월배 지역에서 11년 넘게 고객님들과 희로애락을 함께해 오며 깨달은 가장 중요한 가치는 <br />
                <strong className="text-[#141414] font-semibold"> ‘고객의 입장에서 먼저 생각하는 정직함과 신뢰’</strong>였습니다.
              </p>
              <p>
                e편한세상월배에서 단지의 사계절과 매일의 시세 흐름, 동호수별 일조권과 조망을 직접 발로 뛰며 확인해왔습니다. 
                매수·매도부터 임대차, 세무 상담까지 고객님의 소중한 자산이 가장 안전하게 보호받을 수 있도록 
                처음부터 끝까지 책임지고 함께하겠습니다.
              </p>
            </div>

            {/* 3 Core Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EAEAEA]">
              <div className="p-4 bg-[#FAF8F5] border border-[#E6DFC5]/70 rounded-lg">
                <Shield className="w-5 h-5 text-[#7A0016] mb-2" />
                <h4 className="font-bold text-xs text-[#141414] font-korean-serif">100% 공제증서 교부</h4>
                <p className="text-[11px] text-[#777777] mt-1">한국공인중개사협회 공제 가입 안심보장</p>
              </div>
              <div className="p-4 bg-[#FAF8F5] border border-[#E6DFC5]/70 rounded-lg">
                <Clock className="w-5 h-5 text-[#7A0016] mb-2" />
                <h4 className="font-bold text-xs text-[#141414] font-korean-serif">11년+ 단일 지역 전문</h4>
                <p className="text-[11px] text-[#777777] mt-1">신월성 전 단지 실거래 빅데이터 보유</p>
              </div>
              <div className="p-4 bg-[#FAF8F5] border border-[#E6DFC5]/70 rounded-lg">
                <Award className="w-5 h-5 text-[#7A0016] mb-2" />
                <h4 className="font-bold text-xs text-[#141414] font-korean-serif">단지 내 상가 입점</h4>
                <p className="text-[11px] text-[#777777] mt-1">e편한세상월배 상가동 B103호 직통 연결</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
