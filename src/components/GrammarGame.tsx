import React, { useState, useEffect, useRef } from 'react';
import { GrammarSession, GrammarSentence, GrammarGameState } from '../types';
import { getRandomSession } from '../data/grammarData';
import ConfirmationModal from './ConfirmationModal';
import GrammarInstructionsModal from './GrammarInstructionsModal';
import GrammarResultsModal from './GrammarResultsModal';
import GrammarLeaderboardModal from './GrammarLeaderboardModal';

interface GrammarGameProps {
  difficulty: string;
  onBack: () => void;
}

const GrammarGame: React.FC<GrammarGameProps> = ({ difficulty, onBack }) => {
  const [gameState, setGameState] = useState<GrammarGameState>({
    currentSession: null,
    currentSentenceIndex: 0,
    isPlaying: false,
    isRecording: false,
    gameStarted: false,
    gameEnded: false,
    startTime: 0,
    endTime: 0,
    totalTime: 0
  });

  const [showInstructions, setShowInstructions] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showRestartConfirm, setShowRestartConfirm] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [microphone, setMicrophone] = useState<MediaStreamAudioSourceNode | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [transcript, setTranscript] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [userRecording, setUserRecording] = useState<Blob | null>(null);
  const [isPlayingUserRecording, setIsPlayingUserRecording] = useState(false);
  const [recordingSatisfied, setRecordingSatisfied] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    const initSpeechRecognition = () => {
      try {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
          const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
          const recognitionInstance = new SpeechRecognition();
          recognitionInstance.continuous = false;
          recognitionInstance.interimResults = false;
          recognitionInstance.lang = 'en-US';
          recognitionInstance.maxAlternatives = 1;

          recognitionInstance.onresult = (event: any) => {
            console.log('Speech recognition result:', event);
            if (event.results && event.results.length > 0) {
              const transcript = event.results[0][0].transcript;
              console.log('Transcript:', transcript);
              setTranscript(transcript);
              // Don't auto-check answer, let user decide
            }
          };

          recognitionInstance.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            setGameState(prev => ({ ...prev, isRecording: false }));
            
            if (event.error === 'not-allowed') {
              alert('Microphone access denied. Please allow microphone access and try again.');
            } else if (event.error === 'no-speech') {
              alert('No speech detected. Please speak clearly and try again.');
            } else {
              alert(`Speech recognition error: ${event.error}. Please try again.`);
            }
          };

          recognitionInstance.onend = () => {
            console.log('Speech recognition ended');
            setIsListening(false);
            setGameState(prev => ({ ...prev, isRecording: false }));
          };

          recognitionInstance.onstart = () => {
            console.log('Speech recognition started');
          };

          setRecognition(recognitionInstance);
          console.log('Speech recognition initialized successfully');
        } else {
          console.error('Speech recognition not supported in this browser');
          alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
        }
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
        alert('Error initializing speech recognition. Please refresh the page and try again.');
      }
    };

    // Initialize audio context for visualization
    const initAudioContext = async () => {
      try {
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(context);
        console.log('Audio context initialized successfully');
      } catch (error) {
        console.error('Error initializing audio context:', error);
      }
    };

    initSpeechRecognition();
    initAudioContext();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = '';
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (gameState.currentSession && gameState.currentSentenceIndex >= gameState.currentSession.sentences.length) {
      endGame();
    }
  }, [gameState.currentSentenceIndex, gameState.currentSession]);

  // Clean up when sentence changes
  useEffect(() => {
    return () => {
      // Clean up when component unmounts or sentence changes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setUserRecording(null);
      setTranscript('');
      setRecordingSatisfied(false);
      setAudioChunks([]);
      setMediaRecorder(null);
      setMicrophone(null);
      setAnalyser(null);
      setIsListening(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
    };
  }, [gameState.currentSentenceIndex]);

  const startGame = () => {
    const session = getRandomSession(difficulty);
    const startTime = Date.now();
    setGameState(prev => ({
      ...prev,
      currentSession: session,
      gameStarted: true,
      startTime
    }));
    setShowInstructions(false);
  };

  const endGame = () => {
    const endTime = Date.now();
    const totalTime = endTime - gameState.startTime;
    setGameState(prev => ({
      ...prev,
      gameEnded: true,
      endTime,
      totalTime
    }));
    setShowResults(true);
  };

  const playSentence = async () => {
    if (!gameState.currentSession) return;

    const currentSentence = gameState.currentSession.sentences[gameState.currentSentenceIndex];
    
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentSentence.text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      
      utterance.onstart = () => {
        setGameState(prev => ({ ...prev, isPlaying: true }));
      };
      
      utterance.onend = () => {
        setGameState(prev => ({ ...prev, isPlaying: false }));
      };

      speechSynthesis.speak(utterance);
    }
  };

  const startRecording = async () => {
    console.log('Starting recording...');
    console.log('Recognition available:', !!recognition);
    console.log('Audio context available:', !!audioContext);

    if (!recognition) {
      alert('Speech recognition not initialized. Please refresh the page and try again.');
      return;
    }

    if (!audioContext) {
      alert('Audio context not initialized. Please refresh the page and try again.');
      return;
    }

    try {
      console.log('Requesting microphone access...');
      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      streamRef.current = stream;
      console.log('Microphone access granted');
      
      // Resume audio context if suspended
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      // Set up audio visualization
      const source = audioContext.createMediaStreamSource(stream);
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      source.connect(analyserNode);
      
      setMicrophone(source);
      setAnalyser(analyserNode);
      setIsListening(true);
      
      // Set up MediaRecorder for audio recording
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };
      
      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setUserRecording(blob);
        setAudioChunks(chunks);
        console.log('Recording saved, blob size:', blob.size);
      };
      
      setMediaRecorder(recorder);
      recorder.start();
      
      console.log('Starting speech recognition...');
      // Start speech recognition
      recognition.start();
      setGameState(prev => ({ ...prev, isRecording: true }));
      
      console.log('Recording started successfully');
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsListening(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('Microphone access denied. Please allow microphone access in your browser settings and try again.');
        } else if (error.name === 'NotFoundError') {
          alert('No microphone found. Please connect a microphone and try again.');
        } else {
          alert(`Error accessing microphone: ${error.message}. Please try again.`);
        }
      } else {
        alert('Error accessing microphone. Please try again.');
      }
    }
  };

  const stopRecording = () => {
    console.log('Stopping recording...');
    
    try {
      if (recognition) {
        console.log('Stopping speech recognition...');
        recognition.stop();
      }
      
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        console.log('Stopping media recorder...');
        mediaRecorder.stop();
      }
      
      if (microphone) {
        console.log('Disconnecting microphone...');
        microphone.disconnect();
      }
      
      // Don't stop the stream here, keep it for potential re-recording
      // Only disconnect the audio nodes
      setMicrophone(null);
      setAnalyser(null);
      setIsListening(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
      
      console.log('Recording stopped successfully');
    } catch (error) {
      console.error('Error stopping recording:', error);
      // Still reset the state even if there's an error
      setMicrophone(null);
      setAnalyser(null);
      setIsListening(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
    }
  };

  const playUserRecording = () => {
    if (!userRecording) {
      console.log('No recording to play');
      return;
    }
    
    try {
      console.log('Playing user recording...');
      const audio = new Audio(URL.createObjectURL(userRecording));
      setIsPlayingUserRecording(true);
      
      audio.onended = () => {
        console.log('User recording playback ended');
        setIsPlayingUserRecording(false);
      };
      
      audio.onerror = (error) => {
        console.error('Error playing user recording:', error);
        setIsPlayingUserRecording(false);
        alert('Error playing recording. Please try recording again.');
      };
      
      audio.play().catch(error => {
        console.error('Error starting playback:', error);
        setIsPlayingUserRecording(false);
        alert('Error playing recording. Please try recording again.');
      });
    } catch (error) {
      console.error('Error creating audio object:', error);
      setIsPlayingUserRecording(false);
      alert('Error playing recording. Please try recording again.');
    }
  };

  const reRecord = () => {
    console.log('Starting re-recording...');
    
    // Clean up previous recording
    setUserRecording(null);
    setTranscript('');
    setRecordingSatisfied(false);
    setAudioChunks([]);
    setMediaRecorder(null);
    
    // Stop any existing stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Reset states
    setMicrophone(null);
    setAnalyser(null);
    setIsListening(false);
    setGameState(prev => ({ ...prev, isRecording: false }));
    
    // Start new recording after a short delay
    setTimeout(() => {
      startRecording();
    }, 100);
  };

  const submitRecording = () => {
    if (!userRecording || !transcript) {
      alert('Please record your pronunciation first.');
      return;
    }

    if (!gameState.currentSession) return;

    const currentSentence = gameState.currentSession.sentences[gameState.currentSentenceIndex];
    const correctAnswer = currentSentence.text.toLowerCase().trim();
    const userAnswerLower = transcript.toLowerCase().trim();
    
    // Simple similarity check (can be improved with more sophisticated algorithms)
    const similarity = calculateSimilarity(userAnswerLower, correctAnswer);
    const isAnswerCorrect = similarity > 0.7; // 70% similarity threshold
    
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    // Clean up recording resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    setTimeout(() => {
      setShowFeedback(false);
      setIsCorrect(null);
      setTranscript('');
      setUserRecording(null);
      setRecordingSatisfied(false);
      setAudioChunks([]);
      setMediaRecorder(null);
      setMicrophone(null);
      setAnalyser(null);
      setIsListening(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
      
      if (isAnswerCorrect) {
        // Move to next sentence
        setGameState(prev => ({
          ...prev,
          currentSentenceIndex: prev.currentSentenceIndex + 1
        }));
      }
    }, 2000);
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.split(' ').filter(word => word.length > 0);
    const words2 = str2.split(' ').filter(word => word.length > 0);
    
    if (words1.length === 0 || words2.length === 0) return 0;
    
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
  };

  const drawVisualization = () => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3B82F6';
    
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] / 2;
      ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
      x += barWidth + 1;
    }

    animationRef.current = requestAnimationFrame(drawVisualization);
  };

  useEffect(() => {
    if (isListening && analyser) {
      drawVisualization();
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, [isListening, analyser]);

  const restartGame = () => {
    // Stop any ongoing recordings
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    setGameState({
      currentSession: null,
      currentSentenceIndex: 0,
      isPlaying: false,
      isRecording: false,
      gameStarted: false,
      gameEnded: false,
      startTime: 0,
      endTime: 0,
      totalTime: 0
    });
    setShowResults(false);
    setShowRestartConfirm(false);
    setShowInstructions(true);
    setUserRecording(null);
    setTranscript('');
    setRecordingSatisfied(false);
    setAudioChunks([]);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  const exitGame = () => {
    // Stop any ongoing recordings
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    onBack();
  };

  const saveScore = (playerName: string) => {
    if (!gameState.currentSession) return;

    const score: any = {
      id: Date.now().toString(),
      playerName,
      sessionTitle: gameState.currentSession.title,
      difficulty: gameState.currentSession.difficulty,
      totalTime: gameState.totalTime,
      date: new Date().toISOString(),
      sentencesCompleted: gameState.currentSentenceIndex,
      totalSentences: gameState.currentSession.sentences.length
    };

    const existingScores = JSON.parse(localStorage.getItem('grammarScores') || '[]');
    existingScores.push(score);
    localStorage.setItem('grammarScores', JSON.stringify(existingScores));
  };

  if (showInstructions) {
    return (
      <GrammarInstructionsModal
        difficulty={difficulty}
        onStart={startGame}
        onBack={onBack}
      />
    );
  }

  if (showResults) {
    return (
      <GrammarResultsModal
        totalTime={gameState.totalTime}
        sentencesCompleted={gameState.currentSentenceIndex}
        totalSentences={gameState.currentSession?.sentences.length || 0}
        sessionTitle={gameState.currentSession?.title || ''}
        difficulty={difficulty}
        onSaveScore={saveScore}
        onRestart={() => setShowRestartConfirm(true)}
        onLeaderboard={() => setShowLeaderboard(true)}
        onBack={onBack}
      />
    );
  }

  if (showLeaderboard) {
    return (
      <GrammarLeaderboardModal
        onBack={() => setShowLeaderboard(false)}
      />
    );
  }

  if (!gameState.currentSession) {
    return <div>Loading...</div>;
  }

  const currentSentence = gameState.currentSession.sentences[gameState.currentSentenceIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Grammar Practice</h1>
              <p className="text-gray-600">{gameState.currentSession.title}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowRestartConfirm(true)}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Restart
              </button>
              <button
                onClick={() => setShowExitConfirm(true)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Exit
              </button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Sentence {gameState.currentSentenceIndex + 1} of {gameState.currentSession.sentences.length}</span>
              <span>Time: {Math.floor((Date.now() - gameState.startTime) / 1000)}s</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((gameState.currentSentenceIndex + 1) / gameState.currentSession.sentences.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Current Sentence */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              {currentSentence.text}
            </h2>
            {currentSentence.translation && (
              <p className="text-lg text-gray-600 italic">
                {currentSentence.translation}
              </p>
            )}
            {currentSentence.grammarPoint && (
              <p className="text-sm text-blue-600 mt-2">
                Grammar: {currentSentence.grammarPoint}
              </p>
            )}
          </div>

          {/* Audio Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={playSentence}
              disabled={gameState.isPlaying}
              className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                gameState.isPlaying
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {gameState.isPlaying ? 'Playing...' : '🔊 Play Sentence'}
            </button>
          </div>

          {/* Recording Area */}
          <div className="text-center">
            {/* Status Indicator */}
            <div className="mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                !recognition 
                  ? 'bg-red-100 text-red-800' 
                  : isListening 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  !recognition 
                    ? 'bg-red-500' 
                    : isListening 
                      ? 'bg-green-500 animate-pulse' 
                      : 'bg-blue-500'
                }`}></div>
                {!recognition 
                  ? 'Speech recognition not available' 
                  : isListening 
                    ? 'Listening...' 
                    : 'Ready to record'
                }
              </div>
            </div>

            {/* Recording States */}
            {!isListening && !userRecording && (
              <button
                onClick={startRecording}
                disabled={!recognition}
                className={`px-8 py-4 rounded-full text-xl font-semibold transition-colors shadow-lg ${
                  !recognition
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                🎤 Start Recording
              </button>
            )}

            {isListening && (
              <div className="space-y-4">
                <button
                  onClick={stopRecording}
                  className="px-8 py-4 bg-gray-500 text-white rounded-full text-xl font-semibold hover:bg-gray-600 transition-colors shadow-lg"
                >
                  ⏹️ Stop Recording
                </button>
                
                {/* Audio Visualization */}
                <div className="mt-4">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={100}
                    className="border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-semibold">🎯 Speak the sentence clearly</p>
                  <p className="text-blue-600 text-sm mt-1">Make sure to pronounce each word correctly</p>
                </div>
              </div>
            )}

            {!isListening && userRecording && (
              /* Recording Review */
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Review Your Recording</h3>
                  {transcript && (
                    <p className="text-sm text-gray-600 mb-3">
                      <strong>You said:</strong> "{transcript}"
                    </p>
                  )}
                  
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={playUserRecording}
                      disabled={isPlayingUserRecording}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        isPlayingUserRecording
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {isPlayingUserRecording ? 'Playing...' : '🔊 Play Recording'}
                    </button>
                    
                    <button
                      onClick={reRecord}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
                    >
                      🎤 Record Again
                    </button>
                    
                    <button
                      onClick={submitRecording}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
                    >
                      ✅ Submit & Continue
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div className={`mt-6 p-4 rounded-lg text-center ${
              isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <p className="font-semibold">
                {isCorrect ? '✅ Correct! Moving to next sentence...' : '❌ Try again with better pronunciation'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modals */}
      {showExitConfirm && (
        <ConfirmationModal
          title="Exit Game"
          message="Are you sure you want to exit? Your progress will be lost."
          onConfirm={exitGame}
          onCancel={() => setShowExitConfirm(false)}
        />
      )}

      {showRestartConfirm && (
        <ConfirmationModal
          title="Restart Game"
          message="Are you sure you want to restart? Your current progress will be lost."
          onConfirm={restartGame}
          onCancel={() => setShowRestartConfirm(false)}
        />
      )}
    </div>
  );
};

export default GrammarGame; 