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
      {/* Skip Link para navegación por teclado */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:no-underline"
        tabIndex={0}
      >
        Skip to main content
      </a>
      
      <div className="max-w-4xl mx-auto">
        {/* Header con semántica correcta */}
        <header className="text-center mb-12">
          <button
            onClick={onBack}
            tabIndex={0}
            className="absolute top-4 left-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:bg-gray-600 transition-colors"
            aria-label="Regresar al menú principal"
          >
            ← Back to Menu
          </button>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Grammar Practice
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Improve your English pronunciation and speaking skills with interactive grammar exercises
          </p>
        </header>

        {/* Main Content con estructura semántica */}
        <main id="main-content" className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Game Info */}
          <section className="space-y-6" aria-labelledby="game-info-heading">
            <h2 id="game-info-heading" className="sr-only">Información del Juego</h2>
            
            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <span aria-hidden="true">🎯</span> How It Works
              </h2>
              <ol className="space-y-4" role="list">
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-blue-600 font-semibold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Listen & Learn</h3>
                    <p className="text-gray-600">Hear native pronunciation of grammar structures</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-green-600 font-semibold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Practice Speaking</h3>
                    <p className="text-gray-600">Record yourself repeating the sentences</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-purple-600 font-semibold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Get Feedback</h3>
                    <p className="text-gray-600">Receive instant pronunciation feedback</p>
                  </div>
                </li>
                
                <li className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center" aria-hidden="true">
                    <span className="text-yellow-600 font-semibold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Track Progress</h3>
                    <p className="text-gray-600">Monitor your completion times and improvement</p>
                  </div>
                </li>
              </ol>
            </article>

            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <span aria-hidden="true">📚</span> What You'll Practice
              </h2>
              <ul className="space-y-3" role="list">
                <li className="flex items-center space-x-3">
                  <span className="text-green-500" aria-hidden="true" role="img" aria-label="Nivel principiante">🟢</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Beginner</h3>
                    <p className="text-gray-600">Present Simple, Questions, Negatives</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-yellow-500" aria-hidden="true" role="img" aria-label="Nivel intermedio">🟡</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Intermediate</h3>
                    <p className="text-gray-600">Present Continuous, Past Simple, Future</p>
                  </div>
                </li>
                <li className="flex items-center space-x-3">
                  <span className="text-red-500" aria-hidden="true" role="img" aria-label="Nivel avanzado">🔴</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">Advanced</h3>
                    <p className="text-gray-600">Present Perfect, Conditionals, Passive Voice</p>
                  </div>
                </li>
              </ul>
            </article>
          </section>

          {/* Right Column - Action Buttons */}
          <section className="space-y-6" aria-labelledby="actions-heading">
            <h2 id="actions-heading" className="sr-only">Acciones del Juego</h2>
            
            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Start Practicing
              </h2>
              
              <div className="space-y-4">
                <button
                  onClick={() => setShowDifficultyModal(true)}
                  tabIndex={0}
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:bg-blue-700 transition-colors text-xl font-semibold shadow-lg"
                  aria-label="Elegir nivel de dificultad para comenzar la práctica de gramática"
                  aria-describedby="difficulty-description"
                >
                  <span aria-hidden="true">🎯</span> Choose Difficulty
                </button>
                <div id="difficulty-description" className="sr-only">
                  Selecciona entre tres niveles: principiante, intermedio o avanzado
                </div>
                
                <button
                  onClick={() => setShowLeaderboard(true)}
                  tabIndex={0}
                  className="w-full px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 focus:bg-purple-700 transition-colors text-xl font-semibold shadow-lg"
                  aria-label="Ver tabla de clasificaciones y puntuaciones"
                >
                  <span aria-hidden="true">🏆</span> View Leaderboard
                </button>
              </div>
            </article>

            <article className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                <span aria-hidden="true">💡</span> Tips for Success
              </h2>
              <ul className="space-y-2 text-gray-700" role="list">
                <li>• Find a quiet environment for recording</li>
                <li>• Speak clearly and at a natural pace</li>
                <li>• Practice the sentence before recording</li>
                <li>• Pay attention to intonation and stress</li>
                <li>• Don't worry about mistakes - keep practicing!</li>
                <li>• Use headphones for better audio quality</li>
              </ul>
            </article>

            <div className="bg-blue-50 rounded-lg p-6" role="region" aria-labelledby="microphone-requirements">
              <h3 id="microphone-requirements" className="text-lg font-semibold text-blue-800 mb-2">
                <span aria-hidden="true">🎤</span> Microphone Required
              </h3>
              <p className="text-blue-700 text-sm">
                This game requires microphone access for speech recognition. 
                Make sure to allow microphone permissions when prompted.
              </p>
            </div>
          </section>
        </main>

        {/* Features Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" aria-labelledby="features-heading">
          <h2 id="features-heading" className="sr-only">Características Principales</h2>
          
          <article className="bg-white rounded-lg shadow-md p-6 text-center" tabIndex={0}>
            <div className="text-4xl mb-4" aria-hidden="true">🎵</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Text-to-Speech</h3>
            <p className="text-gray-600">Hear native pronunciation of each sentence</p>
          </article>
          
          <article className="bg-white rounded-lg shadow-md p-6 text-center" tabIndex={0}>
            <div className="text-4xl mb-4" aria-hidden="true">📊</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Audio Visualization</h3>
            <p className="text-gray-600">See your voice patterns in real-time</p>
          </article>
          
          <article className="bg-white rounded-lg shadow-md p-6 text-center" tabIndex={0}>
            <div className="text-4xl mb-4" aria-hidden="true">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Get immediate pronunciation assessment</p>
          </article>
        </section>
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