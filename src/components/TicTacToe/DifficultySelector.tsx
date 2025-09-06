'use client';

import React from 'react';
import { Difficulty, getDifficultyDescription } from '@/lib/aiPlayer';
import { ColorTheme } from '@/hooks/useGameState';
import { getThemeClasses } from '@/lib/themes';


interface DifficultySelectorProps {
  currentDifficulty: Difficulty;
  theme: ColorTheme;
  onChange: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard', 'expert'];

const DIFFICULTY_COLORS = {
  easy: 'bg-green-500 hover:bg-green-600 text-white',
  medium: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  hard: 'bg-orange-500 hover:bg-orange-600 text-white',
  expert: 'bg-red-500 hover:bg-red-600 text-white'
};

const DIFFICULTY_ICONS = {
  easy: '😊',
  medium: '🤔',
  hard: '😤',
  expert: '🤖'
};

export const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  currentDifficulty,
  theme,
  onChange
}) => {
  const themeColors = getThemeClasses(theme);

  const getDifficultyButtonClasses = (difficulty: Difficulty) => {
    const isSelected = difficulty === currentDifficulty;
    const baseClasses = "flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all duration-200 text-center min-h-[80px]";
    
    if (isSelected) {
      return `${baseClasses} ${DIFFICULTY_COLORS[difficulty]} ring-2 ring-offset-2 ring-blue-500 transform scale-105`;
    }
    
    return `${baseClasses} ${themeColors.cellBackground} ${themeColors.border} hover:${themeColors.cellHover} hover:scale-105`;
  };

  return (
    <div className={`p-6 rounded-xl ${themeColors.boardBackground} ${themeColors.shadow}`}>
      <h3 className={`text-xl font-bold mb-4 text-center ${themeColors.text}`}>
        Difficulty Level
      </h3>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        {DIFFICULTIES.map((difficulty) => (
          <button
            key={difficulty}
            onClick={() => onChange(difficulty)}
            className={getDifficultyButtonClasses(difficulty)}
            aria-label={`Select ${difficulty} difficulty`}
          >
            <div className="text-2xl mb-1">
              {DIFFICULTY_ICONS[difficulty]}
            </div>
            <div className={`font-medium text-sm ${
              difficulty === currentDifficulty ? 'text-white' : themeColors.text
            }`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </div>
          </button>
        ))}
      </div>
      
      {/* Current Difficulty Description */}
      <div className={`text-center p-3 rounded-lg ${themeColors.cellBackground} ${themeColors.border} border`}>
        <div className={`text-sm font-medium mb-1 ${themeColors.text}`}>
          Current: {currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)}
        </div>
        <div className={`text-xs ${themeColors.textSecondary}`}>
          {getDifficultyDescription(currentDifficulty)}
        </div>
      </div>
      
      {/* Difficulty Tips */}
      <div className={`mt-4 text-xs ${themeColors.textSecondary} space-y-1`}>
        <div className="font-medium">Tips:</div>
        <div>• Easy: Perfect for beginners</div>
        <div>• Medium: Good practice level</div>
        <div>• Hard: Challenging gameplay</div>
        <div>• Expert: Nearly impossible to beat</div>
      </div>
    </div>
  );
};