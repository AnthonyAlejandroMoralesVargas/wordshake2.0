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
  // Calculate grid size dynamically
  const gridSize = Math.sqrt(letters.length);
  const cols = gridSize;
  
  return (
    <div className="w-full max-w-4xl mx-auto aspect-square">
      <div 
        className="grid gap-2 w-full h-full p-4"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${cols}, 1fr)`
        }}
      >
        {letters.map((letter, index) => (
          <button
            key={index}
            onClick={() => !disabled && onLetterClick(index)}
            disabled={disabled}
            className={`
              rounded-xl font-bold transition-all duration-200 flex items-center justify-center
              ${selectedIndices.includes(index)
                ? 'bg-blue-500 text-white scale-105 shadow-lg'
                : 'bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
              border-2 border-gray-200
              text-lg sm:text-xl md:text-2xl lg:text-3xl
              min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem]
            `}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LetterGrid;