import React from 'react';
import { Home, BookOpen, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface GameHeaderProps {
  onHome: () => void;
  onInstructions: () => void;
  onRestart: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  themeName: string;
  themeColor: string;
  score: number;
  timeRemaining: string;
}

const GameHeader: React.FC<GameHeaderProps> = ({
  onHome,
  onInstructions,
  onRestart,
  isMuted,
  onToggleMute,
  themeName,
  themeColor,
  score,
  timeRemaining
}) => {
  return (
    <header className="bg-white shadow-lg rounded-lg p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800">Wordshake</h1>
        <nav className="flex gap-2" aria-label="Game navigation">
          <button
            onClick={onHome}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Home"
            aria-label="Go to home"
          >
            <Home size={24} className="text-gray-600" />
          </button>
          <button
            onClick={onRestart}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Restart Game"
            aria-label="Restart game"
          >
            <RotateCcw size={24} className="text-gray-600" />
          </button>
          <button
            onClick={onInstructions}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Instructions"
            aria-label="Show instructions"
          >
            <BookOpen size={24} className="text-gray-600" />
          </button>
          <button
            onClick={onToggleMute}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
            aria-label={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX size={24} className="text-gray-600" /> : <Volume2 size={24} className="text-gray-600" />}
          </button>
        </nav>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-center" role="region" aria-label="Game statistics">
        <div className={`${themeColor} rounded-lg p-3 text-white`}>
          <div className="font-semibold">Theme</div>
          <div className="text-lg">{themeName}</div>
        </div>
        <div className="bg-yellow-700 rounded-lg p-3 text-white">
          <div className="font-semibold">Score</div>
          <div className="text-lg">{score} ★</div>
        </div>
        <div className="bg-red-600 rounded-lg p-3 text-white">
          <div className="font-semibold">Time</div>
          <div className="text-lg">{timeRemaining}</div>
        </div>
      </div>
    </header>
  );
};

export default GameHeader;