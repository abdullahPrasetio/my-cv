import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { Terminal, Github, Linkedin, Mail, Sun, Moon, ChevronRight, Folder, Cpu } from 'lucide-react';

const PortofolioV12 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  // Editor-style palette (full literal classes so Tailwind generates them)
  const bg = isDark ? 'bg-[#0d1117]' : 'bg-[#fbfbfd]';
  const text = isDark ? 'text-[#c9d1d9]' : 'text-[#24292f]';
  const panel = isDark ? 'bg-[#161b22] border-[#30363d]' : 'bg-white border-[#d0d7de]';
  const accent = isDark ? 'text-[#58a6ff]' : 'text-[#0969da]';
  const hoverAccent = isDark ? 'hover:text-[#58a6ff]' : 'hover:text-[#0969da]';
  const green = isDark ? 'text-[#3fb950]' : 'text-[#1a7f37]';
  const purple = isDark ? 'text-[#bc8cff]' : 'text-[#8250df]';
  const orange = isDark ? 'text-[#ffa657]' : 'text-[#bc4c00]';
  const comment = isDark ? 'text-[#8b949e]' : 'text-[#6e7781]';
  const borderCol = isDark ? 'border-[#30363d]' : 'border-[#d0d7de]';

  const Prompt = () => (
    <span className="select-none">
      <span className={green}>guest@portfolio</span>
      <span className={comment}>:</span>
      <span className={accent}>~</span>
      <span className={comment}>$ </span>
    </span>
  );

  return (
    <div className={`min-h-screen font-mono ${bg} ${text} transition-colors duration-300`}>
      {/* Window chrome */}
      <div className={`sticky top-0 z-50 flex items-center justify-between border-b px-4 py-2.5 ${panel} backdrop-blur`}>
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className={`ml-2 flex items-center gap-1.5 text-xs ${comment}`}>
            <Terminal size={13} /> {cvData.name.toLowerCase().replace(/\s+/g, '-')} — zsh
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className={`rounded px-2 py-1 text-xs ${comment} ${hoverAccent}`}>
            --lang={lang}
          </button>
          <button onClick={toggleTheme} className={`rounded p-1.5 ${comment} ${hoverAccent}`} aria-label="toggle theme">
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 text-sm leading-relaxed md:text-[15px]">
        {/* whoami */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div><Prompt /><span className={text}>whoami</span></div>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center">
            {cvData.is_avatar && cvData.avatar && !avatarError && (
              <img
                src={cvData.avatar}
                alt={cvData.name}
                onError={() => setAvatarError(true)}
                className={`h-28 w-28 shrink-0 rounded-lg border object-cover ${panel}`}
              />
            )}
            <div>
              <div className="text-2xl font-bold md:text-4xl">{cvData.name}</div>
              <div className={`mt-1 ${accent}`}>{cvData.title[lang]}</div>
              <div className={`mt-1 text-xs ${comment}`}># 📍 {cvData.location}</div>
            </div>
          </div>
        </motion.div>

        {/* cat about.md */}
        <div className="mt-10">
          <div><Prompt /><span className={text}>cat about.md</span></div>
          <div className={`mt-3 border-l-2 pl-4 ${borderCol} ${comment}`}>
            {cvData.summary[lang]}
          </div>
        </div>

        {/* skills --list */}
        <div className="mt-10">
          <div><Prompt /><span className={text}>skills </span><span className={comment}>--list</span></div>
          <div className="mt-3 flex flex-wrap gap-2">
            {(cvData.skills || []).map((skill, i) => (
              <span key={i} className={`rounded border px-2.5 py-1 text-xs ${panel}`}>
                <span className={purple}>const </span>
                <span className={text}>{skill.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ls projects/ */}
        <div className="mt-10">
          <div><Prompt /><span className={text}>ls </span><span className={accent}>projects/</span></div>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {(cvData.projects || []).map((project, i) => {
              const Tag = project.link ? motion.a : motion.div;
              const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
              return (
                <Tag
                  {...linkProps}
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`group block rounded-lg border p-4 transition-colors ${panel} ${project.link ? 'cursor-pointer hover:border-[#58a6ff]' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <Folder size={15} className={accent} />
                    <span className={`font-bold ${accent} group-hover:underline`}>{project.name}/</span>
                    {project.link && <ChevronRight size={14} className={`${comment} transition-transform group-hover:translate-x-1`} />}
                  </div>
                  <p className={`mt-2 text-xs leading-relaxed ${comment}`}># {project.description[lang]}</p>
                  <div className={`mt-3 text-xs ${orange}`}>
                    [{project.tags.join(', ')}]
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>

        {/* git log --work */}
        <div className="mt-10">
          <div><Prompt /><span className={text}>git log </span><span className={comment}>--work</span></div>
          <div className="mt-4 space-y-4">
            {(cvData.experience || []).map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`rounded-lg border p-4 ${panel}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Cpu size={14} className={green} />
                  <span className="font-bold">{exp.company}</span>
                  <span className={`text-xs ${comment}`}>· {exp.period}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {exp.roles?.map((role, ri) => (
                    <div key={ri}>
                      <span className={purple}>→ </span>
                      <span className={accent}>{role.title?.[lang]}</span>
                      <p className={`mt-0.5 pl-4 text-xs leading-relaxed ${comment}`}>{role.description?.[lang]}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* contact */}
        <div className="mt-10">
          <div><Prompt /><span className={text}>contact </span><span className={comment}>--connect</span></div>
          <div className="mt-3 flex flex-wrap gap-4">
            <a href={`mailto:${cvData.contacts.email}`} className={`flex items-center gap-2 ${hoverAccent}`}><Mail size={15} className={green} /> {cvData.contacts.email}</a>
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${hoverAccent}`}><Github size={15} className={green} /> github</a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 ${hoverAccent}`}><Linkedin size={15} className={green} /> linkedin</a>
          </div>
        </div>

        <div className="mt-10 flex items-center">
          <Prompt />
          <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className={`ml-0.5 inline-block h-4 w-2 ${isDark ? 'bg-[#c9d1d9]' : 'bg-[#24292f]'}`} />
        </div>
      </div>
    </div>
  );
};

export default PortofolioV12;
