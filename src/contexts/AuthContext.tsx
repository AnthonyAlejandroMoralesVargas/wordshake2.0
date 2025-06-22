import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  // Load user from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo purposes, create a user with the email
        const userData: User = {
          id: Date.now().toString(),
          firstName: email.split('@')[0],
          lastName: 'User',
          email: email,
          displayName: email.split('@')[0]
        };

        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        resolve(true);
      }, 1000);
    });
  };

  const register = async (firstName: string, lastName: string, email: string, password: string): Promise<boolean> => {
    // Simulate registration - in a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData: User = {
          id: Date.now().toString(),
          firstName: firstName,
          lastName: lastName,
          email: email,
          displayName: `${firstName} ${lastName}`
        };

        setUser(userData);
        setIsLoggedIn(true);
        localStorage.setItem('currentUser', JSON.stringify(userData));
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
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
    getCurrentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 