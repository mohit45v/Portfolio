import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { motion, useScroll, useSpring } from 'framer-motion';

import Background2D from './components/Background2D';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import GitHubStats from './components/GitHubStats';
import LeetCodeStats from './components/LeetCodeStats';
import Experience from './components/Experience';
import Blogs from './components/Blogs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import CommandMenu from './components/CommandMenu';
import InfiniteMarquee from './components/InfiniteMarquee';
import Terminal from './components/Terminal';

const App = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const skills = ["React", "Next.js", "Node.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Go", "AWS", "Docker", "Framer Motion", "Three.js", "Git"];

  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background text-white selection:bg-primary selection:text-black cursor-none">
      <CustomCursor />
      <CommandMenu />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[9999] origin-left"
        style={{ scaleX }}
      />
      <div className="grain-overlay" />
      <div className="spotlight" />
      <Background2D />
      <Header />
      <main className="relative z-10">
        <Hero />
        <InfiniteMarquee items={skills} speed={40} />
        <About />
        <Experience />
        <TechStack />
        <GitHubStats />
        <LeetCodeStats />
        <Projects />
        <Terminal />
        <Blogs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;