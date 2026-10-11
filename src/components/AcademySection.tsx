import React from 'react';
import { GraduationCap, Award, BookOpen, Users, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';
import { COURSES, CourseItem, SALON_INFO, Language } from '../data/salonData';
import { ASSETS } from '../data/assets';

interface AcademySectionProps {
  language: Language;
  onEnrollCourse: (course: CourseItem) => void;
}

export const AcademySection: React.FC<AcademySectionProps> = ({ language, onEnrollCourse }) => {
  return (
    <section id="academy" className="py-16 sm:py-24 bg-[#F5F1EB] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8C6D58]">
              <GraduationCap className="w-4 h-4" />
              <span>
                {language === 'ky' ? '«Белл» чач реконструкциялоо академиясы' : 'Академия реконструкции волос «Белл»'}
              </span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-medium text-[#242120] leading-tight">
              {language === 'ky'
                ? 'Нөлдөн баштап окутуу жана квалификацияны жогорулатуу'
                : 'Обучение мастеров с нуля и повышение квалификации'}
            </h2>

            <p className="text-sm sm:text-base text-[#5C554E] leading-relaxed">
              {language === 'ky'
                ? 'Бьюти-тармактагы эң кирешелүү кесипти Аруукенин жеке көзөмөлүндө өздөштүрүңүз. 90% жеке моделдер менен практика, сертификат жана чексиз колдоо.'
                : 'Освойте востребованную профессию в beauty-индустрии Кыргызстана под наставничеством основателя Арууке. 90% практики на моделях, сертификат и бессрочная поддержка.'}
            </p>

            <div className="flex flex-wrap gap-3 text-xs text-[#242120] font-medium pt-2">
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#DDD5CA]">
                <Award className="w-3.5 h-3.5 text-[#8C6D58]" />
                {language === 'ky' ? 'Эки тилдүү сертификат' : 'Двуязычный именной сертификат'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#DDD5CA]">
                <Users className="w-3.5 h-3.5 text-[#8C6D58]" />
                {language === 'ky' ? 'Ар бир окуучуга жеке моделдер' : 'Персональные модели для учеников'}
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-[#DDD5CA]">
                <BookOpen className="w-3.5 h-3.5 text-[#8C6D58]" />
                {language === 'ky' ? 'Старттык топтом белекке' : 'Стартовый бокс мастера в подарок'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-[#DDD5CA] bg-white aspect-[16/10]">
              <img
                src={ASSETS.academy}
                alt="Обучение мастеров кератина Бишкек"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Courses Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl p-7 border border-[#E0D8CE] shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-[#F0ECE5]">
                  <span className="text-[#8C6D58] font-semibold tracking-wide">{course.level[language]}</span>
                  <span className="text-[#7A7169]">{course.duration[language]}</span>
                </div>

                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#242120] group-hover:text-[#8C6D58] transition-colors">
                    {course.title[language]}
                  </h3>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="font-serif-luxury text-3xl font-bold text-[#242120] tabular-nums">
                      {course.priceSom.toLocaleString('ru-RU')}
                    </span>
                    <span className="text-lg font-medium text-[#242120]">сом</span>
                  </div>
                </div>

                <p className="text-xs text-[#5C554E] leading-relaxed">
                  {course.description[language]}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#F0ECE5]">
                  <div className="text-xs font-semibold text-[#242120]">
                    {language === 'ky' ? 'Курстун программасы:' : 'В программе курса:'}
                  </div>
                  {course.syllabus[language].slice(0, 4).map((s, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#5C554E]">
                      <CheckCircle className="w-3.5 h-3.5 text-[#54805A] shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8E2D8] text-[11px] text-[#4A433D] space-y-1">
                  <div className="font-semibold text-[#242120]">
                    {language === 'ky' ? 'Баасына эмне кирет:' : 'Что входит в стоимость:'}
                  </div>
                  <p>
                    {language === 'ky'
                      ? `${course.modelsCount} модель менен практика · Сертификат`
                      : `Отработка на ${course.modelsCount} моделях · Сертификат`}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#F0ECE5] flex flex-col gap-2">
                <button
                  onClick={() => onEnrollCourse(course)}
                  className="w-full flex items-center justify-center gap-2 bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-medium py-3 rounded-xl transition-colors shadow-sm"
                >
                  <span>{language === 'ky' ? 'Курска жазылуу' : 'Записаться на курс'}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E8D8C8]" />
                </button>

                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
                    language === 'ky'
                      ? `Саламатсызбы! Аруукенин "${course.title.ky}" курсу боюнча маалымат алгым келет`
                      : `Здравствуйте! Интересует курс "${course.title.ru}". Расскажите подробнее`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 text-[#4F7E5E] hover:text-[#265335] text-xs font-medium py-2 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
