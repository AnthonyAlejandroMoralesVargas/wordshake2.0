import { Trophy, X } from 'lucide-react';
import React from 'react';

interface LeaderboardEntry {
  nickname: string;
  score: number;
}

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  scores: LeaderboardEntry[];
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({ isOpen, onClose, scores }) => {
  if (!isOpen) return null;

  // Ordenar los puntajes de mayor a menor
  const sortedScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Trophy size={32} className="text-yellow-500" />
              <h2 className="text-2xl font-bold text-gray-800">Leaderboard</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mb-4">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-2 text-gray-700">#</th>
                  <th className="py-2 px-2 text-gray-700">Nickname</th>
                  <th className="py-2 px-2 text-gray-700">Score</th>
                </tr>
              </thead>
              <tbody>
                {sortedScores.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center text-gray-500 py-4">No scores yet.</td>
                  </tr>
                ) : (
                  sortedScores.map((entry, idx) => (
                    <tr key={idx} className="hover:bg-blue-100 rounded">
                      <td className="py-2 px-2 font-semibold">{idx + 1}</td>
                      <td className="py-2 px-2">{entry.nickname}</td>
                      <td className="py-2 px-2">{entry.score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={onClose}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal; 