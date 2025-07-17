import { Eye, EyeOff, LogIn, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
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

  // Manejo de tecla Escape para cerrar modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, isSubmitting, onClose]);

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
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
      onClick={(e) => {
        // Cerrar modal si se hace click fuera del contenido y no está enviando
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-2xl max-w-md w-full modal-content shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <LogIn size={28} className="text-blue-600 modal-icon-primary" aria-hidden="true" />
              <h1 id="login-modal-title" className="text-2xl font-bold text-gray-900 text-high-contrast">Log In</h1>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg transition-colors"
              aria-label="Cerrar modal de inicio de sesión"
              tabIndex={0}
            >
              <X size={24} className="text-gray-700 modal-icon" aria-hidden="true" />
            </button>
          </header>

          <p id="login-modal-description" className="sr-only">
            Formulario para iniciar sesión con email y contraseña
          </p>

          {error && (
            <div 
              id="login-error"
              className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg error-message"
              role="alert"
              aria-live="polite"
            >
              <p className="text-red-900 text-sm font-medium">
                <span className="font-bold">Error:</span> {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label 
                htmlFor="email-input"
                className="block text-gray-900 mb-1 font-semibold modal-label text-high-contrast"
              >
                Email Address
              </label>
              <input
                id="email-input"
                type="email"
                className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 modal-input text-high-contrast"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? 'login-error' : undefined}
                placeholder="Enter your email address"
                autoComplete="email"
                tabIndex={0}
              />
            </div>
            
            <div>
              <label 
                htmlFor="password-input"
                className="block text-gray-900 mb-1 font-semibold modal-label text-high-contrast"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border-2 border-gray-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 focus:border-blue-600 pr-10 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-300 modal-input text-high-contrast"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby="password-visibility-toggle"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  tabIndex={0}
                />
                <button
                  id="password-visibility-toggle"
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded disabled:cursor-not-allowed p-1 modal-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  tabIndex={0}
                >
                  {showPassword ? 
                    <EyeOff size={20} aria-hidden="true" /> : 
                    <Eye size={20} aria-hidden="true" />
                  }
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-2 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-300 modal-button-primary"
              aria-describedby="submit-status"
              tabIndex={0}
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
            <div id="submit-status" className="sr-only">
              {isSubmitting ? 'Iniciando sesión, por favor espere' : 'Formulario listo para enviar'}
            </div>
          </form>

          <footer className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitch}
              className="text-blue-700 hover:text-blue-800 hover:underline font-semibold disabled:cursor-not-allowed disabled:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded px-2 py-1 modal-link"
              disabled={isSubmitting}
              aria-label="Cambiar a formulario de registro"
              tabIndex={0}
            >
              Don't have an account? Register here
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 