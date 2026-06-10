import React from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';

const AnimatedArrow = () => {
  return (
    <div className="flex-1 flex items-center justify-center min-w-[40px] max-w-[100px] relative px-2">
      {/* Background track */}
      <div className="h-0.5 w-full bg-white/10 rounded-full" />
      
      {/* Animated dash */}
      <motion.div
        className="absolute h-1 w-8 bg-primary rounded-full blur-[1px]"
        initial={{ left: 0, opacity: 0 }}
        animate={{ 
          left: ['0%', '100%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ transform: 'translateX(-50%)' }}
      />
      {/* Arrow head */}
      <div className="absolute right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 transform rotate-45 -translate-y-[1px]" />
    </div>
  );
};

export const ArchitectureDiagram = ({ nodes = [] }) => {
  if (!nodes || nodes.length === 0) return null;

  return (
    <div className="my-6 p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between min-w-max">
        {nodes.map((node, index) => {
          const IconComponent = LucideIcons[node.icon] || LucideIcons.Box;
          
          return (
            <React.Fragment key={node.id}>
              {/* Node */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center gap-3 relative z-10"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center relative group hover:border-primary/50 transition-colors">
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 bg-primary/5 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <IconComponent className="w-6 h-6 text-text-muted group-hover:text-primary transition-colors relative z-10" />
                </div>
                <div className="text-center">
                  <p className="text-xs font-semibold text-white/90 mb-0.5">{node.label}</p>
                  <p className="text-[10px] text-text-muted">{node.sublabel}</p>
                </div>
              </motion.div>

              {/* Arrow (render between nodes, not after the last one) */}
              {index < nodes.length - 1 && <AnimatedArrow />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
