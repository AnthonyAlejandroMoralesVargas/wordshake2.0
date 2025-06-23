import { useCallback, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GrammarMatchRequest, ListeningMatchRequest, ScoreService, VocabularyMatchRequest } from '../services/scoreService';

export const useScoreService = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveVocabularyScore = useCallback(async (
    numWords: number,
    difficulty: string,
    score: number,
    time: number
  ) => {
    if (!user?.email) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const scoreData: VocabularyMatchRequest = {
        player_email: user.email,
        num_words: numWords,
        difficulty,
        score,
        time
      };

      await ScoreService.saveVocabularyScore(scoreData);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to save vocabulary score');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const saveGrammarScore = useCallback(async (
    sessionName: string,
    difficulty: string,
    time: number,
    score: number,
    completion: number
  ) => {
    if (!user?.email) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const scoreData: GrammarMatchRequest = {
        player_email: user.email,
        session_name: sessionName,
        difficulty,
        time,
        score,
        completion
      };

      await ScoreService.saveGrammarScore(scoreData);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to save grammar score');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const saveListeningScore = useCallback(async (
    score: number,
    accuracy: number,
    nameVideo: string,
    difficulty: string,
    time: number
  ) => {
    if (!user?.email) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    try {
      const scoreData: ListeningMatchRequest = {
        player_email: user.email,
        score,
        accuracy,
        name_video: nameVideo,
        difficulty,
        time
      };

      await ScoreService.saveListeningScore(scoreData);
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to save listening score');
      return false;
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const getPlayerScores = useCallback(async () => {
    if (!user?.email) {
      setError('User not authenticated');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const scores = await ScoreService.getPlayerScores(user.email);
      return scores;
    } catch (err: any) {
      setError(err.message || 'Failed to get player scores');
      return null;
    } finally {
      setLoading(false);
    }
  }, [user?.email]);

  const getVocabularyLeaderboard = useCallback(async (difficulty: string = "All", limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      let leaderboard;
      if (difficulty === "All") {
        leaderboard = await ScoreService.getVocabularyLeaderboard(limit);
      } else {
        leaderboard = await ScoreService.getVocabularyLeaderboardByDifficulty(difficulty, limit);
      }
      return leaderboard;
    } catch (err: any) {
      setError(err.message || 'Failed to get vocabulary leaderboard');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getGrammarLeaderboard = useCallback(async (difficulty: string = "All", limit: number = 10) => {
    setLoading(true);
    setError(null);
    try {
      let leaderboard;
      if (difficulty === "All") {
        leaderboard = await ScoreService.getGrammarLeaderboard(limit);
      } else {
        leaderboard = await ScoreService.getGrammarLeaderboardByDifficulty(difficulty, limit);
      }
      return leaderboard;
    } catch (err: any) {
      setError(err.message || 'Failed to get grammar leaderboard');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getListeningLeaderboard = useCallback(async (limit: number = 10) => {
    setLoading(true);
    setError(null);

    try {
      const leaderboard = await ScoreService.getListeningLeaderboard(limit);
      return leaderboard;
    } catch (err: any) {
      setError(err.message || 'Failed to get listening leaderboard');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    clearError,
    saveVocabularyScore,
    saveGrammarScore,
    saveListeningScore,
    getPlayerScores,
    getVocabularyLeaderboard,
    getGrammarLeaderboard,
    getListeningLeaderboard
  };
}; 