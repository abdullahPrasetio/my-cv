import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../hooks/useTheme';
import { 
  ArrowRight, Github, Linkedin, 
  MapPin, Globe, Rocket, 
  Code2, User2, Briefcase, Send 
} from 'lucide-react';

const PortofolioV10 = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const lang = i18n.language;
  const cvData = window.cvData;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef
  });

  // Calculate total sections for horizontal scroll
  // Sections: Hero, About, Skills, Experience, Projects, Contact
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83.33%"]);

  if (!cvData) return null;

  const onImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/800x600?text=Module+Preview';
  };

  const Section = ({ title, children, className = "", subtitle = "" }) => (
    <div className={`w-screen h-screen flex-shrink-0 flex flex-col justify-start md:justify-center px-6 md:px-24 pt-32 md:pt-0 relative overflow-hidden ${className}`}>
      {title && (
        <div className="absolute top-8 md:top-12 left-6 md:left-24 z-20">
          <h2 className="text-[10px] md:text-sm font-black uppercase tracking-[0.5em] opacity-30 mb-1 md:mb-2">{title}</h2>
          {subtitle && <p className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-20">{subtitle}</p>}
        </div>
      )}
      <div className="relative z-10 overflow-y-auto no-scrollbar md:overflow-visible max-h-full">
        {children}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className={`h-[600vh] ${theme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f8f9fa] text-[#1a1a1a]'} transition-colors duration-500`}>
      
      {/* Fixed Progress & Nav */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/10 z-[100]">
        <motion.div style={{ scaleX: scrollYProgress }} className="h-full bg-blue-600 origin-left" />
      </div>

      <nav className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-4 md:gap-6 px-6 md:px-8 py-3 md:py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full">
        <button onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} className="text-[10px] md:text-xs font-bold uppercase hover:text-blue-500 transition-colors">
          {lang}
        </button>
        <div className="w-px h-4 bg-white/10" />
        <button onClick={toggleTheme} className="text-[10px] md:text-xs font-bold uppercase hover:text-blue-500 transition-colors">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </nav>

      {/* Main Horizontal Container */}
      <div className="sticky top-0 h-screen w-full flex overflow-hidden">
        <motion.div style={{ x }} className="flex h-full w-[600vw]">
          
          {/* 1. Hero Slide */}
          <Section className="bg-gradient-to-br from-blue-600/5 to-transparent">
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="flex items-center gap-4 mb-6 md:mb-8">
                  <span className="w-8 md:w-12 h-px bg-blue-600" />
                  <span className="text-blue-500 font-black uppercase tracking-widest text-[10px] md:text-sm">Portfolio V.10</span>
                </div>
                <h1 className="text-4xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-6 md:mb-8">
                  {cvData.name.split(' ').map((name, i) => (
                    <span key={i} className="block">{name}</span>
                  ))}
                </h1>
                <p className="text-base md:text-2xl font-medium opacity-60 leading-tight mb-8 md:mb-12 max-w-2xl">
                  {cvData.title[lang]}
                </p>
                <div className="flex items-center gap-6 md:gap-8">
                  <div className="flex -space-x-3 md:-space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-600 flex items-center justify-center border-2 border-black">
                      <Rocket size={18} className="text-white" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-purple-600 flex items-center justify-center border-2 border-black">
                      <Code2 size={18} className="text-white" />
                    </div>
                  </div>
                  <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest opacity-40">
                    Scroll down to explore <br/> the horizontal journey
                  </div>
                </div>
              </motion.div>
            </div>
          </Section>

          {/* 2. About Slide */}
          <Section title="01. Identification" subtitle="Who am I?">
            <div className="max-w-6xl w-full mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 md:gap-24 items-center">
                <div className="order-2 lg:order-1">
                  <p className="text-sm md:text-2xl font-bold leading-relaxed tracking-tight mb-6 md:mb-8 opacity-80">
                    {cvData.summary[lang]}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-6">
                    <div className="flex items-center gap-3 md:gap-4 group">
                      <div className="p-2 md:p-3 bg-blue-600/10 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <MapPin size={18} />
                      </div>
                      <span className="text-[10px] md:text-lg font-bold uppercase tracking-widest opacity-60">{cvData.location}</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 group">
                      <div className="p-2 md:p-3 bg-blue-600/10 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Globe size={18} />
                      </div>
                      <span className="text-[10px] md:text-lg font-bold uppercase tracking-widest opacity-60">Remote Available</span>
                    </div>
                  </div>
                </div>
                <div className="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-none">
                    {cvData.is_avatar && cvData.avatar ? (
                      <div className="aspect-[4/5] lg:max-h-[60vh] rounded-[24px] md:rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
                        <img src={cvData.avatar} alt={cvData.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="aspect-[4/5] lg:max-h-[60vh] rounded-[24px] md:rounded-[40px] bg-blue-600/10 flex items-center justify-center border border-white/5">
                        <User2 size={60} className="opacity-10" />
                      </div>
                    )}
                    <div className="absolute -bottom-3 -right-3 md:-bottom-8 md:-right-8 w-20 h-20 md:w-40 md:h-40 bg-blue-600 rounded-full flex items-center justify-center text-white p-3 md:p-6 text-center font-black uppercase text-[7px] md:text-xs leading-tight rotate-12 shadow-xl z-10">
                      Certified Developer
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* 3. Skills Slide */}
          <Section title="02. Capabilities" subtitle="Tech Arsenal">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {cvData.skills.map((skill, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 md:p-8 bg-white/5 border border-white/10 rounded-[20px] md:rounded-[32px] hover:border-blue-500/50 transition-all group"
                >
                  <div className="text-blue-500 mb-3 md:mb-6 group-hover:scale-110 transition-transform">
                    <Code2 size={24} />
                  </div>
                  <h3 className="text-xs md:text-2xl font-black uppercase tracking-tight">{skill.name}</h3>
                  <div className="mt-2 md:mt-4 w-8 h-1 bg-blue-600/20 group-hover:w-full group-hover:bg-blue-600 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </Section>

          {/* 4. Experience Slide */}
          <Section title="03. History" subtitle="Career Path">
            <div className="flex gap-6 md:gap-12 overflow-x-auto pb-12 scrollbar-hide no-scrollbar">
              {cvData.experience.map((exp, i) => (
                <div key={i} className="min-w-[280px] md:min-w-[450px] p-6 md:p-12 bg-white/5 border border-white/10 rounded-[32px] md:rounded-[40px] relative">
                  <div className="text-[10px] md:text-sm font-black text-blue-500 uppercase tracking-widest mb-4 md:mb-6">{exp.period}</div>
                  <h3 className="text-xl md:text-4xl font-black uppercase tracking-tight mb-2">{exp.roles[0].title[lang]}</h3>
                  <div className="text-xs md:text-lg opacity-40 font-bold uppercase mb-4 md:mb-8">{exp.company}</div>
                  <p className="text-sm md:text-lg opacity-70 leading-relaxed">{exp.roles[0].description[lang]}</p>
                  <div className="absolute top-6 right-6 md:top-12 md:right-12 opacity-10">
                    <Briefcase size={32} />
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* 5. Projects Slide */}
          <Section title="04. Gallery" subtitle="Featured Works">
            <div className="flex gap-8 md:gap-12 overflow-x-auto pb-12 no-scrollbar">
              {cvData.projects.map((project, i) => (
                <div key={i} className="min-w-[280px] md:min-w-[600px] group">
                  <div className="aspect-video rounded-[24px] md:rounded-[40px] overflow-hidden mb-4 md:mb-8 relative">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      onError={onImageError}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 md:p-12">
                      <div className="flex flex-wrap gap-2 md:gap-4">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-3 py-1 md:px-4 md:py-2 bg-white/10 backdrop-blur-md rounded-full text-[8px] md:text-[10px] font-black uppercase">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl md:text-5xl font-black uppercase tracking-tighter mb-2 md:mb-4 flex items-center gap-3 md:gap-4">
                    {project.name} <ArrowRight className="w-4 h-4 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 transition-all" />
                  </h3>
                  <p className="text-sm md:text-lg opacity-60 line-clamp-2 max-w-xl">{project.description[lang]}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* 6. Contact Slide */}
          <Section title="05. Conclusion" subtitle="Say Hello">
            <div className="text-center">
              <h2 className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter leading-none mb-12">
                LET'S GO <span className="text-blue-600">BEYOND.</span>
              </h2>
              <div className="flex flex-wrap justify-center gap-6 mb-16">
                <a href={`mailto:${cvData.contacts.email}`} className="px-12 py-6 bg-blue-600 text-white rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center gap-4 text-xl">
                  Message Me <Send size={24} />
                </a>
              </div>
              <div className="flex justify-center gap-12">
                <a href={cvData.contacts.github} className="text-sm font-black uppercase tracking-widest hover:text-blue-500 transition-colors">GitHub</a>
                <a href={cvData.contacts.linkedin} className="text-sm font-black uppercase tracking-widest hover:text-blue-500 transition-colors">LinkedIn</a>
              </div>
              <p className="mt-24 text-[10px] font-bold uppercase tracking-[0.5em] opacity-20">
                Created with precision © {new Date().getFullYear()} {cvData.name}
              </p>
            </div>
          </Section>

        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      ` }} />
    </div>
  );
};

export default PortofolioV10;
