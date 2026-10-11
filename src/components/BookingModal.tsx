import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Check, AlertCircle, MessageCircle } from 'lucide-react';
import { SERVICES, MASTERS, SALON_INFO, Language } from '../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  preSelectedServiceId?: string;
  preSelectedMasterId?: string;
  onBookingSuccess: (bookingData: any) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  language,
  onClose,
  preSelectedServiceId,
  preSelectedMasterId,
  onBookingSuccess,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preSelectedServiceId || 'keratin');
  const [selectedMasterId, setSelectedMasterId] = useState<string>(preSelectedMasterId || 'any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('11:00');
  const [hairLength, setHairLength] = useState<string>('medium');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('+996 ');
  const [clientNotes, setClientNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [bookingCode, setBookingCode] = useState<string>('');

  useEffect(() => {
    if (preSelectedServiceId) setSelectedServiceId(preSelectedServiceId);
    if (preSelectedMasterId) setSelectedMasterId(preSelectedMasterId);
  }, [preSelectedServiceId, preSelectedMasterId]);

  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayName = d.toLocaleDateString(language === 'ky' ? 'ky-KG' : 'ru-RU', { weekday: 'short' });
      const dayNum = d.toLocaleDateString(language === 'ky' ? 'ky-KG' : 'ru-RU', { day: 'numeric', month: 'short' });
      const iso = d.toISOString().split('T')[0];
      dates.push({ iso, dayName, dayNum, isToday: i === 0 });
    }
    return dates;
  }, [language]);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].iso);
    }
  }, [availableDates, selectedDate]);

  const timeSlots = ['09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:30'];

  if (!isOpen) return null;

  const currentService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const currentMaster = MASTERS.find((m) => m.id === selectedMasterId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || clientPhone.length < 9) return;

    const code = 'BELL-' + Math.floor(1000 + Math.random() * 9000);
    setBookingCode(code);
    setIsSubmitted(true);

    const bookingPayload = {
      code,
      service: currentService.name,
      price: currentService.priceSom,
      master: currentMaster ? currentMaster.name : (language === 'ky' ? 'Каалаган бош мастер' : 'Любой свободный мастер'),
      date: selectedDate,
      time: selectedTime,
      hairLength,
      clientName,
      clientPhone,
      clientNotes,
      createdAt: new Date().toISOString(),
    };

    onBookingSuccess(bookingPayload);
  };

  const whatsappMessage = encodeURIComponent(
    `Салам! Салон «Белл» (@${SALON_INFO.instagram}):\n` +
    `• Код: ${bookingCode}\n` +
    `• Процедура: ${currentService.name} (${currentService.priceSom} сом)\n` +
    `• Мастер: ${currentMaster ? currentMaster.name : 'Адистер'}\n` +
    `• Дата: ${selectedDate} в ${selectedTime}\n` +
    `• Имя: ${clientName}\n` +
    `• Тел: ${clientPhone}\n` +
    `Адрес: Бишкек, ул. Байтик Баатыра 118`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FAF9F6] w-full max-w-xl rounded-3xl border border-[#E0D8CE] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 bg-[#F5F1EB] border-b border-[#E8E2D8] flex items-center justify-between">
          <div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#242120]">
              {isSubmitted
                ? (language === 'ky' ? 'Жазылуу кабыл алынды' : 'Запись оформлена')
                : (language === 'ky' ? '«Белл» салонуна онлайн жазылуу' : 'Онлайн-запись в салон «Белл»')}
            </h3>
            <p className="text-xs text-[#7A7169] mt-0.5">
              г. Бишкек, ул. Байтик Баатыра 118 · @aruukekeratin_studio
            </p>
          </div>

          <button onClick={onClose} className="p-2 text-[#7A7169] hover:text-[#242120] rounded-full hover:bg-black/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center space-y-5 py-4">
              <div className="w-16 h-16 bg-[#EBF3ED] text-[#4F7E5E] rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif-luxury text-2xl font-bold text-[#242120]">
                  {language === 'ky' ? `Сизди күтөбүз, ${clientName}!` : `Ждем вас, ${clientName}!`}
                </h4>
                <p className="text-xs text-[#5C554E]">
                  {language === 'ky'
                    ? 'Сиздин жазылууңуз электрондук системге ийгиликтүү кошулду.'
                    : 'Ваша запись успешно зарегистрирована в электронной системе салона.'}
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#E0D8CE] text-left text-xs space-y-2.5 shadow-sm max-w-md mx-auto">
                <div className="flex justify-between pb-2 border-b border-[#F0ECE5]">
                  <span className="text-[#7A7169]">{language === 'ky' ? 'Брондоо коду:' : 'Код бронирования:'}</span>
                  <span className="font-mono font-bold text-[#242120]">{bookingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7169]">{language === 'ky' ? 'Процедура:' : 'Процедура:'}</span>
                  <span className="font-semibold text-[#242120]">{currentService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7169]">{language === 'ky' ? 'Баасы:' : 'Стоимость:'}</span>
                  <span className="font-semibold text-[#8C6D58]">{currentService.priceSom} сом</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7169]">{language === 'ky' ? 'Мастер:' : 'Мастер:'}</span>
                  <span className="font-semibold text-[#242120]">
                    {currentMaster ? currentMaster.name : (language === 'ky' ? 'Бош мастер' : 'Свободный специалист')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#7A7169]">{language === 'ky' ? 'Күнү жана убактысы:' : 'Дата и время:'}</span>
                  <span className="font-semibold text-[#242120]">{selectedDate} в {selectedTime}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F0ECE5]">
                  <span className="text-[#7A7169]">{language === 'ky' ? 'Дарек:' : 'Адрес:'}</span>
                  <span className="font-medium text-[#242120]">Бишкек, Байтик Баатыра 118</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>{language === 'ky' ? 'WhatsApp аркылуу ырастоо' : 'Подтвердить в WhatsApp администратору'}</span>
                </a>

                <button onClick={onClose} className="w-full text-xs font-medium text-[#7A7169] hover:text-[#242120] py-2">
                  {language === 'ky' ? 'Терезени жабуу' : 'Закрыть окно'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex items-center justify-between text-xs text-[#7A7169] border-b border-[#E8E2D8] pb-3">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 1 ? 'bg-[#242120] text-white' : 'bg-[#E8E2D8] text-[#5C554E]'}`}>
                    1
                  </span>
                  <span>{language === 'ky' ? 'Кызмат жана мастер' : 'Услуга и мастер'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${step === 2 ? 'bg-[#242120] text-white' : 'bg-[#E8E2D8] text-[#5C554E]'}`}>
                    2
                  </span>
                  <span>{language === 'ky' ? 'Убакыт жана телефон' : 'Дата и контакты'}</span>
                </div>
              </div>

              {step === 1 ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#242120] mb-1.5">
                      {language === 'ky' ? 'Прайс-баракчадан процедураны тандаңыз:' : 'Выберите процедуру из прайс-листа:'}
                    </label>
                    <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                      {SERVICES.map((srv) => (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedServiceId(srv.id)}
                          className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                            selectedServiceId === srv.id
                              ? 'border-[#242120] bg-white shadow-sm ring-1 ring-[#242120]'
                              : 'border-[#DDD5CA] bg-white/60 hover:bg-white'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-[#242120]">{srv.name}</div>
                            <div className="text-[11px] text-[#7A7169]">{srv.duration} · {srv.brand}</div>
                          </div>
                          <span className="font-serif-luxury text-base font-bold text-[#242120]">
                            {srv.priceSom.toLocaleString('ru-RU')} с
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#242120] mb-1.5">
                      {language === 'ky' ? 'Студиянын мастери:' : 'Мастер студии «Белл»:'}
                    </label>
                    <select
                      value={selectedMasterId}
                      onChange={(e) => setSelectedMasterId(e.target.value)}
                      className="w-full text-xs font-medium p-3 rounded-xl border border-[#DDD5CA] bg-white text-[#242120] focus:ring-1 focus:ring-[#242120]"
                    >
                      <option value="any">
                        {language === 'ky' ? 'Каалаган бош мастер' : 'Любой свободный сертифицированный мастер'}
                      </option>
                      {MASTERS.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} — {m.title[language]} ({m.rating}★)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#242120] mb-1.5">
                      {language === 'ky' ? 'Чачыңыздын узундугу:' : 'Длина ваших волос:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'short', label: language === 'ky' ? 'Каре / кыска' : 'До плеч (каре)' },
                        { id: 'medium', label: language === 'ky' ? 'Орточо (далыга)' : 'До лопаток' },
                        { id: 'long', label: language === 'ky' ? 'Узун' : 'Ниже лопаток' },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setHairLength(item.id)}
                          className={`p-2 rounded-lg text-xs font-medium border text-center transition-all ${
                            hairLength === item.id
                              ? 'bg-[#242120] text-white border-[#242120]'
                              : 'bg-white text-[#5C554E] border-[#DDD5CA] hover:bg-[#F5F1EB]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="w-full bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-medium py-3 rounded-xl transition-colors shadow-sm mt-4"
                  >
                    {language === 'ky' ? 'Андан ары: күн жана убакыт' : 'Далее: выбор времени и контакты'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#242120] mb-1.5">
                      {language === 'ky' ? 'Күндү тандаңыз:' : 'Выберите дату визита:'}
                    </label>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {availableDates.map((item) => (
                        <button
                          type="button"
                          key={item.iso}
                          onClick={() => setSelectedDate(item.iso)}
                          className={`p-2.5 rounded-xl border min-w-[70px] text-center transition-all shrink-0 ${
                            selectedDate === item.iso
                              ? 'bg-[#242120] text-white border-[#242120]'
                              : 'bg-white text-[#5C554E] border-[#DDD5CA] hover:bg-[#F5F1EB]'
                          }`}
                        >
                          <div className="text-[10px] uppercase opacity-80">{item.dayName}</div>
                          <div className="text-xs font-bold mt-0.5">{item.dayNum}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#242120] mb-1.5">
                      {language === 'ky' ? 'Убактысы:' : 'Удобное время:'}
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          type="button"
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`py-2 rounded-lg text-xs font-medium border text-center transition-all ${
                            selectedTime === time
                              ? 'bg-[#242120] text-white border-[#242120]'
                              : 'bg-white text-[#5C554E] border-[#DDD5CA] hover:bg-[#F5F1EB]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#242120] mb-1">
                        {language === 'ky' ? 'Атыңыз:' : 'Ваше имя:'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={language === 'ky' ? 'Мисалы, Айгүл' : 'Например, Айгуль'}
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
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
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full text-xs p-3 rounded-xl border border-[#DDD5CA] bg-white text-[#242120] focus:ring-1 focus:ring-[#242120]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 bg-white hover:bg-[#F5F1EB] text-[#242120] text-xs font-medium py-3 rounded-xl border border-[#DDD5CA]"
                    >
                      {language === 'ky' ? 'Артка' : 'Назад'}
                    </button>
                    <button
                      type="submit"
                      className="w-2/3 bg-[#242120] hover:bg-[#3D3734] text-white text-xs font-semibold py-3 rounded-xl shadow-sm"
                    >
                      {language === 'ky' ? 'Жазылууну аяктоо' : 'Завершить запись'}
                    </button>
                  </div>

                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
