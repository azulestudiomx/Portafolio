import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Lock } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate authenticating
    setTimeout(() => {
      onLogin();
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center backdrop-blur-sm bg-black/40">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-6"
      >
        {/* Avatar */}
        <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl ring-4 ring-blue-500/30">
                <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                    alt="User Avatar" 
                    className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
                />
            </div>
        </div>

        {/* User Name */}
        <div className="text-center">
            <h1 className="text-white text-2xl font-semibold drop-shadow-md tracking-wide">Azul Estudio</h1>
            <p className="text-blue-200/60 text-xs mt-1 tracking-widest uppercase">Proyectando tus ideas</p>
        </div>

        {/* Password Input */}
        <form onSubmit={handleLogin} className="relative w-64 mt-2">
          <div className={`relative transition-all duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-2 pl-10 text-white placeholder-white/40 outline-none focus:bg-white/20 focus:border-white/40 transition-all backdrop-blur-md shadow-lg text-sm"
              disabled={isLoading}
            />
            <Lock className="absolute left-3 top-2.5 text-white/40" size={14} />
            
            {password.length > 0 && !isLoading && (
              <button 
                type="submit"
                className="absolute right-2 top-1.5 p-1 rounded-full bg-white/20 hover:bg-white/40 text-white/80 transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            )}
          </div>
          
          {isLoading && (
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
             </div>
          )}
        </form>

        <p className="text-white/30 text-[10px] mt-8 font-light tracking-widest">PRESIONA ENTER PARA ENTRAR</p>
      </motion.div>
    </div>
  );
};

export default LoginScreen;