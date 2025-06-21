import React from 'react';

interface GrammarInstructionsModalProps {
  difficulty: string;
  onStart: () => void;
  onBack: () => void;
}

const GrammarInstructionsModal: React.FC<GrammarInstructionsModalProps> = ({
  difficulty,
  onStart,
  onBack
}) => {
  const getDifficultyInstructions = () => {
    switch (difficulty) {
      case 'beginner':
        return [
          "🎯 Practice basic English grammar structures",
          "🔊 Listen to each sentence pronunciation",
          "🎤 Record yourself repeating the sentence",
          "✅ Get feedback on your pronunciation",
          "📚 Focus on Present Simple, questions, and negatives",
          "⏱️ Complete all 5 sentences to finish the session"
        ];
      case 'intermediate':
        return [
          "🎯 Practice intermediate English grammar patterns",
          "🔊 Listen to more complex sentence structures",
          "🎤 Record yourself with clear pronunciation",
          "✅ Improve your speaking accuracy",
          "📚 Focus on Present Continuous, Past Simple, and Future",
          "⏱️ Complete all 5 sentences to finish the session"
        ];
      case 'advanced':
        return [
          "🎯 Master advanced English grammar concepts",
          "🔊 Listen to complex grammatical structures",
          "🎤 Record yourself with native-like pronunciation",
          "✅ Perfect your speaking skills",
          "📚 Focus on Present Perfect, Conditionals, and Passive Voice",
          "⏱️ Complete all 5 sentences to finish the session"
        ];
      default:
        return [];
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'beginner':
        return 'text-green-600 bg-green-100';
      case 'intermediate':
        return 'text-yellow-600 bg-yellow-100';
      case 'advanced':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Grammar Practice Instructions
            </h1>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                How to Play:
              </h2>
              <div className="space-y-3">
                {getDifficultyInstructions().map((instruction, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-semibold">
                        {index + 1}
                      </span>
                    </div>
                    <p className="text-gray-700">{instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Game Flow */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Game Flow:
              </h3>
              <div className="space-y-2 text-blue-700">
                <p>1. <strong>Listen:</strong> Click the play button to hear the sentence</p>
                <p>2. <strong>Practice:</strong> Repeat the sentence to yourself</p>
                <p>3. <strong>Record:</strong> Click the microphone to start recording</p>
                <p>4. <strong>Speak:</strong> Say the sentence clearly</p>
                <p>5. <strong>Stop:</strong> Click stop when finished</p>
                <p>6. <strong>Feedback:</strong> Get instant pronunciation feedback</p>
                <p>7. <strong>Continue:</strong> Move to the next sentence when correct</p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-3">
                Tips for Success:
              </h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Speak clearly and at a natural pace</li>
                <li>• Pay attention to intonation and stress</li>
                <li>• Practice the sentence before recording</li>
                <li>• Don't worry about making mistakes - keep trying!</li>
                <li>• Use the translation to understand the meaning</li>
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Requirements:
              </h3>
              <div className="space-y-2 text-gray-700">
                <p>• Microphone access for recording</p>
                <p>• Modern browser with speech recognition support</p>
                <p>• Quiet environment for better recognition</p>
                <p>• Headphones recommended for better audio quality</p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={onBack}
              className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-semibold"
            >
              Back to Menu
            </button>
            <button
              onClick={onStart}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Start Practice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrammarInstructionsModal; 