import React, { useEffect } from 'react';
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
  // Manejo de escape y focus para accesibilidad
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
      
      // Enfocar el modal cuando se abre
      const modal = document.getElementById('vocabulary-instructions-modal');
      if (modal) {
        modal.focus();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="instructions-modal-title"
      aria-describedby="instructions-modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        id="vocabulary-instructions-modal"
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header con mejor contraste y estructura semántica */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Book size={32} aria-hidden="true" className="text-blue-100" />
              <div>
                <h1 id="instructions-modal-title" className="text-2xl font-bold text-white">
                  Vocabulary Game Instructions
                </h1>
                <p id="instructions-modal-description" className="text-blue-100 font-medium">
                  Complete guide to play the word-building game
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Cerrar ventana de instrucciones"
              tabIndex={0}
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Content con mejor estructura semántica y contraste */}
        <main className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]" role="main">
          <div className="space-y-6">
            {/* Overview con mejor contraste */}
            <section className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4" aria-labelledby="game-overview-title">
              <h2 id="game-overview-title" className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">1</span>
                Game Overview
              </h2>
              <p className="text-blue-800 font-medium leading-relaxed">
                Build words from a 4x4 letter grid based on different themes. Choose your difficulty level 
                and find as many words as possible before time runs out. Earn stars based on word length.
              </p>
            </section>

            {/* Difficulty Levels con mejor contraste y estructura */}
            <section className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4" aria-labelledby="difficulty-levels-title">
              <h2 id="difficulty-levels-title" className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="bg-purple-200 text-purple-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">2</span>
                Difficulty Levels
              </h2>
              <div className="space-y-3" role="list" aria-label="Niveles de dificultad disponibles">
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-green-200 rounded-lg" role="listitem">
                  <div className="w-8 h-8 bg-green-200 border-2 border-green-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-green-800 text-sm font-bold" aria-label="Básico">B</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-green-800 text-lg">Basic</h3>
                    <p className="text-green-700 font-medium">3-minute time limit, simple themes, unlimited shuffles</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-blue-200 rounded-lg" role="listitem">
                  <div className="w-8 h-8 bg-blue-200 border-2 border-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-800 text-sm font-bold" aria-label="Intermedio">I</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-800 text-lg">Intermediate</h3>
                    <p className="text-blue-700 font-medium">2.5-minute time limit, mixed themes, 5 shuffles maximum</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white border-2 border-red-200 rounded-lg" role="listitem">
                  <div className="w-8 h-8 bg-red-200 border-2 border-red-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-800 text-sm font-bold" aria-label="Avanzado">A</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-800 text-lg">Advanced</h3>
                    <p className="text-red-700 font-medium">2-minute time limit, complex themes, no shuffles allowed</p>
                  </div>
                </div>
              </div>
            </section>

            {/* How to Play con mejor estructura y contraste */}
            <section aria-labelledby="how-to-play-title">
              <h2 id="how-to-play-title" className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-gray-200 text-gray-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">3</span>
                How to Play
              </h2>
              <div className="space-y-3" role="list" aria-label="Pasos para jugar">
                {gameInstructions.vocabulary.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 border-2 border-gray-200 rounded-lg" role="listitem">
                    <div className="w-8 h-8 bg-blue-200 border-2 border-blue-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-800 text-sm font-bold" aria-label={`Paso ${index + 1}`}>{index + 1}</span>
                    </div>
                    <p className="text-gray-800 font-medium leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Controls con mejor contraste y accesibilidad */}
            <section aria-labelledby="controls-title">
              <h2 id="controls-title" className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="bg-gray-200 text-gray-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">4</span>
                Game Controls
              </h2>
              <div className="grid md:grid-cols-2 gap-4" role="list" aria-label="Controles del juego">
                <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-lg" role="listitem">
                  <Check size={24} className="text-green-700" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-green-800 text-lg">Validate</h3>
                    <p className="text-green-700 font-medium">Check if your word is correct and relates to the theme</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg" role="listitem">
                  <Shuffle size={24} className="text-blue-700" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-blue-800 text-lg">Shuffle</h3>
                    <p className="text-blue-700 font-medium">Rearrange letters to find new word combinations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-red-50 border-2 border-red-200 rounded-lg" role="listitem">
                  <RotateCcw size={24} className="text-red-700" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-red-800 text-lg">Clear</h3>
                    <p className="text-red-700 font-medium">Clear current selection and start over</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg" role="listitem">
                  <Clock size={24} className="text-orange-700" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-orange-800 text-lg">Timer</h3>
                    <p className="text-orange-700 font-medium">Track remaining time for your challenge</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Scoring System con mejor contraste y estructura visual */}
            <section className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4" aria-labelledby="scoring-system-title">
              <h2 id="scoring-system-title" className="text-lg font-bold text-purple-900 mb-3 flex items-center gap-2">
                <span className="bg-purple-200 text-purple-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">5</span>
                Scoring System
              </h2>
              <div className="space-y-3" role="list" aria-label="Sistema de puntuación por longitud de palabra">
                <div className="flex justify-between items-center p-3 bg-white border-2 border-yellow-200 rounded-lg" role="listitem">
                  <span className="text-purple-800 font-bold text-lg">3 letters</span>
                  <div className="flex items-center gap-2" aria-label="1 estrella">
                    <Star size={20} className="text-yellow-600 fill-current" aria-hidden="true" />
                    <span className="font-bold text-purple-900 text-lg">1 star</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white border-2 border-yellow-200 rounded-lg" role="listitem">
                  <span className="text-purple-800 font-bold text-lg">4 letters</span>
                  <div className="flex items-center gap-2" aria-label="2 estrellas">
                    {[1, 2].map(i => <Star key={i} size={20} className="text-yellow-600 fill-current" aria-hidden="true" />)}
                    <span className="font-bold text-purple-900 text-lg">2 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white border-2 border-yellow-200 rounded-lg" role="listitem">
                  <span className="text-purple-800 font-bold text-lg">5 letters</span>
                  <div className="flex items-center gap-2" aria-label="3 estrellas">
                    {[1, 2, 3].map(i => <Star key={i} size={20} className="text-yellow-600 fill-current" aria-hidden="true" />)}
                    <span className="font-bold text-purple-900 text-lg">3 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white border-2 border-yellow-200 rounded-lg" role="listitem">
                  <span className="text-purple-800 font-bold text-lg">6 letters</span>
                  <div className="flex items-center gap-2" aria-label="4 estrellas">
                    {[1, 2, 3, 4].map(i => <Star key={i} size={20} className="text-yellow-600 fill-current" aria-hidden="true" />)}
                    <span className="font-bold text-purple-900 text-lg">4 stars</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white border-2 border-yellow-200 rounded-lg" role="listitem">
                  <span className="text-purple-800 font-bold text-lg">7+ letters</span>
                  <div className="flex items-center gap-2" aria-label="5 estrellas">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className="text-yellow-600 fill-current" aria-hidden="true" />)}
                    <span className="font-bold text-purple-900 text-lg">5 stars</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Themes con mejor contraste y estructura visual */}
            <section className="bg-green-50 border-2 border-green-200 rounded-lg p-4" aria-labelledby="themes-title">
              <h2 id="themes-title" className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
                <span className="bg-green-200 text-green-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">6</span>
                Available Themes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list" aria-label="Temas disponibles por dificultad">
                <div className="bg-orange-100 border-2 border-orange-300 rounded-lg p-4 text-center" role="listitem">
                  <h3 className="font-bold text-orange-900 text-lg mb-2">Basic Themes</h3>
                  <p className="text-orange-800 font-medium">Fruits, Animals, Colors</p>
                </div>
                <div className="bg-blue-100 border-2 border-blue-300 rounded-lg p-4 text-center" role="listitem">
                  <h3 className="font-bold text-blue-900 text-lg mb-2">Intermediate Themes</h3>
                  <p className="text-blue-800 font-medium">Transport, Food, Jobs</p>
                </div>
                <div className="bg-purple-100 border-2 border-purple-300 rounded-lg p-4 text-center" role="listitem">
                  <h3 className="font-bold text-purple-900 text-lg mb-2">Advanced Themes</h3>
                  <p className="text-purple-800 font-medium">Technology, Science, Business</p>
                </div>
              </div>
            </section>

            {/* Tips con mejor contraste y estructura */}
            <section className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4" aria-labelledby="tips-title">
              <h2 id="tips-title" className="text-lg font-bold text-yellow-900 mb-3 flex items-center gap-2">
                <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-sm font-bold" aria-hidden="true">7</span>
                Pro Tips for Success
              </h2>
              <ul className="space-y-3 text-yellow-800" role="list" aria-label="Consejos para jugar mejor">
                <li className="flex items-start gap-3 p-2 bg-white border border-yellow-200 rounded-lg" role="listitem">
                  <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mt-0.5" aria-hidden="true">•</span>
                  <span className="font-medium">Look for common word patterns and prefixes/suffixes</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white border border-yellow-200 rounded-lg" role="listitem">
                  <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mt-0.5" aria-hidden="true">•</span>
                  <span className="font-medium">Use the shuffle button when you're stuck</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white border border-yellow-200 rounded-lg" role="listitem">
                  <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mt-0.5" aria-hidden="true">•</span>
                  <span className="font-medium">Focus on longer words for higher scores</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white border border-yellow-200 rounded-lg" role="listitem">
                  <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mt-0.5" aria-hidden="true">•</span>
                  <span className="font-medium">Remember all words must relate to the theme</span>
                </li>
                <li className="flex items-start gap-3 p-2 bg-white border border-yellow-200 rounded-lg" role="listitem">
                  <span className="bg-yellow-200 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold mt-0.5" aria-hidden="true">•</span>
                  <span className="font-medium">Don't forget to validate your words!</span>
                </li>
              </ul>
            </section>
          </div>
        </main>

        {/* Footer con mejor contraste y accesibilidad */}
        <footer className="bg-gray-100 border-t-2 border-gray-300 px-6 py-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-800 font-medium">
              Ready to build some words and test your vocabulary skills?
            </p>
            <button
              onClick={onClose}
              className="bg-blue-700 hover:bg-blue-800 focus:bg-blue-800 text-white px-6 py-3 rounded-lg transition-colors font-bold text-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Cerrar instrucciones y empezar a jugar"
              tabIndex={0}
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