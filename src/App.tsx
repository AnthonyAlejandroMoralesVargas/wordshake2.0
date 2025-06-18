import React, { useState } from 'react';
import GameModeSelection from './components/GameModeSelection';
import WordshakeHome from './components/WordshakeHome';
import WordshakeGame from './components/WordshakeGame';
import InstructionsModal from './components/InstructionsModal';

type AppState = 'mode-selection' | 'wordshake-home' | 'wordshake-game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('mode-selection');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);

  const handleModeSelection = (mode: string) => {
    if (mode === 'vocabulary') {
      setCurrentScreen('wordshake-home');
    }
  };

  const handleStartGame = () => {
    setCurrentScreen('wordshake-game');
  };

  const handleBackToModeSelection = () => {
    setCurrentScreen('mode-selection');
  };

  const handleBackToWordshakeHome = () => {
    setCurrentScreen('wordshake-home');
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  const handleShowLeaderboard = () => {
    alert('Leaderboard feature coming soon!');
  };

  return (
    <>
      {currentScreen === 'mode-selection' && (
        <GameModeSelection onSelectMode={handleModeSelection} />
      )}

      {currentScreen === 'wordshake-home' && (
        <WordshakeHome
          onStartGame={handleStartGame}
          onShowInstructions={handleShowInstructions}
          onShowLeaderboard={handleShowLeaderboard}
          onBack={handleBackToModeSelection}
        />
      )}

      {currentScreen === 'wordshake-game' && (
        <WordshakeGame onHome={handleBackToWordshakeHome} />
      )}

      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </>
  );
}

export default App;