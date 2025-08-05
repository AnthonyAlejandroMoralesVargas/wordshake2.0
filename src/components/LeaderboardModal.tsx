import { Trophy, X } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

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
  // Hooks SIEMPRE van al inicio, antes de cualquier return
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLHeadingElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap effect
  useEffect(() => {
    if (isOpen) {
      // Focus the first element when modal opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);

      // Handle Tab key to trap focus
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (!isOpen) return null;

  // Ordenar los puntajes de mayor a menor
  const sortedScores = [...scores].sort((a, b) => b.score - a.score).slice(0, 10);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-md w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaderboard-title"
        aria-describedby="leaderboard-description"
      >
        {/* Header */}
        <header className="p-6 pb-4 border-b border-gray-200" role="banner">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2" role="group" aria-labelledby="leaderboard-title">
              <Trophy size={32} className="text-yellow-500" aria-hidden="true" />
              <h2 
                id="leaderboard-title"
                ref={firstFocusableRef}
                className="text-2xl font-bold text-gray-800"
                tabIndex={0}
                aria-label="Leaderboard - Top player scores"
              >
                Leaderboard
              </h2>
            </div>
            <button
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="p-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors"
              tabIndex={0}
              aria-label="Close leaderboard modal"
            >
              <X size={24} className="text-gray-600" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6" role="main">
          <div 
            id="leaderboard-description"
            className="bg-blue-50 rounded-lg p-4 mb-4"
            role="region"
            aria-label="Top 10 player scores table"
          >
            <table className="w-full text-left" role="table" aria-label="Leaderboard rankings">
              <thead role="rowgroup">
                <tr role="row">
                  <th 
                    className="py-2 px-2 text-gray-700 font-semibold" 
                    role="columnheader"
                    tabIndex={0}
                    aria-label="Rank position"
                  >
                    #
                  </th>
                  <th 
                    className="py-2 px-2 text-gray-700 font-semibold" 
                    role="columnheader"
                    tabIndex={0}
                    aria-label="Player nickname"
                  >
                    Nickname
                  </th>
                  <th 
                    className="py-2 px-2 text-gray-700 font-semibold" 
                    role="columnheader"
                    tabIndex={0}
                    aria-label="Player score"
                  >
                    Score
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup">
                {sortedScores.length === 0 ? (
                  <tr role="row">
                    <td 
                      colSpan={3} 
                      className="text-center text-gray-500 py-4"
                      role="cell"
                      tabIndex={0}
                      aria-label="No scores available yet"
                    >
                      No scores yet.
                    </td>
                  </tr>
                ) : (
                  sortedScores.map((entry, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-blue-100 focus-within:bg-blue-100 rounded" 
                      role="row"
                      tabIndex={0}
                      aria-label={`Rank ${idx + 1}: ${entry.nickname} with ${entry.score} points`}
                    >
                      <td className="py-2 px-2 font-semibold" role="cell">{idx + 1}</td>
                      <td className="py-2 px-2" role="cell">{entry.nickname}</td>
                      <td className="py-2 px-2" role="cell">{entry.score}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>

        {/* Footer */}
        <footer className="p-6 pt-4 text-center border-t border-gray-200" role="contentinfo">
          <button
            ref={lastFocusableRef}
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            className="bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            tabIndex={0}
            aria-label="Close leaderboard and return to game"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default LeaderboardModal; 