import React from 'react';
import { Play, BookOpen, Trophy, ArrowLeft } from 'lucide-react';

interface WordshakeHomeProps {
  onStartGame: () => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
  onBack: () => void;
}

const WordshakeHome: React.FC<WordshakeHomeProps> = ({
  onStartGame,
  onShowInstructions,
  onShowLeaderboard,
  onBack
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Game Selection
        </button>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">Wordshake</h1>
            <p className="text-xl text-gray-100 leading-relaxed">
              Challenge yourself to find as many words as possible from a grid of letters. 
              Each game focuses on a specific theme to help expand your vocabulary!
            </p>
          </div>

          <div className="grid gap-4">
            <button
              onClick={onStartGame}
              className="group bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg flex items-center justify-center gap-3"
            >
              <Play size={24} className="group-hover:scale-110 transition-transform" />
              Start Playing
            </button>

            <button
              onClick={onShowInstructions}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <BookOpen size={24} />
              Instructions
            </button>

            <button
              onClick={onShowLeaderboard}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3"
            >
              <Trophy size={24} />
              Leaderboard
            </button>
          </div>

          <div className="mt-8 bg-white bg-opacity-10 rounded-xl p-6">
            <h3 className="text-white font-semibold mb-3">How to earn stars:</h3>
            <div className="grid grid-cols-5 gap-2 text-sm text-gray-100">
              <div className="text-center">
                <div className="text-yellow-400 text-lg">★</div>
                <div>3 letters</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-lg">★★</div>
                <div>4 letters</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-lg">★★★</div>
                <div>5 letters</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-lg">★★★★</div>
                <div>6 letters</div>
              </div>
              <div className="text-center">
                <div className="text-yellow-400 text-lg">★★★★★</div>
                <div>7+ letters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordshakeHome;