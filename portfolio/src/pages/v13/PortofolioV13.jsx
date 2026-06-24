import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';

const PortofolioV13 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=900';
  };

  const year = new Date().getFullYear();
  const rule = isDark ? 'border-stone-700' : 'border-stone-300';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'bg-[#16140f] text-stone-200' : 'bg-[#f5f1e8] text-stone-900'}`}
         style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>

      {/* Masthead */}
      <header className={`border-b-2 ${rule}`}>
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3 text-xs uppercase tracking-[0.25em]">
          <span>Vol. {year} — No. 13</span>
          <div className="flex items-center gap-4">
            <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className="uppercase tracking-[0.25em] hover:italic">{lang === 'en' ? 'Indonesia' : 'English'}</button>
            <button onClick={toggleTheme} aria-label="toggle theme" className="hover:opacity-60">{isDark ? <Sun size={16} /> : <Moon size={16} />}</button>
          </div>
        </div>
        <div className={`border-t ${rule}`}>
          <div className="mx-auto max-w-5xl px-6 py-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-black uppercase leading-none tracking-tight md:text-8xl"
            >
              The {cvData.name.split(' ')[0]} Times
            </motion.h1>
            <div className={`mt-4 flex items-center justify-center gap-4 text-xs uppercase tracking-[0.3em] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              <span className={`h-px w-12 ${isDark ? 'bg-stone-600' : 'bg-stone-400'}`} />
              {cvData.title[lang]}
              <span className={`h-px w-12 ${isDark ? 'bg-stone-600' : 'bg-stone-400'}`} />
            </div>
          </div>
        </div>
      </header>

      {/* Lead story */}
      <main className="mx-auto max-w-5xl px-6 py-12">
        <section className={`grid gap-8 border-b pb-12 md:grid-cols-3 ${rule}`}>
          <div className="md:col-span-2">
            <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Profile · Front Page</div>
            <h2 className="text-3xl font-bold leading-tight md:text-4xl">A Builder of Banking-Scale Systems</h2>
            <p className="mt-4 text-lg leading-relaxed first-letter:float-left first-letter:mr-2 first-letter:text-6xl first-letter:font-black first-letter:leading-[0.8]">
              {cvData.summary[lang]}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${cvData.contacts.email}`} className={`inline-flex items-center gap-2 border px-5 py-2 text-sm uppercase tracking-widest transition-colors ${isDark ? 'border-stone-500 hover:bg-stone-200 hover:text-stone-900' : 'border-stone-800 hover:bg-stone-900 hover:text-stone-50'}`}>
                <Mail size={15} /> Contact
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-2 px-5 py-2 text-sm uppercase tracking-widest underline-offset-4 hover:underline`}>
                Read full CV <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
          <div className={`border-l pl-8 ${rule} md:block`}>
            {cvData.is_avatar && cvData.avatar && !avatarError ? (
              <img src={cvData.avatar} alt={cvData.name} onError={() => setAvatarError(true)} className="mb-3 w-full grayscale" />
            ) : null}
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">Dateline</div>
            <div className="mt-1 text-sm">{cvData.location}</div>
            <div className={`mt-4 border-t pt-4 text-xs uppercase tracking-[0.2em] text-amber-700 ${rule}`}>Established</div>
            <div className="mt-1 text-sm">5+ Years in Practice</div>
          </div>
        </section>

        {/* Skills as classifieds */}
        <section className={`border-b py-10 ${rule}`}>
          <h3 className="mb-6 text-center text-xs font-bold uppercase tracking-[0.3em] text-amber-700">— Competencies —</h3>
          <div className="columns-2 gap-8 text-center md:columns-4">
            {(cvData.skills || []).map((skill, i) => (
              <div key={i} className={`mb-3 break-inside-avoid border-b pb-2 text-sm uppercase tracking-wider ${rule}`}>
                {skill.name}
              </div>
            ))}
          </div>
        </section>

        {/* Projects = featured articles */}
        <section className={`border-b py-12 ${rule}`}>
          <h3 className="mb-8 text-3xl font-black uppercase tracking-tight">Featured Works</h3>
          <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
            {(cvData.projects || []).map((project, i) => {
              const Tag = project.link ? motion.a : motion.div;
              const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Tag
                  {...linkProps}
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`group block ${project.link ? 'cursor-pointer' : ''}`}
                >
                  <div className="mb-4 aspect-[3/2] overflow-hidden">
                    <img src={project.image} alt={project.name} onError={onImageError} className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" />
                  </div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-amber-700">{project.tags.slice(0, 2).join(' · ')}</div>
                  <h4 className="mt-1 text-2xl font-bold leading-tight group-hover:underline">
                    {project.name}
                    {project.link && <ArrowUpRight size={18} className="ml-1 inline opacity-0 transition-opacity group-hover:opacity-100" />}
                  </h4>
                  <p className={`mt-2 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{project.description[lang]}</p>
                </Tag>
              );
            })}
          </div>
        </section>

        {/* Experience = obituary-style columns */}
        <section className="py-12">
          <h3 className="mb-8 text-3xl font-black uppercase tracking-tight">Career Record</h3>
          <div className="space-y-10">
            {(cvData.experience || []).map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={`grid gap-4 border-t pt-6 md:grid-cols-4 ${rule}`}
              >
                <div>
                  <div className="text-lg font-bold">{exp.company}</div>
                  <div className={`text-sm uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{exp.period}</div>
                </div>
                <div className="space-y-4 md:col-span-3">
                  {exp.roles?.map((role, ri) => (
                    <div key={ri}>
                      <div className="font-bold italic">{role.title?.[lang]}</div>
                      <p className={`mt-1 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{role.description?.[lang]}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`border-t-2 ${rule}`}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs uppercase tracking-[0.2em] md:flex-row">
          <span>© {year} {cvData.name} — Printed with care</span>
          <div className="flex gap-5">
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-60"><Github size={16} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-60"><Linkedin size={16} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className="hover:opacity-60"><Mail size={16} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV13;
