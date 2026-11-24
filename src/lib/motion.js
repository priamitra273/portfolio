// Shared MOTION 3 presets aligned with DESIGN.md (GPU-safe transform & opacity only)
export const EDITORIAL_EASE = [0.32, 0.72, 0, 1];

export const SPRING_TACTILE = {
  type: 'spring',
  stiffness: 340,
  damping: 30,
  mass: 0.85,
};

export const SPRING_MAGNETIC = {
  type: 'spring',
  stiffness: 240,
  damping: 20,
  mass: 0.6,
};

export const SPRING_DECK = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
  mass: 0.9,
};

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.15,
};

export const REVEAL_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EDITORIAL_EASE },
  },
};
