import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MESSAGES = [
  "Servers are looking healthy today! 🟢",
  "Great scrolling technique!",
  "Mohit is a great hire. Just saying...",
  "Beep boop. Checking APIs...",
  "Are you a recruiter? Let's chat!",
  "Zero downtime so far.",
  "I'm his backend assistant."
];

export const VirtualPet = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const lastSeenSection = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1, // Range -1 to 1
        y: (e.clientY / window.innerHeight) * 2 - 1, // Range -1 to 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Random message generator (only if not scrolling)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6 && !message) {
        setMessage(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
        setTimeout(() => setMessage(''), 4000);
      }
    }, 12000);

    return () => clearInterval(interval);
  }, [message]);

  // Scroll contextual messages
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const sections = ['work', 'activity', 'difference', 'about', 'contact'];
        
        for (const id of sections) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            // Check if element is primarily in view
            if (rect.top >= -100 && rect.top <= window.innerHeight * 0.6) {
              if (lastSeenSection.current !== id) {
                lastSeenSection.current = id;
                const comments = {
                  'work': "Ooh, solid backend architecture here! 🏗️",
                  'activity': "Look at all those green commits! 🟩",
                  'difference': "Backend-first thinking saves hours of debugging.",
                  'about': "A robust tech stack for a solid engineer.",
                  'contact': "You should definitely email him! ✉️"
                };
                setMessage(comments[id]);
                setTimeout(() => {
                  setMessage((prev) => prev === comments[id] ? '' : prev);
                }, 5000);
              }
              break;
            }
          }
        }
      }, 200); // Debounce
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Calculate eye translation based on relative mouse position
  const eyeX = mousePosition.x * 3;
  const eyeY = mousePosition.y * 3;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2 pointer-events-none hidden md:flex">
      
      {/* Speech Bubble */}
      <AnimatePresence>
        {(message || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white text-black px-4 py-2 rounded-2xl rounded-br-sm text-xs font-medium shadow-2xl max-w-[200px]"
          >
            {isHovered ? "Pet me! Beep boop." : message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Bot */}
      <motion.div 
        className="relative w-14 h-14 bg-surface border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer pointer-events-auto hover:bg-white/5 transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        drag
        dragConstraints={{ left: -window.innerWidth + 100, right: 0, top: -window.innerHeight + 100, bottom: 0 }}
      >
        {/* Glow */}
        <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md" />
        
        {/* Face */}
        <div className="relative z-10 flex gap-2">
          {/* Left Eye */}
          <div className="w-2.5 h-3 bg-white/20 rounded-full overflow-hidden relative">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full absolute top-1/2 left-1/2"
              animate={{ x: eyeX - 3, y: eyeY - 3 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
          {/* Right Eye */}
          <div className="w-2.5 h-3 bg-white/20 rounded-full overflow-hidden relative">
            <motion.div 
              className="w-1.5 h-1.5 bg-primary rounded-full absolute top-1/2 left-1/2"
              animate={{ x: eyeX - 3, y: eyeY - 3 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};
