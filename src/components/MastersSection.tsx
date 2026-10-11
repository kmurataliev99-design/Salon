import React, { useState } from 'react';
import { Star, Calendar, Instagram, Award } from 'lucide-react';
import { MASTERS, Master, Language, SALON_INFO } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';

interface MastersSectionProps {
  language: Language;
  onSelectMaster: (masterId: string) => void;
}

export const MastersSection: React.FC<MastersSectionProps> = ({ language, onSelectMaster }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const t = UI_TRANSLATIONS.masters;

  const specialtiesList = [
    { id: 'all', label: language === 'ky' ? 'Бардык мастерлер' : 'Все мастера' },
    { id: 'кератин', label: language === 'ky' ? 'Премиум кератин' : 'Кератин премиум' },
    { id: 'нанопластика', label: language === 'ky' ? 'Нанопластика' : 'Нанопластика' },
    { id: 'ботокс', label: language === 'ky' ? 'Ботокс жана уход' : 'Ботокс и уход' },
    { id: 'блонд', label: language === 'ky' ? 'Блонд менен иштөө' : 'Работа с блондом' },
  ];

  const filteredMasters = MASTERS.filter((master) => {
    if (selectedSpecialty === 'all') return true;
    const s = selectedSpecialty.toLowerCase();
    return (
      master.specialties[language].some((spec) => spec.toLowerCase().includes(s)) ||
      master.title[language].toLowerCase().includes(s)
    );
  });

  return (
    <section id="masters" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#E8E2D8]">
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
          <div className="pt-1">
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#8C6D58] hover:text-[#242120] font-medium bg-[#F2ECE4] px-3 py-1.5 rounded-lg border border-[#DDD5CA]"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram: @{SALON_INFO.instagram}</span>
            </a>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 bg-[#F2ECE4] rounded-xl border border-[#DDD5CA] max-w-2xl mx-auto mb-12">
          {specialtiesList.map((spec) => (
            <button
              key={spec.id}
              onClick={() => setSelectedSpecialty(spec.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                selectedSpecialty === spec.id
                  ? 'bg-[#242120] text-white shadow-sm'
                  : 'text-[#5C554E] hover:text-[#242120] hover:bg-white/50'
              }`}
            >
              {spec.label}
            </button>
          ))}
        </div>

        {/* Masters Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMasters.map((master) => (
            <div
              key={master.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#E0D8CE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#EAE2D8]">
                  <img
                    src={master.photoUrl}
                    alt={master.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-md text-xs font-semibold text-[#242120] flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-[#C49236] fill-[#C49236]" />
                    <span className="tabular-nums">{master.rating.toFixed(2)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-serif-luxury text-xl font-bold text-[#242120] group-hover:text-[#8C6D58] transition-colors">
                      {master.name}
                    </h3>
                    <p className="text-xs text-[#8C6D58] font-medium mt-0.5">
                      {master.title[language]}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-[#7A7169] py-1 border-y border-[#F0ECE5]">
                    <span>{master.experience[language]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">&gt;{master.proceduresDone} {language === 'ky' ? 'процедура' : 'процедур'}</span>
                  </div>

                  <p className="text-xs text-[#5C554E] line-clamp-2 leading-relaxed">
                    {master.bio[language]}
                  </p>

                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] font-medium text-[#7A7169]">
                      {language === 'ky' ? 'Багыты:' : 'Специализация:'}
                    </div>
                    <div className="flex flex-wrap gap-1 text-[11px] text-[#4A433D]">
                      {master.specialties[language].map((s, idx) => (
                        <span key={idx} className="bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E2D8]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectMaster(master.id)}
                  className="w-full flex items-center justify-center gap-2 bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#E8D8C8]" />
                  <span>
                    {language === 'ky' ? `${master.name}ге жазылуу` : `Записаться к ${master.name}`}
                  </span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
