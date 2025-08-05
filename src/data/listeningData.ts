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
  },
  // Intermediate Video
  {
    id: '2',
    title: 'Shrek - Friendship Conversation',
    youtubeId: 'nBJhxbZApGY', // Real movie clip
    difficulty: 'intermediate',
    category: 'Movies & Entertainment',
    duration: '0:25'
  },
  // Advanced Video
  {
    id: '3',
    title: 'Shrek - Complex Dialogue Scene',
    youtubeId: 'lRw-TNkyHC4', // Real movie clip
    difficulty: 'advanced',
    category: 'Movies & Entertainment',
    duration: '0:49'
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
  },
  // Intermediate Exercise - Shrek Dialogue
  {
    id: '2',
    videoId: '2',
    paragraph: "Stop singing. Well, it's no ___ you don't have any friends. Wow. Only a true friend would be that ___ honest. Listen, little donkey. Take a look at me. What am I? Really tall? No, I'm an ___ . You know, grab your torch and ___ . Doesn't that ___ you?",
    blanks: [
      { id: 1, word: 'wonder', startTime: 3.2, endTime: 4.0, hint: 'Surprise or amazement' },
      { id: 2, word: 'cruelly', startTime: 8.8, endTime: 9.2, hint: 'In a mean or harsh way' },
      { id: 3, word: 'ogre', startTime: 21.0, endTime: 22.0, hint: 'Large, scary monster from fairy tales' },
      { id: 4, word: 'pitchforks', startTime: 23.0, endTime: 24.0, hint: 'Farm tools with long handles and sharp points' },
      { id: 5, word: 'bother', startTime: 25.2, endTime: 25.8, hint: 'Annoy or disturb' }
    ],
    correctAnswers: ['wonder', 'cruelly', 'ogre', 'pitchforks', 'bother'],
    hints: [
      'Surprise or amazement',
      'In a mean or harsh way',
      'Large, scary monster from fairy tales',
      'Farm tools with long handles and sharp points',
      'Annoy or disturb'
    ]
  },
  // Advanced Exercise - Shrek Complex Dialogue
  {
    id: '3',
    videoId: '3',
    paragraph: "Oh, and it is lovely. Just beautiful. You know, you are quite a ___ . It's amazing what you've done with such a ___ budget. I like that boulder. That is a nice boulder. I guess you don't ___ much, do you? I like my ___ . You know, I do, too. That's another thing we have in common. Like I hate it when you got somebody in your face, you trying to give them a hint, they won't leave, and then there's that big ___ silence, you know.",
    blanks: [
      { id: 1, word: 'decorator', startTime: 8.0, endTime: 9.0, hint: 'Someone who designs and arranges interiors' },
      { id: 2, word: 'modest', startTime: 10.2, endTime: 10.8, hint: 'Small, humble, not expensive' },
      { id: 3, word: 'entertain', startTime: 21.5, endTime: 22.5, hint: 'Have guests or visitors' },
      { id: 4, word: 'privacy', startTime: 24.5, endTime: 25.0, hint: 'Being alone, away from others' },
      { id: 5, word: 'awkward', startTime: 31.5, endTime: 32.0, hint: 'Uncomfortable or embarrassing' }
    ],
    correctAnswers: ['decorator', 'modest', 'entertain', 'privacy', 'awkward'],
    hints: [
      'Someone who designs and arranges interiors',
      'Small, humble, not expensive',
      'Have guests or visitors',
      'Being alone, away from others',
      'Uncomfortable or embarrassing'
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