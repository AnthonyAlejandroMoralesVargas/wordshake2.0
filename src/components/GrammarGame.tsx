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
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);
  const [autoSavedScore, setAutoSavedScore] = useState(false);
  const [showAutoSaveFeedback, setShowAutoSaveFeedback] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalPossiblePoints, setTotalPossiblePoints] = useState(0);
  const [correctlyCompletedSentences, setCorrectlyCompletedSentences] = useState(0);
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
  const [currentTime, setCurrentTime] = useState(0);
  const [silenceTimer, setSilenceTimer] = useState<number | null>(null);
  const [lastSpeechTime, setLastSpeechTime] = useState<number>(0);
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);
  const [recognitionRetryCount, setRecognitionRetryCount] = useState(0);
  const [maxRetries] = useState(3);
  const [recognitionRetryTimer, setRecognitionRetryTimer] = useState<number | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'starting' | 'ready' | 'listening' | 'processing'>('idle');
  const [countdown, setCountdown] = useState<number>(0);
  const [countdownTimer, setCountdownTimer] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number>(0);
  const [recordingDurationTimer, setRecordingDurationTimer] = useState<number | null>(null);
  const [hasSpoken, setHasSpoken] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    const initSpeechRecognition = () => {
      try {
        console.log('Starting speech recognition initialization...');
        console.log('Window object:', window);
        console.log('webkitSpeechRecognition in window:', 'webkitSpeechRecognition' in window);
        console.log('SpeechRecognition in window:', 'SpeechRecognition' in window);
        
        let SpeechRecognition: any = null;
        
        // Try different ways to get SpeechRecognition
        if ('SpeechRecognition' in window) {
          SpeechRecognition = (window as any).SpeechRecognition;
          console.log('Using SpeechRecognition');
        } else if ('webkitSpeechRecognition' in window) {
          SpeechRecognition = (window as any).webkitSpeechRecognition;
          console.log('Using webkitSpeechRecognition');
        } else {
          console.error('No speech recognition API found');
          alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
          return;
        }
        
        if (!SpeechRecognition) {
          console.error('SpeechRecognition constructor not found');
          alert('Speech recognition constructor not found. Please use a supported browser.');
          return;
        }
        
        console.log('Creating recognition instance...');
        const recognitionInstance = new SpeechRecognition();
        
        if (!recognitionInstance) {
          console.error('Failed to create recognition instance');
          alert('Failed to create speech recognition instance. Please refresh and try again.');
          return;
        }
        
        console.log('Recognition instance created successfully');
        
        // Improved recognition settings for better accuracy
        try {
          recognitionInstance.continuous = true; // Keep listening
          recognitionInstance.interimResults = true; // Get interim results
          recognitionInstance.lang = 'en-US';
          recognitionInstance.maxAlternatives = 3; // Get multiple alternatives
          
          // Additional settings for better performance
          recognitionInstance.grammars = null; // No grammar restrictions
          recognitionInstance.serviceURI = ''; // Use default service
          
          console.log('Recognition settings applied successfully');
        } catch (settingsError) {
          console.error('Error applying recognition settings:', settingsError);
          // Continue with default settings
        }

        recognitionInstance.onresult = (event: any) => {
          console.log('Speech recognition result:', event);
          
          let finalTranscript = '';
          let interimTranscript = '';
          
          // Process all results
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }
          
          console.log('Final transcript:', finalTranscript);
          console.log('Interim transcript:', interimTranscript);
          
          // Update transcript with best result
          const bestTranscript = finalTranscript || interimTranscript;
          if (bestTranscript) {
            setTranscript(bestTranscript);
            
            // Mark that user has spoken
            if (!hasSpoken) {
              setHasSpoken(true);
            }
            
            // If we have a final result, mark as processing
            if (finalTranscript) {
              setRecordingStatus('processing');
            }
          }
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          
          // Handle different error types appropriately
          switch (event.error) {
            case 'not-allowed':
              setIsListening(false);
              setIsRecognitionActive(false);
              setRecordingStatus('idle');
              setGameState(prev => ({ ...prev, isRecording: false }));
              alert('Microphone access denied. Please allow microphone access and try again.');
              break;
              
            case 'no-speech':
              console.log('No speech detected - this is normal');
              // Don't stop recording, just log it
              break;
              
            case 'aborted':
              console.log('Speech recognition aborted - this is normal when stopping');
              break;
              
            case 'network':
              console.log('Network error in speech recognition');
              // Try to restart recognition after a delay
              setTimeout(() => {
                if (isListening && !isRecognitionActive) {
                  console.log('Attempting to restart speech recognition after network error');
                  startSpeechRecognitionWithRetry();
                }
              }, 2000);
              break;
              
            case 'audio-capture':
              console.log('Audio capture error');
              setIsListening(false);
              setIsRecognitionActive(false);
              setRecordingStatus('idle');
              setGameState(prev => ({ ...prev, isRecording: false }));
              alert('Audio capture error. Please check your microphone and try again.');
              break;
              
            case 'not-supported':
              console.log('Speech recognition not supported');
              setIsListening(false);
              setIsRecognitionActive(false);
              setRecordingStatus('idle');
              setGameState(prev => ({ ...prev, isRecording: false }));
              alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
              break;
              
            default:
              console.log(`Speech recognition error: ${event.error}`);
              // For other errors, try to restart recognition
              setTimeout(() => {
                if (isListening && !isRecognitionActive && recognitionRetryCount < maxRetries) {
                  console.log('Attempting to restart speech recognition after error');
                  startSpeechRecognitionWithRetry();
                }
              }, 1000);
              break;
          }
        };

        recognitionInstance.onend = () => {
          console.log('Speech recognition ended');
          setIsListening(false);
          setIsRecognitionActive(false);
          setGameState(prev => ({ ...prev, isRecording: false }));
        };

        recognitionInstance.onstart = () => {
          console.log('Speech recognition started');
          setIsRecognitionActive(true);
        };

        recognitionInstance.onaudiostart = () => {
          console.log('Audio capturing started');
        };

        recognitionInstance.onaudioend = () => {
          console.log('Audio capturing ended');
        };

        recognitionInstance.onsoundstart = () => {
          console.log('Sound detected');
        };

        recognitionInstance.onsoundend = () => {
          console.log('Sound ended');
        };

        recognitionInstance.onspeechstart = () => {
          console.log('Speech started');
        };

        recognitionInstance.onspeechend = () => {
          console.log('Speech ended');
        };

        setRecognition(recognitionInstance);
        console.log('Speech recognition initialized successfully');
        
      } catch (error) {
        console.error('Error initializing speech recognition:', error);
        console.error('Error details:', {
          name: error instanceof Error ? error.name : 'Unknown',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : 'No stack trace'
        });
        
        // Try to provide more specific error messages
        if (error instanceof Error) {
          if (error.name === 'TypeError' && error.message.includes('SpeechRecognition')) {
            alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
          } else if (error.name === 'ReferenceError') {
            alert('Speech recognition API not found. Please use a supported browser.');
          } else {
            alert(`Speech recognition initialization failed: ${error.message}. Please refresh the page and try again.`);
          }
        } else {
          alert('Unknown error initializing speech recognition. Please refresh the page and try again.');
        }
      }
    };

    // Initialize audio context for visualization
    const initAudioContext = async () => {
      try {
        console.log('Initializing audio context...');
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(context);
        console.log('Audio context initialized successfully');
      } catch (error) {
        console.error('Error initializing audio context:', error);
        // Don't show alert for audio context error, it's not critical
      }
    };

    // Add a small delay before initialization to ensure browser is ready
    const initTimeout = setTimeout(() => {
      initSpeechRecognition();
      initAudioContext();
    }, 100);

    return () => {
      clearTimeout(initTimeout);
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
    if (gameState.currentSession && 
        gameState.currentSentenceIndex >= gameState.currentSession.sentences.length && 
        !gameState.gameEnded) {
      endGame();
    }
  }, [gameState.currentSentenceIndex, gameState.currentSession, gameState.gameEnded]);

  // Timer effect - updates every second when game is started
  useEffect(() => {
    let interval: number;
    
    if (gameState.gameStarted && !gameState.gameEnded) {
      interval = setInterval(() => {
        setCurrentTime(Math.floor((Date.now() - gameState.startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [gameState.gameStarted, gameState.gameEnded, gameState.startTime]);

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
      setIsCorrect(null);
      setShowFeedback(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
    };
  }, [gameState.currentSentenceIndex]);

  const startGame = () => {
    const session = getRandomSession(difficulty);
    const startTime = Date.now();
    const totalPoints = 100;
    const pointsPerSentence = Math.floor(totalPoints / session.sentences.length);
    
    setGameState(prev => ({
      ...prev,
      currentSession: session,
      gameStarted: true,
      startTime
    }));
    setCurrentScore(0);
    setTotalPossiblePoints(totalPoints);
    setCorrectlyCompletedSentences(0);
    setShowInstructions(false);
  };

  const endGame = () => {
    const endTime = Date.now();
    const totalTime = endTime - gameState.startTime;
    const finalScore = Math.round(currentScore); // Round to nearest integer
    
    setGameState(prev => ({
      ...prev,
      gameEnded: true,
      endTime,
      totalTime
    }));
    
    // Auto-save score with anonymous player name
    if (gameState.currentSession) {
      const score: any = {
        id: Date.now().toString(),
        playerName: 'Anonymous Player',
        sessionTitle: gameState.currentSession.title,
        difficulty: gameState.currentSession.difficulty,
        totalTime: totalTime,
        finalScore: finalScore,
        maxScore: 100,
        date: new Date().toISOString(),
        sentencesCompleted: correctlyCompletedSentences,
        totalSentences: gameState.currentSession.sentences.length
      };

      const existingScores = JSON.parse(localStorage.getItem('grammarScores') || '[]');
      existingScores.push(score);
      localStorage.setItem('grammarScores', JSON.stringify(existingScores));
      
      setAutoSavedScore(true);
      setShowAutoSaveFeedback(true);
      
      // Hide auto-save feedback after 3 seconds
      setTimeout(() => {
        setShowAutoSaveFeedback(false);
      }, 3000);
    }
    
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
    console.log('Recognition active:', isRecognitionActive);

    if (!recognition) {
      console.error('Speech recognition not available');
      alert('Speech recognition is not available. Please refresh the page and try again.');
      return;
    }

    if (!audioContext) {
      console.error('Audio context not available');
      alert('Audio context is not available. Please refresh the page and try again.');
      return;
    }

    // Prevent multiple simultaneous recordings
    if (isListening || isRecognitionActive) {
      console.log('Recording already in progress, stopping first');
      await stopRecording();
      // Wait a bit before starting new recording
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    // Reset retry count for new recording session
    setRecognitionRetryCount(0);
    setRecordingStatus('starting');

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
        console.log('Resuming suspended audio context...');
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
      
      // Start countdown to indicate when user should speak
      setRecordingStatus('ready');
      startCountdown();
      
      console.log('Starting speech recognition...');
      // Start speech recognition with retry logic
      await startSpeechRecognitionWithRetry();
      
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsListening(false);
      setIsRecognitionActive(false);
      setRecordingStatus('idle');
      setGameState(prev => ({ ...prev, isRecording: false }));
      
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('Microphone access denied. Please allow microphone access in your browser settings and try again.');
        } else if (error.name === 'NotFoundError') {
          alert('No microphone found. Please connect a microphone and try again.');
        } else if (error.name === 'NotSupportedError') {
          alert('Microphone not supported. Please use a different device or browser.');
        } else {
          alert(`Error accessing microphone: ${error.message}. Please try again.`);
        }
      } else {
        alert('Error accessing microphone. Please try again.');
      }
    }
  };

  const startCountdown = () => {
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setRecordingStatus('listening');
          // Play a beep sound to indicate start
          playStartBeep();
          // Start recording duration timer
          startRecordingDurationTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    setCountdownTimer(timer);
  };

  const playStartBeep = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Could not play start beep:', error);
    }
  };

  const startRecordingDurationTimer = () => {
    setRecordingDuration(0);
    const timer = setInterval(() => {
      setRecordingDuration(prev => prev + 1);
    }, 1000);
    setRecordingDurationTimer(timer);
  };

  const startSpeechRecognitionWithRetry = async () => {
    if (!recognition) return;

    try {
      // Stop any existing recognition first
      if (isRecognitionActive) {
        try {
          recognition.stop();
          await new Promise(resolve => setTimeout(resolve, 500));
        } catch (error) {
          console.log('Error stopping existing recognition:', error);
        }
      }

      recognition.start();
      setGameState(prev => ({ ...prev, isRecording: true }));
      console.log('Speech recognition started successfully');
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      
      // Retry logic with exponential backoff
      if (recognitionRetryCount < maxRetries) {
        console.log(`Retrying speech recognition (${recognitionRetryCount + 1}/${maxRetries})...`);
        setRecognitionRetryCount(prev => prev + 1);
        
        // Exponential backoff: 1s, 2s, 4s
        const retryDelay = Math.pow(2, recognitionRetryCount) * 1000;
        
        // Wait before retry
        const retryTimeout = setTimeout(() => {
          startSpeechRecognitionWithRetry();
        }, retryDelay);
        setRecognitionRetryTimer(retryTimeout);
      } else {
        console.log('Max retries reached, continuing without speech recognition');
        // Continue recording without speech recognition
        setGameState(prev => ({ ...prev, isRecording: true }));
        setRecordingStatus('listening');
        alert('Speech recognition failed to start, but recording is active. You can manually stop when finished.');
      }
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording...');
    
    // Clear all timers
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
    
    if (recognitionRetryTimer) {
      clearTimeout(recognitionRetryTimer);
      setRecognitionRetryTimer(null);
    }

    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    if (recordingDurationTimer) {
      clearInterval(recordingDurationTimer);
      setRecordingDurationTimer(null);
    }
    
    setRecordingStatus('processing');
    
    try {
      // Stop speech recognition first
      if (recognition && isRecognitionActive) {
        console.log('Stopping speech recognition...');
        try {
          recognition.stop();
        } catch (error) {
          console.log('Speech recognition already stopped or error stopping:', error);
        }
      }
      
      // Stop media recorder
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        console.log('Stopping media recorder...');
        mediaRecorder.stop();
      }
      
      // Disconnect audio nodes
      if (microphone) {
        console.log('Disconnecting microphone...');
        microphone.disconnect();
      }
      
      // Reset states
      setMicrophone(null);
      setAnalyser(null);
      setIsListening(false);
      setIsRecognitionActive(false);
      setRecognitionRetryCount(0);
      setRecordingStatus('idle');
      setHasSpoken(false);
      setGameState(prev => ({ ...prev, isRecording: false }));
      
      console.log('Recording stopped successfully');
    } catch (error) {
      console.error('Error stopping recording:', error);
      // Still reset the state even if there's an error
      setMicrophone(null);
      setAnalyser(null);
      setIsListening(false);
      setIsRecognitionActive(false);
      setRecognitionRetryCount(0);
      setRecordingStatus('idle');
      setHasSpoken(false);
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

  const reRecord = async () => {
    console.log('Starting re-recording...');
    
    // Clear any existing timers
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
    
    if (recognitionRetryTimer) {
      clearTimeout(recognitionRetryTimer);
      setRecognitionRetryTimer(null);
    }

    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    if (recordingDurationTimer) {
      clearInterval(recordingDurationTimer);
      setRecordingDurationTimer(null);
    }
    
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
    setIsRecognitionActive(false);
    setRecognitionRetryCount(0);
    setRecordingStatus('idle');
    setHasSpoken(false);
    setRecordingDuration(0);
    setGameState(prev => ({ ...prev, isRecording: false }));
    
    // Start new recording after a short delay
    setTimeout(() => {
      startRecording();
    }, 500);
  };

  const getPointsPerSentence = () => {
    if (!gameState.currentSession) return 0;
    return Math.floor(100 / gameState.currentSession.sentences.length);
  };

  const submitRecording = () => {
    if (!userRecording || !transcript) {
      alert('Please record your pronunciation first.');
      return;
    }

    if (!gameState.currentSession) return;

    const currentSentence = gameState.currentSession.sentences[gameState.currentSentenceIndex];
    
    // Normalize both strings to lowercase and trim whitespace
    const correctAnswer = currentSentence.text.toLowerCase().trim();
    const userAnswerLower = transcript.toLowerCase().trim();
    
    console.log('Comparing answers:', {
      original: currentSentence.text,
      correct: correctAnswer,
      user: transcript,
      userNormalized: userAnswerLower
    });
    
    // Improved similarity check with lower threshold for better recognition
    const similarity = calculateSimilarity(userAnswerLower, correctAnswer);
    const isAnswerCorrect = similarity > 0.6; // Lowered threshold to 60%
    
    console.log('Similarity result:', {
      similarity: similarity,
      threshold: 0.6,
      isCorrect: isAnswerCorrect
    });
    
    // Calculate points for this sentence
    const pointsPerSentence = getPointsPerSentence();
    const earnedPoints = isAnswerCorrect ? pointsPerSentence : 0;
    
    console.log('Scoring:', {
      pointsPerSentence,
      earnedPoints,
      currentScore,
      newScore: currentScore + earnedPoints
    });
    
    setCurrentScore(prev => prev + earnedPoints);
    if (isAnswerCorrect) {
      setCorrectlyCompletedSentences(prev => prev + 1);
    }
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);
    
    // Clean up recording resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (isAnswerCorrect) {
      // If correct, automatically move to next sentence after 2 seconds
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
        setIsRecognitionActive(false);
        setGameState(prev => ({ ...prev, isRecording: false }));
        
        // Check if this was the last sentence
        const nextSentenceIndex = gameState.currentSentenceIndex + 1;
        if (gameState.currentSession && nextSentenceIndex >= gameState.currentSession.sentences.length) {
          // This was the last sentence, end the game
          endGame();
        } else {
          // Move to next sentence
          setGameState(prev => ({
            ...prev,
            currentSentenceIndex: nextSentenceIndex
          }));
        }
      }, 2000);
    } else {
      // If incorrect, show message for 5 seconds then clear
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
        setIsRecognitionActive(false);
        setGameState(prev => ({ ...prev, isRecording: false }));
      }, 5000);
    }
  };

  const calculateSimilarity = (str1: string, str2: string): number => {
    // Ensure both strings are normalized to lowercase and trimmed
    const normalizedStr1 = str1.toLowerCase().trim();
    const normalizedStr2 = str2.toLowerCase().trim();
    
    // Split into words and filter out empty strings
    const words1 = normalizedStr1.split(/\s+/).filter(word => word.length > 0);
    const words2 = normalizedStr2.split(/\s+/).filter(word => word.length > 0);
    
    console.log('Word comparison:', {
      words1: words1,
      words2: words2
    });
    
    if (words1.length === 0 || words2.length === 0) {
      console.log('Empty word arrays detected');
      return 0;
    }
    
    // Improved similarity calculation with multiple metrics
    
    // 1. Exact word match
    const exactMatches = words1.filter(word => 
      words2.some(correctWord => correctWord === word)
    );
    
    // 2. Partial word matches (for typos/mispronunciations)
    const partialMatches = words1.filter(word => 
      words2.some(correctWord => 
        correctWord.includes(word) || word.includes(correctWord) || 
        levenshteinDistance(word, correctWord) <= 2
      )
    );
    
    // 3. Character-level similarity for very similar words
    const charSimilarity = calculateCharacterSimilarity(normalizedStr1, normalizedStr2);
    
    // Combine metrics with weights
    const exactWeight = 0.6;
    const partialWeight = 0.3;
    const charWeight = 0.1;
    
    const exactScore = exactMatches.length / Math.max(words1.length, words2.length);
    const partialScore = partialMatches.length / Math.max(words1.length, words2.length);
    
    const finalSimilarity = (exactScore * exactWeight) + (partialScore * partialWeight) + (charSimilarity * charWeight);
    
    console.log('Similarity calculation:', {
      exactMatches: exactMatches,
      partialMatches: partialMatches,
      exactScore: exactScore,
      partialScore: partialScore,
      charSimilarity: charSimilarity,
      finalSimilarity: finalSimilarity
    });
    
    return finalSimilarity;
  };

  const levenshteinDistance = (str1: string, str2: string): number => {
    const matrix: number[][] = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  };

  const calculateCharacterSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const distance = levenshteinDistance(longer, shorter);
    return (longer.length - distance) / longer.length;
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
    
    // Clear all timers
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
    
    if (recognitionRetryTimer) {
      clearTimeout(recognitionRetryTimer);
      setRecognitionRetryTimer(null);
    }

    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    if (recordingDurationTimer) {
      clearInterval(recordingDurationTimer);
      setRecordingDurationTimer(null);
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
    setCurrentTime(0);
    setShowResults(false);
    setShowRestartConfirm(false);
    setShowInstructions(true);
    setShowSkipConfirm(false);
    setAutoSavedScore(false);
    setShowAutoSaveFeedback(false);
    setCurrentScore(0);
    setTotalPossiblePoints(0);
    setCorrectlyCompletedSentences(0);
    setUserRecording(null);
    setTranscript('');
    setRecordingSatisfied(false);
    setAudioChunks([]);
    setIsCorrect(null);
    setShowFeedback(false);
    setLastSpeechTime(0);
    setIsRecognitionActive(false);
    setRecognitionRetryCount(0);
    setRecordingStatus('idle');
    setCountdown(0);
    setRecordingDuration(0);
    setHasSpoken(false);
  };

  const exitGame = () => {
    // Stop any ongoing recordings
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Clear all timers
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
    
    if (recognitionRetryTimer) {
      clearTimeout(recognitionRetryTimer);
      setRecognitionRetryTimer(null);
    }

    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    if (recordingDurationTimer) {
      clearInterval(recordingDurationTimer);
      setRecordingDurationTimer(null);
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
      sentencesCompleted: correctlyCompletedSentences,
      totalSentences: gameState.currentSession.sentences.length
    };

    const existingScores = JSON.parse(localStorage.getItem('grammarScores') || '[]');
    existingScores.push(score);
    localStorage.setItem('grammarScores', JSON.stringify(existingScores));
  };

  const skipSentence = () => {
    setShowSkipConfirm(true);
  };

  const confirmSkip = () => {
    if (!gameState.currentSession) return;
    
    console.log('Skipping sentence confirmed');
    
    // Clear all timers
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }
    
    if (recognitionRetryTimer) {
      clearTimeout(recognitionRetryTimer);
      setRecognitionRetryTimer(null);
    }

    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
    }

    if (recordingDurationTimer) {
      clearInterval(recordingDurationTimer);
      setRecordingDurationTimer(null);
    }
    
    // Clean up recording resources
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Move to next sentence immediately
    const nextSentenceIndex = gameState.currentSentenceIndex + 1;
    if (gameState.currentSession && nextSentenceIndex >= gameState.currentSession.sentences.length) {
      // This was the last sentence, end the game
      endGame();
    } else {
      // Move to next sentence
      setGameState(prev => ({
        ...prev,
        currentSentenceIndex: nextSentenceIndex
      }));
    }
    
    // Reset ALL recording states completely
    setTranscript('');
    setUserRecording(null);
    setRecordingSatisfied(false);
    setAudioChunks([]);
    setMediaRecorder(null);
    setMicrophone(null);
    setAnalyser(null);
    setIsListening(false);
    setIsRecognitionActive(false);
    setRecognitionRetryCount(0);
    setRecordingStatus('idle');
    setCountdown(0);
    setRecordingDuration(0);
    setHasSpoken(false);
    setIsCorrect(null);
    setShowFeedback(false);
    setGameState(prev => ({ ...prev, isRecording: false }));
    setLastSpeechTime(0);
    
    setShowSkipConfirm(false);
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

  if (showLeaderboard) {
    console.log('Showing leaderboard modal, showLeaderboard state:', showLeaderboard);
    return (
      <GrammarLeaderboardModal
        onBack={() => {
          console.log('Leaderboard back button clicked');
          setShowLeaderboard(false);
        }}
      />
    );
  }

  if (showResults) {
    console.log('Rendering results modal, showLeaderboard state:', showLeaderboard);
    return (
      <GrammarResultsModal
        totalTime={gameState.totalTime}
        sentencesCompleted={correctlyCompletedSentences}
        totalSentences={gameState.currentSession?.sentences.length || 0}
        sessionTitle={gameState.currentSession?.title || ''}
        difficulty={difficulty}
        finalScore={Math.round(currentScore)}
        onSaveScore={saveScore}
        onRestart={restartGame}
        onLeaderboard={() => {
          console.log('Leaderboard button clicked from results modal');
          console.log('Setting showLeaderboard to true');
          setShowLeaderboard(true);
          console.log('showLeaderboard should now be true');
        }}
        onBack={onBack}
        autoSaved={autoSavedScore}
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
              <div className="flex gap-4">
                <span>Time: {gameState.gameStarted ? currentTime : 0}s</span>
                <span>Score: {currentScore}/100</span>
              </div>
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
            
            <button
              onClick={skipSentence}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold"
            >
              ⏭️ Skip Sentence
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
                disabled={!recognition || isListening}
                className={`px-8 py-4 rounded-full text-xl font-semibold transition-colors shadow-lg ${
                  !recognition || isListening
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                🎤 Start Recording
              </button>
            )}

            {isListening && (
              <div className="space-y-4">
                {/* Status Indicator */}
                <div className="text-center">
                  {recordingStatus === 'starting' && (
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg">
                      <p className="font-semibold">🔄 Initializing recording...</p>
                    </div>
                  )}
                  
                  {recordingStatus === 'ready' && countdown > 0 && (
                    <div className="bg-blue-100 text-blue-800 px-6 py-4 rounded-lg">
                      <p className="text-2xl font-bold mb-2">Get Ready!</p>
                      <p className="text-4xl font-bold text-blue-600">{countdown}</p>
                      <p className="text-sm mt-2">Start speaking when you hear the beep</p>
                    </div>
                  )}
                  
                  {recordingStatus === 'listening' && (
                    <div className="bg-green-100 text-green-800 px-6 py-4 rounded-lg">
                      <div className="flex items-center justify-center space-x-4 mb-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <p className="text-2xl font-bold">🎤 RECORDING</p>
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-lg font-semibold">Duration: {recordingDuration}s</p>
                      {hasSpoken ? (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-green-700">✅ Speech detected!</p>
                          <p className="text-sm text-green-600">Press "Stop Recording" when finished</p>
                        </div>
                      ) : (
                        <p className="text-sm text-green-600">Speak the sentence clearly</p>
                      )}
                    </div>
                  )}
                  
                  {recordingStatus === 'processing' && (
                    <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg">
                      <p className="font-semibold">⏳ Processing your speech...</p>
                    </div>
                  )}
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={stopRecording}
                    className="px-8 py-4 bg-red-500 text-white rounded-full text-xl font-semibold hover:bg-red-600 transition-colors shadow-lg"
                  >
                    ⏹️ Stop Recording
                  </button>
                  
                  {hasSpoken && (
                    <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg flex items-center">
                      <span className="text-lg mr-2">💡</span>
                      <span className="text-sm">Ready to stop? Click the red button above!</span>
                    </div>
                  )}
                </div>
                
                {/* Audio Visualization */}
                <div className="mt-4 flex justify-center">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={100}
                    className="border border-gray-300 rounded-lg"
                  />
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-blue-800 font-semibold">🎯 Instructions:</p>
                  <ul className="text-blue-600 text-sm mt-2 space-y-1">
                    {recordingStatus === 'ready' && countdown > 0 && (
                      <li>• Wait for the countdown to finish</li>
                    )}
                    {recordingStatus === 'listening' && (
                      <>
                        <li>• Speak the sentence clearly and slowly</li>
                        <li>• Take your time to pronounce each word correctly</li>
                        <li>• When finished, click the red "Stop Recording" button</li>
                        {!hasSpoken && (
                          <li>• <strong>Tip:</strong> Start speaking to see the "Stop Recording" hint</li>
                        )}
                      </>
                    )}
                    {recognitionRetryCount > 0 && (
                      <li className="text-orange-600">
                        🔄 Retrying speech recognition... ({recognitionRetryCount}/{maxRetries})
                      </li>
                    )}
                  </ul>
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
                {isCorrect 
                  ? `✅ Correct! +${getPointsPerSentence()} points` 
                  : '❌ Try again with better pronunciation'
                }
              </p>
              {!isCorrect && (
                <p className="text-sm mt-1">
                  You can skip this sentence (no points, no penalty)
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Auto-save Feedback */}
      {showAutoSaveFeedback && (
        <div className="fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                ¡Partida guardada automáticamente!
              </p>
              <p className="text-xs mt-1">
                Tu puntuación ha sido añadida al leaderboard
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modals */}
      {showExitConfirm && (
        <ConfirmationModal
          isOpen={showExitConfirm}
          title="Exit Game"
          message="Are you sure you want to exit? Your progress will be lost."
          onConfirm={exitGame}
          onCancel={() => setShowExitConfirm(false)}
        />
      )}

      {showRestartConfirm && (
        <ConfirmationModal
          isOpen={showRestartConfirm}
          title="Restart Game"
          message="Are you sure you want to restart? Your current progress will be lost."
          onConfirm={restartGame}
          onCancel={() => setShowRestartConfirm(false)}
        />
      )}

      {showSkipConfirm && (
        <ConfirmationModal
          isOpen={showSkipConfirm}
          title="Skip Sentence"
          message="Are you sure you want to skip this sentence? You won't receive any points for this sentence."
          onConfirm={confirmSkip}
          onCancel={() => setShowSkipConfirm(false)}
        />
      )}
    </div>
  );
};

export default GrammarGame; 