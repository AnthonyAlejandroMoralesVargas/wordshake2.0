import React, { useState, useEffect, useRef } from 'react';
import { getRandomTheme } from '../data/themes';
import { generateOptimalLetterMatrix, shuffleArray, isValidWord, calculateStars, validateGridCanFormAllWords, testOptimalGridAlgorithm } from '../utils/gameUtils';
import { useGameTimer } from '../hooks/useGameTimer';
import GameHeader from './GameHeader';
import LetterGrid from './LetterGrid';
import WordDisplayWithActions from './WordDisplayWithActions';
import FoundWordsList from './FoundWordsList';
import VocabularyInstructionsModal from './VocabularyInstructionsModal';
import VocabularyResultsModal from './VocabularyResultsModal';
import VocabularyLeaderboardModal from './VocabularyLeaderboardModal';
import ConfirmationModal from './ConfirmationModal';
import { Theme } from '../types';

interface WordshakeGameProps {
  difficulty: string;
  onHome: () => void;
}

const WordshakeGame: React.FC<WordshakeGameProps> = ({ difficulty, onHome }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getRandomTheme(difficulty));
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showHomeConfirmation, setShowHomeConfirmation] = useState<boolean>(false);
  const [showRestartConfirmation, setShowRestartConfirmation] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [shufflesRemaining, setShufflesRemaining] = useState<number>(getShufflesForDifficulty(difficulty));
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameEndTime, setGameEndTime] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Get time limit based on difficulty
  const timeLimit = getTimeLimitForDifficulty(difficulty);
  const { timeRemaining, isRunning, startTimer, stopTimer, resetTimer, formatTime } = useGameTimer(timeLimit);

  useEffect(() => {
    if (timeRemaining === 0 && gameStarted) {
      handleGameEnd();
    }
  }, [timeRemaining, gameStarted]);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Cleanup effect
  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  // Test the algorithm on mount
  useEffect(() => {
    console.log('Testing optimal grid algorithm...');
    testOptimalGridAlgorithm();
  }, []);

  function getTimeLimitForDifficulty(difficulty: string): number {
    switch (difficulty) {
      case 'beginner': return 180; // 3 minutes
      case 'intermediate': return 150; // 2.5 minutes
      case 'advanced': return 120; // 2 minutes
      default: return 180;
    }
  }

  function getShufflesForDifficulty(difficulty: string): number {
    switch (difficulty) {
      case 'beginner': return -1; // Unlimited
      case 'intermediate': return 5;
      case 'advanced': return 0; // No shuffles
      default: return -1;
    }
  }

  const initializeGame = () => {
    // Clear any existing error timeout
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
      errorTimeoutRef.current = null;
    }
    
    const theme = getRandomTheme(difficulty);
    setCurrentTheme(theme);
    
    // Generate optimal grid
    const optimalGrid = generateOptimalLetterMatrix(theme);
    setLetters(optimalGrid);
    
    // Validate that all words can be formed
    const canFormAllWords = validateGridCanFormAllWords(optimalGrid, theme);
    console.log(`Grid validation for theme "${theme.name}": ${canFormAllWords ? 'SUCCESS' : 'FAILED'}`);
    
    setSelectedIndices([]);
    setCurrentWord('');
    setFoundWords([]);
    setScore(0);
    setShowResults(false);
    setShufflesRemaining(getShufflesForDifficulty(difficulty));
    resetTimer();
    setGameStarted(true);
    setGameStartTime(Date.now());
    startTimer();
    setErrorMessage('');
    setShowError(false);
  };

  const handleLetterClick = (index: number) => {
    if (selectedIndices.includes(index)) {
      // Remove letter if already selected
      const newSelected = selectedIndices.filter(i => i !== index);
      setSelectedIndices(newSelected);
      setCurrentWord(newSelected.map(i => letters[i]).join(''));
    } else {
      // Add letter to selection
      const newSelected = [...selectedIndices, index];
      setSelectedIndices(newSelected);
      setCurrentWord(newSelected.map(i => letters[i]).join(''));
    }
  };

  const handleShuffle = () => {
    if (difficulty === 'advanced') {
      showErrorMessage('Shuffling is not allowed in Advanced mode!');
      return;
    }

    if (difficulty === 'intermediate' && shufflesRemaining <= 0) {
      showErrorMessage('No shuffles remaining in Intermediate mode!');
      return;
    }

    setLetters(shuffleArray([...letters]));
    setSelectedIndices([]);
    setCurrentWord('');
    
    if (difficulty === 'intermediate') {
      setShufflesRemaining(shufflesRemaining - 1);
    }
  };

  const handleValidate = () => {
    if (currentWord.length < 3) {
      showErrorMessage('Words must be at least 3 letters long!');
      return;
    }

    if (foundWords.includes(currentWord)) {
      showErrorMessage('You already found this word!');
      return;
    }

    if (isValidWord(currentWord, currentTheme)) {
      const stars = calculateStars(currentWord.length);
      setFoundWords([...foundWords, currentWord]);
      setScore(score + stars);
      setCurrentWord('');
      setSelectedIndices([]);
      
      // Show success feedback
      if (!isMuted) {
        // Success sound would go here
      }
    } else {
      showErrorMessage(`"${currentWord}" is not a valid word for the ${currentTheme.name} theme!`);
    }
  };

  const handleClear = () => {
    setCurrentWord('');
    setSelectedIndices([]);
  };

  const handleHomeClick = () => {
    if (gameStarted && timeRemaining > 0) {
      setShowHomeConfirmation(true);
    } else {
      onHome();
    }
  };

  const handleRestartClick = () => {
    if (gameStarted && timeRemaining > 0) {
      setShowRestartConfirmation(true);
    } else {
      handleRestart();
    }
  };

  const handleRestart = () => {
    stopTimer();
    initializeGame();
    setShowRestartConfirmation(false);
  };

  const handleConfirmHome = () => {
    setShowHomeConfirmation(false);
    onHome();
  };

  const handleGameEnd = () => {
    stopTimer();
    setGameEndTime(Date.now());
    setShowResults(true);
  };

  const handlePlayAgain = () => {
    initializeGame();
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const canShuffle = difficulty === 'beginner' || (difficulty === 'intermediate' && shufflesRemaining > 0);

  const showErrorMessage = (message: string) => {
    // Clear any existing timeout
    if (errorTimeoutRef.current) {
      clearTimeout(errorTimeoutRef.current);
    }
    
    setErrorMessage(message);
    setShowError(true);
    
    // Set new timeout - 1 second for invalid word messages
    errorTimeoutRef.current = setTimeout(() => {
      setShowError(false);
      errorTimeoutRef.current = null;
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-6xl mx-auto">
        <GameHeader
          onHome={handleHomeClick}
          onInstructions={() => setShowInstructions(true)}
          onRestart={handleRestartClick}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          themeName={currentTheme.name}
          themeColor={currentTheme.color}
          score={score}
          timeRemaining={formatTime}
        />

        {/* Error Message */}
        {showError && (
          <div className="max-w-6xl mx-auto mb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-red-800">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">{errorMessage}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Current Word above the grid */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Word</h3>
            <WordDisplayWithActions
              currentWord={currentWord}
              onShuffle={handleShuffle}
              onValidate={handleValidate}
              onClear={handleClear}
              canValidate={currentWord.length >= 3}
              canShuffle={canShuffle}
              disabled={timeRemaining === 0}
            />
            {difficulty === 'intermediate' && shufflesRemaining >= 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Shuffles remaining: {shufflesRemaining}
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Letter Grid - Takes 2/3 of the screen */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Letter Grid</h2>
                <LetterGrid
                  letters={letters}
                  selectedIndices={selectedIndices}
                  onLetterClick={handleLetterClick}
                  disabled={timeRemaining === 0}
                />
              </div>
            </div>

            {/* Sidebar - Takes 1/3 of the screen */}
            <div className="space-y-6">
              <FoundWordsList foundWords={foundWords} />
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Game Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-yellow-600">{score}</div>
                    <div className="text-gray-600">Total Stars</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{foundWords.length}</div>
                    <div className="text-gray-600">Words Found</div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Difficulty:</span>
                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                      difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                      difficulty === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Theme:</span>
                    <span className="font-medium text-gray-800">{currentTheme.name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VocabularyInstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <VocabularyResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        onRestart={handlePlayAgain}
        onHome={onHome}
        onLeaderboard={handleShowLeaderboard}
        score={score}
        stars={score}
        wordsFound={foundWords}
        totalWords={currentTheme.words.length}
        theme={currentTheme.name}
        difficulty={difficulty}
        timeSpent={gameEndTime - gameStartTime}
        autoSaved={true}
      />

      <VocabularyLeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        difficulty={difficulty}
      />

      <ConfirmationModal
        isOpen={showHomeConfirmation}
        title="Go to Home"
        message="Are you sure you want to go home? Your current game progress will be lost."
        onConfirm={handleConfirmHome}
        onCancel={() => setShowHomeConfirmation(false)}
      />

      <ConfirmationModal
        isOpen={showRestartConfirmation}
        title="Restart Game"
        message="Are you sure you want to restart? Your current game progress will be lost."
        onConfirm={handleRestart}
        onCancel={() => setShowRestartConfirmation(false)}
      />
    </div>
  );
};

export default WordshakeGame;