'use client';

import React from 'react';
import { ColorTheme } from '@/hooks/useGameState';
import { THEME_COLORS, getThemeClasses } from '@/lib/themes';

interface ThemeSelectorProps {
  currentTheme: ColorTheme;
  onChange: (theme: ColorTheme) => void;
}

const THEME_PREVIEWS = {
  classic: { player: 'bg-blue-600', computer: 'bg-red-600', bg: 'bg-gray-50' },
  ocean: { player: 'bg-cyan-600', computer: 'bg-teal-600', bg: 'bg-cyan-25' },
  sunset: { player: 'bg-orange-600', computer: 'bg-purple-600', bg: 'bg-orange-25' },
  neon: { player: 'bg-cyan-400', computer: 'bg-pink-400', bg: 'bg-slate-700' },
  forest: { player: 'bg-green-700', computer: 'bg-amber-700', bg: 'bg-green-25' }
};

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onChange
}) => {
  const themeColors = getThemeClasses(currentTheme);

  const getThemeButtonClasses = (theme: ColorTheme) => {
    const isSelected = theme === currentTheme;
    const baseClasses = "flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer hover:scale-105";
    
    if (isSelected) {
      return `${baseClasses} ${themeColors.border} ring-2 ring-offset-2 ring-blue-500 transform scale-105`;
    }
    
    return `${baseClasses} ${themeColors.border} hover:${themeColors.cellHover}`;
  };

  const getPreviewColors = (theme: ColorTheme) => {
    return THEME_PREVIEWS[theme];
  };

  return (
    <div className={`p-6 rounded-xl ${themeColors.boardBackground} ${themeColors.shadow}`}>
      <h3 className={`text-xl font-bold mb-4 text-center ${themeColors.text}`}>
        Color Themes
      </h3>
      
      <div className="grid grid-cols-1 gap-3 mb-4">
        {Object.keys(THEME_COLORS).map((themeKey) => {
          const theme = themeKey as ColorTheme;
          const themeData = THEME_COLORS[theme];
          const preview = getPreviewColors(theme);
          
          return (
            <button
              key={theme}
              onClick={() => onChange(theme)}
              className={getThemeButtonClasses(theme)}
              aria-label={`Select ${themeData.name} theme`}
            >
              <div className="flex items-center justify-center mb-2">
                {/* Theme Preview */}
                <div className="flex space-x-1">
                  <div className={`w-4 h-4 rounded ${preview.player}`}></div>
                  <div className={`w-4 h-4 rounded ${preview.computer}`}></div>
                  <div className={`w-4 h-4 rounded ${preview.bg} border`}></div>
                </div>
              </div>
              
              <div className={`font-medium text-sm ${
                theme === currentTheme ? themeColors.text : themeColors.textSecondary
              }`}>
                {themeData.name}
              </div>
              
              <div className={`text-xs ${themeColors.textSecondary} text-center mt-1`}>
                {themeData.description}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Current Theme Info */}
      <div className={`text-center p-3 rounded-lg ${themeColors.cellBackground} ${themeColors.border} border`}>
        <div className={`text-sm font-medium ${themeColors.text}`}>
          Current: {THEME_COLORS[currentTheme].name}
        </div>
        <div className={`text-xs ${themeColors.textSecondary}`}>
          {THEME_COLORS[currentTheme].description}
        </div>
      </div>
    </div>
  );
};