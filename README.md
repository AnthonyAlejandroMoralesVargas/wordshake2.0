# Wordshake 2.0 - English Learning Games

A comprehensive English learning platform featuring vocabulary and listening games built with React, TypeScript, and Tailwind CSS.

## 🎮 Games Available

### 1. Vocabulary Game
- **Objective**: Build words from letter grids based on themes
- **Features**:
  - 4x4 letter grid with themed content
  - Multiple themes: Fruits, Animals, Transport
  - 3-minute timer
  - Star-based scoring system
  - Word validation and hints

### 2. Listening Game (NEW!)
- **Objective**: Fill in blanks while watching YouTube videos
- **Features**:
  - Embedded YouTube video player
  - Interactive paragraph with blanks
  - Real-time video synchronization
  - Hint system for difficult words
  - Skip to specific parts of the video
  - Comprehensive results with explanations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd wordshake2.0

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production
```bash
npm run build
npm run preview
```

## 🎯 How to Play

### Vocabulary Game
1. Select "Vocabulary" from the main menu
2. Click "Start Game" to begin
3. Select letters in the grid to form words
4. Use "Validate" to check if your word is correct
5. Use "Shuffle" to rearrange letters
6. Try to find as many words as possible before time runs out!

### Listening Game
1. Select "Listening" from the main menu
2. Click "Start Listening Game" to begin
3. Watch the embedded YouTube video
4. Listen carefully for the missing words in the paragraph
5. Type the words you hear in the blank spaces
6. Use hints (?) if you need help
7. Click the skip button (⏮) to jump to specific parts of the video
8. Submit your answers when ready

## 📹 Setting Up YouTube Videos for Listening Game

To use real YouTube videos in the listening game:

1. **Find Educational Videos**: Look for English learning videos on YouTube
2. **Extract Video IDs**: Get the video ID from the YouTube URL
   - Example: `https://www.youtube.com/watch?v=dQw4w9WgXcQ` → `dQw4w9WgXcQ`
3. **Update Video Data**: Edit `src/data/listeningData.ts`:

```typescript
export const listeningVideos: VideoData[] = [
  {
    id: '1',
    title: 'Your Video Title',
    youtubeId: 'YOUR_VIDEO_ID_HERE',
    difficulty: 'beginner',
    category: 'Your Category',
    duration: '2:30'
  }
];
```

4. **Create Exercises**: Add corresponding exercises with:
   - Paragraph with blanks (use `___` for blanks)
   - Correct answers
   - Timing information (startTime, endTime)
   - Helpful hints

### Example Exercise Setup:
```typescript
{
  id: '1',
  videoId: '1',
  paragraph: "Hello, my name is ___ and I ___ from England.",
  blanks: [
    { id: 1, word: 'John', startTime: 5, endTime: 8, hint: 'A common name' },
    { id: 2, word: 'come', startTime: 12, endTime: 15, hint: 'Opposite of go' }
  ],
  correctAnswers: ['John', 'come'],
  hints: ['A common name', 'Opposite of go']
}
```

## 🎨 Features

### Vocabulary Game
- ✅ Themed letter grids
- ✅ Word validation
- ✅ Timer system
- ✅ Score tracking
- ✅ Shuffle functionality
- ✅ Responsive design

### Listening Game
- ✅ YouTube video integration
- ✅ Interactive blanks
- ✅ Real-time synchronization
- ✅ Hint system
- ✅ Video navigation
- ✅ Results analysis
- ✅ Responsive design

## 🛠️ Technical Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Video Player**: YouTube IFrame API

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── GameModeSelection.tsx
│   ├── WordshakeGame.tsx
│   ├── ListeningGame.tsx
│   ├── ListeningHome.tsx
│   └── ...
├── data/               # Game data
│   ├── themes.ts       # Vocabulary themes
│   └── listeningData.ts # Listening exercises
├── hooks/              # Custom hooks
│   ├── useGameTimer.ts
│   └── useYouTubePlayer.ts
├── types/              # TypeScript types
└── utils/              # Utility functions
```

## 🎯 Future Enhancements

- [ ] Grammar game mode
- [ ] User authentication
- [ ] Progress tracking
- [ ] Leaderboards
- [ ] More video content
- [ ] Audio-only exercises
- [ ] Difficulty progression
- [ ] Offline mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please open an issue on GitHub.

---

**Happy Learning! 🎓** 