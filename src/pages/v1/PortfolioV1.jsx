import Navbar from '../../components/Navbar';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Skills from '../../components/Skills';
import Experience from '../../components/Experience';
import Projects from '../../components/Projects';
import Contact from '../../components/Contact';

const PortfolioV1 = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </div>
  );
};

export default PortfolioV1;
