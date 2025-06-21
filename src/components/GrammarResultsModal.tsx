import React, { useState } from 'react';

interface GrammarResultsModalProps {
  totalTime: number;
  sentencesCompleted: number;
  totalSentences: number;
  sessionTitle: string;
  difficulty: string;
  onSaveScore: (playerName: string) => void;
  onRestart: () => void;
  onLeaderboard: () => void;
  onBack: () => void;
}

const GrammarResultsModal: React.FC<GrammarResultsModalProps> = ({
  totalTime,
  sentencesCompleted,
  totalSentences,
  sessionTitle,
  difficulty,
  onSaveScore,
  onRestart,
  onLeaderboard,
  onBack
}) => {
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(true);
  const [scoreSaved, setScoreSaved] = useState(false);

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getCompletionRate = () => {
    return Math.round((sentencesCompleted / totalSentences) * 100);
  };

  const getPerformanceMessage = () => {
    const completionRate = getCompletionRate();
    if (completionRate === 100) {
      return "Perfect! You completed all sentences!";
    } else if (completionRate >= 80) {
      return "Great job! You completed most sentences!";
    } else if (completionRate >= 60) {
      return "Good effort! Keep practicing!";
    } else {
      return "Keep practicing to improve your skills!";
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleSaveScore = () => {
    if (playerName.trim()) {
      onSaveScore(playerName.trim());
      setScoreSaved(true);
      setShowNameInput(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Session Complete!
            </h1>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
            </div>
          </div>

          {/* Session Info */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-blue-800 mb-3">
              Session Details
            </h2>
            <div className="space-y-2 text-blue-700">
              <p><strong>Session:</strong> {sessionTitle}</p>
              <p><strong>Difficulty:</strong> {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</p>
              <p><strong>Total Time:</strong> {formatTime(totalTime)}</p>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {sentencesCompleted}/{totalSentences}
              </div>
              <div className="text-sm text-green-700">Sentences Completed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {getCompletionRate()}%
              </div>
              <div className="text-sm text-blue-700">Completion Rate</div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatTime(totalTime)}
              </div>
              <div className="text-sm text-purple-700">Total Time</div>
            </div>
          </div>

          {/* Performance Message */}
          <div className="bg-yellow-50 rounded-lg p-4 mb-6">
            <p className="text-center text-yellow-800 font-semibold">
              {getPerformanceMessage()}
            </p>
          </div>

          {/* Name Input */}
          {showNameInput && !scoreSaved && (
            <div className="mb-6">
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
                Enter your name to save your score:
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={20}
              />
              <button
                onClick={handleSaveScore}
                disabled={!playerName.trim()}
                className={`w-full mt-3 px-6 py-3 rounded-lg font-semibold transition-colors ${
                  playerName.trim()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save Score
              </button>
            </div>
          )}

          {/* Score Saved Message */}
          {scoreSaved && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-center text-green-800 font-semibold">
                ✅ Score saved successfully!
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onRestart}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              🎯 Practice Again
            </button>
            
            <button
              onClick={onLeaderboard}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              🏆 View Leaderboard
            </button>
            
            <button
              onClick={onBack}
              className="w-full px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              🏠 Back to Menu
            </button>
          </div>

          {/* Tips for Next Time */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tips for Next Time:
            </h3>
            <ul className="space-y-1 text-gray-700 text-sm">
              <li>• Practice pronunciation before recording</li>
              <li>• Speak clearly and at a natural pace</li>
              <li>• Pay attention to grammar patterns</li>
              <li>• Use the translation to understand meaning</li>
              <li>• Don't rush - accuracy is more important than speed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarResultsModal; 