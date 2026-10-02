import { FIXED_NAVER_LAND_URL } from './mockData';

export interface GallerySlide {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  specs?: string;
}

export interface ComplexGalleryData {
  id: string;
  name: string;
  subTitle: string;
  typeOptions: string[];
  selectedType: string;
  totalUnits: string;
  builtYear: string;
  location: string;
  naverLandUrl: string;
  slides: GallerySlide[];
}

export const WOLSEONG_COMPLEXES_GALLERY: ComplexGalleryData[] = [
  // 1. e편한세상 (e편한세상월배)
  {
    id: 'epyeonhan',
    name: 'e편한세상월배',
    subTitle: '봄날공인중개사사무소 상가동(B103호) 전담 단지',
    typeOptions: ['25평형 (59㎡)', '33평형 (84㎡B)', '34평형 (84㎡A)'],
    selectedType: '34평형 (84㎡A)',
    totalUnits: '932세대 (총 8개동)',
    builtYear: '2014년 10월',
    location: '대구광역시 달서구 월성로 132',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'ep-1',
        title: '단지 외관 및 봄날부동산 상가동 전경',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
        description: '봄날공인중개사사무소가 자리잡은 e편한세상월배 주출입구 상가동 B103호 및 지상 공원형 단지 전경',
        specs: '총 932세대 · 최고 30층 · 지상 차 없는 공원형 단지'
      },
      {
        id: 'ep-2',
        title: '자연과 어우러진 중앙 테마 수경 가든',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '사계절 푸른 조경과 계절감을 온전히 만끽할 수 있는 단지 내 친환경 중앙 테마 정원',
        specs: '건폐율 14.8%의 여유로운 동간 거리와 산책로'
      },
      {
        id: 'ep-3',
        title: '채광과 통풍을 극대화한 와이드 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
        description: '남향 위주 배치를 통해 풍부한 일조량과 개방감을 선사하는 4Bay 판상형 거실 공간',
        specs: '전용면적 84.99㎡ (공급 113.6㎡) · 고급 우드 플로어링'
      },
      {
        id: 'ep-4',
        title: '전용 84㎡A 4Bay 맞통풍 프리미엄 평면도',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '주방과 거실이 마주보는 맞통풍 구조, 대형 팬트리 및 안방 워크인 드레스룸 완비',
        specs: '방 3개, 욕실 2개, 드레스룸, 다용도실 수납 특화'
      },
      {
        id: 'ep-5',
        title: '모던한 아일랜드 주방 및 다이닝 공간',
        category: 'Kitchen & Dining',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop',
        description: '동선의 효율성을 극대화한 와이드 ‘ㄷ’자형 주방 상판과 품격 있는 다이닝 룸',
        specs: '친환경 가구재 및 빌트인 프리미엄 가전 수납'
      },
      {
        id: 'ep-6',
        title: '입주민을 위한 호텔식 커뮤니티 & 피트니스',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '스크린 골프연습장, 피트니스 센터, 독서실, 어린이집 등 원스톱 생활 커뮤니티',
        specs: '단지 내 입주민 전용 헬스케어 & 휴식 라운지'
      }
    ]
  },
  // 2. 월성삼정 (월성삼정그린코아에듀파크)
  {
    id: 'samjeong',
    name: '월성삼정그린코아에듀파크',
    subTitle: '학산공원 숲세권 & 명문 학군 특화 1,392세대 신축 대단지',
    typeOptions: ['32평형 (84㎡A)', '32평형 (84㎡B)'],
    selectedType: '32평형 (84㎡A)',
    totalUnits: '1,392세대 (총 12개동)',
    builtYear: '2022년 11월',
    location: '대구광역시 달서구 월성동 1478',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'sj-1',
        title: '학산공원을 품은 월성동 대표 신축 단지',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
        description: '2022년 준공된 최신 준공 단지로 고급스러운 커튼월룩 외관과 문주가 돋보입니다.',
        specs: '총 1,392세대 · 2022년 11월 준공 신축'
      },
      {
        id: 'sj-2',
        title: '학산 숲을 마주하는 파노라마 마운틴 뷰',
        category: 'View & Nature',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '단지와 바로 연결되는 학산공원 등산로와 사계절 푸른 숲을 내려다보는 영구 조망',
        specs: '미세먼지 걱정 없는 에코 힐링 단지'
      },
      {
        id: 'sj-3',
        title: '최신 트렌드를 반영한 하이엔드 인테리어',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop',
        description: '무몰딩 히든도어 감각과 우물천장 간접 라인조명으로 마감된 트렌디한 공간',
        specs: '전용 84㎡ 신축 첫 입주 컨디션'
      },
      {
        id: 'sj-4',
        title: '전용 84㎡ 신축 특화 4Bay 평면 설계',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '현관 팬트리와 주방 팬트리 더블 수납장, 광폭 안방 드레스룸 탑재',
        specs: '공급 114㎡ / 전용 84.8㎡'
      },
      {
        id: 'sj-5',
        title: '최신 스마트홈 IoT 시스템과 주방',
        category: 'Smart Home',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
        description: '스마트폰으로 조명, 난방, 가스, 환기 시스템을 원격 제어하는 최첨단 홈 IoT',
        specs: '미세먼지 저감 청정 환기 시스템 완비'
      },
      {
        id: 'sj-6',
        title: '티하우스 & 게스트하우스 입주민 특화 시설',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '손님맞이를 위한 고급 게스트하우스와 정원을 바라보는 단지 내 카페테리아',
        specs: '최신식 주민 편의 커뮤니티'
      }
    ]
  },
  // 3. 월성푸르지오
  {
    id: 'wolseong-prugio',
    name: '월성푸르지오',
    subTitle: '1,824세대 전통의 명품 대단지 · 중심 상권과 우수 학군',
    typeOptions: ['30평형 (100㎡)', '34평형 (112~113㎡)', '40평형 (134㎡)', '48평형 (159㎡)', '56평형 (185㎡)'],
    selectedType: '34평형 (112~113㎡)',
    totalUnits: '1,824세대 (총 10개동)',
    builtYear: '2008년 8월',
    location: '대구광역시 달서구 조암로 38',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'wsp-1',
        title: '월성동을 대표하는 1,824세대 매머드급 랜드마크',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
        description: '월성동 중심 입지와 웅장한 대단지 위상을 자랑하는 전통의 주거 명작',
        specs: '총 1,824세대 · 최고 29층 · 10개동'
      },
      {
        id: 'wsp-2',
        title: '울창한 아름드리 숲과 테마 중앙공원',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '잘 가꾸어진 대형 수목들이 단지 전체를 감싸는 쾌적하고 조용한 도심 속 힐링 단지',
        specs: '넓은 동간 거리와 풍성한 단지 내 조경'
      },
      {
        id: 'wsp-3',
        title: '개방감 넘치는 여유로운 광폭 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
        description: '중대형 평형 특유의 시원한 층고와 광폭 거실 설계로 온 가족이 편안한 휴식 공간',
        specs: '공급 112㎡ / 전용 84.9㎡ 이상'
      },
      {
        id: 'wsp-4',
        title: '안정적인 3Bay/4Bay 클래식 명품 평면',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '공간 분리가 확실하고 채광과 통풍이 탁월한 실거주 최적화 평면 구조',
        specs: '광폭 발코니 서비스 면적 풍부'
      },
      {
        id: 'wsp-5',
        title: '단지 바로 앞 월서중·영남중고 및 학원가 인프라',
        category: 'Location',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
        description: '달서구 최고 명문 학군과 신월성 핵심 학원가를 모두 도보로 누리는 최적의 교육 환경',
        specs: '초·중·고 원스톱 안심 학세권'
      },
      {
        id: 'wsp-6',
        title: '대단지 전용 스포츠센터 & 커뮤니티',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '실내 골프연습장, 헬스장, 주민 휴게 카페 등 탄탄하게 운영되는 입주민 편의시설',
        specs: '안정적인 입주민 자치 커뮤니티'
      }
    ]
  },
  // 4. 월성월드메르디앙
  {
    id: 'wolseong-world-meridian',
    name: '월성월드메르디앙',
    subTitle: '865세대 유럽풍 품격 외관 · 신월성 상권 초인접',
    typeOptions: ['34~35평형 (113~117㎡)', '41평형 (137㎡)', '52평형 (173㎡)', '64평형 (214㎡)', '85평형 (282㎡)'],
    selectedType: '34~35평형 (113~117㎡)',
    totalUnits: '865세대 (총 7개동)',
    builtYear: '2009년 6월',
    location: '대구광역시 달서구 월성로 93',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'wwm-1',
        title: '유럽풍 클래식 외관 디자인 월성월드메르디앙',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
        description: '품격 높은 유럽풍 외관과 조화로운 단지 배치로 월성동 중심에 자리한 명품 주거',
        specs: '총 865세대 · 최고 30층 · 7개동'
      },
      {
        id: 'wwm-2',
        title: '신월성 중심상권 & CGV 도보 1분 원스톱 라이프',
        category: 'Location',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '은행, 병원, 대형 마트, 영화관 및 유명 학원가를 집 앞에서 누리는 독보적인 인프라',
        specs: '신월성 상업지구 최단거리'
      },
      {
        id: 'wwm-3',
        title: '고급스러운 인테리어와 아늑한 패밀리 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop',
        description: '우수한 채광과 넓은 전용면적을 자랑하는 고품격 실내 공간',
        specs: '전용 84.9㎡ / 공급 114㎡'
      },
      {
        id: 'wwm-4',
        title: '여유로운 수납과 실속 있는 평면 구조',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '광폭 발코니 서비스 면적으로 확장 시 놀라운 실사용 공간 확보',
        specs: '전용 84㎡ ~ 161㎡ 중대형 평형대 보유'
      },
      {
        id: 'wwm-5',
        title: '유럽풍 분수광장과 단지 내 테마 쉼터',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '유럽 정원을 연상시키는 클래식 분수대와 사계절 아름다운 조경수',
        specs: '아늑한 주민 휴게 공간'
      },
      {
        id: 'wwm-6',
        title: '입주민 전용 헬스장 & 골프연습장',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '쾌적하게 관리되는 단지 내 실내 운동 시설과 주민 커뮤니티 센터',
        specs: '입주민 전용 편의 시설'
      }
    ]
  },
  // 5. 월성휴포레 (월성협성휴포레)
  {
    id: 'hyeopseong',
    name: '월성협성휴포레',
    subTitle: '조암초 학세권 및 명문 학원가 인접',
    typeOptions: ['27평형 (92㎡)', '33평형 (111㎡)', '40평형 (133㎡)', '44평형 (146㎡)'],
    selectedType: '33평형 (111㎡)',
    totalUnits: '996세대 (총 11개동)',
    builtYear: '2016년 6월',
    location: '대구광역시 달서구 월성동 1475',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'hs-1',
        title: '초품아 학세권 프리미엄 월성협성휴포레',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
        description: '조암초등학교를 바로 품고 있는 안심 통학로와 월성동 명문 학원가 도보권',
        specs: '총 996세대 · 최고 29층'
      },
      {
        id: 'hs-2',
        title: '햇살 가득한 오픈 테라스 가든',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '자녀들이 안전하게 뛰어놀 수 있는 차 없는 지상 보행로와 다채로운 어린이 놀이터',
        specs: '안심 통학 키즈 스테이션 설치'
      },
      {
        id: 'hs-3',
        title: '따뜻한 감성의 웜톤 패밀리 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '단열 및 층간소음 차단 성능이 우수하고 아늑한 패밀리 라이프를 위한 맞춤 설계',
        specs: '전용 84㎡ 실속형 판상형'
      },
      {
        id: 'hs-4',
        title: '전용 84㎡A 수납 극대화 평면도',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '현관 워크인 수납장과 안방 드레스룸으로 깔끔한 수납이 가능한 최적 동선',
        specs: '공급 112㎡ / 전용 84.9㎡'
      },
      {
        id: 'hs-5',
        title: '정돈된 아일랜드 주방 및 다용도실',
        category: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
        description: '세탁기와 건조기를 수직 배치할 수 있는 여유로운 다용도실과 아일랜드 식탁 존',
        specs: '친환경 마감재 적용'
      },
      {
        id: 'hs-6',
        title: '주민 소통을 위한 북카페 & 독서실',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '자녀들의 자기주도 학습을 위한 남녀 분리 독서실과 주민 전용 북카페',
        specs: '학부모 만족도 1위 교육 커뮤니티'
      }
    ]
  },
  // 6. 월배아이파크1차
  {
    id: 'ipark1',
    name: '월배아이파크 1차',
    subTitle: '벤 판 베르켈 설계 독창적 패브릭 패턴 입면 · 1,296세대 대단지',
    typeOptions: ['24평형 (82㎡)', '34평형 (114~115㎡)', '48평형 (161㎡)'],
    selectedType: '34평형 (114~115㎡)',
    totalUnits: '1,296세대 (총 13개동)',
    builtYear: '2015년 1월',
    location: '대구광역시 달서구 조암로 180',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'ip1-1',
        title: '세계적 거장이 빚어낸 랜드마크 입면 디자인',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop',
        description: 'UNStudio 벤 판 베르켈이 직조 패턴을 모티브로 완성한 독창적인 외관과 스카이라인',
        specs: '총 1,296세대 · 최고 30층 · 유천초 도보 통학'
      },
      {
        id: 'ip1-2',
        title: '단지 중심을 흐르는 생태 계류와 수변 광장',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '자연 친화적 수경 시설과 울창한 수목이 어우러져 도심 속 리조트 분위기를 연출합니다.',
        specs: '테마 정원 6개소 및 잔디마당 조성'
      },
      {
        id: 'ip1-3',
        title: '파노라마 조망을 품은 모던 리빙 스페이스',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
        description: '풍부한 채광과 확 트인 개방감으로 가족 모두가 편안히 머무를 수 있는 프리미엄 거실',
        specs: '전용 84㎡ · 층간소음 저감 설계 적용'
      },
      {
        id: 'ip1-4',
        title: '전용 84㎡ 공간 효율 최적화 평면',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
        description: '서비스 면적을 극대화하여 실제 체감 면적이 훨씬 넓은 실속형 4Bay 레이아웃',
        specs: '공급 114㎡ / 전용 84.9㎡'
      },
      {
        id: 'ip1-5',
        title: '미니멀 감성의 프라이빗 침실 & 파우더룸',
        category: 'Master Bedroom',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2000&auto=format&fit=crop',
        description: '아늑한 웜 뉴트럴 톤의 침실과 분리형 파우더룸, 워크인 드레스룸 구조',
        specs: '독립 욕실 및 파우더장 빌트인'
      },
      {
        id: 'ip1-6',
        title: '대단지 전용 복합 실내 스포츠 클럽',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '실내 골프타석, 피트니스 룸, GX룸, 북카페 등 프리미엄 커뮤니티 완비',
        specs: '입주민 전용 카드 키 시스템'
      }
    ]
  },
  // 7. 월배아이파크2차
  {
    id: 'ipark2',
    name: '월배아이파크 2차',
    subTitle: '2,134세대 매머드급 대단지 랜드마크',
    typeOptions: ['24평형 (80㎡)', '29평형 (98㎡)', '33평형 (111~112㎡)', '40평형 (133㎡)'],
    selectedType: '33평형 (111~112㎡)',
    totalUnits: '2,134세대 (총 19개동)',
    builtYear: '2016년 6월',
    location: '대구광역시 달서구 조암로 149',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'ip2-1',
        title: '압도적인 규모감의 2,074세대 랜드마크 전경',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
        description: '대구 달서구를 대표하는 초대형 프리미엄 주거 타운으로 완벽한 인프라를 자랑합니다.',
        specs: '총 2,074세대 · 최고 29층'
      },
      {
        id: 'ip2-2',
        title: '단지 내 중앙공원 & 테마 산책로',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '축구장 수 배에 달하는 지상 녹지 공원과 단지 안팎을 잇는 순환형 조깅 트랙',
        specs: '지상 차 없는 100% 지하 주차 공원화'
      },
      {
        id: 'ip2-3',
        title: '감각적인 조명과 고급 아트월 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '천연 대리석 느낌의 포세린 타일 아트월과 간접 조명으로 완성된 세련된 리빙룸',
        specs: '전용 84㎡ 판상형 남서향 로열층'
      },
      {
        id: 'ip2-4',
        title: '채광 가득한 전용 84㎡ 와이드 4Bay',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '모든 방과 거실에 풍부한 햇살이 드는 4Bay 구조와 넉넉한 다용도실 공간',
        specs: '공급 113㎡ / 전용 84.8㎡'
      },
      {
        id: 'ip2-5',
        title: '대형 수납 펜트리와 수납 특화 주방',
        category: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
        description: '주부의 동선을 배려한 스마트 수납 시스템과 넉넉한 냉장고 빌트인 존',
        specs: '인덕션 및 빌트인 오븐 구성'
      },
      {
        id: 'ip2-6',
        title: '호텔급 사우나와 입주민 라운지',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop',
        description: '입주민 전용 사우나와 냉온탕, 피트니스 센터와 키즈 카페까지 완비된 명품 커뮤니티',
        specs: '단지 내 대형 복합 스포츠센터'
      }
    ]
  },
  // 8. 월배삼정 (월배삼정그린코아포레스트)
  {
    id: 'wolbae-samjeong-forest',
    name: '월배삼정그린코아포레스트',
    subTitle: '1,533세대 매머드급 신축 대단지 · 친환경 에코 라이프',
    typeOptions: ['33평형 (108~112㎡)', '43~44평형 (142~147㎡)', '47~50평형 (155~166㎡)'],
    selectedType: '33평형 (108~112㎡)',
    totalUnits: '1,533세대 (총 15개동)',
    builtYear: '2021년 11월',
    location: '대구광역시 달서구 대천동 543',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'wsf-1',
        title: '친환경 에코라이프 1,533세대 대단지 전경',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop',
        description: '2021년 11월 준공된 신축 대단지로 웅장한 스케일과 최신 외관 특화 설계를 자랑합니다.',
        specs: '총 1,533세대 · 최고 30층 · 지상 공원화 특화'
      },
      {
        id: 'wsf-2',
        title: '수변공원과 연계된 힐링 산책 테마정원',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '단지 앞 수변공원 산책로와 자연스럽게 이어지는 대규모 테마 수경 공간과 잔디마당',
        specs: '단지 내 친환경 녹지 비율 극대화'
      },
      {
        id: 'wsf-3',
        title: '신축 프리미엄 4Bay 혁신 평면 와이드 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '탁 트인 조망과 풍부한 일조권을 누리는 최신 4Bay 판상형 구조의 넓은 거실',
        specs: '전용 84㎡ 판상형 맞통풍 구조'
      },
      {
        id: 'wsf-4',
        title: '수납 특화 드레스룸 & 팬트리 평면 설계',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '현관 팬트리, 주방 팬트리, 대형 안방 드레스룸으로 극대화된 수납 효율성',
        specs: '공급 111㎡ / 전용 84.8㎡'
      },
      {
        id: 'wsf-5',
        title: '모던한 그레이 & 화이트 프리미엄 주방',
        category: 'Kitchen',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop',
        description: '동선이 편리한 ㄷ자형 주방과 와이드 다이닝 공간으로 가족 간 소통 강화',
        specs: '최신 빌트인 시스템 및 엔지니어드 스톤 상판'
      },
      {
        id: 'wsf-6',
        title: '단지 내 대규모 피트니스 센터 & 실내골프클럽',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '스크린골프 타석, 피트니스, GX룸, 북카페 등 하이엔드 입주민 전용 커뮤니티',
        specs: '최신 호텔식 커뮤니티 시설'
      }
    ]
  },
  // 9. AK그랑폴리스
  {
    id: 'ak-grandpolis',
    name: 'AK그랑폴리스',
    subTitle: '1,881세대 매머드급 랜드마크 · 유천동 중심 원스톱 인프라',
    typeOptions: ['25평형 (82㎡)', '30평형 (98~100㎡)', '33~34평형 (110~112㎡)', '38평형 (127㎡)', '43평형 (141㎡)'],
    selectedType: '33~34평형 (110~112㎡)',
    totalUnits: '1,881세대 (총 17개동)',
    builtYear: '2013년 4월',
    location: '대구광역시 달서구 달서대로 95',
    naverLandUrl: FIXED_NAVER_LAND_URL,
    slides: [
      {
        id: 'ak-1',
        title: '1,881세대 매머드급 스케일과 랜드마크 입면',
        category: 'Exterior',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
        description: '유천동 권역 최대 규모의 웅장한 대단지로 원스톱 스트리트몰 상권을 품은 주거 명작',
        specs: '총 1,881세대 · 최고 30층 · 17개동'
      },
      {
        id: 'ak-2',
        title: '사계절 푸른 단지 내 테마 파크 & 중앙 광장',
        category: 'Landscaping',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
        description: '대천근린공원과 연계된 쾌적한 녹지축과 아이들이 안전하게 거니는 공원형 보행로',
        specs: '지상 공원화 및 풍부한 테마 조경 공간'
      },
      {
        id: 'ak-3',
        title: '채광과 개방감을 극대화한 클래식 모던 거실',
        category: 'Interior',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop',
        description: '남향 위주 배치를 통한 밝고 화사한 일조량과 편안한 휴식을 제공하는 리빙룸',
        specs: '전용 84㎡ 및 대형 평형대 라인업'
      },
      {
        id: 'ak-4',
        title: '실거주 선호도 1위 4Bay 맞통풍 평면도',
        category: 'Floor Plan',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
        description: '광폭 발코니 서비스 면적으로 확장 시 우수한 실사용 공간과 넉넉한 팬트리',
        specs: '공급 112㎡ / 전용 84.9㎡'
      },
      {
        id: 'ak-5',
        title: '단지 내 스트리트 상가 & 유천초 도보 통학',
        category: 'Location',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
        description: '학원, 은행, 병의원 등 원스톱 생활 인프라와 유천초등학교 안심 통학로',
        specs: '초품아 학세권 & 올인원 라이프스타일'
      },
      {
        id: 'ak-6',
        title: '대단지 입주민 전용 스포츠 & 커뮤니티 센터',
        category: 'Amenities',
        image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop',
        description: '골프연습장, 대형 피트니스, 도서관, 주민 카페 등 활성화된 커뮤니티',
        specs: '매머드급 입주민 전용 시설 완비'
      }
    ]
  }
];
