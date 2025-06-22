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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book size={32} />
              <div>
                <h2 className="text-2xl font-bold">Vocabulary Game Instructions</h2>
                <p className="text-blue-100">How to play the word-building game</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Game Overview</h3>
              <p className="text-blue-700">
                Build words from a 4x4 letter grid based on different themes. Choose your difficulty level 
                and find as many words as possible before time runs out. Earn stars based on word length.
              </p>
            </div>

            {/* Difficulty Levels */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Difficulty Levels</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">B</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800">Basic</h4>
                    <p className="text-sm text-purple-700">3-minute time limit, simple themes, unlimited shuffles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">I</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800">Intermediate</h4>
                    <p className="text-sm text-purple-700">2.5-minute time limit, mixed themes, 5 shuffles maximum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-600 text-sm font-bold">A</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-purple-800">Advanced</h4>
                    <p className="text-sm text-purple-700">2-minute time limit, complex themes, no shuffles allowed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Play */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Play</h3>
              <div className="space-y-3">
                {gameInstructions.vocabulary.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Controls</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Check size={20} className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Validate</p>
                    <p className="text-sm text-gray-600">Check if word is correct</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Shuffle size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Shuffle</p>
                    <p className="text-sm text-gray-600">Rearrange letters</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <RotateCcw size={20} className="text-red-600" />
                  <div>
                    <p className="font-medium text-gray-800">Clear</p>
                    <p className="text-sm text-gray-600">Start over</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Clock size={20} className="text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-800">Timer</p>
                    <p className="text-sm text-gray-600">3 minutes limit</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scoring System */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">Scoring System</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">3 letters</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" />
                    <span className="font-semibold text-purple-800">1 star</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">4 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" />)}
                    <span className="font-semibold text-purple-800">2 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">5 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" />)}
                    <span className="font-semibold text-purple-800">3 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">6 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" />)}
                    <span className="font-semibold text-purple-800">4 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-700">7+ letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" />)}
                    <span className="font-semibold text-purple-800">5 stars</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Themes */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Available Themes</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-orange-100 rounded-lg p-3 text-center">
                  <h4 className="font-semibold text-orange-800">Basic Themes</h4>
                  <p className="text-sm text-orange-700">Fruits, Animals, Colors</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 text-center">
                  <h4 className="font-semibold text-blue-800">Intermediate Themes</h4>
                  <p className="text-sm text-blue-700">Transport, Food, Jobs</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center">
                  <h4 className="font-semibold text-purple-800">Advanced Themes</h4>
                  <p className="text-sm text-purple-700">Technology, Science, Business</p>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Look for common word patterns and prefixes/suffixes</li>
                <li>• Use the shuffle button when you're stuck</li>
                <li>• Focus on longer words for higher scores</li>
                <li>• Remember all words must relate to the theme</li>
                <li>• Don't forget to validate your words!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Ready to build some words?
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyInstructionsModal; 