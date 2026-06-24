import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, Sparkles, MapPin } from 'lucide-react';

const PortofolioV11 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800';
  };

  const glass = isDark
    ? 'bg-white/5 border-white/10 backdrop-blur-xl'
    : 'bg-white/60 border-white/70 backdrop-blur-xl';

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans transition-colors duration-500 ${isDark ? 'bg-[#070b14] text-slate-100' : 'bg-[#f4f6fb] text-slate-900'}`}>

      {/* Aurora background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
          className={`absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full blur-[120px] ${isDark ? 'bg-violet-600/25' : 'bg-violet-400/40'}`}
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
          className={`absolute top-1/3 -right-32 h-[40rem] w-[40rem] rounded-full blur-[120px] ${isDark ? 'bg-sky-500/25' : 'bg-sky-300/50'}`}
        />
        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 26, ease: 'easeInOut' }}
          className={`absolute bottom-0 left-1/4 h-[38rem] w-[38rem] rounded-full blur-[120px] ${isDark ? 'bg-fuchsia-600/20' : 'bg-rose-300/40'}`}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <Sparkles size={20} className="text-violet-400" />
          {cvData.name.split(' ')[0]}
        </div>
        <div className={`flex items-center gap-1 rounded-full border p-1 ${glass}`}>
          <button
            onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
            className="rounded-full px-4 py-1.5 text-sm font-semibold uppercase transition-colors hover:bg-white/10"
          >
            {lang}
          </button>
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 transition-colors hover:bg-white/10"
            aria-label="toggle theme"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 mx-auto max-w-6xl px-6 pt-12 pb-24 md:pt-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium ${glass}`}
            >
              <MapPin size={14} className="text-violet-400" /> {cvData.location}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl font-black leading-tight tracking-tight md:text-6xl"
            >
              {cvData.name.split(' ')[0]}{' '}
              <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
                {cvData.name.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`mt-4 text-lg font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {cvData.title[lang]}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className={`mt-6 max-w-lg leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              {cvData.summary[lang]}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a
                href={`mailto:${cvData.contacts.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-105"
              >
                <Mail size={16} /> {t('hero.contact', 'Hubungi Saya')}
              </a>
              <a
                href={cvData.contacts.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10 ${glass}`}
              >
                <Github size={16} /> GitHub
              </a>
            </motion.div>
          </div>

          {cvData.is_avatar && cvData.avatar && !avatarError && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className={`relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border p-2 ${glass}`}
            >
              <img
                src={cvData.avatar}
                alt={cvData.name}
                onError={() => setAvatarError(true)}
                className="h-full w-full rounded-2xl object-cover"
              />
            </motion.div>
          )}
        </div>
      </header>

      {/* Skills */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-violet-400">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {(cvData.skills || []).map((skill, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className={`rounded-2xl border px-5 py-2.5 text-sm font-medium ${glass}`}
            >
              {skill.name}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-violet-400">Selected Work</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {(cvData.projects || []).map((project, i) => {
            const Tag = project.link ? motion.a : motion.div;
            const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag
                {...linkProps}
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`group relative overflow-hidden rounded-3xl border p-2 transition-all duration-300 hover:-translate-y-1 ${glass}${project.link ? ' cursor-pointer' : ''}`}
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <img
                    src={project.image}
                    alt={project.name}
                    onError={onImageError}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {project.link && (
                    <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-900 opacity-0 transition-opacity group-hover:opacity-100">
                      <ArrowUpRight size={18} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold">{project.name}</h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {project.description[lang]}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-white/10 text-slate-300' : 'bg-slate-900/5 text-slate-600'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Tag>
            );
          })}
        </div>
      </section>

      {/* Experience */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        <h2 className="mb-8 text-sm font-bold uppercase tracking-[0.3em] text-violet-400">Experience</h2>
        <div className="space-y-4">
          {(cvData.experience || []).map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`rounded-3xl border p-6 ${glass}`}
            >
              <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <h3 className="text-lg font-bold">{exp.company}</h3>
                <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{exp.period}</span>
              </div>
              <div className="mt-4 space-y-3">
                {exp.roles?.map((role, ri) => (
                  <div key={ri}>
                    <div className="font-semibold text-violet-400">{role.title?.[lang]}</div>
                    <p className={`mt-1 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{role.description?.[lang]}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-6xl px-6 pb-16">
        <div className={`flex flex-col items-center justify-between gap-6 rounded-3xl border p-8 md:flex-row ${glass}`}>
          <div className="text-center md:text-left">
            <div className="text-lg font-bold">{cvData.name}</div>
            <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>© {new Date().getFullYear()} — All rights reserved</div>
          </div>
          <div className="flex gap-3">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className="rounded-full border border-transparent bg-white/10 p-3 transition-colors hover:text-violet-400"><Github size={20} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 p-3 transition-colors hover:text-violet-400"><Linkedin size={20} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className="rounded-full bg-white/10 p-3 transition-colors hover:text-violet-400"><Mail size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV11;
