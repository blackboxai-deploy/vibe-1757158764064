export type Player = 'X' | 'O' | null;
export type Board = Player[];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player;
  winningLine: number[] | null;
  scores: {
    player: number;
    computer: number;
    draws: number;
  };
}

export const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export const createEmptyBoard = (): Board => Array(9).fill(null);

export const checkWinner = (board: Board): { winner: Player; winningLine: number[] | null } => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: combination };
    }
  }
  return { winner: null, winningLine: null };
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(cell => cell !== null);
};

export const getGameStatus = (board: Board): { status: GameStatus; winner: Player; winningLine: number[] | null } => {
  const { winner, winningLine } = checkWinner(board);
  
  if (winner) {
    return { status: 'won', winner, winningLine };
  }
  
  if (isBoardFull(board)) {
    return { status: 'draw', winner: null, winningLine: null };
  }
  
  return { status: 'playing', winner: null, winningLine: null };
};

export const getAvailableMoves = (board: Board): number[] => {
  return board.map((cell, index) => cell === null ? index : -1).filter(index => index !== -1);
};

export const makeMove = (board: Board, position: number, player: Player): Board => {
  const newBoard = [...board];
  newBoard[position] = player;
  return newBoard;
};

export const isValidMove = (board: Board, position: number): boolean => {
  return position >= 0 && position < 9 && board[position] === null;
};