import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const API_URL = import.meta.env.VITE_API_URL;
const BUILD = __BUILD_INFO__;

// Poll slowly: this is ambient signal, not a monitoring dashboard.
const POLL_MS = 60_000;

const STATUS = {
  unknown:  { eye: '#a3a3a3', dot: 'bg-text-muted',  label: 'Build info only' },
  up:       { eye: '#34d399', dot: 'bg-emerald-400', label: 'All systems operational' },
  degraded: { eye: '#fbbf24', dot: 'bg-amber-400',   label: 'Degraded performance' },
  down:     { eye: '#f87171', dot: 'bg-red-400',     label: 'Service unreachable' },
};

const relativeTime = (iso) => {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (Number.isNaN(seconds)) return 'unknown';
  if (seconds < 60) return 'just now';

  const units = [
    ['d', 86400],
    ['h', 3600],
    ['m', 60],
  ];
  for (const [suffix, size] of units) {
    if (seconds >= size) return `${Math.floor(seconds / size)}${suffix} ago`;
  }
  return 'just now';
};

export const StatusPet = () => {
  const [pupil, setPupil] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(false);
  const [health, setHealth] = useState(null);
  const boundsRef = useRef(null);

  const prefersReducedMotion = usePrefersReducedMotion();
  const status = STATUS[health?.status] ?? STATUS.unknown;

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

  const eyeX = prefersReducedMotion ? 0 : pupil.x * 3;
  const eyeY = prefersReducedMotion ? 0 : pupil.y * 3;

  const Pupil = () => (
    <div className="w-2.5 h-3 bg-white/20 rounded-full overflow-hidden relative">
      <motion.div
        className="w-1.5 h-1.5 rounded-full absolute top-1/2 left-1/2"
        style={{ backgroundColor: status.eye }}
        animate={{ x: eyeX - 3, y: eyeY - 3 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </div>
  );

  return (
    // Full-viewport bounds element: framer measures this for drag limits, so the
    // constraints stay correct across resizes instead of being frozen at mount.
    <div
      ref={boundsRef}
      className="hidden md:block fixed inset-0 z-[90] pointer-events-none"
    >
      <div className="absolute bottom-6 right-6 flex flex-col items-end gap-3">
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
                <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                <span className="text-white/90">{status.label}</span>
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
          className="pointer-events-auto relative w-14 h-14 bg-surface border border-white/10 rounded-2xl shadow-2xl flex items-center justify-center cursor-pointer hover:bg-white/5 transition-colors"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          drag={!prefersReducedMotion}
          dragMomentum={false}
          dragConstraints={boundsRef}
        >
          <div
            className="absolute inset-0 rounded-2xl blur-md opacity-30"
            style={{ backgroundColor: status.eye }}
            aria-hidden="true"
          />
          <div className="relative z-10 flex gap-2" aria-hidden="true">
            <Pupil />
            <Pupil />
          </div>
        </motion.button>
      </div>
    </div>
  );
};
