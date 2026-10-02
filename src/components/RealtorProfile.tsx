import React from 'react';
import { Phone, Shield, Award, CheckCircle2, FileText, UserCheck, MessageSquare } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface RealtorProfileProps {
  onOpenConsult: () => void;
}

export const RealtorProfile: React.FC<RealtorProfileProps> = ({ onOpenConsult }) => {
  return (
    <section id="realtor-section" className="py-20 md:py-28 bg-[#FAF8F5] text-[#141414] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-semibold block mb-2">
            Principal Broker Concierge
          </span>
          <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414] mb-4">
            대표 공인중개사 소개
          </h2>
          <div className="w-12 h-0.5 bg-[#7A0016] mx-auto mb-5" />
          <p className="text-base sm:text-lg text-[#555555] font-sans-clean leading-relaxed">
            대구 달서구 월성동 11년, 고객의 소중한 삶과 자산이 머무는 자리를 
            정직과 전문성으로 지켜온 든든한 주거 파트너입니다.
          </p>
        </div>

        {/* Profile Card Layout */}
        <div className="bg-white rounded-2xl border border-[#E6DFC5]/60 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left: Professional Portrait with Gold Accent Frame */}
            <div className="lg:col-span-5 relative bg-[#1A1A1A] flex flex-col justify-end p-8 md:p-12 text-white overflow-hidden min-h-[420px] lg:min-h-[520px]">
              <img
                src="/profile.jpg"
                alt="봄날공인중개사사무소 장순조 대표"
                className="absolute inset-0 w-full h-full object-cover object-top opacity-90 filter contrast-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
              <div className="relative z-10">
                <div className="inline-block px-3 py-1 rounded bg-[#7A0016] text-[#FAF8F5] text-xs font-semibold tracking-widest uppercase mb-3">
                  Verified Broker
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-korean-serif text-white mb-1">
                  장순조 <span className="text-lg font-light text-[#C5A880]">대표 공인중개사</span>
                </h3>
                <p className="text-xs text-[#D1C9BE] font-sans-clean tracking-wider">
                  등록번호: {REALTOR_INFO.regNumber}
                </p>
                <p className="text-xs text-[#A89F91] font-sans-clean mt-1">
                  사업자등록번호: {REALTOR_INFO.bizNumber}
                </p>
              </div>
            </div>

            {/* Right: Detailed Biography, Philosophy & Assurance Checklist */}
            <div className="lg:col-span-7 p-8 md:p-12 lg:p-14 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-8 h-[1px] bg-[#7A0016]" />
                  <span className="text-xs font-serif-luxury tracking-[0.2em] text-[#7A0016] uppercase font-bold">
                    Philosophy &amp; Commitment
                  </span>
                </div>

                <h4 className="font-korean-serif text-2xl sm:text-3xl font-bold text-[#141414] leading-snug mb-6">
                  &ldquo;한 번 맺은 인연, 평생의 신뢰가 되도록 <br className="hidden sm:inline" />
                  단 한 건의 보증금 사고 없이 증명해 왔습니다.&rdquo;
                </h4>

                <div className="space-y-4 text-[#4A4A4A] text-sm sm:text-base leading-relaxed font-sans-clean mb-8">
                  <p>
                    안녕하십니까. 봄날공인중개사사무소 대표 공인중개사 <strong>장순조</strong>입니다. 
                    저는 대구 달서구 월성동 <strong>e편한세상월배</strong>가 첫 입주를 시작하던 그 순간부터 
                    지금까지 11년이 넘는 시간 동안 단 한 번도 자리를 옮기지 않고 동일한 상가(상가동 B103호)에서 
                    주민 여러분의 소중한 보금자리를 이어왔습니다.
                  </p>
                  <p>
                    부동산은 단순한 거래 대상이 아닌, 가족의 평온한 안식처이자 가장 소중한 자산입니다. 
                    눈앞의 중개 수익에 연연하지 않고, 고객의 입장에서 한 번 더 의심하고, 세 번 이상 
                    권리관계를 정밀 검증하여 안심할 수 있는 확실한 계약만을 진행합니다.
                  </p>
                </div>

                {/* Assurance Highlights Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC]">
                    <Shield className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#141414]">11년 무사고 안심중개</h5>
                      <p className="text-xs text-[#666666]">e편한세상월배 입주 시부터 동일 자리 영업</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC]">
                    <Award className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#141414]">전세사기 안심보장 업소</h5>
                      <p className="text-xs text-[#666666]">100% 공제증서 교부 및 등기부 3회 실시간 검증</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC]">
                    <FileText className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#141414]">정밀 세무 및 대출 연계</h5>
                      <p className="text-xs text-[#666666]">취득세·양도세 절세 및 신생아/디딤돌 자격 자문</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EBE5DC]">
                    <UserCheck className="w-5 h-5 text-[#7A0016] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#141414]">대표 공인중개사 직접 전담</h5>
                      <p className="text-xs text-[#666666]">상담부터 계약서 날인, 입주 점검까지 대표 전담</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#E8E2D9] flex flex-wrap items-center gap-3">
                <a
                  id="realtor-call-btn"
                  href={`tel:${REALTOR_INFO.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#7A0016] text-white font-semibold text-xs tracking-wider hover:bg-[#580010] transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" />
                  <span>장순조 대표 전화 직통 (010-3260-5229)</span>
                </a>

                <button
                  id="realtor-consult-btn"
                  type="button"
                  onClick={onOpenConsult}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FAF8F5] border border-[#7A0016] text-[#7A0016] font-semibold text-xs tracking-wider hover:bg-[#7A0016] hover:text-white transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>1:1 프라이빗 상담 예약</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
