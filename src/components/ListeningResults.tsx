import React from 'react';
import { Check, X, Volume2 } from 'lucide-react';
import { ListeningExercise } from '../types';

interface ListeningResultsProps {
  exercise: ListeningExercise;
  userAnswers: { [key: number]: string };
  score: number;
}

const ListeningResults: React.FC<ListeningResultsProps> = ({
  exercise,
  userAnswers,
  score
}) => {
  const renderResults = () => {
    return exercise.blanks.map((blank) => {
      const userAnswer = userAnswers[blank.id] || '';
      const isCorrect = userAnswer.toLowerCase().trim() === blank.word.toLowerCase();
      
      return (
        <div
          key={blank.id}
          className={`p-4 rounded-lg border-2 ${
            isCorrect
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-center gap-3 mb-2">
            {isCorrect ? (
              <Check size={20} className="text-green-600" />
            ) : (
              <X size={20} className="text-red-600" />
            )}
            <span className="font-semibold text-gray-800">
              Blank {blank.id}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Your answer:</span>
              <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {userAnswer || '(empty)'}
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-600">Correct answer:</span>
              <p className="font-semibold text-green-700">{blank.word}</p>
            </div>
            
            <div>
              <span className="font-medium text-gray-600">Hint:</span>
              <p className="text-gray-700">{blank.hint}</p>
            </div>
          </div>
          
          {!isCorrect && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Tip:</strong> Listen carefully to the pronunciation and context clues in the video.
              </p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Volume2 size={24} className="text-green-600" />
        <h2 className="text-2xl font-bold text-gray-800">Listening Results</h2>
      </div>
      
      <div className="mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-gray-800 mb-2">{score}%</div>
          <div className="text-lg text-gray-600">
            {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good job!' : 'Keep practicing!'}
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Answers:</h3>
        {renderResults()}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">Complete Paragraph:</h4>
        <p className="text-gray-700 leading-relaxed">
          {exercise.paragraph.split(' ').map((word, index) => {
            if (word === '___') {
              const blankIndex = exercise.paragraph.split(' ').slice(0, index).filter(w => w === '___').length;
              const blank = exercise.blanks[blankIndex];
              return (
                <span key={index} className="font-semibold text-green-700">
                  {blank.word}{' '}
                </span>
              );
            }
            return <span key={index}>{word} </span>;
          })}
        </p>
      </div>
    </div>
  );
};

export default ListeningResults; 