import React from 'react';
import { X, Trophy, Medal, Award, Play, Home, Volume2, Target, Clock, Star } from 'lucide-react';
import { ListeningExercise } from '../types';
import { formatTime } from '../utils/scoreUtils';

interface ListeningResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  onGoHome: () => void;
  exercise: ListeningExercise;
  userAnswers: { [key: number]: string };
  score: number;
  timeSpent: number;
  hintsUsed: number;
  difficulty: string;
}

const ListeningResultsModal: React.FC<ListeningResultsModalProps> = ({
  isOpen,
  onClose,
  onPlayAgain,
  onGoHome,
  exercise,
  userAnswers,
  score,
  timeSpent,
  hintsUsed,
  difficulty
}) => {
  if (!isOpen) return null;

  const correctAnswers = exercise.blanks.filter(blank => {
    const userAnswer = userAnswers[blank.id] || '';
    return userAnswer.toLowerCase().trim() === blank.word.toLowerCase();
  }).length;

  const totalBlanks = exercise.blanks.length;
  const accuracy = Math.round((correctAnswers / totalBlanks) * 100);

  const getScoreMessage = () => {
    if (score >= 90) return "Excellent work! Your listening comprehension is outstanding.";
    if (score >= 80) return "Very well done! You have good listening skills.";
    if (score >= 70) return "Good job! Keep practicing to improve further.";
    if (score >= 60) return "Not bad! With more practice you'll improve a lot.";
    return "Keep trying! Practice makes perfect.";
  };

  const getScoreColor = () => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getScoreIcon = () => {
    if (score >= 90) return <Trophy size={32} className="text-yellow-500" />;
    if (score >= 80) return <Medal size={32} className="text-gray-400" />;
    if (score >= 70) return <Award size={32} className="text-amber-600" />;
    return <Star size={32} className="text-orange-500" />;
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-blue-600 bg-blue-100';
      case 'advanced':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = () => {
    switch (difficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🎯';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  const renderAnswerFeedback = () => {
    return exercise.blanks.map((blank) => {
      const userAnswer = userAnswers[blank.id] || '';
      const isCorrect = userAnswer.toLowerCase().trim() === blank.word.toLowerCase();
      
      return (
        <div
          key={blank.id}
          className={`p-3 rounded-lg border-2 ${
            isCorrect
              ? 'border-green-200 bg-green-50'
              : 'border-red-200 bg-red-50'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
            ) : (
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">✗</span>
              </div>
            )}
            <span className="font-semibold text-gray-800">Blank {blank.id}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Your answer:</span>
              <p className={`font-medium ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                {userAnswer || '(empty)'}
              </p>
            </div>
            
            <div>
              <span className="text-gray-600">Correct answer:</span>
              <p className="font-medium text-green-700">{blank.word}</p>
            </div>
            
            <div>
              <span className="text-gray-600">Hint:</span>
              <p className="text-gray-700">{blank.hint}</p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 size={32} />
              <div>
                <h2 className="text-2xl font-bold">Listening Challenge Results</h2>
                <p className="text-green-100">Check your performance!</p>
              </div>
            </div>
            <button
              onClick={onPlayAgain}
              className="text-white hover:text-green-100 transition-colors"
              title="Play Again"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {/* Score Summary */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                {getScoreIcon()}
                <div className={`text-6xl font-bold ${getScoreColor()}`}>
                  {score}
                </div>
                <span className="text-2xl text-gray-500">/100</span>
              </div>
              <p className="text-lg text-gray-700 mb-2">{getScoreMessage()}</p>
              <div className="text-sm text-gray-600">
                Accuracy: {accuracy}% ({correctAnswers}/{totalBlanks} correct)
              </div>
              <div className="mt-2">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor()}`}>
                  <span className="mr-1">{getDifficultyIcon()}</span>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
                </span>
              </div>
              
              {/* Difficulty Restrictions Info */}
              <div className="mt-3 text-xs text-gray-500">
                {difficulty === 'beginner' && (
                  <span>✓ No time limit • Unlimited video playback • Hints and skip available</span>
                )}
                {difficulty === 'intermediate' && (
                  <span>⏱️ 5-minute time limit • Unlimited video playback • Hints and skip available</span>
                )}
                {difficulty === 'advanced' && (
                  <span>🔒 No time limit • Only 2 video plays • No hints • No skip</span>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <Target size={24} className="mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                <div className="text-sm text-green-700">Accuracy</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <Clock size={24} className="mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-blue-600">{formatTime(timeSpent)}</div>
                <div className="text-sm text-blue-700">Time Spent</div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <Star size={24} className="mx-auto mb-2 text-orange-600" />
                <div className="text-2xl font-bold text-orange-600">{hintsUsed}</div>
                <div className="text-sm text-orange-700">
                  {difficulty === 'beginner' ? 'Hints Used' : 
                   difficulty === 'intermediate' ? 'Hints Used (2 max)' : 
                   'Hints Used (0 available)'}
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <Award size={24} className="mx-auto mb-2 text-purple-600" />
                <div className="text-2xl font-bold text-purple-600">{score}</div>
                <div className="text-sm text-purple-700">Final Score</div>
              </div>
            </div>

            {/* Detailed Feedback */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Feedback</h3>
              <div className="space-y-3">
                {renderAnswerFeedback()}
              </div>
            </div>

            {/* Complete Paragraph */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Complete Paragraph:</h4>
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

            {/* Tips for Improvement */}
            {score < 100 && (
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">💡 Tips for improvement:</h4>
                <ul className="space-y-1 text-yellow-700 text-sm">
                  <li>• Listen to the video multiple times to better capture pronunciation</li>
                  <li>• Pay attention to the context of surrounding words</li>
                  <li>• Use hints when you're really stuck</li>
                  <li>• Practice with different difficulty levels</li>
                  <li>• Focus on the speaker's intonation and rhythm</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onPlayAgain}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Play size={20} />
              Play Again
            </button>
            
            <button
              onClick={onGoHome}
              className="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-md border-2 border-gray-200"
            >
              <Home size={20} />
              Back to Main Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListeningResultsModal; 