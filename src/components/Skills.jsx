import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Skills = () => {
  const { t } = useTranslation();
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <section id="skills" className="py-20 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.skills')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {cvData.skills.map((skill, index) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-slate-500">{skill.level}%</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="h-full bg-primary"
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
