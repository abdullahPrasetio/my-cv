import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, ArrowRight, Github, Linkedin, Youtube, Mail, ExternalLink, Download } from 'lucide-react';
import ContactForm from '../../components/ContactForm';

const PortofolioV2 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-500 font-sans">
      {/* Header Minimalis */}
      <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center backdrop-blur-sm bg-white/10 dark:bg-black/10">
        <div className="text-sm font-black tracking-widest uppercase bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
          {cvData.name}
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
            className="text-[10px] tracking-widest uppercase font-bold hover:text-blue-500 transition-colors"
          >
            {lang}
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-blue-600" />}
          </button>
        </div>
      </nav>

      {/* Hero V2 */}
      <section className="relative h-screen flex flex-col justify-center px-6 md:px-24 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

        <motion.div {...fadeIn}>
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-blue-600 dark:text-blue-400 mb-6 block">
            {cvData.location}
          </span>
          <h1 className="text-6xl md:text-[8vw] leading-[0.9] font-black tracking-tighter mb-8">
            {cvData.title[lang].split('&')[0]}<br/>
            <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent italic font-serif">
              & Technical Lead.
            </span>
          </h1>

          {cvData.is_avatar && cvData.avatar && (
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute right-6 md:right-24 top-1/2 -translate-y-1/2 hidden lg:block"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full opacity-20 group-hover:opacity-40 blur-2xl transition-opacity duration-500"></div>
                <img 
                  src={cvData.avatar} 
                  alt={cvData.name} 
                  className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-700 border-2 border-white/10"
                />
              </div>
            </motion.div>
          )}
          
          <div className="flex flex-col md:flex-row md:items-center gap-12 mt-12">
            <div className="flex items-center gap-8">
              <a 
                href="#contact" 
                className="group relative flex items-center space-x-4 text-sm uppercase tracking-widest font-black"
              >
                <span className="relative z-10">{t('hero.hire_me')}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-2 bg-blue-500/20 group-hover:w-full transition-all duration-500"></div>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-500" />
              </a>
              <a 
                href="/resume.pdf"
                target="_blank"
                className="group flex items-center space-x-2 text-[10px] uppercase tracking-widest font-bold opacity-50 hover:opacity-100 transition-opacity"
              >
                <Download size={14} />
                <span>{t('hero.download_cv')}</span>
              </a>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-600 dark:text-slate-400 font-medium">
              {cvData.summary[lang]}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Experience V2 */}
      <section className="py-32 px-6 md:px-24">
        <h2 className="text-xs uppercase tracking-[0.5em] text-slate-400 mb-20 text-center font-bold">Selected Experience</h2>
        <div className="max-w-5xl mx-auto space-y-24">
          {(cvData.experience || []).map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-12 gap-8 items-start border-l-2 border-slate-100 dark:border-slate-800 pl-8 hover:border-blue-500 transition-colors duration-500"
            >
              <div className="md:col-span-4">
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">{exp.roles[0].period}</span>
                <h3 className="text-2xl font-bold mt-2">{exp.company}</h3>
              </div>
              <div className="md:col-span-8">
                <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-50">{exp.roles[0].title[lang]}</h4>
                <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  {exp.roles[0].description[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Projects V2 */}
      <section className="py-32 px-6 md:px-24 bg-white dark:bg-slate-900/50">
        <h2 className="text-xs uppercase tracking-[0.5em] text-slate-400 mb-20 text-center font-bold">Featured Projects</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {(cvData.projects || []).map((project, i) => {
            const Tag = project.link ? motion.a : motion.div;
            const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
            return (
            <Tag
              {...linkProps}
              key={i}
              whileHover={{ y: -10 }}
              className={`group relative bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/5 border border-slate-100 dark:border-slate-800 block${project.link ? ' cursor-pointer' : ''}`}
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-black tracking-tight">{project.name}</h3>
                  <ExternalLink size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                  {project.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white dark:bg-slate-800 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
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

      {/* Skills V2 */}
      <section className="py-32 px-6 md:px-24">
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {(cvData.skills || []).map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, backgroundColor: '#3b82f6', color: '#fff' }}
              className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-bold tracking-widest uppercase transition-all cursor-default shadow-sm"
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer V2 */}
      <footer id="contact" className="py-32 px-6 md:px-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="text-center mb-20">
          <h2 className="text-[10vw] leading-none font-black tracking-tighter mb-12 bg-gradient-to-b from-slate-900 to-slate-400 dark:from-white dark:to-slate-600 bg-clip-text text-transparent italic">
            Let's talk.
          </h2>
          <ContactForm variant="v2" />
        </div>

        <div className="flex flex-wrap justify-center gap-12 mb-20">
          <a href={`mailto:${cvData.contacts.email}`} className="group flex flex-col items-center gap-2">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Mail size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">Email</span>
          </a>
          <a href={cvData.contacts.linkedin} target="_blank" className="group flex flex-col items-center gap-2">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Linkedin size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">LinkedIn</span>
          </a>
          <a href={cvData.contacts.github} target="_blank" className="group flex flex-col items-center gap-2">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-full shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Github size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">GitHub</span>
          </a>
        </div>
        <div className="text-[10px] font-black opacity-20 uppercase tracking-[0.5em] text-center">
          © {new Date().getFullYear()} {cvData.name} — ALL RIGHTS RESERVED
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV2;
