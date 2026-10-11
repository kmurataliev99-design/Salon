import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PriceListSection } from './components/PriceListSection';
import { MastersSection } from './components/MastersSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { BrandTechnologySection } from './components/BrandTechnologySection';
import { AcademySection } from './components/AcademySection';
import { ReviewsSection } from './components/ReviewsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { LeaveReviewModal } from './components/LeaveReviewModal';
import { CourseEnrollModal } from './components/CourseEnrollModal';
import { ChatbotWidget } from './components/ChatbotWidget';
import { INITIAL_REVIEWS, ReviewItem, CourseItem, SALON_INFO, Language } from './data/salonData';
import { Calendar, MessageCircle, X, CheckCircle } from 'lucide-react';

export default function App() {
  // Bilingual Language State ('ru' or 'ky')
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const savedLang = localStorage.getItem('bell_salon_language');
      if (savedLang === 'ky' || savedLang === 'ru') return savedLang;
    } catch (e) {
      console.error(e);
    }
    return 'ru';
  });

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('bell_salon_language', newLang);
    } catch (e) {
      console.error(e);
    }
  };

  // Reviews state with localStorage persistence
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    try {
      const saved = localStorage.getItem('bell_salon_reviews_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_REVIEWS;
  });

  // Client's local active appointments list
  const [activeAppointments, setActiveAppointments] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('bell_user_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [bookingMasterId, setBookingMasterId] = useState<string | undefined>(undefined);

  // Review Modal State
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Course Enrollment State
  const [enrolledCourse, setEnrolledCourse] = useState<CourseItem | null>(null);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenBooking = (serviceId?: string, masterId?: string) => {
    setBookingServiceId(serviceId);
    setBookingMasterId(masterId);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newBooking: any) => {
    const updated = [newBooking, ...activeAppointments];
    setActiveAppointments(updated);
    try {
      localStorage.setItem('bell_user_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(
      language === 'ky'
        ? `Жазылуу кабыл алынды! Брон коду: ${newBooking.code}`
        : `Запись подтверждена! Код бронирования: ${newBooking.code}`
    );
  };

  const handleAddReview = (newReview: ReviewItem) => {
    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('bell_salon_reviews_v2', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(
      language === 'ky'
        ? 'Ыраазычылык билдиребиз! Сиздин пикириңиз жарыяланды.'
        : 'Благодарим! Ваш отзыв опубликован на сайте.'
    );
  };

  const cancelAppointment = (code: string) => {
    const updated = activeAppointments.filter((a) => a.code !== code);
    setActiveAppointments(updated);
    try {
      localStorage.setItem('bell_user_appointments', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast(language === 'ky' ? `Жазылуу ${code} жокко чыгарылды.` : `Запись ${code} отменена.`);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#242120] flex flex-col font-sans-clean">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#242120] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-[#4A433D] animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-4 h-4 text-[#8C6D58]" />
          <span className="text-xs font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/60 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Navigation with Language Switcher */}
      <Navbar
        language={language}
        onLanguageChange={handleLanguageChange}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Active User Bookings Banner if any exist */}
      {activeAppointments.length > 0 && (
        <div className="bg-[#EBF3ED] border-b border-[#D2E5D6] py-2.5 px-4 text-xs text-[#265335]">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA055] animate-pulse"></span>
              <span>
                {language === 'ky' ? 'Сизде активдүү жазылуу бар:' : 'У вас активная запись:'}{' '}
                <strong>{activeAppointments[0].service}</strong> ({activeAppointments[0].date} в{' '}
                {activeAppointments[0].time}) — код: {activeAppointments[0].code}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
                  `Здравствуйте! Хочу уточнить запись ${activeAppointments[0].code} на ${activeAppointments[0].date}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-black font-medium"
              >
                {language === 'ky' ? 'Администраторго жазуу' : 'Чат с администратором'}
              </a>
              <button
                onClick={() => cancelAppointment(activeAppointments[0].code)}
                className="text-[#994132] hover:underline"
              >
                {language === 'ky' ? 'Жокко чыгаруу' : 'Отменить'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          language={language}
          onOpenBooking={() => handleOpenBooking()}
        />

        <PriceListSection
          language={language}
          onSelectService={(serviceId) => handleOpenBooking(serviceId)}
          onOpenBooking={() => handleOpenBooking()}
        />

        <MastersSection
          language={language}
          onSelectMaster={(masterId) => handleOpenBooking(undefined, masterId)}
        />

        <BeforeAfterSection
          language={language}
          onOpenBooking={(serviceId) => handleOpenBooking(serviceId)}
        />

        <BrandTechnologySection
          language={language}
        />

        <AcademySection
          language={language}
          onEnrollCourse={(course) => setEnrolledCourse(course)}
        />

        <ReviewsSection
          language={language}
          reviews={reviews}
          onOpenLeaveReview={() => setIsReviewModalOpen(true)}
        />

        <ContactSection
          language={language}
        />
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* AI Chatbot Widget (Gemini-powered in RU & KG) */}
      <ChatbotWidget
        language={language}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Floating Action Controls on Mobile */}
      <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden flex gap-2">
        <a
          href={`https://wa.me/${SALON_INFO.whatsapp}?text=${encodeURIComponent(
            language === 'ky'
              ? 'Саламатсызбы! Байтик баатыр 118 дарегиндеги «Белл» студиясына жазылайын дедим эле'
              : 'Здравствуйте! Хочу записаться в салон красоты Белл'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-semibold py-3 px-3 rounded-xl shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 flex items-center justify-center gap-2 bg-[#242120] text-white text-xs font-semibold py-3 px-3 rounded-xl shadow-lg"
        >
          <Calendar className="w-4 h-4 text-[#E8D8C8]" />
          <span>{language === 'ky' ? 'Онлайн-жазылуу' : 'Онлайн-запись'}</span>
        </button>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        language={language}
        onClose={() => setIsBookingOpen(false)}
        preSelectedServiceId={bookingServiceId}
        preSelectedMasterId={bookingMasterId}
        onBookingSuccess={handleBookingSuccess}
      />

      <LeaveReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleAddReview}
      />

      <CourseEnrollModal
        course={enrolledCourse}
        language={language}
        onClose={() => setEnrolledCourse(null)}
      />

    </div>
  );
}
