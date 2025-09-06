'use client';

import React from 'react';
import { Player } from '@/lib/gameLogic';
import { ColorTheme } from '@/hooks/useGameState';
import { getThemeClasses } from '@/lib/themes';
import { soundManager } from '@/lib/soundManager';

interface GameCellProps {
  value: Player;
  position: number;
  isWinningCell: boolean;
  theme: ColorTheme;
  disabled: boolean;
  soundEnabled: boolean;
  onClick: (position: number) => void;
}

export const GameCell: React.FC<GameCellProps> = ({
  value,
  position,
  isWinningCell,
  theme,
  disabled,
  soundEnabled,
  onClick
}) => {
  const themeColors = getThemeClasses(theme);

  const handleClick = async () => {
    if (!disabled && !value) {
      if (soundEnabled) {
        await soundManager.playSound('click');
      }
      onClick(position);
    }
  };

  const handleHover = async () => {
    if (!disabled && !value && soundEnabled) {
      await soundManager.playSound('hover');
    }
  };

  const getCellContent = () => {
    if (!value) return null;
    
    const baseClasses = "font-bold text-6xl md:text-7xl select-none transition-all duration-300 transform";
    const colorClass = value === 'X' ? themeColors.playerX : themeColors.playerO;
    const scaleClass = "scale-100 hover:scale-105";
    
    return (
      <span className={`${baseClasses} ${colorClass} ${scaleClass}`}>
        {value}
      </span>
    );
  };

  const cellClasses = [
    "w-24 h-24 md:w-32 md:h-32",
    "border-2 rounded-lg",
    "flex items-center justify-center",
    "transition-all duration-200 transform",
    "cursor-pointer active:scale-95",
    themeColors.cellBackground,
    themeColors.border,
    disabled || value ? '' : themeColors.cellHover,
    disabled ? 'cursor-not-allowed opacity-60' : '',
    !disabled && !value ? 'hover:scale-105' : '',
    isWinningCell ? `${themeColors.winningLine} animate-pulse` : ''
  ].filter(Boolean).join(' ');

  return (
    <div
      className={cellClasses}
      onClick={handleClick}
      onMouseEnter={handleHover}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Cell ${position + 1}, ${value || 'empty'}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {getCellContent()}
    </div>
  );
};