import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';
import { ReviewItem, Language } from '../data/salonData';

interface ReviewsSectionProps {
  language: Language;
  reviews: ReviewItem[];
  onOpenLeaveReview: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  language,
  reviews,
  onOpenLeaveReview,
}) => {
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');

  const filteredReviews = reviews.filter((r) => {
    if (filterRating === 'all') return true;
    return r.rating === filterRating;
  });

  const averageRating = (
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">
              {language === 'ky' ? 'Кардарларыбыздын чыныгы пикирлери' : 'Честные впечатления наших гостей'}
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#242120]">
              {language === 'ky' ? '«Белл» студиясынын кардарларынын пикирлери' : 'Отзывы клиентов салона «Белл»'}
            </h2>
            <p className="text-sm text-[#5C554E]">
              {language === 'ky'
                ? 'Ар бир пикир Бишкектеги Байтик баатыр 118 дарегине келген коноктор тарабынан калтырылган.'
                : 'Каждый отзыв оставлен реальными клиентками после визита на ул. Байтик Баатыра 118 в Бишкеке.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white p-3.5 rounded-xl border border-[#DDD5CA] shadow-sm flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#C49236]">
                <Star className="w-5 h-5 fill-[#C49236]" />
                <span className="font-serif-luxury text-2xl font-bold text-[#242120] tabular-nums">
                  {averageRating}
                </span>
              </div>
              <div className="text-xs text-[#7A7169] border-l border-[#E8E2D8] pl-3">
                <span className="font-semibold text-[#242120] block">
                  {reviews.length} {language === 'ky' ? 'пикир' : 'отзывов'}
                </span>
                <span>100% {language === 'ky' ? 'сунушташат' : 'рекомендаций'}</span>
              </div>
            </div>

            <button
              onClick={onOpenLeaveReview}
              className="flex items-center gap-2 bg-[#242120] hover:bg-[#3D3734] text-white text-xs sm:text-sm font-medium px-5 py-3.5 rounded-xl transition-colors shadow-sm whitespace-nowrap"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#E8D8C8]" />
              <span>{language === 'ky' ? 'Пикир калтыруу' : 'Оставить свой отзыв'}</span>
            </button>
          </div>
        </div>

        {/* Rating Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          <span className="text-xs text-[#7A7169] mr-2">
            {language === 'ky' ? 'Баалоо:' : 'Оценка:'}
          </span>
          {[
            { id: 'all', label: language === 'ky' ? 'Бардыгы' : 'Все отзывы' },
            { id: 5, label: language === 'ky' ? '5 жылдыз (Мыкты)' : '5 звезд (Превосходно)' },
            { id: 4, label: language === 'ky' ? '4 жылдыз (Жакшы)' : '4 звезды (Хорошо)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterRating(tab.id as any)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                filterRating === tab.id
                  ? 'bg-[#242120] text-white shadow-sm'
                  : 'bg-white text-[#5C554E] border border-[#DDD5CA] hover:bg-[#FAF7F2]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl p-6 border border-[#E0D8CE] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#242120]">
                      {review.clientName}
                    </h4>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < review.rating
                              ? 'text-[#C49236] fill-[#C49236]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <span className="text-[11px] text-[#7A7169]">
                    {review.date}
                  </span>
                </div>

                <div className="text-xs text-[#8C6D58] bg-[#FAF7F2] p-2 rounded-lg border border-[#EFEAE2]">
                  <span className="font-medium">{review.procedureName}</span>
                  {review.masterName && (
                    <span className="text-[#7A7169]"> · {review.masterName}</span>
                  )}
                </div>

                <p className="text-xs text-[#5C554E] leading-relaxed italic">
                  «{review.comment}»
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#F0ECE5] flex items-center justify-between text-[11px] text-[#54805A]">
                <div className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'ky' ? 'Текшерилген сапар' : 'Проверенное посещение'}</span>
                </div>
                <span className="text-[#7A7169]">Бишкек</span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
