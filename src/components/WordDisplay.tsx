import React from 'react';

interface WordDisplayProps {
  currentWord: string;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ currentWord }) => {
  return (
    <div className="bg-white rounded-lg p-4 shadow-md min-h-[60px] flex items-center justify-center">
      <span className="text-2xl font-bold text-gray-800 tracking-wider">
        {currentWord || 'Click letters to form words...'}
      </span>
    </div>
  );
};

export default WordDisplay;