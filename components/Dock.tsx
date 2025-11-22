import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, MotionValue, AnimatePresence } from 'framer-motion';
import { AppConfig } from '../types';

interface DockProps {
  apps: AppConfig[];
  onAppClick: (id: string) => void;
  openWindowIds: string[];
}

const Dock: React.FC<DockProps> = ({ apps, onAppClick, openWindowIds }) => {
  const mouseX = useMotionValue<number | null>(null);

  return (
    <div 
        className="h-16 px-4 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl flex items-end gap-3 shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(null)}
    >
      {apps.map((app) => (
        <DockIcon 
            key={app.id} 
            app={app} 
            mouseX={mouseX} 
            onClick={() => onAppClick(app.id)}
            isOpen={openWindowIds.includes(app.id)}
        />
      ))}
    </div>
  );
};

interface DockIconProps {
  app: AppConfig;
  mouseX: MotionValue<number | null>;
  onClick: () => void;
  isOpen: boolean;
}

const DockIcon: React.FC<DockIconProps> = ({ app, mouseX, onClick, isOpen }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val !== null ? val - bounds.x - bounds.width / 2 : Infinity;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 75, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div className="flex flex-col items-center gap-1 relative group">
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%", scale: 0.9 }}
              animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
              exit={{ opacity: 0, y: 5, x: "-50%", scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="absolute -top-16 left-1/2 px-3 py-1 bg-gray-800/90 backdrop-blur-md border border-white/20 rounded-lg text-white text-xs font-medium shadow-xl z-50 whitespace-nowrap pointer-events-none"
            >
              {app.title}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-800/90 rotate-45 border-r border-b border-white/20"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
            ref={ref}
            style={{ width, height: width }}
            className="relative flex items-center justify-center rounded-xl cursor-pointer shadow-md mb-1"
            onClick={onClick}
            whileTap={{ scale: 0.85 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Icon Background */}
            <div className={`absolute inset-0 rounded-xl opacity-90 ${app.color} flex items-center justify-center`}>
                <div className="text-white/90">
                    {React.cloneElement(app.icon as React.ReactElement<any>, { size: '50%' })}
                </div>
            </div>
        </motion.div>
        
        {/* Dot indicator for open apps */}
        <div className={`w-1 h-1 rounded-full bg-white/80 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  );
};

export default Dock;