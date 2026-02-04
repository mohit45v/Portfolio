import React from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, Zap, Layers, Cpu } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const BentoCard = ({ icon, title, desc, size, idx }) => {
    const [rotate, setRotate] = React.useState({ x: 0, y: 0 });

    const onMouseMove = React.useCallback((e) => {
        const card = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - card.left;
        const y = e.clientY - card.top;
        const centerX = card.width / 2;
        const centerY = card.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        setRotate({ x: rotateX, y: rotateY });
    }, []);

    const onMouseLeave = () => setRotate({ x: 0, y: 0 });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={size}
        >
            <SpotlightCard className="h-full">
                <div
                    onMouseMove={onMouseMove}
                    onMouseLeave={onMouseLeave}
                    style={{
                        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                        transition: 'transform 0.1s ease-out'
                    }}
                    className="bento-card relative group overflow-hidden flex flex-col justify-start p-8 h-full"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/10">
                        {icon}
                    </div>

                    <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-text-muted text-lg leading-relaxed">{desc}</p>

                    {/* Dynamic Glow */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/10 blur-[50px] rounded-full transition-opacity opacity-0 group-hover:opacity-100" />
                </div>
            </SpotlightCard>
        </motion.div>
    );
};

const About = () => {
    const cards = [
        {
            title: "Backend Systems",
            desc: "Architecting scalable server-side solutions with Node.js and Go.",
            icon: <Database className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />,
            size: "col-span-1 row-span-2",
        },
        {
            title: "Frontend Engineering",
            desc: "Building pixel-perfect interfaces with React and Next.js.",
            icon: <Globe className="w-6 h-6 text-green-400 group-hover:text-green-300" />,
            size: "col-span-1 md:col-span-2",
        },
        {
            title: "API Design",
            desc: "Robust REST and GraphQL API development with security at the core.",
            icon: <Zap className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400" />,
            size: "col-span-1",
        },
        {
            title: "System Architecture",
            desc: "Designing secure, high-availability, and distributed infrastructures.",
            icon: <Layers className="w-6 h-6 text-purple-400 group-hover:text-purple-300" />,
            size: "col-span-1 md:col-span-2",
        },
        {
            title: "AI Integrations",
            desc: "Leveraging LLMs and fine-tuning to build production AI applications.",
            icon: <Cpu className="w-6 h-6 text-red-500 group-hover:text-red-400" />,
            size: "col-span-1",
        },
    ];

    return (
        <section id="about" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="mb-16">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-4"
                >
                    Things I <span className="text-primary italic">Love</span>
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-text-muted text-lg max-w-xl"
                >
                    My core specializations and architectural approach to building modern software.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
                {cards.map((card, idx) => (
                    <BentoCard key={idx} {...card} idx={idx} />
                ))}
            </div>
        </section>
    );
};

export default About;
