import { Book, Gamepad2, LogIn, Volume2, User, LogOut } from 'lucide-react';
import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
}

interface GameModeSelectionProps {
  onSelectMode: (mode: string) => void;
  onShowLogin: () => void;
  user: User | null;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const GameModeSelection: React.FC<GameModeSelectionProps> = ({ 
  onSelectMode, 
  onShowLogin, 
  user, 
  isLoggedIn, 
  onLogout 
}) => {
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
      description: 'Practice pronunciation with speech recognition',
      icon: Gamepad2,
      available: true,
      color: 'from-orange-500 to-red-600'
    },
    {
      id: 'listening',
      name: 'Listening',
      description: 'Fill in the blanks while watching videos',
      icon: Volume2,
      available: true,
      color: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative">
      {/* User Status */}
      <div className="absolute top-6 right-8 flex items-center gap-4">
        {isLoggedIn && user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg">
              <User size={20} />
              <span className="font-semibold">{user.displayName}</span>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onShowLogin}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg z-20"
          >
            <LogIn size={20} />
            Log In
          </button>
        )}
      </div>
      
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-6">
          WordShake 2.0
        </h1>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Master English through interactive vocabulary, grammar, and listening challenges
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {gameModes.map((mode) => {
            const IconComponent = mode.icon;
            return (
              <div
                key={mode.id}
                onClick={() => onSelectMode(mode.id)}
                className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-opacity-20 border border-white/20 ${
                  !mode.available ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{mode.name}</h3>
                <p className="text-white/80">{mode.description}</p>
              </div>
            );
          })}
        </div>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">How to Play</h2>
          <div className="grid md:grid-cols-3 gap-6 text-white/80">
            <div>
              <h3 className="font-semibold text-white mb-2">1. Choose Your Game</h3>
              <p>Select from Vocabulary, Grammar, or Listening challenges</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">2. Pick Difficulty</h3>
              <p>Start with Basic, advance to Intermediate, master Advanced</p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">3. Track Progress</h3>
              <p>View leaderboards and monitor your improvement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelection;