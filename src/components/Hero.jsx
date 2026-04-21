import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Mail, Linkedin, Youtube, Github, Download } from 'lucide-react';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 text-primary font-medium mb-4"
        >
          <span className="h-px w-8 bg-primary"></span>
          <span>{t('hero.greeting')}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-4"
        >
          {cvData.name}
        </motion.h1>

        {cvData.avatar && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8"
          >
            <img 
              src={cvData.avatar} 
              alt={cvData.name} 
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-primary/20 shadow-xl mx-auto"
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-6"
        >
          {cvData.title[lang] || cvData.title['en']}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center space-x-2 text-slate-500 mb-8"
        >
          <MapPin size={18} />
          <span>{cvData.location}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <a
            href="#contact"
            className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
          >
            {t('hero.hire_me')}
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-8 py-3 border border-slate-200 dark:border-slate-800 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors flex items-center space-x-2"
          >
            <Download size={18} />
            <span>{t('hero.download_cv')}</span>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex space-x-6 text-slate-400"
        >
          <a href={cvData.contacts.github} target="_blank" className="hover:text-primary transition-colors"><Github size={24} /></a>
          <a href={cvData.contacts.linkedin} target="_blank" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
          <a href={cvData.contacts.youtube} target="_blank" className="hover:text-primary transition-colors"><Youtube size={24} /></a>
          <a href={`mailto:${cvData.contacts.email}`} className="hover:text-primary transition-colors"><Mail size={24} /></a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
