import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { PORTFOLIO, Language } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';

interface BeforeAfterSectionProps {
  language: Language;
  onOpenBooking: (serviceId?: string) => void;
}

export const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ language, onOpenBooking }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePortfolioCategory, setActivePortfolioCategory] = useState<string>('all');
  const sliderContainerRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS.portfolio;
  const spotlightItem = PORTFOLIO[0];

  const handleMove = useCallback((clientX: number) => {
    if (!sliderContainerRef.current) return;
    const rect = sliderContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const filteredPortfolio = PORTFOLIO.filter((item) => {
    if (activePortfolioCategory === 'all') return true;
    return item.procedureId === activePortfolioCategory;
  });

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">
            {t.badge[language]}
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#242120]">
            {t.title[language]}
          </h2>
          <p className="text-sm sm:text-base text-[#5C554E]">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Interactive Comparison Slider Spotlight */}
        <div className="bg-[#F5F1EB] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E0D8CE] shadow-sm mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Draggable Slider */}
            <div className="lg:col-span-8">
              <div
                ref={sliderContainerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden cursor-ew-resize select-none border border-[#DDD5CA] shadow-md"
              >
                {/* AFTER image */}
                <img
                  src={spotlightItem.afterImg}
                  alt="После: Зеркальный блеск"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg pointer-events-none">
                  {t.after[language]} (H. Tokio)
                </div>

                {/* BEFORE image */}
                <div
                  style={{ width: `${sliderPos}%` }}
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white shadow-2xl"
                >
                  <img
                    src={spotlightItem.beforeImg}
                    alt="До: Пушистые пористые кудри"
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: sliderContainerRef.current ? `${sliderContainerRef.current.clientWidth}px` : '100%' }}
                  />
                  
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg pointer-events-none">
                    {t.before[language]}
                  </div>
                </div>

                {/* Handle */}
                <div
                  style={{ left: `${sliderPos}%` }}
                  className="absolute top-0 bottom-0 w-1 bg-white transform -translate-x-1/2 pointer-events-none"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-[#242120]">
                    <SlidersHorizontal className="w-4 h-4 text-[#242120]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Spotlight Details */}
            <div className="lg:col-span-4 space-y-4">
              <div className="text-xs font-medium text-[#8C6D58]">
                {spotlightItem.procedureName[language]}
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-[#242120]">
                {spotlightItem.title[language]}
              </h3>

              <div className="space-y-2 text-xs text-[#5C554E]">
                <div className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
                  <span className="font-semibold text-[#242120] block mb-0.5">
                    {language === 'ky' ? 'Баштапкы абалы:' : 'Исходное состояние:'}
                  </span>
                  {spotlightItem.beforeDescription[language]}
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E8E2D8]">
                  <span className="font-semibold text-[#242120] block mb-0.5">
                    {language === 'ky' ? 'Жыйынтык:' : 'Результат визита:'}
                  </span>
                  {spotlightItem.afterDescription[language]}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#7A7169] py-2 border-t border-[#E0D8CE]">
                <span>
                  {language === 'ky' ? 'Мастер:' : 'Мастер:'}{' '}
                  <strong className="text-[#242120]">{spotlightItem.masterName}</strong>
                </span>
                <span>
                  {language === 'ky' ? 'Сакталуусу:' : 'Стойкость:'}{' '}
                  <strong className="text-[#242120]">{spotlightItem.retentionPeriod[language]}</strong>
                </span>
              </div>

              <button
                onClick={() => onOpenBooking(spotlightItem.procedureId)}
                className="w-full flex items-center justify-center gap-2 bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-medium py-3 px-4 rounded-xl transition-colors shadow-sm"
              >
                <span>{t.wantResult[language]}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#E8D8C8]" />
              </button>
            </div>

          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPortfolio.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E0D8CE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="grid grid-cols-2 gap-0.5 bg-[#FAF9F6] relative">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.beforeImg}
                      alt="До"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {t.before[language]}
                    </div>
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={item.afterImg}
                      alt="После"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-2 right-2 bg-[#4F7E5E] text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                      {t.after[language]}
                    </div>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[11px] text-[#8C6D58] font-medium">
                    {item.procedureName[language]}
                  </div>

                  <h4 className="font-serif-luxury text-base font-bold text-[#242120]">
                    {item.title[language]}
                  </h4>

                  <div className="text-[11px] text-[#7A7169] pt-2 border-t border-[#F0ECE5]">
                    Мастер: <span className="font-medium text-[#242120]">{item.masterName}</span> · {item.retentionPeriod[language]}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onOpenBooking(item.procedureId)}
                  className="w-full text-xs font-medium py-2 bg-[#FAF7F2] hover:bg-[#242120] text-[#242120] hover:text-white rounded-xl border border-[#DDD5CA] transition-colors"
                >
                  {language === 'ky' ? 'Жазылуу' : 'Записаться'}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
