import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Github, Linkedin, ExternalLink, MapPin, Activity, Code2, Rocket, Brain, Menu, X, Network } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import { ArchitectureDiagram } from './components/ArchitectureDiagram';
import { PageViews } from './components/PageViews';
import { useMediaQuery, usePrefersReducedMotion } from './hooks/useMediaQuery';

const projects = [
  {
    title: "Influence IQ",
    description: "AI-driven social influence analytics platform surfacing engagement signals and insights.",
    impact: "Reduced manual campaign analysis effort by automating influencer signal checks.",
    tech: ["Next.js", "React", "APIs"],
    repoLink: "https://github.com/mohit45v/influence-iq",
    liveLink: "https://influence-iq.vercel.app",
    architecture: [
      { id: 'client', label: 'Next.js', sublabel: 'Frontend', icon: 'LayoutTemplate' },
      { id: 'api', label: 'NestJS', sublabel: 'Backend API', icon: 'ServerCog' },
      { id: 'db', label: 'MongoDB', sublabel: 'Database', icon: 'Database' }
    ]
  },
  {
    title: "SymptomSage AI",
    description: "AI guidance tool using intelligent prompts for understood symptom-based insights.",
    impact: "Improved response relevance with prompt pipelines tuned for structured symptom inputs.",
    tech: ["Gemini", "Langflow", "React"],
    repoLink: "https://github.com/mohit45v/symptomsage-ai",
    liveLink: "https://symptomsage-ai.vercel.app",
    architecture: [
      { id: 'ui', label: 'React UI', sublabel: 'Client', icon: 'AppWindow' },
      { id: 'pipeline', label: 'Langflow', sublabel: 'Orchestrator', icon: 'Workflow' },
      { id: 'llm', label: 'Gemini AI', sublabel: 'Model', icon: 'BrainCircuit' }
    ]
  },
  {
    title: "Invoisify",
    description: "Automated invoicing platform for small teams and freelancers with structured data.",
    impact: "Removed repetitive billing workflow using template-driven invoice generation.",
    tech: ["MERN", "Automation", "React"],
    repoLink: "https://github.com/mohit45v/invoisify",
    liveLink: "https://invoisify.vercel.app",
  },
  {
    title: "Avalon Techfest",
    description: "Technical event platform and management for Avalon Technova.",
    impact: "Led and mentored peers during technical events.",
    tech: ["Web Development", "Leadership", "Mentorship"],
    repoLink: "https://github.com/mohit45v",
    liveLink: "https://www.avalontechfest.in/",
  }
];

const differentiators = [
  {
    icon: Code2,
    title: 'Backend-first thinking',
    detail: 'I design APIs and data models before UI, so products stay stable as they scale.',
  },
  {
    icon: Rocket,
    title: 'Execution speed',
    detail: 'From idea to shipped MVP fast, with production-ready structure and deployment in mind.',
  },
  {
    icon: Brain,
    title: 'AI + product blend',
    detail: 'I combine LLM workflows with real business logic, not just demo-level chat wrappers.',
  },
];

const experiences = [
  {
    company: "Akashic Technologies",
    role: "Full‑Stack Developer Intern",
    period: "Ongoing",
    description: "Building NestJS backend services and Angular dashboards for B2B automation workflows.",
    tags: ["NestJS", "Angular", "Meta APIs"]
  },
  {
    company: "V2V EdTech / MovieFlex",
    role: "Full‑Stack Developer Intern",
    period: "3 months",
    description: "Developed frontend UI and backend logic for content-driven web applications.",
    tags: ["PHP", "JavaScript", "Bootstrap"]
  }
];

const navLinks = [
  { href: '#work', label: 'Work' },
  { href: '#activity', label: 'Activity' },
  { href: '#difference', label: 'Difference' },
];

const GITHUB_THEME = {
  light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDiagram, setActiveDiagram] = useState(null);

  const lenisRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isWideViewport = useMediaQuery('(min-width: 640px)');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll — skipped entirely when the visitor asks for reduced motion.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    // Track the live frame id so cleanup cancels the pending frame, not just the first.
    let frameId = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  // Mobile menu: escape to close, focus trap, and scroll lock behind the overlay.
  useEffect(() => {
    if (!isMenuOpen) return;

    // Captured now so cleanup restores focus to the button that was mounted when we opened.
    const triggerButton = menuButtonRef.current;

    lenisRef.current?.stop();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(menuRef.current?.querySelectorAll('a[href], button') ?? []);

    focusables()[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;

      const items = focusables();
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      lenisRef.current?.start();
      triggerButton?.focus();
    };
  }, [isMenuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-background text-white selection:bg-primary selection:text-black min-h-screen font-sans antialiased">
        <div className="grain-overlay opacity-20 pointer-events-none" aria-hidden="true" />

        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-full focus:bg-primary focus:text-black focus:font-semibold"
        >
          Skip to content
        </a>

        {/* Floating Desktop Nav */}
        <div className="hidden md:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <nav aria-label="Primary" className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#111]/80 backdrop-blur-xl border border-white/10 shadow-2xl">
            <span className="font-bold tracking-tight text-sm mr-4 text-white">MOHIT.</span>
            <div className="w-px h-4 bg-white/20 mr-2"></div>
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="px-3 py-1.5 rounded-full text-sm font-medium text-text-muted hover:text-white hover:bg-white/10 transition-all">{label}</a>
            ))}
            <a href="#contact" className="px-3 py-1.5 rounded-full text-sm font-medium text-primary hover:bg-primary/10 transition-all">Contact</a>
          </nav>
        </div>

        {/* Mobile Top Bar */}
        <div className="md:hidden fixed top-0 w-full z-40 border-b border-white/5 backdrop-blur-md bg-background/50">
          <div className="px-6 h-16 flex items-center justify-between">
            <span className="font-bold tracking-tight text-lg">MOHIT.</span>
            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              className="text-white p-2 -mr-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu size={24} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Mobile Full-Screen Overlay Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              key="mobile-menu"
              id="mobile-menu"
              ref={menuRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center"
            >
              <button
                type="button"
                aria-label="Close navigation menu"
                className="absolute top-4 right-4 p-4 text-white min-h-[44px] min-w-[44px] flex items-center justify-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <X size={32} aria-hidden="true" />
              </button>
              <div className="flex flex-col gap-8 text-3xl font-bold text-center">
                {navLinks.map(({ href, label }) => (
                  <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">{label}</a>
                ))}
                <a href="#contact" onClick={() => setIsMenuOpen(false)} className="text-primary">Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main className="max-w-4xl mx-auto px-6 pt-24 sm:pt-32 pb-20">
          <section className="mb-20 sm:mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-[1.1]">
                Backend‑First <br className="hidden sm:block" />
                <span className="text-primary italic">Full‑Stack</span> Engineer
              </h1>
              <p className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed mb-8">
                I build automation products that move from API architecture to production UI with clear business outcomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 items-start sm:items-center">
                <a href="mailto:mohit.dhangar88@gmail.com" className="w-full sm:w-auto text-center bg-primary text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                  Get in touch
                </a>
                <div className="flex items-center gap-6 text-text-muted">
                  <a href="https://github.com/mohit45v" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="hover:text-white transition-colors"><Github size={22} aria-hidden="true" /></a>
                  <a href="https://linkedin.com/in/mohit45v" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="hover:text-white transition-colors"><Linkedin size={22} aria-hidden="true" /></a>
                </div>
              </div>
            </motion.div>
          </section>

          <section id="work" className="mb-20 sm:mb-32 scroll-mt-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
              <span className="w-8 h-px bg-white/10"></span> Selected Projects
            </h2>
            <div className="grid gap-12">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative grid md:grid-cols-[1fr_2fr] gap-8 items-start p-6 -mx-6 rounded-3xl hover:bg-white/[0.02] transition-colors"
                >
                  <div className="absolute inset-0 bg-primary/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10" />
                  <div className="text-text-muted text-sm tabular-nums">0{i + 1} —</div>
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="text-2xl font-bold">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="group-hover:text-primary transition-colors inline-flex items-center gap-2"
                        >
                          {project.title}
                          <ExternalLink size={18} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        </a>
                      </h3>
                    </div>
                    <p className="text-text-muted mb-3 leading-relaxed">{project.description}</p>
                    {project.impact && (
                      <p className="text-sm text-white/80 mb-4 leading-relaxed border-l-2 border-primary/40 pl-3">
                        {project.impact}
                      </p>
                    )}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {project.tech.map(t => (
                        <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-4 text-sm mb-4 flex-wrap">
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:underline underline-offset-4"
                      >
                        <Github size={14} aria-hidden="true" /> Repo
                      </a>
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-text-muted hover:text-white transition-colors"
                      >
                        <ExternalLink size={14} aria-hidden="true" /> Live Demo
                      </a>
                      {project.architecture && (
                        <button
                          type="button"
                          aria-expanded={activeDiagram === i}
                          onClick={() => setActiveDiagram(activeDiagram === i ? null : i)}
                          className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors ml-auto"
                        >
                          <Network size={14} aria-hidden="true" /> {activeDiagram === i ? 'Hide Architecture' : 'View Architecture'}
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {activeDiagram === i && project.architecture && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ArchitectureDiagram nodes={project.architecture} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section id="activity" className="mb-20 sm:mb-32 scroll-mt-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
              <span className="w-8 h-px bg-white/10"></span> Engineering Activity
            </h2>

            <div className="grid gap-8 max-w-3xl mx-auto">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-primary w-5 h-5" aria-hidden="true" />
                  <h3 className="font-bold">GitHub contributions</h3>
                </div>
                <div className="flex justify-center overflow-hidden">
                  {mounted && (
                    <div className="w-full max-w-full overflow-x-auto pb-4 scrollbar-hide">
                      <GitHubCalendar
                        username="mohit45v"
                        theme={GITHUB_THEME}
                        fontSize={12}
                        blockSize={isWideViewport ? 10 : 8}
                        blockMargin={4}
                        errorMessage="GitHub's contribution API is unavailable right now — see github.com/mohit45v directly."
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section id="difference" className="mb-20 sm:mb-32 scroll-mt-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
              <span className="w-8 h-px bg-white/10"></span> What Makes Me Different
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {differentiators.map(({ icon: Icon, title, detail }) => (
                <div key={title} className="p-5 rounded-2xl bg-white/5 border border-white/10">
                  <Icon className="w-4 h-4 text-primary mb-3" aria-hidden="true" />
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="experience" className="mb-20 sm:mb-32 scroll-mt-24">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
              <span className="w-8 h-px bg-white/10"></span> Experience
            </h2>
            <div className="space-y-12">
              {experiences.map((exp) => (
                <div key={exp.company} className="border-l border-white/10 pl-8 relative">
                  <div className="absolute w-2 h-2 bg-primary rounded-full -left-[4.5px] top-2" />
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    <span className="text-sm text-text-muted">{exp.period}</span>
                  </div>
                  <p className="text-primary text-sm mb-4 font-medium">{exp.role}</p>
                  <p className="text-text-muted text-sm leading-relaxed max-w-xl mb-4">{exp.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {exp.tags.map(tag => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="about" className="mb-20 sm:mb-32 scroll-mt-24">
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-8">About</h2>
                <p className="text-text-muted leading-relaxed">
                  Backend‑first Full‑Stack Engineer with a bias toward scalable architecture and clean abstractions.
                  Comfortable owning features end‑to‑end—from system design to production delivery.
                  Based in Thane, India.
                </p>
                <div className="flex items-center gap-2 text-sm text-text-muted mt-5">
                  <MapPin size={14} className="text-primary" aria-hidden="true" /> Thane, Maharashtra · India
                </div>
              </div>
              <div>
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Tech Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {["NestJS", "Node.js", "React", "Next.js", "Angular", "MongoDB", "Supabase", "Meta APIs", "Gemini AI", "Java", "Python"].map((skill) => (
                    <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="py-20 border-t border-white/5 scroll-mt-24">
            <div className="text-center">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to build?</h2>
              <a href="mailto:mohit.dhangar88@gmail.com" className="text-2xl md:text-3xl font-medium text-primary hover:underline underline-offset-8">
                mohit.dhangar88@gmail.com
              </a>
              <div className="flex justify-center gap-8 mt-12 text-text-muted">
                <a href="https://github.com/mohit45v" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a>
                <a href="https://linkedin.com/in/mohit45v" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
              </div>
            </div>
          </section>
        </main>

        <footer className="max-w-4xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted border-t border-white/5">
          <p>© 2026 Mohit Sonu Dhangar</p>
          <div className="flex items-center gap-4">
            <PageViews />
            <p className="flex items-center gap-2 italic">Crafted with simplicity <span className="text-primary">●</span></p>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
};

export default App;
