import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { 
  Gamepad2, Terminal, Cpu, Code2, 
  Github, Linkedin, Mail, Trophy, 
  Star, Heart, Zap, Play, ChevronRight 
} from 'lucide-react';

const RetroBlock = ({ children, color = "cyan", className = "" }) => {
  const colorMap = {
    cyan: "border-cyan-400 text-cyan-400 shadow-[4px_4px_0px_0px_#22d3ee] hover:shadow-none",
    magenta: "border-magenta-500 text-magenta-500 shadow-[4px_4px_0px_0px_#d946ef] hover:shadow-none",
    green: "border-green-400 text-green-400 shadow-[4px_4px_0px_0px_#4ade80] hover:shadow-none",
    yellow: "border-yellow-400 text-yellow-400 shadow-[4px_4px_0px_0px_#facc15] hover:shadow-none",
  };

  return (
    <div className={`border-4 bg-black p-4 transition-all active:translate-x-1 active:translate-y-1 ${colorMap[color]} ${className}`}>
      {children}
    </div>
  );
};

const PortofolioV8 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [avatarError, setAvatarError] = useState(false);
  const [score, setScore] = useState(0);
  const lang = i18n.language;
  const cvData = window.cvData;

  useEffect(() => {
    const interval = setInterval(() => {
      setScore(prev => prev + Math.floor(Math.random() * 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300/000000/00FFFF?text=INSERT+COIN';
  };

  return (
    <div className={`min-h-screen bg-black text-white font-mono selection:bg-cyan-500 selection:text-black transition-colors duration-300 overflow-x-hidden`}>
      
      {/* Scanline Effect Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Top UI Bar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-black border-b-4 border-white p-2 flex justify-between items-center text-[10px] md:text-sm">
        <div className="flex gap-4 md:gap-8 overflow-hidden">
          <div className="flex items-center gap-2">
            <Trophy size={14} className="text-yellow-400" />
            <span className="text-yellow-400">HI-SCORE: 999999</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={14} className="text-cyan-400" />
            <span className="text-cyan-400 uppercase">SCORE: {score.toString().padStart(6, '0')}</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className="hover:text-cyan-400">
            [{lang.toUpperCase()}]
          </button>
          <button onClick={toggleTheme} className="hover:text-magenta-500 uppercase">
            [{theme}]
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-block px-4 py-1 bg-green-500 text-black font-bold mb-4 animate-pulse">
              PLAYER 1 READY
            </div>
            <motion.h1 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tight leading-none text-cyan-400 [text-shadow:4px_4px_0px_#d946ef]"
            >
              {cvData.name}
            </motion.h1>
            <div className="text-lg md:text-2xl mb-8 uppercase text-white/80 leading-relaxed max-w-2xl">
              &gt; {cvData.title[lang]} <br/>
              &gt; {cvData.summary[lang]}
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <RetroBlock color="cyan">
                <a href="#projects" className="flex items-center gap-2 uppercase font-bold px-4">
                  <Play size={16} fill="currentColor" /> START GAME
                </a>
              </RetroBlock>
              <RetroBlock color="magenta">
                <a href={`mailto:${cvData.contacts.email}`} className="flex items-center gap-2 uppercase font-bold px-4">
                  <Mail size={16} /> CONTACT
                </a>
              </RetroBlock>
            </div>
          </div>

          <div className="w-full md:w-80 shrink-0">
            <RetroBlock color="green" className="p-2 aspect-square relative group overflow-hidden">
              {cvData.is_avatar && cvData.avatar && !avatarError ? (
                <img 
                  src={cvData.avatar} 
                  alt={cvData.name}
                  onError={() => setAvatarError(true)}
                  className="w-full h-full object-cover grayscale brightness-125 contrast-150 [image-rendering:pixelated]"
                />
              ) : (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <Gamepad2 size={80} />
                </div>
              )}
              <div className="absolute inset-0 bg-green-500/20 group-hover:bg-transparent transition-colors" />
            </RetroBlock>
          </div>
        </div>
      </section>

      {/* Stats / Skills Grid */}
      <section className="py-12 px-4 md:px-8 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black mb-12 text-center uppercase text-magenta-500">
            [ POWER-UPS & SKILLS ]
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cvData.skills.map((skill, i) => (
              <RetroBlock key={i} color={i % 2 === 0 ? "cyan" : "green"} className="group">
                <div className="flex items-center gap-3">
                  <Zap size={16} className="shrink-0 group-hover:animate-bounce" />
                  <span className="uppercase text-xs md:text-sm font-bold truncate">{skill.name}</span>
                </div>
              </RetroBlock>
            ))}
          </div>
        </div>
      </section>

      {/* Level Select / Projects */}
      <section id="projects" className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black mb-16 text-center uppercase text-cyan-400">
            [ STAGE SELECT ]
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {cvData.projects.map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <RetroBlock color={i % 2 === 0 ? "magenta" : "cyan"} className="p-0 overflow-hidden">
                  <div className="aspect-video relative overflow-hidden border-b-4 border-inherit">
                    <img 
                      src={project.image} 
                      alt={project.name}
                      onError={onImageError}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 [image-rendering:pixelated]"
                    />
                    <div className="absolute top-2 left-2 bg-black px-2 py-1 text-[10px] border-2 border-inherit uppercase font-bold">
                      LVL. {i + 1}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl md:text-2xl font-black mb-4 uppercase text-white group-hover:text-inherit transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 mb-6 leading-relaxed">
                      {project.description[lang]}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] bg-white text-black px-2 py-0.5 font-bold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </RetroBlock>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quest Logs / Experience */}
      <section className="py-24 px-4 md:px-8 bg-black border-y-4 border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-black mb-16 text-center uppercase text-yellow-400">
            [ QUEST LOGS ]
          </h2>
          <div className="space-y-12">
            {cvData.experience.map((exp, i) => (
              <div key={i} className="flex gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-4 h-4 bg-green-400 border-2 border-white shadow-[0_0_10px_#4ade80]" />
                  <div className="w-1 flex-1 bg-white/20 my-2" />
                </div>
                <div className="flex-1 pb-12">
                  <div className="text-cyan-400 text-xs mb-2 uppercase font-bold">{exp.period}</div>
                  <h3 className="text-lg md:text-xl font-black uppercase text-white mb-2">{exp.roles[0].title[lang]} @ {exp.company}</h3>
                  <p className="text-sm text-white/60 leading-relaxed italic">
                    &gt; {exp.roles[0].description[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boss Fight / Contact Footer */}
      <footer className="py-24 px-4 md:px-8 text-center bg-black">
        <div className="max-w-4xl mx-auto">
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="text-4xl md:text-7xl font-black uppercase mb-16 text-red-500 [text-shadow:4px_4px_0px_#ffffff]"
          >
            GAME OVER? <br/>
            CONTINUE!
          </motion.div>
          
          <div className="flex justify-center gap-8 mb-16">
            <a href={cvData.contacts.github} className="text-cyan-400 hover:text-white transition-colors">
              <Github size={48} />
            </a>
            <a href={cvData.contacts.linkedin} className="text-magenta-500 hover:text-white transition-colors">
              <Linkedin size={48} />
            </a>
            <a href={`mailto:${cvData.contacts.email}`} className="text-green-400 hover:text-white transition-colors">
              <Mail size={48} />
            </a>
          </div>

          <div className="space-y-4">
            <div className="text-xs uppercase text-white/40 tracking-widest">
              Insert Coin to hire {cvData.name.split(' ')[0]}
            </div>
            <div className="flex items-center justify-center gap-2 text-magenta-500">
              <Heart size={16} fill="currentColor" className="animate-pulse" />
              <Heart size={16} fill="currentColor" className="animate-pulse delay-75" />
              <Heart size={16} fill="currentColor" className="animate-pulse delay-150" />
            </div>
            <div className="text-[10px] text-white/20 uppercase pt-8">
              © {new Date().getFullYear()} {cvData.name}. All levels completed.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortofolioV8;
