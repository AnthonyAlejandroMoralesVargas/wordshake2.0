import React from 'react';
import { X, Volume2, Play, HelpCircle, SkipBack, Target, Clock } from 'lucide-react';
import { gameInstructions } from '../data/instructions';

interface ListeningInstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListeningInstructionsModal: React.FC<ListeningInstructionsModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 size={32} />
              <div>
                <h2 className="text-2xl font-bold">Listening Challenge Instructions</h2>
                <p className="text-green-100">How to play the listening game</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Overview */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Game Overview</h3>
              <p className="text-green-700">
                Test your listening skills by watching educational videos and filling in the missing words in paragraphs. 
                This game helps improve your English listening comprehension and vocabulary.
              </p>
            </div>

            {/* How to Play */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Play</h3>
              <div className="space-y-3">
                {gameInstructions.listening.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-600 text-sm font-bold">{index + 1}</span>
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
                  <Play size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Play/Pause</p>
                    <p className="text-sm text-gray-600">Control video playback</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <HelpCircle size={20} className="text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-800">Hint</p>
                    <p className="text-sm text-gray-600">Get help with difficult words</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <SkipBack size={20} className="text-green-600" />
                  <div>
                    <p className="font-medium text-gray-800">Skip to Part</p>
                    <p className="text-sm text-gray-600">Jump to specific video section</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Target size={20} className="text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-800">Submit</p>
                    <p className="text-sm text-gray-600">Check your answers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Challenge Levels */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">Challenge Levels</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Basic Level</p>
                    <p className="text-sm text-green-600">No time limit • Unlimited video playback • Hints and skip available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">Intermediate Level</p>
                    <p className="text-sm text-blue-600">5-minute time limit • Unlimited video playback • Hints and skip available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-700">Advanced Level</p>
                    <p className="text-sm text-purple-600">No time limit • Only 2 video plays • No hints • No skip</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Scoring System */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3">Scoring System</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Base Score (Accuracy)</span>
                  <span className="font-semibold text-green-800">0-100 points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Speed Bonus</span>
                  <span className="font-semibold text-green-800">Up to 10 points</span>
                </div>
                <div className="text-xs text-green-600 ml-2">(Only if 50%+ answers correct)</div>
                <div className="flex justify-between items-center">
                  <span className="text-green-700">Hint Penalty</span>
                  <span className="font-semibold text-red-600">-5 points per hint</span>
                </div>
                <div className="text-xs text-red-600 ml-2">(Maximum penalty: -20 points)</div>
                <div className="border-t border-green-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-800">All Wrong Answers</span>
                    <span className="font-bold text-red-600">0 points</span>
                  </div>
                </div>
                <div className="border-t border-green-200 pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-green-800">Perfect Score</span>
                    <span className="font-bold text-green-800 text-lg">100 points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">Pro Tips</h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Listen for context clues in the surrounding words</li>
                <li>• Pay attention to pronunciation patterns</li>
                <li>• Use hints and skip buttons when available (Basic/Intermediate)</li>
                <li>• Manage your time wisely in Intermediate level</li>
                <li>• In Advanced level, use your 2 video plays strategically</li>
                <li>• Don't rush - accuracy is more important than speed</li>
                <li>• Practice with different challenge levels</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Ready to test your listening skills?
            </p>
            <button
              onClick={onClose}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningInstructionsModal; 