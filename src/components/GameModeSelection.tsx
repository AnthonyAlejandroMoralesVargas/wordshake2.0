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

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4 relative" lang="en">
      {/* User Status */}
      <div className="absolute top-6 right-8 flex items-center gap-4">
        {isLoggedIn && user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg" aria-label={`Currently logged in as ${user.displayName}`}>
              <User size={20} aria-hidden="true" />
              <span className="font-semibold">{user.displayName}</span>
            </div>
            <button
              onClick={onLogout}
              tabIndex={0}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
              aria-label="Logout from your account and return to guest mode"
            >
              <LogOut size={20} aria-hidden="true" />
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onShowLogin}
            tabIndex={0}
            className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 focus:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-white text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg z-20"
            aria-label="Login to access your personal progress and achievements"
          >
            <LogIn size={20} aria-hidden="true" />
            Log In
          </button>
        )}
      </div>
      
      <main className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-white mb-6">
          WordShake 2.0
        </h1>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          Master English through interactive vocabulary, grammar, and listening challenges
        </p>
        
        <section className="grid md:grid-cols-3 gap-6 mb-12" role="group" aria-labelledby="game-modes-heading">
          <h2 id="game-modes-heading" className="sr-only">Available Game Modes</h2>
          {gameModes.map((mode, index) => {
            const IconComponent = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => mode.available && onSelectMode(mode.id)}
                onKeyDown={(e) => mode.available && handleKeyDown(e, () => onSelectMode(mode.id))}
                tabIndex={0}
                aria-label={`Select ${mode.name} game mode. ${mode.description}`}
                disabled={!mode.available}
                className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-opacity-20 focus:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-white border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${mode.color} flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent size={32} className="text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{mode.name}</h3>
                <p className="text-white/80">{mode.description}</p>
              </button>
            );
          })}
        </section>
        
        <section className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white/20" tabIndex={0} role="region" aria-labelledby="instructions-heading">
          <h2 id="instructions-heading" className="text-2xl font-bold text-white mb-4">How to Play</h2>
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
        </section>
      </main>
    </div>
  );
};

export default GameModeSelection;