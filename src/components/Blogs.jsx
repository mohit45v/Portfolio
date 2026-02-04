import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';
import SpotlightCard from './SpotlightCard';

const BlogCard = ({ blog, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            className="group"
        >
            <SpotlightCard className="h-full">
                <Magnetic strength={0.1}>
                    <div className="p-8 rounded-[2.5rem] transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                        {/* Category Tag */}
                        <div className="flex items-center gap-2 mb-6">
                            <span className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-primary">
                                {blog.category}
                            </span>
                        </div>

                        <h3 className="text-2xl font-black mb-4 group-hover:text-primary transition-colors duration-300 leading-tight">
                            {blog.title}
                        </h3>

                        <p className="text-text-muted text-lg mb-8 leading-relaxed line-clamp-3">
                            {blog.excerpt}
                        </p>

                        <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-wider text-text-muted font-bold">
                            <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3 h-3" /> {blog.date}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-3 h-3" /> {blog.readTime}
                                </span>
                            </div>
                            <ArrowUpRight className="w-4 h-4 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </div>

                        {/* Subtle Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </Magnetic>
            </SpotlightCard>
        </motion.div>
    );
};

const Blogs = () => {
    const blogs = [
        {
            title: "Architecting Scalable Microservices with Go",
            excerpt: "Explore the patterns and practices for building high-performance, distributed systems using Go's concurrency model and efficient networking stack.",
            date: "Jan 12, 2024",
            readTime: "8 min read",
            category: "Backend",
        },
        {
            title: "Mastering Framer Motion for Premium UX",
            excerpt: "A deep dive into advanced animation techniques that transform standard web interfaces into fluid, interactive digital masterpieces.",
            date: "Dec 28, 2023",
            readTime: "12 min read",
            category: "Frontend",
        },
        {
            title: "The Future of AI in Modern Web Apps",
            excerpt: "Integrating Large Language Models into daily workflows and production applications to enhance user interaction and automate complex tasks.",
            date: "Nov 15, 2023",
            readTime: "10 min read",
            category: "GenAI",
        },
    ];

    return (
        <section id="blogs" className="py-24 px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl md:text-5xl font-bold mb-4"
                        >
                            Latest <span className="text-primary italic">Insights</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-text-muted text-lg max-w-xl"
                        >
                            Sharing my thoughts on software engineering, design, and AI.
                        </motion.p>
                    </div>

                    <motion.a
                        href="#"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-xs uppercase tracking-widest font-bold text-primary border-b border-primary/30 pb-1 hover:border-primary transition-all"
                    >
                        View all posts
                    </motion.a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, idx) => (
                        <BlogCard key={blog.title} blog={blog} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blogs;
