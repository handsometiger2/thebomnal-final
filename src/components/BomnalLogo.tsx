import React from 'react';

export const BOMNAL_LOGO_URL = 'https://postfiles.pstatic.net/MjAyNjA5MjdfMTQ2/MDAxNzkwNDQwMjI1NDYy.p0RFPlN-0jgCXJVTwrCBu2zMM2HFtNYdd_GI0Ahe5J0g.xCgC0mbZD2xmDMIjd3Yx1-6q4bFCT6B_G2L1LAHzZH4g.PNG/%EB%B4%84%EB%82%A0_PK.png?type=w966';

interface BomnalLogoProps {
  className?: string;
  size?: number | string;
}

/**
 * 봄날부동산 공식 심볼 로고 (봄날_PK)
 * 사용자가 제공한 원본 이미지 파일 100% 무손실 렌더링
 */
export const BomnalLogo: React.FC<BomnalLogoProps> = ({
  className = 'w-10 h-auto',
  size,
}) => {
  return (
    <img
      src="/bomnal_pk.png"
      alt="봄날부동산 로고"
      className={`object-contain ${className}`}
      style={size ? { width: size, height: size } : undefined}
      referrerPolicy="no-referrer"
      onError={(e) => {
        // Fallback to external URL if local file is missing
        (e.currentTarget as HTMLImageElement).src = BOMNAL_LOGO_URL;
      }}
    />
  );
};
