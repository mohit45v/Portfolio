import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink, MapPin, Sparkles, Activity, Trophy } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';

const projects = [
  {
    title: "Influence IQ",
    description: "AI-driven social influence analytics platform surfacing engagement signals and insights.",
    tech: ["Next.js", "React", "APIs"],
    link: "https://github.com/mohit45v",
  },
  {
    title: "SymptomSage AI",
    description: "AI guidance tool using intelligent prompts for understood symptom-based insights.",
    tech: ["Gemini", "Langflow", "React"],
    link: "https://github.com/mohit45v",
  },
  {
    title: "Invoisify",
    description: "Automated invoicing platform for small teams and freelancers with structured data.",
    tech: ["MERN", "Automation", "React"],
    link: "https://github.com/mohit45v",
  }
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

const leetcodeStats = {
  solved: 90,
  breakdown: {
    easy: 53,
    medium: 28,
    hard: 9
  },
  ranking: "1.5M",
  acceptance: "66.6%"
};

const App = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const githubTheme = {
    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  return (
    <div className="bg-background text-white selection:bg-primary selection:text-black min-h-screen font-sans antialiased">
      <div className="grain-overlay opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-md bg-background/50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-tight text-lg underline decoration-primary decoration-2 underline-offset-4">MOHIT.</span>
          <div className="flex gap-6 text-sm text-text-muted">
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <a href="#activity" className="hover:text-white transition-colors">Activity</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        {/* Hero */}
        <section className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-xs mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Open to Remote & Relocation
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              Backend‑First <br />
              <span className="text-primary italic">Full‑Stack</span> Engineer
            </h1>
            <p className="text-xl text-text-muted max-w-2xl leading-relaxed mb-8">
              Building B2B automation platforms, API‑driven systems, and AI‑powered products with NestJS and React.
            </p>
            <div className="flex gap-4">
              <a href="mailto:mohit.dhangar88@gmail.com" className="bg-primary text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform">
                Get in touch
              </a>
              <div className="flex items-center gap-4 text-text-muted ml-4">
                <a href="https://github.com/mohit45v" target="_blank" rel="noreferrer" className="hover:text-white"><Github size={20} /></a>
                <a href="https://linkedin.com/in/mohit45v" target="_blank" rel="noreferrer" className="hover:text-white"><Linkedin size={20} /></a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Selected Work */}
        <section id="work" className="mb-32">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
            <span className="w-8 h-px bg-white/10"></span> Selected Projects
          </h2>
          <div className="grid gap-12">
            {projects.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative grid md:grid-cols-[1fr,2fr] gap-8 items-start"
              >
                <div className="text-text-muted text-sm tabular-nums">0{i + 1} —</div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                    <ExternalLink size={18} className="text-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-text-muted mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-text-muted">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Activity Section */}
        <section id="activity" className="mb-32">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
            <span className="w-8 h-px bg-white/10"></span> Engineering Activity
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* GitHub Contributions */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-primary w-5 h-5" />
                <h3 className="font-bold">GitHub contributions</h3>
              </div>
              <div className="flex justify-center">
                {mounted && (
                  <GitHubCalendar
                    username="mohit45v"
                    theme={githubTheme}
                    fontSize={12}
                    blockSize={10}
                    blockMargin={4}
                  />
                )}
              </div>
            </div>

            {/* LeetCode Stats */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="text-primary w-5 h-5" />
                <h3 className="font-bold">LeetCode Mastery</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/5 col-span-2">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-bold">{leetcodeStats.solved}</span>
                    <span className="text-[10px] text-text-muted uppercase tracking-wider mb-1">Solved Total</span>
                  </div>
                  <div className="flex gap-1 h-1.5 w-full rounded-full overflow-hidden bg-white/5">
                    <div className="bg-emerald-500" style={{ width: `${(leetcodeStats.breakdown.easy / leetcodeStats.solved) * 100}%` }} />
                    <div className="bg-yellow-500" style={{ width: `${(leetcodeStats.breakdown.medium / leetcodeStats.solved) * 100}%` }} />
                    <div className="bg-red-500" style={{ width: `${(leetcodeStats.breakdown.hard / leetcodeStats.solved) * 100}%` }} />
                  </div>
                  <div className="flex justify-between mt-2 text-[8px] uppercase tracking-tighter font-bold">
                    <span className="text-emerald-500">Easy {leetcodeStats.breakdown.easy}</span>
                    <span className="text-yellow-500">Med {leetcodeStats.breakdown.medium}</span>
                    <span className="text-red-500">Hard {leetcodeStats.breakdown.hard}</span>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <span className="block text-2xl font-bold">#{leetcodeStats.ranking}</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">Rank</span>
                </div>
                <div className="p-4 rounded-xl bg-white/5">
                  <span className="block text-2xl font-bold">{leetcodeStats.acceptance}</span>
                  <span className="text-[10px] text-text-muted uppercase tracking-wider">Acc.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="mb-32">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-12 flex items-center gap-2">
            <span className="w-8 h-px bg-white/10"></span> Experience
          </h2>
          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div key={i} className="border-l border-white/10 pl-8 relative">
                <div className="absolute w-2 h-2 bg-primary rounded-full -left-[4.5px] top-2" />
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                  <span className="text-sm text-text-muted">{exp.period}</span>
                </div>
                <p className="text-primary text-sm mb-4 font-medium">{exp.role}</p>
                <p className="text-text-muted text-sm leading-relaxed max-w-xl">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About / Skills */}
        <section id="about" className="mb-32">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-8">About</h2>
              <p className="text-text-muted leading-relaxed">
                Backend‑first Full‑Stack Engineer with a bias toward scalable architecture and clean abstractions.
                Comfortable owning features end‑to‑end—from system design to production delivery.
                Based in Thane, India.
              </p>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text-muted mb-8">Tech Stack</h2>
              <div className="flex flex-wrap gap-2">
                {["NestJS", "Node.js", "React", "Next.js", "Angular", "MongoDB", "Supabase", "Meta APIs", "Gemini AI", "Java", "Python"].map(skill => (
                  <span key={skill} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20 border-t border-white/5">
          <div className="text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Ready to build?</h2>
            <a href="mailto:mohit.dhangar88@gmail.com" className="text-2xl md:text-3xl font-medium text-primary hover:underline underline-offset-8">
              mohit.dhangar88@gmail.com
            </a>
            <div className="flex justify-center gap-8 mt-12 text-text-muted">
              <a href="https://github.com/mohit45v" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/mohit45v" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="https://twitter.com/mohit45v" className="hover:text-white transition-colors">Twitter</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="max-w-4xl mx-auto px-6 py-12 flex justify-between items-center text-xs text-text-muted border-t border-white/5">
        <p>© 2026 Mohit Sonu Dhangar</p>
        <p className="flex items-center gap-2 italic">Crafted with simplicity <span className="text-primary">●</span></p>
      </footer>
    </div>
  );
};

export default App;