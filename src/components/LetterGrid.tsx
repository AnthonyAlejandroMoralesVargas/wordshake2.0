import React from 'react';

interface LetterGridProps {
  letters: string[];
  selectedIndices: number[];
  onLetterClick: (index: number) => void;
  disabled?: boolean;
  hintIndices?: number[];
  showHint?: boolean;
  currentHintIndex?: number;
}

const LetterGrid: React.FC<LetterGridProps> = ({
  letters,
  selectedIndices,
  onLetterClick,
  disabled = false,
  hintIndices = [],
  showHint = false,
  currentHintIndex = 0
}) => {
  // Calculate grid size dynamically
  const gridSize = Math.sqrt(letters.length);
  const cols = gridSize;
  
  console.log('LetterGrid render:', { 
    showHint, 
    hintIndices, 
    lettersLength: letters.length,
    selectedIndices 
  });
  
  return (
    <div className="w-full max-w-4xl mx-auto aspect-square">
      <div 
        className="grid gap-2 w-full h-full p-4"
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${cols}, 1fr)`
        }}
      >
        {letters.map((letter, index) => {
          const isSelected = selectedIndices.includes(index);
          const isHint = showHint && hintIndices.includes(index);
          const isCurrentHint = isHint && hintIndices.indexOf(index) === currentHintIndex;
          
          if (isCurrentHint) {
            console.log(`Letter ${index} (${letter}) is current hint`);
          }
          
          return (
            <button
              key={index}
              onClick={() => !disabled && onLetterClick(index)}
              disabled={disabled}
              className={`
                rounded-xl font-bold transition-all duration-200 flex items-center justify-center
                ${isSelected
                  ? 'bg-blue-500 text-white scale-105 shadow-lg'
                  : 'bg-white hover:bg-gray-50 text-gray-800 shadow-md hover:shadow-lg'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 cursor-pointer'}
                border-2 border-gray-200
                text-lg sm:text-xl md:text-2xl lg:text-3xl
                min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem] lg:min-h-[6rem]
              `}
              style={{
                backgroundColor: isCurrentHint ? '#FFEE8C' : undefined,
                color: isCurrentHint ? '#000000' : undefined,
                transform: isCurrentHint ? 'scale(1.05)' : undefined,
                boxShadow: isCurrentHint ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : undefined
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LetterGrid;