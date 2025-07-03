import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import {
  Terminal, Zap, Coffee, Gamepad2, Music, Brain, Rocket, Heart, Download, Moon, Sun, ExternalLink, Github
} from 'lucide-react';

const UniquePortfolio = () => {
  const [currentMode, setCurrentMode] = useState('terminal');
  const [terminalText, setTerminalText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const threeRef = useRef();
  const sceneRef = useRef();
  const animationRef = useRef();

  const modes = ['terminal', 'retro', 'minimal', 'chaos', 'experience'];

  // Global styles for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes bounce-in {
        0% { opacity: 0; transform: scale(0.3); }
        50% { transform: scale(1.05); }
        70% { transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-gradient-shift { 
        animation: gradient-shift 6s ease infinite; 
      }
      .animate-bounce-in { 
        animation: bounce-in 0.8s ease-out; 
      }
      .animate-fade-in { 
        animation: fade-in 0.6s ease-out; 
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const terminalCommands = [
    { command: "whoami", response: "mohit@codeverse.dev" },
    { command: "pwd", response: "/home/mohit/portfolio" },
    { command: "ls -la", response: "drwxr-xr-x  projects/\ndrwxr-xr-x  skills/\ndrwxr-xr-x  experience/\n-rw-r--r--  README.md" },
    { command: "cat README.md", response: "🚀 Full Stack Developer\n💻 MERN Stack Expert\n🎯 Problem Solver\n🔥 Creative Coder" },
    { command: "cd projects && ls", response: "Invoisify/     Avalon2025/\nInfluenceIQ/   Team11/\nCampusSync/" },
    { command: "git status", response: "On branch main\nYour branch is up to date with 'origin/main'.\nAll commits pushed successfully! 🎉" },
    { command: "npm start", response: "Starting development server...\n✨ Portfolio loaded successfully!\n🌐 Server running on http://localhost:3000" }
  ];

  const experiences = [
    {
      id: 'levelsupermind',
      title: 'LevelSuperMind Hackathon',
      role: 'Full Stack Developer',
      project: 'InfluenceIQ - Social Media Analyzer',
      date: 'January 2019',
      teamSize: 4,
      techStack: ['MERN Stack', 'GenAI', 'Machine Learning', 'Data Analytics'],
      description: 'Developed an AI-powered social media analytics platform with sentiment analysis and engagement insights.',
      achievement: 'Successfully deployed full-stack solution',
      type: 'hackathon',
      icon: '🧠',
      color: 'from-blue-500 to-purple-500',
      highlights: ['Backend & Frontend Development', 'AI Integration', 'Team Collaboration', 'Real-time Analytics']
    },
    {
      id: 'hackfusion',
      title: 'HackFusion 2022',
      role: 'Full Stack Developer',
      project: 'CampusSync - College Management System',
      date: 'February 2022',
      teamSize: 4,
      techStack: ['MERN Stack', 'GenAI', 'Socket.io', 'JWT Auth'],
      description: 'Built comprehensive college management system with student portal, faculty dashboard, and real-time communication.',
      achievement: 'Top 8 Position Secured',
      type: 'hackathon',
      icon: '🏆',
      color: 'from-green-500 to-teal-500',
      highlights: ['Leadership Skills', 'Complex System Architecture', 'Real-time Features', 'User Experience Design']
    },
    {
      id: 'hackoverflow',
      title: 'HackOverflow 2022',
      role: 'Team Lead',
      project: 'InternConnect - Freelancing Platform',
      date: 'March 2022',
      teamSize: 5,
      techStack: ['MERN Stack', 'GenAI', 'Payment Gateway', 'Cloud Storage'],
      description: 'Led team development of freelancing platform for internships and project collaborations with integrated payment system.',
      achievement: 'Qualified for Semi-Finals',
      type: 'hackathon',
      icon: '👨‍💼',
      color: 'from-orange-500 to-red-500',
      highlights: ['Team Leadership', 'Project Management', 'Client Requirements', 'Scalable Architecture']
    },
    {
      id: 'polytechnical',
      title: 'Polytechnical Winter Fest',
      role: 'Technical Head',
      project: 'Event Management & Coordination',
      date: 'Winter 2023',
      teamSize: 15,
      techStack: ['Event Management', 'Team Coordination', 'Technical Solutions', 'Problem Solving'],
      description: 'Managed technical aspects of college winter fest including stage setup, sound systems, lighting, and digital displays.',
      achievement: 'Successfully coordinated 500+ participants',
      type: 'leadership',
      icon: '❄️',
      color: 'from-cyan-500 to-blue-500',
      highlights: ['Technical Management', 'Large Team Coordination', 'Event Planning', 'Crisis Management']
    },
    {
      id: 'avalon-webmaster',
      title: 'Avalon TechFest 2025',
      role: 'Webmaster Lead',
      project: 'Complete Website Development',
      date: 'March 2025',
      teamSize: 8,
      techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'Node.js', 'Database'],
      description: 'Led website development team for official techfest website featuring event registration, admin panel, real-time updates, and complete backend management.',
      achievement: 'Live Production Website',
      type: 'leadership',
      icon: '🌐',
      color: 'from-purple-500 to-pink-500',
      highlights: ['Team Leadership', 'Full-Stack Development', 'Admin Panel Design', 'Event Registration System']
    }
  ];

  const projects = [
    {
      id: 'invoisify',
      title: 'Invoisify',
      description: 'Modern invoice management system with dynamic templates and seamless workflow automation.',
      tech: ['MERN Stack', 'TailwindCSS', 'JWT Auth', 'PDF Generation'],
      vibe: 'productive',
      emoji: '🧾',
      status: 'stable',
      link: 'https://github.com/TanishqMSD/invoisify',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'avalon-techfest',
      title: 'Avalon 2025',
      description: 'Official techfest website featuring event registration, scheduling, and real-time updates.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'GSAP'],
      vibe: 'eventful',
      emoji: '🎉',
      status: 'live',
      link: 'https://github.com/mohit45v/Avalon2025',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'influenceiq',
      title: 'InfluenceIQ',
      description: 'AI-powered social media analytics platform with sentiment analysis and engagement insights.',
      tech: ['MERN', 'GenAI', 'Langflow', 'Charts.js'],
      vibe: 'insightful',
      emoji: '📊',
      status: 'beta',
      link: 'https://github.com/TanishqMSD/socialmedia-analyzer',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      id: 'team11',
      title: 'Team11',
      description: 'Fantasy cricket prediction engine using machine learning and statistical analysis.',
      tech: ['Langflow', 'MERN', 'AI/ML', 'Data Analytics'],
      vibe: 'sporty',
      emoji: '🏏',
      status: 'experimental',
      link: 'https://github.com/pranaysanap/Fantacy-Prediction',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'campussync',
      title: 'CampusSync',
      description: 'Comprehensive college management system with student portal and faculty dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      vibe: 'academic',
      emoji: '🏫',
      status: 'deployed',
      link: 'https://github.com/mohit45v/hackfusion',
      gradient: 'from-indigo-500 to-purple-500'
    }
  ];

  // Initialize Three.js scene for chaos mode
  const initThreeScene = useCallback(() => {
    if (!threeRef.current || sceneRef.current) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0.2);
      renderer.setPixelRatio(window.devicePixelRatio);
      threeRef.current.appendChild(renderer.domElement);

      // Create floating particles
      const geometry = new THREE.BufferGeometry();
      const particleCount = 300;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100;
        positions[i + 1] = (Math.random() - 0.5) * 100;
        positions[i + 2] = (Math.random() - 0.5) * 100;

        colors[i] = Math.random() * 0.5 + 0.5;
        colors[i + 1] = Math.random() * 0.5 + 0.5;
        colors[i + 2] = Math.random() * 0.5 + 0.5;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.PointsMaterial({
        size: 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      camera.position.z = 50;

      const animate = () => {
        animationRef.current = requestAnimationFrame(animate);

        particles.rotation.x += 0.002;
        particles.rotation.y += 0.003;
        particles.rotation.z += 0.001;

        renderer.render(scene, camera);
      };

      animate();
      sceneRef.current = { scene, camera, renderer, particles };
    } catch (error) {
      console.error('Error initializing Three.js scene:', error);
    }
  }, []);

  // Cleanup Three.js
  const cleanupThreeScene = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    if (threeRef.current && sceneRef.current) {
      threeRef.current.innerHTML = '';
      sceneRef.current = null;
    }
  }, []);

  // Terminal typing effect
  useEffect(() => {
    let current = 0;
    let currentText = '';
    let isTypingCommand = true;
    let commandIndex = 0;
    let responseIndex = 0;

    const typeNext = () => {
      if (current >= terminalCommands.length) {
        setIsTyping(false);
        setIsLoaded(true);
        return;
      }

      const currentCommand = terminalCommands[current];
      
      if (isTypingCommand) {
        // Type the command character by character
        if (commandIndex < currentCommand.command.length) {
          currentText += currentCommand.command[commandIndex];
          setTerminalText(currentText);
          commandIndex++;
          setTimeout(typeNext, 50); // Faster typing for commands
        } else {
          // Command finished, add newline and start typing response
          currentText += '\n';
          setTerminalText(currentText);
          isTypingCommand = false;
          commandIndex = 0;
          setTimeout(typeNext, 500); // Pause before response
        }
      } else {
        // Type the response character by character
        if (responseIndex < currentCommand.response.length) {
          currentText += currentCommand.response[responseIndex];
          setTerminalText(currentText);
          responseIndex++;
          setTimeout(typeNext, 30); // Slower typing for responses
        } else {
          // Response finished, move to next command
          currentText += '\n\n';
          setTerminalText(currentText);
          current++;
          isTypingCommand = true;
          responseIndex = 0;
          setTimeout(typeNext, 800); // Pause between commands
        }
      }
    };

    const timeout = setTimeout(typeNext, 500);
    return () => clearTimeout(timeout);
  }, []);

  // Chaos mode effects
  useEffect(() => {
    if (currentMode === 'chaos') {
      initThreeScene();

      const glitchInterval = setInterval(() => {
        setGlitchActive(prev => !prev);
      }, 2000);

      return () => {
        clearInterval(glitchInterval);
        cleanupThreeScene();
      };
    } else {
      cleanupThreeScene();
    }
  }, [currentMode, initThreeScene, cleanupThreeScene]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (sceneRef.current) {
        const { camera, renderer } = sceneRef.current;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
      
      // Update mobile state
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when mode changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [currentMode]);

  const ResumeButton = () => (
    <a
      href="https://drive.google.com/file/d/10w7ADlWPSOxkltF7ucb3BIG5nSH0mLMl/view?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg flex items-center gap-2 hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 font-semibold"
    >
      <Download className="w-5 h-5" />
      Resume
    </a>
  );

  const ResponsiveNavbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-white">MOHIT.DEV</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {modes.map(mode => (
              <button
                key={mode}
                onClick={() => setCurrentMode(mode)}
                className={`px-4 py-2 rounded-xl font-mono text-sm transition-all duration-300 transform hover:scale-105 ${
                  currentMode === mode
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-black shadow-lg'
                    : 'bg-gray-800/50 text-white hover:bg-gray-700/50'
                }`}
              >
                {mode}
              </button>
            ))}
            {/* Theme Toggle in Desktop */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-800/50 text-white p-2 rounded-xl hover:bg-gray-700/50 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle in Mobile */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="text-white hover:text-gray-300 p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300 p-2 rounded-lg hover:bg-gray-700/50 transition-all duration-300"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 rounded-lg mt-2">
              {modes.map(mode => (
                <button
                  key={mode}
                  onClick={() => setCurrentMode(mode)}
                  className={`w-full text-left px-3 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                    currentMode === mode
                      ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-black'
                      : 'text-white hover:bg-gray-700'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const ProjectCard = ({ project, className = "" }) => (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={`group block ${className}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl group-hover:animate-bounce">{project.emoji}</span>
        <h3 className="font-bold text-lg">{project.title}</h3>
        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <p className="text-sm mb-3 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.tech.map(tech => (
          <span 
            key={tech} 
            className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 transition-all duration-300"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
        STATUS: <span className="font-bold">{project.status.toUpperCase()}</span>
      </div>
    </a>
  );

  const TerminalMode = () => (
    <div className={`min-h-screen font-mono p-4 sm:p-8 pt-20 transition-colors duration-500 ${darkMode ? 'bg-black text-green-400' : 'bg-gray-100 text-green-600'
      }`}>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="w-6 h-6" />
            <span className="text-lg sm:text-xl">mohit@codeverse:~$</span>
          </div>
          <div className={`p-4 sm:p-6 rounded-lg border-2 ${darkMode ? 'bg-gray-900 border-green-400' : 'bg-white border-green-600'
            }`}>
            <pre className="whitespace-pre-wrap text-sm sm:text-base">
              {terminalText}
              {isTyping && <span className={`inline-block w-2 h-6 ${darkMode ? 'bg-green-400' : 'bg-green-600'} animate-pulse`}>█</span>}
            </pre>
          </div>
        </div>

        {isLoaded && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 animate-fade-in">
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                className={`border-2 p-4 rounded-lg transition-all duration-300 ${darkMode
                  ? 'border-green-400 hover:bg-green-400 hover:text-black'
                  : 'border-green-600 hover:bg-green-600 hover:text-white'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const RetroMode = () => (
    <div className="min-h-screen relative overflow-hidden pt-40 sm:pt-48 md:pt-56">
      <div
        className="absolute inset-0 animate-gradient-shift"
        style={{
          background: 'linear-gradient(-45deg, #ff006e, #8338ec, #3a86ff, #06ffa5)',
          backgroundSize: '400% 400%'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto p-4 sm:p-8 text-white">
        <div className="text-center mb-8 sm:mb-16 animate-bounce-in">
          <h1
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 drop-shadow-2xl transform -rotate-2"
            style={{
              textShadow: '4px 4px 0px #000, 8px 8px 0px rgba(0,0,0,0.3)',
              fontFamily: 'Impact, sans-serif'
            }}
          >
            MOHIT.DEV
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-bold">~ PIXEL PUSHER EXTRAORDINAIRE ~</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`transform ${index % 2 === 0 ? 'rotate-1' : '-rotate-1'} hover:rotate-0 transition-all duration-300`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                project={project}
                className="bg-white text-black p-4 sm:p-6 rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 [&_.text-xs]:bg-gray-800 [&_.text-xs]:text-white [&_.bg-gray-200]:bg-gray-800 [&_.text-gray-800]:text-white"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const MinimalMode = () => (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}>
      <div className="max-w-4xl mx-auto p-4 sm:p-8 pt-40 sm:pt-48 md:pt-56">
        <div className="text-center mb-12 sm:mb-20">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-thin mb-8 tracking-wider">mohit</h1>
          <div className={`w-32 h-0.5 mx-auto mb-8 ${darkMode ? 'bg-white' : 'bg-black'}`}></div>
          <p className="text-lg sm:text-xl font-light opacity-80">I make things. Sometimes they work.</p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col md:${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center gap-6 sm:gap-8 md:gap-12 group`}
            >
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-light mb-4 group-hover:tracking-wider transition-all duration-300">
                  {project.title}
                </h3>
                <p className={`mb-6 leading-relaxed text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                  {project.tech.map(tech => (
                    <span
                      key={tech}
                      className={`text-xs sm:text-sm pb-1 border-b transition-colors duration-300 ${darkMode
                        ? 'text-gray-400 border-gray-600 hover:border-white'
                        : 'text-gray-500 border-gray-300 hover:border-black'
                        }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center text-2xl sm:text-4xl transition-all duration-300 group-hover:scale-110 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
              >
                {project.emoji}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ExperienceMode = () => {
    const [selectedExperience, setSelectedExperience] = useState(null);
    const [filter, setFilter] = useState('all');

    const filteredExperiences = experiences.filter(exp =>
      filter === 'all' || exp.type === filter
    );

    const ExperienceCard = ({ experience, index }) => (
      <div
        className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${index % 2 === 0 ? 'md:translate-x-0' : 'md:translate-x-4'
          }`}
        onClick={() => setSelectedExperience(experience)}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${experience.color} opacity-20 rounded-2xl blur-lg group-hover:opacity-40 transition-opacity duration-300`} />

        <div className={`relative p-4 sm:p-6 rounded-2xl border-2 transition-all duration-300 ${darkMode
            ? 'bg-gray-900 border-gray-700 hover:border-cyan-400'
            : 'bg-white border-gray-200 hover:border-blue-400'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl animate-bounce">{experience.icon}</span>
              <div>
                <h3 className="font-bold text-base sm:text-lg">{experience.title}</h3>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  {experience.role}
                </p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs sm:text-sm font-mono">{experience.date}</p>
              <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${experience.type === 'hackathon'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-purple-100 text-purple-800'
                }`}>
                {experience.type === 'hackathon' ? '🏁' : '👑'} {experience.type}
              </div>
            </div>
          </div>

          <h4 className="font-semibold mb-2 text-sm sm:text-base">{experience.project}</h4>
          <p className={`text-xs sm:text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {experience.description}
          </p>

          <div className="flex flex-wrap gap-1 sm:gap-2 mb-4">
            {experience.techStack.map(tech => (
              <span
                key={tech}
                className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${darkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-100 text-gray-700'
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-300 gap-2">
            <div>
              <span className="text-xs sm:text-sm font-mono">Team Size: </span>
              <span className="font-bold text-sm sm:text-base">{experience.teamSize} members</span>
            </div>
            <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm ${experience.achievement.includes('Top') || experience.achievement.includes('Successfully')
                ? 'bg-green-100 text-green-800'
                : 'bg-blue-100 text-blue-800'
              }`}>
              🏆 {experience.achievement}
            </div>
          </div>
        </div>
      </div>
    );

    const ExperienceModal = ({ experience, onClose }) => (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black bg-opacity-75">
        <div className={`max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-4 sm:p-6 ${darkMode ? 'bg-gray-900' : 'bg-white'
          }`}>
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold">{experience.title}</h2>
            <button
              onClick={onClose}
              className="text-xl sm:text-2xl hover:opacity-70 transition-opacity p-1"
            >
              ×
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
              <span className="text-3xl sm:text-4xl">{experience.icon}</span>
              <div>
                <h3 className="font-bold text-lg sm:text-xl">{experience.project}</h3>
                <p className={`text-sm sm:text-base ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
                  {experience.role} • {experience.date}
                </p>
              </div>
            </div>

            <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {experience.description}
            </p>

            <div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Key Highlights:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experience.highlights.map(highlight => (
                  <div key={highlight} className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    <span className="text-xs sm:text-sm">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2 text-sm sm:text-base">Technology Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map(tech => (
                  <span
                    key={tech}
                    className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${darkMode
                        ? 'bg-gray-800 text-gray-300'
                        : 'bg-gray-100 text-gray-700'
                      }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-300 gap-2">
              <div>
                <span className="text-xs sm:text-sm font-mono">Team Size: </span>
                <span className="font-bold text-sm sm:text-base">{experience.teamSize} members</span>
              </div>
              <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm ${experience.achievement.includes('Top') || experience.achievement.includes('Successfully')
                  ? 'bg-green-100 text-green-800'
                  : 'bg-blue-100 text-blue-800'
                }`}>
                🏆 {experience.achievement}
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    return (
      <div className={`min-h-screen transition-colors duration-500 pt-40 sm:pt-48 md:pt-56 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
        }`}>
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Experience Timeline</h1>
            <p className="text-base sm:text-lg opacity-70">A journey through hackathons, leadership, and tech adventures.</p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${filter === 'all'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-black shadow-lg'
                : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${filter === 'hackathon'
                ? 'bg-gradient-to-r from-orange-400 to-pink-400 text-black shadow-lg'
                : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              onClick={() => setFilter('hackathon')}
            >
              Hackathons
            </button>
            <button
              className={`px-3 sm:px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${filter === 'leadership'
                ? 'bg-gradient-to-r from-purple-400 to-blue-400 text-black shadow-lg'
                : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              onClick={() => setFilter('leadership')}
            >
              Leadership
            </button>
          </div>

          {/* Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
            {filteredExperiences.map((exp, idx) => (
              <ExperienceCard key={exp.id} experience={exp} index={idx} />
            ))}
          </div>
        </div>

        {/* Modal */}
        {selectedExperience && (
          <ExperienceModal
            experience={selectedExperience}
            onClose={() => setSelectedExperience(null)}
          />
        )}
      </div>
    );
  };

  // Main render logic
  return (
    <div>
      <ResponsiveNavbar />
      <ResumeButton />
      {currentMode === 'terminal' && <TerminalMode />}
      {currentMode === 'retro' && <RetroMode />}
      {currentMode === 'minimal' && <MinimalMode />}
      {currentMode === 'chaos' && (
        <div className="relative min-h-screen">
          <div ref={threeRef} className="absolute inset-0 z-0" />
          <div className={`relative z-10 transition-all duration-300 ${glitchActive ? 'filter blur-sm brightness-150 contrast-150' : ''}`}>
            <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900/80 text-white' : 'bg-white/80 text-black'}`}>
              <div className="max-w-6xl mx-auto p-4 sm:p-8 pt-40 sm:pt-48 md:pt-56">
                <div className="text-center mb-8 sm:mb-16">
                  <h1 className="text-3xl sm:text-5xl md:text-7xl font-thin mb-8 tracking-wider animate-pulse">mohit</h1>
                  <div className={`w-32 h-0.5 mx-auto mb-8 ${darkMode ? 'bg-white' : 'bg-black'}`}></div>
                  <p className="text-lg sm:text-xl font-light opacity-80">I make things. Sometimes they work.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                  {projects.map((project, index) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      className={`p-4 sm:p-6 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 ${darkMode 
                        ? 'bg-gray-800/90 border border-gray-600 hover:border-cyan-400' 
                        : 'bg-white/90 border border-gray-200 hover:border-blue-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          {glitchActive && (
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-500 opacity-50 animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-full h-1 bg-blue-500 opacity-50 animate-pulse"></div>
            </div>
          )}
        </div>
      )}
      {currentMode === 'experience' && <ExperienceMode />}
    </div>
  );
};

export default UniquePortfolio;