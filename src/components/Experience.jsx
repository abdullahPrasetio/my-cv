import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.experience')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div className="space-y-12">
          {cvData.experience.map((exp, expIndex) => (
            <div key={exp.company} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
              <div className="absolute -left-[11px] top-0 p-1 bg-primary text-white rounded-full">
                <Briefcase size={16} />
              </div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: expIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-primary mb-1">{exp.company}</h3>
                
                <div className="space-y-6 mt-4">
                  {exp.roles.map((role, roleIndex) => (
                    <div key={roleIndex} className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <h4 className="text-lg font-bold">{role.title[lang] || role.title['en']}</h4>
                        <span className="text-sm font-medium px-3 py-1 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 md:mt-0 w-fit">
                          {role.period}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400">
                        {role.description[lang] || role.description['en']}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
