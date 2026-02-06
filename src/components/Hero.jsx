import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const Hero = () => {
    const roles = ["Full Stack Developer", "MERN Specialist", "Webmaster Lead", "GenAI Enthusiast"];
    const [roleIndex, setRoleIndex] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setRoleIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const titleText = "I'm Mohit, a";

    return (
        <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/15 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-center z-10"
            >
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] uppercase tracking-[0.2em] font-bold text-primary mb-8 inline-block"
                >
                    Available for new projects
                </motion.span>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                    {titleText.split("").map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.5, ease: [0.2, 0.65, 0.3, 0.9] }}
                            className="inline-block"
                        >
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}<br />
                    <span className="text-primary relative inline-block h-[1.1em] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roleIndex}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -40 }}
                                transition={{ duration: 0.5, ease: "backOut" }}
                                className="inline-block"
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="text-lg md:text-2xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed font-light"
                >
                    Turning complex problems into elegant digital
                    <span className="text-white font-medium italic"> masterpieces</span>.
                </motion.p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Magnetic strength={0.2}>
                        <motion.a
                            whileTap={{ scale: 0.95 }}
                            href="https://drive.google.com/file/d/10w7ADlWPSOxkltF7ucb3BIG5nSH0mLMl/view?usp=sharing"
                            target="_blank"
                            className="px-10 py-5 bg-primary text-black font-black rounded-full flex items-center gap-3 glow-yellow group transition-all"
                        >
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            Resume
                        </motion.a>
                    </Magnetic>

                    <Magnetic strength={0.2}>
                        <motion.a
                            whileTap={{ scale: 0.95 }}
                            href="#projects"
                            className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-all flex items-center gap-2 group"
                        >
                            View Work
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.a>
                    </Magnetic>
                </div>
            </motion.div>

            {/* Decorative elements */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
            >
                <p className="text-[10px] uppercase tracking-[0.3em] text-text-muted">Scroll to explore</p>
                <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
            </motion.div>
        </section>
    );
};

export default Hero;
