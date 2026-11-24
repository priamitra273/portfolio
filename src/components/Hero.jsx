import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { createScope, createTimeline, cubicBezier, stagger } from 'animejs';
import { ArrowUpRight, Check, Copy } from '@phosphor-icons/react';
import Magnetic from './Magnetic.jsx';
import { SPRING_MAGNETIC, SPRING_TACTILE } from '../lib/motion.js';

const DISPLAY_NAME = 'MOCH PRIAMITRA';
const FULL_NAME = 'Moch Priamitra Nur Alif';
const EMAIL_ADDRESS = 'pria93533@gmail.com';

const NO_POINTER = -9999;
const WAVE_RADIUS = 160;
const WAVE_LIFT = 12;

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/priamitra273' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/priamitranur/' },
];

// Outer span belongs to the Anime.js intro; inner span handles pointer wave lift via Motion.
function HoverChar({ char, pointerX, enabled }) {
  const ref = useRef(null);
  const rawY = useMotionValue(0);
  const y = useSpring(rawY, SPRING_MAGNETIC);

  useMotionValueEvent(pointerX, 'change', (px) => {
    if (!enabled || !ref.current) return;
    if (px === NO_POINTER) {
      rawY.set(0);
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const dist = Math.abs(px - (rect.left + rect.width / 2));
    const falloff = Math.max(0, 1 - dist / WAVE_RADIUS);
    rawY.set(-(falloff * falloff) * WAVE_LIFT);
  });

  return (
    <span className="hero-char inline-block will-change-transform">
      <motion.span ref={ref} style={{ y }} className="inline-block">
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    </span>
  );
}

export default function Hero({ ready = true, onOpenInquiry }) {
  const [copied, setCopied] = useState(false);
  const heroRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 48]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.85], [1, prefersReduced ? 1 : 0.25]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : 24]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, prefersReduced ? 1 : 1.035]);
  const sideY = useTransform(scrollYProgress, [0, 1], [0, prefersReduced ? 0 : -18]);
  const scrollLineScaleY = useTransform(scrollYProgress, [0, 0.6], [1, prefersReduced ? 1 : 1.65]);

  const rawParallaxX = useMotionValue(0);
  const rawParallaxY = useMotionValue(0);
  const subjectX = useSpring(rawParallaxX, SPRING_MAGNETIC);
  const subjectY = useSpring(rawParallaxY, SPRING_MAGNETIC);
  const haloX = useTransform(subjectX, (v) => v * -1.25);
  const haloY = useTransform(subjectY, (v) => v * -1.25);

  const pointerX = useMotionValue(NO_POINTER);

  const handleHeroPointerMove = (event) => {
    if (prefersReduced || event.pointerType !== 'mouse' || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width - 0.5;
    const ny = (event.clientY - rect.top) / rect.height - 0.5;
    rawParallaxX.set(nx * 16);
    rawParallaxY.set(ny * 10);
  };

  const handleHeroPointerLeave = () => {
    rawParallaxX.set(0);
    rawParallaxY.set(0);
    pointerX.set(NO_POINTER);
  };

  const handleTitlePointerMove = (event) => {
    if (prefersReduced || event.pointerType !== 'mouse') return;
    pointerX.set(event.clientX);
  };

  const handleTitlePointerLeave = () => {
    pointerX.set(NO_POINTER);
  };

  useEffect(() => {
    if (prefersReduced || !ready || !heroRef.current) return;

    const editorialCurve = cubicBezier(0.32, 0.72, 0, 1);

    const scope = createScope({ root: heroRef }).add(() => {
      const tl = createTimeline({
        defaults: { ease: editorialCurve },
      });

      tl.add('.hero-intro-line', {
        translateY: ['110%', '0%'],
        opacity: [0, 1],
        duration: 520,
        delay: 140,
      })
        .add(
          '.hero-char',
          {
            translateY: ['118%', '0%'],
            opacity: [0, 1],
            duration: 680,
            delay: stagger(24),
          },
          '-=340'
        )
        .add(
          '.hero-halo-layer',
          {
            opacity: [0, 1],
            scale: [0.86, 1],
            duration: 820,
          },
          '-=540'
        )
        .add(
          '.hero-cutout-subject',
          {
            translateY: [44, 0],
            opacity: [0, 1],
            duration: 780,
          },
          '-=680'
        )
        .add(
          '.hero-side-col',
          {
            translateY: [18, 0],
            opacity: [0, 1],
            duration: 540,
            delay: stagger(80),
          },
          '-=560'
        );
    });

    return () => scope.revert();
  }, [prefersReduced, ready]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      aria-labelledby="hero-heading"
      onPointerMove={handleHeroPointerMove}
      onPointerLeave={handleHeroPointerLeave}
      className="relative isolate flex min-h-[100dvh] w-full flex-col justify-between overflow-hidden border-b border-border-subtle pt-22 pb-10 sm:pt-26 md:pb-0"
    >
      {/* Focused studio backlight halo separates the dark-haired, black-shirted portrait from the dark stage */}
      <motion.div
        aria-hidden="true"
        style={{ x: haloX, y: haloY }}
        className="hero-halo-layer hero-studio-halo pointer-events-none absolute inset-x-0 top-[10%] bottom-0 -z-10"
      />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-12"
      >
        <div className="overflow-hidden">
          <p className="hero-intro-line font-sans text-[clamp(1.05rem,1.75vw,1.5rem)] font-medium tracking-[-0.01em] text-ink-primary">
            Hey, I&apos;m a Full-Stack Developer
          </p>
        </div>

        <h1
          id="hero-heading"
          aria-label={FULL_NAME}
          onPointerMove={handleTitlePointerMove}
          onPointerLeave={handleTitlePointerLeave}
          className="mt-1 overflow-hidden py-1 font-display text-[clamp(2.15rem,8.7vw,7.75rem)] leading-[0.92] font-extrabold tracking-[-0.03em] text-pine uppercase"
        >
          <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.26em]">
            {DISPLAY_NAME.split(' ').map((word, wIdx) => (
              <span key={word} className="inline-flex whitespace-nowrap">
                {Array.from(word).map((char, cIdx) => (
                  <HoverChar
                    key={`${wIdx}-${cIdx}-${char}`}
                    char={char}
                    pointerX={pointerX}
                    enabled={!prefersReduced}
                  />
                ))}
              </span>
            ))}
          </span>
        </h1>
      </motion.div>

      <motion.div
        style={{ y: portraitY, scale: portraitScale }}
        className="pointer-events-none relative z-20 mx-auto mt-4 flex w-full justify-center border-b border-border-subtle md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:border-b-0"
      >
        <motion.div
          style={{ x: subjectX, y: subjectY }}
          className="hero-cutout-subject flex items-end justify-center"
        >
          <img
            src="/portrait-cutout.webp"
            alt="Monochrome studio portrait of Moch Priamitra Nur Alif"
            width={383}
            height={459}
            fetchPriority="high"
            decoding="async"
            className="block h-[clamp(300px,58dvh,560px)] w-auto max-w-[92vw] object-contain object-bottom select-none drop-shadow-[0_18px_38px_rgba(0,0,0,0.45)]"
          />
        </motion.div>
      </motion.div>

      <div className="relative z-30 mx-auto mt-8 grid w-full max-w-[1320px] flex-1 grid-cols-1 items-end gap-8 px-4 sm:px-8 md:mt-0 md:grid-cols-12 md:pb-9 lg:px-12 lg:pb-11">
        <motion.div
          id="contact-info"
          style={{ y: sideY }}
          className="hero-side-col order-2 flex scroll-mt-24 flex-col justify-between gap-8 md:order-1 md:col-span-4 md:h-full md:pt-8"
        >
          <div className="hidden space-y-1 md:block">
            <p className="font-mono text-[0.8125rem] font-medium text-ink-primary">
              &copy;2026
            </p>
            <p className="font-mono text-[0.75rem] text-ink-secondary">
              {FULL_NAME}
            </p>
          </div>

          <div className="space-y-1 border-t border-border-subtle pt-4 md:border-t-0 md:pt-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.8125rem] font-semibold text-ink-primary">
                E
              </span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-ink-primary spring-transition hover:text-accent"
              >
                {EMAIL_ADDRESS}
              </a>
              <motion.button
                type="button"
                whileTap={{ scale: 0.92 }}
                transition={SPRING_TACTILE}
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[10px] border border-border-strong bg-plate/80 px-2.5 text-ink-primary spring-transition hover:border-accent hover:text-accent"
              >
                {copied ? (
                  <Check size={15} weight="light" aria-hidden="true" className="text-accent" />
                ) : (
                  <Copy size={15} weight="light" aria-hidden="true" />
                )}
              </motion.button>
              <span aria-live="polite" className="font-mono text-[0.75rem] text-accent">
                {copied ? 'Copied' : ''}
              </span>
            </div>

            <p className="font-mono text-[0.8125rem] text-ink-secondary">
              <span className="font-semibold text-ink-primary">L</span>{' '}
              Bandung, Indonesia
            </p>
          </div>
        </motion.div>

        <div className="hidden md:order-2 md:col-span-4 md:block" aria-hidden="true" />

        <motion.div
          style={{ y: sideY }}
          className="hero-side-col order-1 flex flex-col justify-between gap-8 md:order-3 md:col-span-4 md:h-full md:pt-6"
        >
          <div className="hidden justify-end md:flex">
            <a
              href="#about"
              aria-label="Scroll to Engineering Practice section"
              className="group inline-flex min-h-[44px] min-w-[44px] flex-col items-center gap-3 rounded-[10px] px-2 py-1 text-ink-primary spring-transition hover:text-accent"
            >
              <motion.span
                aria-hidden="true"
                style={{ scaleY: scrollLineScaleY }}
                className="h-12 w-[1.5px] origin-top bg-accent"
              />
              <span className="font-mono text-[0.72rem] font-medium tracking-[0.16em] [writing-mode:vertical-rl]">
                SCROLL
              </span>
            </a>
          </div>

          <div className="space-y-4">
            <p className="max-w-[38ch] text-[0.9375rem] leading-[1.65] text-ink-secondary">
              Informatics Engineering graduate from Universitas Pasundan &amp;
              Bangkit 2024 Cloud Computing alumnus. Currently Full-Stack
              Engineer Intern at{' '}
              <span className="font-medium text-ink-primary">
                PT Bali Towerindo Sentra Tbk
              </span>
              , building web apps with{' '}
              <span className="font-medium text-ink-primary">
                Vue.js, React, TypeScript, Laravel, and Node.js
              </span>
              .
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <Magnetic strength={0.18}>
                <motion.a
                  href="#project"
                  whileTap={{ scale: 0.96 }}
                  transition={SPRING_TACTILE}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-5 py-2 text-[0.875rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover"
                >
                  View Selected Work
                </motion.a>
              </Magnetic>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={onOpenInquiry}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border-strong bg-plate/80 px-4 py-2 text-[0.875rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
              >
                Open Brief
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-1">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-1.5 text-[0.875rem] font-medium text-ink-primary spring-transition hover:text-accent"
                >
                  <span aria-hidden="true" className="text-accent">
                    /
                  </span>
                  <span>{item.label}</span>
                  <ArrowUpRight
                    size={14}
                    weight="light"
                    aria-hidden="true"
                    className="text-ink-secondary spring-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  />
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
