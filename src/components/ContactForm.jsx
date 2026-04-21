import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Send, ArrowRight } from 'lucide-react';

const ContactForm = ({ variant = "v1" }) => {
  const { t } = useTranslation();
  const cvData = window.cvData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  if (!cvData) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const recipient = cvData.contacts.email;
    const subject = `Portofolio Inquiry from ${formData.name}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
    
    const gmailUrl = `https://mail.google.com/mail/u/0/?fs=1&to=${recipient}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}&tf=cm`;
    window.open(gmailUrl, '_blank');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const containerClass = variant === "v2" 
    ? "max-w-3xl mx-auto border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-10 md:p-14 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl shadow-2xl shadow-blue-500/5"
    : "bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-xl";

  const inputClass = variant === "v2" 
    ? "w-full px-0 py-4 bg-transparent border-b border-slate-200 dark:border-slate-800 focus:border-blue-500 outline-none transition-all text-lg font-light placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:placeholder:opacity-0"
    : "w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all";

  const labelClass = "text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2 block";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={containerClass}
    >
      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-left">
            <label className={labelClass}>{t('contact_form.name')}</label>
            <input
              required
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="text-left">
            <label className={labelClass}>{t('contact_form.email')}</label>
            <input
              required
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
        
        <div className="text-left">
          <label className={labelClass}>{t('contact_form.message')}</label>
          <textarea
            required
            name="message"
            rows="4"
            placeholder="How can I help you?"
            value={formData.message}
            onChange={handleChange}
            className={inputClass + " resize-none"}
          ></textarea>
        </div>

        <div className="flex justify-center md:justify-start pt-4">
          {variant === "v2" ? (
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group overflow-hidden px-12 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-950 rounded-full font-black text-xs uppercase tracking-[0.4em] shadow-xl transition-all duration-500 hover:shadow-blue-500/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 flex items-center space-x-4">
                <span>{t('contact_form.send')}</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </motion.button>
          ) : (
            <button
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-primary/20"
            >
              <span>{t('contact_form.send')}</span>
              <Send size={18} />
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ContactForm;
