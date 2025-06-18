import React from 'react';
import { X } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">How to Play Wordshake</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Objective</h3>
              <p className="text-gray-600">
                Find as many words as possible from the letter grid within the time limit. 
                Each game focuses on a specific theme to help you learn themed vocabulary.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">How to Play</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>Click on letters in the grid to form words</li>
                <li>Letters will appear in the word display area</li>
                <li>Click "Validate" to check if your word is valid</li>
                <li>Valid words are added to your found words list</li>
                <li>Use "Clear" to start over with a new word</li>
                <li>Use "Shuffle" to rearrange the letters</li>
                <li>Try to find as many words as possible before time runs out!</li>
              </ol>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Scoring</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-5 gap-4 text-center text-sm">
                  <div>
                    <div className="text-yellow-500 text-2xl mb-1">★</div>
                    <div className="font-semibold">3 letters</div>
                  </div>
                  <div>
                    <div className="text-yellow-500 text-2xl mb-1">★★</div>
                    <div className="font-semibold">4 letters</div>
                  </div>
                  <div>
                    <div className="text-yellow-500 text-2xl mb-1">★★★</div>
                    <div className="font-semibold">5 letters</div>
                  </div>
                  <div>
                    <div className="text-yellow-500 text-2xl mb-1">★★★★</div>
                    <div className="font-semibold">6 letters</div>
                  </div>
                  <div>
                    <div className="text-yellow-500 text-2xl mb-1">★★★★★</div>
                    <div className="font-semibold">7+ letters</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Tips</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Look for common word patterns and endings</li>
                <li>Try both short and long words for maximum points</li>
                <li>Use the shuffle button if you're stuck</li>
                <li>Focus on the theme - words must be related to the current topic</li>
                <li>Don't forget about plural forms and verb tenses</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Got It!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;