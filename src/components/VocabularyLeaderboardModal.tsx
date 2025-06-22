import React, { useState, useEffect } from 'react';
import { X, Trophy, Star, Clock, Book, Filter, ArrowUp, ArrowDown } from 'lucide-react';
import { VocabularyScore } from '../types';
import { getVocabularyLeaderboard } from '../utils/scoreUtils';

interface VocabularyLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VocabularyLeaderboardModal: React.FC<VocabularyLeaderboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const [scores, setScores] = useState<VocabularyScore[]>([]);
  const [filteredScores, setFilteredScores] = useState<VocabularyScore[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'stars' | 'wordsFound' | 'date'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [themeFilter, setThemeFilter] = useState<string>('all');

  useEffect(() => {
    if (isOpen) {
      loadScores();
    }
  }, [isOpen]);

  useEffect(() => {
    filterAndSortScores();
  }, [scores, sortBy, sortOrder, difficultyFilter, themeFilter]);

  const loadScores = () => {
    const leaderboardScores = getVocabularyLeaderboard(50);
    setScores(leaderboardScores);
  };

  const filterAndSortScores = () => {
    let filtered = [...scores];

    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(score => score.difficulty === difficultyFilter);
    }

    // Apply theme filter
    if (themeFilter !== 'all') {
      filtered = filtered.filter(score => score.theme === themeFilter);
    }

    // Sort scores
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;

      switch (sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'stars':
          aValue = a.stars;
          bValue = b.stars;
          break;
        case 'wordsFound':
          aValue = a.wordsFound;
          bValue = b.wordsFound;
          break;
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        default:
          aValue = a.score;
          bValue = b.score;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setFilteredScores(filtered);
  };

  const handleSort = (field: 'score' | 'stars' | 'wordsFound' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (milliseconds: number) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getUniqueDifficulties = () => {
    const difficulties = [...new Set(scores.map(score => score.difficulty))];
    return difficulties;
  };

  const getUniqueThemes = () => {
    const themes = [...new Set(scores.map(score => score.theme))];
    return themes;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={32} />
              <div>
                <h2 className="text-2xl font-bold">Vocabulary Challenge Leaderboard</h2>
                <p className="text-blue-100">Top word-building champions</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 px-6 py-4 border-b">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Difficulties</option>
              {getUniqueDifficulties().map(difficulty => (
                <option key={difficulty} value={difficulty}>
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={themeFilter}
              onChange={(e) => setThemeFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Themes</option>
              {getUniqueThemes().map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>

            <div className="text-sm text-gray-600">
              {filteredScores.length} of {scores.length} scores
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {filteredScores.length === 0 ? (
            <div className="p-8 text-center">
              <Trophy size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No scores found</h3>
              <p className="text-gray-500">Try adjusting your filters or play a game to see scores here!</p>
            </div>
          ) : (
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Player</th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('score')}
                    >
                      <div className="flex items-center gap-1">
                        Score
                        {sortBy === 'score' && (
                          sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('stars')}
                    >
                      <div className="flex items-center gap-1">
                        <Star size={16} />
                        Stars
                        {sortBy === 'stars' && (
                          sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                        )}
                      </div>
                    </th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('wordsFound')}
                    >
                      <div className="flex items-center gap-1">
                        <Book size={16} />
                        Words
                        {sortBy === 'wordsFound' && (
                          sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                        )}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Theme</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                    <th 
                      className="text-left py-3 px-4 font-semibold text-gray-700 cursor-pointer hover:bg-gray-50"
                      onClick={() => handleSort('date')}
                    >
                      <div className="flex items-center gap-1">
                        Date
                        {sortBy === 'date' && (
                          sortOrder === 'asc' ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredScores.map((score, index) => (
                    <tr key={score.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {index < 3 ? (
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                            }`}>
                              {index + 1}
                            </div>
                          ) : (
                            <span className="text-gray-500 font-medium">{index + 1}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{score.playerName}</td>
                      <td className="py-3 px-4 font-bold text-blue-600">{score.score}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star size={16} className="text-yellow-500" />
                          <span className="font-medium">{score.stars}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{score.wordsFound}</td>
                      <td className="py-3 px-4">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                          {score.theme}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyBadge(score.difficulty)}`}>
                          {score.difficulty.charAt(0).toUpperCase() + score.difficulty.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          {formatTime(score.timeSpent)}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(score.date)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing top vocabulary challenge scores
            </p>
            <button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyLeaderboardModal; 