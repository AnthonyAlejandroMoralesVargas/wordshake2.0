import { ArrowDown, ArrowUp, Book, Clock, Filter, Star, Trophy, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useScoreService } from '../hooks/useScoreService';
import { VocabularyScore } from '../types';

interface VocabularyLeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];

const VocabularyLeaderboardModal: React.FC<VocabularyLeaderboardModalProps> = ({
  isOpen,
  onClose
}) => {
  const { getVocabularyLeaderboard, loading } = useScoreService();
  const [scores, setScores] = useState<VocabularyScore[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'stars' | 'wordsFound' | 'date'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  // Manejo de escape y focus para accesibilidad
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
      
      // Enfocar el modal cuando se abre
      const modal = document.getElementById('vocabulary-leaderboard-modal');
      if (modal) {
        modal.focus();
      }
      
      loadScores();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, difficultyFilter]);

  const loadScores = async () => {
    const apiScores = await getVocabularyLeaderboard(difficultyFilter.toLowerCase(), 50);
    // Mapea los datos de la API al tipo VocabularyScore si es necesario
    const mappedScores: VocabularyScore[] = (apiScores || []).map((score: any, idx: number) => ({
      id: score.idMatch?.toString() || idx.toString(),
      playerName: score.player || 'Unknown',
      score: score.score,
      stars: score.stars || 0, // Ajusta si tu API retorna estrellas
      wordsFound: score.num_words || 0,
      theme: score.theme || '-', // Ajusta si tu API retorna tema
      difficulty: score.difficulty,
      date: score.date,
      timeSpent: score.time || 0,
    }));
    setScores(mappedScores);
  };

  const sortedScores = [...scores].sort((a, b) => {
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
    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
  });

  const handleSort = (field: 'score' | 'stars' | 'wordsFound' | 'date') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leaderboard-modal-title"
      aria-describedby="leaderboard-modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        id="vocabulary-leaderboard-modal"
        className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Header con mejor contraste y estructura semántica */}
        <header className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy size={32} aria-hidden="true" className="text-yellow-200" />
              <div>
                <h1 id="leaderboard-modal-title" className="text-2xl font-bold text-white">
                  Vocabulary Challenge Leaderboard
                </h1>
                <p id="leaderboard-modal-description" className="text-blue-100 font-medium">
                  Top word-building champions and their achievements
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-2 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
              aria-label="Cerrar tabla de clasificación"
              tabIndex={0}
            >
              <X size={24} aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Filters con mejor accesibilidad */}
        <section className="bg-gray-100 border-t-2 border-gray-300 px-6 py-4 border-b" aria-labelledby="filters-section">
          <h2 id="filters-section" className="sr-only">Filtros y opciones de clasificación</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-700" aria-hidden="true" />
              <span className="text-sm font-bold text-gray-800">Filters:</span>
            </div>
            <label htmlFor="difficulty-filter" className="sr-only">
              Filtrar por dificultad
            </label>
            <select
              id="difficulty-filter"
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border-2 border-gray-400 rounded-lg text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600"
              aria-label="Seleccionar nivel de dificultad para filtrar resultados"
              tabIndex={0}
            >
              {DIFFICULTIES.map(d => (
                <option key={d} value={d}>{d === 'All' ? 'All Difficulties' : d}</option>
              ))}
            </select>
            <div className="text-sm text-gray-700 font-medium" role="status" aria-live="polite">
              {loading ? 'Loading scores...' : `${sortedScores.length} scores found`}
            </div>
          </div>
        </section>

        {/* Content con mejor estructura y accesibilidad */}
        <main className="overflow-y-auto max-h-[calc(90vh-200px)]" role="main">
          {loading ? (
            <div className="p-8 text-center" role="status" aria-live="polite">
              <div className="text-lg font-medium text-gray-800">Loading leaderboard data...</div>
              <p className="text-gray-600 mt-2">Please wait while we fetch the latest scores</p>
            </div>
          ) : sortedScores.length === 0 ? (
            <div className="p-8 text-center">
              <Trophy size={48} className="mx-auto text-gray-400 mb-4" aria-hidden="true" />
              <h2 className="text-lg font-bold text-gray-700 mb-2">No scores found</h2>
              <p className="text-gray-600 font-medium">Try adjusting your filters or play a game to see scores here!</p>
            </div>
          ) : (
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full" role="table" aria-label="Leaderboard rankings with player scores and statistics">
                  <thead>
                    <tr className="border-b-2 border-gray-300 bg-gray-50">
                      <th className="text-left py-4 px-4 font-bold text-gray-800" scope="col">
                        Rank
                      </th>
                      <th className="text-left py-4 px-4 font-bold text-gray-800" scope="col">
                        Player Name
                      </th>
                      <th 
                        className="text-left py-4 px-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleSort('score')}
                        scope="col"
                        tabIndex={0}
                        role="button"
                        aria-label={`Sort by score ${sortBy === 'score' ? (sortOrder === 'asc' ? 'descending' : 'ascending') : 'descending'}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('score');
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          Total Score
                          {sortBy === 'score' && (
                            sortOrder === 'asc' ? 
                            <ArrowUp size={16} className="text-blue-600" aria-hidden="true" /> : 
                            <ArrowDown size={16} className="text-blue-600" aria-hidden="true" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left py-4 px-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleSort('stars')}
                        scope="col"
                        tabIndex={0}
                        role="button"
                        aria-label={`Sort by stars ${sortBy === 'stars' ? (sortOrder === 'asc' ? 'descending' : 'ascending') : 'descending'}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('stars');
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Star size={16} className="text-yellow-600" aria-hidden="true" />
                          Stars Earned
                          {sortBy === 'stars' && (
                            sortOrder === 'asc' ? 
                            <ArrowUp size={16} className="text-blue-600" aria-hidden="true" /> : 
                            <ArrowDown size={16} className="text-blue-600" aria-hidden="true" />
                          )}
                        </div>
                      </th>
                      <th 
                        className="text-left py-4 px-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleSort('wordsFound')}
                        scope="col"
                        tabIndex={0}
                        role="button"
                        aria-label={`Sort by words found ${sortBy === 'wordsFound' ? (sortOrder === 'asc' ? 'descending' : 'ascending') : 'descending'}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('wordsFound');
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Book size={16} className="text-green-600" aria-hidden="true" />
                          Words Found
                          {sortBy === 'wordsFound' && (
                            sortOrder === 'asc' ? 
                            <ArrowUp size={16} className="text-blue-600" aria-hidden="true" /> : 
                            <ArrowDown size={16} className="text-blue-600" aria-hidden="true" />
                          )}
                        </div>
                      </th>
                      <th className="text-left py-4 px-4 font-bold text-gray-800" scope="col">
                        Difficulty Level
                      </th>
                      <th className="text-left py-4 px-4 font-bold text-gray-800" scope="col">
                        Time Spent
                      </th>
                      <th 
                        className="text-left py-4 px-4 font-bold text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleSort('date')}
                        scope="col"
                        tabIndex={0}
                        role="button"
                        aria-label={`Sort by date ${sortBy === 'date' ? (sortOrder === 'asc' ? 'descending' : 'ascending') : 'descending'}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleSort('date');
                          }
                        }}
                      >
                        <div className="flex items-center gap-2">
                          Date Played
                          {sortBy === 'date' && (
                            sortOrder === 'asc' ? 
                            <ArrowUp size={16} className="text-blue-600" aria-hidden="true" /> : 
                            <ArrowDown size={16} className="text-blue-600" aria-hidden="true" />
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedScores.map((score, index) => (
                      <tr key={score.id} className="border-b-2 border-gray-200 hover:bg-blue-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {index < 3 ? (
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-lg border-2 ${
                                index === 0 ? 'bg-yellow-500 border-yellow-600' : 
                                index === 1 ? 'bg-gray-500 border-gray-600' : 'bg-orange-500 border-orange-600'
                              }`} aria-label={`${index === 0 ? 'First' : index === 1 ? 'Second' : 'Third'} place`}>
                                {index + 1}
                              </div>
                            ) : (
                              <span className="text-gray-700 font-bold text-lg w-8 text-center" aria-label={`Rank ${index + 1}`}>
                                {index + 1}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold text-gray-900 text-lg">{score.playerName}</td>
                        <td className="py-4 px-4 font-bold text-blue-700 text-xl">{score.score}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Star size={18} className="text-yellow-600 fill-current" aria-hidden="true" />
                            <span className="font-bold text-gray-800 text-lg">{score.stars}</span>
                            <span className="sr-only">stars earned</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 font-bold text-gray-800 text-lg">{score.wordsFound}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-2 rounded-lg text-sm font-bold border-2 ${getDifficultyBadge(score.difficulty)}`}>
                            {score.difficulty}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-blue-600" aria-hidden="true" />
                            <span>{formatTime(score.timeSpent)}</span>
                            <span className="sr-only">minutes and seconds</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-700 font-medium">
                          {formatDate(score.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-700 font-medium" role="status" aria-live="polite">
              Showing top vocabulary challenge scores
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-bold focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2"
              aria-label="Close vocabulary leaderboard modal"
            >
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default VocabularyLeaderboardModal; 