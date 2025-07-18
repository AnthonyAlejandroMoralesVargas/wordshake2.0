import { Eye, EyeOff, LogIn, X } from 'lucide-react';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitch }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const success = await login(email, password);
      if (success) {
        // Clear form
        setEmail('');
        setPassword('');
        // Close modal
        onClose();
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err: any) {
      // Manejar diferentes tipos de errores de la API
      if (err.message) {
        if (err.message.includes('404')) {
          setError('User not found. Please check your email or register.');
        } else if (err.message.includes('401')) {
          setError('Invalid credentials. Please check your password.');
        } else if (err.message.includes('Network')) {
          setError('Connection error. Please check your internet connection.');
        } else {
          setError(err.message || 'An error occurred during login.');
        }
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
      aria-describedby="login-description"
    >
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <LogIn size={28} className="text-blue-500" aria-hidden="true" />
              <h2 id="login-title" className="text-2xl font-bold text-gray-800">Log In</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close login modal"
              type="button"
            >
              <X size={24} className="text-gray-600" aria-hidden="true" />
            </button>
          </div>

          <p id="login-description" className="sr-only">
            Enter your email and password to log into your account.
          </p>

          {error && (
            <div 
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="email" className="block text-black mb-1 font-medium">
                Email Address <span className="text-red-600" aria-label="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                aria-invalid={error.toLowerCase().includes('email') ? 'true' : 'false'}
                aria-describedby={error.toLowerCase().includes('email') ? 'email-error' : undefined}
                autoComplete="email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-black mb-1 font-medium">
                Password <span className="text-red-600" aria-label="required">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 disabled:bg-gray-50"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-invalid={error.toLowerCase().includes('password') || error.toLowerCase().includes('credentials') ? 'true' : 'false'}
                  aria-describedby={error.toLowerCase().includes('password') || error.toLowerCase().includes('credentials') ? 'password-error' : undefined}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-500 disabled:text-white text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-2 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
              aria-describedby={isSubmitting ? 'submit-status' : undefined}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
              {isSubmitting && (
                <span id="submit-status" className="sr-only">
                  Please wait, logging you in
                </span>
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitch}
              className="text-blue-700 hover:text-blue-800 hover:underline font-semibold disabled:cursor-not-allowed disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1"
              disabled={isSubmitting}
              aria-label="Switch to registration form"
            >
              Don't have an account? Register here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 