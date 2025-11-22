import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LoginScreen from './components/LoginScreen';
import Desktop from './components/Desktop';
import BootScreen from './components/BootScreen';
import { WALLPAPERS } from './constants';

const App: React.FC = () => {
  const [isBooting, setIsBooting] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div 
      className="w-screen h-screen overflow-hidden bg-cover bg-center transition-all duration-700"
      style={{ 
        backgroundImage: `url('${WALLPAPERS[0]}')`,
        backgroundColor: '#2c3868' // Color de respaldo para evitar pantallazo blanco
      }}
    >
      <AnimatePresence mode="wait">
        {isBooting ? (
          <BootScreen key="boot-screen" onFinish={() => setIsBooting(false)} />
        ) : !isLoggedIn ? (
          <LoginScreen key="login-screen" onLogin={() => setIsLoggedIn(true)} />
        ) : (
          <Desktop 
            key="desktop" 
            onLogout={() => setIsLoggedIn(false)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;