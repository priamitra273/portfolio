import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { ArrowUpRight, GithubLogo, Globe, X } from '@phosphor-icons/react';
import {
  EDITORIAL_EASE,
  REVEAL_UP,
  SPRING_MAGNETIC,
  SPRING_TACTILE,
  VIEWPORT_ONCE,
} from '../lib/motion.js';

const CATEGORY_DEFAULT_COVERS = {
  'Full-Stack': {
    src: '/category-fullstack.webp',
    alt: 'Full-Stack category cover with layered smoked-glass plates above a milled dark aluminum base',
  },
  'Cloud & API': {
    src: '/category-cloud-api.webp',
    alt: 'Cloud and API category cover with matte black heatsink fins, network patch cables, and frosted emerald prism',
  },
  'Backend & ORM': {
    src: '/category-backend-orm.webp',
    alt: 'Backend and ORM category cover with interlocking matte basalt and brushed dark steel modular blocks',
  },
};

const PROJECTS = [
  {
    id: '01',
    featured: true,
    category: 'Full-Stack',
    title: 'Student Grade & Progress Monitoring System',
    repoSlug: 'priamitra273/monitoring-nilai-siswa',
    demoUrl: 'https://monitoring-nilai-siswa-5uns.vercel.app/login',
    githubUrl: 'https://github.com/priamitra273/monitoring-nilai-siswa',
    imageUrl: '/project-monitoring-nilai.webp',
    summary:
      'Full-stack school academic monitoring web app built for SDN 1 Langensari to manage student grades, attendance, developmental notes, and parent-teacher communication across Admin, Teacher, and Parent roles.',
    stack: [
      'React',
      'Vite',
      'Node.js',
      'Express.js',
      'MySQL / TiDB',
      'JWT',
      'Docker',
    ],
    year: '2025',
    role: 'Full-Stack Developer',
    details:
      'Includes role-based portals (Admin, Teacher, Parent) with instant synthetic-data demo login deployed on Vercel and TiDB Cloud, JWT + bcrypt authentication, parent-teacher chat, academic transcripts, and Chromium-based PDF report generation.',
  },
  {
    id: '02',
    featured: false,
    category: 'Cloud & API',
    title: 'HydroHeroAPI (Bangkit Capstone Backend)',
    repoSlug: 'priamitra273/HydroHeroAPI',
    demoUrl: '',
    githubUrl: 'https://github.com/priamitra273/HydroHeroAPI',
    imageUrl: '',
    summary:
      'REST API service for the Bangkit Academy 2024 Capstone project handling JWT authentication, user profiles, daily water intake tracking, dehydration prediction endpoints, and geolocation weather integration via OpenWeather and IPStack.',
    stack: ['Node.js', 'Express.js', 'MySQL', 'JWT', 'OpenWeather API'],
    year: '2024',
    role: 'Cloud & Backend Developer',
    details:
      'Developed as the backend core for a cross-disciplinary Bangkit Capstone team, exposing authenticated hydration endpoints and combining user activity with real-time local temperature data from IPStack and OpenWeather.',
  },
  {
    id: '03',
    featured: false,
    category: 'Backend & ORM',
    title: 'E-Wastepas Backend',
    repoSlug: 'priamitra273/ewastepas-backend',
    demoUrl: '',
    githubUrl: 'https://github.com/priamitra273/ewastepas-backend',
    imageUrl: '',
    summary:
      'Unified backend service providing web and mobile APIs for an electronic waste management platform, equipped with Prisma ORM, user authentication, file uploads, and barcode/QR code generation.',
    stack: ['Node.js', 'Express.js', 'Prisma ORM', 'Docker'],
    year: '2024',
    role: 'Backend Developer',
    details:
      'Containerized with Docker and structured around type-safe Prisma ORM models to serve both web admin dashboards and mobile collection workflows, including automated QR/barcode asset generation.',
  },
];

const FILTERS = ['All', 'Full-Stack', 'Cloud & API', 'Backend & ORM', 'Live Demo', 'Mobile'];

function getProjectCover(project) {
  const fallback =
    CATEGORY_DEFAULT_COVERS[project.category] ??
    CATEGORY_DEFAULT_COVERS['Full-Stack'];
  if (project.imageUrl) {
    return {
      src: project.imageUrl,
      alt: `Preview of ${project.title}`,
    };
  }
  return fallback;
}

function ProjectCoverPlate({ project, compact = false }) {
  const cover = getProjectCover(project);

  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden border border-border-subtle bg-surface ${
        compact ? 'rounded-[10px]' : 'rounded-[14px]'
      }`}
    >
      <img
        src={cover.src}
        alt={cover.alt}
        width={960}
        height={600}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover select-none spring-transition group-hover:scale-[1.03]"
      />

      {!compact && (
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 rounded-[8px] border border-border-subtle bg-canvas/95 px-3 py-1.5">
          <span className="truncate font-mono text-[0.72rem] text-ink-primary">
            {project.repoSlug}
          </span>
          <span className="shrink-0 font-mono text-[0.7rem] text-accent uppercase">
            {project.demoUrl ? `${project.category} · LIVE` : project.category}
          </span>
        </div>
      )}
    </div>
  );
}

function FlagshipShowcase({ project, onInspect }) {
  const prefersReduced = useReducedMotion();
  const frameRef = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);

  const badgeX = useSpring(rawX, SPRING_MAGNETIC);
  const badgeY = useSpring(rawY, SPRING_MAGNETIC);

  const handlePointerMove = (event) => {
    if (prefersReduced || event.pointerType !== 'mouse' || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    rawX.set(event.clientX - rect.left - rect.width / 2);
    rawY.set(event.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.58, ease: EDITORIAL_EASE }}
      className="rounded-[26px] border border-border-subtle bg-stage-bg p-2.5 text-stage-ink shadow-[0_26px_54px_-26px_rgba(0,0,0,0.45)] sm:p-3"
    >
      <div className="grid grid-cols-1 items-center gap-7 rounded-[18px] border border-stage-ink/15 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-10">
        <div className="flex h-full flex-col justify-between gap-6 lg:col-span-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-[4px] bg-accent px-2.5 py-0.5 font-mono text-[0.75rem] font-semibold text-accent-fg">
                FLAGSHIP · {project.id}
              </span>
              <span className="font-mono text-[0.8125rem] text-[#D5E3DC]">
                {project.role} · {project.year}
              </span>
            </div>

            <h3 className="mt-4 font-serif text-[clamp(1.75rem,2.9vw,2.45rem)] leading-[1.12] font-medium tracking-[-0.02em] text-stage-ink">
              {project.title}
            </h3>

            <p className="mt-4 max-w-[50ch] text-[0.9375rem] leading-[1.68] text-[#D5E3DC] sm:text-base">
              {project.summary}
            </p>
          </div>

          <div className="space-y-5 border-t border-stage-ink/15 pt-5">
            <ul
              aria-label="Flagship technology stack"
              className="flex flex-wrap items-center gap-2"
            >
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-[4px] border border-stage-ink/25 bg-stage-ink/10 px-2.5 py-1 font-mono text-[0.75rem] text-stage-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center gap-2.5">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full bg-accent pl-5 pr-2 text-[0.875rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover"
                >
                  <Globe size={16} weight="regular" aria-hidden="true" />
                  <span>Live Demo</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-fg/15 text-accent-fg spring-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <ArrowUpRight size={15} weight="light" />
                  </span>
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-stage-ink/35 bg-stage-ink/10 px-4 py-2 text-[0.875rem] font-medium text-stage-ink spring-transition hover:border-accent hover:text-accent"
              >
                <GithubLogo size={16} weight="regular" aria-hidden="true" />
                <span>Source Code</span>
                <ArrowUpRight size={14} weight="light" aria-hidden="true" />
              </a>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={(e) => onInspect(project, e)}
                className="inline-flex min-h-[44px] items-center rounded-full border border-stage-ink/35 px-4 py-2 text-[0.875rem] font-medium text-stage-ink spring-transition hover:border-accent hover:text-accent"
              >
                Case Brief
              </motion.button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <button
            ref={frameRef}
            type="button"
            onClick={(e) => onInspect(project, e)}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setHovered(true);
            }}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
              setHovered(false);
              rawX.set(0);
              rawY.set(0);
            }}
            aria-label={`Open case brief for ${project.title}`}
            className="group relative block w-full overflow-hidden rounded-[16px] text-left focus-visible:outline-accent"
          >
            <motion.div
              whileHover={prefersReduced ? undefined : { scale: 1.018 }}
              transition={{ duration: 0.45, ease: EDITORIAL_EASE }}
            >
              <ProjectCoverPlate project={project} />
            </motion.div>

            {!prefersReduced && (
              <motion.span
                aria-hidden="true"
                style={{ x: badgeX, y: badgeY }}
                animate={{
                  opacity: hovered ? 1 : 0,
                  scale: hovered ? 1 : 0.86,
                }}
                transition={{ duration: 0.2, ease: EDITORIAL_EASE }}
                className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-mono text-[0.75rem] font-semibold text-accent-fg shadow-lg md:inline-flex"
              >
                <span>OPEN BRIEF</span>
                <ArrowUpRight size={14} weight="light" />
              </motion.span>
            )}
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const lastTriggerRef = useRef(null);
  const closeBtnRef = useRef(null);

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS
      : activeFilter === 'Live Demo'
      ? PROJECTS.filter((p) => Boolean(p.demoUrl))
      : PROJECTS.filter((p) => p.category === activeFilter);

  const flagshipProject = filteredProjects.find((p) => p.featured) ?? null;
  const archiveProjects = filteredProjects.filter((p) => !p.featured);

  useEffect(() => {
    if (!selectedProject) return;

    closeBtnRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
        requestAnimationFrame(() => lastTriggerRef.current?.focus());
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProject]);

  const openDetails = (project, event) => {
    lastTriggerRef.current = event.currentTarget;
    setSelectedProject(project);
  };

  const closeDetails = () => {
    setSelectedProject(null);
    requestAnimationFrame(() => lastTriggerRef.current?.focus());
  };

  return (
    <section
      id="project"
      aria-labelledby="project-heading"
      className="mx-auto max-w-[1320px] scroll-mt-24 border-t border-border-subtle px-4 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-32"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT_ONCE}
        variants={REVEAL_UP}
        className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="font-mono text-[0.8125rem] text-ink-secondary">
            <span className="text-accent">03</span> / SELECTED WORK
          </p>
          <h2
            id="project-heading"
            className="mt-2 font-serif text-[clamp(2rem,4vw,3.35rem)] leading-[1.08] font-medium tracking-[-0.02em] text-ink-primary"
          >
            Selected <span className="italic text-pine">Repositories</span>
          </h2>
        </div>

        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap items-center gap-2"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`relative inline-flex min-h-[44px] items-center rounded-[10px] border px-4 py-2 text-[0.875rem] font-medium spring-transition ${
                  isActive
                    ? 'border-accent text-accent-fg'
                    : 'border-border-strong bg-plate text-ink-primary hover:border-accent hover:text-accent'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    transition={SPRING_TACTILE}
                    className="absolute inset-0 -z-0 rounded-[9px] bg-accent"
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Flagship case frame + hairline index rows prevent uniform card repetition (R-14) */}
      <AnimatePresence mode="wait">
        {filteredProjects.length > 0 ? (
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
            className="mt-10 space-y-10 sm:mt-12 sm:space-y-12"
          >
            {flagshipProject && (
              <FlagshipShowcase
                project={flagshipProject}
                onInspect={openDetails}
              />
            )}

            {archiveProjects.length > 0 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <p className="font-mono text-[0.75rem] tracking-[0.04em] text-ink-secondary">
                    ADDITIONAL REPOSITORIES
                  </p>
                  <p className="font-mono text-[0.75rem] text-ink-secondary">
                    {archiveProjects.length}{' '}
                    {archiveProjects.length === 1 ? 'REPOSITORY' : 'REPOSITORIES'}
                  </p>
                </div>

                <div className="divide-y divide-border-subtle border-y border-border-subtle">
                  {archiveProjects.map((project, idx) => (
                    <motion.article
                      key={project.id}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.06,
                        ease: EDITORIAL_EASE,
                      }}
                      className="group grid grid-cols-1 items-center gap-6 py-7 sm:py-8 md:grid-cols-12 md:gap-8"
                    >
                      <div className="flex items-baseline gap-4 md:col-span-2 md:flex-col md:gap-1">
                        <span className="font-serif text-3xl font-medium text-pine">
                          {project.id}
                        </span>
                        <span className="font-mono text-[0.75rem] text-ink-secondary">
                          {project.category} · {project.year}
                        </span>
                      </div>

                      <div className="space-y-3 md:col-span-6">
                        <h3 className="font-serif text-[clamp(1.375rem,2.1vw,1.85rem)] leading-[1.18] font-medium text-ink-primary spring-transition group-hover:text-pine">
                          {project.title}
                        </h3>
                        <p className="max-w-[54ch] text-[0.9375rem] leading-[1.65] text-ink-secondary">
                          {project.summary}
                        </p>
                        <ul
                          aria-label={`${project.title} stack`}
                          className="flex flex-wrap items-center gap-2 pt-1"
                        >
                          {project.stack.map((tech) => (
                            <li
                              key={tech}
                              className="rounded-[4px] border border-border-subtle bg-surface px-2.5 py-0.5 font-mono text-[0.75rem] text-ink-primary"
                            >
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between md:col-span-4 md:flex-col md:items-end">
                        <div className="w-full max-w-[220px] overflow-hidden rounded-[10px] spring-transition group-hover:-translate-y-0.5">
                          <ProjectCoverPlate project={project} compact />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.97 }}
                            transition={SPRING_TACTILE}
                            onClick={(e) => openDetails(project, e)}
                            className="inline-flex min-h-[44px] items-center rounded-full border border-border-strong bg-plate px-4 text-[0.8125rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
                          >
                            Case Brief
                          </motion.button>

                          {project.demoUrl && (
                            <a
                              href={project.demoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full border border-border-strong bg-plate px-3.5 text-[0.8125rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
                            >
                              <span>Live Demo</span>
                              <ArrowUpRight size={14} weight="light" aria-hidden="true" />
                            </a>
                          )}

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent pl-4 pr-2 text-[0.8125rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover"
                          >
                            <span>GitHub</span>
                            <span
                              aria-hidden="true"
                              className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-fg/15 text-accent-fg spring-transition group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                            >
                              <ArrowUpRight size={14} weight="light" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty-state"
            role="status"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EDITORIAL_EASE }}
            className="mt-10 rounded-[24px] border border-border-subtle bg-surface p-2"
          >
            <div className="flex flex-col items-start gap-4 rounded-[16px] border border-border-subtle bg-plate p-7 sm:p-10">
              <p className="font-mono text-[0.8125rem] text-accent">
                EMPTY STATE · {activeFilter.toUpperCase()}
              </p>
              <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.2] text-ink-primary">
                No standalone {activeFilter.toLowerCase()} repositories listed yet.
              </h3>
              <p className="max-w-[52ch] text-[0.9375rem] leading-[1.65] text-ink-secondary">
                My current public work focuses on full-stack web applications,
                cloud services, and REST API backends. Reset the filter to view
                all published builds.
              </p>
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={() => setActiveFilter('All')}
                className="mt-1 inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-2.5 text-[0.9375rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover"
              >
                Show All Projects
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-primary/55 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeDetails();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="case-modal-title"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={SPRING_TACTILE}
              className="max-h-[90dvh] w-full max-w-[660px] overflow-y-auto rounded-[24px] border border-border-subtle bg-surface p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)]"
            >
              <div className="rounded-[16px] border border-border-subtle bg-plate p-5 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.8125rem] text-ink-secondary">
                      <span className="text-accent">[{selectedProject.id}]</span>{' '}
                      · {selectedProject.role} · {selectedProject.year}
                    </p>
                    <h3
                      id="case-modal-title"
                      className="mt-2 font-serif text-[clamp(1.5rem,2.5vw,2.05rem)] leading-[1.15] text-ink-primary"
                    >
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    ref={closeBtnRef}
                    type="button"
                    onClick={closeDetails}
                    aria-label="Close case brief"
                    className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-border-strong bg-canvas text-ink-primary spring-transition hover:border-accent hover:text-accent active:scale-[0.98]"
                  >
                    <X size={18} weight="light" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-5">
                  <ProjectCoverPlate project={selectedProject} />
                </div>

                <p className="mt-5 text-[0.9375rem] leading-[1.65] text-ink-primary">
                  {selectedProject.summary}
                </p>
                <p className="mt-3 text-[0.9375rem] leading-[1.65] text-ink-secondary">
                  {selectedProject.details}
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    {selectedProject.demoUrl && (
                      <a
                        href={selectedProject.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2 text-[0.875rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover"
                      >
                        <Globe size={16} weight="regular" aria-hidden="true" />
                        <span>Open Live Demo</span>
                        <ArrowUpRight size={15} weight="light" aria-hidden="true" />
                      </a>
                    )}

                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 py-2 text-[0.875rem] spring-transition ${
                        selectedProject.demoUrl
                          ? 'border border-border-strong bg-canvas font-medium text-ink-primary hover:border-accent hover:text-accent'
                          : 'bg-accent font-semibold text-accent-fg hover:bg-accent-hover'
                      }`}
                    >
                      <GithubLogo size={16} weight="regular" aria-hidden="true" />
                      <span>Source Code</span>
                      <ArrowUpRight size={15} weight="light" aria-hidden="true" />
                    </a>
                  </div>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    transition={SPRING_TACTILE}
                    onClick={closeDetails}
                    className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-border-strong bg-canvas px-5 py-2 text-[0.875rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
                  >
                    Close Brief
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
