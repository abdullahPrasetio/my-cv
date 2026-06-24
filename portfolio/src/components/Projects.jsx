import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Code } from 'lucide-react';

const ProjectCard = ({ project, index, lang, t }) => {
  const [imgError, setImgError] = useState(false);
  const hasLink = !!project.link;
  const Tag = hasLink ? motion.a : motion.div;
  const linkProps = hasLink
    ? { href: project.link, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Tag
      {...linkProps}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 block${hasLink ? ' cursor-pointer' : ''}`}
    >
      <div className="aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
        {!imgError && project.image ? (
          <img
            key={project.image}
            src={`${project.image}?v=${project.updated_at || ''}`}
            alt={project.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-600/20 flex items-center justify-center">
            <Code size={48} className="text-primary/40" />
          </div>
        )}
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-primary/10 text-primary rounded-xl">
            <Code size={24} />
          </div>
          <ExternalLink
            size={20}
            className={`transition-colors ${hasLink ? 'text-primary' : 'text-slate-300 dark:text-slate-700'}`}
          />
        </div>

        <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 line-clamp-3">
          {project.description[lang] || project.description['en']}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Tag>
  );
};

const Projects = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData || !cvData.projects?.length) return null;

  return (
    <section id="projects" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.projects')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cvData.projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              lang={lang}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
