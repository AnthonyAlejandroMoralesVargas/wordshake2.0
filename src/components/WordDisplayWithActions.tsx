import React from 'react';
import { Shuffle, Play, Trash2 } from 'lucide-react';

interface WordDisplayWithActionsProps {
  currentWord: string;
  onShuffle: () => void;
  onValidate: () => void;
  onClear: () => void;
  canValidate: boolean;
  disabled?: boolean;
}

const WordDisplayWithActions: React.FC<WordDisplayWithActionsProps> = ({
  currentWord,
  onShuffle,
  onValidate,
  onClear,
  canValidate,
  disabled = false
}) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onShuffle}
          disabled={disabled}
          className="p-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg transition-colors flex-shrink-0"
          title="Shuffle letters"
        >
          <Shuffle size={20} />
        </button>
        
        <div className="flex-1 bg-gray-50 rounded-lg p-4 min-h-[60px] flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-800 tracking-wider">
            {currentWord || 'Click letters to form words...'}
          </span>
        </div>
        
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onValidate}
            disabled={disabled || !canValidate}
            className="p-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            title="Validate word"
          >
            <Play size={20} />
          </button>
          <button
            onClick={onClear}
            disabled={disabled}
            className="p-3 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            title="Clear word"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordDisplayWithActions;