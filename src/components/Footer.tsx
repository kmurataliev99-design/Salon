import React, { useState } from 'react';
import { SALON_INFO, Language } from '../data/salonData';
import { Instagram } from 'lucide-react';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  return (
    <footer className="bg-[#242120] text-[#D8D2C9] py-12 border-t border-[#3D3734]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#3D3734]">
          
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif-luxury text-2xl font-bold tracking-wider text-white">
              БЕЛЛ
            </span>
            <p className="text-xs text-[#A8A096]">
              {language === 'ky'
                ? 'Бишкектеги чачты калыбына келтирүү студиясы жана окутуу борбору'
                : 'Студия реконструкции волос и обучающий центр H. Tokio & BB One в Кыргызстане'}
            </p>
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#E8D8C8] hover:text-white pt-1"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram: @{SALON_INFO.instagram}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#D8D2C9]">
            <a href="#pricing" className="hover:text-white transition-colors">{language === 'ky' ? 'Прайс' : 'Прайс-лист'}</a>
            <a href="#masters" className="hover:text-white transition-colors">{language === 'ky' ? 'Мастерлер' : 'Мастера'}</a>
            <a href="#portfolio" className="hover:text-white transition-colors">{language === 'ky' ? 'Портфолио' : 'Портфолио'}</a>
            <a href="#technology" className="hover:text-white transition-colors">H. Tokio & BB One</a>
            <a href="#academy" className="hover:text-white transition-colors">{language === 'ky' ? 'Окутуу' : 'Обучение'}</a>
            <a href="#reviews" className="hover:text-white transition-colors">{language === 'ky' ? 'Пикирлер' : 'Отзывы'}</a>
            <a href="#contacts" className="hover:text-white transition-colors">{language === 'ky' ? 'Байланыш' : 'Контакты'}</a>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C847A] gap-4">
          <div>
            г. Бишкек, {SALON_INFO.address} (2GIS / Google / Apple Maps)
          </div>
          <div>
            © {new Date().getFullYear()} Салон красоты «Белл» (@{SALON_INFO.instagram}).
          </div>
        </div>
      </div>
    </footer>
  );
};
