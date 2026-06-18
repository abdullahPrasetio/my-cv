import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav": {
        "home": "Home",
        "about": "About",
        "skills": "Skills",
        "experience": "Experience",
        "projects": "Projects",
        "education": "Education",
        "contact": "Contact"
      },
      "hero": {
        "greeting": "Hi, I'm",
        "location": "Based in",
        "hire_me": "Hire Me",
        "download_cv": "Download CV"
      },
      "contact_form": {
        "title": "Ready for your next breakthrough?",
        "name": "Full Name",
        "email": "Email Address",
        "message": "How can I help you?",
        "send": "Send Message"
      }
    }
  },
  id: {
    translation: {
      "nav": {
        "home": "Beranda",
        "about": "Tentang",
        "skills": "Keahlian",
        "experience": "Pengalaman",
        "projects": "Proyek",
        "education": "Pendidikan",
        "contact": "Kontak"
      },
      "hero": {
        "greeting": "Halo, saya",
        "location": "Berdiam di",
        "hire_me": "Hubungi Saya",
        "download_cv": "Unduh CV"
      },
      "contact_form": {
        "title": "Siap untuk terobosan berikutnya?",
        "name": "Nama Lengkap",
        "email": "Alamat Email",
        "message": "Bagaimana saya bisa membantu Anda?",
        "send": "Kirim Pesan"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
