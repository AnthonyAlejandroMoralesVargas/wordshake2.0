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
          <header className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
              aria-label="Go back to games menu"
            >
              <ArrowLeft size={20} aria-hidden="true" />
              Back to Games
            </button>
          </header>

          {/* Main Content */}
          <main className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-800 mb-4" tabIndex={0}>Vocabulary Challenge</h1>
            <p className="text-xl text-gray-600 mb-8" tabIndex={0}>
              Build words from letter grids based on different themes
            </p>
            
            <section className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto" aria-labelledby="game-overview">
              <h2 id="game-overview" className="sr-only">Game Features</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center" tabIndex={0}>
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Book size={32} className="text-blue-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Build Words</h3>
                  <p className="text-sm text-gray-600">Create words from letters</p>
                </div>
                <div className="text-center" tabIndex={0}>
                  <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Trophy size={32} className="text-purple-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Earn Stars</h3>
                  <p className="text-sm text-gray-600">Score based on word length</p>
                </div>
                <div className="text-center" tabIndex={0}>
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Play size={32} className="text-green-600" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-gray-800">Beat the Clock</h3>
                  <p className="text-sm text-gray-600">Race against time</p>
                </div>
              </div>

              <section className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white" aria-labelledby="how-to-play" tabIndex={0}>
                <h2 id="how-to-play" className="text-xl font-bold mb-2" tabIndex={0}>How to Play</h2>
                <ul className="text-left space-y-2 text-sm" tabIndex={0}>
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
              </section>
            </section>
          </main>

          {/* Action Buttons */}
          <nav className="flex flex-col sm:flex-row gap-4 justify-center items-center" aria-label="Game actions">
            <button
              onClick={handleStartGame}
              className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              aria-describedby="start-game-desc"
            >
              <Play size={24} aria-hidden="true" />
              Start Vocabulary Game
            </button>
            <span id="start-game-desc" className="sr-only">Begin a new vocabulary challenge game</span>
            
            <button
              onClick={handleShowInstructions}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
              aria-label="View detailed game instructions"
            >
              <BookOpen size={20} aria-hidden="true" />
              Instructions
            </button>
            
            <button
              onClick={handleShowLeaderboard}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md"
              aria-label="View top scores and rankings"
            >
              <Trophy size={20} aria-hidden="true" />
              Leaderboard
            </button>
          </nav>
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