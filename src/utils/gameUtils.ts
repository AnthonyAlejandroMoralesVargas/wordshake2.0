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

// Improved algorithm that's smarter about letter selection
export const generateOptimalLetterMatrix = (theme: Theme): string[] => {
  // Step 1: Analyze all words to find required letter frequencies
  const letterFrequencies: { [key: string]: number } = {};
  const allLetters = new Set<string>();
  
  theme.words.forEach(word => {
    const wordLetters = word.split('');
    const wordLetterCount: { [key: string]: number } = {};
    
    // Count letters in this word
    wordLetters.forEach(letter => {
      wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
      allLetters.add(letter);
    });
    
    // Update global frequencies (take maximum needed for each letter)
    Object.entries(wordLetterCount).forEach(([letter, count]) => {
      letterFrequencies[letter] = Math.max(letterFrequencies[letter] || 0, count);
    });
  });
  
  // Step 2: Calculate optimal grid size
  const totalRequiredLetters = Object.values(letterFrequencies).reduce((sum, count) => sum + count, 0);
  
  // Find the best grid size (prefer square grids, but allow some flexibility)
  let gridSize = Math.ceil(Math.sqrt(totalRequiredLetters));
  
  // If the grid would be too large, try to optimize
  if (gridSize > 8) {
    // Try to find a better size by allowing some letter reuse
    const optimizedSize = Math.ceil(Math.sqrt(totalRequiredLetters * 0.8)); // Allow 20% reuse
    if (optimizedSize <= 8) {
      gridSize = optimizedSize;
    }
  }
  
  // Ensure minimum size of 4x4 and maximum of 8x8
  gridSize = Math.max(4, Math.min(8, gridSize));
  
  const totalGridCells = gridSize * gridSize;
  
  console.log('Letter frequencies:', letterFrequencies);
  console.log('Total required letters:', totalRequiredLetters);
  console.log('Grid size:', gridSize, 'x', gridSize);
  console.log('Total grid cells:', totalGridCells);
  
  // Step 3: Create the optimal grid
  const grid: string[] = [];
  
  // Add required letters first
  Object.entries(letterFrequencies).forEach(([letter, count]) => {
    for (let i = 0; i < count; i++) {
      grid.push(letter);
    }
  });
  
  // Fill remaining cells with strategic letters
  const remainingCells = totalGridCells - grid.length;
  
  // Create a smart letter selection based on the theme
  const smartLetters = getSmartLetterSelection(theme, allLetters, remainingCells);
  
  for (let i = 0; i < remainingCells; i++) {
    grid.push(smartLetters[i % smartLetters.length]);
  }
  
  // Shuffle the grid
  return shuffleArray(grid);
};

// Helper function to select smart additional letters
const getSmartLetterSelection = (theme: Theme, themeLetters: Set<string>, count: number): string[] => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const commonLetters = ['E', 'A', 'R', 'I', 'O', 'T', 'N', 'S', 'L', 'C', 'U', 'D', 'P', 'M', 'H', 'G', 'B', 'F', 'Y', 'W', 'K', 'V', 'X', 'Z', 'J', 'Q'];
  
  // Start with common letters that are already in the theme
  const smartSelection: string[] = [];
  
  // Add theme letters that are common in English
  commonLetters.forEach(letter => {
    if (themeLetters.has(letter) && smartSelection.length < count) {
      smartSelection.push(letter);
    }
  });
  
  // Add other common letters
  commonLetters.forEach(letter => {
    if (!smartSelection.includes(letter) && smartSelection.length < count) {
      smartSelection.push(letter);
    }
  });
  
  // Fill remaining with random letters if needed
  while (smartSelection.length < count) {
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
    if (!smartSelection.includes(randomLetter)) {
      smartSelection.push(randomLetter);
    }
  }
  
  return smartSelection.slice(0, count);
};

// Helper function to validate if all words can be formed from the grid
export const validateGridCanFormAllWords = (grid: string[], theme: Theme): boolean => {
  const gridLetterCount: { [key: string]: number } = {};
  
  // Count letters in grid
  grid.forEach(letter => {
    gridLetterCount[letter] = (gridLetterCount[letter] || 0) + 1;
  });
  
  // Check if each word can be formed
  for (const word of theme.words) {
    const wordLetterCount: { [key: string]: number } = {};
    
    // Count letters needed for this word
    word.split('').forEach(letter => {
      wordLetterCount[letter] = (wordLetterCount[letter] || 0) + 1;
    });
    
    // Check if grid has enough letters
    for (const [letter, count] of Object.entries(wordLetterCount)) {
      if (!gridLetterCount[letter] || gridLetterCount[letter] < count) {
        console.log(`Cannot form word "${word}" - missing ${count - (gridLetterCount[letter] || 0)} of letter "${letter}"`);
        return false;
      }
    }
  }
  
  console.log('All words can be formed from this grid!');
  return true;
};

// Test function to verify the algorithm
export const testOptimalGridAlgorithm = () => {
  const testThemes = [
    {
      name: 'Test Fruits',
      words: ['APPLE', 'BANANA', 'ORANGE', 'GRAPE']
    },
    {
      name: 'Test Animals', 
      words: ['CAT', 'DOG', 'BIRD', 'FISH', 'LION', 'TIGER']
    },
    {
      name: 'Test Colors',
      words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK']
    }
  ];
  
  testThemes.forEach(theme => {
    console.log(`\n=== Testing ${theme.name} ===`);
    const grid = generateOptimalLetterMatrix(theme as Theme);
    const isValid = validateGridCanFormAllWords(grid, theme as Theme);
    console.log(`Grid: ${grid.join('')}`);
    console.log(`Grid size: ${Math.sqrt(grid.length)}x${Math.sqrt(grid.length)}`);
    console.log(`All words can be formed: ${isValid}`);
  });
};