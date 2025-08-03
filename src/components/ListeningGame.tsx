import { ArrowLeft, BarChart3, Check, HelpCircle, Play, RotateCcw, SkipBack, Timer } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { getExerciseByVideoId, getRandomVideo, validateExercises } from '../data/listeningData';
import { ListeningExercise, VideoData } from '../types';
import { calculateListeningScore } from '../utils/scoreUtils';
import ConfirmationModal from './ConfirmationModal';
import CustomYouTubePlayer from './CustomYouTubePlayer';
import ListeningInstructionsModal from './ListeningInstructionsModal';
import ListeningLeaderboardModal from './ListeningLeaderboardModal';
import ListeningResultsModal from './ListeningResultsModal';

interface ListeningGameProps {
  onHome: () => void;
  selectedDifficulty: string;
}

const ListeningGame: React.FC<ListeningGameProps> = ({ onHome, selectedDifficulty }) => {
  const [currentVideo, setCurrentVideo] = useState<VideoData | null>(null);
  const [currentExercise, setCurrentExercise] = useState<ListeningExercise | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [showHomeConfirmation, setShowHomeConfirmation] = useState<boolean>(false);
  const [showRestartConfirmation, setShowRestartConfirmation] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<{ [key: number]: boolean }>({});
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [highlightedBlank, setHighlightedBlank] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [leaderboardFromResults, setLeaderboardFromResults] = useState<boolean>(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [gameEndTime, setGameEndTime] = useState<number>(0);
  const [hintsUsed, setHintsUsed] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('Player');
  
  // Time and video restrictions
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [videoPlayCount, setVideoPlayCount] = useState<number>(0);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [showTimeWarning, setShowTimeWarning] = useState<boolean>(false);

  // Player state
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [seekToFunction, setSeekToFunction] = useState<((time: number) => void) | null>(null);

  // Get time limit based on difficulty
  const getTimeLimit = () => {
    switch (selectedDifficulty) {
      case 'beginner':
        return 0; // No time limit
      case 'intermediate':
        return 300; // 5 minutes
      case 'advanced':
        return 0; // No time limit for advanced
      default:
        return 0;
    }
  };

  // Get max video plays based on difficulty
  const getMaxVideoPlays = () => {
    switch (selectedDifficulty) {
      case 'beginner':
        return -1; // Unlimited
      case 'intermediate':
        return -1; // Unlimited
      case 'advanced':
        return 2; // Only 2 plays
      default:
        return -1;
    }
  };

  // Get max hints based on difficulty
  const getMaxHints = () => {
    switch (selectedDifficulty) {
      case 'beginner':
        return -1; // Unlimited hints
      case 'intermediate':
        return 2; // 2 hints maximum
      case 'advanced':
        return 0; // No hints
      default:
        return -1;
    }
  };

  // Get remaining hints
  const getRemainingHints = () => {
    const maxHints = getMaxHints();
    if (maxHints === -1) return -1; // Unlimited
    return Math.max(0, maxHints - hintsUsed);
  };

  useEffect(() => {
    initializeGame();
    // Validate all exercises on component mount
    validateExercises();
  }, [selectedDifficulty]);

  useEffect(() => {
    // Start timer immediately for intermediate level when game is initialized
    if (selectedDifficulty === 'intermediate' && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setIsTimeUp(true);
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeRemaining, selectedDifficulty]);

  // Show warning when 30 seconds remaining (only for Intermediate)
  useEffect(() => {
    if (timeRemaining === 30 && selectedDifficulty === 'intermediate') {
      setShowTimeWarning(true);
      setTimeout(() => setShowTimeWarning(false), 3000);
    }
  }, [timeRemaining, selectedDifficulty]);

  const initializeGame = () => {
    const video = getRandomVideo(selectedDifficulty);
    const exercise = getExerciseByVideoId(video.id);
    
    if (exercise) {
      setCurrentVideo(video);
      setCurrentExercise(exercise);
      setUserAnswers({});
      setScore(0);
      setGameStarted(false);
      setGameEnded(false);
      setShowHints({});
      setHighlightedBlank(null);
      setGameStartTime(0);
      setGameEndTime(0);
      setHintsUsed(0);
      setShowResults(false);
      setTimeRemaining(getTimeLimit());
      setVideoPlayCount(0);
      setIsTimeUp(false);
      setShowTimeWarning(false);
      setCurrentTime(0);
      setDuration(0);
      setIsPlaying(false);
    }
  };

  const handleAnswerChange = (blankId: number, value: string) => {
    if (!gameStarted) {
      setGameStarted(true);
      setGameStartTime(Date.now());
    }
    
    setUserAnswers(prev => ({
      ...prev,
      [blankId]: value
    }));
  };

  const handleShowHint = (blankId: number) => {
    const maxHints = getMaxHints();
    const remainingHints = getRemainingHints();

    // No hints allowed in Advanced level
    if (maxHints === 0) {
      return;
    }

    // Check if hints are available (only for limited hints, not unlimited)
    if (maxHints > 0 && remainingHints <= 0) {
      alert(`You have used all available hints (${maxHints}) for this level.`);
      return;
    }

    if (!showHints[blankId]) {
      setHintsUsed(prev => prev + 1);
    }
    
    setShowHints(prev => ({
      ...prev,
      [blankId]: !prev[blankId]
    }));
  };

  const handleSeekToBlank = (blankId: number) => {
    // No skip to blank allowed in Advanced level
    if (selectedDifficulty === 'advanced') {
      return;
    }

    if (currentExercise && seekToFunction) {
      const blank = currentExercise.blanks.find(b => b.id === blankId);
      if (blank) {
        seekToFunction(blank.startTime);
        setHighlightedBlank(blankId);
      }
    }
  };

  const handleTimeUp = () => {
    if (!gameEnded) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (!currentExercise) return;

    setGameEndTime(Date.now());
    const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000);

    let correctAnswers = 0;
    const totalBlanks = currentExercise.blanks.length;

    currentExercise.blanks.forEach(blank => {
      const userAnswer = userAnswers[blank.id] || '';
      if (userAnswer.toLowerCase().trim() === blank.word.toLowerCase()) {
        correctAnswers++;
      }
    });

    const finalScore = calculateListeningScore(
      correctAnswers,
      totalBlanks,
      timeSpent,
      hintsUsed
    );

    setScore(finalScore);
    setGameEnded(true);
    setShowResults(true);
  };

  const handlePlayAgain = () => {
    setShowResults(false);
    initializeGame();
  };

  const handleGoHome = () => {
    setShowResults(false);
    onHome();
  };

  const handleHomeClick = () => {
    if (gameStarted && !gameEnded) {
      setShowHomeConfirmation(true);
    } else {
      onHome();
    }
  };

  const handleRestartClick = () => {
    setShowRestartConfirmation(true);
  };

  const handleConfirmHome = () => {
    setShowHomeConfirmation(false);
    onHome();
  };

  const handleConfirmRestart = () => {
    setShowRestartConfirmation(false);
    initializeGame();
  };

  const getDifficultyColor = () => {
    switch (selectedDifficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-blue-600 bg-blue-100';
      case 'advanced':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = () => {
    switch (selectedDifficulty) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🎯';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle player events
  const handlePlayerTimeUpdate = (time: number) => {
    setCurrentTime(time);
    // Highlight current blank based on time (only for Basic and Intermediate)
    if (currentExercise && selectedDifficulty !== 'advanced') {
      const currentBlank = currentExercise.blanks.find(
        blank => time >= blank.startTime && time <= blank.endTime
      );
      setHighlightedBlank(currentBlank?.id || null);
    }
  };

  const handlePlayerPlay = () => {
    setIsPlaying(true);
  };

  const handlePlayerPause = () => {
    setIsPlaying(false);
  };

  const handlePlayerPlayCountChange = (count: number) => {
    setVideoPlayCount(count);
  };

  const handleSeekTo = (seekFunction: (time: number) => void) => {
    setSeekToFunction(() => seekFunction);
  };

  const renderParagraph = () => {
    if (!currentExercise) return null;

    const words = currentExercise.paragraph.split(' ');
    const blankSpaces = words.filter(word => word === '___').length;
    const blanksCount = currentExercise.blanks.length;

    // Validation: ensure blanks match spaces
    if (blankSpaces !== blanksCount) {
      console.error(`Mismatch: ${blankSpaces} spaces found, ${blanksCount} blanks defined`);
      return (
        <div className="text-red-600 p-4 border border-red-300 rounded">
          <strong>Error:</strong> Exercise configuration mismatch. 
          Found {blankSpaces} spaces but {blanksCount} blanks are defined.
          <br />
          <small>Exercise ID: {currentExercise.id}</small>
        </div>
      );
    }

    let blankIndex = 0;

    return (
      <div className="text-lg leading-relaxed">
        {words.map((word, index) => {
          if (word === '___') {
            const blank = currentExercise.blanks[blankIndex];
            const userAnswer = userAnswers[blank.id] || '';
            const showHint = showHints[blank.id];
            const isHighlighted = highlightedBlank === blank.id;
            blankIndex++;

            return (
              <span key={index} className="inline-block mx-1 relative align-middle">
                <input
                  type="text"
                  value={userAnswer}
                  onChange={(e) => handleAnswerChange(blank.id, e.target.value)}
                  className={`w-24 px-2 py-1 border-2 rounded text-center font-medium focus:outline-none transition-all duration-300 ${
                    isHighlighted && selectedDifficulty !== 'advanced'
                      ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                      : 'border-blue-300 focus:border-blue-500'
                  }`}
                  placeholder="..."
                  disabled={gameEnded || isTimeUp}
                />
                <div className="flex gap-1 mt-1">
                  {/* Hint button - only for Basic and Intermediate */}
                  {getMaxHints() !== 0 && (
                    <button
                      onClick={() => handleShowHint(blank.id)}
                      disabled={getMaxHints() > 0 && getRemainingHints() === 0 && !showHints[blank.id]}
                      className={`transition-colors ${
                        getMaxHints() > 0 && getRemainingHints() === 0 && !showHints[blank.id]
                          ? 'text-gray-400 cursor-not-allowed'
                          : 'text-blue-500 hover:text-blue-700'
                      }`}
                      title={
                        getMaxHints() > 0 && getRemainingHints() === 0 && !showHints[blank.id]
                          ? 'No hints remaining'
                          : 'Show hint'
                      }
                    >
                      <HelpCircle size={14} />
                    </button>
                  )}
                  {/* Skip button - only for Basic and Intermediate */}
                  {selectedDifficulty !== 'advanced' && (
                    <button
                      onClick={() => handleSeekToBlank(blank.id)}
                      className="text-green-500 hover:text-green-700 transition-colors"
                      title="Go to this part in video"
                    >
                      <SkipBack size={14} />
                    </button>
                  )}
                </div>
                {showHint && getMaxHints() !== 0 && (
                  <div className="absolute mt-1 text-sm text-gray-600 bg-yellow-100 p-2 rounded shadow-md z-10 min-w-48">
                    <strong>Hint:</strong> {blank.hint}
                  </div>
                )}
              </span>
            );
          }
          return <span key={index}>{word} </span>;
        })}
      </div>
    );
  };

  if (!currentVideo || !currentExercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleHomeClick}
            className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
          >
            <ArrowLeft size={20} />
            Home
          </button>
          
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor()}`}>
              <span className="mr-1">{getDifficultyIcon()}</span>
              {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}
            </div>
            
            {/* Time Remaining - only for Intermediate */}
            {selectedDifficulty === 'intermediate' && timeRemaining > 0 && (
              <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                timeRemaining <= 30 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
              }`}>
                <Timer size={16} className="inline mr-1" />
                {formatTime(timeRemaining)}
              </div>
            )}

            {/* Video Play Count - only for Advanced */}
            {selectedDifficulty === 'advanced' && (
              <div className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-600">
                <Play size={16} className="inline mr-1" />
                {videoPlayCount}/{getMaxVideoPlays()} plays
              </div>
            )}

            <div className="bg-white bg-opacity-80 px-4 py-2 rounded-lg shadow-md">
              <span className="font-bold text-gray-800">Score: {score}</span>
            </div>
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <HelpCircle size={20} />
              Instructions
            </button>
            <button
              onClick={() => setShowLeaderboard(true)}
              className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <BarChart3 size={20} />
              Leaderboard
            </button>
            <button
              onClick={handleRestartClick}
              className="flex items-center gap-2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
            >
              <RotateCcw size={20} />
              Restart
            </button>
          </div>
        </div>

        {/* Time Warning - only for Intermediate */}
        {showTimeWarning && selectedDifficulty === 'intermediate' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            <strong>Warning:</strong> Only 30 seconds remaining!
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Video Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Watch & Listen</h2>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <CustomYouTubePlayer
                  videoId={currentVideo.youtubeId}
                  onTimeUpdate={handlePlayerTimeUpdate}
                  onPlay={handlePlayerPlay}
                  onPause={handlePlayerPause}
                  maxPlays={getMaxVideoPlays()}
                  currentPlayCount={videoPlayCount}
                  onPlayCountChange={handlePlayerPlayCountChange}
                  disabled={selectedDifficulty === 'advanced' && videoPlayCount >= getMaxVideoPlays()}
                  seekTo={handleSeekTo}
                  allowProgressControl={selectedDifficulty !== 'advanced'}
                />
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-800">{currentVideo.title}</h3>
                <p className="text-sm text-gray-600">
                  Difficulty: {currentVideo.difficulty} | Duration: {currentVideo.duration}
                </p>
              </div>
            </div>
          </div>

          {/* Exercise Section */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Fill in the Blanks</h2>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                {renderParagraph()}
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  {Object.keys(userAnswers).length} of {currentExercise.blanks.length} blanks filled
                  {getRemainingHints() > 0 && selectedDifficulty !== 'advanced' && (
                    <span className="ml-2 text-orange-600">
                      (Hints used: {hintsUsed})
                    </span>
                  )}
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(userAnswers).length < currentExercise.blanks.length || gameEnded || isTimeUp}
                  className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md disabled:cursor-not-allowed"
                >
                  <Check size={20} />
                  Submit Answers
                </button>
              </div>
            </div>

            {/* Game Stats */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Game Stats</h3>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-600">{score}</div>
                  <div className="text-sm text-green-700">Current Score</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {getMaxHints() === -1 ? '∞' : getRemainingHints()}
                  </div>
                  <div className="text-sm text-blue-700">
                    {getMaxHints() === -1 ? 'Unlimited Hints' : 'Remaining Hints'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modals */}
        <ConfirmationModal
          isOpen={showHomeConfirmation}
          onCancel={() => setShowHomeConfirmation(false)}
          onConfirm={handleConfirmHome}
          title="Leave Game?"
          message="Are you sure you want to leave? Your progress will be lost."
        />

        <ConfirmationModal
          isOpen={showRestartConfirmation}
          onCancel={() => setShowRestartConfirmation(false)}
          onConfirm={handleConfirmRestart}
          title="Restart Game?"
          message="Are you sure you want to restart? Your current progress will be lost."
        />

        {/* Instructions Modal */}
        <ListeningInstructionsModal
          isOpen={showInstructions}
          onClose={() => setShowInstructions(false)}
        />

        {/* Leaderboard Modal */}
        <ListeningLeaderboardModal
          isOpen={showLeaderboard}
          onClose={() => {
            setShowLeaderboard(false);
            setLeaderboardFromResults(false);
          }}
          onBackToResults={leaderboardFromResults ? () => {
            setShowLeaderboard(false);
            setShowResults(true);
            setLeaderboardFromResults(false);
          } : undefined}
        />

        {/* Results Modal */}
        {currentExercise && (
          <ListeningResultsModal
            isOpen={showResults}
            onClose={() => setShowResults(false)}
            onPlayAgain={handlePlayAgain}
            onGoHome={handleGoHome}
            onLeaderboard={() => {
              setShowResults(false);
              setLeaderboardFromResults(true);
              setShowLeaderboard(true);
            }}
            exercise={currentExercise}
            userAnswers={userAnswers}
            score={score}
            timeSpent={Math.floor((gameEndTime - gameStartTime) / 1000)}
            hintsUsed={hintsUsed}
            difficulty={selectedDifficulty}
          />
        )}
      </div>
    </div>
  );
};

export default ListeningGame; 