import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { ArrowUpRight, Github, Linkedin, Mail, Sun, Moon, LayoutGrid, User, Briefcase, Code2 } from 'lucide-react';

// v19 — Dashboard / SaaS: sidebar navigation, professional app-like layout
const PortofolioV19 = () => {
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const lang = i18n.language;
  const cvData = window.cvData;
  const isDark = theme === 'dark';

  if (!cvData) return null;

  const onImageError = (e) => { e.target.src = 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800'; };

  const bg = isDark ? 'bg-[#0e1017]' : 'bg-[#f4f5f7]';
  const sidebar = isDark ? 'bg-[#090c12] border-white/5' : 'bg-white border-slate-200';
  const card = isDark ? 'bg-[#131620] border-white/5' : 'bg-white border-slate-200 shadow-sm';
  const text = isDark ? 'text-slate-100' : 'text-slate-900';
  const subtle = isDark ? 'text-slate-400' : 'text-slate-500';
  const activeNav = isDark ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20' : 'bg-blue-50 text-blue-600 border border-blue-200';
  const idleNav = isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-white/5' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100';

  const navItems = [
    { id: 'about', icon: User, label: 'About' },
    { id: 'skills', icon: Code2, label: 'Skills' },
    { id: 'work', icon: LayoutGrid, label: 'Projects' },
    { id: 'career', icon: Briefcase, label: 'Experience' },
  ];

  const sections = {
    about: (
      <div className="space-y-6">
        <div className={`rounded-2xl border p-6 ${card}`}>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            {cvData.is_avatar && cvData.avatar && !avatarError ? (
              <img src={cvData.avatar} alt={cvData.name} onError={() => setAvatarError(true)}
                className="h-24 w-24 rounded-2xl object-cover" />
            ) : (
              <div className={`grid h-24 w-24 place-items-center rounded-2xl text-3xl font-black ${isDark ? 'bg-blue-600/20 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                {cvData.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
              </div>
            )}
            <div>
              <h1 className={`text-2xl font-bold ${text}`}>{cvData.name}</h1>
              <div className="mt-1 text-blue-500 font-medium">{cvData.title[lang]}</div>
              <div className={`mt-1 text-sm ${subtle}`}>📍 {cvData.location}</div>
            </div>
          </div>
          <p className={`mt-6 text-sm leading-relaxed ${subtle}`}>{cvData.summary[lang]}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={`mailto:${cvData.contacts.email}`} className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors">
              <Mail size={13} /> Email
            </a>
            <a href={cvData.contacts.github} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors hover:border-blue-400 ${isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
              <Github size={13} /> GitHub
            </a>
            <a href={cvData.contacts.linkedin} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 rounded-xl border px-4 py-2 text-xs font-semibold transition-colors hover:border-blue-400 ${isDark ? 'border-white/10 text-slate-300' : 'border-slate-200 text-slate-600'}`}>
              <Linkedin size={13} /> LinkedIn
            </a>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[{ label: 'Years Exp.', value: '5+' }, { label: 'Projects', value: `${cvData.projects?.length ?? 0}` }, { label: 'Skills', value: `${cvData.skills?.length ?? 0}` }].map((stat, i) => (
            <div key={i} className={`rounded-2xl border p-5 ${card}`}>
              <div className="text-3xl font-black text-blue-500">{stat.value}</div>
              <div className={`mt-1 text-xs ${subtle}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    skills: (
      <div className="grid gap-3 md:grid-cols-2">
        {(cvData.skills || []).map((skill, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className={`rounded-xl border p-4 ${card}`}>
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full bg-blue-500`} />
              <span className="font-medium text-sm">{skill.name}</span>
            </div>
            <div className={`mt-3 h-1.5 rounded-full ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
              <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-indigo-500 transition-all duration-1000" style={{ width: `${skill.level || 80}%` }} />
            </div>
          </motion.div>
        ))}
      </div>
    ),
    work: (
      <div className="grid gap-5 md:grid-cols-2">
        {(cvData.projects || []).map((project, i) => {
          const Tag = project.link ? motion.a : motion.div;
          const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
          return (
            <Tag {...linkProps} key={i} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.06 }}
              className={`group overflow-hidden rounded-2xl border transition-colors ${card}${project.link ? ' cursor-pointer hover:border-blue-500/40' : ''}`}>
              <div className="relative aspect-video">
                <img src={project.image} alt={project.name} onError={onImageError}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {project.link && (
                  <div className="absolute right-3 top-3 rounded-lg bg-black/50 p-1.5 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <ArrowUpRight size={15} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold">{project.name}</h3>
                <p className={`mt-1 text-xs leading-relaxed ${subtle}`}>{project.description[lang]}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map(tag => (
                    <span key={tag} className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>{tag}</span>
                  ))}
                </div>
              </div>
            </Tag>
          );
        })}
      </div>
    ),
    career: (
      <div className="space-y-4">
        {(cvData.experience || []).map((exp, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className={`rounded-2xl border p-5 ${card}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-bold">{exp.company}</h3>
              <span className={`rounded-md px-2.5 py-1 text-xs ${isDark ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'}`}>{exp.period}</span>
            </div>
            <div className="mt-4 space-y-3">
              {exp.roles?.map((role, ri) => (
                <div key={ri}>
                  <span className="text-sm font-semibold text-blue-500">{role.title?.[lang]}</span>
                  <p className={`mt-1 text-xs leading-relaxed ${subtle}`}>{role.description?.[lang]}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    ),
  };

  return (
    <div className={`flex min-h-screen ${bg} ${text} transition-colors duration-300`}>
      {/* Sidebar */}
      <aside className={`hidden w-56 shrink-0 flex-col justify-between border-r p-4 md:flex ${sidebar}`}>
        <div>
          <div className="mb-8 px-2 pt-2 font-bold tracking-tight">
            {cvData.name.split(' ')[0]}
            <span className="text-blue-500">.</span>
          </div>
          <nav className="space-y-1">
            {navItems.map(item => (
              <button key={item.id} onClick={() => setActiveSection(item.id)}
                className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.id ? activeNav : idleNav}`}>
                <item.icon size={16} /> {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="space-y-1">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
            className={`w-full rounded-xl px-3 py-2 text-left text-sm transition-colors ${idleNav}`}>
            {lang === 'en' ? '🇮🇩 Bahasa' : '🇬🇧 English'}
          </button>
          <button onClick={toggleTheme} className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors ${idleNav}`}>
            {isDark ? <Sun size={15} /> : <Moon size={15} />} {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </aside>

      {/* Mobile top nav */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 flex border-t md:hidden ${sidebar}`}>
        {navItems.map(item => (
          <button key={item.id} onClick={() => setActiveSection(item.id)}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-[10px] font-medium transition-colors ${activeSection === item.id ? 'text-blue-500' : subtle}`}>
            <item.icon size={18} /> {item.label}
          </button>
        ))}
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 md:pb-8">
        {/* Top bar mobile */}
        <div className="mb-6 flex items-center justify-between md:hidden">
          <div className="font-bold">{cvData.name.split(' ')[0]}<span className="text-blue-500">.</span></div>
          <div className="flex gap-2">
            <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className={`rounded-lg border px-3 py-1 text-xs ${card}`}>{lang.toUpperCase()}</button>
            <button onClick={toggleTheme} className={`rounded-lg border p-2 ${card}`}>{isDark ? <Sun size={14} /> : <Moon size={14} />}</button>
          </div>
        </div>

        <div className={`mb-6 hidden items-center justify-between md:flex`}>
          <h2 className="text-lg font-bold capitalize">{activeSection === 'work' ? 'Projects' : activeSection === 'career' ? 'Experience' : activeSection}</h2>
        </div>

        {sections[activeSection]}
      </main>
    </div>
  );
};

export default PortofolioV19;
