export interface AreaTypeDetail {
  typeName: string;
  pyeong: string;
  supplyArea: string;
  exclusiveArea: string;
  units: string;
}

export interface ApartmentComplex {
  id: string;
  name: string;
  subName?: string;
  tagline: string;
  totalUnits: string;
  dongCount: string;
  builtYear: string;
  parkingRatio?: string;
  areaTypes: string[];
  typeDetails?: AreaTypeDetail[];
  locationDesc: string;
  highlights: string[];
  image: string;
  naverLandUrl: string;
  galleryUrl?: string;
  category: 'landmark' | 'new' | 'premium';
}

export interface NewsPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
  tags: string[];
}

export interface ConsultationForm {
  name: string;
  phone: string;
  type: 'sale' | 'lease' | 'request' | 'consult';
  targetProperty: string;
  preferredMethod: 'sms' | 'visit' | 'call' | 'kakao';
  date: string;
  timeSlot: string;
  message: string;
}

export interface SavedInquiry extends ConsultationForm {
  id: string;
  submittedAt: string;
  status: '접수완료' | '상담대기';
}

export interface GalleryItem {
  id: string;
  title: string;
  complexName: string;
  category: 'exterior' | 'plan' | 'interior' | 'landscape';
  categoryLabel: string;
  image: string;
  caption: string;
  specs?: string;
}
