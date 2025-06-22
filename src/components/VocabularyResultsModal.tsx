import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Home, User, Star, Clock, Book, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { saveVocabularyScore } from '../utils/scoreUtils';

interface VocabularyResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  onHome: () => void;
  onLeaderboard: () => void;
  score: number;
  stars: number;
  wordsFound: string[];
  totalWords: number;
  theme: string;
  difficulty: string;
  timeSpent: number;
  autoSaved?: boolean;
}

const VocabularyResultsModal: React.FC<VocabularyResultsModalProps> = ({
  isOpen,
  onClose,
  onRestart,
  onHome,
  onLeaderboard,
  score,
  stars,
  wordsFound,
  totalWords,
  theme,
  difficulty,
  timeSpent,
  autoSaved = false
}) => {
  const { user, isLoggedIn } = useAuth();
  const [scoreSaved, setScoreSaved] = useState(false);
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Auto-save score when modal opens
      handleAutoSave();
    }
  }, [isOpen]);

  const getScoreMessage = (score: number) => {
    if (score >= 50) return "Outstanding! You're a vocabulary master!";
    if (score >= 30) return "Excellent work! Great word-building skills!";
    if (score >= 20) return "Good job! Keep expanding your vocabulary!";
    if (score >= 10) return "Nice try! You're improving!";
    return "Keep practicing! Every game makes you better!";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600';
      case 'intermediate': return 'text-blue-600';
      case 'advanced': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAutoSave = () => {
    const playerName = isLoggedIn && user ? user.displayName : 'Anonymous Player';
    
    const scoreData = {
      playerName: playerName,
      score: score,
      stars: stars,
      wordsFound: wordsFound.length,
      theme: theme,
      difficulty: difficulty,
      timeSpent: timeSpent
    };

    console.log('Saving score:', scoreData);

    try {
      const savedScore = saveVocabularyScore(scoreData);
      console.log('Score saved successfully:', savedScore);
      
      setScoreSaved(true);
      setShowSaveFeedback(true);

      // Hide save feedback after 3 seconds
      setTimeout(() => {
        setShowSaveFeedback(false);
      }, 3000);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={32} />
              <div>
                <h2 className="text-2xl font-bold">Vocabulary Challenge Results</h2>
                <p className="text-blue-100">Your word-building performance</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Score Summary */}
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-gray-800 mb-2">{score}</div>
            <div className="text-lg text-gray-600 mb-4">Total Points</div>
            <p className="text-lg font-semibold text-blue-600">{getScoreMessage(score)}</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star size={20} className="text-yellow-600" />
                <span className="text-2xl font-bold text-yellow-600">{stars}</span>
              </div>
              <div className="text-gray-600">Stars Earned</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Book size={20} className="text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{wordsFound.length}</span>
              </div>
              <div className="text-gray-600">Words Found</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock size={20} className="text-green-600" />
                <span className="text-2xl font-bold text-green-600">{formatTime(timeSpent)}</span>
              </div>
              <div className="text-gray-600">Time Spent</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">
                {Math.round((wordsFound.length / totalWords) * 100)}%
              </div>
              <div className="text-gray-600">Completion</div>
            </div>
          </div>

          {/* Game Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Game Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Theme:</span>
                <span className="font-medium text-gray-800">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className={`font-medium px-2 py-1 rounded-full text-xs ${getDifficultyBadge(difficulty)}`}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Possible Words:</span>
                <span className="font-medium text-gray-800">{totalWords}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Player:</span>
                <span className="font-medium text-gray-800">
                  {isLoggedIn && user ? user.displayName : 'Anonymous Player'}
                </span>
              </div>
            </div>
          </div>

          {/* Found Words */}
          {wordsFound.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Words You Found</h3>
              <div className="bg-white border rounded-lg p-4 max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {wordsFound.map((word, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Auto Save Feedback */}
          {showSaveFeedback && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800">
                <Trophy size={20} />
                <span className="font-semibold">Score automatically saved!</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Your score has been saved to the leaderboard.
              </p>
            </div>
          )}

          {/* Main Action Buttons */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">What would you like to do next?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onRestart}
                className="flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-lg"
              >
                <RotateCcw size={20} />
                Start New Game
              </button>
              <button
                onClick={onHome}
                className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-lg"
              >
                <Home size={20} />
                Back to Menu
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-center">
            <button
              onClick={onLeaderboard}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              <Trophy size={16} />
              View Leaderboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyResultsModal; 