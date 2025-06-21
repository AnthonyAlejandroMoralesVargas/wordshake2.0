import React from 'react';
import { X, Trophy, Medal, Award, Clock, Target, BarChart3 } from 'lucide-react';
import { getListeningLeaderboard, formatDate, formatTime } from '../utils/scoreUtils';
import { ListeningScore } from '../types';

interface ListeningLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ListeningLeaderboardModal: React.FC<ListeningLeaderboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const leaderboard = getListeningLeaderboard(20);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy size={20} className="text-yellow-500" />;
    if (rank === 2) return <Medal size={20} className="text-gray-400" />;
    if (rank === 3) return <Award size={20} className="text-amber-600" />;
    return <span className="text-gray-500 font-bold">{rank}</span>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    if (score >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 size={32} />
              <div>
                <h2 className="text-2xl font-bold">Listening Challenge Leaderboard</h2>
                <p className="text-green-100">Top performers in listening exercises</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No scores yet</h3>
              <p className="text-gray-500">Complete your first listening challenge to appear here!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Legend */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">Scoring System:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>90-100: Excellent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>80-89: Very Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>70-79: Good</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>60-69: Fair</span>
                  </div>
                </div>
              </div>

              {/* Leaderboard Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Rank</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Player</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Score</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Accuracy</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Video</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Difficulty</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Time</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((score, index) => (
                      <tr
                        key={score.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index < 3 ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : ''
                        }`}
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {getRankIcon(index + 1)}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium text-gray-800">
                          {score.playerName}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`font-bold text-lg ${getScoreColor(score.score)}`}>
                            {score.score}
                          </span>
                          <span className="text-gray-500 text-sm">/100</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Target size={16} className="text-gray-500" />
                            <span className="font-medium">
                              {score.correctAnswers}/{score.totalBlanks}
                            </span>
                            <span className="text-gray-500 text-sm">
                              ({score.percentage}%)
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="max-w-32 truncate" title={score.videoTitle}>
                            {score.videoTitle}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            score.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                            score.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {score.difficulty}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-gray-500" />
                            <span className="text-sm">{formatTime(score.timeSpent)}</span>
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
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing top {leaderboard.length} scores
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

export default ListeningLeaderboardModal; 