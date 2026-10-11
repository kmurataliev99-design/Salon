import React from 'react';
import { Sparkles, ShieldCheck, Clock, HeartHandshake, ArrowRight, MapPin, Instagram } from 'lucide-react';
import { ASSETS } from '../data/assets';
import { SALON_INFO, Language } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';

interface HeroProps {
  language: Language;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onOpenBooking }) => {
  const t = UI_TRANSLATIONS.hero;

  return (
    <section className="relative overflow-hidden bg-[#FAF9F6] border-b border-[#E8E2D8] pt-8 pb-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Context */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Location & Instagram badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#7A7169] tracking-wide font-medium">
              <span className="flex items-center gap-1 text-[#8C6D58]">
                <MapPin className="w-3.5 h-3.5" />
                {t.location[language]}
              </span>
              <span aria-hidden="true">·</span>
              <a
                href={SALON_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#242120] font-semibold hover:text-[#8C6D58] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#8C6D58]" />
                <span>@{SALON_INFO.instagram}</span>
              </a>
              <span aria-hidden="true">·</span>
              <span className="text-[#8C6D58] font-medium">H. Tokio & BB One</span>
            </div>

            {/* Display Headline */}
            <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#242120] leading-[1.1] max-w-2xl">
              {t.title[language]}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5C554E] max-w-xl leading-relaxed">
              {t.subtitle[language]}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="flex items-center gap-2 bg-[#242120] hover:bg-[#3D3734] text-[#FAF9F6] px-6 py-3.5 rounded-lg text-sm font-medium transition-all shadow-md hover:translate-y-[-1px]"
              >
                <span>{t.btnBook[language]}</span>
                <ArrowRight className="w-4 h-4 text-[#E8D8C8]" />
              </button>

              <a
                href="#pricing"
                className="flex items-center gap-2 bg-[#F2ECE4] hover:bg-[#EAE2D8] text-[#242120] px-5 py-3.5 rounded-lg text-sm font-medium transition-colors border border-[#DDD5CA]"
              >
                <span>{t.btnPrice[language]}</span>
              </a>
            </div>

            {/* 4 Pillars directly from price photo */}
            <div className="pt-6 border-t border-[#E8E2D8] grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242120]">
                  <Sparkles className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t.pillar1[language]}</span>
                </div>
                <p className="text-[12px] text-[#7A7169]">{t.pillar1Sub[language]}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242120]">
                  <ShieldCheck className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t.pillar2[language]}</span>
                </div>
                <p className="text-[12px] text-[#7A7169]">{t.pillar2Sub[language]}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242120]">
                  <Clock className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t.pillar3[language]}</span>
                </div>
                <p className="text-[12px] text-[#7A7169]">{t.pillar3Sub[language]}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#242120]">
                  <HeartHandshake className="w-4 h-4 text-[#8C6D58]" />
                  <span>{t.pillar4[language]}</span>
                </div>
                <p className="text-[12px] text-[#7A7169]">{t.pillar4Sub[language]}</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D8] bg-[#F2ECE4] aspect-[4/5] sm:aspect-[16/14] lg:aspect-[4/5]">
              <img
                src={ASSETS.hero}
                alt="Кератин жана ботокс Бишкек - салон Белл"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/50 shadow-lg">
                <div className="flex items-center justify-between text-xs text-[#5C554E] mb-1">
                  <span className="font-semibold text-[#242120]">
                    {language === 'ky' ? '«Белл» сулуулук салону' : 'Салон красоты «Белл»'}
                  </span>
                  <span className="text-[#8C6D58] font-medium">@aruukekeratin_studio</span>
                </div>
                <p className="text-[11px] text-[#7A7169]">
                  {language === 'ky'
                    ? 'Бишкек ш., Байтик баатыр 118. Түпнуска H. Tokio жана BB One курамдары. Окутуу жана премиум кызматтар.'
                    : 'Бишкек, ул. Байтик Баатыра 118. Официальные составы H. Tokio и BB One в Кыргызстане.'}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
