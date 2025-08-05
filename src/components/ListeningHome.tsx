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

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

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
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4" role="main">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-8" role="banner">
            <nav role="navigation" aria-label="Game navigation">
              <button
                onClick={onBack}
                onKeyDown={(e) => handleKeyDown(e, onBack)}
                className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                tabIndex={0}
                aria-label="Go back to games selection"
              >
                <ArrowLeft size={20} aria-hidden="true" />
                Back to Games
              </button>
            </nav>
          </header>

          {/* Main Content */}
          <main role="main">
            <section className="text-center mb-12" role="region" aria-labelledby="game-title">
              <h1 
                id="game-title"
                className="text-5xl font-bold text-gray-800 mb-4" 
                tabIndex={0}
              >
                Listening Challenge
              </h1>
              <p 
                className="text-xl text-gray-600 mb-8" 
                tabIndex={0}
                aria-describedby="game-description"
                id="game-description"
              >
                Watch videos and fill in the missing words by listening carefully
              </p>
              
              <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto" role="region" aria-labelledby="game-features">
                <h2 id="game-features" className="sr-only">Game features and how to play</h2>
                <div className="grid md:grid-cols-3 gap-6 mb-8" role="group" aria-label="Game features">
                  <div className="text-center" role="group" aria-labelledby="listen-feature">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                      <Volume2 size={32} className="text-green-600" />
                    </div>
                    <h3 
                      id="listen-feature"
                      className="font-semibold text-gray-800" 
                      tabIndex={0}
                    >
                      Listen Carefully
                    </h3>
                    <p className="text-sm text-gray-800" tabIndex={0}>
                      Pay attention to pronunciation
                    </p>
                  </div>
                  <div className="text-center" role="group" aria-labelledby="fill-feature">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                      <BookOpen size={32} className="text-blue-600" />
                    </div>
                    <h3 
                      id="fill-feature"
                      className="font-semibold text-gray-800" 
                      tabIndex={0}
                    >
                      Fill the Blanks
                    </h3>
                    <p className="text-sm text-gray-800" tabIndex={0}>
                      Complete the paragraph
                    </p>
                  </div>
                  <div className="text-center" role="group" aria-labelledby="points-feature">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3" aria-hidden="true">
                      <Trophy size={32} className="text-purple-600" />
                    </div>
                    <h3 
                      id="points-feature"
                      className="font-semibold text-gray-800" 
                      tabIndex={0}
                    >
                      Earn Points
                    </h3>
                    <p className="text-sm text-gray-800" tabIndex={0}>
                      Score based on accuracy
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white" role="region" aria-labelledby="how-to-play">
                  <h3 
                    id="how-to-play"
                    className="text-xl font-bold mb-2" 
                    tabIndex={0}
                  >
                    How to Play
                  </h3>
                  <ul className="text-left space-y-2 text-sm" role="list" aria-label="Game instructions">
                    <li role="listitem" tabIndex={0}>• Choose your challenge level (Basic, Intermediate, Advanced)</li>
                    <li role="listitem" tabIndex={0}>• Basic: No time limit, unlimited video playback, hints and skip available</li>
                    <li role="listitem" tabIndex={0}>• Intermediate: 5-minute time limit, unlimited video playback, hints and skip available</li>
                    <li role="listitem" tabIndex={0}>• Advanced: No time limit, only 2 video plays, no hints, no skip</li>
                    <li role="listitem" tabIndex={0}>• Watch the embedded YouTube video</li>
                    <li role="listitem" tabIndex={0}>• Listen for the missing words in the paragraph</li>
                    <li role="listitem" tabIndex={0}>• Type the words you hear in the blank spaces</li>
                    <li role="listitem" tabIndex={0}>• Use hints if available for your level</li>
                    <li role="listitem" tabIndex={0}>• Submit your answers to check your score</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section role="region" aria-labelledby="game-actions">
              <h2 id="game-actions" className="sr-only">Game action buttons</h2>
              <footer className="flex flex-col sm:flex-row gap-4 justify-center items-center" role="contentinfo">
                <button
                  onClick={handleStartGame}
                  onKeyDown={(e) => handleKeyDown(e, handleStartGame)}
                  className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  tabIndex={0}
                  aria-label="Start the listening challenge game"
                >
                  <Play size={24} aria-hidden="true" />
                  Start Listening Game
                </button>
                
                <button
                  onClick={handleShowInstructions}
                  onKeyDown={(e) => handleKeyDown(e, handleShowInstructions)}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  tabIndex={0}
                  aria-label="View game instructions and how to play"
                >
                  <BookOpen size={20} aria-hidden="true" />
                  Instructions
                </button>
                
                <button
                  onClick={handleShowLeaderboard}
                  onKeyDown={(e) => handleKeyDown(e, handleShowLeaderboard)}
                  className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  tabIndex={0}
                  aria-label="View leaderboard and high scores"
                >
                  <Trophy size={20} aria-hidden="true" />
                  Leaderboard
                </button>
              </footer>
            </section>
          </main>
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