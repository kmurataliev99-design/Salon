import React, { useState, useMemo } from 'react';
import { Sparkles, Info, Check, ArrowRight, Clock, Calculator } from 'lucide-react';
import { SERVICES, ServiceItem, MASTERS, Language } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';

interface PriceListSectionProps {
  language: Language;
  onSelectService: (serviceId: string) => void;
  onOpenBooking: () => void;
}

export const PriceListSection: React.FC<PriceListSectionProps> = ({
  language,
  onSelectService,
  onOpenBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMasterFilter, setSelectedMasterFilter] = useState<string>('all');
  
  // Interactive Hair Length & Density Calculator
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcServiceId, setCalcServiceId] = useState<string>('keratin');
  const [hairLength, setHairLength] = useState<'short' | 'medium' | 'long' | 'extra'>('medium');
  const [hairDensity, setHairDensity] = useState<'normal' | 'thick' | 'very_thick'>('normal');

  const t = UI_TRANSLATIONS.pricing;

  const categoryTabs = [
    { id: 'all', label: t.all[language] },
    { id: 'botox', label: 'Ботокс' },
    { id: 'keratin', label: 'Кератин' },
    { id: 'combo', label: 'Кератин + Ботокс' },
    { id: 'nanoplastia', label: 'Нанопластика' },
    { id: 'luxury', label: 'Бикси / Нанолифтинг' },
  ];

  // Filtered services
  const filteredServices = useMemo(() => {
    return SERVICES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'botox' && item.category === 'botox') ||
        (selectedCategory === 'keratin' && item.category === 'keratin') ||
        (selectedCategory === 'nanoplastia' && item.category === 'nanoplastia') ||
        (selectedCategory === 'luxury' && item.category === 'luxury') ||
        (selectedCategory === 'combo' && item.category === 'combo');

      const matchesMaster =
        selectedMasterFilter === 'all' ||
        MASTERS.find((m) => m.id === selectedMasterFilter)?.servicesOffered.includes(item.id);

      return matchesCategory && matchesMaster;
    });
  }, [selectedCategory, selectedMasterFilter]);

  // Calculate estimated price
  const estimatedPrice = useMemo(() => {
    const baseService = SERVICES.find((s) => s.id === calcServiceId) || SERVICES[1];
    let price = baseService.priceSom;
    
    // Length adjustments
    if (hairLength === 'short') price -= 500;
    if (hairLength === 'long') price += 700;
    if (hairLength === 'extra') price += 1400;

    // Density adjustments
    if (hairDensity === 'thick') price += 500;
    if (hairDensity === 'very_thick') price += 1000;

    return Math.max(price, 3500);
  }, [calcServiceId, hairLength, hairDensity]);

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-[#F5F2EC] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.badge[language]}</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#242120]">
            {t.title[language]}
          </h2>

          <p className="text-sm sm:text-base text-[#5C554E] max-w-xl mx-auto">
            {t.subtitle[language]}
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#EBE5DC] rounded-xl border border-[#DDD5CA] w-full md:w-auto">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === tab.id
                    ? 'bg-[#242120] text-white shadow-sm'
                    : 'text-[#5C554E] hover:text-[#242120] hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Master Filter & Interactive Calculator Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <div className="flex items-center gap-2 text-xs text-[#7A7169] bg-white px-3 py-1.5 rounded-lg border border-[#DDD5CA]">
              <span>{t.filterMaster[language]}</span>
              <select
                value={selectedMasterFilter}
                onChange={(e) => setSelectedMasterFilter(e.target.value)}
                className="bg-transparent font-medium text-[#242120] focus:outline-none cursor-pointer"
              >
                <option value="all">{t.allMasters[language]}</option>
                {MASTERS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.rating}★)
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setShowCalculator(!showCalculator)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                showCalculator
                  ? 'bg-[#8C6D58] text-white border-[#8C6D58]'
                  : 'bg-white text-[#242120] border-[#DDD5CA] hover:bg-[#FAF9F6]'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{showCalculator ? t.btnHideCalc[language] : t.btnCalc[language]}</span>
            </button>
          </div>

        </div>

        {/* Interactive Calculator Box */}
        {showCalculator && (
          <div className="mb-10 bg-white p-6 rounded-2xl border border-[#DDD5CA] shadow-sm animate-in fade-in duration-300">
            <div className="max-w-3xl mx-auto space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D8]">
                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#8C6D58]" />
                  <h3 className="text-base font-semibold text-[#242120]">
                    {t.calcTitle[language]}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#5C554E]">{t.calcService[language]}</label>
                  <select
                    value={calcServiceId}
                    onChange={(e) => setCalcServiceId(e.target.value)}
                    className="w-full text-xs font-medium p-2.5 rounded-lg border border-[#DDD5CA] bg-[#FAF9F6] text-[#242120]"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.priceSom} с)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#5C554E]">{t.calcLength[language]}</label>
                  <select
                    value={hairLength}
                    onChange={(e) => setHairLength(e.target.value as any)}
                    className="w-full text-xs font-medium p-2.5 rounded-lg border border-[#DDD5CA] bg-[#FAF9F6] text-[#242120]"
                  >
                    <option value="short">{language === 'ky' ? 'Ийинге чейин / каре (-500 с)' : 'Каре / до плеч (-500 с)'}</option>
                    <option value="medium">{language === 'ky' ? 'Орточо (далыга чейин — база)' : 'Средняя (до лопаток — база)'}</option>
                    <option value="long">{language === 'ky' ? 'Узун (белге чейин, +700 с)' : 'Длинные (до поясницы, +700 с)'}</option>
                    <option value="extra">{language === 'ky' ? 'Өтө узун (+1400 с)' : 'Очень длинные (+1400 с)'}</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#5C554E]">{t.calcDensity[language]}</label>
                  <select
                    value={hairDensity}
                    onChange={(e) => setHairDensity(e.target.value as any)}
                    className="w-full text-xs font-medium p-2.5 rounded-lg border border-[#DDD5CA] bg-[#FAF9F6] text-[#242120]"
                  >
                    <option value="normal">{language === 'ky' ? 'Орточо коюулук (0 с)' : 'Средняя густота (0 с)'}</option>
                    <option value="thick">{language === 'ky' ? 'Коюу чач (+500 с курамга)' : 'Густые волосы (+500 с за состав)'}</option>
                    <option value="very_thick">{language === 'ky' ? 'Өтө коюу (+1000 с)' : 'Очень густые (+1000 с)'}</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between bg-[#F8F5EF] p-4 rounded-xl border border-[#E8E2D8] gap-4">
                <div className="text-xs text-[#5C554E]">
                  {t.calcResult[language]}{' '}
                  <span className="font-serif-luxury text-2xl font-bold text-[#242120] ml-2 tabular-nums">
                    {estimatedPrice.toLocaleString('ru-RU')} сом
                  </span>
                  <span className="block text-[11px] text-[#7A7169] mt-0.5">
                    {t.calcNote[language]}
                  </span>
                </div>

                <button
                  onClick={() => onSelectService(calcServiceId)}
                  className="bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shadow-sm"
                >
                  {t.calcBookBtn[language]}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-2xl p-6 border border-[#E0D8CE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group hover:border-[#8C6D58]/40"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-[#7A7169] pb-3 border-b border-[#F0ECE5]">
                  <span className="font-medium text-[#8C6D58] tracking-wide">{service.brand}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {service.duration}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-semibold text-[#242120] group-hover:text-[#8C6D58] transition-colors">
                    {service.name}
                  </h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="font-serif-luxury text-3xl font-bold text-[#242120] tabular-nums">
                      {service.priceSom.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-lg font-medium text-[#242120]">с</span>
                    <span className="text-xs text-[#7A7169] ml-2">
                      {language === 'ky' ? 'орточо узундук' : 'средняя длина'}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#5C554E] leading-relaxed">
                  {service.description[language]}
                </p>

                <div className="space-y-1.5 pt-2">
                  {service.benefits[language].map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#4A433D]">
                      <Check className="w-3.5 h-3.5 text-[#54805A] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-[#7A7169] pt-2 border-t border-[#F0ECE5]">
                  <span>{language === 'ky' ? 'Мөөнөтү:' : 'Эффект:'} </span>
                  <span className="font-medium text-[#242120]">{service.retention}</span>
                  <span className="mx-1.5">·</span>
                  <span>{language === 'ky' ? 'Ылайыктуу:' : 'Для:'} </span>
                  <span className="italic">{service.recommendedFor[language]}</span>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-[#F0ECE5]">
                <button
                  onClick={() => onSelectService(service.id)}
                  className="w-full flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#242120] text-[#242120] hover:text-white font-medium text-xs py-3 px-4 rounded-xl border border-[#DDD5CA] hover:border-[#242120] transition-all group-hover:shadow-sm"
                >
                  <span>{t.btnSelect[language]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 3 Notes matching the user's photo */}
        <div className="mt-12 bg-[#EFEAE2] rounded-2xl p-6 sm:p-8 border border-[#DDD5CA]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-[#DDD5CA] shrink-0 text-[#8C6D58]">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#242120] mb-1">
                  {t.note1Title[language]}
                </h4>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  {t.note1Desc[language]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-[#DDD5CA] shrink-0 text-[#8C6D58]">
                <Check className="w-5 h-5 text-[#54805A]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#242120] mb-1">
                  {t.note2Title[language]}
                </h4>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  {t.note2Desc[language]}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg border border-[#DDD5CA] shrink-0 text-[#8C6D58]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[#242120] mb-1">
                  {t.note3Title[language]}
                </h4>
                <p className="text-xs text-[#5C554E] leading-relaxed">
                  {t.note3Desc[language]}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
