import React, { useEffect, useRef } from 'react';
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
  // Hooks SIEMPRE van al inicio, antes de cualquier return
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLHeadingElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap effect
  useEffect(() => {
    if (isOpen) {
      // Focus the first element when modal opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);

      // Handle Tab key to trap focus
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey) {
              // Shift + Tab (going backwards)
              if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
              }
            } else {
              // Tab (going forwards)
              if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
              }
            }
          }
        }
        
        // Close modal with Escape key
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen, onClose]);

  // Early return DESPUÉS de todos los hooks
  if (!isOpen) return null;

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-title"
      aria-describedby="instructions-description"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white" role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book size={32} aria-hidden="true" />
              <div>
                <h1 
                  ref={firstFocusableRef}
                  id="instructions-title" 
                  className="text-2xl font-bold"
                  tabIndex={0}
                >
                  Vocabulary Game Instructions
                </h1>
                <p 
                  id="instructions-description" 
                  className="text-blue-100"
                  tabIndex={0}
                >
                  How to play the word-building game
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="text-white hover:text-blue-100 focus:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors p-2 rounded"
              tabIndex={0}
              aria-label="Close vocabulary instructions dialog"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]" role="main">
          <div className="space-y-6">
            {/* Overview */}
            <section className="bg-blue-50 rounded-lg p-4" role="region" aria-labelledby="overview-title">
              <h2 id="overview-title" className="text-lg font-semibold text-black mb-2" tabIndex={0}>
                Game Overview
              </h2>
              <p className="text-black" tabIndex={0}>
                Build words from a 4x4 letter grid based on different themes. Choose your difficulty level 
                and find as many words as possible before time runs out. Earn stars based on word length.
              </p>
            </section>

            {/* Difficulty Levels */}
            <section className="bg-purple-50 rounded-lg p-4" role="region" aria-labelledby="difficulty-title">
              <h2 id="difficulty-title" className="text-lg font-semibold text-black mb-3" tabIndex={0}>
                Difficulty Levels
              </h2>
              <div className="space-y-3" role="group" aria-label="Difficulty level descriptions">
                <div className="flex items-start gap-3" role="group" aria-labelledby="basic-level">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-green-600 text-sm font-bold">B</span>
                  </div>
                  <div>
                    <h3 id="basic-level" className="font-semibold text-black" tabIndex={0}>Basic</h3>
                    <p className="text-sm text-black" tabIndex={0}>3-minute time limit, simple themes, unlimited shuffles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" role="group" aria-labelledby="intermediate-level">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-blue-600 text-sm font-bold">I</span>
                  </div>
                  <div>
                    <h3 id="intermediate-level" className="font-semibold text-black" tabIndex={0}>Intermediate</h3>
                    <p className="text-sm text-black" tabIndex={0}>2.5-minute time limit, mixed themes, 5 shuffles maximum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" role="group" aria-labelledby="advanced-level">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-red-600 text-sm font-bold">A</span>
                  </div>
                  <div>
                    <h3 id="advanced-level" className="font-semibold text-black" tabIndex={0}>Advanced</h3>
                    <p className="text-sm text-black" tabIndex={0}>2-minute time limit, complex themes, no shuffles allowed</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Play */}
            <section role="region" aria-labelledby="how-to-play-title">
              <h2 id="how-to-play-title" className="text-lg font-semibold text-black mb-3" tabIndex={0}>
                How to Play
              </h2>
              <ol className="space-y-3" role="list" aria-label="Game instructions">
                {gameInstructions.vocabulary.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3" role="listitem" tabIndex={0}>
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <span className="text-blue-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-black">{instruction}</p>
                  </li>
                ))}
              </ol>
            </section>

            {/* Controls */}
            <section role="region" aria-labelledby="controls-title">
              <h2 id="controls-title" className="text-lg font-semibold text-black mb-3" tabIndex={0}>
                Controls
              </h2>
              <div className="grid md:grid-cols-2 gap-4" role="group" aria-label="Game controls">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="validate-control" tabIndex={0}>
                  <Check size={20} className="text-green-600" aria-hidden="true" />
                  <div>
                    <p id="validate-control" className="font-medium text-black">Validate</p>
                    <p className="text-sm text-black">Check if word is correct</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="shuffle-control" tabIndex={0}>
                  <Shuffle size={20} className="text-blue-600" aria-hidden="true" />
                  <div>
                    <p id="shuffle-control" className="font-medium text-black">Shuffle</p>
                    <p className="text-sm text-black">Rearrange letters</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="clear-control" tabIndex={0}>
                  <RotateCcw size={20} className="text-red-600" aria-hidden="true" />
                  <div>
                    <p id="clear-control" className="font-medium text-black">Clear</p>
                    <p className="text-sm text-black">Start over</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="timer-control" tabIndex={0}>
                  <Clock size={20} className="text-orange-600" aria-hidden="true" />
                  <div>
                    <p id="timer-control" className="font-medium text-black">Timer</p>
                    <p className="text-sm text-black">3 minutes limit</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scoring System */}
            <section className="bg-purple-50 rounded-lg p-4" role="region" aria-labelledby="scoring-title">
              <h2 id="scoring-title" className="text-lg font-semibold text-black mb-3" tabIndex={0}>
                Scoring System
              </h2>
              <div className="space-y-2" role="group" aria-label="Point values for word lengths">
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="3 letter words earn 1 star">
                  <span className="text-black">3 letters</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-current" aria-hidden="true" />
                    <span className="font-semibold text-purple-800">1 star</span>
                  </div>
                </div>
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="4 letter words earn 2 stars">
                  <span className="text-black">4 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">2 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="5 letter words earn 3 stars">
                  <span className="text-black">5 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">3 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="6 letter words earn 4 stars">
                  <span className="text-black">6 letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">4 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="7 or more letter words earn 5 stars">
                  <span className="text-black">7+ letters</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="text-yellow-500 fill-current" aria-hidden="true" />)}
                    <span className="font-semibold text-purple-800">5 stars</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Themes */}
            <section className="bg-green-50 rounded-lg p-4" role="region" aria-labelledby="themes-title">
              <h2 id="themes-title" className="text-lg font-semibold text-green-800 mb-3" tabIndex={0}>
                Available Themes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3" role="group" aria-label="Game themes by difficulty">
                <div className="bg-orange-100 rounded-lg p-3 text-center" role="group" aria-labelledby="basic-themes" tabIndex={0}>
                  <h3 id="basic-themes" className="font-semibold text-orange-800">Basic Themes</h3>
                  <p className="text-sm text-black">Fruits, Animals, Colors</p>
                </div>
                <div className="bg-blue-100 rounded-lg p-3 text-center" role="group" aria-labelledby="intermediate-themes" tabIndex={0}>
                  <h3 id="intermediate-themes" className="font-semibold text-blue-800">Intermediate Themes</h3>
                  <p className="text-sm text-black">Transport, Food, Jobs</p>
                </div>
                <div className="bg-purple-100 rounded-lg p-3 text-center" role="group" aria-labelledby="advanced-themes" tabIndex={0}>
                  <h3 id="advanced-themes" className="font-semibold text-purple-800">Advanced Themes</h3>
                  <p className="text-sm text-black">Technology, Science, Business</p>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-yellow-50 rounded-lg p-4" role="region" aria-labelledby="tips-title">
              <h2 id="tips-title" className="text-lg font-semibold text-yellow-800 mb-3" tabIndex={0}>
                Pro Tips
              </h2>
              <ul className="space-y-2 text-black" role="list" aria-label="Tips for better gameplay">
                <li role="listitem" tabIndex={0}>• Look for common word patterns and prefixes/suffixes</li>
                <li role="listitem" tabIndex={0}>• Use the shuffle button when you're stuck</li>
                <li role="listitem" tabIndex={0}>• Focus on longer words for higher scores</li>
                <li role="listitem" tabIndex={0}>• Remember all words must relate to the theme</li>
                <li role="listitem" tabIndex={0}>• Don't forget to validate your words!</li>
              </ul>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 px-6 py-4 border-t" role="contentinfo">
          <div className="flex justify-between items-center">
            <p className="text-sm text-black" tabIndex={0}>
              Ready to build some words?
            </p>
            <button
              ref={lastFocusableRef}
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              tabIndex={0}
              aria-label="Close vocabulary instructions and return to game"
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