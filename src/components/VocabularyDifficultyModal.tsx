import React, { useEffect, useRef } from 'react';
import { X, Star, Target, Zap, BookOpen, Clock, Users, Play, Timer, Lock } from 'lucide-react';

interface VocabularyDifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: string) => void;
}

const VocabularyDifficultyModal: React.FC<VocabularyDifficultyModalProps> = ({
  isOpen,
  onClose,
  onSelectDifficulty
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

  const difficulties = [
    {
      id: 'beginner',
      name: 'Basic',
      description: 'Perfect for learning and building vocabulary confidence',
      icon: <BookOpen size={32} className="text-blue-600" />,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'from-blue-600 to-cyan-700',
      features: [
        '3-minute time limit',
        'Simple word themes',
        '3+ letter words only',
        'Unlimited shuffles',
        'Clear feedback on mistakes'
      ],
      restrictions: 'Basic themes only',
      level: 'Academic 4 - Basic'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Challenge yourself with more complex vocabulary',
      icon: <Timer size={32} className="text-purple-600" />,
      color: 'from-purple-500 to-indigo-600',
      hoverColor: 'from-purple-600 to-indigo-700',
      features: [
        '2.5-minute time limit',
        'Intermediate word themes',
        '4+ letter words preferred',
        'Limited shuffles (5 per game)',
        'Mixed difficulty themes'
      ],
      restrictions: 'Time pressure',
      level: 'Academic 4 - Intermediate'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Maximum challenge with complex vocabulary themes',
      icon: <Lock size={32} className="text-red-600" />,
      color: 'from-red-500 to-pink-600',
      hoverColor: 'from-red-600 to-pink-700',
      features: [
        '2-minute time limit',
        'Advanced word themes',
        '5+ letter words preferred',
        'No shuffles allowed',
        'Maximum challenge level'
      ],
      restrictions: 'Strict time limit, no shuffles',
      level: 'Academic 4 - Advanced'
    }
  ];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vocabulary-modal-title"
      aria-describedby="vocabulary-modal-description"
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl" 
        role="document"
      >
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white" role="banner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star size={32} aria-hidden="true" />
              <div>
                <h2 
                  ref={firstFocusableRef}
                  id="vocabulary-modal-title"
                  className="text-2xl font-bold"
                  tabIndex={0}
                >
                  Choose Your Vocabulary Level
                </h2>
                <p 
                  id="vocabulary-modal-description"
                  className="text-blue-100"
                  tabIndex={0}
                >
                  Select the difficulty that matches your academic level 4 needs
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="text-white hover:text-blue-100 focus:text-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition-colors p-2 rounded"
              tabIndex={0}
              aria-label="Close vocabulary difficulty selection dialog"
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]" role="main">
          <section role="region" aria-label="Vocabulary difficulty level options">
            <h3 className="sr-only">Available vocabulary difficulty levels</h3>
            <div className="grid md:grid-cols-3 gap-6" role="group" aria-label="Choose vocabulary difficulty level">
              {difficulties.map((difficulty) => (
                <div
                  key={difficulty.id}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => onSelectDifficulty(difficulty.id)}
                  onKeyDown={(e) => handleKeyDown(e, () => onSelectDifficulty(difficulty.id))}
                  tabIndex={0}
                  role="option"
                  aria-label={`${difficulty.name} vocabulary difficulty level: ${difficulty.description}`}
                >
                  {/* Header */}
                  <div className="text-center mb-4">
                    <div className="flex justify-center mb-3" aria-hidden="true">
                      {difficulty.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2" tabIndex={0}>
                      {difficulty.name}
                    </h3>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${difficulty.color} text-white`}>
                      {difficulty.level}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 text-center" tabIndex={0}>
                    {difficulty.description}
                  </p>

                  {/* Restrictions */}
                  <div className="bg-red-50 rounded-lg p-3 mb-4">
                    <h4 className="font-semibold text-red-800 text-sm mb-1" tabIndex={0}>
                      Restrictions:
                    </h4>
                    <p className="text-red-700 text-sm" tabIndex={0}>
                      {difficulty.restrictions}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm mb-2" tabIndex={0}>
                      Features:
                    </h4>
                    <ul className="space-y-1" role="list" aria-label={`Features for ${difficulty.name} vocabulary level`}>
                      {difficulty.features.map((feature, index) => (
                        <li 
                          key={index} 
                          className="flex items-center gap-2 text-xs text-gray-600"
                          role="listitem"
                          tabIndex={0}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${difficulty.color}`} aria-hidden="true"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Select Button */}
                  <button
                    className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${difficulty.color} hover:${difficulty.hoverColor} focus:${difficulty.hoverColor} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 hover:scale-105 shadow-md`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDifficulty(difficulty.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelectDifficulty(difficulty.id);
                      }
                    }}
                    tabIndex={0}
                    aria-label={`Select ${difficulty.name} vocabulary difficulty level and start game`}
                  >
                    Select {difficulty.name}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Academic Level Info */}
          <section className="mt-8 bg-blue-50 rounded-lg p-4" role="region" aria-labelledby="academic-info">
            <h4 
              id="academic-info"
              className="font-semibold text-blue-800 mb-2 flex items-center gap-2" 
              tabIndex={0}
            >
              <Users size={20} aria-hidden="true" />
              Academic Level 4 - Vocabulary Challenge:
            </h4>
            <ul className="space-y-1 text-blue-700 text-sm" role="list" aria-label="Vocabulary difficulty level explanations">
              <li role="listitem" tabIndex={0}>
                • <strong>Basic:</strong> Perfect for learning and building confidence
              </li>
              <li role="listitem" tabIndex={0}>
                • <strong>Intermediate:</strong> Practice under realistic time pressure
              </li>
              <li role="listitem" tabIndex={0}>
                • <strong>Advanced:</strong> Maximum challenge with strict limitations
              </li>
            </ul>
            <p className="text-blue-600 text-sm mt-2" tabIndex={0}>
              Choose based on your comfort level and learning goals. You can always change later.
            </p>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 px-6 py-4 border-t" role="contentinfo">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600" tabIndex={0}>
              Select the challenge level that best fits your academic needs
            </p>
            <button
              ref={lastFocusableRef}
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="bg-gray-600 hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-white px-4 py-2 rounded-lg transition-colors"
              tabIndex={0}
              aria-label="Cancel vocabulary difficulty selection and close dialog"
            >
              Cancel
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VocabularyDifficultyModal; 