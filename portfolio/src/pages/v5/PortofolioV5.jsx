import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Folder, FileJson, FileText, ChevronDown,
  Terminal, Github, Linkedin, Mail, Code, Files
} from 'lucide-react';

const PortofolioV5 = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('readme.md');
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [avatarError, setAvatarError] = useState(false);
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  const tabs = [
    { id: 'readme.md', icon: <FileText size={14} className="text-blue-400" /> },
    { id: 'experience.json', icon: <FileJson size={14} className="text-yellow-400" /> },
    { id: 'projects.js', icon: <Code size={14} className="text-emerald-400" /> }
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-[#d4d4d4] font-mono text-sm flex flex-col overflow-hidden">
      {/* Top Bar */}
      <div className="h-10 bg-[#323233] flex items-center px-4 justify-between select-none flex-none">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="text-[#858585] text-[10px] md:text-xs flex items-center gap-4">
          <span className="hidden md:inline">{cvData.name.toLowerCase().replace(/\s/g, '-')}-workspace</span>
          <button 
            onClick={() => i18n.changeLanguage(lang === 'en' ? 'id' : 'en')} 
            className="hover:text-white uppercase font-bold px-2 py-0.5 bg-[#4d4d4d] rounded transition-colors"
          >
            {lang}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Icons */}
        <div className="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 text-[#858585] flex-none">
          <Files size={24} className="text-white cursor-pointer" />
          <Github size={24} className="hover:text-white cursor-pointer transition-colors" onClick={() => window.open(cvData.contacts.github, '_blank')} />
          <Linkedin size={24} className="hover:text-white cursor-pointer transition-colors" onClick={() => window.open(cvData.contacts.linkedin, '_blank')} />
          <Mail size={24} className="hover:text-white cursor-pointer transition-colors" onClick={() => window.open(`mailto:${cvData.contacts.email}`)} />
        </div>

        {/* Explorer */}
        <div className={`${isExplorerOpen ? 'w-64' : 'w-0'} bg-[#252526] border-r border-[#333333] transition-all duration-300 overflow-hidden flex flex-col shrink-0`}>
          <div className="h-10 flex items-center px-4 text-[10px] font-bold tracking-wider text-[#cccccc] uppercase shrink-0">EXPLORER</div>
          <div className="px-2 py-2 overflow-y-auto">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-[#2a2d2e] p-1 rounded" onClick={() => setIsExplorerOpen(!isExplorerOpen)}>
              <ChevronDown size={16} />
              <Folder size={16} className="text-blue-400" />
              <span className="font-bold text-[#cccccc] uppercase tracking-wider text-[10px]">PORTFOLIO</span>
            </div>
            <div className="ml-6 mt-1 flex flex-col gap-1">
              {tabs.map(tab => (
                <div 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 cursor-pointer p-1 rounded text-xs transition-colors ${activeTab === tab.id ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                >
                  {tab.icon}
                  <span>{tab.id}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e] overflow-hidden relative">
          {/* Tabs Navigation */}
          <div className="flex bg-[#252526] overflow-x-auto no-scrollbar shrink-0">
            {tabs.map(tab => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer border-r border-[#333333] border-t-2 transition-all min-w-fit shrink-0 ${activeTab === tab.id ? 'bg-[#1e1e1e] border-t-blue-500 text-white' : 'bg-[#2d2d2d] border-t-transparent text-[#858585] hover:bg-[#2b2b2b]'}`}
              >
                {tab.icon}
                <span className="text-xs">{tab.id}</span>
              </div>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-12 text-[#d4d4d4] custom-scrollbar">
            {activeTab === 'readme.md' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-8">
                <h1 className="text-3xl md:text-5xl font-bold border-b border-[#333333] pb-6 mb-8 flex flex-col md:flex-row md:items-center gap-6">
                  {cvData.is_avatar && cvData.avatar && !avatarError && (
                    <img src={cvData.avatar} alt="avatar" onError={() => setAvatarError(true)} className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border-2 border-[#569cd6] shadow-lg" />
                  )}
                  <span className="tracking-tight">{cvData.name}</span>
                </h1>
                
                <div className="space-y-4">
                  <p className="text-[#569cd6] text-xl font-bold italic">&gt; {cvData.title[lang]}</p>
                  <div className="bg-[#2d2d2d] p-6 rounded-lg text-[#ce9178] border border-[#333333] leading-relaxed shadow-inner">
                    <span className="text-[#6a9955] block mb-2">/** @summary */</span>
                    "{cvData.summary[lang]}"
                  </div>
                </div>
                
                <div className="pt-8">
                  <h2 className="text-2xl font-bold mb-6 text-[#569cd6] flex items-center gap-2">
                    <span className="text-[#858585]">##</span> Skills.tech
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {(cvData.skills || []).map((skill, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#252526] rounded-md text-[#4ec9b0] text-sm border border-[#333333] hover:border-[#4ec9b0] transition-colors cursor-default">
                        `{skill.name}`
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'experience.json' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl font-mono">
                <pre className="text-[#d4d4d4] text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  <span className="text-[#d7ba7d]">"experience"</span>: <span className="text-[#ffd700]">[</span>
                  {(cvData.experience || []).map((exp, i) => (
                    <div key={i} className="pl-4 md:pl-8 my-4 border-l border-[#333333]/50">
                      <span className="text-[#c586c0]">{`{`}</span>
                      <div className="pl-6 py-1">
                        <span className="text-[#9cdcfe]">"company"</span>: <span className="text-[#ce9178]">"{exp.company}"</span>,
                        <br/>
                        <span className="text-[#9cdcfe]">"role"</span>: <span className="text-[#ce9178]">"{exp.roles?.[0]?.title?.[lang]}"</span>,
                        <br/>
                        <span className="text-[#9cdcfe]">"period"</span>: <span className="text-[#ce9178]">"{exp.roles?.[0]?.period}"</span>,
                        <br/>
                        <span className="text-[#9cdcfe]">"description"</span>: <span className="text-[#ce9178]">"{exp.roles?.[0]?.description?.[lang]}"</span>
                      </div>
                      <span className="text-[#c586c0]">{`}`}</span>{i < cvData.experience.length - 1 ? ',' : ''}
                    </div>
                  ))}
                  <span className="text-[#ffd700]">]</span>
                </pre>
              </motion.div>
            )}

            {activeTab === 'projects.js' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl font-mono">
                <div className="text-[#569cd6] mb-8 text-base md:text-lg">const <span className="text-[#4fc1ff]">featuredProjects</span> = [</div>
                <div className="space-y-10 pl-6 border-l-2 border-[#333333] ml-2">
                  {(cvData.projects || []).map((project, i) => {
                    const Tag = project.link ? 'a' : 'div';
                    const linkProps = project.link ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' } : {};
                    return (
                    <Tag {...linkProps} key={i} className={`relative group block${project.link ? ' cursor-pointer' : ''}`}>
                      <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-[#1e1e1e] border-2 border-[#569cd6] group-hover:bg-[#569cd6] transition-colors"></div>
                      <div className="text-[#c586c0] font-bold">{`{`}</div>
                      <div className="pl-6 space-y-2 py-2 border-l border-[#333333]/30">
                        <div><span className="text-[#9cdcfe]">name</span>: <span className="text-[#ce9178]">'{project.name}'</span>,</div>
                        <div><span className="text-[#9cdcfe]">description</span>: <span className="text-[#ce9178]">'{project.description[lang]}'</span>,</div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[#9cdcfe]">tags</span>: <span className="text-[#ffd700]">[</span>
                          {project.tags.map((t, idx) => (
                            <span key={idx} className="text-[#ce9178]">'{t}'{idx < project.tags.length - 1 ? ', ' : ''}</span>
                          ))}
                          <span className="text-[#ffd700]">]</span>
                        </div>
                      </div>
                      <div className="text-[#c586c0] font-bold">{`}`}{i < cvData.projects.length - 1 ? ',' : ''}</div>
                    </Tag>
                    );
                  })}
                </div>
                <div className="text-[#569cd6] mt-8 text-base md:text-lg">];</div>
              </motion.div>
            )}
          </div>
          
          {/* Status Bar */}
          <div className="h-6 bg-[#007acc] text-white text-[10px] flex items-center px-4 justify-between shrink-0 select-none">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 hover:bg-white/10 px-1 cursor-default"><Terminal size={10} /> {activeTab}</span>
              <span className="hidden md:inline hover:bg-white/10 px-1 cursor-default">Ln 1, Col 1</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:bg-white/10 px-1 cursor-default uppercase">{lang}</span>
              <span className="hidden md:inline hover:bg-white/10 px-1 cursor-default">UTF-8</span>
              <span className="bg-[#27c93f] px-2 font-bold">READY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortofolioV5;
