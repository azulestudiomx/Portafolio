import React from 'react';
import { Rnd } from 'react-rnd';
import { motion, Variants } from 'framer-motion';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { AppConfig, WindowState } from '../types';

interface WindowProps {
  config: AppConfig;
  state: WindowState;
  isActive: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onOpenApp: (id: string, props?: any) => void;
}

const Window: React.FC<WindowProps> = ({
  config,
  state,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onOpenApp
}) => {
  
  // Variants for the wrapper animation (Opening, Closing, Minimizing)
  const variants: Variants = {
    initial: { 
      opacity: 0, 
      scale: 0.8, 
      filter: "blur(10px)",
      y: 20 
    },
    animate: (isMinimized: boolean) => ({ 
      opacity: isMinimized ? 0 : 1,
      scale: isMinimized ? 0.5 : 1,
      y: isMinimized ? 400 : 0, 
      x: isMinimized ? 0 : 0, 
      filter: isMinimized ? "blur(20px)" : "blur(0px)",
      pointerEvents: isMinimized ? 'none' : 'auto',
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300, 
        mass: 0.8 
      }
    }),
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      filter: "blur(10px)",
      transition: { duration: 0.15, ease: "easeOut" } 
    }
  };

  // Clone the component to inject props
  const content = React.isValidElement(config.component) 
    ? React.cloneElement(config.component as React.ReactElement<any>, {
        onOpenApp: onOpenApp, // Allow child to open other apps
        ...state.componentProps // Inject props passed from Desktop (e.g., url)
      })
    : config.component;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      custom={state.isMinimized}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: state.zIndex,
        pointerEvents: 'none' // Allow clicks to pass through the full-screen wrapper
      }}
    >
      <Rnd
        default={{
          x: state.position?.x || 100,
          y: state.position?.y || 50,
          width: 700,
          height: 500,
        }}
        minWidth={320}
        minHeight={200}
        bounds="parent"
        disableDragging={state.isMaximized}
        enableResizing={!state.isMaximized}
        size={state.isMaximized ? { width: '100%', height: '100%' } : undefined}
        position={state.isMaximized ? { x: 0, y: 0 } : undefined}
        onDragStart={onFocus}
        onResizeStart={onFocus}
        className={`pointer-events-auto ${state.isMinimized ? 'pointer-events-none' : ''}`} 
        dragHandleClassName="window-header"
      >
        <div 
          className={`w-full h-full flex flex-col rounded-xl overflow-hidden border transition-all duration-200 ${
            isActive 
              ? 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] border-white/20 ring-1 ring-white/10' 
              : 'shadow-2xl border-white/5'
          } ${config.id === 'browser' ? 'bg-white' : 'bg-[#1e1e1e]/85 backdrop-blur-2xl'}`} // White bg for browser
          onClick={onFocus}
        >
          {/* Header / Title Bar */}
          <div 
            className={`window-header h-11 flex items-center px-4 justify-between shrink-0 select-none cursor-default border-b border-white/5 ${
                config.id === 'browser' ? 'bg-[#efeff0] text-black' : 'bg-gradient-to-b from-white/10 to-white/5 text-white'
            }`}
            onDoubleClick={onMaximize}
          >
            <div className="flex items-center gap-2 group">
              {/* Traffic Lights */}
              <button 
                  onClick={(e) => { e.stopPropagation(); onClose(); }}
                  className="w-3 h-3 rounded-full bg-[#ff5f57] flex items-center justify-center border border-[#e0443e] text-black/0 hover:text-black/50 transition-colors"
              >
                  <X size={8} strokeWidth={3} />
              </button>
              <button 
                  onClick={(e) => { e.stopPropagation(); onMinimize(); }}
                  className="w-3 h-3 rounded-full bg-[#febc2e] flex items-center justify-center border border-[#d8a213] text-black/0 hover:text-black/50 transition-colors"
              >
                  <Minus size={8} strokeWidth={3} />
              </button>
              <button 
                  onClick={(e) => { e.stopPropagation(); onMaximize(); }}
                  className="w-3 h-3 rounded-full bg-[#28c840] flex items-center justify-center border border-[#1aab29] text-black/0 hover:text-black/50 transition-colors"
              >
                   {state.isMaximized ? <Minimize2 size={8} strokeWidth={3} /> : <Maximize2 size={6} strokeWidth={4} />}
              </button>
            </div>

            <div className={`text-xs font-semibold flex items-center gap-2 ${config.id === 'browser' ? 'text-gray-600' : 'text-white/80 drop-shadow-md'}`}>
              {config.title}
            </div>

            {/* Spacer */}
            <div className="w-14"></div>
          </div>

          {/* Content Area */}
          <div className={`flex-1 overflow-auto ${config.id === 'browser' ? 'bg-white' : 'bg-[#1e1e1e]/40 p-0'}`}>
             <div className={config.id === 'browser' ? 'h-full' : 'p-6 h-full'}>
                {content}
             </div>
          </div>
        </div>
      </Rnd>
    </motion.div>
  );
};

export default Window;