import React, { useState } from 'react';
import GameModeSelection from './components/GameModeSelection';
import InstructionsModal from './components/InstructionsModal';
import LeaderboardModal from './components/LeaderboardModal';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';
import WordshakeGame from './components/WordshakeGame';
import WordshakeHome from './components/WordshakeHome';

type AppState = 'mode-selection' | 'wordshake-home' | 'wordshake-game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('mode-selection');
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [showRegister, setShowRegister] = useState<boolean>(false);

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
    setShowLeaderboard(true);
  };

  return (
    <>
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onSwitch={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onSwitch={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      {currentScreen === 'mode-selection' && (
        <GameModeSelection 
          onSelectMode={handleModeSelection}
          onShowLogin={() => setShowLogin(true)}
        />
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

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        scores={[]}
      />
    </>
  );
}

export default App;