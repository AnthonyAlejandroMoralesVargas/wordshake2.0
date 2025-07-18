import { Eye, EyeOff, UserPlus, X } from 'lucide-react';
import React, { useState } from 'react';
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
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
      aria-describedby="register-description"
    >
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <UserPlus size={28} className="text-green-500" aria-hidden="true" />
              <h2 id="register-title" className="text-2xl font-bold text-gray-800">Create Account</h2>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close registration modal"
              type="button"
            >
              <X size={24} className="text-gray-600" aria-hidden="true" />
            </button>
          </div>

          <p id="register-description" className="sr-only">
            Fill out the form below to create your new account. All fields are required.
          </p>

          {errors.length > 0 && (
            <div 
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <ul className="text-red-600 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <fieldset className="flex gap-2">
              <legend className="sr-only">Personal Information</legend>
              <div className="flex-1">
                <label htmlFor="firstName" className="block text-black mb-1 font-medium">
                  First Name <span className="text-red-600" aria-label="required">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-invalid={errors.some(error => error.toLowerCase().includes('first name')) ? 'true' : 'false'}
                  aria-describedby={errors.some(error => error.toLowerCase().includes('first name')) ? 'firstName-error' : undefined}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="lastName" className="block text-black mb-1 font-medium">
                  Last Name <span className="text-red-600" aria-label="required">*</span>
                </label>
                <input
                  id="lastName"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-invalid={errors.some(error => error.toLowerCase().includes('last name')) ? 'true' : 'false'}
                  aria-describedby={errors.some(error => error.toLowerCase().includes('last name')) ? 'lastName-error' : undefined}
                />
              </div>
            </fieldset>
            <div>
              <label htmlFor="email" className="block text-black mb-1 font-medium">
                Email Address <span className="text-red-600" aria-label="required">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-50"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                aria-invalid={errors.some(error => error.toLowerCase().includes('email')) ? 'true' : 'false'}
                aria-describedby={errors.some(error => error.toLowerCase().includes('email')) ? 'email-error' : undefined}
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10 disabled:bg-gray-50"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={isSubmitting}
                  aria-invalid={errors.some(error => error.toLowerCase().includes('password')) ? 'true' : 'false'}
                  aria-describedby="password-requirements"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
              <p id="password-requirements" className="text-xs text-gray-500 mt-1">
                Minimum 8 characters, one number and one special character
              </p>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-black mb-1 font-medium">
                Confirm Password <span className="text-red-600" aria-label="required">*</span>
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10 disabled:bg-gray-50"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  disabled={isSubmitting}
                  aria-invalid={errors.some(error => error.toLowerCase().includes('confirm') || error.toLowerCase().includes('match')) ? 'true' : 'false'}
                  aria-describedby={errors.some(error => error.toLowerCase().includes('confirm') || error.toLowerCase().includes('match')) ? 'confirmPassword-error' : undefined}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isSubmitting}
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  aria-pressed={showConfirmPassword}
                >
                  {showConfirmPassword ? <EyeOff size={20} aria-hidden="true" /> : <Eye size={20} aria-hidden="true" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-700 hover:bg-green-800 disabled:bg-gray-500 disabled:text-white text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-2 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              aria-describedby={isSubmitting ? 'submit-status' : undefined}
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
              {isSubmitting && (
                <span id="submit-status" className="sr-only">
                  Please wait, creating your account
                </span>
              )}
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitch}
              className="text-green-700 hover:text-green-800 hover:underline font-semibold disabled:cursor-not-allowed disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 rounded px-2 py-1"
              disabled={isSubmitting}
              aria-label="Switch to login form"
            >
              Already have an account? Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal; 