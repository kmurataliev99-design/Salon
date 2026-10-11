import React, { useState } from 'react';
import { Calendar, Menu, X, MessageCircle, Globe, Instagram } from 'lucide-react';
import { SALON_INFO, Language } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenBooking: (serviceId?: string, masterId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ language, onLanguageChange, onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TRANSLATIONS.nav;

  const navLinks = [
    { label: t.pricing[language], href: '#pricing' },
    { label: t.masters[language], href: '#masters' },
    { label: t.portfolio[language], href: '#portfolio' },
    { label: t.technology[language], href: '#technology' },
    { label: t.academy[language], href: '#academy' },
    { label: t.reviews[language], href: '#reviews' },
    { label: t.contacts[language], href: '#contacts' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Wordmark & Studio link */}
          <div className="flex items-baseline gap-3">
            <a href="#" className="font-serif-luxury text-2xl sm:text-3xl font-bold tracking-wider text-[#242120] hover:text-[#8C6D58] transition-colors">
              БЕЛЛ
            </a>
            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#8C6D58] hover:text-[#242120] font-medium"
            >
              <Instagram className="w-3 h-3" />
              <span>@aruukekeratin_studio</span>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-[#5C554E]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#242120] transition-colors relative py-1 hover:underline underline-offset-4 decoration-[#8C6D58]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Switcher Button Group */}
            <div className="flex items-center bg-[#EFEAE2] p-1 rounded-lg border border-[#DDD5CA]">
              <button
                type="button"
                onClick={() => onLanguageChange('ru')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'ru'
                    ? 'bg-[#242120] text-white shadow-sm'
                    : 'text-[#5C554E] hover:text-[#242120]'
                }`}
                title="Русский язык"
              >
                RU
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ky')}
                className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                  language === 'ky'
                    ? 'bg-[#242120] text-white shadow-sm'
                    : 'text-[#5C554E] hover:text-[#242120]'
                }`}
                title="Кыргыз тили"
              >
                KG
              </button>
            </div>

            {/* WhatsApp Contact */}
            <a
              href={`https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
                language === 'ky'
                  ? 'Саламатсызбы! Байтик баатыр 118 дарегиндеги «Белл» студиясы боюнча маалымат алгым келет'
                  : 'Здравствуйте! Хочу проконсультироваться по процедурам для волос в салоне Белл'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-xs text-[#2E5E3B] bg-[#EBF3ED] hover:bg-[#DCEADA] px-3 py-2 rounded-lg transition-colors font-medium"
              title="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Online Booking Button */}
            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-1.5 sm:gap-2 bg-[#242120] hover:bg-[#3D3734] text-[#FAF9F6] text-xs sm:text-sm font-medium px-3.5 sm:px-5 py-2.5 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#E8D8C8]" />
              <span>{t.onlineBooking[language]}</span>
            </button>

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#242120] hover:text-[#8C6D58] rounded-lg"
              aria-label="Меню"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF9F6] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-[#4A433D] hover:text-[#242120] hover:bg-[#F2ECE4] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
            <div className="flex items-center justify-between px-3 text-xs text-[#7A7169]">
              <span>Тил / Язык:</span>
              <div className="flex gap-1">
                <button
                  onClick={() => onLanguageChange('ru')}
                  className={`px-2 py-1 rounded text-xs font-bold ${language === 'ru' ? 'bg-[#242120] text-white' : 'bg-[#EAE2D8]'}`}
                >
                  Русский
                </button>
                <button
                  onClick={() => onLanguageChange('ky')}
                  className={`px-2 py-1 rounded text-xs font-bold ${language === 'ky' ? 'bg-[#242120] text-white' : 'bg-[#EAE2D8]'}`}
                >
                  Кыргызча
                </button>
              </div>
            </div>

            <a
              href={SALON_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-[#8C6D58] bg-[#F5EFE6] py-2 rounded-lg font-medium"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram: @aruukekeratin_studio</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
