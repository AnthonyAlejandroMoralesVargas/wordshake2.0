import React from 'react';
import { X, Star, Target, Zap, BookOpen, Clock, Users, Play, Timer, Lock } from 'lucide-react';

interface DifficultySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDifficulty: (difficulty: string) => void;
}

const DifficultySelectionModal: React.FC<DifficultySelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectDifficulty
}) => {
  if (!isOpen) return null;

  const difficulties = [
    {
      id: 'beginner',
      name: 'Basic',
      description: 'Complete freedom to practice at your own pace',
      icon: <BookOpen size={32} className="text-green-600" />,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'from-green-600 to-emerald-700',
      features: [
        'No time limit',
        'Unlimited video playback',
        'Hints available',
        'Skip to specific parts',
        'Take your time to listen carefully'
      ],
      restrictions: 'No restrictions',
      level: 'Academic 4 - Basic'
    },
    {
      id: 'intermediate',
      name: 'Intermediate',
      description: 'Challenge yourself with time constraints',
      icon: <Timer size={32} className="text-blue-600" />,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'from-blue-600 to-cyan-700',
      features: [
        '5-minute time limit',
        'Unlimited video playback',
        'Hints available',
        'Skip to specific parts',
        'Game ends when time runs out'
      ],
      restrictions: 'Time limit applies',
      level: 'Academic 4 - Intermediate'
    },
    {
      id: 'advanced',
      name: 'Advanced',
      description: 'Maximum challenge with strict limitations',
      icon: <Lock size={32} className="text-purple-600" />,
      color: 'from-purple-500 to-indigo-600',
      hoverColor: 'from-purple-600 to-indigo-700',
      features: [
        'Only 2 video plays allowed',
        'No time limit',
        'No hints available',
        'No skip to specific parts',
        'Maximum challenge level'
      ],
      restrictions: '2 video plays only',
      level: 'Academic 4 - Advanced'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star size={32} />
              <div>
                <h2 className="text-2xl font-bold">Choose Your Challenge Level</h2>
                <p className="text-green-100">Select the difficulty that matches your academic level 4 needs</p>
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
              Academic Level 4 - Listening Challenge:
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

export default DifficultySelectionModal; 