import { UserPlus, X, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';
import { validateRegistration } from '../utils/authUtils';
import { useAuth } from '../contexts/AuthContext';

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
        // Close modal and switch to login
        onClose();
        onSwitch();
      } else {
        setErrors(['Registration failed. Please try again.']);
      }
    } catch (err) {
      setErrors(['An error occurred during registration.']);
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <UserPlus size={28} className="text-green-500" />
              <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          {errors.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-red-600 text-sm space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Minimum 8 characters, one number and one special character
              </p>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitch}
              className="text-green-500 hover:underline font-semibold"
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