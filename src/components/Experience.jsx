import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ExternalLink } from 'lucide-react';

const ExperienceItem = ({ role, company, period, description, location, idx }) => (
    <motion.div
        initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative pl-8 pb-12 last:pb-0 group"
    >
        {/* Timeline Line */}
        <div className="absolute left-0 top-0 h-full w-[2px] bg-white/10 group-last:h-0">
            <div className="absolute top-0 -left-[5px] w-3 h-3 rounded-full bg-primary border-4 border-background" />
        </div>

        <div className="glass p-8 rounded-3xl transition-all hover:border-primary/20 hover:bg-white/[0.03]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{role}</h3>
                    <p className="text-white/60 font-medium flex items-center gap-2">
                        <Briefcase className="w-4 h-4" /> {company}
                    </p>
                </div>
                <div className="flex flex-col md:items-end gap-2 text-sm text-text-muted">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {period}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {location}</p>
                </div>
            </div>

            <ul className="space-y-3">
                {description.map((item, i) => (
                    <li key={i} className="flex gap-3 text-text-muted leading-relaxed">
                        <span className="text-primary mt-1.5">•</span>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const Experience = () => {
    const experiences = [
        {
            role: "Full Stack Developer (InfluenceIQ)",
            company: "LevelSuperMind",
            period: "Jan 2025",
            location: "Remote",
            description: [
                "Built InfluenceIQ: AI-driven social analytics platform.",
                "Integrated GenAI and Langflow for sentiment and engagement insights.",
                "Architected data-driven dashboards for performance tracking."
            ]
        },
        {
            role: "Full Stack Developer (CampusSync)",
            company: "HackFusion",
            period: "Feb 2025",
            location: "Event",
            description: [
                "Developed CampusSync: a real-time college management system.",
                "Implemented Socket.io for live communication and JWT for secure auth.",
                "Optimized UX for multi-role dashboard management."
            ]
        },
        {
            role: "Team Lead (InternConnect)",
            company: "HackOverflow",
            period: "Mar 2025",
            location: "Competition",
            description: [
                "Led the development of InternConnect: a freelancing platform.",
                "Integrated secure payment gateways and cloud storage solutions.",
                "Managed team workflows and architectural decisions."
            ]
        },
        {
            role: "Webmaster Lead",
            company: "Avalon TechFest",
            period: "Mar 2025",
            location: "College",
            description: [
                "Led development of the official techfest site (Avalon 2025).",
                "Implemented advanced GSAP animations and live registration ops.",
                "Managed admin panel for real-time event updates."
            ]
        }
    ];

    return (
        <section id="experience" className="py-24 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Professional <span className="text-primary">Journey</span></h2>
                    <p className="text-text-muted text-lg">My path through top tech roles and impactful projects.</p>
                </div>

                <div className="space-y-6">
                    {experiences.map((exp, idx) => (
                        <ExperienceItem key={idx} {...exp} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
