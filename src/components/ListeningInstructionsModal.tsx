import React, { useEffect, useRef } from 'react';
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
      aria-labelledby="listening-instructions-title"
      aria-describedby="listening-instructions-description"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        role="document"
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white" role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 size={32} aria-hidden="true" />
              <div>
                <h2 
                  ref={firstFocusableRef}
                  id="listening-instructions-title"
                  className="text-2xl font-bold"
                  tabIndex={0}
                >
                  Listening Challenge Instructions
                </h2>
                <p 
                  id="listening-instructions-description"
                  className="text-green-100"
                  tabIndex={0}
                >
                  How to play the listening game
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="text-white hover:text-green-100 focus:text-green-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-600 transition-colors p-2 rounded"
              tabIndex={0}
              aria-label="Close listening instructions dialog"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]" role="main">
          <div className="space-y-6">
            {/* Overview */}
            <section className="bg-green-50 rounded-lg p-4" role="region" aria-labelledby="overview-title">
              <h3 id="overview-title" className="text-lg font-semibold text-green-800 mb-2" tabIndex={0}>
                Game Overview
              </h3>
              <p className="text-green-700" tabIndex={0}>
                Test your listening skills by watching educational videos and filling in the missing words in paragraphs. 
                This game helps improve your English listening comprehension and vocabulary.
              </p>
            </section>

            {/* How to Play */}
            <section role="region" aria-labelledby="how-to-play-title">
              <h3 id="how-to-play-title" className="text-lg font-semibold text-gray-800 mb-3" tabIndex={0}>
                How to Play
              </h3>
              <div className="space-y-3" role="list" aria-label="Step by step game instructions">
                {gameInstructions.listening.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3" role="listitem" tabIndex={0}>
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                      <span className="text-green-600 text-sm font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Controls */}
            <section role="region" aria-labelledby="controls-title">
              <h3 id="controls-title" className="text-lg font-semibold text-gray-800 mb-3" tabIndex={0}>
                Controls
              </h3>
              <div className="grid md:grid-cols-2 gap-4" role="group" aria-label="Game controls">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="play-control" tabIndex={0}>
                  <Play size={20} className="text-blue-600" aria-hidden="true" />
                  <div>
                    <p id="play-control" className="font-medium text-gray-800">Play/Pause</p>
                    <p className="text-sm text-gray-600">Control video playback</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="hint-control" tabIndex={0}>
                  <HelpCircle size={20} className="text-blue-600" aria-hidden="true" />
                  <div>
                    <p id="hint-control" className="font-medium text-gray-800">Hint</p>
                    <p className="text-sm text-gray-600">Get help with difficult words</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="skip-control" tabIndex={0}>
                  <SkipBack size={20} className="text-green-600" aria-hidden="true" />
                  <div>
                    <p id="skip-control" className="font-medium text-gray-800">Skip to Part</p>
                    <p className="text-sm text-gray-600">Jump to specific video section</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" role="group" aria-labelledby="submit-control" tabIndex={0}>
                  <Target size={20} className="text-purple-600" aria-hidden="true" />
                  <div>
                    <p id="submit-control" className="font-medium text-gray-800">Submit</p>
                    <p className="text-sm text-gray-600">Check your answers</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Challenge Levels */}
            <section className="bg-blue-50 rounded-lg p-4" role="region" aria-labelledby="challenge-levels-title">
              <h3 id="challenge-levels-title" className="text-lg font-semibold text-blue-800 mb-3" tabIndex={0}>
                Challenge Levels
              </h3>
              <div className="space-y-3" role="group" aria-label="Available difficulty levels">
                <div className="flex items-start gap-3" role="group" aria-labelledby="basic-level" tabIndex={0}>
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-green-600 text-sm font-bold">1</span>
                  </div>
                  <div>
                    <p id="basic-level" className="font-semibold text-green-700">Basic Level</p>
                    <p className="text-sm text-green-600">No time limit • Unlimited video playback • Hints and skip available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" role="group" aria-labelledby="intermediate-level" tabIndex={0}>
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-blue-600 text-sm font-bold">2</span>
                  </div>
                  <div>
                    <p id="intermediate-level" className="font-semibold text-blue-700">Intermediate Level</p>
                    <p className="text-sm text-blue-600">5-minute time limit • Unlimited video playback • Hints and skip available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3" role="group" aria-labelledby="advanced-level" tabIndex={0}>
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" aria-hidden="true">
                    <span className="text-purple-600 text-sm font-bold">3</span>
                  </div>
                  <div>
                    <p id="advanced-level" className="font-semibold text-purple-700">Advanced Level</p>
                    <p className="text-sm text-purple-600">No time limit • Only 2 video plays • No hints • No skip</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scoring System */}
            <section className="bg-green-50 rounded-lg p-4" role="region" aria-labelledby="scoring-title">
              <h3 id="scoring-title" className="text-lg font-semibold text-green-800 mb-3" tabIndex={0}>
                Scoring System
              </h3>
              <div className="space-y-2" role="group" aria-label="Scoring breakdown">
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="Base score based on accuracy, 0 to 100 points">
                  <span className="text-green-700">Base Score (Accuracy)</span>
                  <span className="font-semibold text-green-800">0-100 points</span>
                </div>
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="Speed bonus up to 10 points">
                  <span className="text-green-700">Speed Bonus</span>
                  <span className="font-semibold text-green-800">Up to 10 points</span>
                </div>
                <div className="text-xs text-green-600 ml-2" tabIndex={0}>(Only if 50%+ answers correct)</div>
                <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="Hint penalty, minus 5 points per hint used">
                  <span className="text-green-700">Hint Penalty</span>
                  <span className="font-semibold text-red-600">-5 points per hint</span>
                </div>
                <div className="text-xs text-red-600 ml-2" tabIndex={0}>(Maximum penalty: -20 points)</div>
                <div className="border-t border-green-200 pt-2 mt-2">
                  <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="All wrong answers result in 0 points">
                    <span className="font-semibold text-green-800">All Wrong Answers</span>
                    <span className="font-bold text-red-600">0 points</span>
                  </div>
                </div>
                <div className="border-t border-green-200 pt-2 mt-2">
                  <div className="flex justify-between items-center" tabIndex={0} role="group" aria-label="Perfect score is 100 points">
                    <span className="font-semibold text-green-800">Perfect Score</span>
                    <span className="font-bold text-green-800 text-lg">100 points</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-yellow-50 rounded-lg p-4" role="region" aria-labelledby="tips-title">
              <h3 id="tips-title" className="text-lg font-semibold text-yellow-800 mb-3" tabIndex={0}>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-yellow-700" role="list" aria-label="Tips for better gameplay">
                <li role="listitem" tabIndex={0}>• Listen for context clues in the surrounding words</li>
                <li role="listitem" tabIndex={0}>• Pay attention to pronunciation patterns</li>
                <li role="listitem" tabIndex={0}>• Use hints and skip buttons when available (Basic/Intermediate)</li>
                <li role="listitem" tabIndex={0}>• Manage your time wisely in Intermediate level</li>
                <li role="listitem" tabIndex={0}>• In Advanced level, use your 2 video plays strategically</li>
                <li role="listitem" tabIndex={0}>• Don't rush - accuracy is more important than speed</li>
                <li role="listitem" tabIndex={0}>• Practice with different challenge levels</li>
              </ul>
            </section>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 px-6 py-4 border-t" role="contentinfo">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600" tabIndex={0}>
              Ready to test your listening skills?
            </p>
            <button
              ref={lastFocusableRef}
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="bg-green-600 hover:bg-green-700 focus:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              tabIndex={0}
              aria-label="Close listening instructions and return to game"
            >
              Got it!
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ListeningInstructionsModal; 