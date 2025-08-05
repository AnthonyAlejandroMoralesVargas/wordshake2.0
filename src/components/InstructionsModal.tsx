import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
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
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="instructions-title"
        aria-describedby="instructions-description"
      >
        {/* Header */}
        <header className="p-6 pb-4 border-b border-gray-200" role="banner">
          <div className="flex justify-between items-center">
            <h2 
              id="instructions-title"
              ref={firstFocusableRef}
              className="text-3xl font-bold text-gray-800" 
              tabIndex={0}
              aria-label="Wordshake game instructions"
            >
              How to Play Wordshake
            </h2>
            <button
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="p-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
              tabIndex={0}
              aria-label="Close instructions modal"
            >
              <X size={24} className="text-gray-600" aria-hidden="true" />
            </button>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="p-6" role="main" id="instructions-description">
          <div className="space-y-6">
            {/* Objective Section */}
            <section role="region" aria-labelledby="objective-title">
              <h3 id="objective-title" className="text-xl font-semibold text-gray-800 mb-3" tabIndex={0}>
                Objective
              </h3>
              <p className="text-gray-600" tabIndex={0}>
                Find as many words as possible from the letter grid within the time limit. 
                Each game focuses on a specific theme to help you learn themed vocabulary.
              </p>
            </section>
            
            {/* How to Play Section */}
            <section role="region" aria-labelledby="howto-title">
              <h3 id="howto-title" className="text-xl font-semibold text-gray-800 mb-3" tabIndex={0}>
                How to Play
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600" role="list">
                <li tabIndex={0} role="listitem">Click on letters in the grid to form words</li>
                <li tabIndex={0} role="listitem">Letters will appear in the word display area</li>
                <li tabIndex={0} role="listitem">Click "Validate" to check if your word is valid</li>
                <li tabIndex={0} role="listitem">Valid words are added to your found words list</li>
                <li tabIndex={0} role="listitem">Use "Clear" to start over with a new word</li>
                <li tabIndex={0} role="listitem">Use "Shuffle" to rearrange the letters</li>
                <li tabIndex={0} role="listitem">Try to find as many words as possible before time runs out!</li>
              </ol>
            </section>
            
            {/* Scoring Section */}
            <section role="region" aria-labelledby="scoring-title">
              <h3 id="scoring-title" className="text-xl font-semibold text-gray-800 mb-3" tabIndex={0}>
                Scoring
              </h3>
              <div className="bg-gray-50 rounded-lg p-4" role="group" aria-label="Scoring system based on word length">
                <div className="grid grid-cols-5 gap-4 text-center text-sm">
                  <div tabIndex={0} role="group" aria-label="3 letter words earn 1 star">
                    <div className="text-yellow-500 text-2xl mb-1" aria-hidden="true">★</div>
                    <div className="font-semibold">3 letters</div>
                  </div>
                  <div tabIndex={0} role="group" aria-label="4 letter words earn 2 stars">
                    <div className="text-yellow-500 text-2xl mb-1" aria-hidden="true">★★</div>
                    <div className="font-semibold">4 letters</div>
                  </div>
                  <div tabIndex={0} role="group" aria-label="5 letter words earn 3 stars">
                    <div className="text-yellow-500 text-2xl mb-1" aria-hidden="true">★★★</div>
                    <div className="font-semibold">5 letters</div>
                  </div>
                  <div tabIndex={0} role="group" aria-label="6 letter words earn 4 stars">
                    <div className="text-yellow-500 text-2xl mb-1" aria-hidden="true">★★★★</div>
                    <div className="font-semibold">6 letters</div>
                  </div>
                  <div tabIndex={0} role="group" aria-label="7 or more letter words earn 5 stars">
                    <div className="text-yellow-500 text-2xl mb-1" aria-hidden="true">★★★★★</div>
                    <div className="font-semibold">7+ letters</div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Tips Section */}
            <section role="region" aria-labelledby="tips-title">
              <h3 id="tips-title" className="text-xl font-semibold text-gray-800 mb-3" tabIndex={0}>
                Tips
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600" role="list">
                <li tabIndex={0} role="listitem">Look for common word patterns and endings</li>
                <li tabIndex={0} role="listitem">Try both short and long words for maximum points</li>
                <li tabIndex={0} role="listitem">Use the shuffle button if you're stuck</li>
                <li tabIndex={0} role="listitem">Focus on the theme - words must be related to the current topic</li>
                <li tabIndex={0} role="listitem">Don't forget about plural forms and verb tenses</li>
              </ul>
            </section>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="p-6 pt-4 border-t border-gray-200 text-center" role="contentinfo">
          <button
            ref={lastFocusableRef}
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            tabIndex={0}
            aria-label="Close instructions and return to game"
          >
            Got It!
          </button>
        </footer>
      </div>
    </div>
  );
};

export default InstructionsModal;