import { apiRequest } from '../utils/apiConfig';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  name: string;
  last_name: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  player: {
    email: string;
    name: string;
    lastname: string;
  };
}

export interface ApiResponse<T = any> {
  status: number;
  message: string;
  data?: T;
}

export class AuthService {
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });

      if (response.status === 200 && response.data) {
        // Guardar el token en localStorage
        localStorage.setItem('authToken', response.data.token);
        return response.data;
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async register(userData: RegisterRequest): Promise<void> {
    try {
      const response = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData)
      });

      if (response.status !== 201) {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async logout(): Promise<void> {
    try {
      await apiRequest('/auth/logout', {
        method: 'GET'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Siempre limpiar el token local
      localStorage.removeItem('authToken');
    }
  }

  static getStoredToken(): string | null {
    return localStorage.getItem('authToken');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }
} 