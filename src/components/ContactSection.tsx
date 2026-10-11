import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, Copy, Check, Navigation, ExternalLink, Compass } from 'lucide-react';
import { SALON_INFO, Language } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [copied, setCopied] = useState(false);
  const t = UI_TRANSLATIONS.contacts;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`г. Бишкек, ${SALON_INFO.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contacts" className="py-16 sm:py-24 bg-[#F5F1EB] border-b border-[#E8E2D8]">
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

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D8CE] shadow-sm space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8C6D58] uppercase">
                  <MapPin className="w-4 h-4" />
                  <span>{language === 'ky' ? 'Так дареги' : 'Точный адрес'}</span>
                </div>
                <button
                  onClick={handleCopyAddress}
                  className="flex items-center gap-1 text-[11px] text-[#7A7169] hover:text-[#242120] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8E2D8] transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#54805A]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? t.copied[language] : t.copyBtn[language]}</span>
                </button>
              </div>

              <div>
                <div className="font-serif-luxury text-2xl font-bold text-[#242120]">
                  г. Бишкек, {SALON_INFO.address}
                </div>
                <div className="text-xs text-[#7A7169] mt-1">
                  {SALON_INFO.landmark[language]}
                </div>
              </div>

              {/* 3 Map Buttons: 2GIS, Google Maps, Apple Maps */}
              <div className="pt-2 border-t border-[#F0ECE5] space-y-2">
                <div className="text-xs font-semibold text-[#242120]">
                  {language === 'ky' ? 'Навигаторлор аркылуу ачуу:' : 'Открыть в навигаторах:'}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {/* 2GIS Button */}
                  <a
                    href={SALON_INFO.mapLinks.twoGis}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 bg-[#F2F7F2] hover:bg-[#E3EFE3] text-[#245C33] rounded-xl border border-[#CDE3D2] transition-colors text-center group"
                    title="Открыть в 2GIS"
                  >
                    <Navigation className="w-4 h-4 mb-1 text-[#2EA246] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">2GIS</span>
                    <span className="text-[10px] text-[#55825E]">2Гис карта</span>
                  </a>

                  {/* Google Maps Button */}
                  <a
                    href={SALON_INFO.mapLinks.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 bg-[#EFF4FA] hover:bg-[#DFEAF7] text-[#2A5298] rounded-xl border border-[#CCE0F5] transition-colors text-center group"
                    title="Открыть в Google Maps"
                  >
                    <ExternalLink className="w-4 h-4 mb-1 text-[#4285F4] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Google</span>
                    <span className="text-[10px] text-[#6080A8]">Гугл карта</span>
                  </a>

                  {/* Apple Maps Button */}
                  <a
                    href={SALON_INFO.mapLinks.appleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2.5 bg-[#F7F7F8] hover:bg-[#EBEBEF] text-[#242120] rounded-xl border border-[#DDDDE5] transition-colors text-center group"
                    title="Открыть в Apple Maps"
                  >
                    <Compass className="w-4 h-4 mb-1 text-[#555] group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-bold">Apple</span>
                    <span className="text-[10px] text-[#7A7A85]">Эппл карта</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Hours & Phone Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E0D8CE] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-[#F5F1EB] rounded-xl text-[#8C6D58]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#7A7169]">{t.hours[language]}</div>
                  <div className="text-sm font-bold text-[#242120]">{SALON_INFO.workingHours[language]}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#F0ECE5]">
                <div className="p-2.5 bg-[#F5F1EB] rounded-xl text-[#8C6D58]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-[#7A7169]">{t.phone[language]}</div>
                  <a
                    href={`tel:${SALON_INFO.phoneRaw}`}
                    className="text-sm font-bold text-[#242120] hover:text-[#8C6D58] transition-colors"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
                    language === 'ky'
                      ? 'Саламатсызбы! Байтик баатыр 118 дарегиндеги «Белл» салонуна жазылайын дедим эле'
                      : 'Здравствуйте! Хочу уточнить детали проезда в салон Белл на Байтик Баатыра 118'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.whatsappBtn[language]}</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Location Map Showcase with 3 quick links */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E0D8CE] shadow-sm overflow-hidden flex flex-col">
            <div className="p-4 bg-[#F8F5EF] border-b border-[#E8E2D8] flex items-center justify-between text-xs text-[#5C554E]">
              <span className="font-semibold text-[#242120]">
                {language === 'ky' ? 'Бишкектин картасында' : 'Локация на карте Бишкека'}
              </span>
              <span>Бишкек · Байтик Баатыра 118</span>
            </div>

            {/* Stylized Map Viewport */}
            <div className="relative flex-1 min-h-[340px] bg-[#E8E5DF] flex items-center justify-center p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#8C6D58_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Central Map Pin Marker Card */}
              <div className="relative z-10 bg-white p-6 rounded-2xl border border-[#D5CDC2] shadow-xl text-center max-w-sm space-y-3">
                <div className="w-12 h-12 bg-[#242120] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <MapPin className="w-6 h-6 text-[#E8D8C8]" />
                </div>
                <h4 className="font-serif-luxury text-xl font-bold text-[#242120]">
                  Салон красоты «Белл»
                </h4>
                <p className="text-xs text-[#5C554E]">
                  Бишкек, ул. Байтик Баатыра 118 (Aruuke Keratin Studio)
                </p>
                <div className="text-[11px] text-[#4F7E5E] font-semibold">
                  {language === 'ky' ? 'Кардарлар үчүн акысыз унаа токтотуучу жай' : 'Бесплатная парковка для гостей студии'}
                </div>
                
                {/* 3 Direct Navigation Buttons */}
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <a
                    href={SALON_INFO.mapLinks.twoGis}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#2EA246] hover:bg-[#258B3B] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>2GIS</span>
                  </a>

                  <a
                    href={SALON_INFO.mapLinks.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Google Maps</span>
                  </a>

                  <a
                    href={SALON_INFO.mapLinks.appleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
                  >
                    <span>Apple Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
