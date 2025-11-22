import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StatusBarProps {
  activeAppTitle: string;
  onLogout: () => void;
}

const StatusBar: React.FC<StatusBarProps> = ({ activeAppTitle, onLogout }) => {
  const [date, setDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Detectar clic fuera para cerrar el menú
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Formato de fecha en español (ej: vie, 24 mar)
  const formattedDate = date.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
  // Formato de hora (24h)
  const formattedTime = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="h-8 w-full bg-white/10 backdrop-blur-xl flex justify-between items-center px-4 text-white text-sm shadow-sm z-[9999] relative select-none border-b border-white/5">
      <div className="flex items-center gap-4">
        <div className="relative" ref={menuRef}>
             <div 
                className={`font-bold text-lg cursor-pointer transition-colors px-3 py-0.5 -ml-2 rounded-md select-none ${isMenuOpen ? 'bg-white/20' : 'hover:text-white/80'}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
                
             </div>

             <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 5, scale: 0.95, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 5, scale: 0.95, filter: "blur(5px)" }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-1 w-64 bg-[#1e1e1e]/90 backdrop-blur-2xl rounded-lg shadow-2xl border border-white/20 overflow-hidden py-1 text-white/90"
                    >
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Acerca de esta Mac</div>
                        <div className="h-px bg-white/10 my-1 mx-3"></div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Ajustes del Sistema...</div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">App Store...</div>
                        <div className="h-px bg-white/10 my-1 mx-3"></div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Ítems recientes</div>
                        <div className="h-px bg-white/10 my-1 mx-3"></div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Forzar salida...</div>
                        <div className="h-px bg-white/10 my-1 mx-3"></div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Reposo</div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Reiniciar...</div>
                        <div className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm">Apagar equipo...</div>
                        <div className="h-px bg-white/10 my-1 mx-3"></div>
                        <div 
                            className="px-4 py-1.5 hover:bg-blue-600 hover:text-white cursor-default transition-colors text-sm font-medium"
                            onClick={() => {
                                setIsMenuOpen(false);
                                onLogout();
                            }}
                        >
                            Cerrar sesión de Azul Estudio...
                        </div>
                    </motion.div>
                )}
             </AnimatePresence>
        </div>

        <div className="font-semibold text-sm hidden sm:block">{activeAppTitle}</div>
        
        {/* Fake Menu Items en Español */}
        <div className="hidden md:flex gap-4 text-white/90 font-normal text-xs">
          <span className="cursor-pointer hover:text-white">Archivo</span>
          <span className="cursor-pointer hover:text-white">Edición</span>
          <span className="cursor-pointer hover:text-white">Ver</span>
          <span className="cursor-pointer hover:text-white">Ventana</span>
          <span className="cursor-pointer hover:text-white">Ayuda</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-xs font-medium">
        <div className="hidden sm:flex items-center gap-3">
            <Battery size={16} className="text-white/90" />
            <Wifi size={16} className="text-white/90" />
            <Search size={14} className="text-white/90" />
        </div>
        <div className="flex items-center gap-2">
            <span className="capitalize">{formattedDate}</span>
            <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;