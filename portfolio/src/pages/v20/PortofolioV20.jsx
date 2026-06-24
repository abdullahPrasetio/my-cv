import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation as useI18n } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { Github, Linkedin, Mail, Sun, Moon, ArrowUpRight } from 'lucide-react';

// v20 — Constellation / Space: starfield canvas, constellation connecting skills, cosmic feel
const PortofolioV20 = () => {
  const { i18n } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const canvasRef = useRef(null);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  // Starfield
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: isDark ? 200 : 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.2,
      a: Math.random(),
      speed: Math.random() * 0.005 + 0.002,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.a += s.speed;
        const alpha = (Math.sin(s.a) + 1) / 2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(200,210,255,${alpha * 0.8})` : `rgba(100,120,200,${alpha * 0.3})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, [isDark]);

  if (!cvData) return null;

  const onImageError = (e) => { e.target.src = 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&q=80&w=800'; };

  const bg = isDark ? 'bg-[#04050f]' : 'bg-[#eef0f9]';
  const text = isDark ? 'text-slate-100' : 'text-slate-900';
  const subtle = isDark ? 'text-slate-400' : 'text-slate-500';
  const card = isDark ? 'bg-white/5 border-white/8 backdrop-blur-sm' : 'bg-white/80 border-slate-200 backdrop-blur-sm shadow-sm';
  const accentColor = isDark ? 'text-indigo-300' : 'text-indigo-600';

  const skillColors = [
    'from-indigo-500 to-violet-500',
    'from-cyan-500 to-blue-500',
    'from-violet-500 to-purple-500',
    'from-blue-500 to-indigo-500',
    'from-purple-500 to-pink-500',
    'from-sky-500 to-cyan-500',
  ];

  return (
    <div className={`relative min-h-screen overflow-x-hidden font-sans transition-colors duration-700 ${bg} ${text}`}>
      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" />

      <div className="relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 py-6">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <span className="text-2xl">✦</span>
            <span className={accentColor}>{cvData.name.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase ${card}`}>{lang}</button>
            <button onClick={toggleTheme} className={`rounded-full border p-2 ${card}`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </nav>

        {/* Hero */}
        <header className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          {cvData.is_avatar && cvData.avatar && !avatarError && (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mb-8 h-28 w-28 overflow-hidden rounded-full border-2 border-indigo-400/40"
              style={{ boxShadow: '0 0 40px rgba(99,102,241,0.4)' }}>
              <img src={cvData.avatar} alt={cvData.name} onError={() => setAvatarError(true)} className="h-full w-full object-cover" />
            </motion.div>
          )}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className={`mb-4 text-xs uppercase tracking-[0.4em] ${accentColor}`}>
            {cvData.location}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
            {cvData.name}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className={`mt-4 text-lg font-light ${subtle}`}>{cvData.title[lang]}
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className={`mx-auto mt-6 max-w-xl text-sm leading-loose ${subtle}`}>{cvData.summary[lang]}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${cvData.contacts.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/40 transition-transform hover:scale-105">
              <Mail size={15} /> Contact
            </a>
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-colors hover:border-indigo-400 ${card}`}>
              <Github size={15} /> GitHub
            </a>
          </motion.div>
        </header>

        {/* Constellation skills */}
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <p className={`mb-8 text-center text-xs uppercase tracking-[0.4em] ${accentColor}`}>— Constellation of Skills —</p>
          <div className="flex flex-wrap justify-center gap-3">
            {(cvData.skills || []).map((skill, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                className="relative">
                <div className={`absolute inset-0 rounded-full bg-linear-to-br ${skillColors[i % skillColors.length]} opacity-20 blur-md`} />
                <div className={`relative rounded-full border px-5 py-2 text-sm font-medium ${card}`}>
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <p className={`mb-10 text-center text-xs uppercase tracking-[0.4em] ${accentColor}`}>— Selected Missions —</p>
          <div className="grid gap-6 md:grid-cols-2">
            {(cvData.projects || []).map((project, i) => {
              const Tag = project.link ? motion.a : motion.div;
              const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Tag {...linkProps} key={i}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`group overflow-hidden rounded-3xl border transition-colors ${card}${project.link ? ' cursor-pointer hover:border-indigo-400/40' : ''}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <img src={project.image} alt={project.name} onError={onImageError}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className={`absolute inset-0 bg-linear-to-t ${isDark ? 'from-[#04050f]/70 to-transparent' : 'from-slate-900/40 to-transparent'}`} />
                    {project.link && (
                      <div className="absolute right-3 top-3 rounded-full bg-indigo-500/80 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <ArrowUpRight size={14} />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold">{project.name}</h3>
                    <p className={`mt-1.5 text-sm leading-relaxed ${subtle}`}>{project.description[lang]}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className={`rounded-full px-3 py-0.5 text-[10px] font-medium ${isDark ? 'bg-indigo-500/10 text-indigo-300' : 'bg-indigo-50 text-indigo-600'}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </Tag>
              );
            })}
          </div>
        </section>

        {/* Experience */}
        <section className="mx-auto max-w-4xl px-6 pb-20">
          <p className={`mb-10 text-center text-xs uppercase tracking-[0.4em] ${accentColor}`}>— Career Orbit —</p>
          <div className="space-y-4">
            {(cvData.experience || []).map((exp, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                className={`rounded-3xl border p-6 ${card}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-bold">{exp.company}</h3>
                  <span className={`text-xs ${subtle}`}>{exp.period}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {exp.roles?.map((role, ri) => (
                    <div key={ri}>
                      <div className={`text-sm font-semibold ${accentColor}`}>{role.title?.[lang]}</div>
                      <p className={`mt-1 text-sm leading-relaxed ${subtle}`}>{role.description?.[lang]}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className={`border-t py-8 text-center text-sm ${subtle} ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <div className="mb-4 flex justify-center gap-5">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`hover:text-indigo-400 transition-colors`}><Github size={20} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className={`hover:text-indigo-400 transition-colors`}><Linkedin size={20} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className={`hover:text-indigo-400 transition-colors`}><Mail size={20} /></a>
          </div>
          <div>✦ {cvData.name} © {new Date().getFullYear()} ✦</div>
        </footer>
      </div>
    </div>
  );
};

export default PortofolioV20;
