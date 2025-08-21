import React, { useEffect, useMemo, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Download, MapPin, Briefcase, Rocket, Code2, Sparkles } from 'lucide-react';

const projects = [
  {
    id: 'invoisify',
    title: 'Invoisify',
    description: 'Invoice management with dynamic templates and automated workflows.',
    tech: ['MERN', 'Tailwind', 'JWT', 'PDF'],
    link: 'https://github.com/TanishqMSD/invoisify',
    highlight: 'Operations-grade reliability',
  },
  {
    id: 'avalon',
    title: 'Avalon 2025',
    description: 'Official techfest site with realtime updates and registration.',
    tech: ['HTML', 'CSS', 'JS', 'GSAP'],
    link: 'https://github.com/mohit45v/Avalon2025',
    highlight: 'Live production usage',
  },
  {
    id: 'influenceiq',
    title: 'InfluenceIQ',
    description: 'AI social analytics with sentiment and engagement insights.',
    tech: ['MERN', 'GenAI', 'Langflow', 'Charts'],
    link: 'https://github.com/TanishqMSD/socialmedia-analyzer',
    highlight: 'Data-driven decisions',
  },
  {
    id: 'team11',
    title: 'Team11',
    description: 'Fantasy cricket predictions using ML and statistics.',
    tech: ['Langflow', 'MERN', 'ML', 'Analytics'],
    link: 'https://github.com/pranaysanap/Fantacy-Prediction',
    highlight: 'Experimental models',
  },
];

const experiences = [
  {
    company: 'LevelSuperMind',
    role: 'Full Stack Developer',
    period: 'Jan 2019',
    summary: 'Built InfluenceIQ: AI-driven social analytics.',
    tags: ['MERN', 'GenAI', 'Data'],
  },
  {
    company: 'HackFusion',
    role: 'Full Stack Developer',
    period: 'Feb 2022',
    summary: 'CampusSync: real-time college management system.',
    tags: ['Socket.io', 'JWT', 'UX'],
  },
  {
    company: 'HackOverflow',
    role: 'Team Lead',
    period: 'Mar 2022',
    summary: 'InternConnect: freelancing platform with payments.',
    tags: ['Leadership', 'Payments', 'Cloud'],
  },
  {
    company: 'Avalon TechFest',
    role: 'Webmaster Lead',
    period: 'Mar 2025',
    summary: 'Led full-stack site with admin panel and live ops.',
    tags: ['GSAP', 'Node', 'Prod'],
  },
];

const skills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'TypeScript', level: 75 },
  { name: 'CSS/Tailwind', level: 88 },
  { name: 'Three/GSAP', level: 65 },
];

function GradientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,255,200,0.18),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(0,140,255,0.18),transparent_45%)]" />
      <div className="absolute inset-0 opacity-50" style={{ background: 'linear-gradient(120deg, rgba(0,0,0,0.25), transparent 30%, rgba(255,255,255,0.04) 70%)' }} />
    </div>
  );
}

const Chip = ({ children }) => (
  <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 border border-white/15 backdrop-blur-sm">
    {children}
  </span>
);

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="flex items-end justify-between mb-6">
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-white/95 flex items-center gap-2">
        <Icon className="w-5 h-5 text-cyan-400" /> {title}
      </h2>
      {subtitle && <p className="text-white/60 text-sm mt-1">{subtitle}</p>}
    </div>
    <div className="h-px w-24 bg-white/15" />
  </div>
);

export default function PrimeApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen text-white bg-[#0b0f14] selection:bg-cyan-400/30 selection:text-white">
      <GradientBackground />

      <header className="sticky top-0 z-40 border-b border-white/10 backdrop-blur-xl bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-500" />
            <span className="font-semibold tracking-wide">MOHIT.DEV</span>
          </div>
          <nav className="hidden sm:flex items-center gap-3">
            <a href="#projects" className="text-sm text-white/80 hover:text-white">Projects</a>
            <a href="#experience" className="text-sm text-white/80 hover:text-white">Experience</a>
            <a href="#skills" className="text-sm text-white/80 hover:text-white">Skills</a>
            <a href="#contact" className="text-sm text-white/80 hover:text-white">Contact</a>
          </nav>
          <a
            href="https://drive.google.com/file/d/10w7ADlWPSOxkltF7ucb3BIG5nSH0mLMl/view?usp=sharing"
            target="_blank" rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold hover:from-cyan-300 hover:to-blue-400 transition-colors"
          >
            <Download className="w-4 h-4" /> Resume
          </a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <section className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-12">
          <div className="grid md:grid-cols-[1.1fr,0.9fr] gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-4">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Open to SDE/Full‑Stack roles
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Building delightful, reliable web products.
              </h1>
              <p className="mt-4 text-white/70 max-w-xl">
                Full‑stack developer specializing in MERN, motion, and data‑driven UX. I ship clean systems and polish the last 10%.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Chip>#MERN</Chip>
                <Chip>#GenAI</Chip>
                <Chip>#Performance</Chip>
                <Chip>#DX</Chip>
              </div>
              <div className="mt-7 flex items-center gap-3">
                <a href="#projects" className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90">View work</a>
                <a href="mailto:mohit@example.com" className="px-4 py-2 rounded-lg border border-white/20 hover:border-white/40 text-white/90">Let’s talk</a>
              </div>
              <div className="mt-6 flex items-center gap-4 text-white/70">
                <span className="inline-flex items-center gap-1 text-sm"><MapPin className="w-4 h-4" /> India</span>
                <span className="inline-flex items-center gap-1 text-sm"><Briefcase className="w-4 h-4" /> 10+ projects</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-400/10 to-blue-500/10 blur-2xl rounded-3xl" />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 p-6">
                <div className="grid grid-cols-2 gap-4">
                  {projects.slice(0,4).map(p => (
                    <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-black/30 p-4 hover:border-cyan-400/60 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-white/90">{p.title}</h3>
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-cyan-400" />
                      </div>
                      <p className="mt-2 text-xs text-white/60">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-1">
                        {p.tech.slice(0,3).map(t => (
                          <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/10">{t}</span>
                        ))}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="py-8">
          <SectionTitle icon={Code2} title="Featured projects" subtitle="What I build reflects how I think: simple, scalable, and tasteful." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(p => (
              <a key={p.id} href={p.link} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-cyan-400/60 transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-cyan-400" />
                </div>
                <p className="mt-2 text-sm text-white/70">{p.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-black/40 text-white/80 border border-white/10">{t}</span>
                  ))}
                </div>
                <div className="mt-4 text-xs text-white/60">{p.highlight}</div>
              </a>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-10">
          <SectionTitle icon={Rocket} title="Experience" subtitle="Impact over titles. Ownership end‑to‑end." />
          <div className="grid md:grid-cols-2 gap-6">
            {experiences.map((e, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-white">{e.company}</h3>
                    <p className="text-sm text-white/70">{e.role} • {e.period}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/75">{e.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {e.tags.map(t => (
                    <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-black/40 text-white/80 border border-white/10">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-10">
          <SectionTitle icon={Briefcase} title="Skills" subtitle="Breadth across the stack, depth where it matters." />
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map(s => (
              <div key={s.name} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center justify-between">
                  <span>{s.name}</span>
                  <span className="text-white/70 text-sm">{s.level}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" style={{ width: `${s.level}%`, transition: mounted ? 'width 800ms ease' : 'none' }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-12">
          <SectionTitle icon={Mail} title="Contact" subtitle="Let’s build something you’ll be proud to ship." />
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Available for opportunities</h3>
              <p className="text-white/70 text-sm">Remote preferred • MERN • Product‑minded engineering</p>
            </div>
            <div className="flex items-center gap-3">
              <a href="mailto:mohit@example.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90"><Mail className="w-4 h-4" /> Email</a>
              <a href="https://github.com/mohit45v" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40"><Github className="w-4 h-4" /> GitHub</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:border-white/40"><Linkedin className="w-4 h-4" /> LinkedIn</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-white/60 text-sm">
          <span>© {year} Mohit. Crafted with React.</span>
          <span className="inline-flex items-center gap-1"><Code2 className="w-4 h-4" /> v1.0</span>
        </div>
      </footer>
    </div>
  );
}



