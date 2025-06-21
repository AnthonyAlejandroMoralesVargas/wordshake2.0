import React, { useState, useEffect } from 'react';
import { GrammarScore } from '../types';

interface GrammarLeaderboardModalProps {
  onBack: () => void;
}

const GrammarLeaderboardModal: React.FC<GrammarLeaderboardModalProps> = ({ onBack }) => {
  const [scores, setScores] = useState<GrammarScore[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'time' | 'date'>('time');

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = () => {
    const savedScores = JSON.parse(localStorage.getItem('grammarScores') || '[]');
    setScores(savedScores);
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFilteredAndSortedScores = () => {
    let filteredScores = scores;

    // Filter by difficulty
    if (filterDifficulty !== 'all') {
      filteredScores = scores.filter(score => score.difficulty === filterDifficulty);
    }

    // Sort by time (ascending) or date (descending)
    return filteredScores.sort((a, b) => {
      if (sortBy === 'time') {
        return a.totalTime - b.totalTime;
      } else {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getCompletionRate = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const clearLeaderboard = () => {
    if (window.confirm('Are you sure you want to clear all scores? This action cannot be undone.')) {
      localStorage.removeItem('grammarScores');
      setScores([]);
    }
  };

  const filteredScores = getFilteredAndSortedScores();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Grammar Practice Leaderboard</h1>
              <p className="text-gray-600">Best completion times</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          </div>

          {/* Filters */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Difficulty:
                </label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Difficulties</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'time' | 'date')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="time">Best Time</option>
                  <option value="date">Most Recent</option>
                </select>
              </div>

              <div className="ml-auto">
                <button
                  onClick={clearLeaderboard}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                  Clear All Scores
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          {scores.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{scores.length}</div>
                <div className="text-sm text-blue-700">Total Sessions</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {formatTime(Math.min(...scores.map(s => s.totalTime)))}
                </div>
                <div className="text-sm text-green-700">Best Time</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {formatTime(Math.round(scores.reduce((sum, s) => sum + s.totalTime, 0) / scores.length))}
                </div>
                <div className="text-sm text-purple-700">Average Time</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {Math.round(scores.reduce((sum, s) => sum + getCompletionRate(s.sentencesCompleted, s.totalSentences), 0) / scores.length)}%
                </div>
                <div className="text-sm text-yellow-700">Avg Completion</div>
              </div>
            </div>
          )}

          {/* Leaderboard Table */}
          {filteredScores.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Session
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Difficulty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Completion
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredScores.map((score, index) => (
                    <tr key={score.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {index === 0 && <span className="text-yellow-500 mr-2">🥇</span>}
                          {index === 1 && <span className="text-gray-400 mr-2">🥈</span>}
                          {index === 2 && <span className="text-orange-500 mr-2">🥉</span>}
                          <span className="font-semibold text-gray-900">
                            {index + 1}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {score.playerName}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {score.sessionTitle}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(score.difficulty)}`}>
                          {score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatTime(score.totalTime)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {score.sentencesCompleted}/{score.totalSentences} ({getCompletionRate(score.sentencesCompleted, score.totalSentences)}%)
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {formatDate(score.date)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No scores yet</h3>
              <p className="text-gray-600">Complete some grammar practice sessions to see your scores here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrammarLeaderboardModal; 