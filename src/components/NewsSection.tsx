import React, { useState } from 'react';
import { Newspaper, Clock, ArrowRight, Share2, MessageCircle, X, Search, Tag } from 'lucide-react';
import { PROPERTY_NEWS, REALTOR_INFO } from '../data/mockData';
import { NewsPost } from '../types';

interface NewsSectionProps {
  onAskAboutPost: (postTitle: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onAskAboutPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [activeArticle, setActiveArticle] = useState<NewsPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', '부동산 동향', '세금 가이드', '정부 정책', '안심 중개'];

  const filteredNews = PROPERTY_NEWS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      searchKeyword.trim() === '' ||
      item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchKeyword.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleShare = (post: NewsPost) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}#news-${post.id}`);
      setCopiedId(post.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="news" className="py-20 md:py-28 bg-[#FAF8F5] text-[#141414] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pb-6 border-b border-[#E5DFD5]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif-luxury tracking-[0.25em] text-[#7A0016] uppercase font-semibold mb-2">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Bomnal Insights &amp; Market Columns</span>
            </div>
            <h2 className="font-korean-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#141414]">
              부동산 소식 &amp; 전문 칼럼
            </h2>
            <p className="text-sm sm:text-base text-[#666666] font-sans-clean mt-2 max-w-2xl">
              달서구 월성동 실거래 동향부터 놓치기 쉬운 세무 절세법, 대출 정책, 
              전세사기 예방 노하우까지 장순조 대표가 엄선한 유익한 주거 가이드를 확인하세요.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              id="news-search-input"
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="제목, 키워드 검색..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white border border-[#DED7CB] text-xs font-sans-clean text-[#141414] focus:outline-none focus:border-[#7A0016] shadow-2xs"
            />
            <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-[#7A0016] text-[#FAF8F5] shadow-xs'
                  : 'bg-white text-[#666666] hover:text-[#141414] border border-[#DED7CB]'
              }`}
            >
              {cat === 'all' ? '전체 보기' : cat}
            </button>
          ))}
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredNews.map((post) => (
            <article
              key={post.id}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E6DFC5]/80 hover:border-[#7A0016]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-sans-clean font-bold bg-[#7A0016] text-white shadow-xs">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-[11px] text-[#888888] mb-2 font-sans-clean">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-korean-serif text-lg font-bold text-[#141414] group-hover:text-[#7A0016] transition-colors line-clamp-2 mb-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-[#555555] line-clamp-3 leading-relaxed font-sans-clean mb-4">
                    {post.summary}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] text-[#777777] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#EDE7DD]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-5 pt-0 border-t border-[#F4EFE6] mt-2">
                <button
                  type="button"
                  onClick={() => setActiveArticle(post)}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold text-[#7A0016] group-hover:bg-[#7A0016] group-hover:text-white transition-all flex items-center justify-center gap-1.5 border border-[#7A0016]/30 group-hover:border-[#7A0016]"
                >
                  <span>칼럼 전문 읽기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search State */}
        {filteredNews.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E8E2D9]">
            <p className="text-base text-[#666666] font-sans-clean">
              검색어와 일치하는 소식이나 칼럼이 없습니다.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchKeyword('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-full bg-[#7A0016] text-white text-xs font-semibold"
            >
              전체 목록 보기
            </button>
          </div>
        )}
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div
          id="article-detail-modal"
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 shadow-2xl border border-[#E5DFD5] text-[#141414] my-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex justify-between items-center pb-4 border-b border-[#EDE6DC] mb-6">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#7A0016] text-white">
                {activeArticle.category}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-full text-[#888888] hover:text-[#141414] hover:bg-[#F2ECE2]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Title & Metadata */}
            <h2 className="font-korean-serif text-2xl sm:text-3xl font-bold text-[#141414] leading-snug mb-4">
              {activeArticle.title}
            </h2>

            <div className="flex flex-wrap items-center justify-between text-xs text-[#777777] pb-6 border-b border-[#EDE6DC] mb-6">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-[#141414]">작성: 봄날부동산 장순조 대표</span>
                <span>•</span>
                <span>{activeArticle.date}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <button
                type="button"
                onClick={() => handleShare(activeArticle)}
                className="flex items-center gap-1 text-[#7A0016] font-semibold hover:underline mt-2 sm:mt-0"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedId === activeArticle.id ? '링크 복사완료!' : '공유하기'}</span>
              </button>
            </div>

            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-8 border border-[#EBE3D7]">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Body Content with formatted paragraphs */}
            <div className="prose max-w-none text-sm sm:text-base leading-relaxed text-[#333333] font-sans-clean space-y-4 mb-8">
              {activeArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="font-korean-serif text-lg sm:text-xl font-bold text-[#141414] pt-3 pb-1 border-b border-[#EDE6DC]">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={index} className="whitespace-pre-line leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-[#EDE6DC] mb-8">
              {activeArticle.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 text-xs text-[#666666] bg-[#FAF8F5] px-3 py-1 rounded-full border border-[#E5DFD5]"
                >
                  <Tag className="w-3 h-3 text-[#7A0016]" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Bottom Actions for Inquiry */}
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#E6DEC4] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-korean-serif font-bold text-sm text-[#141414]">
                  이 칼럼과 관련된 부동산 상담이 필요하신가요?
                </h4>
                <p className="text-xs text-[#666666] mt-0.5">
                  장순조 대표 공인중개사가 1:1 맞춤 세무·매매 컨설팅을 도와드립니다.
                </p>
              </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <a
                  href={`tel:${REALTOR_INFO.phone}`}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-[#141414] text-white text-xs font-semibold hover:bg-[#333333] text-center"
                >
                  전화 문의
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onAskAboutPost(activeArticle.title);
                    setActiveArticle(null);
                  }}
                  className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-[#7A0016] text-white text-xs font-semibold hover:bg-[#580010] text-center flex items-center justify-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>상담 신청</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
