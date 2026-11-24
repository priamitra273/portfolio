import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { createDrawable, createScope, createTimeline, cubicBezier, stagger } from 'animejs';
import { EDITORIAL_EASE } from '../lib/motion.js';

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function Preloader({ onOpen, onDone }) {
  const rootRef = useRef(null);
  const timelineRef = useRef(null);
  const timerRef = useRef(null);
  const openedRef = useRef(false);
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (openedRef.current) return;
    openedRef.current = true;
    window.clearTimeout(timerRef.current);
    timelineRef.current?.complete?.();
    setOpening(true);
    onOpen();
  };

  useLayoutEffect(() => {
    const scope = createScope({ root: rootRef }).add(() => {
      const outerPetals = createDrawable('.pre-petal-outer');
      const innerPetals = createDrawable('.pre-petal-inner');
      const centerRing = createDrawable('.pre-flower-core');

      timelineRef.current = createTimeline({
        defaults: { ease: cubicBezier(0.65, 0, 0.35, 1) },
      })
        .add('.pre-flower-group', {
          rotate: [-16, 0],
          scale: [0.9, 1],
          duration: 1280,
          ease: cubicBezier(0.32, 0.72, 0, 1),
        })
        .add(
          outerPetals,
          {
            draw: ['0 0', '0 1'],
            duration: 780,
            delay: stagger(55),
          },
          0
        )
        .add(
          innerPetals,
          {
            draw: ['0 0', '0 1'],
            duration: 620,
            delay: stagger(45),
          },
          220
        )
        .add(
          centerRing,
          {
            draw: ['0 0', '0 1'],
            duration: 460,
          },
          520
        )
        .add(
          '.pre-petal-tint',
          {
            opacity: [0, 0.14],
            duration: 420,
          },
          760
        );
    });

    return () => scope.revert();
  }, []);

  useEffect(() => {
    timerRef.current = window.setTimeout(open, 1380);

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') open();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(timerRef.current);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const panelTransition = {
    duration: 0.78,
    delay: opening ? 0.1 : 0,
    ease: EDITORIAL_EASE,
  };

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[60]"
    >
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: opening ? '-100%' : '0%' }}
        transition={panelTransition}
        onAnimationComplete={() => {
          if (opening) onDone();
        }}
        className="absolute inset-x-0 top-0 h-1/2 border-b border-border-subtle bg-canvas"
      />
      <motion.div
        aria-hidden="true"
        initial={{ y: '0%' }}
        animate={{ y: opening ? '100%' : '0%' }}
        transition={panelTransition}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-canvas"
      />

      <motion.div
        animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.04 : 1 }}
        transition={{ duration: 0.28, ease: EDITORIAL_EASE }}
        className="relative flex h-full flex-col justify-between px-4 py-6 sm:px-8 lg:px-12"
      >
        <div className="flex items-start justify-between">
          <p className="font-display text-sm font-bold tracking-[0.03em] text-ink-primary uppercase">
            PRIAMITRA
          </p>
          <p className="font-mono text-[0.8125rem] text-ink-secondary">
            &copy;2026
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center py-4">
          <svg
            viewBox="0 0 280 280"
            width="280"
            height="280"
            aria-hidden="true"
            className="h-[min(36dvh,264px)] w-auto overflow-visible"
          >
            <g
              className="pre-flower-group"
              style={{ transformOrigin: '140px 140px' }}
            >
              {/* Soft petal wash revealed as the bloom completes */}
              <g className="pre-petal-tint" style={{ opacity: 0 }}>
                {PETAL_ANGLES.map((angle) => (
                  <path
                    key={`tint-${angle}`}
                    transform={`rotate(${angle} 140 140)`}
                    d="M 140 140 C 110 104, 114 52, 140 26 C 166 52, 170 104, 140 140 Z"
                    fill="var(--color-accent)"
                  />
                ))}
              </g>

              {/* 8 outer lotus petals drawn radially */}
              {PETAL_ANGLES.map((angle) => (
                <path
                  key={`outer-${angle}`}
                  className="pre-petal-outer"
                  transform={`rotate(${angle} 140 140)`}
                  d="M 140 140 C 110 104, 114 52, 140 26 C 166 52, 170 104, 140 140 Z"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* 8 interleaved inner corolla petals */}
              {PETAL_ANGLES.map((angle) => (
                <path
                  key={`inner-${angle}`}
                  className="pre-petal-inner"
                  transform={`rotate(${angle + 22.5} 140 140)`}
                  d="M 140 140 C 122 114, 125 76, 140 56 C 155 76, 158 114, 140 140 Z"
                  fill="none"
                  stroke="var(--color-border-strong)"
                  strokeWidth="1.15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ))}

              {/* Center stamen ring */}
              <circle
                className="pre-flower-core"
                cx="140"
                cy="140"
                r="14"
                fill="var(--color-canvas)"
                stroke="var(--color-accent)"
                strokeWidth="1.6"
              />
              <circle
                cx="140"
                cy="140"
                r="3.5"
                fill="var(--color-accent)"
              />
            </g>
          </svg>
        </div>

        <div aria-hidden="true" className="h-5" />
      </motion.div>
    </div>
  );
}
