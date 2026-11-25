import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowUp, ArrowUpRight, Check, Copy, WarningCircle, X } from '@phosphor-icons/react';
import { EDITORIAL_EASE, SPRING_TACTILE } from '../lib/motion.js';

const EMAIL_ADDRESS = 'pria93533@gmail.com';
const DISPLAY_NAME = 'MOCH PRIAMITRA';
const FULL_NAME = 'Moch Priamitra Nur Alif';

const QUICK_LINKS = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT', href: '#about' },
  { label: 'WORKS', href: '#project' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT', href: '#contact' },
];

const REPOSITORY_LINKS = [
  {
    label: 'STUDENT MONITOR',
    href: 'https://monitoring-nilai-siswa-5uns.vercel.app/login',
  },
  { label: 'HYDROHERO API', href: 'https://github.com/priamitra273/HydroHeroAPI' },
  { label: 'E-WASTEPAS', href: 'https://github.com/priamitra273/ewastepas-backend' },
];

const SOCIAL_LINKS = [
  { label: 'GITHUB', href: 'https://github.com/priamitra273', external: true },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/priamitranur/', external: true },
  { label: 'EMAIL', href: `mailto:${EMAIL_ADDRESS}`, external: false },
];

export default function ContactFooter({ inquiryOpen, setInquiryOpen }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', brief: '' });
  const [formError, setFormError] = useState('');
  const [formStatus, setFormStatus] = useState('idle');

  const footerRef = useRef(null);
  const returnFocusRef = useRef(null);
  const nameInputRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start end', 'end end'],
  });
  const wordmarkY = useTransform(
    scrollYProgress,
    [0, 1],
    [prefersReduced ? 0 : 36, 0]
  );

  useEffect(() => {
    if (!inquiryOpen) return;

    if (document.activeElement instanceof HTMLElement) {
      returnFocusRef.current = document.activeElement;
    }

    requestAnimationFrame(() => nameInputRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setInquiryOpen(false);
        setFormError('');
        setFormStatus('idle');
        requestAnimationFrame(() => returnFocusRef.current?.focus());
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [inquiryOpen, setInquiryOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  };

  const closeModal = () => {
    setInquiryOpen(false);
    setFormError('');
    setFormStatus('idle');
    requestAnimationFrame(() => returnFocusRef.current?.focus());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedBrief = formData.brief.trim();

    if (!trimmedName || !trimmedEmail || !trimmedBrief) {
      setFormError('Please complete your name, email, and a short project brief.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address so I can reply.');
      return;
    }

    setFormError('');
    setFormStatus('submitting');

    window.setTimeout(() => {
      setFormStatus('sent');
    }, 350);
  };

  const mailtoComposeHref = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(
    `Portfolio Inquiry from ${formData.name.trim() || 'Visitor'}`
  )}&body=${encodeURIComponent(
    `${formData.brief.trim()}\n\nReply to: ${formData.email.trim()}`
  )}`;

  return (
    <footer
      ref={footerRef}
      id="contact"
      aria-labelledby="contact-heading"
      className="relative isolate mt-8 overflow-hidden border-t border-border-subtle bg-canvas text-ink-primary"
    >
      <h2 id="contact-heading" className="sr-only">
        Contact and Links
      </h2>

      <div className="mx-auto max-w-[1320px] px-4 pt-12 pb-0 sm:px-8 sm:pt-16 lg:px-12 lg:pt-20">
        <div
          aria-hidden="true"
          className="flex items-center justify-between gap-3"
        >
          <span className="font-mono text-[0.8125rem] font-medium text-accent">
            &lt;/
          </span>
          <span className="h-px flex-1 bg-border-subtle" />
          <span className="font-mono text-[0.8125rem] font-medium text-accent">
            &gt;
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          <div className="flex flex-col justify-between gap-6 md:col-span-5">
            <p className="max-w-[32ch] text-[0.9375rem] leading-[1.6] text-ink-secondary">
              Open for Full-Stack Developer roles, continued internships, and
              web application collaborations. Reach out directly by email or
              connect on GitHub and LinkedIn.
            </p>

            <div className="relative mx-auto mt-2 flex w-full max-w-[320px] items-end justify-center md:mx-0 md:justify-start">
              <div
                aria-hidden="true"
                className="hero-studio-halo pointer-events-none absolute inset-0 -z-10 opacity-70"
              />
              <img
                src="/portrait-cutout.webp"
                alt=""
                width={383}
                height={459}
                loading="lazy"
                decoding="async"
                className="block h-[clamp(240px,30vw,350px)] w-auto object-contain object-bottom select-none [mask-image:linear-gradient(to_bottom,#000_80%,transparent_100%)]"
              />
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10 md:col-span-7">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <nav aria-label="Footer quick links">
                <p className="text-[0.8125rem] text-ink-secondary">
                  Quick links
                </p>
                <ul className="mt-3 space-y-0.5">
                  {QUICK_LINKS.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        className="inline-flex min-h-[44px] items-center font-mono text-[0.8125rem] font-medium tracking-[0.03em] text-ink-primary spring-transition hover:text-accent"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label="Featured GitHub repositories">
                <p className="text-[0.8125rem] text-ink-secondary">
                  Portfolio
                </p>
                <ul className="mt-3 space-y-0.5">
                  {REPOSITORY_LINKS.map((repo) => (
                    <li key={repo.label}>
                      <a
                        href={repo.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[0.8125rem] font-medium tracking-[0.03em] text-ink-primary spring-transition hover:text-accent"
                      >
                        <span>{repo.label}</span>
                        <ArrowUpRight
                          size={13}
                          weight="light"
                          aria-hidden="true"
                          className="text-ink-secondary spring-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav
                aria-label="Social profiles"
                className="col-span-2 sm:col-span-1"
              >
                <p className="text-[0.8125rem] text-ink-secondary">
                  Social Link
                </p>
                <ul className="mt-3 space-y-0.5">
                  {SOCIAL_LINKS.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="group inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[0.8125rem] font-medium tracking-[0.03em] text-ink-primary spring-transition hover:text-accent"
                      >
                        <span>{item.label}</span>
                        {item.external && (
                          <ArrowUpRight
                            size={13}
                            weight="light"
                            aria-hidden="true"
                            className="text-ink-secondary spring-transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div>
              <div className="border-b border-border-subtle pb-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="inline-flex min-h-[44px] items-center font-sans text-[clamp(1.25rem,2.2vw,1.65rem)] font-semibold tracking-[-0.015em] text-ink-primary spring-transition hover:text-accent"
                  >
                    {EMAIL_ADDRESS}
                  </a>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    transition={SPRING_TACTILE}
                    onClick={handleCopyEmail}
                    aria-label="Copy email address from footer"
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-[10px] border border-border-strong bg-plate px-2.5 text-ink-primary spring-transition hover:border-accent hover:text-accent"
                  >
                    {copied ? (
                      <Check size={16} weight="light" aria-hidden="true" className="text-accent" />
                    ) : (
                      <Copy size={16} weight="light" aria-hidden="true" />
                    )}
                  </motion.button>
                  <span aria-live="polite" className="font-mono text-[0.75rem] text-accent">
                    {copied ? 'Copied' : ''}
                  </span>
                </div>

                <p className="mt-1 font-sans text-[clamp(1.05rem,1.8vw,1.35rem)] font-medium tracking-[-0.01em] text-ink-secondary">
                  Bandung, West Java · Indonesia
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 sm:justify-end sm:gap-8">
                <p className="font-mono text-[0.75rem] tracking-[0.04em] text-ink-secondary uppercase">
                  &copy;2026 {FULL_NAME}
                </p>
                <a
                  href="#hero"
                  className="inline-flex min-h-[44px] items-center gap-1.5 font-mono text-[0.75rem] font-medium tracking-[0.04em] text-ink-primary uppercase spring-transition hover:text-accent"
                >
                  <span>BACK TO TOP</span>
                  <ArrowUp size={14} weight="light" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 overflow-hidden pt-2">
          <motion.p
            aria-hidden="true"
            style={{ y: wordmarkY }}
            className="select-none text-center font-display text-[clamp(2.05rem,8.8vw,9.25rem)] leading-[0.86] font-extrabold tracking-[-0.03em] whitespace-nowrap text-ink-primary/32 uppercase [mask-image:linear-gradient(to_bottom,#000_18%,transparent_96%)]"
          >
            {DISPLAY_NAME}
          </motion.p>
        </div>
      </div>

      <AnimatePresence>
        {inquiryOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: EDITORIAL_EASE }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-primary/55 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="inquiry-modal-title"
              initial={{ opacity: 0, y: 18, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={SPRING_TACTILE}
              className="max-h-[90dvh] w-full max-w-[540px] overflow-y-auto rounded-[24px] border border-border-subtle bg-surface p-2 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.45)]"
            >
              <div className="rounded-[16px] border border-border-subtle bg-plate p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[0.8125rem] text-accent">
                      PROJECT INQUIRY
                    </p>
                    <h3
                      id="inquiry-modal-title"
                      className="mt-1.5 font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] text-ink-primary"
                    >
                      Message Moch Priamitra
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close project inquiry dialog"
                    className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-full border border-border-strong bg-canvas text-ink-primary spring-transition hover:border-accent hover:text-accent active:scale-[0.98]"
                  >
                    <X size={18} weight="light" aria-hidden="true" />
                  </button>
                </div>

                {formStatus === 'sent' ? (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: EDITORIAL_EASE }}
                    className="mt-6 space-y-4"
                  >
                    <div className="rounded-[12px] border border-pine/30 bg-pine-tint p-4 text-pine">
                      <p className="font-medium">
                        Brief prepared for {EMAIL_ADDRESS}.
                      </p>
                      <p className="mt-1 text-sm text-ink-primary">
                        Click below to send directly via your email client, or
                        close this dialog.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={mailtoComposeHref}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-2.5 text-[0.9375rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover"
                      >
                        <span>Open in Email Client</span>
                        <ArrowUpRight size={15} weight="light" aria-hidden="true" />
                      </a>
                      <motion.button
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING_TACTILE}
                        onClick={() => {
                          setFormData({ name: '', email: '', brief: '' });
                          closeModal();
                        }}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-border-strong bg-canvas px-5 py-2 text-[0.9375rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
                      >
                        Done
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
                    {formError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 rounded-[10px] border border-error/45 bg-canvas p-3.5 text-sm text-error"
                      >
                        <WarningCircle
                          size={18}
                          weight="light"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0"
                        />
                        <span>{formError}</span>
                      </div>
                    )}

                    <div>
                      <label
                        htmlFor="inquiry-name"
                        className="block text-sm font-medium text-ink-primary"
                      >
                        Your Name
                      </label>
                      <input
                        ref={nameInputRef}
                        id="inquiry-name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        placeholder="Your Name"
                        className="mt-1.5 min-h-[44px] w-full rounded-[10px] border border-border-strong bg-canvas px-3.5 py-2 text-[0.9375rem] text-ink-primary placeholder:text-ink-secondary"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-email"
                        className="block text-sm font-medium text-ink-primary"
                      >
                        Email Address
                      </label>
                      <input
                        id="inquiry-email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, email: e.target.value }))
                        }
                        placeholder="email@example.com"
                        className="mt-1.5 min-h-[44px] w-full rounded-[10px] border border-border-strong bg-canvas px-3.5 py-2 text-[0.9375rem] text-ink-primary placeholder:text-ink-secondary"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="inquiry-brief"
                        className="block text-sm font-medium text-ink-primary"
                      >
                        Project Brief
                      </label>
                      <textarea
                        id="inquiry-brief"
                        rows={3}
                        required
                        value={formData.brief}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, brief: e.target.value }))
                        }
                        placeholder="Role opportunity, project scope, or collaboration details..."
                        className="mt-1.5 w-full rounded-[10px] border border-border-strong bg-canvas px-3.5 py-2.5 text-[0.9375rem] text-ink-primary placeholder:text-ink-secondary"
                      />
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-[10px] border border-border-strong bg-plate px-4 py-2 text-[0.9375rem] font-medium text-ink-primary spring-transition hover:border-accent hover:text-accent"
                      >
                        Cancel
                      </button>
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.97 }}
                        transition={SPRING_TACTILE}
                        disabled={formStatus === 'submitting'}
                        className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-accent px-6 py-2.5 text-[0.9375rem] font-semibold text-accent-fg spring-transition hover:bg-accent-hover disabled:opacity-60"
                      >
                        {formStatus === 'submitting'
                          ? 'Preparing brief...'
                          : 'Send Project Inquiry'}
                      </motion.button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
}
