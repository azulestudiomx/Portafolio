import React from 'react';
import { AppConfig } from './types';
import { User, FolderGit2, Briefcase, Cpu, Mail, Globe, Terminal } from 'lucide-react';
import { AboutMe, Projects, Experience, Skills, Contact } from './components/AppContent';
import Browser from './components/Browser';
import TerminalApp from './components/Terminal';

// --- CONFIGURACIÓN DE FONDOS ---
export const WALLPAPERS = [
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2133&auto=format&fit=crop", // Space Astronaut
  "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=2070&auto=format&fit=crop", // Aurora
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop", // Network/Tech
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop", // Abstract Blue
  "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=2072&auto=format&fit=crop"  // Night Sky
];

export const APPS: AppConfig[] = [
  {
    id: 'about',
    title: 'Sobre mí',
    icon: <User size={32} className="text-white drop-shadow-lg" />,
    component: <AboutMe />,
    color: 'bg-blue-600'
  },
  {
    id: 'projects',
    title: 'Proyectos',
    icon: <FolderGit2 size={32} className="text-white drop-shadow-lg" />,
    component: <Projects />,
    color: 'bg-purple-600'
  },
  {
    id: 'experience',
    title: 'Experiencia',
    icon: <Briefcase size={32} className="text-white drop-shadow-lg" />,
    component: <Experience />,
    color: 'bg-green-600'
  },
  {
    id: 'skills',
    title: 'Habilidades',
    icon: <Cpu size={32} className="text-white drop-shadow-lg" />,
    component: <Skills />,
    color: 'bg-orange-500'
  },
  {
    id: 'contact',
    title: 'Contacto',
    icon: <Mail size={32} className="text-white drop-shadow-lg" />,
    component: <Contact />,
    color: 'bg-red-500'
  },
  {
    id: 'terminal',
    title: 'Terminal',
    icon: <Terminal size={32} className="text-white drop-shadow-lg" />,
    component: <TerminalApp />,
    color: 'bg-gray-800'
  },
  {
    id: 'browser',
    title: 'Navegador',
    icon: <Globe size={32} className="text-white drop-shadow-lg" />,
    component: <Browser />,
    color: 'bg-sky-500'
  }
];