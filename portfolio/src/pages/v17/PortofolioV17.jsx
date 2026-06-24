import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

// v17 — Neon Cyberpunk: vivid neon on near-black, scanlines, glitch aesthetic
const PortofolioV17 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => { e.target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800'; };

  const bg = isDark ? 'bg-[#060810]' : 'bg-[#f0f2ff]';
  const text = isDark ? 'text-cyan-50' : 'text-slate-900';
  const subtle = isDark ? 'text-slate-400' : 'text-slate-500';
  const pink = isDark ? 'text-pink-400' : 'text-pink-600';
  const cyan = isDark ? 'text-cyan-400' : 'text-cyan-600';
  const pinkGlow = isDark ? 'shadow-[0_0_20px_rgba(244,114,182,0.4)]' : 'shadow-pink-200';
  const cyanGlow = isDark ? 'shadow-[0_0_20px_rgba(34,211,238,0.4)]' : 'shadow-cyan-200';
  const card = isDark ? 'bg-[#0c0e1a] border-cyan-500/20' : 'bg-white border-slate-200 shadow-sm';

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-mono transition-colors duration-300 ${bg} ${text}`}>
      {/* Scanlines — dark mode only */}
      {isDark && (
        <div className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 4px)' }} />
      )}

      {/* Nav */}
      <nav className={`relative z-10 flex items-center justify-between border-b px-6 py-4 ${isDark ? 'border-cyan-500/20' : 'border-slate-200'}`}>
        <div className={`text-lg font-black uppercase tracking-tight ${cyan}`}>
          &gt; {cvData.name.split(' ')[0]}_
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
            className={`border px-3 py-1 text-xs uppercase ${isDark ? 'border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10' : 'border-slate-300 text-slate-600 hover:bg-slate-100'}`}>
            {lang}
          </button>
          <button onClick={toggleTheme} className={`${subtle} hover:text-cyan-400 transition-colors`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:py-28">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`mb-3 text-xs uppercase tracking-[0.3em] ${subtle}`}>// SYSTEM ONLINE</div>
          <h1 className="text-4xl font-black leading-none tracking-tight md:text-7xl">
            <span className={pink}>HELLO</span>
            <span className="mx-3 opacity-30">/</span>
            <span className={cyan}>WORLD</span>
            <br />
            <span className="mt-2 block text-3xl md:text-5xl">{cvData.name.toUpperCase()}</span>
          </h1>
          <div className={`mt-4 inline-block border px-4 py-1 text-sm ${isDark ? 'border-pink-500/40 text-pink-400' : 'border-pink-300 text-pink-600'}`}>
            {cvData.title[lang]}
          </div>
          <p className={`mt-6 max-w-xl leading-relaxed ${subtle}`}>{cvData.summary[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${cvData.contacts.email}`}
              className={`inline-flex items-center gap-2 border px-6 py-2.5 text-sm font-bold uppercase transition-colors ${isDark ? `border-pink-500 text-pink-400 hover:bg-pink-500/10 ${pinkGlow}` : 'border-pink-400 text-pink-600 hover:bg-pink-50 shadow-sm'}`}>
              <Mail size={15} /> CONTACT.EXE
            </a>
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 border px-6 py-2.5 text-sm font-bold uppercase transition-colors ${isDark ? `border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 ${cyanGlow}` : 'border-cyan-500 text-cyan-600 hover:bg-cyan-50 shadow-sm'}`}>
              <Github size={15} /> GITHUB.SH
            </a>
          </div>
        </motion.div>
      </header>

      {/* Skills */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <div className={`mb-6 text-xs uppercase tracking-[0.3em] ${cyan}`}>// TECH_STACK.json</div>
        <div className="flex flex-wrap gap-2">
          {(cvData.skills || []).map((skill, i) => (
            <motion.span key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className={`border px-4 py-1.5 text-xs font-bold uppercase ${isDark ? 'border-cyan-500/30 text-cyan-300 bg-cyan-500/5' : 'border-cyan-300 text-cyan-700 bg-cyan-50'}`}>
              {skill.name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <div className={`mb-6 text-xs uppercase tracking-[0.3em] ${pink}`}>// PROJECTS.exe</div>
        <div className="grid gap-6 md:grid-cols-2">
          {(cvData.projects || []).map((project, i) => {
            const Tag = project.link ? motion.a : motion.div;
            const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag {...linkProps} key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`group border transition-colors ${card}${project.link ? ' cursor-pointer hover:border-pink-500/60' : ''}`}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.image} alt={project.name} onError={onImageError}
                    className="h-full w-full object-cover brightness-90 transition-all duration-700 group-hover:brightness-100 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-linear-to-t from-[#060810]/80 to-transparent`} />
                  {project.link && (
                    <div className={`absolute right-3 top-3 border p-1.5 opacity-0 transition-opacity group-hover:opacity-100 ${isDark ? 'border-pink-400 text-pink-400 bg-black/60' : 'border-pink-500 text-pink-600 bg-white/80'}`}>
                      <ArrowUpRight size={14} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className={`text-lg font-black uppercase ${isDark ? 'text-cyan-300' : 'text-cyan-700'}`}>{project.name}</h3>
                  <p className={`mt-2 text-xs leading-relaxed ${subtle}`}>{project.description[lang]}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className={`px-2 py-0.5 text-[10px] font-bold uppercase ${isDark ? 'bg-pink-500/10 text-pink-400' : 'bg-pink-50 text-pink-600'}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-20">
        <div className={`mb-6 text-xs uppercase tracking-[0.3em] ${cyan}`}>// WORK_HISTORY.log</div>
        <div className="space-y-4">
          {(cvData.experience || []).map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className={`border p-5 ${card}`}>
              <div className={`font-black uppercase ${cyan}`}>{exp.company}</div>
              <div className={`mt-0.5 text-xs ${subtle}`}>{exp.period}</div>
              <div className="mt-3 space-y-2">
                {exp.roles?.map((role, ri) => (
                  <div key={ri}>
                    <span className={`text-xs font-bold uppercase ${pink}`}># {role.title?.[lang]}</span>
                    <p className={`mt-0.5 text-xs leading-relaxed ${subtle}`}>{role.description?.[lang]}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t px-6 py-6 ${isDark ? 'border-cyan-500/20' : 'border-slate-200'}`}>
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
          <span className={`text-xs uppercase tracking-widest ${subtle}`}>// SESSION_END © {new Date().getFullYear()}</span>
          <div className="flex gap-4">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`${subtle} hover:text-cyan-400 transition-colors`}><Github size={18} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className={`${subtle} hover:text-pink-400 transition-colors`}><Linkedin size={18} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className={`${subtle} hover:text-cyan-400 transition-colors`}><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV17;
