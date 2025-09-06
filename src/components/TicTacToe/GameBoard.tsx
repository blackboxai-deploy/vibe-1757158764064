'use client';

import React from 'react';
import { GameState } from '@/lib/gameLogic';
import { ColorTheme } from '@/hooks/useGameState';
import { getThemeClasses } from '@/lib/themes';
import { GameCell } from './GameCell';

interface GameBoardProps {
  gameState: GameState;
  theme: ColorTheme;
  isAITurn: boolean;
  soundEnabled: boolean;
  onCellClick: (position: number) => void;
}

export const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  theme,
  isAITurn,
  soundEnabled,
  onCellClick
}) => {
  const themeColors = getThemeClasses(theme);
  const { board, winningLine, status } = gameState;

  const isGameDisabled = status !== 'playing' || isAITurn;

  const getBoardClasses = () => {
    return [
      "grid grid-cols-3 gap-3 p-6 rounded-xl",
      themeColors.boardBackground,
      themeColors.shadow,
      "transition-all duration-300",
      isAITurn ? "opacity-75" : "opacity-100"
    ].join(' ');
  };

  const getStatusMessage = () => {
    if (isAITurn) {
      return "AI is thinking...";
    }
    
    switch (status) {
      case 'won':
        return gameState.winner === 'X' ? "You won! 🎉" : "AI wins! 🤖";
      case 'draw':
        return "It's a draw! 🤝";
      default:
        return "Your turn";
    }
  };

  const getStatusClasses = () => {
    const baseClasses = "text-xl md:text-2xl font-semibold text-center mb-4 transition-colors duration-300";
    
    if (isAITurn) {
      return `${baseClasses} ${themeColors.textSecondary} animate-pulse`;
    }
    
    switch (status) {
      case 'won':
        return `${baseClasses} ${gameState.winner === 'X' ? 'text-green-600' : 'text-red-600'}`;
      case 'draw':
        return `${baseClasses} text-yellow-600`;
      default:
        return `${baseClasses} ${themeColors.text}`;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={getStatusClasses()}>
        {getStatusMessage()}
      </div>
      
      <div className={getBoardClasses()}>
        {board.map((cell, index) => (
          <GameCell
            key={index}
            value={cell}
            position={index}
            isWinningCell={winningLine?.includes(index) || false}
            theme={theme}
            disabled={isGameDisabled}
            soundEnabled={soundEnabled}
            onClick={onCellClick}
          />
        ))}
      </div>
      
      {status !== 'playing' && (
        <div className={`mt-4 text-center ${themeColors.textSecondary}`}>
          <p className="text-sm">Click "New Game" to play again</p>
        </div>
      )}
    </div>
  );
};