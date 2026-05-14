import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const PortofolioV9 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/1200x800?text=Project+Archive';
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#111111] text-[#ffffff]' : 'bg-[#ffffff] text-[#111111]'} font-sans selection:bg-blue-600 selection:text-white transition-colors duration-700`}>
      
      {/* Swiss Header */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-8 md:px-12 flex justify-between items-baseline border-b border-white/10">
        <div className="text-sm font-bold tracking-tighter uppercase">
          {cvData.name} ©{new Date().getFullYear()}
        </div>
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className="hover:opacity-50 transition-opacity">
            {lang === 'en' ? 'Indonesian' : 'English'}
          </button>
          <button onClick={toggleTheme} className="hover:opacity-50 transition-opacity">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>

      <main className="pt-48 px-6 md:px-12 pb-24">
        {/* Giant Hero Title */}
        <section className="mb-48">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] font-bold leading-[0.85] tracking-tighter uppercase mb-24"
          >
            {cvData.title[lang].split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </motion.h1>

          <div className="grid md:grid-cols-12 gap-8 border-t border-current pt-12">
            <div className="md:col-span-4 text-xs font-bold uppercase tracking-widest opacity-50">
              Introduction
            </div>
            <div className="md:col-span-8">
              <p className="text-2xl md:text-5xl leading-tight tracking-tight max-w-4xl">
                {cvData.summary[lang]}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Archive */}
        <section className="mb-48">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-12 py-4 border-b border-current">
            Work Archive / {cvData.projects.length} Entries
          </h2>
          <div className="space-y-0">
            {cvData.projects.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group grid md:grid-cols-12 gap-8 py-12 border-b border-current hover:bg-current hover:text-white dark:hover:text-black transition-colors duration-500 cursor-pointer"
              >
                <div className="md:col-span-1 text-sm font-bold opacity-30">0{i + 1}</div>
                <div className="md:col-span-6">
                  <h3 className="text-4xl md:text-7xl font-bold uppercase tracking-tighter group-hover:pl-4 transition-all duration-500">
                    {project.name}
                  </h3>
                </div>
                <div className="md:col-span-4 flex flex-col justify-end">
                  <p className="text-sm uppercase tracking-tight opacity-70 mb-4">{project.description[lang]}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold border border-current px-2 py-0.5 uppercase">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="md:col-span-1 flex items-center justify-end">
                  <ArrowRight className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Break - Large Avatar */}
        {cvData.is_avatar && cvData.avatar && !avatarError && (
          <section className="mb-48">
            <div className="aspect-[21/9] overflow-hidden grayscale">
              <motion.img 
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                src={cvData.avatar} 
                alt="avatar"
                onError={() => setAvatarError(true)}
                className="w-full h-full object-cover"
              />
            </div>
          </section>
        )}

        {/* Skills Grid */}
        <section className="mb-48">
          <div className="grid md:grid-cols-12 gap-8 border-t border-current pt-12">
            <div className="md:col-span-4 text-xs font-bold uppercase tracking-widest opacity-50">
              Core Expertise
            </div>
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8">
              {cvData.skills.map((skill, i) => (
                <div key={i}>
                  <div className="text-[10px] font-bold opacity-30 mb-2">/0{i + 1}</div>
                  <div className="text-xl md:text-3xl font-bold uppercase tracking-tighter">{skill.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience - Vertical Timeline */}
        <section className="mb-48">
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-50 mb-12 py-4 border-b border-current">
            Career Journey
          </h2>
          <div className="space-y-24">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4 text-2xl font-bold">{exp.period}</div>
                <div className="md:col-span-8">
                  <h3 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-4">{exp.roles[0].title[lang]}</h3>
                  <div className="text-xl opacity-50 font-bold uppercase mb-8">{exp.company}</div>
                  <p className="text-xl max-w-2xl leading-snug">{exp.roles[0].description[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Contact */}
        <footer className="pt-24 border-t-2 border-current">
          <div className="grid md:grid-cols-2 gap-24 mb-24">
            <div>
              <h2 className="text-6xl md:text-9xl font-bold uppercase tracking-tighter mb-12">Connect.</h2>
              <div className="space-y-4">
                <a href={`mailto:${cvData.contacts.email}`} className="block text-2xl md:text-4xl font-bold hover:opacity-50 transition-opacity border-b border-current pb-4">
                  {cvData.contacts.email}
                </a>
                <div className="flex gap-12 pt-8">
                  <a href={cvData.contacts.github} className="text-sm font-bold uppercase border-b border-current hover:opacity-50">Github</a>
                  <a href={cvData.contacts.linkedin} className="text-sm font-bold uppercase border-b border-current hover:opacity-50">Linkedin</a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-end">
              <div className="text-right max-w-xs">
                <p className="text-xs font-bold uppercase tracking-widest mb-8 opacity-50 leading-relaxed">
                  Based in {cvData.location}. Open for collaborations and full-time opportunities worldwide.
                </p>
                <div className="text-6xl font-black italic">V.09</div>
              </div>
            </div>
          </div>
          <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-center opacity-30">
            Design Standards — ISO {new Date().getFullYear()} — {cvData.name}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PortofolioV9;
