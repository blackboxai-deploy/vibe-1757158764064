'use client';

import React from 'react';
import { GameState } from '@/lib/gameLogic';
import { ColorTheme } from '@/hooks/useGameState';
import { getThemeClasses } from '@/lib/themes';
import { Button } from '@/components/ui/button';

interface ScoreBoardProps {
  scores: GameState['scores'];
  theme: ColorTheme;
  onResetScores: () => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({
  scores,
  theme,
  onResetScores
}) => {
  const themeColors = getThemeClasses(theme);

  const getTotalGames = () => {
    return scores.player + scores.computer + scores.draws;
  };

  const getWinRate = () => {
    const total = getTotalGames();
    if (total === 0) return 0;
    return Math.round((scores.player / total) * 100);
  };

  const getScoreCardClasses = (isPlayer: boolean = false) => {
    return [
      "p-4 rounded-lg text-center transition-all duration-300",
      themeColors.boardBackground,
      themeColors.border,
      "border",
      isPlayer ? "ring-2 ring-green-500 ring-opacity-20" : ""
    ].filter(Boolean).join(' ');
  };

  return (
    <div className={`p-6 rounded-xl ${themeColors.boardBackground} ${themeColors.shadow}`}>
      <h3 className={`text-xl font-bold mb-4 text-center ${themeColors.text}`}>
        Score Board
      </h3>
      
      <div className="grid grid-cols-3 gap-3 mb-4">
        {/* Player Score */}
        <div className={getScoreCardClasses(true)}>
          <div className={`text-2xl font-bold ${themeColors.playerX}`}>
            {scores.player}
          </div>
          <div className={`text-sm ${themeColors.textSecondary}`}>
            You
          </div>
        </div>
        
        {/* Draws */}
        <div className={getScoreCardClasses()}>
          <div className={`text-2xl font-bold text-yellow-600`}>
            {scores.draws}
          </div>
          <div className={`text-sm ${themeColors.textSecondary}`}>
            Draws
          </div>
        </div>
        
        {/* AI Score */}
        <div className={getScoreCardClasses()}>
          <div className={`text-2xl font-bold ${themeColors.playerO}`}>
            {scores.computer}
          </div>
          <div className={`text-sm ${themeColors.textSecondary}`}>
            AI
          </div>
        </div>
      </div>
      
      {/* Statistics */}
      <div className="mb-4 space-y-2">
        <div className="flex justify-between">
          <span className={`text-sm ${themeColors.textSecondary}`}>
            Total Games:
          </span>
          <span className={`text-sm font-medium ${themeColors.text}`}>
            {getTotalGames()}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className={`text-sm ${themeColors.textSecondary}`}>
            Win Rate:
          </span>
          <span className={`text-sm font-medium ${themeColors.text}`}>
            {getWinRate()}%
          </span>
        </div>
        
        {/* Win Rate Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${getWinRate()}%` }}
          ></div>
        </div>
      </div>
      
      {/* Reset Button */}
      <Button
        onClick={onResetScores}
        variant="outline"
        size="sm"
        className={`w-full text-sm ${themeColors.textSecondary} hover:${themeColors.text}`}
        disabled={getTotalGames() === 0}
      >
        Reset Scores
      </Button>
    </div>
  );
};