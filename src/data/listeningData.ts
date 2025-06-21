import { VideoData, ListeningExercise } from '../types';

export const listeningVideos: VideoData[] = [
  // Beginner Videos
  {
    id: '1',
    title: 'Daily Routine - Beginner English',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'beginner',
    category: 'Daily Life',
    duration: '2:30'
  },
  {
    id: '2',
    title: 'Basic Greetings - Beginner English',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'beginner',
    category: 'Conversation',
    duration: '2:15'
  },
  {
    id: '3',
    title: 'Family Members - Beginner English',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'beginner',
    category: 'Family',
    duration: '2:45'
  },
  // Intermediate Videos
  {
    id: '4',
    title: 'Weather Report - Intermediate',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'intermediate',
    category: 'Weather',
    duration: '3:15'
  },
  {
    id: '5',
    title: 'Restaurant Ordering - Intermediate',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'intermediate',
    category: 'Food',
    duration: '3:30'
  },
  {
    id: '6',
    title: 'Job Interview - Intermediate',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'intermediate',
    category: 'Work',
    duration: '3:45'
  },
  // Advanced Videos
  {
    id: '7',
    title: 'Travel Conversation - Advanced',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'advanced',
    category: 'Travel',
    duration: '4:20'
  },
  {
    id: '8',
    title: 'Academic Discussion - Advanced',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'advanced',
    category: 'Education',
    duration: '4:30'
  },
  {
    id: '9',
    title: 'Business Meeting - Advanced',
    youtubeId: 'dQw4w9WgXcQ', // Replace with actual educational video ID
    difficulty: 'advanced',
    category: 'Business',
    duration: '4:15'
  }
];

export const listeningExercises: ListeningExercise[] = [
  // Beginner Exercises
  {
    id: '1',
    videoId: '1',
    paragraph: "Every morning, I ___ up at 7:00 AM. First, I ___ my teeth and ___ a shower. Then I ___ breakfast and ___ to work. I usually ___ the bus because it's faster than walking.",
    blanks: [
      { id: 1, word: 'wake', startTime: 15, endTime: 18, hint: 'Opposite of sleep' },
      { id: 2, word: 'brush', startTime: 25, endTime: 28, hint: 'Clean with a tool' },
      { id: 3, word: 'take', startTime: 35, endTime: 38, hint: 'Have or do something' },
      { id: 4, word: 'eat', startTime: 45, endTime: 48, hint: 'Consume food' },
      { id: 5, word: 'go', startTime: 55, endTime: 58, hint: 'Move to a place' },
      { id: 6, word: 'take', startTime: 65, endTime: 68, hint: 'Use transportation' }
    ],
    correctAnswers: ['wake', 'brush', 'take', 'eat', 'go', 'take'],
    hints: ['Opposite of sleep', 'Clean with a tool', 'Have or do something', 'Consume food', 'Move to a place', 'Use transportation']
  },
  {
    id: '2',
    videoId: '2',
    paragraph: "Hello! How ___ you today? I'm ___ fine, thank you. Nice to ___ you. What's your ___? My name is John. ___ to meet you too!",
    blanks: [
      { id: 1, word: 'are', startTime: 10, endTime: 13, hint: 'Form of "to be"' },
      { id: 2, word: 'doing', startTime: 20, endTime: 23, hint: 'Present continuous verb' },
      { id: 3, word: 'meet', startTime: 30, endTime: 33, hint: 'Encounter someone' },
      { id: 4, word: 'name', startTime: 40, endTime: 43, hint: 'What you are called' },
      { id: 5, word: 'Nice', startTime: 50, endTime: 53, hint: 'Pleasant or good' }
    ],
    correctAnswers: ['are', 'doing', 'meet', 'name', 'Nice'],
    hints: ['Form of "to be"', 'Present continuous verb', 'Encounter someone', 'What you are called', 'Pleasant or good']
  },
  {
    id: '3',
    videoId: '3',
    paragraph: "This is my ___. Her name is Sarah. She is my ___. My ___ is David. He is my ___. We have a happy ___ together.",
    blanks: [
      { id: 1, word: 'mother', startTime: 12, endTime: 15, hint: 'Female parent' },
      { id: 2, word: 'sister', startTime: 25, endTime: 28, hint: 'Female sibling' },
      { id: 3, word: 'father', startTime: 35, endTime: 38, hint: 'Male parent' },
      { id: 4, word: 'brother', startTime: 45, endTime: 48, hint: 'Male sibling' },
      { id: 5, word: 'family', startTime: 55, endTime: 58, hint: 'Group of relatives' }
    ],
    correctAnswers: ['mother', 'sister', 'father', 'brother', 'family'],
    hints: ['Female parent', 'Female sibling', 'Male parent', 'Male sibling', 'Group of relatives']
  },
  // Intermediate Exercises
  {
    id: '4',
    videoId: '4',
    paragraph: "Today's weather is quite ___ with temperatures around 20 degrees Celsius. There's a ___ chance of rain in the afternoon, so you should ___ an umbrella. The wind is ___ from the west at 15 kilometers per hour.",
    blanks: [
      { id: 1, word: 'mild', startTime: 10, endTime: 13, hint: 'Not too hot or cold' },
      { id: 2, word: 'high', startTime: 25, endTime: 28, hint: 'Opposite of low' },
      { id: 3, word: 'bring', startTime: 40, endTime: 43, hint: 'Carry with you' },
      { id: 4, word: 'blowing', startTime: 55, endTime: 58, hint: 'Moving air' }
    ],
    correctAnswers: ['mild', 'high', 'bring', 'blowing'],
    hints: ['Not too hot or cold', 'Opposite of low', 'Carry with you', 'Moving air']
  },
  {
    id: '5',
    videoId: '5',
    paragraph: "I'd like to ___ a table for two, please. What would you ___ to drink? I'll have a glass of ___. And for the main course, I'll ___ the grilled salmon. That sounds ___!",
    blanks: [
      { id: 1, word: 'reserve', startTime: 12, endTime: 15, hint: 'Book in advance' },
      { id: 2, word: 'like', startTime: 25, endTime: 28, hint: 'Want or prefer' },
      { id: 3, word: 'water', startTime: 35, endTime: 38, hint: 'Clear liquid to drink' },
      { id: 4, word: 'order', startTime: 45, endTime: 48, hint: 'Request food' },
      { id: 5, word: 'delicious', startTime: 55, endTime: 58, hint: 'Very tasty' }
    ],
    correctAnswers: ['reserve', 'like', 'water', 'order', 'delicious'],
    hints: ['Book in advance', 'Want or prefer', 'Clear liquid to drink', 'Request food', 'Very tasty']
  },
  {
    id: '6',
    videoId: '6',
    paragraph: "Tell me about your previous ___ experience. I worked as a ___ for three years. What are your ___ strengths? I'm very ___ and work well in teams. Why do you want to ___ this position?",
    blanks: [
      { id: 1, word: 'work', startTime: 15, endTime: 18, hint: 'Job or employment' },
      { id: 2, word: 'manager', startTime: 30, endTime: 33, hint: 'Person in charge' },
      { id: 3, word: 'main', startTime: 45, endTime: 48, hint: 'Primary or most important' },
      { id: 4, word: 'organized', startTime: 60, endTime: 63, hint: 'Well-arranged and systematic' },
      { id: 5, word: 'join', startTime: 75, endTime: 78, hint: 'Become part of' }
    ],
    correctAnswers: ['work', 'manager', 'main', 'organized', 'join'],
    hints: ['Job or employment', 'Person in charge', 'Primary or most important', 'Well-arranged and systematic', 'Become part of']
  },
  // Advanced Exercises
  {
    id: '7',
    videoId: '7',
    paragraph: "I'm planning to ___ to Europe next summer. I want to ___ the Eiffel Tower in Paris and ___ some authentic Italian pizza in Rome. I'll need to ___ my passport and ___ some euros before I leave.",
    blanks: [
      { id: 1, word: 'travel', startTime: 12, endTime: 15, hint: 'Go to different places' },
      { id: 2, word: 'visit', startTime: 30, endTime: 33, hint: 'Go to see something' },
      { id: 3, word: 'try', startTime: 45, endTime: 48, hint: 'Test or experience' },
      { id: 4, word: 'renew', startTime: 60, endTime: 63, hint: 'Make valid again' },
      { id: 5, word: 'exchange', startTime: 75, endTime: 78, hint: 'Trade one thing for another' }
    ],
    correctAnswers: ['travel', 'visit', 'try', 'renew', 'exchange'],
    hints: ['Go to different places', 'Go to see something', 'Test or experience', 'Make valid again', 'Trade one thing for another']
  },
  {
    id: '8',
    videoId: '8',
    paragraph: "The research ___ that climate change is having a significant ___ on global ecosystems. Scientists have ___ multiple studies to ___ this phenomenon. The ___ are concerning and require immediate action.",
    blanks: [
      { id: 1, word: 'indicates', startTime: 15, endTime: 18, hint: 'Shows or suggests' },
      { id: 2, word: 'impact', startTime: 30, endTime: 33, hint: 'Effect or influence' },
      { id: 3, word: 'conducted', startTime: 45, endTime: 48, hint: 'Carried out or performed' },
      { id: 4, word: 'analyze', startTime: 60, endTime: 63, hint: 'Examine in detail' },
      { id: 5, word: 'findings', startTime: 75, endTime: 78, hint: 'Results or discoveries' }
    ],
    correctAnswers: ['indicates', 'impact', 'conducted', 'analyze', 'findings'],
    hints: ['Shows or suggests', 'Effect or influence', 'Carried out or performed', 'Examine in detail', 'Results or discoveries']
  },
  {
    id: '9',
    videoId: '9',
    paragraph: "Let's ___ the quarterly results and ___ our strategy for the next quarter. We need to ___ our market position and ___ new opportunities. The team has ___ excellent progress this quarter.",
    blanks: [
      { id: 1, word: 'review', startTime: 12, endTime: 15, hint: 'Examine or assess' },
      { id: 2, word: 'discuss', startTime: 25, endTime: 28, hint: 'Talk about something' },
      { id: 3, word: 'strengthen', startTime: 40, endTime: 43, hint: 'Make stronger' },
      { id: 4, word: 'identify', startTime: 55, endTime: 58, hint: 'Recognize or find' },
      { id: 5, word: 'made', startTime: 70, endTime: 73, hint: 'Past tense of make' }
    ],
    correctAnswers: ['review', 'discuss', 'strengthen', 'identify', 'made'],
    hints: ['Examine or assess', 'Talk about something', 'Make stronger', 'Recognize or find', 'Past tense of make']
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