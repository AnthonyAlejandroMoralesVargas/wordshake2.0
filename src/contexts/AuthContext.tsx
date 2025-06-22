import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AuthService, LoginRequest, RegisterRequest } from '../services/authService';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  getCurrentUser: () => User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = AuthService.getStoredToken();
        if (token) {
          // Verificar si el token es válido intentando obtener datos del usuario
          const savedUser = localStorage.getItem('currentUser');
          if (savedUser) {
            try {
              const userData = JSON.parse(savedUser);
              setUser(userData);
              setIsLoggedIn(true);
            } catch (error) {
              console.error('Error loading user from localStorage:', error);
              localStorage.removeItem('currentUser');
              localStorage.removeItem('authToken');
            }
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Limpiar datos corruptos
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const loginData: LoginRequest = { email, password };
      const response = await AuthService.login(loginData);

      // Crear objeto de usuario compatible con la interfaz existente
      const userData: User = {
        id: email, // Usar email como ID
        firstName: response.player.name,
        lastName: response.player.lastname,
        email: response.player.email,
        displayName: `${response.player.name} ${response.player.lastname}`
      };

      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const registerData: RegisterRequest = {
        email,
        name: firstName,
        last_name: lastName,
        password
      };

      await AuthService.register(registerData);

      // Después del registro exitoso, hacer login automáticamente
      return await login(email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('currentUser');
    }
  };

  const getCurrentUser = (): User | null => {
    return user;
  };

  const value: AuthContextType = {
    user,
    isLoggedIn,
    login,
    register,
    logout,
    getCurrentUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 