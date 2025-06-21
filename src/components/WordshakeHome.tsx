import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Trophy, Book } from 'lucide-react';
import VocabularyInstructionsModal from './VocabularyInstructionsModal';

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
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <ArrowLeft size={20} />
              Back to Games
            </button>
            <div className="flex items-center gap-2 bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
              <Book size={24} className="text-blue-600" />
              <span className="text-lg font-bold text-gray-800">Vocabulary Challenge</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Vocabulary Challenge</h1>
            <p className="text-xl text-gray-600 mb-8">
              Build words from letter grids and expand your vocabulary
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Book size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Build Words</h3>
                  <p className="text-sm text-gray-600">Create words from letters</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy size={32} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Earn Stars</h3>
                  <p className="text-sm text-gray-600">Score based on word length</p>
                </div>
                <div className="text-center">
                  <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen size={32} className="text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Learn Themes</h3>
                  <p className="text-sm text-gray-600">Explore different categories</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">How to Play</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Select letters from the 4x4 grid to form words</li>
                  <li>• Words must be at least 3 letters long</li>
                  <li>• All words must relate to the current theme</li>
                  <li>• Use Validate to check your word</li>
                  <li>• Use Shuffle to rearrange letters</li>
                  <li>• Try to find as many words as possible!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onStartGame}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play size={24} />
              Start Vocabulary Game
            </button>
            
            <button
              onClick={handleShowInstructions}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <BookOpen size={20} />
              Instructions
            </button>
            
            <button
              onClick={onShowLeaderboard}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <Trophy size={20} />
              Leaderboard
            </button>
          </div>
        </div>
      </div>

      {/* Instructions Modal */}
      <VocabularyInstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
};

export default WordshakeHome;