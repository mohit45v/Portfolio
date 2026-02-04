import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Monitor } from 'lucide-react';
import Magnetic from './Magnetic';
import SpotlightCard from './SpotlightCard';

const ProjectCard = ({ project, idx }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        >
            <SpotlightCard>
                <Magnetic strength={0.1}>
                    {/* Mockup Window */}
                    <div className="rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:border-primary/20">
                        {/* Toolbar */}
                        <div className="bg-white/5 border-b border-white/5 px-6 py-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                <div className="w-3 h-3 rounded-full bg-green-500/30" />
                            </div>
                            <div className="flex items-center gap-2 bg-black/40 px-4 py-1.5 rounded-full text-[10px] text-text-muted font-mono tracking-wider">
                                <Monitor className="w-3 h-3" />
                                localhost:3000
                            </div>
                            <div className="w-12" />
                        </div>

                        {/* Content */}
                        <div className="relative aspect-video bg-black/40 overflow-hidden flex items-center justify-center p-8">
                            <div className={`absolute inset-0 opacity-10 blur-[100px] ${project.color}`} />
                            <div className="relative z-10 text-center">
                                <h3 className="text-3xl font-black mb-4 tracking-tight">{project.title}</h3>
                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    {project.tech.map(t => (
                                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] uppercase tracking-widest font-bold">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-center gap-6">
                                    <a href={project.link} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10">
                                        <Github className="w-5 h-5" />
                                    </a>
                                    <a href={project.demo} className="px-8 py-3 bg-primary text-black font-black rounded-full text-xs flex items-center gap-2 glow-yellow">
                                        <ExternalLink className="w-4 h-4" /> EXPLORE
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Magnetic>
            </SpotlightCard>

            <div className="mt-8 px-4">
                <p className="text-text-muted leading-relaxed font-light text-lg">{project.desc}</p>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: "Invoisify",
            desc: "Modern invoice management system with dynamic templates and seamless workflow automation. Built for speed and reliability.",
            tech: ["React", "Node.js", "TailwindCSS", "PostgreSQL"],
            link: "https://github.com/TanishqMSD/invoisify",
            demo: "#",
            color: "bg-blue-500",
        },
        {
            title: "InfluenceIQ",
            desc: "AI-powered social media analytics platform with sentiment analysis and engagement insights for influencers.",
            tech: ["Next.js", "Gemini AI", "Langchain", "MongoDB"],
            link: "https://github.com/TanishqMSD/socialmedia-analyzer",
            demo: "#",
            color: "bg-purple-500",
        },
        {
            title: "CampusSync",
            desc: "Comprehensive college management system with student portal, faculty dashboard, and real-time communication.",
            tech: ["React", "Express", "Socket.io", "Redis"],
            link: "https://github.com/mohit45v/hackfusion",
            demo: "#",
            color: "bg-green-500",
        },
    ];

    return (
        <section id="projects" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">My <span className="text-primary italic">Ventures</span></h2>
                <p className="text-text-muted text-lg max-w-xl">Digital products built with passion and precision.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {projects.map((project, idx) => (
                    <ProjectCard key={project.title} project={project} idx={idx} />
                ))}
            </div>
        </section>
    );
};

export default Projects;
