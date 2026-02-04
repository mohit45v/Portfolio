import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Trophy, Target, Zap, Award } from 'lucide-react';
import Magnetic from './Magnetic';
import SpotlightCard from './SpotlightCard';

const StatBar = ({ label, value, total, color, delay }) => {
    const percentage = (value / total) * 100;

    return (
        <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase tracking-[0.2em] font-bold">
                <span className="text-text-muted">{label}</span>
                <span className="text-white">{value} <span className="text-text-muted">/ {total}</span></span>
            </div>
            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: delay, duration: 1.5, ease: "circOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
};

const LeetCodeStats = () => {
    // Placeholder data - ideally this could be fetched from an API
    const data = {
        totalSolved: 450,
        totalQuestions: 3000,
        easy: { solved: 150, total: 800, color: "bg-emerald-500" },
        medium: { solved: 250, total: 1600, color: "bg-yellow-500" },
        hard: { solved: 50, total: 600, color: "bg-red-500" },
        ranking: "85,432",
        acceptance: "65.4%",
        contestRating: "1745"
    };

    return (
        <section id="leetcode" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4"
                    >
                        Algorithms <span className="text-primary italic">& Skills</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-text-muted text-lg max-w-xl"
                    >
                        Quantitative breakdown of my problem-solving journey on LeetCode.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Stats Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <SpotlightCard className="h-full">
                            <Magnetic strength={0.1}>
                                <div className="p-10 flex flex-col items-center justify-center text-center h-full relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <div className="w-32 h-32 rounded-full border-4 border-white/5 flex items-center justify-center mb-6 relative">
                                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                                <circle
                                                    cx="64"
                                                    cy="64"
                                                    r="60"
                                                    fill="transparent"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    className="text-primary/10"
                                                />
                                                <motion.circle
                                                    cx="64"
                                                    cy="64"
                                                    r="60"
                                                    fill="transparent"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                    strokeDasharray="377"
                                                    initial={{ strokeDashoffset: 377 }}
                                                    whileInView={{ strokeDashoffset: 377 - (377 * (data.totalSolved / 1000)) }} // Just for viz
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 2, ease: "circOut" }}
                                                    className="text-primary"
                                                />
                                            </svg>
                                            <div className="text-center">
                                                <span className="text-4xl font-black block">
                                                    <CountUp end={data.totalSolved} duration={3} />
                                                </span>
                                                <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">Solved</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Global Ranking</h3>
                                        <p className="text-primary font-black text-2xl tracking-tighter">#{data.ranking}</p>
                                    </div>

                                    {/* Background Decoration */}
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Trophy size={120} />
                                    </div>
                                </div>
                            </Magnetic>
                        </SpotlightCard>
                    </motion.div>

                    {/* Difficulty Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-1"
                    >
                        <SpotlightCard className="h-full">
                            <div className="p-10 h-full flex flex-col justify-center space-y-8">
                                <StatBar label="Easy" value={data.easy.solved} total={data.easy.total} color={data.easy.color} delay={0.2} />
                                <StatBar label="Medium" value={data.medium.solved} total={data.medium.total} color={data.medium.color} delay={0.3} />
                                <StatBar label="Hard" value={data.hard.solved} total={data.hard.total} color={data.hard.color} delay={0.4} />
                            </div>
                        </SpotlightCard>
                    </motion.div>

                    {/* Additional Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 grid grid-cols-1 gap-4"
                    >
                        {[
                            { label: "Acceptance Rate", value: data.acceptance, icon: <Target className="text-blue-500" />, desc: "Average success per submission" },
                            { label: "Contest Rating", value: data.contestRating, icon: <Zap className="text-yellow-500" />, desc: "Competitive programming performance" },
                        ].map((item, idx) => (
                            <SpotlightCard key={idx}>
                                <Magnetic strength={0.15}>
                                    <div className="p-8 flex flex-col justify-between h-full group transition-all">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-primary/10 transition-colors">
                                                {item.icon}
                                            </div>
                                            <span className="text-2xl font-black">{item.value}</span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest text-white mb-1">{item.label}</p>
                                            <p className="text-[10px] text-text-muted leading-tight">{item.desc}</p>
                                        </div>
                                    </div>
                                </Magnetic>
                            </SpotlightCard>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LeetCodeStats;
