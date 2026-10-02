import React from 'react';
import { Phone, Calendar, ArrowUpRight } from 'lucide-react';
import { REALTOR_INFO } from '../data/mockData';

interface FloatingActionBarProps {
  onOpenConsult: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({ onOpenConsult }) => {
  return (
    <div
      id="floating-action-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#141414]/95 backdrop-blur-md border border-[#333333] shadow-2xl flex items-center justify-between p-1.5 md:hidden"
    >
      <a
        href={`tel:${REALTOR_INFO.phone}`}
        className="flex-1 py-2.5 px-3 bg-[#7A0016] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
      >
        <Phone className="w-3.5 h-3.5" />
        <span>대표 직통 전화</span>
      </a>

      <a
        href="#contact"
        className="flex-1 py-2.5 px-3 bg-white text-[#141414] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
      >
        <span>오시는 길 &amp; 연락처</span>
      </a>

      <a
        href={REALTOR_INFO.naverLandUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="py-2.5 px-3 text-[#CCCCCC] hover:text-white text-xs font-sans-clean flex items-center justify-center gap-1"
      >
        <span>매물</span>
        <ArrowUpRight className="w-3 h-3 text-[#7A0016]" />
      </a>
    </div>
  );
};

