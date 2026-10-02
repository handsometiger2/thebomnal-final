import React, { useEffect, useRef } from 'react';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Phone, 
  Building2, 
  Car, 
  Calendar, 
  Users, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  Sparkles,
  Award,
  Layers,
  Trees,
  GraduationCap,
  Store
} from 'lucide-react';
import { ApartmentComplex } from '../types';
import { APARTMENT_COMPLEXES, REALTOR_INFO, FIXED_NAVER_LAND_URL } from '../data/mockData';
import { BomnalLogo } from './BomnalLogo';
import { getDefaultComment } from './ComplexImageManagerModal';
import { ComplexCommentData } from '../services/firebaseMedia';

interface BomnalComplexDetailPageProps {
  complex: ApartmentComplex;
  onClose: () => void;
  onSelectComplex: (complex: ApartmentComplex) => void;
  onOpenConsult?: () => void;
  customComments?: Record<string, ComplexCommentData>;
}

export const BomnalComplexDetailPage: React.FC<BomnalComplexDetailPageProps> = ({
  complex,
  onClose,
  onSelectComplex,
  customComments = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const custom = customComments?.[complex.id];
  const def = getDefaultComment(complex);
  const comment1 = custom?.comment1 !== undefined && custom.comment1 !== '' ? custom.comment1 : def.comment1;
  const comment2 = custom?.comment2 !== undefined && custom.comment2 !== '' ? custom.comment2 : def.comment2;

  // Lock body scroll while the full-screen page is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [complex.id, onClose]);

  // Find previous and next complexes
  const currentIndex = APARTMENT_COMPLEXES.findIndex((c) => c.id === complex.id);
  const prevComplex = currentIndex > 0 ? APARTMENT_COMPLEXES[currentIndex - 1] : APARTMENT_COMPLEXES[APARTMENT_COMPLEXES.length - 1];
  const nextComplex = currentIndex < APARTMENT_COMPLEXES.length - 1 ? APARTMENT_COMPLEXES[currentIndex + 1] : APARTMENT_COMPLEXES[0];

  // Safely parse parking ratio to prevent awkward text breaking
  const rawParking = complex.parkingRatio || '1.25대';
  const parkingMatch = rawParking.match(/^([^(]+)(?:\(([^)]+)\))?/);
  const parkingRatioVal = parkingMatch ? parkingMatch[1].trim() : rawParking;
  const parkingTotalVal = parkingMatch && parkingMatch[2] ? parkingMatch[2].trim() : '지하 주차장 완비';

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[120] bg-[#FAF8F5] text-[#141414] overflow-y-auto selection:bg-[#7A0016] selection:text-white animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`${complex.name} 단지 상세 브리핑`}
    >
      {/* 1. Top Fixed Navigation Bar */}
      <nav className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#EAEAEA] shadow-xs">
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 h-14 sm:h-16 flex items-center justify-between gap-4">
          
          {/* Left: Back to List Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 py-2 px-3 sm:px-4 rounded-full bg-neutral-100 hover:bg-[#141414] text-[#141414] hover:text-white transition-all text-xs font-semibold group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">신월성 전체 단지 목록</span>
            <span className="sm:hidden">단지 목록</span>
          </button>

          {/* Center: Brand Title & Breadcrumb */}
          <div className="flex items-center gap-2 text-center truncate">
            <span className="hidden md:inline font-korean-serif text-xs sm:text-sm text-[#7A0016] font-extrabold tracking-wider">
              봄날부동산
            </span>
            <span className="hidden md:inline text-neutral-300 font-normal">/</span>
            <h1 className="font-korean-serif text-base sm:text-lg font-bold text-[#141414] truncate">
              {complex.name}
            </h1>
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#7A0016]/10 text-[#7A0016] font-semibold hidden lg:inline-block">
              {complex.totalUnits}
            </span>
          </div>

          {/* Right: Highly Visible Close Button */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 py-2 px-4 bg-[#141414] hover:bg-[#7A0016] active:scale-95 text-white rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
              title="상세 페이지 닫기 (ESC)"
              aria-label="상세 페이지 닫기"
            >
              <span>닫기</span>
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Quick Complex Switcher Tabs */}
        <div className="w-full bg-[#FAF8F5] border-t border-[#EAEAEA] px-4 sm:px-6 lg:px-10 overflow-x-auto scrollbar-none py-2">
          <div className="max-w-[1600px] mx-auto flex items-center gap-1.5 sm:gap-2 text-xs min-w-max">
            <span className="text-[11px] text-[#888888] font-serif-luxury tracking-wider mr-2 hidden lg:inline-block font-semibold">
              QUICK SWITCH:
            </span>
            {APARTMENT_COMPLEXES.map((item) => {
              const isCurrent = item.id === complex.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectComplex(item)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isCurrent
                      ? 'bg-[#141414] text-white font-bold shadow-xs'
                      : 'bg-white hover:bg-neutral-200 text-[#555555] border border-neutral-200/90'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 2. Grand Architectural Hero Banner */}
      <section className="relative w-full bg-neutral-900 text-white overflow-hidden">
        <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[460px]">
          <img
            src={complex.image}
            alt={complex.name}
            className="w-full h-full object-cover opacity-80 transform scale-100 hover:scale-102 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-black/30" />
          
          {/* Hero Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 max-w-[1600px] mx-auto w-full">
            <div className="space-y-3 max-w-4xl">
              {/* Title */}
              <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
                {complex.name}
              </h2>
              {complex.subName && (
                <p className="font-serif-luxury text-sm sm:text-base text-[#D5CCC0] tracking-widest uppercase">
                  {complex.subName}
                </p>
              )}

              {/* Tagline Box */}
              <div className="pt-2">
                <p className="text-base sm:text-lg text-neutral-100 font-sans-clean font-medium">
                  "{complex.tagline}"
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#E2C7A0] mt-1.5">
                  <MapPin className="w-4 h-4 shrink-0 text-[#E2C7A0]" />
                  <span>{complex.locationDesc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Dossier Body - Balanced 12-Column Layout */}
      <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Full Comprehensive Specs, Table, Features & Editorial Guide (Col 8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 3.1 Four Major Architectural Metric Cards (Unbreakable, Balanced Grid) */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-[#7A0016] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
                  <span>01 / SPECIFICATIONS</span>
                </h3>
                <span className="text-xs text-[#888888] font-sans-clean">단지 공식 건축 개요</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* 1. 총 세대수 */}
                <div className="p-5 bg-white border border-[#E5E0D8] rounded-xl shadow-2xs flex flex-col justify-between min-h-[120px] hover:border-[#7A0016]/40 transition-colors">
                  <div className="flex items-center justify-between text-[#777777] mb-2">
                    <span className="text-xs font-semibold font-serif-luxury">총 세대수</span>
                    <Users className="w-4 h-4 text-[#7A0016]" />
                  </div>
                  <div>
                    <span className="font-serif-luxury text-2xl font-bold text-[#141414] block tracking-tight">
                      {complex.totalUnits}
                    </span>
                    <span className="text-[11px] text-[#777777] mt-1 block">대단지 프리미엄</span>
                  </div>
                </div>

                {/* 2. 단지 규모 */}
                <div className="p-5 bg-white border border-[#E5E0D8] rounded-xl shadow-2xs flex flex-col justify-between min-h-[120px] hover:border-[#7A0016]/40 transition-colors">
                  <div className="flex items-center justify-between text-[#777777] mb-2">
                    <span className="text-xs font-semibold font-serif-luxury">단지 규모</span>
                    <Building2 className="w-4 h-4 text-[#7A0016]" />
                  </div>
                  <div>
                    <span className="font-serif-luxury text-2xl font-bold text-[#141414] block tracking-tight">
                      {complex.dongCount}
                    </span>
                    <span className="text-[11px] text-[#777777] mt-1 block">넓은 동간 거리</span>
                  </div>
                </div>

                {/* 3. 주차 대수 (깨짐 현상 원천 차단 및 분리 설계) */}
                <div className="p-5 bg-white border border-[#E5E0D8] rounded-xl shadow-2xs flex flex-col justify-between min-h-[120px] hover:border-[#7A0016]/40 transition-colors">
                  <div className="flex items-center justify-between text-[#777777] mb-2">
                    <span className="text-xs font-semibold font-serif-luxury">주차 비율</span>
                    <Car className="w-4 h-4 text-[#7A0016]" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif-luxury text-2xl font-bold text-[#141414] block tracking-tight whitespace-nowrap">
                        {parkingRatioVal}
                      </span>
                      <span className="text-xs text-[#888888] font-sans-clean font-medium">/ 세대</span>
                    </div>
                    <span className="text-[11px] text-[#777777] mt-1 block truncate" title={parkingTotalVal}>
                      {parkingTotalVal}
                    </span>
                  </div>
                </div>

                {/* 4. 준공 및 입주 */}
                <div className="p-5 bg-white border border-[#E5E0D8] rounded-xl shadow-2xs flex flex-col justify-between min-h-[120px] hover:border-[#7A0016]/40 transition-colors">
                  <div className="flex items-center justify-between text-[#777777] mb-2">
                    <span className="text-xs font-semibold font-serif-luxury">입주 년월</span>
                    <Calendar className="w-4 h-4 text-[#7A0016]" />
                  </div>
                  <div>
                    <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#141414] block tracking-tight whitespace-nowrap">
                      {complex.builtYear}
                    </span>
                    <span className="text-[11px] text-[#777777] mt-1 block">안정된 실거주 환경</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 3.2 Detailed Floorplan Types & Unit Distribution Table */}
            {complex.typeDetails && complex.typeDetails.length > 0 && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-[#7A0016] uppercase flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
                    <span>02 / FLOORPLANS &amp; AREA DISTRIBUTION</span>
                  </h3>
                  <span className="text-xs text-[#888888] font-sans-clean">
                    총 {complex.typeDetails.length}가지 타입 세부 현황
                  </span>
                </div>

                <div className="bg-white border border-[#E5E0D8] rounded-xl shadow-2xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm font-sans-clean divide-y divide-[#EAEAEA]">
                      <thead className="bg-[#FAF8F5] text-[#555555] font-serif-luxury text-xs tracking-wider uppercase">
                        <tr>
                          <th className="py-4 px-5 sm:px-6 font-bold">평형 구분 (타입)</th>
                          <th className="py-4 px-4 font-semibold">공급 면적</th>
                          <th className="py-4 px-4 font-semibold">전용 면적</th>
                          <th className="py-4 px-5 sm:px-6 font-bold text-right">해당 세대수</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EAEAEA] text-[#141414]">
                        {complex.typeDetails.map((td, idx) => (
                          <tr key={idx} className="hover:bg-[#FAF8F5]/80 transition-colors">
                            <td className="py-4 px-5 sm:px-6 font-bold text-[#7A0016] flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
                              <span>{td.typeName}</span>
                            </td>
                            <td className="py-4 px-4 text-[#555555] font-mono tabular-nums">{td.supplyArea}</td>
                            <td className="py-4 px-4 text-[#555555] font-mono tabular-nums">{td.exclusiveArea}</td>
                            <td className="py-4 px-5 sm:px-6 font-bold text-right font-mono tabular-nums text-[#141414] text-base">
                              {td.units}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Area Badges Ribbon */}
                  <div className="p-4 sm:p-5 bg-[#FAF8F5] border-t border-[#EAEAEA] flex flex-wrap items-center gap-2">
                    <span className="text-xs font-serif-luxury text-[#666666] font-semibold mr-1">
                      공급 면적 요약:
                    </span>
                    {complex.areaTypes.map((type: string) => (
                      <span
                        key={type}
                        className="px-3 py-1 bg-white text-[#141414] text-xs font-serif-luxury font-medium border border-[#D5CCC0] rounded-md shadow-2xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 3.3 Key Features & Architecture Highlights */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif-luxury text-xs font-bold tracking-[0.2em] text-[#7A0016] uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#7A0016]" />
                  <span>03 / ARCHITECTURE &amp; LIFESTYLE HIGHLIGHTS</span>
                </h3>
                <span className="text-xs text-[#888888] font-sans-clean">단지 핵심 프리미엄 4선</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {complex.highlights.map((highlight: string, idx: number) => {
                  const icons = [
                    <GraduationCap key="0" className="w-5 h-5 text-[#7A0016]" />,
                    <Trees key="1" className="w-5 h-5 text-[#7A0016]" />,
                    <Layers key="2" className="w-5 h-5 text-[#7A0016]" />,
                    <Store key="3" className="w-5 h-5 text-[#7A0016]" />
                  ];
                  const titles = [
                    '교육 및 통학 안심 학군',
                    '단지 설계 및 친환경 조경',
                    '일조권 및 쾌적한 동 배치',
                    '원스톱 생활 및 상권 인프라'
                  ];

                  return (
                    <div
                      key={idx}
                      className="p-5 bg-white border border-[#E5E0D8] rounded-xl shadow-2xs flex items-start gap-4 hover:border-[#7A0016]/40 transition-colors"
                    >
                      <div className="p-2.5 bg-[#7A0016]/5 rounded-lg shrink-0 mt-0.5">
                        {icons[idx] || <CheckCircle2 className="w-5 h-5 text-[#7A0016]" />}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#141414] mb-1 font-sans-clean">
                          {titles[idx] || `프리미엄 0${idx + 1}`}
                        </h4>
                        <p className="text-xs text-[#555555] leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 3.4 Bomnal Realtor's Curated Expert Review */}
            <section className="p-6 sm:p-8 bg-[#FAF8F5] border border-[#D5CCC0] rounded-xl relative overflow-hidden space-y-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-12 h-14 sm:w-14 sm:h-16 flex items-center justify-center shrink-0">
                  <BomnalLogo className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-serif-luxury text-xs font-bold tracking-widest text-[#7A0016] uppercase">
                    BOMNAL REALTOR INSIGHT
                  </h4>
                  <p className="font-korean-serif text-base sm:text-lg font-bold text-[#141414]">
                    봄날부동산의 브리핑 코멘트
                  </p>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-[#444444] leading-relaxed space-y-3 border-t border-[#E5DDD2] pt-4 break-keep">
                <p className="relative pl-3.5 border-l-2 border-[#7A0016]/40">
                  "{comment1.replace(/^["“]|["”]$/g, '').trim()}"
                </p>
                <p className="relative pl-3.5 border-l-2 border-[#7A0016]/40">
                  "{comment2.replace(/^["“]|["”]$/g, '').trim()}"
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#7A0016] font-semibold font-serif-luxury">
                <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> 11년 무사고 안심중개</span>
                <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> 100% 공제증서 교부</span>
                <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> 권리분석 지원</span>
              </div>
            </section>

          </div>

          {/* Right Column: Sticky Real Estate Inquiry & Action Sidebar (Col 4) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* Unified Inquiry & Action Card */}
            <div className="bg-white border-2 border-[#141414] shadow-xl p-6 sm:p-7 rounded-2xl space-y-6">
              
              <div>
                <div className="mb-2.5">
                  <img
                    src="/bomnal_bk.png"
                    alt="봄날부동산"
                    className="h-6 sm:h-7 w-auto object-contain max-w-[140px]"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://postfiles.pstatic.net/MjAyNjA5MjdfNDQg/MDAxNzkwNDQxNDc5MTQ4.GQAgbxG6Tccng_97jpZMrQ6yw9poX85D3KS0rz8emgcg.g7kK41g_xrLQ9p-EVhJDarcY4XV1_S2hM-V07R06ebEg.PNG/%EB%B4%84%EB%82%A0%EB%B6%80%EB%8F%99%EC%82%B0_BK.png?type=w966';
                    }}
                  />
                </div>
                <h4 className="font-korean-serif text-xl sm:text-2xl font-extrabold text-[#141414]">
                  {complex.name} 맞춤 중개
                </h4>
                <p className="text-xs text-[#666666] mt-2 leading-relaxed">
                  원하시는 평형, 동호수, 입주 시기 및 매매·전세·월세 예산에 맞춰 검증된 최적의 실매물을 안내해 드립니다.
                </p>
              </div>

              {/* Direct Buttons */}
              <div className="space-y-3 pt-1">
                {/* 1. Naver Land Real Listings (Official Fixed Link) */}
                <a
                  href={FIXED_NAVER_LAND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#03C75A] hover:bg-[#02B150] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 font-sans-clean cursor-pointer"
                >
                  <span className="w-4 h-4 rounded-full bg-white text-[#03C75A] font-black text-[10px] flex items-center justify-center">N</span>
                  <span>네이버 부동산 실매물 확인</span>
                  <ExternalLink className="w-4 h-4 ml-0.5" />
                </a>

                {/* 2. Direct Mobile Phone Call */}
                <a
                  href={`tel:${REALTOR_INFO.phone}`}
                  className="w-full py-3.5 px-4 bg-[#7A0016] hover:bg-[#580010] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 font-sans-clean cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  <span>대표 직통: {REALTOR_INFO.phone}</span>
                </a>
              </div>

              {/* Trust Features Badge */}
              <div className="border-t border-[#EAEAEA] pt-4 space-y-2.5 text-xs text-[#555555]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#7A0016] shrink-0" />
                  <span>전세사기 안심보장 중개업소 (100% 공제증서)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#7A0016] shrink-0" />
                  <span>부동산 전자계약 대출 금리 우대 &amp; 등기비 감면</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* 4. Bottom Sequential Complex Navigation Bar */}
        <section className="mt-14 pt-8 border-t border-[#EAEAEA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectComplex(prevComplex)}
            className="flex items-center gap-3 py-3 px-5 bg-white hover:bg-neutral-100 border border-[#E5E0D8] rounded-xl transition-colors group cursor-pointer text-left w-full sm:w-auto shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#7A0016] group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-[10px] text-[#888888] block font-serif-luxury uppercase">이전 단지</span>
              <span className="text-xs font-bold text-[#141414]">{prevComplex.name}</span>
            </div>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="py-3 px-8 bg-[#141414] hover:bg-[#7A0016] text-white text-xs font-bold rounded-full transition-colors cursor-pointer w-full sm:w-auto text-center shadow-xs"
          >
            신월성 전체 단지 목록
          </button>

          <button
            type="button"
            onClick={() => onSelectComplex(nextComplex)}
            className="flex items-center justify-between sm:justify-start gap-3 py-3 px-5 bg-white hover:bg-neutral-100 border border-[#E5E0D8] rounded-xl transition-colors group cursor-pointer text-right w-full sm:w-auto shadow-2xs"
          >
            <div>
              <span className="text-[10px] text-[#888888] block font-serif-luxury uppercase">다음 단지</span>
              <span className="text-xs font-bold text-[#141414]">{nextComplex.name}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#7A0016] group-hover:translate-x-1 transition-transform" />
          </button>
        </section>

      </main>
    </div>
  );
};
