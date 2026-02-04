import React from 'react';

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-white/5">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold">M</div>
                    <span className="text-sm text-text-muted font-medium">© 2025 Mohit Reddy. All rights reserved.</span>
                </div>

                <div className="flex items-center gap-8">
                    <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-sm text-text-muted hover:text-white transition-colors">Terms</a>
                    <a href="https://github.com/mohit45v" className="text-sm text-text-muted hover:text-white transition-colors">GitHub</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
