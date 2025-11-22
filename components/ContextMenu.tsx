import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, LayoutGrid } from 'lucide-react';
import { ContextMenuProps } from '../types';

const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, onClose, onRefresh }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Ajuste inteligente para que el menú no se salga de la pantalla
  const adjustPosition = () => {
      let posX = x;
      let posY = y;
      
      if (window.innerWidth - x < 200) posX = x - 200;
      if (window.innerHeight - y < 250) posY = y - 200;

      return { top: posY, left: posX };
  };

  const { top, left } = adjustPosition();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const MenuItem = ({ icon: Icon, label, onClick, shortcut }: any) => (
    <div 
        onClick={() => { onClick(); onClose(); }}
        className="flex items-center justify-between px-3 py-1.5 hover:bg-blue-500 hover:text-white rounded-md cursor-default transition-colors group"
    >
        <div className="flex items-center gap-2">
            {Icon && <Icon size={14} className="text-white/70 group-hover:text-white" />}
            <span className="text-sm">{label}</span>
        </div>
        {shortcut && <span className="text-xs text-white/40 group-hover:text-white/80 ml-4">{shortcut}</span>}
    </div>
  );

  const Separator = () => <div className="h-px bg-white/10 my-1 mx-2" />;

  return (
    <motion.div
        ref={menuRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.1 }}
        className="fixed z-[9999] w-56 bg-[#1e1e1e]/80 backdrop-blur-xl border border-white/20 rounded-lg shadow-2xl py-1.5 text-white/90 select-none"
        style={{ top, left }}
    >
        <MenuItem label="Nueva Carpeta" onClick={() => {}} />
        <Separator />
        <MenuItem icon={LayoutGrid} label="Organizar por" onClick={() => {}} />
        <MenuItem icon={RefreshCw} label="Limpiar Escritorio" onClick={onRefresh} />
        <Separator />
        <MenuItem label="Obtener Información" onClick={() => {}} />
    </motion.div>
  );
};

export default ContextMenu;