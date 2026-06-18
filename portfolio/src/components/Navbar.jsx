import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'id' : 'en');
  };

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.experience'), href: '#experience' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 font-bold text-xl tracking-tighter">
            WALUYO<span className="text-primary">.</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex items-center space-x-4 border-l pl-4 border-slate-200 dark:border-slate-800">
              <button onClick={toggleLanguage} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors flex items-center space-x-1">
                <Globe size={18} />
                <span className="text-xs font-bold uppercase">{i18n.language}</span>
              </button>
              <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-colors">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium hover:bg-slate-100 dark:hover:bg-slate-900 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button 
              onClick={() => { toggleLanguage(); setIsOpen(false); }}
              className="w-full text-left px-3 py-2 text-base font-medium flex items-center space-x-2"
            >
              <Globe size={18} />
              <span>Switch to {i18n.language === 'en' ? 'Indonesian' : 'English'}</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
