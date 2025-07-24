import React, { useEffect } from 'react';
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
  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star size={32} />
              <div>
                <h2 className="text-2xl font-bold">Choose Your Vocabulary Level</h2>
                <p className="text-blue-100">Select the difficulty that matches your academic level 4 needs</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors"
              aria-label="Close difficulty selection modal"
              title="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid md:grid-cols-3 gap-6">
            {difficulties.map((difficulty) => (
              <div
                key={difficulty.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onSelectDifficulty(difficulty.id)}
              >
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="flex justify-center mb-3">
                    {difficulty.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{difficulty.name}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${difficulty.color} text-white`}>
                    {difficulty.level}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {difficulty.description}
                </p>

                {/* Restrictions */}
                <div className="bg-red-50 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold text-red-800 text-sm mb-1">Restrictions:</h4>
                  <p className="text-red-700 text-sm">{difficulty.restrictions}</p>
                </div>

                {/* Features */}
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-800 text-sm mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {difficulty.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-xs text-gray-600">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${difficulty.color}`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select Button */}
                <button
                  className={`w-full mt-4 py-3 px-4 rounded-lg font-semibold text-white bg-gradient-to-r ${difficulty.color} hover:${difficulty.hoverColor} transition-all duration-300 hover:scale-105 shadow-md`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectDifficulty(difficulty.id);
                  }}
                >
                  Select {difficulty.name}
                </button>
              </div>
            ))}
          </div>

          {/* Academic Level Info */}
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              <Users size={20} />
              Academic Level 4 - Vocabulary Challenge:
            </h4>
            <ul className="space-y-1 text-blue-700 text-sm">
              <li>• <strong>Basic:</strong> Perfect for learning and building confidence</li>
              <li>• <strong>Intermediate:</strong> Practice under realistic time pressure</li>
              <li>• <strong>Advanced:</strong> Maximum challenge with strict limitations</li>
            </ul>
            <p className="text-blue-600 text-sm mt-2">
              Choose based on your comfort level and learning goals. You can always change later.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Select the challenge level that best fits your academic needs
            </p>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyDifficultyModal; 