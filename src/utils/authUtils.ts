export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (password: string): PasswordValidationResult => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRegistration = (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!firstName.trim()) {
    errors.push('First name is required');
  }
  
  if (!lastName.trim()) {
    errors.push('Last name is required');
  }
  
  if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }
  
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    errors.push(...passwordValidation.errors);
  }
  
  if (password !== confirmPassword) {
    errors.push('Passwords do not match');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}; 