import { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  EDITORIAL_EASE,
  REVEAL_UP,
  SPRING_DECK,
  SPRING_TACTILE,
  VIEWPORT_ONCE,
} from '../lib/motion.js';

function StackEmblem({ id }) {
  switch (id) {
    case '01':
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className="h-28 w-28 sm:h-32 sm:w-32">
          <path
            d="M14 24 H36 L60 66 L84 24 H106 L60 102 Z"
            fill="currentColor"
            fillOpacity="0.45"
          />
          <path
            d="M36 24 H51 L60 40 L69 24 H84 L60 66 Z"
            fill="currentColor"
          />
        </svg>
      );
    case '02':
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className="h-28 w-28 sm:h-32 sm:w-32">
          <path
            d="M60 18 L98 40 V82 L60 104 L22 82 V40 Z"
            fill="currentColor"
            fillOpacity="0.22"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          <path
            d="M22 40 L60 62 L98 40 M60 62 V104"
            fill="none"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case '03':
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className="h-28 w-28 sm:h-32 sm:w-32">
          <circle cx="60" cy="60" r="9" fill="currentColor" />
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="18"
            transform="rotate(60 60 60)"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
          <ellipse
            cx="60"
            cy="60"
            rx="46"
            ry="18"
            transform="rotate(120 60 60)"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
          />
        </svg>
      );
    case '04':
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className="h-28 w-28 sm:h-32 sm:w-32">
          <path
            d="M60 14 L100 37 V83 L60 106 L20 83 V37 Z"
            fill="currentColor"
            fillOpacity="0.3"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          <path
            d="M44 74 V46 L76 74 V46"
            fill="none"
            stroke="currentColor"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true" className="h-28 w-28 sm:h-32 sm:w-32">
          <path
            d="M38 86 H84 C96 86 104 77 104 66 C104 56 97 48 87 47 C84 33 71 24 56 24 C40 24 27 35 25 50 C16 52 10 60 10 70 C10 79 18 86 28 86 Z"
            fill="currentColor"
            fillOpacity="0.28"
            stroke="currentColor"
            strokeWidth="5.5"
            strokeLinejoin="round"
          />
          <circle cx="58" cy="60" r="11" fill="currentColor" />
        </svg>
      );
  }
}

const TECH_STACK = [
  {
    id: '01',
    name: 'VUE.JS',
    layer: 'Frontend UI',
    tools: ['Vue.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS'],
    usage:
      'Reusable UI components, optimistic Kanban drag-and-drop state, and Tiptap Markdown editors.',
  },
  {
    id: '02',
    name: 'LARAVEL',
    layer: 'Full-Stack & API',
    tools: ['Laravel', 'PHP', 'Inertia.js', 'RESTful API'],
    usage:
      'Inertia.js full-stack controllers, RBAC authorization, threaded comment processing, and audit trails.',
  },
  {
    id: '03',
    name: 'REACT',
    layer: 'Interface Systems',
    tools: ['React', 'TypeScript', 'Tailwind CSS'],
    usage:
      'Component architecture, accessible state transitions, and responsive multi-breakpoint interfaces.',
  },
  {
    id: '04',
    name: 'NODE.JS',
    layer: 'Backend & Data',
    tools: ['Node.js', 'Express.js', 'MySQL', 'Prisma ORM', 'Redis'],
    usage:
      'Express REST APIs with JWT authentication, relational schemas in MySQL/Prisma, and Redis caching.',
  },
  {
    id: '05',
    name: 'GOOGLE CLOUD',
    layer: 'Cloud & DevOps',
    tools: ['Google Cloud Platform (GCP)', 'Docker', 'Terraform', 'Git', 'GitLab'],
    usage:
      'Containerized deployments on Cloud Run and GKE, Terraform infrastructure, and GitLab CI workflows.',
  },
];

const EXPERIENCES = [
  {
    id: 'exp-01',
    period: 'Aug 2026 - Present',
    organization: 'PT. Bali Towerindo Sentra Tbk',
    role: 'Full Stack Engineer (Internship)',
    location: 'Indonesia',
    highlights: [
      'Developed reusable UI components for advanced filters, Kanban boards, date pickers, and task discussions using Vue.js, TypeScript, Inertia.js, and Nuxt UI.',
      'Improved Kanban drag-and-drop interactions, optimistic status updates, and error recovery.',
      'Replaced the Quill editor with a Tiptap-based Markdown editor supporting member mentions, comments, and replies backed by Laravel processing.',
      'Validated changes through automated testing and browser verification using Git and GitLab.',
    ],
    focus: ['Vue.js', 'TypeScript', 'Inertia.js', 'Laravel', 'Nuxt UI', 'GitLab'],
  },
  {
    id: 'exp-02',
    period: 'Feb 2024 - 2024',
    organization: 'Bangkit Academy (Google, Tokopedia, Gojek, Traveloka)',
    role: 'Cloud Computing Cohort',
    location: 'Indonesia',
    highlights: [
      'Completed the Cloud Computing track focusing on Google Cloud Infrastructure, Cloud Run, Kubernetes Engine (GKE), Terraform, and backend engineering.',
      'Built the HydroHeroAPI REST backend for a cross-disciplinary Capstone project team.',
    ],
    focus: ['Google Cloud', 'Cloud Run', 'GKE', 'Terraform', 'Node.js', 'Express.js'],
  },
  {
    id: 'exp-03',
    period: 'Aug 2022 - Jul 2023',
    organization: 'HMTIF-UNPAS (Universitas Pasundan)',
    role: 'Social & Political Affairs Staff',
    location: 'Bandung',
    highlights: [
      'Contributed to student program coordination, public communication, and organizational leadership within the Informatics Engineering student association.',
    ],
    focus: ['Program Coordination', 'Public Communication', 'Leadership'],
  },
];

export default function StackAndExperience() {
  const [activeStackId, setActiveStackId] = useState(TECH_STACK[0].id);
  const [activeExpId, setActiveExpId] = useState(EXPERIENCES[0].id);
  const cardRefs = useRef([]);
  const prefersReduced = useReducedMotion();

  const activeIdx = Math.max(
    0,
    TECH_STACK.findIndex((item) => item.id === activeStackId)
  );
  const activeStack = TECH_STACK[activeIdx];
  const activeExp =
    EXPERIENCES.find((item) => item.id === activeExpId) ?? EXPERIENCES[0];

  const stepStack = (delta) => {
    const nextIdx = (activeIdx + delta + TECH_STACK.length) % TECH_STACK.length;
    setActiveStackId(TECH_STACK[nextIdx].id);
    cardRefs.current[nextIdx]?.focus();
  };

  const handleDeckKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      stepStack(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      stepStack(-1);
    }
  };

  return (
    <section
      id="experience"
      aria-labelledby="stack-heading"
      className="mx-auto max-w-[1320px] scroll-mt-24 border-t border-border-subtle px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={REVEAL_UP}
      >
        <div className="mx-auto max-w-[1040px]">
          <h2
            id="stack-heading"
            className="font-sans text-[clamp(2.35rem,4.6vw,3.85rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-ink-primary"
          >
            <span className="block">
              My <span className="text-pine">Tech</span>
            </span>
            <span className="block">Stack</span>
          </h2>
        </div>

        {/* Outer wrapper holds static 3D isometric angle; inner motion.button animates y cleanly */}
        <div
          role="group"
          aria-label="Core technology stack"
          onKeyDown={handleDeckKeyDown}
          className="mx-auto mt-10 grid max-w-[1040px] grid-cols-2 gap-3.5 sm:grid-cols-3 lg:mt-20 lg:flex lg:items-end lg:justify-center lg:gap-0 lg:pt-16 lg:pb-12"
        >
          {TECH_STACK.map((item, idx) => {
            const isSelected = item.id === activeStackId;
            const stepOffsetClasses = [
              'lg:z-50 lg:translate-y-10',
              'lg:z-40 lg:-ml-8 lg:translate-y-4',
              'lg:z-30 lg:-ml-8 lg:-translate-y-2',
              'lg:z-20 lg:-ml-8 lg:-translate-y-8',
              'col-span-2 sm:col-span-1 lg:z-10 lg:-ml-8 lg:-translate-y-14',
            ][idx];

            return (
              <div
                key={item.id}
                className={`${stepOffsetClasses} lg:shrink-0 lg:[transform:perspective(1100px)_rotateY(18deg)_skewY(6deg)]`}
              >
                <motion.button
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  type="button"
                  aria-pressed={isSelected}
                  animate={{ y: !prefersReduced && isSelected ? -12 : 0 }}
                  whileHover={prefersReduced ? undefined : { y: -20 }}
                  whileTap={{ scale: 0.98 }}
                  transition={SPRING_DECK}
                  onClick={() => setActiveStackId(item.id)}
                  style={{
                    backgroundImage:
                      'linear-gradient(160deg, var(--stack-card-top) 0%, var(--stack-card-bottom) 100%)',
                  }}
                  className={`group relative flex min-h-[196px] w-full flex-col justify-between rounded-[18px] border p-4 text-left spring-transition sm:min-h-[224px] sm:p-5 lg:h-[272px] lg:w-[228px] ${
                    isSelected
                      ? 'border-accent/80 shadow-[-16px_22px_42px_-12px_rgba(0,0,0,0.62)]'
                      : 'border-border-subtle shadow-[-14px_18px_36px_-14px_rgba(0,0,0,0.52)] hover:border-border-strong'
                  }`}
                >
                  <span
                    className={`font-mono text-[0.75rem] tracking-[0.04em] spring-transition ${
                      isSelected
                        ? 'font-medium text-accent'
                        : 'text-ink-secondary group-hover:text-ink-primary'
                    }`}
                  >
                    [{item.id}]
                  </span>

                  <div
                    className={`my-2 flex items-center justify-center spring-transition ${
                      isSelected
                        ? 'scale-105 text-accent opacity-80'
                        : 'text-ink-secondary opacity-22 group-hover:scale-105 group-hover:text-ink-primary group-hover:opacity-45'
                    }`}
                  >
                    <StackEmblem id={item.id} />
                  </div>

                  <div className="flex items-center justify-end">
                    <span
                      className={`font-sans text-[0.78rem] font-semibold tracking-[0.06em] uppercase sm:text-[0.84rem] ${
                        isSelected ? 'text-accent' : 'text-ink-primary'
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>
                </motion.button>
              </div>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="mx-auto mt-6 max-w-[1040px] overflow-hidden rounded-[16px] border border-border-subtle bg-surface px-5 py-5 sm:px-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStack.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
              className="space-y-3"
            >
              <div className="sm:flex sm:items-center sm:justify-between sm:gap-6">
                <p className="font-mono text-[0.8125rem] font-medium text-accent">
                  [{activeStack.id}] {activeStack.name} · {activeStack.layer}
                </p>
                <p className="mt-1 text-[0.9375rem] leading-[1.6] text-ink-primary sm:mt-0">
                  {activeStack.usage}
                </p>
              </div>

              <ul
                aria-label={`${activeStack.layer} skills`}
                className="flex flex-wrap gap-2 border-t border-border-subtle pt-3"
              >
                {activeStack.tools.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-[4px] border border-border-subtle bg-plate px-2.5 py-1 font-mono text-[0.75rem] text-ink-primary"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={REVEAL_UP}
        className="mt-20 border-t border-border-subtle pt-16 sm:mt-24 sm:pt-20"
      >
        <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-12">
          <p className="font-mono text-[0.8125rem] text-ink-secondary md:col-span-5">
            <span className="text-accent">/</span> EXPERIENCE &amp; INTERNSHIP
          </p>
          <h3 className="font-serif text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.1] font-medium tracking-[-0.02em] text-ink-primary md:col-span-7">
            Roles &amp; <span className="italic text-pine">Programs</span>
          </h3>
        </div>

        <div
          aria-hidden="true"
          className="mt-6 flex items-center justify-between gap-2 text-ink-secondary"
        >
          <span className="font-mono text-[0.75rem] text-accent">+</span>
          <span className="h-px flex-1 bg-border-subtle" />
          <span className="font-mono text-[0.75rem] text-accent">+</span>
        </div>

        <div
          role="group"
          aria-label="Experience timeline entries"
          className="mt-8 grid grid-cols-1 border-t border-l border-border-subtle md:grid-cols-3"
        >
          {EXPERIENCES.map((exp) => {
            const isSelected = exp.id === activeExpId;
            return (
              <button
                key={exp.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setActiveExpId(exp.id)}
                className={`relative flex min-h-[144px] flex-col justify-between overflow-hidden border-r border-b border-border-subtle p-6 text-left spring-transition ${
                  isSelected
                    ? 'text-stage-ink'
                    : 'bg-plate text-ink-primary hover:bg-surface'
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="active-experience-cell"
                    transition={SPRING_TACTILE}
                    className="absolute inset-0 z-0 bg-stage-bg"
                  >
                    <span className="block h-1 w-full bg-accent" />
                  </motion.span>
                )}

                <span
                  className={`relative z-10 font-mono text-[0.75rem] ${
                    isSelected ? 'text-[#D5E3DC]' : 'text-ink-secondary'
                  }`}
                >
                  {exp.period}
                </span>

                <div className="relative z-10 mt-4">
                  <p className="font-serif text-[1.2rem] leading-[1.22] font-medium">
                    {exp.organization}
                  </p>
                  <p
                    className={`mt-1.5 text-[0.875rem] ${
                      isSelected ? 'text-[#D5E3DC]' : 'text-ink-secondary'
                    }`}
                  >
                    {exp.role}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div
          aria-live="polite"
          className="mt-6 rounded-[24px] border border-border-subtle bg-surface p-2"
        >
          <div className="overflow-hidden rounded-[16px] border border-border-subtle bg-plate p-6 sm:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: EDITORIAL_EASE }}
                className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start"
              >
                <div className="lg:col-span-4">
                  <p className="font-mono text-[0.8125rem] font-medium text-accent">
                    {activeExp.period}
                  </p>
                  <h4 className="mt-1.5 font-serif text-[1.5rem] leading-[1.2] font-medium text-ink-primary">
                    {activeExp.role}
                  </h4>
                  <p className="mt-1 text-[0.9375rem] text-ink-secondary">
                    {activeExp.organization} ({activeExp.location})
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <ul className="list-disc space-y-2 pl-5 text-[0.9375rem] leading-[1.65] text-ink-primary">
                    {activeExp.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-3">
                  <ul
                    aria-label="Role focus areas"
                    className="flex flex-wrap gap-2 lg:justify-end"
                  >
                    {activeExp.focus.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-[4px] border border-border-subtle bg-surface px-2.5 py-1 font-mono text-[0.75rem] text-ink-primary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
