import { Board, checkWinner, getAvailableMoves, makeMove, isBoardFull } from './gameLogic';

export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface AIMove {
  position: number;
  score?: number;
}

// Minimax algorithm with alpha-beta pruning
const minimax = (
  board: Board,
  depth: number,
  isMaximizing: boolean,
  alpha: number = -Infinity,
  beta: number = Infinity,
  maxDepth: number = Infinity
): { score: number; position: number } => {
  const { winner } = checkWinner(board);
  
  // Terminal cases
  if (winner === 'O') return { score: 10 - depth, position: -1 }; // AI wins
  if (winner === 'X') return { score: depth - 10, position: -1 }; // Human wins
  if (isBoardFull(board) || depth >= maxDepth) return { score: 0, position: -1 }; // Draw or max depth
  
  const availableMoves = getAvailableMoves(board);
  let bestMove = { score: isMaximizing ? -Infinity : Infinity, position: availableMoves[0] };
  
  for (const position of availableMoves) {
    const newBoard = makeMove(board, position, isMaximizing ? 'O' : 'X');
    const result = minimax(newBoard, depth + 1, !isMaximizing, alpha, beta, maxDepth);
    
    if (isMaximizing) {
      if (result.score > bestMove.score) {
        bestMove = { score: result.score, position };
      }
      alpha = Math.max(alpha, result.score);
    } else {
      if (result.score < bestMove.score) {
        bestMove = { score: result.score, position };
      }
      beta = Math.min(beta, result.score);
    }
    
    // Alpha-beta pruning
    if (beta <= alpha) break;
  }
  
  return bestMove;
};

// Easy AI: 30% optimal moves, 70% random
const getEasyMove = (board: Board): AIMove => {
  const availableMoves = getAvailableMoves(board);
  
  if (Math.random() < 0.3) {
    // 30% chance of making an optimal move
    const optimalMove = minimax(board, 0, true, -Infinity, Infinity, 2);
    return { position: optimalMove.position };
  }
  
  // 70% chance of random move
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return { position: availableMoves[randomIndex] };
};

// Medium AI: 60% optimal moves, strategic blocking
const getMediumMove = (board: Board): AIMove => {
  const availableMoves = getAvailableMoves(board);
  
  // Check for immediate win
  for (const move of availableMoves) {
    const testBoard = makeMove(board, move, 'O');
    if (checkWinner(testBoard).winner === 'O') {
      return { position: move };
    }
  }
  
  // Check for blocking human win
  for (const move of availableMoves) {
    const testBoard = makeMove(board, move, 'X');
    if (checkWinner(testBoard).winner === 'X') {
      return { position: move };
    }
  }
  
  if (Math.random() < 0.6) {
    // 60% chance of making an optimal move
    const optimalMove = minimax(board, 0, true, -Infinity, Infinity, 4);
    return { position: optimalMove.position };
  }
  
  // 40% chance of random move from remaining
  const randomIndex = Math.floor(Math.random() * availableMoves.length);
  return { position: availableMoves[randomIndex] };
};

// Hard AI: Minimax with limited depth
const getHardMove = (board: Board): AIMove => {
  const result = minimax(board, 0, true, -Infinity, Infinity, 6);
  return { position: result.position, score: result.score };
};

// Expert AI: Full minimax with alpha-beta pruning
const getExpertMove = (board: Board): AIMove => {
  const result = minimax(board, 0, true);
  return { position: result.position, score: result.score };
};

export const getAIMove = (board: Board, difficulty: Difficulty): AIMove => {
  switch (difficulty) {
    case 'easy':
      return getEasyMove(board);
    case 'medium':
      return getMediumMove(board);
    case 'hard':
      return getHardMove(board);
    case 'expert':
      return getExpertMove(board);
    default:
      return getEasyMove(board);
  }
};

export const getDifficultyDescription = (difficulty: Difficulty): string => {
  switch (difficulty) {
    case 'easy':
      return 'Beginner friendly - makes some mistakes';
    case 'medium':
      return 'Balanced challenge - strategic play';
    case 'hard':
      return 'Tough opponent - advanced strategy';
    case 'expert':
      return 'Unbeatable - perfect play';
    default:
      return 'Select difficulty level';
  }
};