import React, { useState } from 'react';
import { X, Phone, ShieldCheck, MapPin, Calendar, BookOpen, ExternalLink, UserCheck, Clock, Check } from 'lucide-react';
import { REALTOR_INFO, TRUST_POINTS, PROPERTY_NEWS } from '../data/mockData';
import { NewsPost } from '../types';

interface ConciergeDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConsult: () => void;
}

export const ConciergeDrawer: React.FC<ConciergeDrawerProps> = ({
  isOpen,
  onClose,
  onOpenConsult,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'news' | 'location'>('profile');

  if (!isOpen) return null;

  return (
    <div
      id="concierge-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white h-full shadow-2xl overflow-y-auto flex flex-col justify-between font-sans-clean"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#EAEAEA] flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-[#7A0016] text-white flex items-center justify-center font-serif-luxury text-sm font-bold">
              B
            </div>
            <div>
              <span className="font-serif-luxury text-sm font-bold tracking-[0.2em] text-[#141414] uppercase">
                BOMNAL CONCIERGE
              </span>
              <p className="text-[11px] text-[#7A0016] font-semibold">봄날공인중개사사무소 공식 안내</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#EAEAEA] bg-[#FAF8F5] text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-[#7A0016] text-[#7A0016] bg-white font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            대표 공인중개사 소개
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('news')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'news'
                ? 'border-[#7A0016] text-[#7A0016] bg-white font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            부동산 소식 &amp; 칼럼
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('location')}
            className={`flex-1 py-3 text-center transition-colors border-b-2 ${
              activeTab === 'location'
                ? 'border-[#7A0016] text-[#7A0016] bg-white font-bold'
                : 'border-transparent text-neutral-500 hover:text-neutral-900'
            }`}
          >
            오시는 길 &amp; 라운지
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 flex-1 space-y-6">
          {/* 1. Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC]">
                <img
                  src="/profile.jpg"
                  alt="장순조 대표 공인중개사"
                  className="w-20 h-24 rounded-lg object-cover border border-neutral-300 shadow-xs"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop';
                  }}
                />
                <div>
                  <div className="inline-block px-2 py-0.5 rounded text-[10px] bg-[#7A0016] text-white font-bold mb-1">
                    11년 무사고 안심중개
                  </div>
                  <h3 className="font-korean-serif text-lg font-bold text-[#141414]">
                    장순조 <span className="text-xs font-normal text-neutral-600">대표 공인중개사</span>
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1">
                    중개업 등록번호: <strong className="text-neutral-800">{REALTOR_INFO.regNumber}</strong>
                  </p>
                  <p className="text-xs text-neutral-600">
                    사업자등록번호: {REALTOR_INFO.bizNumber}
                  </p>
                  <p className="text-xs text-[#7A0016] font-semibold mt-1">
                    e편한세상월배 상가동 B103호
                  </p>
                </div>
              </div>

              {/* Trust Metrics */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {TRUST_POINTS.map((t, i) => (
                  <div key={i} className="p-3 rounded-lg border border-neutral-200 bg-white">
                    <span className="font-serif-luxury text-xl font-bold text-[#7A0016]">
                      {t.number}
                    </span>
                    <span className="text-xs font-serif-luxury text-[#7A0016] ml-0.5">{t.unit}</span>
                    <strong className="block font-semibold text-neutral-900 mt-1">{t.title}</strong>
                    <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">{t.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C5A880]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>전세사기 안심보장 중개업소 지정</span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  계약 전 3회 이상의 실시간 등기부등본 열람, 국세 및 지방세 완납증명서 검증,
                  100% 공제증서 발급을 통해 고객의 소중한 보증금과 자산을 빈틈없이 지킵니다.
                </p>
              </div>
            </div>
          )}

          {/* 2. News Tab */}
          {activeTab === 'news' && (
            <div className="space-y-4">
              <p className="text-xs text-neutral-500 mb-2">
                장순조 대표가 전하는 월성동 주거 시장 동향과 필수 부동산 세무 정보
              </p>
              {PROPERTY_NEWS.map((post: NewsPost) => (
                <div key={post.id} className="p-4 rounded-xl border border-neutral-200 hover:border-[#7A0016] transition-colors space-y-2">
                  <div className="flex justify-between items-center text-[11px] text-neutral-400">
                    <span className="font-bold text-[#7A0016]">{post.category}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="font-korean-serif text-sm font-bold text-[#141414]">
                    {post.title}
                  </h4>
                  <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 3. Location Tab */}
          {activeTab === 'location' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#EAE4DC] space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#141414] text-sm">
                  <MapPin className="w-4 h-4 text-[#7A0016]" />
                  <span>오시는 길 안내</span>
                </div>
                <p className="text-neutral-700">
                  {REALTOR_INFO.address}
                </p>
                <p className="text-neutral-500 text-[11px]">
                  (지하철 1호선 월배역 / 버스 성서2 'e편한세상월배앞' 하차 도보 1분)
                </p>
                <div className="pt-2 flex gap-2">
                  <a
                    href={`https://map.naver.com/v5/search/${encodeURIComponent(REALTOR_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded bg-[#03C75A] text-white font-semibold text-center"
                  >
                    네이버 지도 길찾기 ↗
                  </a>
                  <a
                    href={`https://map.kakao.com/link/search/${encodeURIComponent(REALTOR_INFO.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 rounded bg-[#FEE500] text-[#141414] font-bold text-center"
                  >
                    카카오맵 길찾기 ↗
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-lg border border-neutral-200 bg-white">
                <strong className="block text-neutral-900 mb-1">상가 전용 고객 무료 주차 안내</strong>
                <p className="text-neutral-600 text-[11px]">
                  네비게이션 'e편한세상월배 상가동' 검색 후 지상 상가 전용 주차장에 무료 주차 가능합니다.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer CTA */}
        <div className="p-6 border-t border-[#EAEAEA] bg-[#FAF8F5] space-y-2.5">
          <a
            href={`tel:${REALTOR_INFO.phone}`}
            className="w-full py-3.5 rounded-lg bg-[#7A0016] hover:bg-[#580010] text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <Phone className="w-4 h-4" />
            <span>장순조 대표 직통 상담 ({REALTOR_INFO.phone})</span>
          </a>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenConsult();
            }}
            className="w-full py-3 rounded-lg bg-white border border-[#D5CCC0] text-[#141414] text-xs font-semibold hover:bg-neutral-50 transition-colors"
          >
            온라인 1:1 상담 예약 신청
          </button>
        </div>
      </div>
    </div>
  );
};
