import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import StatusBar from './StatusBar';
import Dock from './Dock';
import Window from './Window';
import ContextMenu from './ContextMenu';
import { APPS } from '../constants';
import { WindowState, Point } from '../types';

interface DesktopProps {
    onLogout: () => void;
}

const Desktop: React.FC<DesktopProps> = ({ onLogout }) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  
  // Context Menu State
  const [contextMenu, setContextMenu] = useState<{ show: boolean; x: number; y: number } | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  const refreshDesktop = () => {
    // Close all windows visually (simulating a refresh/clean desktop)
    setWindows(prev => prev.map(w => ({ ...w, isMinimized: true })));
    setActiveWindowId(null);
  };

  // Modified to accept optional props (e.g. initialUrl for browser)
  const openApp = (id: string, props?: any) => {
    // Check if window already exists
    const existingWindow = windows.find((w) => w.id === id);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        // Restore if minimized
        setWindows((prev) =>
          prev.map((w) =>
            w.id === id ? { ...w, isMinimized: false, zIndex: zIndexCounter + 1, componentProps: props || w.componentProps } : w
          )
        );
        setZIndexCounter((prev) => prev + 1);
        setActiveWindowId(id);
      } else {
        // Update props even if open and focus
        if (props) {
             setWindows((prev) =>
                prev.map((w) => (w.id === id ? { ...w, componentProps: props } : w))
            );
        }
        focusWindow(id);
      }
    } else {
      // Open new window
      const newWindow: WindowState = {
        id,
        zIndex: zIndexCounter + 1,
        isMinimized: false,
        isMaximized: false,
        componentProps: props,
        // Cascading position
        position: { x: 100 + windows.length * 30, y: 50 + windows.length * 30 },
      };
      setWindows([...windows, newWindow]);
      setZIndexCounter((prev) => prev + 1);
      setActiveWindowId(id);
    }
  };

  const closeWindow = (id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    );
    if (activeWindowId === id) {
      setActiveWindowId(null);
    }
  };

  const maximizeWindow = (id: string) => {
    setWindows((prev) =>
        prev.map((w) => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w))
    );
    focusWindow(id);
  };

  const focusWindow = (id: string) => {
    if (activeWindowId === id) return;
    
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: zIndexCounter + 1 } : w))
    );
    setZIndexCounter((prev) => prev + 1);
    setActiveWindowId(id);
  };

  const getActiveAppTitle = () => {
    if (!activeWindowId) return 'Finder';
    const app = APPS.find((a) => a.id === activeWindowId);
    return app ? app.title : 'Finder';
  };

  return (
    <div 
        className="w-full h-full flex flex-col relative" 
        onContextMenu={handleContextMenu}
    >
      <StatusBar activeAppTitle={getActiveAppTitle()} onLogout={onLogout} />

      {/* Desktop Area */}
      <div className="flex-1 relative w-full h-full" onClick={() => { setActiveWindowId(null); closeContextMenu(); }}>
        <AnimatePresence>
          {windows.map((windowState) => {
             const app = APPS.find(a => a.id === windowState.id);
             if(!app) return null;

             return (
              <Window
                  key={windowState.id}
                  config={app}
                  state={windowState}
                  isActive={activeWindowId === windowState.id}
                  onClose={() => closeWindow(windowState.id)}
                  onMinimize={() => minimizeWindow(windowState.id)}
                  onMaximize={() => maximizeWindow(windowState.id)}
                  onFocus={() => focusWindow(windowState.id)}
                  onOpenApp={openApp} // Pass function to open other apps
              />
             );
          })}
        </AnimatePresence>

        {/* Context Menu */}
        <AnimatePresence>
            {contextMenu && contextMenu.show && (
                <ContextMenu 
                    x={contextMenu.x} 
                    y={contextMenu.y} 
                    onClose={closeContextMenu} 
                    onRefresh={refreshDesktop}
                />
            )}
        </AnimatePresence>

      </div>

      {/* Dock Container */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center z-[1000]" onClick={(e) => e.stopPropagation()}>
        <Dock 
            apps={APPS.filter(app => app.id !== 'browser')} // Hide browser from dock, show others
            onAppClick={openApp} 
            openWindowIds={windows.filter(w => !w.isMinimized).map(w => w.id)} 
        />
      </div>
    </div>
  );
};

export default Desktop;