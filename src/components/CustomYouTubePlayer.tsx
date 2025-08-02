import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize2, RotateCcw } from 'lucide-react';

interface CustomYouTubePlayerProps {
  videoId: string;
  onTimeUpdate?: (time: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
  maxPlays?: number;
  currentPlayCount?: number;
  onPlayCountChange?: (count: number) => void;
  disabled?: boolean;
  seekTo?: (time: number) => void;
  allowProgressControl?: boolean;
}

const CustomYouTubePlayer: React.FC<CustomYouTubePlayerProps> = ({
  videoId,
  onTimeUpdate,
  onPlay,
  onPause,
  onEnd,
  maxPlays = -1,
  currentPlayCount = 0,
  onPlayCountChange,
  disabled = false,
  seekTo,
  allowProgressControl = false
}) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const playerInstanceRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [apiReady, setApiReady] = useState(false);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [showHoverTime, setShowHoverTime] = useState(false);

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // Set up the callback for when API is ready
    window.onYouTubeIframeAPIReady = () => {
      setApiReady(true);
    };

    // If API is already loaded
    if (window.YT) {
      setApiReady(true);
    }
  }, []);

  // Initialize player when API is ready and videoId changes
  useEffect(() => {
    if (apiReady && videoId) {
      initializePlayer();
    }
  }, [apiReady, videoId]);

  // Initialize player
  const initializePlayer = () => {
    if (window.YT && playerRef.current && videoId) {
      // Destroy existing player if any
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.log('Player already destroyed');
        }
      }

      playerInstanceRef.current = new window.YT.Player(playerRef.current, {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          cc_load_policy: 0,
          playsinline: 1,
          origin: window.location.origin,
          enablejsapi: 1,
          host: 'https://www.youtube-nocookie.com',
          wmode: 'transparent',
          allowfullscreen: false,
          allow: 'autoplay; encrypted-media'
        },
        events: {
          onReady: handlePlayerReady,
          onStateChange: handlePlayerStateChange,
          onError: handlePlayerError
        }
      });
    }
  };

  // Handle player ready
  const handlePlayerReady = () => {
    setIsReady(true);
    if (playerInstanceRef.current) {
      try {
        const videoDuration = playerInstanceRef.current.getDuration();
        setDuration(videoDuration);
        playerInstanceRef.current.setVolume(volume);
      } catch (e) {
        console.error('Error getting duration:', e);
      }
    }
  };

  // Handle player state changes
  const handlePlayerStateChange = (event: any) => {
    const state = event.data;
    
    switch (state) {
      case window.YT.PlayerState.PLAYING:
        setIsPlaying(true);
        onPlay?.();
        // Force immediate time update when starting to play
        setTimeout(() => {
          if (playerInstanceRef.current) {
            const time = playerInstanceRef.current.getCurrentTime();
            setCurrentTime(time);
          }
        }, 100);
        break;
      case window.YT.PlayerState.PAUSED:
        setIsPlaying(false);
        onPause?.();
        // Force time update when pausing
        if (playerInstanceRef.current) {
          const time = playerInstanceRef.current.getCurrentTime();
          setCurrentTime(time);
        }
        break;
      case window.YT.PlayerState.ENDED:
        setIsPlaying(false);
        onEnd?.();
        break;
    }
  };

  // Handle player errors
  const handlePlayerError = (event: any) => {
    console.error('YouTube player error:', event.data);
    setIsReady(false);
  };

  // Update time using a simpler, more reliable approach
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const updateTime = () => {
      if (playerInstanceRef.current && isReady) {
        try {
          const time = playerInstanceRef.current.getCurrentTime();
          setCurrentTime(time);
          
          if (isPlaying) {
            onTimeUpdate?.(time);
          }
        } catch (e) {
          console.error('Error getting current time:', e);
        }
      }
    };

    if (isReady) {
      // Update every 16ms (60fps) for maximum smoothness
      intervalId = setInterval(updateTime, 16);
      
      // Initial update
      updateTime();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isReady, isPlaying, onTimeUpdate]);

  // Handle play/pause
  const handlePlayPause = () => {
    if (!isReady || disabled) return;

    if (maxPlays > 0 && currentPlayCount >= maxPlays) {
      alert(`You have reached the maximum number of video plays (${maxPlays}) for this level.`);
      return;
    }

    if (playerInstanceRef.current) {
      try {
        if (isPlaying) {
          playerInstanceRef.current.pauseVideo();
        } else {
          playerInstanceRef.current.playVideo();
          // Increment play count only when starting to play
          if (!isPlaying && onPlayCountChange) {
            onPlayCountChange(currentPlayCount + 1);
          }
        }
      } catch (e) {
        console.error('Error controlling playback:', e);
      }
    }
  };

  // Handle seek to specific time
  const handleSeekTo = (time: number) => {
    if (playerInstanceRef.current && isReady) {
      try {
        playerInstanceRef.current.seekTo(time, true);
        setCurrentTime(time);
        onTimeUpdate?.(time);
        
        // Force immediate update after seek
        setTimeout(() => {
          if (playerInstanceRef.current) {
            const actualTime = playerInstanceRef.current.getCurrentTime();
            setCurrentTime(actualTime);
          }
        }, 100);
      } catch (e) {
        console.error('Error seeking to time:', e);
      }
    }
  };

  // Handle volume change
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (playerInstanceRef.current) {
      try {
        playerInstanceRef.current.setVolume(newVolume);
      } catch (e) {
        console.error('Error setting volume:', e);
      }
    }
  };

  // Handle mute/unmute
  const handleMuteToggle = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (playerInstanceRef.current) {
      try {
        if (newMuted) {
          playerInstanceRef.current.mute();
        } else {
          playerInstanceRef.current.unMute();
          playerInstanceRef.current.setVolume(volume);
        }
      } catch (e) {
        console.error('Error toggling mute:', e);
      }
    }
  };

  // Format time
  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage using useMemo for better performance
  const progressPercentage = useMemo(() => {
    if (duration <= 0) return 0;
    const percentage = (currentTime / duration) * 100;
    return Math.min(100, Math.max(0, percentage));
  }, [currentTime, duration]);

  // Expose seekTo function to parent
  useEffect(() => {
    if (seekTo) {
      seekTo(handleSeekTo);
    }
  }, [seekTo, isReady]);

  // Handle progress bar click
  const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowProgressControl || !isReady || disabled) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const progressBarWidth = rect.width;
    const clickPercentage = clickX / progressBarWidth;
    const newTime = clickPercentage * duration;

    handleSeekTo(newTime);
  };

  // Handle restart video
  const handleRestart = () => {
    if (!allowProgressControl || !isReady || disabled) return;
    handleSeekTo(0);
    if (playerInstanceRef.current) {
      try {
        playerInstanceRef.current.playVideo();
      } catch (e) {
        console.error('Error restarting video:', e);
      }
    }
  };

  // Handle progress bar hover
  const handleProgressHover = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowProgressControl || !isReady || disabled) return;

    const progressBar = event.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const hoverX = event.clientX - rect.left;
    const progressBarWidth = rect.width;
    const hoverPercentage = Math.max(0, Math.min(1, hoverX / progressBarWidth));
    const timeAtHover = hoverPercentage * duration;

    setHoverTime(timeAtHover);
    setShowHoverTime(true);
  };

  const handleProgressLeave = () => {
    setShowHoverTime(false);
    setHoverTime(null);
  };

  // Handle progress bar move (for continuous hover updates)
  const handleProgressMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!allowProgressControl || !isReady || disabled) return;
    handleProgressHover(event);
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      {/* YouTube Player Container */}
      <div 
        ref={playerRef} 
        className="w-full h-full min-h-[300px]"
      />
      
      {/* Transparent overlay to prevent YouTube interactions */}
      <div 
        className="absolute inset-0 z-10"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-20">
        {/* Progress Bar */}
        <div className="mb-3">
          <div 
            className={`w-full bg-gray-600 rounded-full h-3 relative ${
              allowProgressControl && !disabled ? 'cursor-pointer hover:bg-gray-500' : 'cursor-default'
            } transition-colors duration-200`}
            onClick={handleProgressClick}
            onMouseEnter={handleProgressHover}
            onMouseLeave={handleProgressLeave}
            onMouseMove={handleProgressMove}
            title={allowProgressControl && !disabled ? 'Click to seek to position' : ''}
          >
            <div 
              className="bg-red-600 h-3 rounded-full transition-all duration-75 ease-out relative"
              style={{ width: `${progressPercentage}%` }}
            />
            {/* Progress indicator dot */}
            {allowProgressControl && !disabled && (
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full shadow-lg border-2 border-white hover:scale-110 transition-all duration-75 ease-out"
                style={{ left: `calc(${progressPercentage}% - 8px)` }}
              />
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              disabled={!isReady || disabled}
              className={`p-2 rounded-full transition-colors ${
                !isReady || disabled
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
              style={{ pointerEvents: 'auto' }}
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            {/* Restart Button - only for Basic and Intermediate */}
            {allowProgressControl && !disabled && (
              <button
                onClick={handleRestart}
                disabled={!isReady}
                className={`p-2 rounded-full transition-colors ${
                  !isReady
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-white/20 hover:bg-white/30 text-white'
                }`}
                style={{ pointerEvents: 'auto' }}
                title="Restart video"
              >
                <RotateCcw size={20} />
              </button>
            )}

            {/* Time Display */}
            <div className="text-white text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Play Count (for Advanced level) */}
            {maxPlays > 0 && (
              <div className="text-white text-sm bg-white/20 px-2 py-1 rounded">
                {currentPlayCount}/{maxPlays} plays
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Volume Control */}
            <div className="relative">
              <button
                onClick={handleMuteToggle}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
                style={{ pointerEvents: 'auto' }}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              {/* Volume Slider */}
              {showVolumeSlider && (
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-3" style={{ pointerEvents: 'auto' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${isMuted ? 0 : volume}%, #4b5563 ${isMuted ? 0 : volume}%, #4b5563 100%)`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={() => {
                if (playerInstanceRef.current) {
                  try {
                    playerInstanceRef.current.requestFullscreen();
                  } catch (e) {
                    console.error('Error requesting fullscreen:', e);
                  }
                }
              }}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
              style={{ pointerEvents: 'auto' }}
            >
              <Maximize2 size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {!isReady && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}

      {/* Disabled Overlay */}
      {disabled && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-30">
          <div className="text-white text-center">
            <p>Video playback disabled</p>
          </div>
        </div>
      )}

      {/* Hover Time Preview */}
      {showHoverTime && hoverTime !== null && allowProgressControl && !disabled && (
        <div className="absolute bottom-full left-0 right-0 mb-2">
          <div className="bg-black/80 text-white text-center py-1 px-2 rounded text-sm font-mono">
            {formatTime(hoverTime)}
          </div>
        </div>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #ef4444;
          cursor: pointer;
          border: none;
        }

        /* Completely disable all YouTube interactions */
        iframe {
          pointer-events: none !important;
        }

        /* Hide all YouTube links, buttons, and interactive elements */
        iframe[src*="youtube"] * {
          pointer-events: none !important;
        }

        /* Hide YouTube logo and any clickable elements */
        iframe[src*="youtube"] a,
        iframe[src*="youtube"] button,
        iframe[src*="youtube"] [role="button"],
        iframe[src*="youtube"] .ytp-button,
        iframe[src*="youtube"] .ytp-title,
        iframe[src*="youtube"] .ytp-show-cards-title,
        iframe[src*="youtube"] .ytp-watermark {
          display: none !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }

        /* Prevent any hover effects on YouTube elements */
        iframe[src*="youtube"] *:hover {
          pointer-events: none !important;
        }

        /* Ensure our controls are always clickable */
        .z-20 * {
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
};

// Add YouTube API types to window
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default CustomYouTubePlayer; 