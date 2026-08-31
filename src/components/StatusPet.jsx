import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const API_URL = import.meta.env.VITE_API_URL;
const BUILD = __BUILD_INFO__;

// Ambient signal, not a monitoring dashboard.
const POLL_MS = 60_000;
const MESSAGE_MS = 5000;

const STATUS = {
  up:       { dot: 'bg-emerald-400', label: 'All systems operational' },
  degraded: { dot: 'bg-amber-400',   label: 'Degraded performance' },
  down:     { dot: 'bg-red-400',     label: 'Service unreachable' },
};

// One line per section. These point at things a visitor would otherwise miss, or
// state something checkable — never a compliment about the person who built it.
const SECTION_NOTES = {
  work:       'Every card has a "View Architecture" toggle.',
  activity:   'Pulled live from GitHub’s API — not a screenshot.',
  difference: 'Three claims. The projects above are the evidence.',
  experience: 'Production work, not coursework.',
  about:      'This stack is what’s shipped, not what’s been read about.',
  contact:    'That address is real and goes straight to my inbox.',
};

const SECTION_IDS = Object.keys(SECTION_NOTES);

const relativeTime = (iso) => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (Number.isNaN(seconds)) return 'unknown';
  if (seconds < 60) return 'just now';

  for (const [suffix, size] of [['d', 86400], ['h', 3600], ['m', 60]]) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${suffix} ago`;
  }
  return 'just now';
};

export const StatusPet = () => {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [health, setHealth] = useState(null);
  const [message, setMessage] = useState('');
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0, top: 0, bottom: 0 });

  const messageTimer = useRef(null);
  const lastSection = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  const status = health?.status ? STATUS[health.status] : null;

  const say = useCallback((text) => {
    clearTimeout(messageTimer.current);
    setMessage(text);
    messageTimer.current = setTimeout(() => setMessage(''), MESSAGE_MS);
  }, []);

  useEffect(() => () => clearTimeout(messageTimer.current), []);

  // Eyes track the cursor.
  useEffect(() => {
    if (prefersReducedMotion) return;

    const onMove = (e) => {
      setPupil({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [prefersReducedMotion]);

  // Speak when a new section takes over the viewport. An IntersectionObserver
  // replaces the old debounced scroll handler: no work on every scroll frame.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const id = visible.target.id;
        if (id === lastSection.current) return;

        lastSection.current = id;
        if (SECTION_NOTES[id]) say(SECTION_NOTES[id]);
      },
      // A thin band near the top of the viewport. Ratio-based thresholds do not work
      // here: these sections are taller than the viewport, so their intersection
      // ratio can never approach 1 and a section can be skipped entirely.
      { rootMargin: '-15% 0px -75% 0px', threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [say]);

  // Live health, only when an API is actually configured.
  useEffect(() => {
    if (!API_URL) return;

    let cancelled = false;
    const controller = new AbortController();

    const poll = async () => {
      try {
        const res = await fetch(`${API_URL}/v1/health`, { signal: controller.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setHealth(data);
      } catch {
        if (!cancelled) setHealth({ status: 'down' });
      }
    };

    poll();
    const id = setInterval(poll, POLL_MS);

    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(id);
    };
  }, []);

  // Keep drag limits in sync with the viewport. Measuring once at mount (or handing
  // framer a ref for dragConstraints) leaves the pet stranded after a resize.
  useEffect(() => {
    const update = () => {
      const margin = 96;
      setDragBounds({
        left: -(window.innerWidth - margin),
        right: 0,
        top: -(window.innerHeight - margin),
        bottom: 0,
      });
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const eyeX = prefersReducedMotion ? 0 : pupil.x * 3;
  const eyeY = prefersReducedMotion ? 0 : pupil.y * 3;

  const bubble = isHovered
    ? `Build ${BUILD.sha} · deployed ${relativeTime(BUILD.builtAt)}`
    : message;

  const Eye = () => (
    <div className="w-2.5 h-3 bg-white/20 rounded-full overflow-hidden relative">
      <motion.div
        className="w-1.5 h-1.5 bg-primary rounded-full absolute top-1/2 left-1/2"
        animate={{ x: eyeX - 3, y: eyeY - 3 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </div>
  );

  return (
    <div className="hidden md:block fixed inset-0 z-[90] pointer-events-none">
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
        {/* Ambient chatter: decorative, so it stays out of the accessibility tree. */}
        <AnimatePresence>
          {bubble && !isOpen && (
            <motion.div
              key="bubble"
              aria-hidden="true"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-2 text-xs font-medium text-black shadow-2xl"
            >
              {bubble}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="status-panel"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              className="pointer-events-auto w-64 rounded-2xl bg-[#111]/95 backdrop-blur-xl border border-white/10 shadow-2xl p-4 font-mono text-[11px]"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-2 h-2 rounded-full ${status?.dot ?? 'bg-primary'}`} />
                <span className="text-white/90">{status?.label ?? 'Build info'}</span>
              </div>

              <dl className="space-y-1.5 text-text-muted">
                <div className="flex justify-between gap-4">
                  <dt>build</dt>
                  <dd className="text-white/80">{BUILD.sha}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt>deployed</dt>
                  <dd className="text-white/80">{relativeTime(BUILD.builtAt)}</dd>
                </div>
                {typeof health?.uptime30d === 'number' && (
                  <div className="flex justify-between gap-4">
                    <dt>uptime 30d</dt>
                    <dd className="text-white/80">{health.uptime30d.toFixed(2)}%</dd>
                  </div>
                )}
                {typeof health?.p95Ms === 'number' && (
                  <div className="flex justify-between gap-4">
                    <dt>p95</dt>
                    <dd className="text-white/80">{health.p95Ms}ms</dd>
                  </div>
                )}
              </dl>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          aria-label="System status"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="pointer-events-auto relative w-14 h-14 bg-surface border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          drag={!prefersReducedMotion}
          dragMomentum={false}
          dragConstraints={dragBounds}
        >
          <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-md" aria-hidden="true" />

          {/* Health badge only appears once there is real health data to report. */}
          {status && (
            <span
              aria-hidden="true"
              className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background ${status.dot}`}
            />
          )}

          <div className="relative z-10 flex gap-2" aria-hidden="true">
            <Eye />
            <Eye />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
