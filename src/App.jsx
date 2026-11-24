import { useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'motion/react';
import ScrollProgress from './components/ScrollProgress.jsx';
import Preloader from './components/Preloader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Projects from './components/Projects.jsx';
import StackAndExperience from './components/StackAndExperience.jsx';
import ContactFooter from './components/ContactFooter.jsx';

function getInitialTheme() {
  if (typeof document !== 'undefined' && document.documentElement.dataset.theme !== 'dark') {
    return 'light';
  }
  return 'dark';
}

export default function App() {
  const prefersReduced = useReducedMotion();
  const [theme, setTheme] = useState(getInitialTheme);
  const [navOpen, setNavOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [finished, setFinished] = useState(false);

  // Reduced-motion visitors bypass the curtain preloader immediately.
  const ready = opened || prefersReduced;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.dataset.theme = 'dark';
    } else {
      delete root.dataset.theme;
    }
    try {
      localStorage.setItem('folio-theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-[100dvh] bg-canvas text-ink-primary">
        {!prefersReduced && !finished && (
          <Preloader
            onOpen={() => setOpened(true)}
            onDone={() => setFinished(true)}
          />
        )}

        <ScrollProgress />
        <div className="paper-grain" aria-hidden="true" />

        <Navbar
          isOpen={navOpen}
          setIsOpen={setNavOpen}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <main id="main-content">
          <Hero ready={ready} onOpenInquiry={() => setInquiryOpen(true)} />
          <About />
          <Projects />
          <StackAndExperience />
        </main>

        <ContactFooter
          inquiryOpen={inquiryOpen}
          setInquiryOpen={setInquiryOpen}
        />
      </div>
    </MotionConfig>
  );
}
