import { ColorTheme } from '@/hooks/useGameState';

export interface ThemeColors {
  name: string;
  description: string;
  background: string;
  boardBackground: string;
  cellBackground: string;
  cellHover: string;
  playerX: string;
  playerO: string;
  winningLine: string;
  text: string;
  textSecondary: string;
  accent: string;
  accentHover: string;
  border: string;
  shadow: string;
}

export const THEME_COLORS: Record<ColorTheme, ThemeColors> = {
  classic: {
    name: 'Classic',
    description: 'Traditional blue vs red',
    background: 'from-slate-50 to-slate-100',
    boardBackground: 'bg-white',
    cellBackground: 'bg-gray-50',
    cellHover: 'hover:bg-gray-100',
    playerX: 'text-blue-600',
    playerO: 'text-red-600',
    winningLine: 'bg-yellow-400',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'bg-blue-600',
    accentHover: 'hover:bg-blue-700',
    border: 'border-gray-300',
    shadow: 'shadow-lg'
  },
  ocean: {
    name: 'Ocean',
    description: 'Deep blue teal waters',
    background: 'from-cyan-50 to-blue-50',
    boardBackground: 'bg-white',
    cellBackground: 'bg-cyan-25',
    cellHover: 'hover:bg-cyan-50',
    playerX: 'text-cyan-600',
    playerO: 'text-teal-600',
    winningLine: 'bg-amber-300',
    text: 'text-slate-800',
    textSecondary: 'text-slate-600',
    accent: 'bg-cyan-600',
    accentHover: 'hover:bg-cyan-700',
    border: 'border-cyan-200',
    shadow: 'shadow-cyan-200/50 shadow-lg'
  },
  sunset: {
    name: 'Sunset',
    description: 'Warm orange purple evening',
    background: 'from-orange-50 to-purple-50',
    boardBackground: 'bg-white',
    cellBackground: 'bg-orange-25',
    cellHover: 'hover:bg-orange-50',
    playerX: 'text-orange-600',
    playerO: 'text-purple-600',
    winningLine: 'bg-pink-300',
    text: 'text-slate-800',
    textSecondary: 'text-slate-600',
    accent: 'bg-orange-500',
    accentHover: 'hover:bg-orange-600',
    border: 'border-orange-200',
    shadow: 'shadow-orange-200/50 shadow-lg'
  },
  neon: {
    name: 'Neon',
    description: 'Bright cyber colors',
    background: 'from-slate-900 to-slate-800',
    boardBackground: 'bg-slate-800',
    cellBackground: 'bg-slate-700',
    cellHover: 'hover:bg-slate-600',
    playerX: 'text-cyan-400',
    playerO: 'text-pink-400',
    winningLine: 'bg-yellow-400',
    text: 'text-white',
    textSecondary: 'text-slate-300',
    accent: 'bg-cyan-500',
    accentHover: 'hover:bg-cyan-400',
    border: 'border-slate-600',
    shadow: 'shadow-2xl shadow-cyan-500/20'
  },
  forest: {
    name: 'Forest',
    description: 'Natural green brown earth',
    background: 'from-green-50 to-emerald-50',
    boardBackground: 'bg-white',
    cellBackground: 'bg-green-25',
    cellHover: 'hover:bg-green-50',
    playerX: 'text-green-700',
    playerO: 'text-amber-700',
    winningLine: 'bg-yellow-300',
    text: 'text-slate-800',
    textSecondary: 'text-slate-600',
    accent: 'bg-green-600',
    accentHover: 'hover:bg-green-700',
    border: 'border-green-200',
    shadow: 'shadow-green-200/50 shadow-lg'
  }
};

export const getThemeClasses = (theme: ColorTheme) => {
  return THEME_COLORS[theme];
};