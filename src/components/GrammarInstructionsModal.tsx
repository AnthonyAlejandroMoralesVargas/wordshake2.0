import React, { useRef, useEffect } from 'react';

interface GrammarInstructionsModalProps {
  difficulty: string;
  onStart: () => void;
  onBack: () => void;
}

const GrammarInstructionsModal: React.FC<GrammarInstructionsModalProps> = ({
  difficulty,
  onStart,
  onBack
}) => {
  // Hooks SIEMPRE van al inicio, antes de cualquier return
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLHeadingElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap effect
  useEffect(() => {
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
        onBack();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [onBack]);

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };
  const getDifficultyInstructions = () => {
    switch (difficulty) {
      case 'beginner':
        return [
          "🎯 Practice basic English grammar structures",
          "🔊 Listen to each sentence pronunciation",
          "🎤 Record yourself repeating the sentence",
          "✅ Get feedback on your pronunciation",
          "📚 Focus on Present Simple, questions, and negatives",
          "⏱️ Complete all 5 sentences to finish the session"
        ];
      case 'intermediate':
        return [
          "🎯 Practice intermediate English grammar patterns",
          "🔊 Listen to more complex sentence structures",
          "🎤 Record yourself with clear pronunciation",
          "✅ Improve your speaking accuracy",
          "📚 Focus on Present Continuous, Past Simple, and Future",
          "⏱️ Complete all 5 sentences to finish the session"
        ];
      case 'advanced':
        return [
          "🎯 Master advanced English grammar concepts",
          "🔊 Listen to complex grammatical structures",
          "🎤 Record yourself with native-like pronunciation",
          "✅ Perfect your speaking skills",
          "📚 Focus on Present Perfect, Conditionals, and Passive Voice",
          "⏱️ Complete all 5 sentences to finish the session"
        ];
      default:
        return [];
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="grammar-instructions-title"
      aria-describedby="grammar-instructions-description"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        role="document"
      >
        <div className="p-8">
          {/* Header */}
          <header className="text-center mb-8" role="banner">
            <h1 
              ref={firstFocusableRef}
              id="grammar-instructions-title"
              className="text-3xl font-bold text-gray-800 mb-4"
              tabIndex={0}
            >
              Grammar Practice Instructions
            </h1>
            <div 
              id="grammar-instructions-description"
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor()}`}
              tabIndex={0}
              aria-label={`Selected difficulty level: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`}
            >
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
            </div>
          </header>

          {/* Instructions */}
          <main className="space-y-6" role="main">
            <section role="region" aria-labelledby="how-to-play-title">
              <h2 
                id="how-to-play-title"
                className="text-xl font-semibold text-gray-800 mb-4"
                tabIndex={0}
              >
                How to Play:
              </h2>
              <div className="space-y-3" role="list" aria-label="Step by step instructions">
                {getDifficultyInstructions().map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3" role="listitem" tabIndex={0}>
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center" aria-hidden="true">
                      <span className="text-blue-600 text-sm font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Game Flow */}
            <section className="bg-blue-50 rounded-lg p-6" role="region" aria-labelledby="game-flow-title">
              <h3 
                id="game-flow-title"
                className="text-lg font-semibold text-blue-800 mb-3"
                tabIndex={0}
              >
                Game Flow:
              </h3>
              <div className="space-y-2 text-blue-700" role="list" aria-label="Game flow steps">
                <p role="listitem" tabIndex={0}>1. <strong>Listen:</strong> Click the play button to hear the sentence</p>
                <p role="listitem" tabIndex={0}>2. <strong>Practice:</strong> Repeat the sentence to yourself</p>
                <p role="listitem" tabIndex={0}>3. <strong>Record:</strong> Click the microphone to start recording</p>
                <p role="listitem" tabIndex={0}>4. <strong>Speak:</strong> Say the sentence clearly</p>
                <p role="listitem" tabIndex={0}>5. <strong>Stop:</strong> Click stop when finished</p>
                <p role="listitem" tabIndex={0}>6. <strong>Feedback:</strong> Get instant pronunciation feedback</p>
                <p role="listitem" tabIndex={0}>7. <strong>Continue:</strong> Move to the next sentence when correct</p>
              </div>
            </section>

            {/* Tips */}
            <section className="bg-yellow-50 rounded-lg p-6" role="region" aria-labelledby="tips-title">
              <h3 
                id="tips-title"
                className="text-lg font-semibold text-yellow-800 mb-3"
                tabIndex={0}
              >
                Tips for Success:
              </h3>
              <ul className="space-y-2 text-yellow-700" role="list" aria-label="Success tips">
                <li role="listitem" tabIndex={0}>• Speak clearly and at a natural pace</li>
                <li role="listitem" tabIndex={0}>• Pay attention to intonation and stress</li>
                <li role="listitem" tabIndex={0}>• Practice the sentence before recording</li>
                <li role="listitem" tabIndex={0}>• Don't worry about making mistakes - keep trying!</li>
                <li role="listitem" tabIndex={0}>• Use the translation to understand the meaning</li>
              </ul>
            </section>

            {/* Requirements */}
            <section className="bg-gray-50 rounded-lg p-6" role="region" aria-labelledby="requirements-title">
              <h3 
                id="requirements-title"
                className="text-lg font-semibold text-gray-800 mb-3"
                tabIndex={0}
              >
                Requirements:
              </h3>
              <div className="space-y-2 text-gray-700" role="list" aria-label="Technical requirements">
                <p role="listitem" tabIndex={0}>• Microphone access for recording</p>
                <p role="listitem" tabIndex={0}>• Modern browser with speech recognition support</p>
                <p role="listitem" tabIndex={0}>• Quiet environment for better recognition</p>
                <p role="listitem" tabIndex={0}>• Headphones recommended for better audio quality</p>
              </div>
            </section>
          </main>

          {/* Buttons */}
          <footer className="flex gap-4 mt-8" role="contentinfo">
            <button
              onClick={onBack}
              onKeyDown={(e) => handleKeyDown(e, onBack)}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-semibold"
              tabIndex={0}
              aria-label="Go back to grammar difficulty selection"
            >
              Back to Menu
            </button>
            <button
              ref={lastFocusableRef}
              onClick={onStart}
              onKeyDown={(e) => handleKeyDown(e, onStart)}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-semibold"
              tabIndex={0}
              aria-label="Start grammar practice session"
            >
              Start Practice
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default GrammarInstructionsModal; 