import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('nav.about')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-primary">Professional Summary</h3>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {cvData.summary[lang] || cvData.summary['en']}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-2xl border border-slate-100 dark:border-slate-800"
          >
            <h3 className="text-2xl font-bold mb-6">Education</h3>
            <div className="space-y-8">
              {cvData.education.map((edu, index) => (
                <div key={index} className="relative pl-6 border-l-2 border-primary/30">
                  <div className="absolute -left-[5px] top-1 h-2 w-2 bg-primary rounded-full"></div>
                  <h4 className="font-bold text-lg">{edu.institution}</h4>
                  <p className="text-primary font-medium text-sm">{edu.degree}</p>
                  <p className="text-slate-500 text-xs mt-1">{edu.period}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
