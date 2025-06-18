import React, { useState } from 'react';
import { Trophy, RotateCcw, Home, User } from 'lucide-react';

interface GameEndModalProps {
  isOpen: boolean;
  score: number;
  foundWords: string[];
  onPlayAgain: () => void;
  onHome: () => void;
}

const GameEndModal: React.FC<GameEndModalProps> = ({
  isOpen,
  score,
  foundWords,
  onPlayAgain,
  onHome
}) => {
  const [nickname, setNickname] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

  if (!isOpen) return null;

  const getScoreMessage = (score: number) => {
    if (score >= 50) return "Outstanding! You're a word master!";
    if (score >= 30) return "Excellent work! Great vocabulary skills!";
    if (score >= 20) return "Good job! Keep practicing!";
    if (score >= 10) return "Nice try! You're improving!";
    return "Keep practicing! Every game makes you better!";
  };

  const handleSaveScore = () => {
    if (nickname.trim()) {
      // Here you would typically save to a leaderboard
      // For now, we'll just show a success message
      setScoreSaved(true);
      setTimeout(() => {
        setScoreSaved(false);
      }, 2000);
    }
  };

  const handlePlayAgain = () => {
    setNickname('');
    setScoreSaved(false);
    onPlayAgain();
  };

  const handleHome = () => {
    setNickname('');
    setScoreSaved(false);
    onHome();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6 text-center">
          <div className="mb-6">
            <Trophy size={64} className="text-yellow-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Time's Up!</h2>
            <p className="text-gray-600">{getScoreMessage(score)}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-yellow-500">{score}</div>
                <div className="text-gray-600">Total Stars</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-500">{foundWords.length}</div>
                <div className="text-gray-600">Words Found</div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <User size={20} />
              Save to Leaderboard
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter your nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={20}
              />
              <button
                onClick={handleSaveScore}
                disabled={!nickname.trim() || scoreSaved}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg font-semibold transition-colors"
              >
                {scoreSaved ? '✓' : 'Save'}
              </button>
            </div>
            {scoreSaved && (
              <p className="text-green-600 text-sm mt-2">Score saved successfully!</p>
            )}
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handlePlayAgain}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw size={20} />
              Play Again
            </button>
            <button
              onClick={handleHome}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;