import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, Circle } from 'lucide-react';

// v18 — Japandi Minimal: lots of whitespace, natural palette, clean zen aesthetic
const PortofolioV18 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => { e.target.src = 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800'; };

  const bg = isDark ? 'bg-[#111210]' : 'bg-[#f7f5f0]';
  const text = isDark ? 'text-stone-200' : 'text-stone-800';
  const subtle = isDark ? 'text-stone-500' : 'text-stone-400';
  const muted = isDark ? 'text-stone-400' : 'text-stone-500';
  const rule = isDark ? 'border-stone-800' : 'border-stone-200';
  const cardBg = isDark ? 'bg-[#181715]' : 'bg-white';
  const accent = isDark ? 'text-amber-600' : 'text-amber-700';

  const fadeUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-700 ${bg} ${text}`} style={{ fontFamily: '"Lato", "Helvetica Neue", sans-serif' }}>
      {/* Nav */}
      <nav className={`flex items-center justify-between border-b px-8 py-5 ${rule}`}>
        <div className="flex items-center gap-2.5">
          <Circle size={8} className={accent} fill="currentColor" />
          <span className="text-sm font-light tracking-[0.15em] uppercase">{cvData.name}</span>
        </div>
        <div className="flex items-center gap-5">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
            className={`text-xs tracking-[0.15em] uppercase ${subtle} hover:${muted}`}>{lang === 'en' ? 'Bahasa' : 'English'}
          </button>
          <button onClick={toggleTheme} className={`${subtle} hover:${muted} transition-colors`}>{isDark ? <Sun size={15} /> : <Moon size={15} />}</button>
        </div>
      </nav>

      {/* Hero — very spacious */}
      <header className="mx-auto max-w-3xl px-8 py-28 md:py-40">
        <motion.p {...fadeUp} className={`mb-8 text-xs tracking-[0.4em] uppercase ${subtle}`}>{cvData.location}</motion.p>
        <motion.h1 {...fadeUp} transition={{ delay: 0.05 }}
          className="text-4xl font-light leading-snug tracking-tight md:text-6xl">
          {cvData.name.split(' ').map((w, i) => (
            <span key={i}>{i === 0 ? <strong className="font-black">{w} </strong> : `${w} `}</span>
          ))}
        </motion.h1>
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className={`mt-3 h-px w-16 ${isDark ? 'bg-amber-700' : 'bg-amber-600'}`} />
        <motion.p {...fadeUp} transition={{ delay: 0.15 }} className={`mt-6 text-base font-light ${muted}`}>{cvData.title[lang]}</motion.p>
        <motion.p {...fadeUp} transition={{ delay: 0.2 }} className={`mt-5 max-w-lg text-sm leading-loose ${subtle}`}>{cvData.summary[lang]}</motion.p>
        <motion.div {...fadeUp} transition={{ delay: 0.25 }} className="mt-10 flex flex-wrap gap-4">
          <a href={`mailto:${cvData.contacts.email}`}
            className={`text-sm tracking-[0.1em] uppercase underline underline-offset-4 ${accent} hover:opacity-70 transition-opacity`}>
            Get in touch
          </a>
          <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer"
            className={`text-sm tracking-[0.1em] uppercase underline underline-offset-4 ${subtle} hover:opacity-70 transition-opacity`}>
            GitHub
          </a>
        </motion.div>
      </header>

      {/* Skills — horizontal rule list */}
      <section className={`border-t border-b mx-auto max-w-3xl px-8 py-12 ${rule}`}>
        <p className={`mb-6 text-xs tracking-[0.4em] uppercase ${subtle}`}>Expertise</p>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3 md:grid-cols-3">
          {(cvData.skills || []).map((skill, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.025 }}
              className={`flex items-center gap-2 border-b py-2 text-sm ${rule}`}>
              <Circle size={4} className={accent} fill="currentColor" />
              {skill.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="mx-auto max-w-3xl px-8 py-20">
        <p className={`mb-12 text-xs tracking-[0.4em] uppercase ${subtle}`}>Work</p>
        <div className="space-y-16">
          {(cvData.projects || []).map((project, i) => {
            const Tag = project.link ? motion.a : motion.div;
            const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag {...linkProps} key={i} {...fadeUp}
                className={`group block ${project.link ? 'cursor-pointer' : ''}`}>
                <div className={`relative overflow-hidden aspect-[16/9] ${cardBg}`}>
                  <img src={project.image} alt={project.name} onError={onImageError}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  {project.link && (
                    <div className="absolute right-4 top-4 bg-white/90 p-2 text-stone-800 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <div className={`mb-1 text-xs tracking-[0.3em] uppercase ${subtle}`}>{project.tags.join(' · ')}</div>
                  <h3 className={`text-2xl font-light group-hover:underline underline-offset-4 ${project.link ? accent : ''}`}>{project.name}</h3>
                  <p className={`mt-2 text-sm leading-loose ${subtle}`}>{project.description[lang]}</p>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className={`border-t mx-auto max-w-3xl px-8 py-20 ${rule}`}>
        <p className={`mb-12 text-xs tracking-[0.4em] uppercase ${subtle}`}>Journey</p>
        <div className="space-y-12">
          {(cvData.experience || []).map((exp, i) => (
            <motion.div key={i} {...fadeUp}
              className={`grid gap-4 md:grid-cols-3`}>
              <div className={`text-sm ${subtle}`}>
                <div className="font-medium text-current">{exp.period}</div>
              </div>
              <div className="md:col-span-2">
                <h3 className="font-semibold">{exp.company}</h3>
                <div className="mt-3 space-y-4">
                  {exp.roles?.map((role, ri) => (
                    <div key={ri}>
                      <div className={`text-sm ${accent}`}>{role.title?.[lang]}</div>
                      <p className={`mt-1 text-sm leading-loose ${subtle}`}>{role.description?.[lang]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t px-8 py-8 ${rule}`}>
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <span className={`text-xs tracking-widest uppercase ${subtle}`}>© {new Date().getFullYear()}</span>
          <div className="flex gap-5">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`${subtle} hover:${text} transition-colors`}><Github size={16} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className={`${subtle} hover:${text} transition-colors`}><Linkedin size={16} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className={`${subtle} hover:${text} transition-colors`}><Mail size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV18;
