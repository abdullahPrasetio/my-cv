import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { 
  Sun, Moon, Github, Linkedin, Youtube, Mail, 
  ExternalLink, Download, MapPin, Code, 
  Briefcase, GraduationCap, ChevronRight 
} from 'lucide-react';
import ContactForm from '../../components/ContactForm';

const GlassCard = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={`bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-white/20 dark:border-slate-800/50 rounded-3xl p-6 shadow-xl shadow-slate-200/50 dark:shadow-none ${className}`}
  >
    {children}
  </motion.div>
);

const ProjectCard = ({ project, lang }) => {
  const [projImgError, setProjImgError] = useState(false);
  return (
    <GlassCard className="group overflow-hidden p-0">
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!projImgError ? (
          <img 
            src={project.image} 
            alt={project.name} 
            onError={() => setProjImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 flex items-center justify-center">
            <Code size={48} className="text-indigo-500/40" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="text-white font-black text-xl">{project.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {project.description[lang]}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] font-bold px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};

const PortofolioV3 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#020617] text-slate-900 dark:text-slate-100 p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 auto-rows-auto">
        
        {/* Header/Nav Card */}
        <GlassCard className="md:col-span-4 flex justify-between items-center py-4">
          <div className="text-xl font-black bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            {cvData.name.split(' ')[0]}.
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
              className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </GlassCard>

        {/* Profile Card */}
        <GlassCard className="md:col-span-2 md:row-span-2 flex flex-col justify-center items-center text-center py-10">
          {cvData.is_avatar && cvData.avatar && !avatarError && (
            <div className="relative mb-6">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur opacity-25"></div>
              <img 
                src={cvData.avatar} 
                alt={cvData.name} 
                onError={() => setAvatarError(true)}
                className="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-white dark:border-slate-800 shadow-2xl" 
              />
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">{cvData.name}</h1>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-4">{cvData.title[lang]}</p>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
            <MapPin size={16} />
            <span>{cvData.location}</span>
          </div>
        </GlassCard>

        {/* About Card */}
        <GlassCard className="md:col-span-2 row-span-1">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <ChevronRight size={18} />
            </div>
            {t('nav.about')}
          </h2>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {cvData.summary[lang]}
          </p>
        </GlassCard>

        {/* Skills Card */}
        <GlassCard className="md:col-span-2 row-span-1">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Code size={18} />
            </div>
            {t('nav.skills')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {(cvData.skills || []).map((skill, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-[11px] font-bold uppercase tracking-wider">
                {skill.name}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Social Card */}
        <GlassCard className="md:col-span-1 flex flex-row md:flex-col justify-around items-center gap-4">
          <a href={cvData.contacts.github} target="_blank" className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-indigo-500 hover:text-white transition-all duration-300">
            <Github size={24} />
          </a>
          <a href={cvData.contacts.linkedin} target="_blank" className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-300">
            <Linkedin size={24} />
          </a>
          <a href={cvData.contacts.youtube} target="_blank" className="p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300">
            <Youtube size={24} />
          </a>
        </GlassCard>

        {/* Experience Preview Card */}
        <GlassCard className="md:col-span-3">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-amber-600 dark:text-amber-400">
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <Briefcase size={18} />
            </div>
            {t('nav.experience')}
          </h2>
          <div className="space-y-6">
            {cvData.experience.slice(0, 2).map((exp, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="flex-none w-1 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-amber-500 transition-colors"></div>
                <div>
                  <h3 className="font-bold text-sm">{exp.company}</h3>
                  <p className="text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest mt-0.5">{exp.roles?.[0]?.title?.[lang]}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Projects Grid */}
        <div className="md:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-2">
          {(cvData.projects || []).map((project, i) => (
            <ProjectCard key={i} project={project} lang={lang} />
          ))}
        </div>

        {/* Education & Contact Card */}
        <GlassCard className="md:col-span-2">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-rose-600 dark:text-rose-400">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
            Education
          </h2>
          <div className="space-y-4">
            {(cvData.education || []).map((edu, i) => (
              <div key={i}>
                <h3 className="font-bold text-sm">{edu.institution}</h3>
                <p className="text-xs text-slate-500">{edu.degree} • {edu.period}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="md:col-span-2">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <Mail size={18} />
            </div>
            {t('nav.contact')}
          </h2>
          <ContactForm variant="v3" />
        </GlassCard>

        {/* Footer Card */}
        <GlassCard className="md:col-span-4 flex flex-col md:flex-row justify-between items-center gap-4 py-6">
          <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
            © {new Date().getFullYear()} {cvData.name}
          </p>
          <div className="flex gap-4">
            <a href="/resume.pdf" target="_blank" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-indigo-600 transition-colors">
              <Download size={14} />
              {t('hero.download_cv')}
            </a>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};

export default PortofolioV3;
