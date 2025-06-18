import React from 'react';
import { Shuffle, Check, X, RotateCcw } from 'lucide-react';

interface GameControlsProps {
  onShuffle: () => void;
  onValidate: () => void;
  onClear: () => void;
  onRestart: () => void;
  canValidate: boolean;
  disabled?: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  onShuffle,
  onValidate,
  onClear,
  onRestart,
  canValidate,
  disabled = false
}) => {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        onClick={onShuffle}
        disabled={disabled}
        className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
      >
        <Shuffle size={20} />
        Shuffle
      </button>
      
      <button
        onClick={onValidate}
        disabled={disabled || !canValidate}
        className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
      >
        <Check size={20} />
        Validate
      </button>
      
      <button
        onClick={onClear}
        disabled={disabled}
        className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
      >
        <X size={20} />
        Clear
      </button>
      
      <button
        onClick={onRestart}
        disabled={disabled}
        className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
      >
        <RotateCcw size={20} />
        Restart
      </button>
    </div>
  );
};

export default GameControls;