import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { 
  Github, Linkedin, Mail, ExternalLink, Code, 
  Layers, Sparkles, User
} from 'lucide-react';

const GlassCard = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ scale: 1.02, translateY: -5 }}
    className={`backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

const ParallaxSection = ({ children, offset = 50 }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  
  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
};

const PortofolioV7 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600?text=Project+Preview';
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050505] text-white' : 'bg-[#f0f2f5] text-slate-900'} font-sans selection:bg-purple-500 selection:text-white transition-colors duration-500 overflow-x-hidden`}>
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/20 blur-[120px] rounded-full" />
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] bg-pink-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
        <GlassCard className="px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-black bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            {cvData.name.split(' ')[0]}<span className="text-purple-500">.</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')}
              className="text-sm font-bold hover:text-purple-500 transition-colors uppercase"
            >
              {lang}
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? <Sparkles size={20} /> : <Layers size={20} />}
            </button>
          </div>
        </GlassCard>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-12"
          >
            {cvData.is_avatar && cvData.avatar && !avatarError ? (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <img 
                  src={cvData.avatar} 
                  alt={cvData.name} 
                  onError={() => setAvatarError(true)}
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                />
              </div>
            ) : (
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center border-4 border-white/20 shadow-2xl">
                <User size={80} className="text-white opacity-50" />
              </div>
            )}
          </motion.div>

          <ParallaxSection offset={30}>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-black mb-6 tracking-tighter"
            >
              {cvData.title[lang]}
            </motion.h1>
          </ParallaxSection>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed"
          >
            {cvData.summary[lang]}
          </motion.p>

          <div className="flex gap-6">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-bold shadow-lg shadow-purple-500/30 transition-all"
            >
              View Projects
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${cvData.contacts.email}`}
              className="px-8 py-4 bg-white/10 dark:bg-white/5 hover:bg-white/20 border border-white/20 rounded-2xl font-bold backdrop-blur-md transition-all"
            >
              Contact Me
            </motion.a>
          </div>
        </div>
      </section>

      {/* Skills / Tech Stack */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center tracking-tighter uppercase">
            Tech <span className="text-purple-500">Arsenal</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {(cvData.skills || []).map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="p-6 flex flex-col items-center justify-center text-center group">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Code className="text-purple-500" />
                  </div>
                  <span className="font-bold text-sm uppercase tracking-wider">{skill.name}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">Featured</h2>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase text-purple-500">Creations</h2>
            </div>
            <p className="text-slate-500 max-w-xs uppercase font-bold text-xs tracking-widest">
              Selected projects that showcase my technical expertise and creative problem solving.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {(cvData.projects || []).map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <GlassCard className="group h-full flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      onError={onImageError}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                      <div className="flex gap-4">
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-purple-500 transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                        <a href="#" className="p-3 bg-white/20 backdrop-blur-md rounded-full hover:bg-purple-500 transition-colors">
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-black mb-4 uppercase tracking-tight">{project.name}</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6 flex-1 line-clamp-3">
                      {project.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-purple-500/10 text-purple-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-purple-500/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 px-6 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-16 text-center tracking-tighter uppercase">
            Professional <span className="text-purple-500">Journey</span>
          </h2>
          <div className="space-y-12">
            {(cvData.experience || []).map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l-2 border-purple-500/30"
              >
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
                <div className="mb-2 flex flex-wrap items-center gap-4">
                  <span className="px-3 py-1 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                    {exp.period}
                  </span>
                  <h3 className="text-xl font-black uppercase">{exp.roles?.[0]?.title?.[lang]}</h3>
                </div>
                <h4 className="text-purple-500 font-bold mb-4 uppercase tracking-widest text-sm">{exp.company}</h4>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {exp.roles?.[0]?.description?.[lang]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-5xl md:text-9xl font-black mb-12 tracking-tighter uppercase opacity-10 absolute left-1/2 -translate-x-1/2 top-0 select-none whitespace-nowrap">
            GET IN TOUCH
          </h2>
          <div className="relative z-10">
            <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">Let's build something <br/><span className="text-purple-500 italic">extraordinary.</span></h3>
            <div className="flex justify-center gap-6 mb-12">
              {[
                { icon: <Github />, link: cvData.contacts.github },
                { icon: <Linkedin />, link: cvData.contacts.linkedin },
                { icon: <Mail />, link: `mailto:${cvData.contacts.email}` }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  target="_blank"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="p-4 bg-white/10 dark:bg-white/5 border border-white/20 rounded-2xl hover:bg-purple-500 hover:text-white transition-all"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
            <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-sm">
              © {new Date().getFullYear()} {cvData.name} — Crafted with passion
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV7;
