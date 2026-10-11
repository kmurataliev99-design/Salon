import React, { useState } from 'react';
import { X, Star, CheckCircle, MessageSquare } from 'lucide-react';
import { SERVICES, MASTERS, ReviewItem } from '../data/salonData';

interface LeaveReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (newReview: ReviewItem) => void;
}

export const LeaveReviewModal: React.FC<LeaveReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>(SERVICES[0].name);
  const [masterName, setMasterName] = useState<string>(MASTERS[0].name);
  const [comment, setComment] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const todayStr = new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const newReview: ReviewItem = {
      id: 'user-rev-' + Date.now(),
      clientName: name.trim(),
      date: todayStr,
      rating,
      procedureName: serviceName,
      masterName,
      comment: comment.trim(),
      verified: true,
    };

    onSubmitReview(newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FAF9F6] w-full max-w-lg rounded-3xl border border-[#E0D8CE] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="px-6 py-5 bg-[#F5F1EB] border-b border-[#E8E2D8] flex items-center justify-between">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#242120]">
              Оставить отзыв о салоне «Белл»
            </h3>
            <p className="text-xs text-[#7A7169] mt-0.5">
              Ваше мнение помогает нам становиться еще лучше
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A7169] hover:text-[#242120] rounded-full hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-[#EBF3ED] text-[#4F7E5E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-[#242120]">
                Спасибо за ваш отзыв!
              </h4>
              <p className="text-xs text-[#5C554E]">
                Ваш отзыв опубликован и доступен всем гостям нашего сайта.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold text-[#242120] mb-2 text-center">
                  Ваша общая оценка:
                </label>
                <div className="flex justify-center items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= (hoverRating || rating)
                            ? 'text-[#C49236] fill-[#C49236]'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-[#242120] mb-1">
                  Ваше имя:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Например, Чолпон"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#DDD5CA] bg-white text-[#242120] focus:ring-1 focus:ring-[#242120] focus:outline-none"
                />
              </div>

              {/* Procedure & Master */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#242120] mb-1">
                    Процедура:
                  </label>
                  <select
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DDD5CA] bg-white text-[#242120]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Обучение в Академии">Обучение в Академии</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#242120] mb-1">
                    Ваш мастер:
                  </label>
                  <select
                    value={masterName}
                    onChange={(e) => setMasterName(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-[#DDD5CA] bg-white text-[#242120]"
                  >
                    {MASTERS.map((m) => (
                      <option key={m.id} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label className="block text-xs font-semibold text-[#242120] mb-1">
                  Ваш отзыв и впечатления от результата:
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Как изменились волосы, как держался эффект, понравился ли сервис..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#DDD5CA] bg-white text-[#242120] focus:ring-1 focus:ring-[#242120] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-semibold py-3 rounded-xl transition-colors shadow-sm"
                >
                  Опубликовать отзыв
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
