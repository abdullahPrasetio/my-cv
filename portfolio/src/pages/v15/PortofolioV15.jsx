import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, Zap } from 'lucide-react';

// Card that tilts toward the cursor
const TiltCard = ({ children, className = '', isDark, ...rest }) => {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

const PortofolioV15 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  // Spotlight position
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);
  const onPageMove = (e) => {
    sx.set((e.clientX / window.innerWidth) * 100);
    sy.set((e.clientY / window.innerHeight) * 100);
  };
  const spotlight = useTransform(
    [sx, sy],
    ([x, y]) => `radial-gradient(600px circle at ${x}% ${y}%, ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.12)'}, transparent 40%)`
  );

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800';
  };

  const card = isDark ? 'bg-[#0f1016] border-white/10' : 'bg-white border-black/[0.07] shadow-sm';
  const subtle = isDark ? 'text-slate-400' : 'text-slate-500';

  return (
    <div
      onMouseMove={onPageMove}
      className={`relative min-h-screen overflow-x-hidden font-sans transition-colors duration-500 ${isDark ? 'bg-[#070710] text-slate-100' : 'bg-[#f7f7fb] text-slate-900'}`}
    >
      {/* Spotlight overlay */}
      <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: spotlight }} />
      {/* Grid texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.4]"
        style={{
          backgroundImage: `linear-gradient(${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Nav */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <Zap size={18} className="text-indigo-400" /> {cvData.name.split(' ')[0]}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase ${card}`}>{lang}</button>
            <button onClick={toggleTheme} aria-label="toggle theme" className={`rounded-full border p-2 ${card}`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </nav>

        {/* Hero */}
        <header className="py-20 text-center md:py-28">
          {cvData.is_avatar && cvData.avatar && !avatarError && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              src={cvData.avatar} alt={cvData.name} onError={() => setAvatarError(true)}
              className="mx-auto mb-8 h-24 w-24 rounded-full border-2 border-indigo-400/40 object-cover"
            />
          )}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className={`mx-auto mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs ${card}`}
          >
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-400" /> {cvData.location}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="text-5xl font-black leading-[0.95] tracking-tight md:text-7xl"
          >
            {cvData.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mt-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-xl font-semibold text-transparent md:text-2xl"
          >
            {cvData.title[lang]}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className={`mx-auto mt-6 max-w-2xl leading-relaxed ${subtle}`}
          >
            {cvData.summary[lang]}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            <a href={`mailto:${cvData.contacts.email}`} className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-transform hover:scale-105">
              <Mail size={16} /> Get in touch
            </a>
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold ${card}`}>
              <Github size={16} /> GitHub
            </a>
          </motion.div>
        </header>

        {/* Skills marquee-ish chips */}
        <section className="pb-20">
          <div className="flex flex-wrap justify-center gap-2.5">
            {(cvData.skills || []).map((skill, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.02 }}
                className={`rounded-full border px-4 py-2 text-sm font-medium ${card}`}
              >
                {skill.name}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="pb-20">
          <h2 className="mb-10 text-center text-3xl font-black tracking-tight">Work</h2>
          <div className="grid gap-6 [perspective:1000px] md:grid-cols-2">
            {(cvData.projects || []).map((project, i) => {
              const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
              const Inner = project.link ? motion.a : motion.div;
              return (
                <TiltCard
                  key={i}
                  isDark={isDark}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="group relative rounded-3xl"
                >
                  {/* gradient border glow */}
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500/40 via-purple-500/30 to-pink-500/40 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
                  <Inner
                    {...linkProps}
                    className={`relative block overflow-hidden rounded-3xl border ${card}${project.link ? ' cursor-pointer' : ''}`}
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={project.image} alt={project.name} onError={onImageError} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      {project.link && (
                        <div className="absolute right-3 top-3 rounded-full bg-white/90 p-2 text-slate-900 opacity-0 transition-opacity group-hover:opacity-100">
                          <ArrowUpRight size={16} />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <p className={`mt-2 text-sm leading-relaxed ${subtle}`}>{project.description[lang]}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className={`rounded-full px-3 py-1 text-xs font-medium ${isDark ? 'bg-white/5 text-slate-300' : 'bg-black/5 text-slate-600'}`}>{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Inner>
                </TiltCard>
              );
            })}
          </div>
        </section>

        {/* Experience */}
        <section className="pb-20">
          <h2 className="mb-10 text-center text-3xl font-black tracking-tight">Journey</h2>
          <div className="relative mx-auto max-w-2xl">
            <div className={`absolute left-3 top-2 bottom-2 w-px ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />
            <div className="space-y-8">
              {(cvData.experience || []).map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  className="relative pl-10"
                >
                  <div className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-indigo-400 bg-[#070710]" />
                  <div className={`rounded-2xl border p-5 ${card}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-bold">{exp.company}</h3>
                      <span className={`text-xs ${subtle}`}>{exp.period}</span>
                    </div>
                    <div className="mt-3 space-y-2.5">
                      {exp.roles?.map((role, ri) => (
                        <div key={ri}>
                          <div className="text-sm font-semibold text-indigo-400">{role.title?.[lang]}</div>
                          <p className={`mt-0.5 text-sm leading-relaxed ${subtle}`}>{role.description?.[lang]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`flex flex-col items-center justify-between gap-4 border-t py-10 md:flex-row ${isDark ? 'border-white/10' : 'border-black/10'}`}>
          <div className={`text-sm ${subtle}`}>© {new Date().getFullYear()} {cvData.name}</div>
          <div className="flex gap-3">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-400"><Github size={20} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo-400"><Linkedin size={20} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className="transition-colors hover:text-indigo-400"><Mail size={20} /></a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default PortofolioV15;
