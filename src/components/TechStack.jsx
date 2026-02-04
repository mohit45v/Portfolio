import React from 'react';
import { motion } from 'framer-motion';
import {
    Code2, Cpu, Database, Globe, Layers, Zap,
    Terminal, Monitor, Server, Cloud, Boxes
} from 'lucide-react';
import Magnetic from './Magnetic';
import SpotlightCard from './SpotlightCard';

const TechCard = ({ tech, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
        >
            <SpotlightCard className="h-full">
                <Magnetic strength={0.2}>
                    <div className="p-6 flex flex-col items-center justify-center gap-4 cursor-pointer min-h-[140px] group relative overflow-hidden transition-colors">
                        <div className="text-white/50 group-hover:text-primary transition-all duration-500 transform group-hover:scale-110">
                            {React.cloneElement(tech.icon, { size: 32 })}
                        </div>

                        <div className="text-center">
                            <p className="text-sm font-bold group-hover:text-white transition-colors">{tech.name}</p>
                            <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] mt-1">{tech.category}</p>
                        </div>

                        {/* Subtle Internal Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </Magnetic>
            </SpotlightCard>
        </motion.div>
    );
};

const TechStack = () => {
    const techs = [
        { name: "React", category: "Frontend", icon: <Boxes /> },
        { name: "Next.js", category: "Fullstack", icon: <Monitor /> },
        { name: "Node.js", category: "Backend", icon: <Server /> },
        { name: "TypeScript", category: "Language", icon: <Code2 /> },
        { name: "Python", category: "Language", icon: <Terminal /> },
        { name: "Go", category: "Language", icon: <Zap /> },
        { name: "MongoDB", category: "Database", icon: <Database /> },
        { name: "PostgreSQL", category: "Database", icon: <Database /> },
        { name: "Docker", category: "DevOps", icon: <Layers /> },
        { name: "AWS", category: "Cloud", icon: <Cloud /> },
        { name: "Framer Motion", category: "Animation", icon: <Cpu /> },
        { name: "Tailwind", category: "Styling", icon: <Boxes /> },
    ];

    return (
        <section id="skills" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Tech <span className="text-primary italic">Arsenal</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted text-lg max-w-xl"
                    >
                        Tools and technologies I use to bring ideas to life.
                    </motion.p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {techs.map((tech, idx) => (
                        <TechCard key={tech.name} tech={tech} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
