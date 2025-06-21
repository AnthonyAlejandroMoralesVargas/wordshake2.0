import React, { useState } from 'react';
import { ArrowLeft, Play, BookOpen, Trophy, Volume2 } from 'lucide-react';
import ListeningInstructionsModal from './ListeningInstructionsModal';
import ListeningLeaderboardModal from './ListeningLeaderboardModal';
import DifficultySelectionModal from './DifficultySelectionModal';

interface ListeningHomeProps {
  onStartGame: (difficulty: string) => void;
  onShowInstructions: () => void;
  onShowLeaderboard: () => void;
  onBack: () => void;
}

const ListeningHome: React.FC<ListeningHomeProps> = ({
  onStartGame,
  onShowInstructions,
  onShowLeaderboard,
  onBack
}) => {
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showDifficultySelection, setShowDifficultySelection] = useState<boolean>(false);

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
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
              <Volume2 size={24} className="text-green-600" />
              <span className="text-lg font-bold text-gray-800">Listening Challenge</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Listening Challenge</h1>
            <p className="text-xl text-gray-600 mb-8">
              Watch videos and fill in the missing words by listening carefully
            </p>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Volume2 size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Listen Carefully</h3>
                  <p className="text-sm text-gray-600">Pay attention to pronunciation</p>
                </div>
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <BookOpen size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Fill the Blanks</h3>
                  <p className="text-sm text-gray-600">Complete the paragraph</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy size={32} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Earn Points</h3>
                  <p className="text-sm text-gray-600">Score based on accuracy</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">How to Play</h3>
                <ul className="text-left space-y-2 text-sm">
                  <li>• Choose your challenge level (Basic, Intermediate, Advanced)</li>
                  <li>• Basic: No time limit, unlimited video playback, hints and skip available</li>
                  <li>• Intermediate: 5-minute time limit, unlimited video playback, hints and skip available</li>
                  <li>• Advanced: No time limit, only 2 video plays, no hints, no skip</li>
                  <li>• Watch the embedded YouTube video</li>
                  <li>• Listen for the missing words in the paragraph</li>
                  <li>• Type the words you hear in the blank spaces</li>
                  <li>• Use hints if available for your level</li>
                  <li>• Submit your answers to check your score</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleStartGame}
              className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play size={24} />
              Start Listening Game
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
      <ListeningInstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />

      {/* Leaderboard Modal */}
      <ListeningLeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      {/* Difficulty Selection Modal */}
      <DifficultySelectionModal
        isOpen={showDifficultySelection}
        onClose={() => setShowDifficultySelection(false)}
        onSelectDifficulty={handleSelectDifficulty}
      />
    </>
  );
};

export default ListeningHome; 