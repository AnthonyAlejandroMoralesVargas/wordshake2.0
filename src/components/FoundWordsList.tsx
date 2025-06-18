import React from 'react';
import { calculateStars } from '../utils/gameUtils';

interface FoundWordsListProps {
  foundWords: string[];
}

const FoundWordsList: React.FC<FoundWordsListProps> = ({ foundWords }) => {
  const renderStars = (count: number) => {
    return '★'.repeat(count);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Found Words ({foundWords.length})</h3>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {foundWords.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No words found yet</p>
        ) : (
          foundWords.map((word, index) => {
            const stars = calculateStars(word.length);
            return (
              <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                <span className="font-medium text-gray-800">{word}</span>
                <span className="text-yellow-500 text-lg">{renderStars(stars)}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FoundWordsList;