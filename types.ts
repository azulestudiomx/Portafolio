import { ReactNode } from 'react';

export interface AppConfig {
  id: string;
  title: string;
  icon: ReactNode;
  component: ReactNode;
  color?: string;
}

export interface WindowState {
  id: string;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  position?: { x: number; y: number };
  size?: { width: number; height: number };
  componentProps?: any; // Added to pass dynamic data like URLs
}

export interface Point {
  x: number;
  y: number;
}

export interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  onRefresh: () => void;
}