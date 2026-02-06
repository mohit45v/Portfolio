import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-24 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Let's build <br /><span className="text-primary">something great</span>.</h2>
                    <p className="text-text-muted text-lg mb-10 max-w-md">
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                    </p>

                    <div className="space-y-6">
                        <a href="mailto:mohit.dhangar88@gmail.com" className="flex items-center gap-4 group">
                            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                                <Mail className="w-5 h-5 group-hover:text-black" />
                            </div>
                            <div>
                                <p className="text-xs text-text-muted uppercase tracking-widest font-bold">Email me</p>
                                <p className="text-lg font-medium">mohit.dhangar88@gmail.com</p>
                            </div>
                        </a>

                        <div className="flex gap-4 pt-4">
                            {[
                                { icon: <Github className="w-5 h-5" />, href: "https://github.com/mohit45v" },
                                { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/mohit45v/" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className="w-12 h-12 glass rounded-2xl flex items-center justify-center hover:bg-white/10 transition-all"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass p-8 rounded-3xl border border-white/10"
                >
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Email</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-text-muted ml-1">Message</label>
                            <textarea rows="4" placeholder="How can I help you?" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                        </div>

                        <button className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary transition-all glow-yellow">
                            <Send className="w-4 h-4" /> Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
