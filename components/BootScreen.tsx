import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BootScreenProps {
  onFinish: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simular carga de sistema
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 500); // Pequeña pausa al llegar al 100% antes de quitar la pantalla
          return 100;
        }
        // Incremento aleatorio para parecer carga real
        return prev + Math.random() * 10; 
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center text-white"
      style={{ backgroundColor: '#2c3868' }} // Color solicitado
    >
      <div className="flex flex-col items-center gap-8">
        {/* Logo / Avatar */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
        >
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                    alt="Logo Azul Estudio" 
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Brillo/Resplandor detrás del logo */}
            <div className="absolute inset-0 bg-white/20 blur-xl rounded-full -z-10 animate-pulse"></div>
        </motion.div>

        {/* Título */}
        <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-2xl font-semibold tracking-wider drop-shadow-md font-sans"
        >
            AZUL ESTUDIO
        </motion.h1>

        {/* Barra de Progreso */}
        <div className="w-48 h-1.5 bg-black/30 rounded-full overflow-hidden mt-4 border border-white/5">
            <motion.div 
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
            />
        </div>
      </div>
    </motion.div>
  );
};

export default BootScreen;