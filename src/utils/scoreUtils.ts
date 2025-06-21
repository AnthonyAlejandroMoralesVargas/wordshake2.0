import { ListeningScore, VocabularyScore } from '../types';

// Local Storage Keys
const VOCABULARY_SCORES_KEY = 'wordshake_vocabulary_scores';
const LISTENING_SCORES_KEY = 'wordshake_listening_scores';

// Vocabulary Score Functions
export const saveVocabularyScore = (score: Omit<VocabularyScore, 'id' | 'date'>) => {
  const scores = getVocabularyScores();
  const newScore: VocabularyScore = {
    ...score,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score); // Sort by score descending
  
  // Keep only top 50 scores
  const topScores = scores.slice(0, 50);
  localStorage.setItem(VOCABULARY_SCORES_KEY, JSON.stringify(topScores));
  
  return newScore;
};

export const getVocabularyScores = (): VocabularyScore[] => {
  try {
    const scores = localStorage.getItem(VOCABULARY_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch {
    return [];
  }
};

export const getVocabularyLeaderboard = (limit: number = 10): VocabularyScore[] => {
  const scores = getVocabularyScores();
  return scores.slice(0, limit);
};

// Listening Score Functions
export const saveListeningScore = (score: Omit<ListeningScore, 'id' | 'date'>) => {
  const scores = getListeningScores();
  const newScore: ListeningScore = {
    ...score,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  
  scores.push(newScore);
  scores.sort((a, b) => b.score - a.score); // Sort by score descending
  
  // Keep only top 50 scores
  const topScores = scores.slice(0, 50);
  localStorage.setItem(LISTENING_SCORES_KEY, JSON.stringify(topScores));
  
  return newScore;
};

export const getListeningScores = (): ListeningScore[] => {
  try {
    const scores = localStorage.getItem(LISTENING_SCORES_KEY);
    return scores ? JSON.parse(scores) : [];
  } catch {
    return [];
  }
};

export const getListeningLeaderboard = (limit: number = 10): ListeningScore[] => {
  const scores = getListeningScores();
  return scores.slice(0, limit);
};

// Calculate Listening Score
export const calculateListeningScore = (
  correctAnswers: number,
  totalBlanks: number,
  timeSpent: number,
  hintsUsed: number = 0
): number => {
  // If no correct answers, score should be 0
  if (correctAnswers === 0) {
    return 0;
  }
  
  // Base score based on accuracy (0-100)
  const baseScore = Math.round((correctAnswers / totalBlanks) * 100);
  
  // Only apply bonuses if there are correct answers
  let finalScore = baseScore;
  
  // Bonus for speed (faster = more points, max 10 bonus points)
  // Only apply if at least 50% of answers are correct
  if (correctAnswers >= totalBlanks * 0.5) {
    const timeBonus = Math.max(0, 10 - Math.floor(timeSpent / 60)); // Max 10 bonus points
    finalScore += timeBonus;
  }
  
  // Penalty for hints used (max penalty of 20 points)
  const hintPenalty = Math.min(20, hintsUsed * 5); // 5 points penalty per hint, max 20
  finalScore -= hintPenalty;
  
  // Ensure score is between 0 and 100
  finalScore = Math.max(0, Math.min(100, finalScore));
  
  return Math.round(finalScore);
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Format time for display
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}; 