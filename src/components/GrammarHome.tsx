
import React, { useState } from 'react';
import GrammarDifficultyModal from './GrammarDifficultyModal';
import GrammarLeaderboardModal from './GrammarLeaderboardModal';

interface GrammarHomeProps {
  onBack: () => void;
  onStartGame: (difficulty: string) => void;
}

const GrammarHome: React.FC<GrammarHomeProps> = ({ onBack, onStartGame }) => {
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const handleDifficultySelect = (difficulty: string) => {
    setShowDifficultyModal(false);
    onStartGame(difficulty);
  };

  if (showLeaderboard) {
    return (
      <GrammarLeaderboardModal
        onBack={() => setShowLeaderboard(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            ← Back to Menu
          </button>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grammar Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Improve your English pronunciation and speaking skills with interactive grammar exercises
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Game Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                🎯 How It Works
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Listen & Learn</h3>
                    <p className="text-gray-600">Hear native pronunciation of grammar structures</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Practice Speaking</h3>
                    <p className="text-gray-600">Record yourself repeating the sentences</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Get Feedback</h3>
                    <p className="text-gray-600">Receive instant pronunciation feedback</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-yellow-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Track Progress</h3>
                    <p className="text-gray-600">Monitor your completion times and improvement</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                📚 What You'll Practice
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <span className="text-green-500">🟢</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Beginner</h3>
                    <p className="text-gray-600">Present Simple, Questions, Negatives</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-yellow-500">🟡</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Intermediate</h3>
                    <p className="text-gray-600">Present Continuous, Past Simple, Future</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500">🔴</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Advanced</h3>
                    <p className="text-gray-600">Present Perfect, Conditionals, Passive Voice</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Action Buttons */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Start Practicing
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowDifficultyModal(true)}
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xl font-semibold shadow-lg"
                >
                  🎯 Choose Difficulty
                </button>
                
                <button
                  onClick={() => setShowLeaderboard(true)}
                  className="w-full px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-xl font-semibold shadow-lg"
                >
                  🏆 View Leaderboard
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                💡 Tips for Success
              </h2>
              <ul className="space-y-2 text-gray-700">
                <li>• Find a quiet environment for recording</li>
                <li>• Speak clearly and at a natural pace</li>
                <li>• Practice the sentence before recording</li>
                <li>• Pay attention to intonation and stress</li>
                <li>• Don't worry about mistakes - keep practicing!</li>
                <li>• Use headphones for better audio quality</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">
                🎤 Microphone Required
              </h3>
              <p className="text-blue-700 text-sm">
                This game requires microphone access for speech recognition. 
                Make sure to allow microphone permissions when prompted.
              </p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Text-to-Speech</h3>
            <p className="text-gray-600">Hear native pronunciation of each sentence</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Audio Visualization</h3>
            <p className="text-gray-600">See your voice patterns in real-time</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Get immediate pronunciation assessment</p>
          </div>
        </div>
      </div>

      {/* Difficulty Selection Modal */}
      {showDifficultyModal && (
        <GrammarDifficultyModal
          isOpen={showDifficultyModal}
          onClose={() => setShowDifficultyModal(false)}
          onSelectDifficulty={handleDifficultySelect}
        />
      )}
    </div>
  );
};

export default GrammarHome; 
