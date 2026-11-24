import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { CodeSimple, Moon, Sun } from '@phosphor-icons/react';
import Magnetic from './Magnetic.jsx';
import { EDITORIAL_EASE, SPRING_TACTILE } from '../lib/motion.js';

const CHAPTERS = [
  { id: 'hero', index: '01', label: 'Overview', href: '#hero' },
  { id: 'about', index: '02', label: 'Practice', href: '#about' },
  { id: 'project', index: '03', label: 'Work', href: '#project' },
  { id: 'experience', index: '04', label: 'Stack & Roles', href: '#experience' },
  { id: 'contact', index: '05', label: 'Contact', href: '#contact' },
];

export default function Navbar({ isOpen, setIsOpen, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const firstLinkRef = useRef(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 36);
  });

  useEffect(() => {
    const updateActiveChapter = () => {
      const anchor = window.innerHeight * 0.34;
      let current = CHAPTERS[0].id;
      for (const chapter of CHAPTERS) {
        const el = document.getElementById(chapter.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor) {
          current = chapter.id;
        }
      }
      setActiveId(current);
    };

    updateActiveChapter();
    window.addEventListener('scroll', updateActiveChapter, { passive: true });
    window.addEventListener('resize', updateActiveChapter);
    return () => {
      window.removeEventListener('scroll', updateActiveChapter);
      window.removeEventListener('resize', updateActiveChapter);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    const handlePointerDown = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isOpen, setIsOpen]);

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => firstLinkRef.current?.focus());
      } else {
        requestAnimationFrame(() => triggerRef.current?.focus());
      }
      return next;
    });
  };

  const activeChapter =
    CHAPTERS.find((c) => c.id === activeId) ?? CHAPTERS[0];
  const isDark = theme === 'dark';

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-[10px] focus:bg-accent focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-accent-fg"
      >
        Skip to content
      </a>

      <header className="fixed inset-x-0 top-0 z-30 pointer-events-none">
        <div className="mx-auto flex max-w-[1320px] items-start justify-between gap-3 px-4 pt-4 sm:px-8 sm:pt-5 lg:px-12">
          {/* Glass surface 1 of 2 (R-10 dose cap): Minimal studio wordmark at top, frosted pill on scroll */}
          <a
            href="#hero"
            className={`pointer-events-auto inline-flex min-h-[44px] items-center gap-2.5 rounded-full px-3.5 py-2 text-sm text-ink-primary spring-transition active:scale-[0.98] ${
              scrolled
                ? 'border border-border-subtle bg-canvas/85 backdrop-blur-md shadow-[0_12px_28px_-14px_rgba(0,0,0,0.35)]'
                : 'border border-transparent bg-transparent'
            }`}
          >
            <span className="font-display text-[0.95rem] font-bold tracking-[0.02em] uppercase">
              PRIAMITRA
            </span>
            {scrolled && (
              <>
                <span
                  aria-hidden="true"
                  className="hidden h-3.5 w-px bg-border-subtle sm:inline-block"
                />
                <span className="hidden overflow-hidden font-mono text-[0.75rem] text-ink-secondary sm:inline-flex sm:items-center">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeChapter.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: EDITORIAL_EASE }}
                      className="inline-flex items-center gap-1.5"
                    >
                      <span className="text-accent">{activeChapter.index}</span>
                      <span>{activeChapter.label}</span>
                    </motion.span>
                  </AnimatePresence>
                </span>
              </>
            )}
          </a>

          <div className="pointer-events-auto flex items-start gap-2.5">
            <Magnetic strength={0.14}>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                transition={SPRING_TACTILE}
                onClick={onToggleTheme}
                aria-label={
                  isDark
                    ? 'Switch to Daylight light theme'
                    : 'Switch to Nocturne Studio dark theme'
                }
                aria-pressed={isDark}
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-full border border-border-strong bg-plate/90 px-3.5 py-2 text-[0.875rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -45, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 45, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
                    aria-hidden="true"
                    className="inline-flex items-center text-accent"
                  >
                    {isDark ? (
                      <Sun size={17} weight="light" />
                    ) : (
                      <Moon size={17} weight="light" />
                    )}
                  </motion.span>
                </AnimatePresence>
                <span className="hidden font-mono text-[0.75rem] sm:inline">
                  {isDark ? 'Light' : 'Dark'}
                </span>
              </motion.button>
            </Magnetic>

            {/* Glass surface 2 of 2 (R-10 dose cap): High-contrast crisp Menu <> pill that expands into chapter sheet */}
            <div ref={containerRef} className="relative">
              <Magnetic strength={isOpen ? 0 : 0.16}>
                <motion.div
                  layout
                  transition={SPRING_TACTILE}
                  className={`spring-transition ${
                    isOpen
                      ? 'w-[228px] rounded-[18px] border border-border-strong bg-plate/95 text-ink-primary backdrop-blur-md shadow-[0_20px_44px_-12px_rgba(0,0,0,0.45)]'
                      : 'w-[126px] rounded-full bg-ink-primary text-canvas shadow-[0_10px_24px_-12px_rgba(0,0,0,0.35)]'
                  }`}
                >
                  <motion.button
                    ref={triggerRef}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING_TACTILE}
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                    aria-controls="compact-nav-menu"
                    aria-label={
                      isOpen ? 'Close navigation menu' : 'Open navigation menu'
                    }
                    className={`flex min-h-[44px] w-full items-center justify-between gap-2.5 rounded-[inherit] px-5 py-2.5 text-[0.9375rem] font-semibold spring-transition ${
                      isOpen
                        ? 'text-ink-primary hover:text-accent'
                        : 'text-canvas hover:opacity-90'
                    }`}
                  >
                    <span>Menu</span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.26, ease: EDITORIAL_EASE }}
                      className={isOpen ? 'text-accent' : 'text-canvas'}
                    >
                      <CodeSimple size={17} weight="regular" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.nav
                        id="compact-nav-menu"
                        aria-label="Primary"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
                        className="pb-2"
                      >
                        <ul className="border-t border-border-subtle px-2 pt-1.5">
                          {CHAPTERS.filter((c) => c.id !== 'hero').map(
                            (item, idx) => {
                              const isCurrent = item.id === activeId;
                              return (
                                <motion.li
                                  key={item.id}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    duration: 0.24,
                                    delay: idx * 0.035,
                                    ease: EDITORIAL_EASE,
                                  }}
                                >
                                  <a
                                    ref={idx === 0 ? firstLinkRef : undefined}
                                    href={item.href}
                                    aria-current={isCurrent ? 'location' : undefined}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex min-h-[44px] items-center justify-between rounded-[10px] px-3 text-[0.9375rem] spring-transition hover:bg-surface hover:text-accent ${
                                      isCurrent
                                        ? 'bg-surface font-semibold text-ink-primary'
                                        : 'font-medium text-ink-primary'
                                    }`}
                                  >
                                    <span className="inline-flex items-center gap-2.5">
                                      <span className="font-mono text-[0.75rem] text-ink-secondary">
                                        {item.index}
                                      </span>
                                      <span>{item.label}</span>
                                    </span>
                                    {isCurrent && (
                                      <span
                                        aria-hidden="true"
                                        className="h-1.5 w-1.5 rounded-full bg-accent"
                                      />
                                    )}
                                  </a>
                                </motion.li>
                              );
                            }
                          )}
                        </ul>
                      </motion.nav>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
