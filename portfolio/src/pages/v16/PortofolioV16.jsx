import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, Crown, Diamond } from 'lucide-react';

// v16 — Dark Luxury: amber/gold accent, ultra-premium feel
const PortofolioV16 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => { e.target.src = 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800'; };

  const bg = isDark ? 'bg-[#0a0804]' : 'bg-[#faf8f4]';
  const text = isDark ? 'text-stone-100' : 'text-stone-900';
  const subtle = isDark ? 'text-stone-400' : 'text-stone-500';
  const card = isDark ? 'bg-[#120f09] border-amber-900/30' : 'bg-white border-amber-200/60 shadow-sm';
  const gold = 'text-amber-400';
  const divider = isDark ? 'border-amber-900/30' : 'border-amber-200/60';

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${bg} ${text}`}>
      {/* Top strip */}
      <div className={`border-b ${divider} px-6 py-2 text-center text-[10px] uppercase tracking-[0.4em] ${subtle}`}>
        {cvData.location} — Portfolio {new Date().getFullYear()}
      </div>

      {/* Nav */}
      <nav className={`flex items-center justify-between border-b px-8 py-4 ${divider}`}>
        <div className="flex items-center gap-2 text-lg font-black tracking-tight">
          <Crown size={18} className={gold} /> {cvData.name.split(' ')[0].toUpperCase()}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className={`text-xs uppercase tracking-[0.2em] ${subtle} hover:${gold}`}>{lang === 'en' ? 'ID' : 'EN'}</button>
          <button onClick={toggleTheme} className={`${subtle} hover:text-amber-400 transition-colors`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
        </div>
      </nav>

      {/* Hero */}
      <header className="mx-auto max-w-5xl px-8 py-20 md:py-32">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <div>
            <div className={`mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.3em] ${gold}`}>
              <Diamond size={12} /> Premium Portfolio
            </div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black leading-tight md:text-7xl"
            >
              {cvData.name.split(' ').map((w, i) => (
                <span key={i} className={`block ${i % 2 === 1 ? gold : ''}`}>{w}</span>
              ))}
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
              className={`mt-5 text-lg ${subtle}`}>{cvData.title[lang]}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
              className={`mt-4 h-px bg-linear-to-r from-amber-400 to-transparent`} />
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
              className={`mt-4 leading-relaxed ${subtle}`}>{cvData.summary[lang]}
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${cvData.contacts.email}`}
                className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-600 px-6 py-3 text-sm font-bold text-black transition-transform hover:scale-105">
                <Mail size={15} /> Engage
              </a>
              <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 border px-6 py-3 text-sm font-bold transition-colors hover:border-amber-400 hover:text-amber-400 ${divider}`}>
                <Github size={15} /> GitHub
              </a>
            </motion.div>
          </div>
          {cvData.is_avatar && cvData.avatar && !avatarError ? (
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              className="relative mx-auto aspect-[3/4] w-72 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-amber-400/20 to-transparent" />
              <img src={cvData.avatar} alt={cvData.name} onError={() => setAvatarError(true)} className="h-full w-full object-cover grayscale" />
              <div className={`absolute inset-0 border ${divider}`} />
            </motion.div>
          ) : null}
        </div>
      </header>

      {/* Separator */}
      <div className={`mx-auto max-w-5xl border-t px-8 ${divider}`}>
        <div className={`py-1 text-center text-[10px] uppercase tracking-[0.4em] ${gold}`}>✦ Expertise ✦</div>
      </div>

      {/* Skills */}
      <section className={`border-b mx-auto max-w-5xl px-8 py-12 ${divider}`}>
        <div className="flex flex-wrap justify-center gap-3">
          {(cvData.skills || []).map((skill, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
              className={`border px-5 py-2 text-sm font-medium uppercase tracking-widest ${divider} ${subtle}`}>
              {skill.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className={`border-b mx-auto max-w-5xl px-8 py-16 ${divider}`}>
        <div className={`mb-2 text-center text-[10px] uppercase tracking-[0.4em] ${gold}`}>✦ Selected Works ✦</div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {(cvData.projects || []).map((project, i) => {
            const Tag = project.link ? motion.a : motion.div;
            const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag {...linkProps} key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className={`group border ${card} transition-colors hover:border-amber-400/60${project.link ? ' cursor-pointer' : ''}`}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.image} alt={project.name} onError={onImageError}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  {project.link && (
                    <div className="absolute right-3 top-3 bg-amber-400 p-2 text-black opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${subtle}`}>{project.description[lang]}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className={`border px-3 py-0.5 text-xs uppercase tracking-wider ${divider} ${subtle}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="mx-auto max-w-5xl px-8 py-16">
        <div className={`mb-2 text-center text-[10px] uppercase tracking-[0.4em] ${gold}`}>✦ Career ✦</div>
        <div className="mt-10 space-y-8">
          {(cvData.experience || []).map((exp, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className={`border p-6 ${card}`}>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-bold">{exp.company}</h3>
                <span className={`text-sm ${subtle}`}>{exp.period}</span>
              </div>
              <div className="mt-4 space-y-3">
                {exp.roles?.map((role, ri) => (
                  <div key={ri}>
                    <span className={`text-sm font-semibold ${gold}`}>{role.title?.[lang]}</span>
                    <p className={`mt-1 text-sm leading-relaxed ${subtle}`}>{role.description?.[lang]}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t ${divider} px-8 py-8`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <span className={`text-sm ${subtle}`}>© {new Date().getFullYear()} {cvData.name}</span>
          <div className="flex gap-4">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`${subtle} hover:text-amber-400 transition-colors`}><Github size={18} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className={`${subtle} hover:text-amber-400 transition-colors`}><Linkedin size={18} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className={`${subtle} hover:text-amber-400 transition-colors`}><Mail size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV16;
