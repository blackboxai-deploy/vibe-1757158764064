'use client';

import React, { useEffect } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { getThemeClasses } from '@/lib/themes';
import { soundManager } from '@/lib/soundManager';
import { GameBoard } from '@/components/TicTacToe/GameBoard';
import { GameMenu } from '@/components/TicTacToe/GameMenu';
import { ScoreBoard } from '@/components/TicTacToe/ScoreBoard';

export default function TicTacToePage() {
  const {
    gameState,
    settings,
    isAITurn,
    playMove,
    resetGame,
    resetScores,
    updateSettings
  } = useGameState();

  const themeColors = getThemeClasses(settings.theme);

  // Initialize audio context on first user interaction
  useEffect(() => {
    const initializeAudio = async () => {
      await soundManager.initializeOnUserGesture();
    };

    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const handleCellClick = async (position: number) => {
    await playMove(position);
  };

  const handleNewGame = async () => {
    await resetGame();
  };

  const handleDifficultyChange = (difficulty: typeof settings.difficulty) => {
    updateSettings({ difficulty });
  };

  const handleThemeChange = (theme: typeof settings.theme) => {
    updateSettings({ theme });
  };

  const handleSoundToggle = (soundEnabled: boolean) => {
    updateSettings({ soundEnabled });
  };

  const isGameInProgress = gameState.status === 'playing' || gameState.board.some(cell => cell !== null);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${themeColors.background} py-8 px-4`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${themeColors.text} mb-2`}>
            Tic Tac Toe
          </h1>
          <p className={`text-lg ${themeColors.textSecondary}`}>
            Challenge the AI in this classic strategy game
          </p>
        </div>

        {/* Main Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - Game Controls */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <GameMenu
              settings={settings}
              theme={settings.theme}
              isGameInProgress={isGameInProgress}
              onNewGame={handleNewGame}
              onDifficultyChange={handleDifficultyChange}
              onThemeChange={handleThemeChange}
              onSoundToggle={handleSoundToggle}
            />
          </div>

          {/* Center - Game Board */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <GameBoard
              gameState={gameState}
              theme={settings.theme}
              isAITurn={isAITurn}
              soundEnabled={settings.soundEnabled}
              onCellClick={handleCellClick}
            />
          </div>

          {/* Right Sidebar - Score Board */}
          <div className="lg:col-span-3 order-3">
            <ScoreBoard
              scores={gameState.scores}
              theme={settings.theme}
              onResetScores={resetScores}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <div className={`text-sm ${themeColors.textSecondary} space-y-1`}>
            <div>🎮 Built with React, TypeScript, and Tailwind CSS</div>
            <div>🤖 Features advanced AI with multiple difficulty levels</div>
            <div>🎨 Customize themes and sound effects for your preference</div>
          </div>
        </div>
      </div>
    </div>
  );
}