import React from 'react';
import { X, Book, Star, Clock, Shuffle, Check, RotateCcw } from 'lucide-react';
import { gameInstructions } from '../data/instructions';

interface VocabularyInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VocabularyInstructionsModal: React.FC<VocabularyInstructionsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-title"
      aria-describedby="instructions-description"
    >
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book size={32} aria-hidden="true" />
              <div>
                <h1 id="instructions-title" className="text-2xl font-bold">Vocabulary Game Instructions</h1>
                <p id="instructions-description" className="text-blue-100">How to play the word-building game</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 rounded"
              aria-label="Close instructions modal"
              type="button"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Overview */}
            <section className="bg-blue-50 rounded-lg p-4" aria-labelledby="overview-title">
              <h2 id="overview-title" className="text-lg font-semibold text-black mb-2">Game Overview</h2>
              <p className="text-black">
                Build words from a 4x4 letter grid based on different themes. Choose your difficulty level 
                and find as many words as possible before time runs out. Earn stars based on word length.
              </p>
            </section>

            {/* Difficulty Levels */}
            <section className="bg-purple-50 rounded-lg p-4" aria-labelledby="difficulty-title">
              <h2 id="difficulty-title" className="text-lg font-semibold text-black mb-3">Difficulty Levels</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-green-600 text-sm font-bold">B</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Basic</h3>
                    <p className="text-sm text-black">3-minute time limit, simple themes, unlimited shuffles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-blue-600 text-sm font-bold">I</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Intermediate</h3>
                    <p className="text-sm text-black">2.5-minute time limit, mixed themes, 5 shuffles maximum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-red-600 text-sm font-bold">A</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">Advanced</h3>
                    <p className="text-sm text-black">2-minute time limit, complex themes, no shuffles allowed</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Play */}
            <section aria-labelledby="how-to-play-title">
              <h2 id="how-to-play-title" className="text-lg font-semibold text-black mb-3">How to Play</h2>
              <ol className="space-y-3" role="list">
                {gameInstructions.vocabulary.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-black">{instruction}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Controls */}
            <section aria-labelledby="controls-title">
              <h2 id="controls-title" className="text-lg font-semibold text-black mb-3">Controls</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Check size={20} className="text-green-600" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-black">Validate</p>
                    <p className="text-sm text-black">Check if word is correct</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shuffle size={20} className="text-blue-600" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-black">Shuffle</p>
                    <p className="text-sm text-black">Rearrange letters</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <RotateCcw size={20} className="text-red-600" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-black">Clear</p>
                    <p className="text-sm text-black">Start over</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock size={20} className="text-orange-600" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-black">Timer</p>
                    <p className="text-sm text-black">3 minutes limit</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scoring System */}
            <section className="bg-purple-50 rounded-lg p-4" aria-labelledby="scoring-title">
              <h2 id="scoring-title" className="text-lg font-semibold text-black mb-3">Scoring System</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-black">3 letters</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" aria-hidden="true" />
                    <span className="font-semibold text-purple-800">1 star</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black">4 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">2 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black">5 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">3 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black">6 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">4 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-black">7+ letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">5 stars</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Themes */}
            <section className="bg-green-50 rounded-lg p-4" aria-labelledby="themes-title">
              <h2 id="themes-title" className="text-lg font-semibold text-green-800 mb-3">Available Themes</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-orange-100 rounded-lg p-3 text-center">
                  <h3 className="font-semibold text-orange-800">Basic Themes</h3>
                  <p className="text-sm text-black">Fruits, Animals, Colors</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 text-center">
                  <h3 className="font-semibold text-blue-800">Intermediate Themes</h3>
                  <p className="text-sm text-black">Transport, Food, Jobs</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center">
                  <h3 className="font-semibold text-purple-800">Advanced Themes</h3>
                  <p className="text-sm text-black">Technology, Science, Business</p>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-yellow-50 rounded-lg p-4" aria-labelledby="tips-title">
              <h2 id="tips-title" className="text-lg font-semibold text-yellow-800 mb-3">Pro Tips</h2>
              <ul className="space-y-2 text-black" role="list">
                <li>• Look for common word patterns and prefixes/suffixes</li>
                <li>• Use the shuffle button when you're stuck</li>
                <li>• Focus on longer words for higher scores</li>
                <li>• Remember all words must relate to the theme</li>
                <li>• Don't forget to validate your words!</li>
              </ul>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-black">
              Ready to build some words?
            </p>
            <button
              onClick={onClose}
              className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Close instructions and return to game"
            >
              Got it!
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VocabularyInstructionsModal; 