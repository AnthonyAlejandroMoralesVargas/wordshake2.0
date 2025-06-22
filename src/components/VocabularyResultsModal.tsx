import { Book, Clock, Home, RotateCcw, Star, Trophy, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useScoreService } from '../hooks/useScoreService';

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
  const { saveVocabularyScore, loading, error } = useScoreService();
  const [scoreSaved, setScoreSaved] = useState(false);
  const [showSaveFeedback, setShowSaveFeedback] = useState(false);

  useEffect(() => {
    if (isOpen && isLoggedIn && user) {
      // Auto-save score when modal opens and user is logged in
      handleAutoSave();
    }
  }, [isOpen, isLoggedIn, user]);

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

  const handleAutoSave = async () => {
    if (!isLoggedIn || !user) {
      console.log('User not logged in, skipping score save');
      return;
    }

    console.log('Saving vocabulary score to API...');

    try {
      const success = await saveVocabularyScore(
        wordsFound.length,
        difficulty,
        score,
        timeSpent / 1000 // Convert to seconds
      );

      if (success) {
        console.log('Score saved successfully to API');
        setScoreSaved(true);
        setShowSaveFeedback(true);

        // Hide save feedback after 3 seconds
        setTimeout(() => {
          setShowSaveFeedback(false);
        }, 3000);
      } else {
        console.error('Failed to save score to API');
      }
    } catch (error) {
      console.error('Error saving score to API:', error);
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

          {/* Save Status */}
          {isLoggedIn && (
            <div className="mb-4">
              {loading && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-blue-600 text-sm">Saving your score...</p>
                </div>
              )}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm">Error saving score: {error}</p>
                </div>
              )}
              {scoreSaved && showSaveFeedback && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-600 text-sm">Score saved successfully!</p>
                </div>
              )}
              {!isLoggedIn && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <p className="text-yellow-600 text-sm">
                    <User size={16} className="inline mr-1" />
                    Login to save your scores and compete on leaderboards!
                  </p>
                </div>
              )}
            </div>
          )}

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

          {/* Words Found */}
          {wordsFound.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Words Found</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {wordsFound.map((word, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onRestart}
              disabled={loading}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
            <button
              onClick={onLeaderboard}
              disabled={loading}
              className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <Trophy size={20} />
              Leaderboard
            </button>
            <button
              onClick={onHome}
              disabled={loading}
              className="flex-1 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed"
            >
              <Home size={20} />
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyResultsModal; 