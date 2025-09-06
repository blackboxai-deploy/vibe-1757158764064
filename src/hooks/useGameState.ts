'use client';

import { useState, useCallback, useEffect } from 'react';
import { GameState, createEmptyBoard, getGameStatus, makeMove, isValidMove } from '@/lib/gameLogic';
import { getAIMove, Difficulty } from '@/lib/aiPlayer';
import { soundManager } from '@/lib/soundManager';

export type ColorTheme = 'classic' | 'ocean' | 'sunset' | 'neon' | 'forest';

export interface GameSettings {
  difficulty: Difficulty;
  theme: ColorTheme;
  soundEnabled: boolean;
}

const INITIAL_SCORES = { player: 0, computer: 0, draws: 0 };

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: createEmptyBoard(),
    currentPlayer: 'X',
    status: 'playing',
    winner: null,
    winningLine: null,
    scores: INITIAL_SCORES
  });

  const [settings, setSettings] = useState<GameSettings>({
    difficulty: 'medium',
    theme: 'classic',
    soundEnabled: true
  });

  const [isAITurn, setIsAITurn] = useState(false);

  // Initialize audio on component mount
  useEffect(() => {
    soundManager.setEnabled(settings.soundEnabled);
  }, [settings.soundEnabled]);

  const playMove = useCallback(async (position: number) => {
    if (!isValidMove(gameState.board, position) || gameState.status !== 'playing' || isAITurn) {
      return false;
    }

    // Play sound for player move
    if (settings.soundEnabled) {
      await soundManager.playSound('move', true);
    }

    const newBoard = makeMove(gameState.board, position, 'X');
    const gameStatus = getGameStatus(newBoard);

    setGameState(prev => ({
      ...prev,
      board: newBoard,
      currentPlayer: 'O',
      ...gameStatus
    }));

    // Check if game ended
    if (gameStatus.status !== 'playing') {
      handleGameEnd(gameStatus.status, gameStatus.winner);
      return true;
    }

    // Trigger AI move
    setIsAITurn(true);
    return true;
  }, [gameState.board, gameState.status, isAITurn, settings.soundEnabled]);

  const makeAIMove = useCallback(async () => {
    if (gameState.status !== 'playing' || gameState.currentPlayer !== 'O') {
      setIsAITurn(false);
      return;
    }

    // Delay for better UX
    setTimeout(async () => {
      const aiMove = getAIMove(gameState.board, settings.difficulty);
      
      if (aiMove.position === -1 || !isValidMove(gameState.board, aiMove.position)) {
        setIsAITurn(false);
        return;
      }

      // Play sound for AI move
      if (settings.soundEnabled) {
        await soundManager.playSound('move', false);
      }

      const newBoard = makeMove(gameState.board, aiMove.position, 'O');
      const gameStatus = getGameStatus(newBoard);

      setGameState(prev => ({
        ...prev,
        board: newBoard,
        currentPlayer: 'X',
        ...gameStatus
      }));

      // Check if game ended
      if (gameStatus.status !== 'playing') {
        handleGameEnd(gameStatus.status, gameStatus.winner);
      }

      setIsAITurn(false);
    }, Math.random() * 500 + 300); // Random delay between 300-800ms
  }, [gameState.board, gameState.status, gameState.currentPlayer, settings.difficulty, settings.soundEnabled]);

  const handleGameEnd = async (status: GameState['status'], winner: GameState['winner']) => {
    if (settings.soundEnabled) {
      if (status === 'won') {
        await soundManager.playSound('win');
      } else if (status === 'draw') {
        await soundManager.playSound('draw');
      }
    }

    // Update scores
    setGameState(prev => ({
      ...prev,
      scores: {
        ...prev.scores,
        player: winner === 'X' ? prev.scores.player + 1 : prev.scores.player,
        computer: winner === 'O' ? prev.scores.computer + 1 : prev.scores.computer,
        draws: status === 'draw' ? prev.scores.draws + 1 : prev.scores.draws
      }
    }));
  };

  const resetGame = useCallback(async () => {
    if (settings.soundEnabled) {
      await soundManager.playSound('newGame');
    }

    setGameState(prev => ({
      ...prev,
      board: createEmptyBoard(),
      currentPlayer: 'X',
      status: 'playing',
      winner: null,
      winningLine: null
    }));
    setIsAITurn(false);
  }, [settings.soundEnabled]);

  const resetScores = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      scores: INITIAL_SCORES
    }));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<GameSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      soundManager.setEnabled(updated.soundEnabled);
      return updated;
    });
  }, []);

  // Trigger AI move when it's AI's turn
  useEffect(() => {
    if (isAITurn) {
      makeAIMove();
    }
  }, [isAITurn, makeAIMove]);

  return {
    gameState,
    settings,
    isAITurn,
    playMove,
    resetGame,
    resetScores,
    updateSettings
  };
};