import React, { useState } from 'react';
import { X, CheckCircle, GraduationCap, Phone, MessageCircle } from 'lucide-react';
import { CourseItem, SALON_INFO, Language } from '../data/salonData';

interface CourseEnrollModalProps {
  course: CourseItem | null;
  language: Language;
  onClose: () => void;
}

export const CourseEnrollModal: React.FC<CourseEnrollModalProps> = ({
  course,
  language,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+996 ');
  const [experience, setExperience] = useState('С нуля (нет опыта)');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || phone.length < 9) return;
    setIsSuccess(true);
  };

  const courseTitle = course.title[language];
  const courseDuration = course.duration[language];

  const whatsappEnrollMessage = encodeURIComponent(
    `Салам! Мен Академия Белл окуусуна жазылайын дедим эле (@${SALON_INFO.instagram}):\n` +
    `• Курс: ${courseTitle}\n` +
    `• Баасы: ${course.priceSom} сом\n` +
    `• Аты: ${name}\n` +
    `• Тел: ${phone}\n` +
    `• Тажрыйба: ${experience}\n` +
    `Жакынкы бош күндөрдү айтып бериңизчи!`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FAF9F6] w-full max-w-lg rounded-3xl border border-[#E0D8CE] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#F5F1EB] border-b border-[#E8E2D8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-lg border border-[#DDD5CA] text-[#8C6D58]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-luxury text-xl font-bold text-[#242120]">
                {language === 'ky' ? 'Курска жазылуу' : 'Запись на курс'}
              </h3>
              <p className="text-xs text-[#7A7169]">
                Академия «Белл» (@{SALON_INFO.instagram})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A7169] hover:text-[#242120] rounded-full hover:bg-black/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-[#EBF3ED] text-[#4F7E5E] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-bold text-[#242120]">
                {language === 'ky' ? 'Өтүнмө кабыл алынды!' : 'Заявка принята!'}
              </h4>
              <p className="text-xs text-[#5C554E] max-w-sm mx-auto">
                {language === 'ky'
                  ? 'Куратор же топ-технолог Арууке жакынкы убакытта сиз менен байланышат.'
                  : 'Главный технолог или куратор свяжется с вами в течение 30 минут для бронирования места.'}
              </p>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}?text=${whatsappEnrollMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'ky' ? 'WhatsApp аркылуу тактоо' : 'Уточнить график группы в WhatsApp'}</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="bg-white p-3.5 rounded-xl border border-[#E8E2D8] text-xs space-y-1">
                <span className="font-bold text-[#242120] block">{courseTitle}</span>
                <div className="flex justify-between text-[#7A7169]">
                  <span>{language === 'ky' ? 'Мөөнөтү:' : 'Длительность:'} {courseDuration}</span>
                  <span className="font-bold text-[#8C6D58]">{course.priceSom.toLocaleString('ru-RU')} сом</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242120] mb-1">
                  {language === 'ky' ? 'Атыңыз:' : 'Ваше имя:'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'ky' ? 'Аты-жөнүңүз' : 'Как к вам обращаться'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#DDD5CA] bg-white text-[#242120] focus:ring-1 focus:ring-[#242120]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242120] mb-1">
                  {language === 'ky' ? 'Телефон номериңиз (WhatsApp):' : 'Номер телефона (WhatsApp):'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+996 (___) __-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#DDD5CA] bg-white text-[#242120] focus:ring-1 focus:ring-[#242120]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#242120] mb-1">
                  {language === 'ky' ? 'Бьюти-чөйрөдөгү тажрыйбаңыз:' : 'Ваш текущий опыт в бьюти-сфере:'}
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-[#DDD5CA] bg-white text-[#242120]"
                >
                  <option value="С нуля (нет опыта)">
                    {language === 'ky' ? 'Нөлдөн баштап (тажрыйба жок)' : 'С нуля (хочу освоить новую профессию)'}
                  </option>
                  <option value="Парикмахер / колорист">
                    {language === 'ky' ? 'Чач тарач / колорист' : 'Парикмахер / колорист со стажем'}
                  </option>
                  <option value="Мастер по кератину до 1 года">
                    {language === 'ky' ? 'Кератин мастери (1 жылга чейин)' : 'Мастер по кератину (до 1 года)'}
                  </option>
                  <option value="Опытный мастер (повышение)">
                    {language === 'ky' ? 'Тажрыйбалуу мастер (квалификацияны жогорулатуу)' : 'Опытный мастер (нужны сложные техники)'}
                  </option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-semibold py-3 rounded-xl transition-colors shadow-sm"
                >
                  {language === 'ky' ? 'Орун ээлөө' : 'Забронировать место на курсе'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
