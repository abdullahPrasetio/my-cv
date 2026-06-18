import { useTranslation } from 'react-i18next';
import { Mail, Linkedin, Youtube, Github } from 'lucide-react';
import ContactForm from './ContactForm';

const Contact = () => {
  const { t } = useTranslation();
  const cvData = window.cvData;

  if (!cvData) return null;

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('contact_form.title')}</h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-8"></div>
        </div>

        <ContactForm variant="v1" />

        <footer className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="flex justify-center space-x-8 mb-8 text-slate-400">
            <a href={cvData.contacts.github} target="_blank" className="hover:text-primary transition-colors"><Github size={24} /></a>
            <a href={cvData.contacts.linkedin} target="_blank" className="hover:text-primary transition-colors"><Linkedin size={24} /></a>
            <a href={cvData.contacts.youtube} target="_blank" className="hover:text-primary transition-colors"><Youtube size={24} /></a>
            <a href={`mailto:${cvData.contacts.email}`} className="hover:text-primary transition-colors"><Mail size={24} /></a>
          </div>
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} {cvData.name}. All rights reserved.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
