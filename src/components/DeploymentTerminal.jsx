import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, X, CheckCircle, Loader2 } from 'lucide-react';

const DEPLOYMENT_LOGS = [
  "Initializing deployment sequence...",
  "Authenticating with cloud provider...",
  "Fetching latest commit from main branch...",
  "Installing dependencies (npm ci)...",
  "Running linter and unit tests...",
  "All tests passed.",
  "Building optimized production build...",
  "Building Docker image mohit45v/portfolio:latest...",
  "Pushing image to container registry...",
  "Image pushed successfully.",
  "Deploying to Kubernetes cluster...",
  "Waiting for pods to be ready...",
  "Running health checks...",
  "Health checks passed. Traffic routed.",
  "Deployment complete."
];

export const DeploymentTerminal = ({ isOpen, onClose }) => {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('idle'); // idle, deploying, success
  const logsEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setLogs([]);
      setStatus('deploying');
      let currentIndex = 0;
      
      const interval = setInterval(() => {
        if (currentIndex < DEPLOYMENT_LOGS.length) {
          setLogs(prev => [...prev, DEPLOYMENT_LOGS[currentIndex]]);
          currentIndex++;
        } else {
          clearInterval(interval);
          setStatus('success');
        }
      }, 400); // 400ms between each log line

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm bg-background/80"
      >
        <motion.div 
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[60vh] max-h-[500px]"
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs text-text-muted font-mono flex items-center gap-2">
                <Terminal size={14} /> deploy_script.sh
              </span>
            </div>
            <button 
              onClick={onClose}
              className="text-text-muted hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Terminal Body */}
          <div className="p-4 sm:p-6 font-mono text-sm overflow-y-auto flex-1 bg-black/50">
            <div className="space-y-2">
              {logs.map((log, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <span className="text-primary shrink-0">❯</span>
                  <span className="text-white/80">{log}</span>
                </motion.div>
              ))}
              
              {status === 'deploying' && (
                <div className="flex gap-3 items-center text-text-muted mt-2">
                  <span className="text-primary shrink-0">❯</span>
                  <Loader2 size={14} className="animate-spin" />
                </div>
              )}

              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3"
                >
                  <CheckCircle size={20} />
                  <div>
                    <strong className="block font-semibold">Production deployment successful!</strong>
                    <span className="text-emerald-400/80 text-xs mt-1 block">Thanks for checking out my portfolio. Let's build something great together.</span>
                  </div>
                </motion.div>
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
