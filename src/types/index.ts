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

// New types for Listening Game
export interface VideoData {
  id: string;
  title: string;
  youtubeId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  duration: string;
}

export interface ListeningExercise {
  id: string;
  videoId: string;
  paragraph: string;
  blanks: Blank[];
  correctAnswers: string[];
  hints: string[];
}

export interface Blank {
  id: number;
  word: string;
  startTime: number;
  endTime: number;
  hint?: string;
}

export interface ListeningGameState {
  currentVideo: VideoData | null;
  currentExercise: ListeningExercise | null;
  userAnswers: { [key: number]: string };
  score: number;
  timeRemaining: number;
  gameStarted: boolean;
  gameEnded: boolean;
  currentTime: number;
  isPlaying: boolean;
}

// Scoring and Leaderboard Types
export interface ListeningScore {
  id: string;
  playerName: string;
  score: number;
  maxScore: number;
  percentage: number;
  correctAnswers: number;
  totalBlanks: number;
  videoTitle: string;
  difficulty: string;
  date: string;
  timeSpent: number;
}

export interface VocabularyScore {
  id: string;
  playerName: string;
  score: number;
  stars: number;
  wordsFound: number;
  theme: string;
  date: string;
  timeSpent: number;
}

export interface GameInstructions {
  vocabulary: string[];
  listening: string[];
}

// Grammar/Speaking Game Types
export interface GrammarSession {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  sentences: GrammarSentence[];
}

export interface GrammarSentence {
  id: number;
  text: string;
  audioUrl?: string;
  translation?: string;
  grammarPoint?: string;
}

export interface GrammarGameState {
  currentSession: GrammarSession | null;
  currentSentenceIndex: number;
  isPlaying: boolean;
  isRecording: boolean;
  gameStarted: boolean;
  gameEnded: boolean;
  startTime: number;
  endTime: number;
  totalTime: number;
}

export interface GrammarScore {
  id: string;
  playerName: string;
  sessionTitle: string;
  difficulty: string;
  totalTime: number;
  finalScore: number;
  maxScore: number;
  date: string;
  sentencesCompleted: number;
  totalSentences: number;
}