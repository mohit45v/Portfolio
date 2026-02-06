import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'system', content: 'Welcome to Antigravity CLI v1.0.0' },
        { type: 'system', content: 'Type "help" to see available commands.' }
    ]);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);

    const commands = {
        help: () => 'Available commands: about, skills, projects, contact, clear, help',
        about: () => 'I am Mohit, a Full Stack Developer & MERN Specialist. I ship clean, production-grade systems and love polishing the last 10% of UX.',
        skills: () => 'React, Next.js, Node.js, TypeScript, Go, MongoDB, PostgreSQL, Docker, AWS, Framer Motion, GSAP, Socket.io.',
        projects: () => 'Avalon 2025 (Live), Invoisify (MERN), InfluenceIQ (AI Analytics), CampusSync (Real-time).',
        contact: () => 'Email: mohit.dhangar88@gmail.com | GitHub: @mohit45v | LinkedIn: /in/mohit45v',
        clear: () => {
            setHistory([]);
            return null;
        }
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const trimmedInput = input.trim().toLowerCase();
            const newHistory = [...history, { type: 'user', content: `> ${input}` }];

            if (commands[trimmedInput]) {
                const result = commands[trimmedInput]();
                if (result) newHistory.push({ type: 'system', content: result });
            } else if (trimmedInput !== '') {
                newHistory.push({ type: 'error', content: `Command not found: ${trimmedInput}` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    return (
        <section id="terminal" className="py-24 px-6 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl font-mono text-sm"
            >
                {/* Terminal Header */}
                <div className="bg-white/5 border-b border-white/10 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <TerminalIcon size={16} className="text-primary" />
                        <span className="text-[10px] text-text-muted uppercase tracking-widest font-bold">mohit_terminal_v1</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-white/5" />
                        <div className="w-3 h-3 rounded-full bg-white/5" />
                        <div className="w-3 h-3 rounded-full bg-white/5" />
                    </div>
                </div>

                {/* Terminal Body */}
                <div
                    ref={scrollRef}
                    className="p-6 h-[400px] overflow-y-auto space-y-2 selection:bg-primary selection:text-black"
                >
                    {history.map((record, idx) => (
                        <div key={idx} className={
                            record.type === 'user' ? 'text-white' :
                                record.type === 'error' ? 'text-red-400' :
                                    'text-primary/80'
                        }>
                            {record.content}
                        </div>
                    ))}
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-primary">mohit ~</span>
                        <input
                            autoFocus
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleCommand}
                            className="bg-transparent border-none outline-none flex-1 text-white"
                            spellCheck="false"
                        />
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default Terminal;
