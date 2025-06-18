import React, { useState, useEffect } from 'react';
import { getRandomTheme } from '../data/themes';
import { generateLetterMatrix, shuffleArray, isValidWord, calculateStars } from '../utils/gameUtils';
import { useGameTimer } from '../hooks/useGameTimer';
import GameHeader from './GameHeader';
import LetterGrid from './LetterGrid';
import WordDisplayWithActions from './WordDisplayWithActions';
import FoundWordsList from './FoundWordsList';
import InstructionsModal from './InstructionsModal';
import GameEndModal from './GameEndModal';
import ConfirmationModal from './ConfirmationModal';
import { Theme } from '../types';

interface WordshakeGameProps {
  onHome: () => void;
}

const WordshakeGame: React.FC<WordshakeGameProps> = ({ onHome }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>(getRandomTheme());
  const [letters, setLetters] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [currentWord, setCurrentWord] = useState<string>('');
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showGameEnd, setShowGameEnd] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showHomeConfirmation, setShowHomeConfirmation] = useState<boolean>(false);
  const [showRestartConfirmation, setShowRestartConfirmation] = useState<boolean>(false);

  const { timeRemaining, isRunning, startTimer, stopTimer, resetTimer, formatTime } = useGameTimer(180);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (timeRemaining === 0 && gameStarted) {
      handleGameEnd();
    }
  }, [timeRemaining, gameStarted]);

  const initializeGame = () => {
    const theme = getRandomTheme();
    setCurrentTheme(theme);
    setLetters(generateLetterMatrix(theme));
    setSelectedIndices([]);
    setCurrentWord('');
    setFoundWords([]);
    setScore(0);
    setShowGameEnd(false);
    resetTimer();
    setGameStarted(false);
  };

  const startGame = () => {
    setGameStarted(true);
    startTimer();
  };

  const handleLetterClick = (index: number) => {
    if (!gameStarted) {
      startGame();
    }

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
    setLetters(shuffleArray([...letters]));
    setSelectedIndices([]);
    setCurrentWord('');
  };

  const handleValidate = () => {
    if (currentWord.length < 3) {
      alert('Words must be at least 3 letters long!');
      return;
    }

    if (foundWords.includes(currentWord)) {
      alert('You already found this word!');
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
      alert(`"${currentWord}" is not a valid word for the ${currentTheme.name} theme!`);
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
    setShowGameEnd(true);
  };

  const handlePlayAgain = () => {
    initializeGame();
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

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Current Word</h3>
              <WordDisplayWithActions
                currentWord={currentWord}
                onShuffle={handleShuffle}
                onValidate={handleValidate}
                onClear={handleClear}
                canValidate={currentWord.length >= 3}
                disabled={timeRemaining === 0}
              />
            </div>

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
            </div>
          </div>
        </div>
      </div>

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      <GameEndModal
        isOpen={showGameEnd}
        score={score}
        foundWords={foundWords}
        onPlayAgain={handlePlayAgain}
        onHome={onHome}
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