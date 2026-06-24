import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, MapPin, Sparkles, Briefcase } from 'lucide-react';

const PortofolioV14 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800';
  };

  const card = isDark
    ? 'bg-[#15171c] border-white/[0.06] hover:border-white/15'
    : 'bg-white border-black/[0.06] hover:border-black/15 shadow-sm';
  const subtle = isDark ? 'text-zinc-400' : 'text-zinc-500';

  const transition = { type: 'spring', stiffness: 120, damping: 18 };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 ${isDark ? 'bg-[#0b0c0f] text-zinc-100' : 'bg-[#eef0f3] text-zinc-900'}`}>
      <div className="mx-auto max-w-5xl px-4 py-8 md:py-12">

        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-sm text-black">
              {cvData.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
            </span>
            {cvData.name.split(' ')[0]}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase ${card}`}>{lang}</button>
            <button onClick={toggleTheme} aria-label="toggle theme" className={`rounded-lg border p-2 ${card}`}>{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid auto-rows-[minmax(0,auto)] grid-cols-2 gap-3 md:grid-cols-4">

          {/* Intro — big */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={transition}
            className={`col-span-2 row-span-2 flex flex-col justify-between rounded-3xl border p-6 md:p-8 ${card}`}
          >
            <div className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs ${isDark ? 'bg-emerald-400/10 text-emerald-400' : 'bg-emerald-500/10 text-emerald-600'}`}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" /> Available for work
            </div>
            <div className="mt-6">
              <h1 className="text-3xl font-black leading-tight md:text-5xl">{cvData.name}</h1>
              <p className="mt-2 text-lg font-medium text-emerald-500">{cvData.title[lang]}</p>
              <p className={`mt-4 leading-relaxed ${subtle}`}>{cvData.summary[lang]}</p>
            </div>
            <a href={`mailto:${cvData.contacts.email}`} className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105">
              <Mail size={16} /> Let's talk
            </a>
          </motion.div>

          {/* Avatar / accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.05 }}
            className={`col-span-2 row-span-2 overflow-hidden rounded-3xl border ${card}`}
          >
            {cvData.is_avatar && cvData.avatar && !avatarError ? (
              <img src={cvData.avatar} alt={cvData.name} onError={() => setAvatarError(true)} className="h-full w-full object-cover" />
            ) : (
              <div className="relative flex h-full min-h-[200px] items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-400/20 via-transparent to-cyan-500/20">
                <Sparkles className="text-emerald-400" size={64} />
              </div>
            )}
          </motion.div>

          {/* Location */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.1 }}
            className={`flex flex-col justify-between rounded-3xl border p-5 ${card}`}>
            <MapPin className="text-cyan-500" size={22} />
            <div>
              <div className={`text-xs uppercase tracking-wider ${subtle}`}>Based in</div>
              <div className="font-bold">{cvData.location}</div>
            </div>
          </motion.div>

          {/* Experience count */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.12 }}
            className={`flex flex-col justify-between rounded-3xl border p-5 ${card}`}>
            <Briefcase className="text-emerald-500" size={22} />
            <div>
              <div className="text-3xl font-black">5+</div>
              <div className={`text-xs uppercase tracking-wider ${subtle}`}>Years exp.</div>
            </div>
          </motion.div>

          {/* Socials */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.14 }}
            className={`col-span-2 flex items-center justify-around gap-2 rounded-3xl border p-5 ${card}`}>
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className="rounded-xl p-3 transition-colors hover:text-emerald-500"><Github size={24} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-xl p-3 transition-colors hover:text-cyan-500"><Linkedin size={24} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className="rounded-xl p-3 transition-colors hover:text-emerald-500"><Mail size={24} /></a>
          </motion.div>

          {/* Skills — wide */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ ...transition, delay: 0.16 }}
            className={`col-span-2 rounded-3xl border p-6 md:col-span-4 ${card}`}>
            <div className={`mb-4 text-xs font-bold uppercase tracking-[0.2em] ${subtle}`}>Tech Stack</div>
            <div className="flex flex-wrap gap-2">
              {(cvData.skills || []).map((skill, i) => (
                <span key={i} className={`rounded-xl px-3.5 py-1.5 text-sm font-medium ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>{skill.name}</span>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          {(cvData.projects || []).map((project, i) => {
            const Tag = project.link ? motion.a : motion.div;
            const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
              <Tag
                {...linkProps}
                key={i}
                initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={transition}
                className={`group col-span-2 overflow-hidden rounded-3xl border ${card}${project.link ? ' cursor-pointer' : ''}`}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.image} alt={project.name} onError={onImageError} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {project.link && (
                    <div className="absolute right-3 top-3 rounded-full bg-black/60 p-2 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <ArrowUpRight size={16} />
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold">{project.name}</h3>
                  <p className={`mt-1 text-sm leading-relaxed ${subtle}`}>{project.description[lang]}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className={`rounded-md px-2 py-0.5 text-xs ${isDark ? 'bg-white/5 text-zinc-400' : 'bg-black/5 text-zinc-600'}`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Tag>
            );
          })}

          {/* Experience */}
          <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={transition}
            className={`col-span-2 rounded-3xl border p-6 md:col-span-4 ${card}`}>
            <div className={`mb-5 text-xs font-bold uppercase tracking-[0.2em] ${subtle}`}>Experience</div>
            <div className="space-y-5">
              {(cvData.experience || []).map((exp, i) => (
                <div key={i} className={`flex flex-col gap-3 md:flex-row md:gap-8 ${i > 0 ? `border-t pt-5 ${isDark ? 'border-white/5' : 'border-black/5'}` : ''}`}>
                  <div className="md:w-1/3">
                    <div className="font-bold">{exp.company}</div>
                    <div className={`text-sm ${subtle}`}>{exp.period}</div>
                  </div>
                  <div className="space-y-3 md:w-2/3">
                    {exp.roles?.map((role, ri) => (
                      <div key={ri}>
                        <div className="font-semibold text-emerald-500">{role.title?.[lang]}</div>
                        <p className={`mt-0.5 text-sm leading-relaxed ${subtle}`}>{role.description?.[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className={`mt-6 text-center text-xs ${subtle}`}>© {new Date().getFullYear()} {cvData.name}</div>
      </div>
    </div>
  );
};

export default PortofolioV14;
