import { VideoData, ListeningExercise } from '../types';

export const listeningVideos: VideoData[] = [
  // Beginner Video
  {
    id: '1',
    title: 'Living Abroad - New Experiences',
    youtubeId: 'jDrVdYlzp6A', // Real educational video ID
    difficulty: 'beginner',
    category: 'Travel & Culture',
    duration: '0:15'
  }
];

export const listeningExercises: ListeningExercise[] = [
  // Beginner Exercise - Living Abroad
  {
    id: '1',
    videoId: '1',
    paragraph: "Living abroad ___ up a whole world of new experiences, ideas, and cultures that you never would have ___ of if you hadn't moved abroad. The second you ___ off the plane and realize that you're not just on vacation, you're in your new ___ , it can hit you like a ___ .",
    blanks: [
      { id: 1, word: 'opens', startTime: 1, endTime: 2, hint: 'Makes available or accessible' },
      { id: 2, word: 'dreamed', startTime: 4, endTime: 5, hint: 'Imagined or thought about' },
      { id: 3, word: 'step', startTime: 7, endTime: 8, hint: 'Put your foot down' },
      { id: 4, word: 'home', startTime: 11, endTime: 12, hint: 'Where you live' },
      { id: 5, word: 'truck', startTime: 14, endTime: 15, hint: 'Large vehicle (used in expression "hit like a...")' }
    ],
    correctAnswers: ['opens', 'dreamed', 'step', 'home', 'truck'],
    hints: [
      'Makes available or accessible', 
      'Imagined or thought about', 
      'Put your foot down', 
      'Where you live', 
      'Large vehicle (used in expression "hit like a...")'
    ]
  }
];

export const getRandomVideo = (difficulty?: string): VideoData => {
  const filteredVideos = difficulty 
    ? listeningVideos.filter(video => video.difficulty === difficulty)
    : listeningVideos;
  return filteredVideos[Math.floor(Math.random() * filteredVideos.length)];
};

export const getExerciseByVideoId = (videoId: string): ListeningExercise | undefined => {
  return listeningExercises.find(exercise => exercise.videoId === videoId);
};

export const getVideosByDifficulty = (difficulty: string): VideoData[] => {
  return listeningVideos.filter(video => video.difficulty === difficulty);
};

// Validation function to check all exercises
export const validateExercises = () => {
  const errors: string[] = [];
  
  listeningExercises.forEach(exercise => {
    const words = exercise.paragraph.split(' ');
    const blankSpaces = words.filter(word => word === '___').length;
    const blanksCount = exercise.blanks.length;
    
    if (blankSpaces !== blanksCount) {
      errors.push(`Exercise ${exercise.id}: Found ${blankSpaces} spaces but ${blanksCount} blanks defined`);
    }
    
    // Check if all blanks have required properties
    exercise.blanks.forEach((blank, index) => {
      if (!blank.word || !blank.hint) {
        errors.push(`Exercise ${exercise.id}, Blank ${index + 1}: Missing word or hint`);
      }
    });
  });
  
  if (errors.length > 0) {
    console.error('Exercise validation errors:', errors);
    return false;
  }
  
  console.log('All exercises are valid!');
  return true;
};