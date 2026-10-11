import React from 'react';
import { ShieldCheck, Sparkles, Microscope } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { Language } from '../data/salonData';

interface BrandTechnologySectionProps {
  language: Language;
}

export const BrandTechnologySection: React.FC<BrandTechnologySectionProps> = ({ language }) => {
  return (
    <section id="technology" className="py-16 sm:py-24 bg-[#FAF9F6] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-6 space-y-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">
              {language === 'ky' ? 'Расмий сапат стандарты' : 'Официальный стандарт качества'}
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#242120] leading-tight">
              {language === 'ky'
                ? 'Бишкектеги H. Tokio жана BB One инновациялык технологиялары'
                : 'Инновационные технологии H. Tokio & BB One в Бишкеке'}
            </h2>

            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
              {language === 'ky'
                ? '«Белл» (Aruuke Keratin Studio) студиясында биз өткүр жыты бар арзан курамдардан баш тартканбыз. Биз дүйнөлүк деңгээлдеги Honma Tokyo жана BB One формулалары менен гана иштейбиз.'
                : 'В студии «Белл» (Aruuke Keratin Studio) мы работаем исключительно на сертифицированных составах Honma Tokyo и BB One — мировых эталонах био-реконструкции волос.'}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#EFEAE2] rounded-lg text-[#8C6D58] shrink-0 mt-0.5">
                  <Microscope className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#242120]">
                    {language === 'ky' ? 'Трихоскопиялык акысыз текшерүү' : 'Обязательный тест на эластичность и трихоскопия'}
                  </h4>
                  <p className="text-xs text-[#5C554E]">
                    {language === 'ky'
                      ? 'Процедуранын алдында чачтын 1ден 5ке чейинки бузулуу даражасы аныкталып, ылайыктуу курам гана тандалат.'
                      : 'Перед нанесением состава мастер определяет степень повреждения и подбирает безопасную температуру.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#EFEAE2] rounded-lg text-[#8C6D58] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#242120]">
                    {language === 'ky' ? '0% формальдегид (Органикалык нанопластика)' : '0% формальдегида в органических линейках'}
                  </h4>
                  <p className="text-xs text-[#5C554E]">
                    {language === 'ky'
                      ? 'Көздү ачыштырбайт, жыты жок. Эмчек эмизген энелерге жана өспүрүмдөргө толук коопсуз.'
                      : 'Кислотная нанопластика и ботокс гипоаллергенны, разрешены подросткам и кормящим мамам.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-[#EFEAE2] rounded-lg text-[#8C6D58] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#242120]">
                    {language === 'ky' ? 'Курамды дароо салондо жууп беребиз' : 'Смываем состав сразу в салоне'}
                  </h4>
                  <p className="text-xs text-[#5C554E]">
                    {language === 'ky'
                      ? '3 күн бою жуубай жүрүүнүн кереги жок. Ошол эле жерде жууп, фен менен кургатып так жыйынтыгын көрсөтөбүз!'
                      : 'Вам не нужно ходить 3 дня с составом. Мы смываем его сразу в студии и сушим простым феном.'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E0D8CE] bg-[#F2ECE4] aspect-[4/5]">
              <img
                src={ASSETS.process}
                alt="Процедура реконструкции волос"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-[#E0D8CE] bg-[#F2ECE4] aspect-[4/5] mt-6">
              <img
                src={ASSETS.interior}
                alt="Интерьер студии Белл"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
