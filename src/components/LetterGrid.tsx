import React from 'react';

interface LetterGridProps {
  letters: string[];
  selectedIndices: number[];
  onLetterClick: (index: number) => void;
  disabled?: boolean;
}

const LetterGrid: React.FC<LetterGridProps> = ({
  letters,
  selectedIndices,
  onLetterClick,
  disabled = false
}) => {
  return (
    <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
      {letters.map((letter, index) => (
        <button
          key={index}
          onClick={() => !disabled && onLetterClick(index)}
          disabled={disabled}
          className={`
            w-16 h-16 rounded-lg font-bold text-xl transition-all duration-200
            ${selectedIndices.includes(index)
              ? 'bg-blue-500 text-white scale-105 shadow-lg'
              : 'bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
            border-2 border-gray-200
          `}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterGrid;