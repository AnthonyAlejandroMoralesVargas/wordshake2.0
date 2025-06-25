import React, { useEffect, useState } from 'react';
import { useScoreService } from '../hooks/useScoreService';
import { GrammarScore } from '../types';

interface GrammarLeaderboardModalProps {
  onBack: () => void;
}

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const GrammarLeaderboardModal: React.FC<GrammarLeaderboardModalProps> = ({ onBack }) => {
  const { getGrammarLeaderboard, loading } = useScoreService();
  const [scores, setScores] = useState<GrammarScore[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'time' | 'date'>('time');

  useEffect(() => {
    loadScores();
    // eslint-disable-next-line
  }, [filterDifficulty]);

  const loadScores = async () => {
    const apiScores = await getGrammarLeaderboard(filterDifficulty.toLowerCase(), 50);
    // Mapea los datos de la API al tipo GrammarScore si es necesario
    const mappedScores: GrammarScore[] = (apiScores || []).map((score: any, idx: number) => ({
      id: score.idMatch?.toString() || idx.toString(),
      playerName: score.player || 'Unknown',
      sessionTitle: score.session_name || '-',
      difficulty: score.difficulty,
      totalTime: score.time || 0,
      finalScore: score.score,
      maxScore: score.maxScore || 100, // Ajusta si tu API retorna el máximo
      date: score.date,
      sentencesCompleted: score.completion || 0, // Ajusta si tu API retorna esto
      totalSentences: score.totalSentences || 0, // Ajusta si tu API retorna esto
    }));
    setScores(mappedScores);
  };

  const sortedScores = [...scores].sort((a, b) => {
    if (sortBy === 'time') {
      return a.totalTime - b.totalTime;
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-blue-600 bg-blue-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTime = (seconds: number) => {
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
                  {DIFFICULTIES.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
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
            </div>
          </div>

          {/* Leaderboard Table */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : sortedScores.length > 0 ? (
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
                      Score
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
                  {sortedScores.map((score, index) => (
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
                          {score.difficulty}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatTime(score.totalTime)}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {score.finalScore}/{score.maxScore}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {score.sentencesCompleted}/{score.totalSentences}
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