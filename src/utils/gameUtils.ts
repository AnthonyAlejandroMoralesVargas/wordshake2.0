import { Theme } from '../types';

export const generateLetterMatrix = (theme: Theme): string[] => {
  const letters: string[] = [];
  const themeLetters: string[] = [];
  
  // Extract letters from theme words
  theme.words.forEach(word => {
    themeLetters.push(...word.split(''));
  });
  
  // Add some theme letters (60% of matrix)
  const themeLetterCount = Math.floor(16 * 0.6);
  for (let i = 0; i < themeLetterCount; i++) {
    letters.push(themeLetters[Math.floor(Math.random() * themeLetters.length)]);
  }
  
  // Fill remaining with random letters
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const remainingCount = 16 - themeLetterCount;
  for (let i = 0; i < remainingCount; i++) {
    letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
  }
  
  // Shuffle the array
  return shuffleArray(letters);
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const isValidWord = (word: string, theme: Theme): boolean => {
  return theme.words.includes(word.toUpperCase());
};

export const calculateStars = (wordLength: number): number => {
  if (wordLength < 3) return 0;
  if (wordLength === 3) return 1;
  if (wordLength === 4) return 2;
  if (wordLength === 5) return 3;
  if (wordLength === 6) return 4;
  return 5; // 7+ letters
};

export const canFormWord = (word: string, availableLetters: string[]): boolean => {
  const letterCount: { [key: string]: number } = {};
  
  // Count available letters
  availableLetters.forEach(letter => {
    letterCount[letter] = (letterCount[letter] || 0) + 1;
  });
  
  // Check if word can be formed
  for (const letter of word.toUpperCase()) {
    if (!letterCount[letter] || letterCount[letter] === 0) {
      return false;
    }
    letterCount[letter]--;
  }
  
  return true;
};