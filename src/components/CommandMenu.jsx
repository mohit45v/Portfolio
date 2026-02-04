import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, ArrowRight, User, Briefcase, Mail, FileText, Code } from 'lucide-react';

const CommandMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const actions = [
        { name: "Go to About", icon: <User size={18} />, href: "#about" },
        { name: "View Projects", icon: <Briefcase size={18} />, href: "#projects" },
        { name: "Contact Me", icon: <Mail size={18} />, href: "#contact" },
        { name: "LeetCode Stats", icon: <Code size={18} />, href: "#leetcode" },
        { name: "Download Resume", icon: <FileText size={18} />, href: "#hero" },
    ];

    useEffect(() => {
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const filteredActions = actions.filter(action =>
        action.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Menu */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-xl glass overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                    >
                        {/* Search Bar */}
                        <div className="flex items-center px-6 py-4 border-b border-white/10">
                            <Search className="text-text-muted mr-4" size={20} />
                            <input
                                autoFocus
                                placeholder="Search commands..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-white text-lg placeholder:text-text-muted/50"
                            />
                            <div className="ml-4 flex items-center gap-1.5 px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[10px] text-text-muted uppercase">
                                <Command size={10} />
                                <span>K</span>
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-[60vh] overflow-y-auto p-2">
                            {filteredActions.length > 0 ? (
                                filteredActions.map((action, idx) => (
                                    <a
                                        key={idx}
                                        href={action.href}
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-primary/10 transition-colors group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-white/5 rounded-xl group-hover:text-primary transition-colors">
                                                {action.icon}
                                            </div>
                                            <span className="text-white font-medium">{action.name}</span>
                                        </div>
                                        <ArrowRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                    </a>
                                ))
                            ) : (
                                <div className="p-10 text-center text-text-muted">
                                    No results found for "{search}"
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-white/[0.02] border-t border-white/5 flex items-center gap-6 text-[10px] text-text-muted uppercase tracking-widest font-bold">
                            <span>Esc to close</span>
                            <span>↑↓ to navigate</span>
                            <span>Enter to select</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CommandMenu;
