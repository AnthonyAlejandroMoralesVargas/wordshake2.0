export interface Theme {
  id: string;
  name: string;
  color: string;
  words: string[];
}

export interface GameState {
  currentTheme: Theme;
  foundWords: string[];
  currentWord: string;
  selectedLetters: number[];
  score: number;
  timeRemaining: number;
  gameStarted: boolean;
  gameEnded: boolean;
  letters: string[];
}

export interface FoundWord {
  word: string;
  stars: number;
  theme: string;
}