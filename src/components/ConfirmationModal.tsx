import React, { useEffect, useRef } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  // Hooks SIEMPRE van al inicio, antes de cualquier return
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLHeadingElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Focus trap effect
  useEffect(() => {
    if (isOpen) {
      // Focus the first element when modal opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);

      // Handle Tab key to trap focus
      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (focusableElements && focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            
            if (e.shiftKey) {
              if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl max-w-md w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        aria-describedby="confirmation-message"
      >
        {/* Header */}
        <header className="p-6 pb-4" role="banner">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3" role="group" aria-labelledby="confirmation-title">
              <AlertTriangle size={24} className="text-orange-500" aria-hidden="true" />
              <h2 
                id="confirmation-title"
                ref={firstFocusableRef}
                className="text-xl font-bold text-gray-800" 
                tabIndex={0}
                aria-label={`Confirmation dialog: ${title}`}
              >
                {title}
              </h2>
            </div>
            <button
              onClick={onCancel}
              onKeyDown={(e) => handleKeyDown(e, onCancel)}
              className="p-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg transition-colors"
              tabIndex={0}
              aria-label="Close confirmation dialog"
            >
              <X size={20} className="text-gray-800" aria-hidden="true" />
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 pb-4" role="main">
          <p 
            id="confirmation-message"
            className="text-gray-600" 
            tabIndex={0}
            aria-label={`Message: ${message}`}
          >
            {message}
          </p>
        </main>

        {/* Footer */}
        <footer className="p-6 pt-4" role="contentinfo">
          <div className="flex gap-3" role="group" aria-label="Action buttons">
            <button
              onClick={onCancel}
              onKeyDown={(e) => handleKeyDown(e, onCancel)}
              className="flex-1 bg-gray-500 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              tabIndex={0}
              aria-label="Cancel action and close dialog"
            >
              Cancel
            </button>
            <button
              ref={lastFocusableRef}
              onClick={onConfirm}
              onKeyDown={(e) => handleKeyDown(e, onConfirm)}
              className="flex-1 bg-red-500 hover:bg-red-600 focus:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white px-4 py-3 rounded-lg font-semibold transition-colors"
              tabIndex={0}
              aria-label="Confirm action"
            >
              Confirm
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmationModal;