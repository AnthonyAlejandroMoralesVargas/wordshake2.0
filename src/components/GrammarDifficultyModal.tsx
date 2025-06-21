import React from 'react';
import { X, Mic, Volume2, Target, BookOpen, Clock, Zap } from 'lucide-react';

interface GrammarDifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: string) => void;
}

const GrammarDifficultyModal: React.FC<GrammarDifficultyModalProps> = ({
  isOpen,
  onClose,
  onSelectDifficulty
}) => {
  if (!isOpen) return null;

  const difficulties = [
    {
      id: 'beginner',
      name: 'Beginner',
      description: 'Perfect for building pronunciation confidence',
      icon: <BookOpen size={32} className="text-green-600" />,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'from-green-600 to-emerald-700',
      features: [
        'Basic grammar structures',
        'Simple sentence patterns',
        'Clear pronunciation guidance',
        'Unlimited practice attempts',
        'Detailed feedback on each word'
      ],
      grammarFocus: 'Present Simple, Questions, Negatives',
      level: 'Beginner Level'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Challenge yourself with more complex structures',
      icon: <Target size={32} className="text-blue-600" />,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'from-blue-600 to-cyan-700',
      features: [
        'Intermediate grammar patterns',
        'Longer sentence structures',
        'Natural speaking pace',
        'Pronunciation accuracy focus',
        'Grammar point explanations'
      ],
      grammarFocus: 'Present Continuous, Past Simple, Future',
      level: 'Intermediate Level'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Master complex grammar with native-like pronunciation',
      icon: <Zap size={32} className="text-purple-600" />,
      color: 'from-purple-500 to-indigo-600',
      hoverColor: 'from-purple-600 to-indigo-700',
      features: [
        'Advanced grammar concepts',
        'Complex sentence structures',
        'Native pronunciation standards',
        'Intonation and stress focus',
        'Advanced grammar explanations'
      ],
      grammarFocus: 'Present Perfect, Conditionals, Passive Voice',
      level: 'Advanced Level'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic size={32} />
              <div>
                <h2 className="text-2xl font-bold">Choose Your Grammar Practice Level</h2>
                <p className="text-orange-100">Select the difficulty that matches your speaking skills</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-orange-100 transition-colors"
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

                {/* Grammar Focus */}
                <div className="bg-blue-50 rounded-lg p-3 mb-4">
                  <h4 className="font-semibold text-blue-800 text-sm mb-1">Grammar Focus:</h4>
                  <p className="text-blue-700 text-sm">{difficulty.grammarFocus}</p>
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
                  Start {difficulty.name} Practice
                </button>
              </div>
            ))}
          </div>

          {/* Practice Info */}
          <div className="mt-8 bg-orange-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
              <Volume2 size={20} />
              How Grammar Practice Works:
            </h4>
            <ul className="space-y-1 text-orange-700 text-sm">
              <li>• <strong>Listen:</strong> Hear native pronunciation of each sentence</li>
              <li>• <strong>Practice:</strong> Record yourself repeating the sentence</li>
              <li>• <strong>Feedback:</strong> Get instant pronunciation assessment</li>
              <li>• <strong>Progress:</strong> Complete 5 sentences per session</li>
            </ul>
            <p className="text-orange-600 text-sm mt-2">
              Choose based on your current speaking level. You can always try different levels later.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Each session includes 5 grammar sentences to practice
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

export default GrammarDifficultyModal; 