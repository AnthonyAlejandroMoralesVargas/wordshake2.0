import { Book, Gamepad2, LogIn, Volume2 } from 'lucide-react';
import React from 'react';

interface GameModeSelectionProps {
  onSelectMode: (mode: string) => void;
  onShowLogin: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ onSelectMode, onShowLogin }) => {
  const gameModes = [
    {
      id: 'vocabulary',
      name: 'Vocabulary',
      description: 'Build words from letter grids',
      icon: Book,
      available: true,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'grammar',
      name: 'Grammar',
      description: 'Coming soon...',
      icon: Gamepad2,
      available: false,
      color: 'from-gray-400 to-gray-500'
    },
    {
      id: 'listening',
      name: 'Listening',
      description: 'Coming soon...',
      icon: Volume2,
      available: false,
      color: 'from-gray-400 to-gray-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative">
      <button
        onClick={onShowLogin}
        className="absolute top-6 right-8 flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg z-20"
      >
        <LogIn size={20} />
        Iniciar Sesión
      </button>
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">English Learning Games</h1>
          <p className="text-xl text-gray-200">Choose your learning adventure</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {gameModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <div
                key={mode.id}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${
                  mode.available
                    ? 'hover:scale-105 cursor-pointer shadow-xl hover:shadow-2xl'
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => mode.available && onSelectMode(mode.id)}
              >
                <div className={`bg-gradient-to-br ${mode.color} p-8 h-64 flex flex-col items-center justify-center text-center`}>
                  <IconComponent size={64} className="text-white mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">{mode.name}</h3>
                  <p className="text-gray-100">{mode.description}</p>
                  {!mode.available && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold">Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GameModeSelection;