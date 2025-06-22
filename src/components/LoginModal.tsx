import { LogIn, X, Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
  onLogin?: (email: string, password: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitch, onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate successful login (allows any user as requested)
    setTimeout(() => {
      setIsSubmitting(false);
      // Clear form
      setEmail('');
      setPassword('');
      // Close modal
      onClose();
      // Here you could redirect the user or change the application state
      console.log('Login successful:', { email, password });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <LogIn size={28} className="text-blue-500" />
              <h2 className="text-2xl font-bold text-gray-800">Log In</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X size={24} className="text-gray-600" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
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
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold transition-colors mt-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              onClick={onSwitch}
              className="text-blue-500 hover:underline font-semibold"
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