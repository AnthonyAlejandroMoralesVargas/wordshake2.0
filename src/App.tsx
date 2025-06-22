import React, { useState } from 'react';
import GameModeSelection from './components/GameModeSelection';
import WordshakeHome from './components/WordshakeHome';
import WordshakeGame from './components/WordshakeGame';
import ListeningHome from './components/ListeningHome';
import ListeningGame from './components/ListeningGame';
import GrammarHome from './components/GrammarHome';
import GrammarGame from './components/GrammarGame';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

type AppState = 'mode-selection' | 'wordshake-home' | 'wordshake-game' | 'listening-home' | 'listening-game' | 'grammar-home' | 'grammar-game';

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppState>('mode-selection');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('beginner');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleModeSelection = (mode: string) => {
    if (mode === 'vocabulary') {
      setCurrentScreen('wordshake-home');
    } else if (mode === 'listening') {
      setCurrentScreen('listening-home');
    } else if (mode === 'grammar') {
      setCurrentScreen('grammar-home');
    }
  };

  const handleShowLogin = () => {
    setShowLoginModal(true);
  };

  const handleCloseLogin = () => {
    setShowLoginModal(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleCloseRegister = () => {
    setShowRegisterModal(false);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const handleStartGame = () => {
    setCurrentScreen('wordshake-game');
  };

  const handleStartListeningGame = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentScreen('listening-game');
  };

  const handleStartGrammarGame = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setCurrentScreen('grammar-game');
  };

  const handleBackToModeSelection = () => {
    setCurrentScreen('mode-selection');
  };

  const handleBackToWordshakeHome = () => {
    setCurrentScreen('wordshake-home');
  };

  const handleBackToListeningHome = () => {
    setCurrentScreen('listening-home');
  };

  const handleBackToGrammarHome = () => {
    setCurrentScreen('grammar-home');
  };

  const handleShowInstructions = () => {
    // This is now handled by each individual game
  };

  const handleShowLeaderboard = () => {
    // This is now handled by each individual game
  };

  return (
    <>
      {currentScreen === 'mode-selection' && (
        <GameModeSelection onSelectMode={handleModeSelection} onShowLogin={handleShowLogin} />
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

      {currentScreen === 'listening-home' && (
        <ListeningHome
          onStartGame={handleStartListeningGame}
          onShowInstructions={handleShowInstructions}
          onShowLeaderboard={handleShowLeaderboard}
          onBack={handleBackToModeSelection}
        />
      )}

      {currentScreen === 'listening-game' && (
        <ListeningGame 
          onHome={handleBackToListeningHome} 
          selectedDifficulty={selectedDifficulty}
        />
      )}

      {currentScreen === 'grammar-home' && (
        <GrammarHome
          onBack={handleBackToModeSelection}
          onStartGame={handleStartGrammarGame}
        />
      )}

      {currentScreen === 'grammar-game' && (
        <GrammarGame
          difficulty={selectedDifficulty}
          onBack={handleBackToGrammarHome}
        />
      )}

      <LoginModal
        isOpen={showLoginModal}
        onClose={handleCloseLogin}
        onSwitch={handleSwitchToRegister}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={handleCloseRegister}
        onSwitch={handleSwitchToLogin}
      />
    </>
  );
}

export default App;