import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Code, Terminal } from 'lucide-react';

const PortofolioV6 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  const brutalShadow = theme === 'dark' ? 'shadow-[8px_8px_0px_0px_#f4f4f0]' : 'shadow-[8px_8px_0px_0px_#1a1a1a]';
  const brutalShadowLarge = theme === 'dark' ? 'shadow-[12px_12px_0px_0px_#f4f4f0]' : 'shadow-[12px_12px_0px_0px_#1a1a1a]';
  const brutalBorder = theme === 'dark' ? 'border-[#f4f4f0]' : 'border-[#1a1a1a]';

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#1a1a1a] text-[#f4f4f0]' : 'bg-[#f4f4f0] text-[#1a1a1a]'} font-sans selection:bg-[#ff5e5b] selection:text-white transition-colors duration-300 overflow-x-hidden`}>
      
      {/* Fixed Navigation */}
      <nav className={`fixed top-0 w-full z-50 flex justify-between items-center p-4 md:p-6 border-b-4 ${brutalBorder} ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f4f4f0]'}`}>
        <div className="text-xl md:text-4xl font-black uppercase tracking-tighter italic">
          {cvData.name.split(' ')[0]}<span className="text-[#ff5e5b]">.</span>
        </div>
        <div className="flex gap-2 md:gap-4">
          <button 
            onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
            className={`px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-black uppercase border-4 ${brutalShadow} ${brutalBorder} hover:bg-[#ffce54] hover:text-[#1a1a1a] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            {lang}
          </button>
          <button 
            onClick={toggleTheme}
            className={`px-3 py-1.5 md:px-5 md:py-2 text-xs md:text-sm font-black uppercase border-4 ${brutalShadow} ${brutalBorder} hover:bg-[#4ec9b0] hover:text-[#1a1a1a] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none`}
          >
            {theme === 'dark' ? 'LIGHT' : 'DARK'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={`pt-32 md:pt-48 pb-20 px-6 md:px-12 border-b-4 ${brutalBorder}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24">
          <div className="flex-1 w-full text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-2 bg-[#ffce54] text-[#1a1a1a] border-4 border-black font-black uppercase tracking-widest text-xs md:text-sm mb-8 transform -rotate-2"
            >
              {cvData.location}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[14vw] md:text-[9vw] font-black uppercase leading-[0.8] tracking-tighter mb-12 break-words"
            >
              {cvData.title[lang].split(' ').map((word, i) => (
                <span key={i} className={`block ${i % 2 === 1 ? 'text-[#ff5e5b]' : ''}`}>{word}</span>
              ))}
            </motion.h1>
            <div className={`p-6 md:p-8 border-4 ${brutalShadowLarge} ${theme === 'dark' ? 'bg-[#f4f4f0] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#f4f4f0]'} transform md:rotate-1`}>
              <p className="text-lg md:text-2xl font-bold leading-tight">{cvData.summary[lang]}</p>
            </div>
          </div>

          {cvData.is_avatar && cvData.avatar && !avatarError && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
              animate={{ scale: 1, opacity: 1, rotate: -5 }}
              className={`w-full md:w-[450px] aspect-square border-4 ${brutalShadowLarge} ${brutalBorder} overflow-hidden bg-[#ff5e5b] shrink-0 relative group`}
            >
              <img src={cvData.avatar} alt="avatar" onError={() => setAvatarError(true)} className="w-full h-full object-cover mix-blend-multiply grayscale hover:grayscale-0 transition-all duration-500" />
              <div className="absolute inset-0 border-[16px] border-black/10 pointer-events-none"></div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className={`overflow-hidden py-6 border-b-4 whitespace-nowrap flex items-center ${theme === 'dark' ? 'bg-[#4ec9b0] text-[#1a1a1a]' : 'bg-[#ff5e5b] text-[#f4f4f0]'} ${brutalBorder}`}>
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-12 text-4xl md:text-7xl font-black uppercase tracking-tighter italic"
        >
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              {cvData.name} <Terminal size={64} className="md:size-16" /> HIRE ME NOW <Code size={64} className="md:size-16" />
            </span>
          ))}
        </motion.div>
      </div>

      {/* Projects Grid */}
      <section className={`py-24 px-6 md:px-12 border-b-4 ${brutalBorder}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-7xl md:text-[12vw] font-black uppercase mb-24 tracking-tighter leading-none flex flex-wrap gap-4">
            <span className="outline-text text-transparent border-black" style={{ WebkitTextStroke: theme === 'dark' ? '2px #f4f4f0' : '2px #1a1a1a' }}>SELECTED</span> 
            <span>WORKS</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {cvData.projects.map((project, i) => {
              const [imgError, setImgError] = useState(false);
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`group border-4 p-4 md:p-8 flex flex-col ${brutalShadowLarge} ${brutalBorder} hover:-translate-y-4 hover:translate-x-4 transition-all duration-300 ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-[#f4f4f0]'}`}
                >
                  <div className={`w-full aspect-video border-4 mb-8 overflow-hidden relative ${brutalBorder} bg-[#ffce54]`}>
                    {!imgError ? (
                      <img src={project.image} alt={project.name} onError={() => setImgError(true)} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Code size={80} className="text-[#1a1a1a] opacity-20" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 p-3 bg-white border-4 border-black text-black">
                      <ArrowUpRight size={32} />
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 leading-none">{project.name}</h3>
                    <p className="text-lg md:text-xl font-bold opacity-80 leading-tight">{project.description[lang]}</p>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-auto pt-8 border-t-2 border-dashed border-black/20">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-4 py-1.5 border-4 font-black text-sm uppercase tracking-widest ${theme === 'dark' ? 'border-[#f4f4f0] bg-[#ffce54] text-[#1a1a1a]' : 'border-[#1a1a1a] bg-[#4ec9b0] text-[#1a1a1a]'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Massive Call to Action Footer */}
      <footer className={`py-24 px-6 md:px-12 ${theme === 'dark' ? 'bg-[#f4f4f0] text-[#1a1a1a]' : 'bg-[#1a1a1a] text-[#f4f4f0]'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <h2 className="text-[15vw] font-black uppercase leading-none tracking-tighter mb-16 italic">
              LET'S <span className="text-[#ff5e5b]">CHAT!</span>
            </h2>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-24">
            <a href={cvData.contacts.github} target="_blank" className={`p-6 md:p-8 border-4 ${brutalBorder} hover:bg-[#ffce54] transition-colors ${theme === 'dark' ? 'bg-[#1a1a1a] text-[#f4f4f0]' : 'bg-[#f4f4f0] text-[#1a1a1a]'}`}>
              <Github size={48} />
            </a>
            <a href={cvData.contacts.linkedin} target="_blank" className={`p-6 md:p-8 border-4 ${brutalBorder} hover:bg-[#4ec9b0] transition-colors ${theme === 'dark' ? 'bg-[#1a1a1a] text-[#f4f4f0]' : 'bg-[#f4f4f0] text-[#1a1a1a]'}`}>
              <Linkedin size={48} />
            </a>
            <a href={`mailto:${cvData.contacts.email}`} className={`p-6 md:p-8 border-4 ${brutalBorder} hover:bg-[#ff5e5b] transition-colors ${theme === 'dark' ? 'bg-[#1a1a1a] text-[#f4f4f0]' : 'bg-[#f4f4f0] text-[#1a1a1a]'}`}>
              <Mail size={48} />
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t-4 border-black/10 pt-12">
            <div className="text-xl font-black uppercase tracking-widest italic">
              © {new Date().getFullYear()} {cvData.name} <span className="text-[#ff5e5b]">/</span> ALL RIGHTS RESERVED
            </div>
            <a 
              href="/resume.pdf" 
              target="_blank"
              className={`px-10 py-5 bg-[#ff5e5b] text-white border-4 border-black font-black uppercase text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all`}
            >
              {t('hero.download_cv')}
            </a>
          </div>
        </div>
      </footer>

      {/* Style for Outline Text */}
      <style dangerouslySetInnerHTML={{ __html: `
        .outline-text {
          -webkit-text-fill-color: transparent;
        }
      ` }} />
    </div>
  );
};

export default PortofolioV6;
