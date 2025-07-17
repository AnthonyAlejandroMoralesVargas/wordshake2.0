import { Eye, EyeOff, UserPlus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { validateRegistration } from '../utils/authUtils';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitch }) => {
  const { register } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setErrors([]);

    const validation = validateRegistration(firstName, lastName, email, password, confirmPassword);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const success = await register(firstName, lastName, email, password);
      if (success) {
        // Clear form
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrors([]);
        // Close modal
        onClose();
      } else {
        setErrors(['Registration failed. Please try again.']);
      }
    } catch (err: any) {
      // Manejar diferentes tipos de errores de la API
      if (err.message) {
        if (err.message.includes('already exists') || err.message.includes('duplicate')) {
          setErrors(['An account with this email already exists.']);
        } else if (err.message.includes('Network')) {
          setErrors(['Connection error. Please check your internet connection.']);
        } else if (err.message.includes('validation')) {
          setErrors(['Please check your input data and try again.']);
        } else {
          setErrors([err.message || 'An error occurred during registration.']);
        }
      } else {
        setErrors(['An unexpected error occurred. Please try again.']);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  return (
    <div 
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-modal-title"
      aria-describedby="register-modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div className="modal-content max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="p-6">
          <header className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <UserPlus size={28} className="icon-primary-green" aria-hidden="true" />
              <h1 id="register-modal-title" className="text-2xl font-bold text-contrast">Create Account</h1>
            </div>
            <button 
              onClick={onClose} 
              className="btn-close focus-green"
              aria-label="Cerrar modal de registro"
              tabIndex={0}
            >
              <X size={24} className="modal-icon" aria-hidden="true" />
            </button>
          </header>

          <p id="register-modal-description" className="sr-only">
            Formulario para crear una nueva cuenta con nombre, apellido, email y contraseña
          </p>

          {errors.length > 0 && (
            <div 
              id="register-errors"
              className="alert-error"
              role="alert"
              aria-live="polite"
            >
              <ul className="text-sm space-y-1" role="list">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="form-grid-2">
              <div>
                <label htmlFor="first-name-input" className="label-base">
                  First Name
                </label>
                <input
                  id="first-name-input"
                  type="text"
                  className="input-base input-green focus-green"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={errors.length > 0 ? 'true' : 'false'}
                  aria-describedby={errors.length > 0 ? 'register-errors' : undefined}
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                  tabIndex={0}
                />
              </div>
              <div>
                <label htmlFor="last-name-input" className="label-base">
                  Last Name
                </label>
                <input
                  id="last-name-input"
                  type="text"
                  className="input-base input-green focus-green"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={errors.length > 0 ? 'true' : 'false'}
                  aria-describedby={errors.length > 0 ? 'register-errors' : undefined}
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                  tabIndex={0}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email-input-register" className="label-base">
                Email Address
              </label>
              <input
                id="email-input-register"
                type="email"
                className="input-base input-green focus-green"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                aria-required="true"
                aria-invalid={errors.length > 0 ? 'true' : 'false'}
                aria-describedby={errors.length > 0 ? 'register-errors' : undefined}
                placeholder="Enter your email address"
                autoComplete="email"
                tabIndex={0}
              />
            </div>
            <div>
              <label htmlFor="password-input-register" className="label-base">
                Password
              </label>
              <div className="input-with-icon">
                <input
                  id="password-input-register"
                  type={showPassword ? "text" : "password"}
                  className="input-base input-green focus-green"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={errors.length > 0 ? 'true' : 'false'}
                  aria-describedby="password-requirements password-visibility-toggle-register"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  tabIndex={0}
                />
                <button
                  id="password-visibility-toggle-register"
                  type="button"
                  className="input-icon focus-green"
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
              <p id="password-requirements" className="text-help">
                Minimum 8 characters, one number and one special character
              </p>
            </div>
            <div>
              <label htmlFor="confirm-password-input" className="label-base">
                Confirm Password
              </label>
              <div className="input-with-icon">
                <input
                  id="confirm-password-input"
                  type={showConfirmPassword ? "text" : "password"}
                  className="input-base input-green focus-green"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  disabled={isSubmitting}
                  aria-required="true"
                  aria-invalid={errors.length > 0 ? 'true' : 'false'}
                  aria-describedby="confirm-password-visibility-toggle"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  tabIndex={0}
                />
                <button
                  id="confirm-password-visibility-toggle"
                  type="button"
                  className="input-icon focus-green"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  aria-label={showConfirmPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"}
                  tabIndex={0}
                >
                  {showConfirmPassword ? 
                    <EyeOff size={20} aria-hidden="true" /> : 
                    <Eye size={20} aria-hidden="true" />
                  }
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary-green w-full mt-2 focus-green"
              aria-describedby="submit-status-register"
              tabIndex={0}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
            <div id="submit-status-register" className="sr-only">
              {isSubmitting ? 'Creando cuenta, por favor espere' : 'Formulario listo para enviar'}
            </div>
          </form>

          <footer className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitch}
              className="btn-link-green focus-green"
              disabled={isSubmitting}
              aria-label="Cambiar a formulario de inicio de sesión"
              tabIndex={0}
            >
              Already have an account? Login here
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal; 