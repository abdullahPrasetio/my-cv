import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { 
  Sun, Moon, Github, Linkedin, Youtube, Mail, 
  MapPin, ArrowDown, ExternalLink, Download, Code,
  Briefcase, GraduationCap
} from 'lucide-react';
import ContactForm from '../../components/ContactForm';

const PortofolioV4 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-black text-slate-900 dark:text-slate-100 transition-colors duration-500 overflow-x-hidden">
      
      {/* Navigation Floating */}
      <nav className="fixed top-6 right-6 z-50 flex items-center gap-4">
        <button 
          onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
          className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-[10px] font-black uppercase border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          {lang}
        </button>
        <button 
          onClick={toggleTheme}
          className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-xl"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Left Section - Sticky Info */}
        <section className="lg:w-2/5 lg:h-screen lg:sticky lg:top-0 p-8 md:p-16 flex flex-col justify-between border-r border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-primary font-black tracking-tighter text-2xl mb-12"
            >
              WAP.
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {cvData.is_avatar && cvData.avatar && !avatarError && (
                <div className="mb-8 relative inline-block">
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-6 -z-10"></div>
                  <img 
                    src={cvData.avatar} 
                    alt={cvData.name} 
                    onError={() => setAvatarError(true)}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              )}
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                {cvData.name}
              </h1>
              <p className="text-xl md:text-2xl font-medium text-slate-500 dark:text-slate-400 mb-8 max-w-sm">
                {cvData.title[lang]}
              </p>
              
              <div className="flex items-center gap-2 text-slate-400 mb-12">
                <MapPin size={18} />
                <span className="text-sm font-bold uppercase tracking-widest">{cvData.location}</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-6 text-slate-400"
          >
            <a href={cvData.contacts.github} target="_blank" className="hover:text-primary transition-colors"><Github size={24} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
            <a href={cvData.contacts.youtube} target="_blank" className="hover:text-primary transition-colors"><Youtube size={24} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className="hover:text-primary transition-colors"><Mail size={24} /></a>
          </motion.div>
        </section>

        {/* Right Section - Scrollable Content */}
        <main className="lg:w-3/5 p-8 md:p-16 lg:p-24 space-y-32">
          
          {/* About */}
          <section id="about">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-200 dark:bg-slate-800"></span>
              01 / {t('nav.about')}
            </h2>
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-700 dark:text-slate-300">
              {cvData.summary[lang]}
            </p>
          </section>

          {/* Skills */}
          <section id="skills">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-200 dark:bg-slate-800"></span>
              02 / {t('nav.skills')}
            </h2>
            <div className="flex flex-wrap gap-4">
              {(cvData.skills || []).map((skill, i) => (
                <div key={i} className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <div className="relative px-6 py-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl text-sm font-bold tracking-widest uppercase">
                    {skill.name}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section id="projects">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-200 dark:bg-slate-800"></span>
              03 / {t('nav.projects')}
            </h2>
            <div className="space-y-24">
              {(cvData.projects || []).map((project, i) => {
                const [imgError, setImgError] = useState(false);
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-100 dark:bg-slate-900 mb-8">
                      {!imgError ? (
                        <img 
                          src={project.image} 
                          alt={project.name} 
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code size={64} className="text-slate-300 dark:text-slate-700" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-3xl font-black mb-4">{project.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 max-w-lg mb-6">{project.description[lang]}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map(tag => (
                            <span key={tag} className="text-[10px] font-black uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ExternalLink size={32} className="text-slate-200 group-hover:text-primary transition-colors duration-500" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Experience */}
          <section id="experience">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-200 dark:bg-slate-800"></span>
              04 / {t('nav.experience')}
            </h2>
            <div className="space-y-16">
              {(cvData.experience || []).map((exp, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="text-sm font-black text-slate-300 dark:text-slate-700 pt-1">
                    {exp.roles?.[0]?.period?.split('-')?.[0]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black group-hover:text-primary transition-colors">{exp.company}</h3>
                    <p className="text-primary font-bold text-sm uppercase tracking-widest mb-4">{exp.roles?.[0]?.title?.[lang]}</p>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                      {exp.roles?.[0]?.description?.[lang]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section id="contact">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12 flex items-center gap-4">
              <span className="w-8 h-px bg-slate-200 dark:bg-slate-800"></span>
              05 / {t('nav.contact')}
            </h2>
            <div className="bg-slate-50 dark:bg-slate-900/50 p-8 md:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
              <ContactForm variant="v1" />
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-20 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300 dark:text-slate-700">
              © {new Date().getFullYear()} {cvData.name}
            </div>
            <a 
              href="/resume.pdf" 
              target="_blank"
              className="px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform"
            >
              {t('hero.download_cv')}
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default PortofolioV4;
