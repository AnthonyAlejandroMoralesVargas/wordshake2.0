import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Trophy, Book } from 'lucide-react';
import VocabularyInstructionsModal from './VocabularyInstructionsModal';
import VocabularyDifficultyModal from './VocabularyDifficultyModal';
import VocabularyLeaderboardModal from './VocabularyLeaderboardModal';

interface WordshakeHomeProps {
  onStartGame: (difficulty: string) => void;
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
  const [showDifficultySelection, setShowDifficultySelection] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleShowLeaderboard = () => {
    setShowLeaderboard(true);
  };

  const handleStartGame = () => {
    setShowDifficultySelection(true);
  };

  const handleSelectDifficulty = (difficulty: string) => {
    setShowDifficultySelection(false);
    onStartGame(difficulty);
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
              Build words from letter grids based on different themes
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Book size={32} className="text-blue-600" />
                  </div>
                  <h2 className="font-semibold text-gray-800">Build Words</h2>
                  <p className="text-sm text-gray-600">Create words from letters</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy size={32} className="text-purple-600" />
                  </div>
                  <h2 className="font-semibold text-gray-800">Earn Stars</h2>
                  <p className="text-sm text-gray-600">Score based on word length</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play size={32} className="text-green-600" />
                  </div>
                  <h2 className="font-semibold text-gray-800">Beat the Clock</h2>
                  <p className="text-sm text-gray-600">Race against time</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                <h2 className="text-xl font-bold mb-2">How to Play</h2>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Choose your difficulty level (Basic, Intermediate, Advanced)</li>
                  <li>• Basic: 3-minute time limit, simple themes, unlimited shuffles</li>
                  <li>• Intermediate: 2.5-minute time limit, mixed themes, limited shuffles</li>
                  <li>• Advanced: 2-minute time limit, complex themes, no shuffles</li>
                  <li>• Select letters from the 4x4 grid to form words</li>
                  <li>• Words must be at least 3 letters long</li>
                  <li>• All words must relate to the current theme</li>
                  <li>• Use Validate to check your word</li>
                  <li>• Use Shuffle to rearrange letters (if available)</li>
                  <li>• Try to find as many words as possible!</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartGame}
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
              onClick={handleShowLeaderboard}
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

      {/* Leaderboard Modal */}
      <VocabularyLeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      {/* Difficulty Selection Modal */}
      <VocabularyDifficultyModal
        isOpen={showDifficultySelection}
        onClose={() => setShowDifficultySelection(false)}
        onSelectDifficulty={handleSelectDifficulty}
      />
    </>
  );
};

export default WordshakeHome;