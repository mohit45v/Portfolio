import React from 'react';
import { motion } from 'framer-motion';
import { GitHubCalendar } from 'react-github-calendar';
import CountUp from 'react-countup';
import { Activity, Star, GitBranch, Code } from 'lucide-react';
import SpotlightCard from './SpotlightCard';

const GithubStats = () => {
    // ... stats and theme definitions
    const stats = [
        { label: "Total Contributions", value: 1200, icon: <Activity className="text-green-500" /> },
        { label: "Stars Earned", value: 85, icon: <Star className="text-yellow-500" /> },
        { label: "Pull Requests", value: 45, icon: <GitBranch className="text-blue-500" /> },
        { label: "Public Repos", value: 32, icon: <Code className="text-purple-500" /> },
    ];

    const theme = {
        light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section id="contributions" className="py-24 px-6 bg-white/[0.01]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Coding <span className="text-primary italic">Activity</span></h2>
                    <p className="text-text-muted text-lg">Daily contributions and open-source impact.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* GitHub Graph */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2"
                    >
                        <SpotlightCard className="p-8 flex items-center justify-center overflow-x-auto">
                            <GitHubCalendar
                                username="mohit" // Replace with actual username if provided
                                theme={theme}
                                fontSize={14}
                                blockSize={12}
                                blockMargin={4}
                            />
                        </SpotlightCard>
                    </motion.div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <SpotlightCard className="h-full">
                                    <div className="p-6 flex flex-col justify-between transition-all h-full">
                                        <div className="mb-4">{stat.icon}</div>
                                        <div>
                                            <h4 className="text-2xl font-bold">
                                                <CountUp end={stat.value} duration={3} />+
                                            </h4>
                                            <p className="text-[10px] text-text-muted uppercase tracking-widest">{stat.label}</p>
                                        </div>
                                    </div>
                                </SpotlightCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
