import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { EDITORIAL_EASE, REVEAL_UP, VIEWPORT_ONCE } from '../lib/motion.js';

const PILLARS = [
  { id: '01', label: 'Frontend & UI Architecture' },
  { id: '02', label: 'RESTful API & Backend Systems' },
  { id: '03', label: 'Relational Data & Caching' },
  { id: '04', label: 'Cloud & Container Infrastructure' },
  { id: '05', label: 'Clean Code & Maintainability' },
];

export default function About() {
  const sectionRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const markRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [-14, prefersReduced ? -14 : 76]
  );
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 0 : -18, prefersReduced ? 0 : 18]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className="w-full scroll-mt-16 border-b border-border-subtle bg-canvas text-ink-primary"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={REVEAL_UP}
        className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-4 pt-20 pb-16 sm:px-8 sm:pt-26 sm:pb-24 md:grid-cols-12 md:gap-8 lg:min-h-[650px] lg:gap-10 lg:px-12 lg:pt-28 lg:pb-26"
      >
        <div className="flex flex-col justify-between gap-10 md:col-span-4 lg:col-span-3">
          <h2
            id="about-heading"
            className="font-serif text-[clamp(1.95rem,2.9vw,2.6rem)] leading-[1.08] font-normal tracking-[-0.02em] text-ink-primary"
          >
            About <span className="italic text-pine">Me</span>
          </h2>

          <div className="hidden md:block" aria-hidden="true">
            <motion.svg
              style={{ rotate: markRotate }}
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              className="text-accent"
            >
              <line
                x1="22"
                y1="9"
                x2="22"
                y2="35"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <line
                x1="9"
                y1="22"
                x2="35"
                y2="22"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
              />
              <circle cx="22" cy="8" r="4.8" fill="currentColor" />
              <circle cx="22" cy="36" r="4.8" fill="currentColor" />
              <circle cx="8" cy="22" r="4.8" fill="currentColor" />
              <circle cx="36" cy="22" r="4.8" fill="currentColor" />
            </motion.svg>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-16 md:col-span-8 lg:col-span-4 lg:gap-24">
          <p className="max-w-[38ch] text-[0.9rem] leading-[1.65] text-ink-secondary sm:text-[0.9375rem]">
            Informatics Engineering graduate from Universitas Pasundan, Bandung,
            and Bangkit Academy 2024 Cloud Computing alumnus. Currently
            Full-Stack Engineer Intern at{' '}
            <span className="font-medium text-ink-primary">
              PT Bali Towerindo Sentra Tbk
            </span>{' '}
            building web applications with{' '}
            <span className="font-medium text-ink-primary">
              Vue.js, React, TypeScript, Laravel, and Node.js
            </span>
            .
          </p>

          <ol className="w-full max-w-[320px]">
            {PILLARS.map((item, idx) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT_ONCE}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.05,
                  ease: EDITORIAL_EASE,
                }}
                className="flex items-center gap-3.5 border-b border-border-subtle py-3 text-[0.875rem] font-medium text-ink-primary"
              >
                <span className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-accent font-mono text-[0.65rem] font-bold text-accent-fg">
                  {item.id}
                </span>
                <span>{item.label}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.6, delay: 0.08, ease: EDITORIAL_EASE }}
          className="md:col-span-12 lg:col-span-5"
        >
          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden border border-border-subtle bg-surface lg:mr-0 lg:ml-auto">
            <motion.img
              src="/about-workspace.webp"
              alt="Minimalist developer workspace with matte mechanical keyboard, green clothbound notebook, and smoked glass"
              width={800}
              height={1000}
              loading="lazy"
              decoding="async"
              style={{ y: imageY, scale: prefersReduced ? 1 : 1.06 }}
              className="h-full w-full object-cover select-none"
            />
          </figure>
        </motion.div>
      </motion.div>
    </section>
  );
}
