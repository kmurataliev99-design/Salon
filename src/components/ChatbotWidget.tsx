import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, RefreshCw, MessageCircle } from 'lucide-react';
import { Language, SALON_INFO } from '../data/salonData';
import { UI_TRANSLATIONS } from '../data/translations';
import { getExpertAnswer } from '../data/expertBot';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  time: string;
}

interface ChatbotWidgetProps {
  language: Language;
  onOpenBooking: () => void;
}

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ language, onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const t = UI_TRANSLATIONS.chatbot;

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'msg-initial',
        role: 'model',
        content: t.greeting[language],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'model') {
      setMessages([
        {
          id: 'msg-initial',
          role: 'model',
          content: t.greeting[language],
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  }, [language]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');

    // Check fast-path expert rule first for 100% concrete, immediate response
    const immediateAnswer = getExpertAnswer(query, language);
    if (immediateAnswer) {
      setIsLoading(true);
      // Natural slight delay for human-like reading
      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: 'msg-' + Date.now() + '-bot',
          role: 'model',
          content: immediateAnswer,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 350);
      return;
    }

    // Otherwise call Gemini API backend endpoint
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          userLanguage: language,
        }),
      });

      if (!response.ok) {
        throw new Error('Server error');
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: 'msg-' + Date.now() + '-bot',
        role: 'model',
        content: data.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      const fallbackReply =
        language === 'ky'
          ? 'Биздин дарек: Байтик баатыр 118. Прайс: Ботокс 4000 с, Кератин 5000 с. Администраторго түз байланышуу үчүн WhatsApp: +996 (555) 12-34-56.'
          : 'Студия «Белл» находится на ул. Байтик Баатыра 118. Прайс: Ботокс 4000 с, Кератин 5000 с, Нанопластика 5500 с. Консультация в WhatsApp: +996 (555) 12-34-56.';

      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-' + Date.now() + '-err',
          role: 'model',
          content: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2.5 bg-[#242120] hover:bg-[#3D3734] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border border-[#8C6D58]/40 group"
            aria-label="Открыть онлайн-консультант"
          >
            <div className="relative">
              <Bot className="w-5 h-5 text-[#E8D8C8]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#4F7E5E] rounded-full border-2 border-[#242120]"></span>
            </div>
            <span className="text-xs font-semibold pr-1">
              {language === 'ky' ? 'ИИ Кеңешчи' : 'ИИ Консультант'}
            </span>
          </button>
        )}
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-[400px] h-[540px] max-h-[82vh] bg-[#FAF9F6] rounded-3xl border border-[#E0D8CE] shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="px-5 py-4 bg-[#242120] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#3D3734] flex items-center justify-center border border-[#8C6D58]/50">
                <Bot className="w-5 h-5 text-[#E8D8C8]" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wide flex items-center gap-1.5 text-white">
                  <span>{t.title[language]}</span>
                  <span className="w-2 h-2 rounded-full bg-[#4F7E5E]"></span>
                </h4>
                <p className="text-[10px] text-[#C2B7AC]">
                  @aruukekeratin_studio · Бишкек
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-[#C2B7AC] hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Закрыть чат"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#FAF9F6]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-6 h-6 rounded-full bg-[#EAE2D8] flex items-center justify-center shrink-0 mt-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#8C6D58]" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#242120] text-white rounded-br-none'
                      : 'bg-white text-[#242120] border border-[#E0D8CE] rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-line text-xs font-sans-clean">{msg.content}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.role === 'user' ? 'text-white/60' : 'text-[#7A7169]'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-xs text-[#7A7169] pl-8">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8C6D58]" />
                <span>{language === 'ky' ? 'Жооп даярдалууда...' : 'Консультант печатает...'}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ suggestions */}
          <div className="px-3 py-2 bg-[#F2ECE4] border-t border-[#E8E2D8] flex gap-1.5 overflow-x-auto no-scrollbar">
            {t.quickQuestions[language].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(q)}
                className="shrink-0 text-[10px] bg-white hover:bg-[#EAE2D8] text-[#242120] px-2.5 py-1 rounded-full border border-[#DDD5CA] transition-colors"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input field */}
          <div className="p-3 bg-white border-t border-[#E0D8CE]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.placeholder[language]}
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#DDD5CA] bg-[#FAF9F6] text-[#242120] focus:outline-none focus:ring-1 focus:ring-[#242120]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-[#242120] hover:bg-[#3D3734] disabled:opacity-40 text-white rounded-xl transition-colors shrink-0"
              >
                <Send className="w-4 h-4 text-[#E8D8C8]" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#7A7169] mt-2 px-1">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="text-[#8C6D58] hover:underline font-semibold"
              >
                {language === 'ky' ? 'Онлайн жазылуу' : 'Записаться онлайн'}
              </button>
              <a
                href={`https://wa.me/${SALON_INFO.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4F7E5E] hover:underline flex items-center gap-1 font-medium"
              >
                <MessageCircle className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
