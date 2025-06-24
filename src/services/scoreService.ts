import { apiRequest } from '../utils/apiConfig';

export interface VocabularyMatchRequest {
  idMatch: number;
  player: string;
  num_words: number;
  difficulty: string;
  score: number;
  time: number;
  date: string;
}

export interface GrammarMatchRequest {
  idMatch: number;
  player: string;
  session_name: string;
  difficulty: string;
  time: number;
  score: number;
  completion: number;
  date: string;
}

export interface ListeningMatchRequest {
  idMatch: number;
  player: string;
  score: number;
  accuracy: number;
  name_video: string;
  difficulty: string;
  time: number;
  date: string;
}

export interface PlayerScores {
  vocabulary_matches: VocabularyMatchRequest[];
  grammar_matches: GrammarMatchRequest[];
  listening_matches: ListeningMatchRequest[];
}

export class ScoreService {
  // Guardar puntuación de Vocabulary
  static async saveVocabularyScore(scoreData: VocabularyMatchRequest): Promise<void> {
    try {
      console.log('Sending vocabulary score data:', JSON.stringify(scoreData, null, 2));
      await apiRequest('/vocabulary_match/register', {
        method: 'POST',
        body: JSON.stringify(scoreData)
      });
    } catch (error) {
      console.error('Error saving vocabulary score:', error);
      throw error;
    }
  }

  // Guardar puntuación de Grammar
  static async saveGrammarScore(scoreData: GrammarMatchRequest): Promise<void> {
    try {
      await apiRequest('/grammar_match/register', {
        method: 'POST',
        body: JSON.stringify(scoreData)
      });
    } catch (error) {
      console.error('Error saving grammar score:', error);
      throw error;
    }
  }

  // Guardar puntuación de Listening
  static async saveListeningScore(scoreData: ListeningMatchRequest): Promise<void> {
    try {
      await apiRequest('/listening_match/register', {
        method: 'POST',
        body: JSON.stringify(scoreData)
      });
    } catch (error) {
      console.error('Error saving listening score:', error);
      throw error;
    }
  }

  // Obtener puntuaciones de un jugador
  static async getPlayerScores(email: string): Promise<PlayerScores> {
    try {
      const response = await apiRequest(`/player/${email}/scores`);
      return response.data || { vocabulary_matches: [], grammar_matches: [], listening_matches: [] };
    } catch (error) {
      console.error('Error getting player scores:', error);
      throw error;
    }
  }

  // Obtener leaderboard de Vocabulary
  static async getVocabularyLeaderboard(limit: number = 10): Promise<VocabularyMatchRequest[]> {
    try {
      const response = await apiRequest(`/vocabulary_match/top-scores/overall?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error getting vocabulary leaderboard:', error);
      throw error;
    }
  }

  // Obtener leaderboard de Grammar
  static async getGrammarLeaderboard(limit: number = 10): Promise<GrammarMatchRequest[]> {
    try {
      const response = await apiRequest(`/grammar_match/top-scores/overall?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error getting grammar leaderboard:', error);
      throw error;
    }
  }

  // Obtener leaderboard de Listening
  static async getListeningLeaderboard(limit: number = 10): Promise<ListeningMatchRequest[]> {
    try {
      const response = await apiRequest(`/listening_match/top-scores/overall?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error getting listening leaderboard:', error);
      throw error;
    }
  }

  // Obtener leaderboard de Vocabulary por dificultad
  static async getVocabularyLeaderboardByDifficulty(difficulty: string, limit: number = 10): Promise<VocabularyMatchRequest[]> {
    try {
      const response = await apiRequest(`/vocabulary_match/top-scores/by-difficulty/${difficulty}?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error getting vocabulary leaderboard by difficulty:', error);
      throw error;
    }
  }

  // Obtener leaderboard de Grammar por dificultad
  static async getGrammarLeaderboardByDifficulty(difficulty: string, limit: number = 10): Promise<GrammarMatchRequest[]> {
    try {
      const response = await apiRequest(`/grammar_match/top-scores/by-difficulty/${difficulty}?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error getting grammar leaderboard by difficulty:', error);
      throw error;
    }
  }

  // Obtener leaderboard de Listening por dificultad
  static async getListeningLeaderboardByDifficulty(difficulty: string, limit: number = 10): Promise<ListeningMatchRequest[]> {
    try {
      const response = await apiRequest(`/listening_match/top-scores/by-difficulty/${difficulty}?limit=${limit}`);
      return response.data || [];
    } catch (error) {
      console.error('Error getting listening leaderboard by difficulty:', error);
      throw error;
    }
  }
} 