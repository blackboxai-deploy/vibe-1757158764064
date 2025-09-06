'use client';

import React from 'react';
import { GameSettings, ColorTheme } from '@/hooks/useGameState';
import { Difficulty } from '@/lib/aiPlayer';
import { getThemeClasses } from '@/lib/themes';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DifficultySelector } from './DifficultySelector';
import { ThemeSelector } from './ThemeSelector';

interface GameMenuProps {
  settings: GameSettings;
  theme: ColorTheme;
  isGameInProgress: boolean;
  onNewGame: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onThemeChange: (theme: ColorTheme) => void;
  onSoundToggle: (enabled: boolean) => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({
  settings,
  theme,
  isGameInProgress,
  onNewGame,
  onDifficultyChange,
  onThemeChange,
  onSoundToggle
}) => {
  const themeColors = getThemeClasses(theme);

  return (
    <div className="space-y-6">
      {/* Game Controls */}
      <div className={`p-6 rounded-xl ${themeColors.boardBackground} ${themeColors.shadow}`}>
        <h3 className={`text-xl font-bold mb-4 text-center ${themeColors.text}`}>
          Game Controls
        </h3>
        
        <div className="space-y-4">
          {/* New Game Button */}
          <Button
            onClick={onNewGame}
            className={`w-full py-3 text-lg font-semibold ${themeColors.accent} ${themeColors.accentHover} text-white`}
          >
            {isGameInProgress ? 'New Game' : 'Start Game'}
          </Button>
          
          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${themeColors.text}`}>
              Sound Effects
            </span>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={onSoundToggle}
              aria-label="Toggle sound effects"
            />
          </div>
          
          {/* Sound Indicator */}
          <div className="flex items-center justify-center">
            <span className={`text-2xl ${settings.soundEnabled ? '' : 'opacity-50'}`}>
              {settings.soundEnabled ? '🔊' : '🔇'}
            </span>
            <span className={`ml-2 text-sm ${themeColors.textSecondary}`}>
              {settings.soundEnabled ? 'Sounds On' : 'Sounds Off'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Difficulty Selector */}
      <DifficultySelector
        currentDifficulty={settings.difficulty}
        theme={theme}
        onChange={onDifficultyChange}
      />
      
      {/* Theme Selector */}
      <ThemeSelector
        currentTheme={settings.theme}
        onChange={onThemeChange}
      />
      
      {/* Game Instructions */}
      <div className={`p-6 rounded-xl ${themeColors.boardBackground} ${themeColors.shadow}`}>
        <h3 className={`text-lg font-bold mb-3 text-center ${themeColors.text}`}>
          How to Play
        </h3>
        <div className={`space-y-2 text-sm ${themeColors.textSecondary}`}>
          <div>• Click on any empty cell to place your X</div>
          <div>• Try to get three X's in a row, column, or diagonal</div>
          <div>• The AI will try to block you and win</div>
          <div>• Choose different difficulty levels for various challenges</div>
          <div>• Customize themes and sounds to your liking</div>
        </div>
      </div>
      
      {/* Game Stats Summary */}
      <div className={`p-4 rounded-xl ${themeColors.cellBackground} ${themeColors.border} border`}>
        <div className="text-center">
          <div className={`text-sm font-medium ${themeColors.text}`}>
            Current Settings
          </div>
          <div className={`text-xs ${themeColors.textSecondary} mt-1 space-y-1`}>
            <div>Difficulty: {settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1)}</div>
            <div>Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}</div>
            <div>Sound: {settings.soundEnabled ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};