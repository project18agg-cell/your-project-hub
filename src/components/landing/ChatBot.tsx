import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, ChevronRight, Bot, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

type Message = {
  id: number;
  from: 'bot' | 'user';
  text: string;
  options?: string[];
  form?: string;
};

type FormState = {
  name: string;
  phone: string;
  email: string;
  business_name: string;
  city: string;
  message: string;
};

const SESSION_KEY = 'upcurv_chat_session';
const SESSION_TTL = 10 * 60 * 1000;

const INITIAL_MESSAGE: Message = {
  id: 0, from: 'bot',
  text: "👋 Hi! I'm the Upcurv Assistant. How can I help you today?",
  options: ['📱 Product Demo', '❓ Product Enquiry', '🏙️ City Franchise', '🎫 Support Ticket', '📝 Complaint', '⚠️ Grievance', '🔧 Technical Support', '💬 Just browsing'],
};

const FLOWS: Record<string, Message[]> = {
  '📱 Product Demo': [{ id: 1, from: 'bot', text: 'Which product are you interested in?', options: ['🚗 Vahanhub', '🛒 Upcurv Ecom', '🏪 Upcurv Retail'] }],
  '🚗 Vahanhub': [{ id: 2, from: 'bot', text: "Vahanhub helps dealers manage inventory, leads & marketplace. Fill in your details for a free demo.", form: 'demo' }],
  '🛒 Upcurv Ecom': [{ id: 3, from: 'bot', text: "Launch a branded online store in minutes. Fill in your details!", form: 'demo' }],
  '🏪 Upcurv Retail': [{ id: 4, from: 'bot', text: "Complete retail billing & management system. Let's schedule your demo!", form: 'demo' }],
  '❓ Product Enquiry': [{ id: 10, from: 'bot', text: 'Which product would you like to know more about?', options: ['🚗 Vahanhub Enquiry', '🛒 Ecom Enquiry', '🏪 Retail Enquiry'] }],
  '🚗 Vahanhub Enquiry': [{ id: 11, from: 'bot', text: "Tell us what you'd like to know about Vahanhub:", form: 'enquiry' }],
  '🛒 Ecom Enquiry': [{ id: 12, from: 'bot', text: "Tell us what you'd like to know about Upcurv Ecom:", form: 'enquiry' }],
  '🏪 Retail Enquiry': [{ id: 13, from: 'bot', text: "Tell us what you'd like to know about Upcurv Retail:", form: 'enquiry' }],
  '🏙️ City Franchise': [{ id: 5, from: 'bot', text: "🔥 India's first SaaS City Franchise model. Tell us about yourself:", form: 'franchise' }],
  '🎫 Support Ticket': [{ id: 6, from: 'bot', text: "Describe your issue and we'll create a support ticket:", form: 'support' }],
  '📝 Complaint': [{ id: 20, from: 'bot', text: "We're sorry to hear that. Please describe your complaint:", form: 'complaint' }],
  '⚠️ Grievance': [{ id: 21, from: 'bot', text: "We take grievances seriously. Please share the details:", form: 'grievance' }],
  '🔧 Technical Support': [{ id: 22, from: 'bot', text: "Please describe the technical issue you're facing:", form: 'technical_support' }],
  '💬 Just browsing': [{ id: 7, from: 'bot', text: "No problem! Explore our products:\n• /vahanhub – Dealer Management\n• /upcurv-ecom – E-Commerce\n• /upcurv-retail – Retail POS", options: ['📱 Product Demo', '❓ Product Enquiry', '🏙️ City Franchise'] }],
};

const PRODUCT_MAP: Record<string, string> = {
  '🚗 Vahanhub': 'vahanhub', '🛒 Upcurv Ecom': 'upcurv_ecom', '🏪 Upcurv Retail': 'upcurv_retail',
  '🚗 Vahanhub Enquiry': 'vahanhub', '🛒 Ecom Enquiry': 'upcurv_ecom', '🏪 Retail Enquiry': 'upcurv_retail',
};

const emptyForm = (): FormState => ({ name: '', phone: '', email: '', business_name: '', city: '', message: '' });

const loadSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() - data.timestamp > SESSION_TTL) { sessionStorage.removeItem(SESSION_KEY); return null; }
    return data;
  } catch { return null; }
};

const saveSession = (messages: Message[], product: string) => {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ messages, product, timestamp: Date.now() }));
};

export const ChatBot = () => {
  const session = loadSession();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(session?.messages || [INITIAL_MESSAGE]);
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm());
  const [selectedProduct, setSelectedProduct] = useState(session?.product || '');
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  useEffect(() => { saveSession(messages, selectedProduct); }, [messages, selectedProduct]);

  const addMessage = (msg: Omit<Message, 'id'>) => {
    setMessages(prev => [...prev, { ...msg, id: Date.now() + Math.random() }]);
  };

  const handleOption = (option: string) => {
    addMessage({ from: 'user', text: option });
    if (option in PRODUCT_MAP) setSelectedProduct(PRODUCT_MAP[option]);
    setTimeout(() => {
      const flow = FLOWS[option];
      if (flow) {
        flow.forEach((msg, i) => setTimeout(() => {
          addMessage(msg);
          if (msg.form) setActiveForm(msg.form);
        }, i * 300));
      } else {
        addMessage({ from: 'bot', text: "Let me help you with that:", options: INITIAL_MESSAGE.options });
      }
    }, 400);
  };

  const submitForm = async (type: string) => {
    if (!form.name || !form.phone) { toast.error('Name and phone are required'); return; }
    setLoading(true);
    let error;

    if (type === 'franchise') {
      if (!form.city) { toast.error('City is required'); setLoading(false); return; }
      ({ error } = await supabase.from('franchise_applications').insert({
        name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || null,
        city: form.city.trim(), message: form.message.trim() || null,
      }));
    } else if (['support', 'complaint', 'grievance', 'technical_support'].includes(type)) {
      if (!form.message) { toast.error('Please describe your issue'); setLoading(false); return; }
      const titlePrefix: Record<string, string> = { support: 'Support', complaint: 'Complaint', grievance: 'Grievance', technical_support: 'Tech Support' };
      ({ error } = await supabase.from('tickets').insert({
        title: `${titlePrefix[type]}: ${form.name}`,
        description: `[${titlePrefix[type]}] ${form.message}\n\nContact: ${form.phone} | ${form.email || 'N/A'}\nProduct: ${selectedProduct || 'general'}`,
        ticket_type: 'support' as const, priority: type === 'grievance' ? 'high' as const : 'medium' as const, status: 'open' as const,
      }));
      if (!error) {
        await supabase.from('demo_requests').insert({
          name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || null,
          business_name: form.business_name.trim() || null, city: form.city.trim() || null,
          product: selectedProduct || 'general', request_type: type, message: form.message.trim() || null,
        });
      }
    } else {
      ({ error } = await supabase.from('demo_requests').insert({
        name: form.name.trim(), phone: form.phone.trim(), email: form.email.trim() || null,
        business_name: form.business_name.trim() || null, city: form.city.trim() || null,
        product: selectedProduct || 'general', request_type: type, message: form.message.trim() || null,
      }));
    }

    setLoading(false);
    if (error) { toast.error('Failed to submit'); return; }
    setActiveForm(null); setForm(emptyForm());

    const successMessages: Record<string, string> = {
      demo: "✅ Demo request submitted! Our team will contact you within 24 hours.",
      enquiry: "✅ Enquiry submitted! We'll get back to you shortly.",
      franchise: "🎉 Franchise application submitted!",
      support: "✅ Support ticket created!",
      complaint: "✅ Complaint registered.",
      grievance: "✅ Grievance recorded with HIGH priority.",
      technical_support: "✅ Technical support ticket created.",
    };
    addMessage({ from: 'bot', text: `${successMessages[type] || '✅ Submitted!'} Anything else?`, options: INITIAL_MESSAGE.options });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage({ from: 'user', text: input });
    setInput('');
    setTimeout(() => { addMessage({ from: 'bot', text: "For quick help, please choose:", options: INITIAL_MESSAGE.options }); }, 500);
  };

  const renderForm = (type: string) => {
    const isTicketType = ['support', 'complaint', 'grievance', 'technical_support'].includes(type);
    const titles: Record<string, string> = {
      demo: 'Quick Request Form', enquiry: 'Product Enquiry', franchise: 'Franchise Enquiry',
      support: 'Support Ticket', complaint: 'File Complaint', grievance: 'File Grievance', technical_support: 'Technical Support',
    };
    return (
      <div className="mt-2 ml-7 sm:ml-9 bg-white border border-border rounded-xl p-2.5 sm:p-3 space-y-1.5 sm:space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{titles[type] || type}</p>
        <input className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]" placeholder="Your Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} maxLength={100} />
        <input className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]" placeholder="Phone *" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} maxLength={20} />
        <input className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]" placeholder="Email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} maxLength={255} />
        {type === 'franchise' && (
          <input className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]" placeholder="Your City *" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} maxLength={100} />
        )}
        {!isTicketType && type !== 'franchise' && (
          <>
            <input className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]" placeholder="Business Name" value={form.business_name} onChange={e => setForm(p => ({ ...p, business_name: e.target.value }))} maxLength={100} />
            <input className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]" placeholder="City" value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))} maxLength={100} />
          </>
        )}
        <textarea className="w-full border border-border rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A] resize-none" placeholder={isTicketType ? 'Describe your issue *' : 'Message (optional)'} rows={2} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} maxLength={1000} />
        <button onClick={() => submitForm(type)} disabled={loading} className="w-full bg-[#F9423A] text-white rounded-lg py-1.5 text-sm font-medium hover:bg-[#e03830] transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : null} Submit
        </button>
      </div>
    );
  };

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-3">
        <AnimatePresence>
          {!open && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white text-foreground text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg border border-border font-medium">
              💬 Chat with us!
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setOpen(!open)}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white shadow-xl flex items-center justify-center transition-colors">
          <AnimatePresence mode="wait">
            {open
              ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="h-5 w-5 sm:h-6 sm:w-6" /></motion.div>
              : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[380px] max-w-[380px] bg-white rounded-2xl shadow-2xl border border-border flex flex-col overflow-hidden"
            style={{ height: 'min(420px, calc(100vh - 120px))' }}>

            <div className="bg-[#F9423A] px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-xs sm:text-sm">Upcurv Assistant</p>
                <p className="text-white/70 text-[10px] sm:text-xs">Typically replies instantly</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-green-400" />
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2.5 sm:space-y-3 bg-gray-50">
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex items-end gap-1.5 sm:gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                    {msg.from === 'bot' && (
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#F9423A] flex items-center justify-center shrink-0">
                        <Bot className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[85%] sm:max-w-[80%] rounded-2xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm whitespace-pre-wrap ${
                      msg.from === 'bot' ? 'bg-white border border-border text-foreground rounded-bl-sm' : 'bg-[#F9423A] text-white rounded-br-sm'
                    }`}>{msg.text}</div>
                  </div>
                  {msg.options && (
                    <div className="mt-1.5 sm:mt-2 ml-7 sm:ml-9 flex flex-col gap-1 sm:gap-1.5">
                      {msg.options.map(opt => (
                        <button key={opt} onClick={() => handleOption(opt)}
                          className="text-left text-xs sm:text-sm bg-white border border-[#F9423A]/30 hover:bg-[#F9423A] hover:text-white text-[#F9423A] rounded-xl px-2.5 sm:px-3 py-1 sm:py-1.5 transition-colors flex items-center gap-1.5">
                          <ChevronRight className="h-3 w-3 shrink-0" /> {opt}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.form && activeForm === msg.form && renderForm(msg.form)}
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            <div className="px-2.5 sm:px-3 py-2 border-t border-border bg-white flex gap-2 shrink-0">
              <input className="flex-1 border border-border rounded-full px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#F9423A]"
                placeholder="Type a message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} />
              <button onClick={handleSend} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#F9423A] hover:bg-[#e03830] text-white flex items-center justify-center transition-colors shrink-0">
                <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
