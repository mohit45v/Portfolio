import React from 'react';

const InfiniteMarquee = ({ items, speed = 20, direction = 'left' }) => {
    return (
        <div className="relative w-full overflow-hidden bg-white/[0.01] border-y border-white/5 py-10">
            <div className={`flex w-fit ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
                {/* Double the items to create the infinite effect */}
                {[...items, ...items, ...items].map((item, idx) => (
                    <div
                        key={idx}
                        className="mx-12 flex items-center gap-4 text-2xl font-black uppercase tracking-tighter text-white/20 whitespace-nowrap hover:text-primary transition-colors cursor-default"
                    >
                        <span className="w-2 h-2 rounded-full bg-primary/20" />
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InfiniteMarquee;
