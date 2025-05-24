import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Keyboard, X, Smartphone } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const MusicPopup = ({ isPlaying, toggleMusic, isVisible, setIsVisible }) => {
  const { isDark } = useTheme();
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  
  // Close popup after delay if auto-hiding
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 8000); // Auto-hide after 8 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, setIsVisible]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Check if the key is spacebar or 'k'
      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        // Only toggle if not typing in an input, textarea, etc.
        if (e.target.tagName !== 'INPUT' && 
            e.target.tagName !== 'TEXTAREA' && 
            !e.target.isContentEditable) {
          e.preventDefault();
          toggleMusic();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [toggleMusic]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 
                     ${isDark ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-800'} 
                     rounded-xl shadow-xl px-6 py-4 max-w-md w-[90%] border
                     ${isDark ? 'border-gray-700' : 'border-gray-200'}`}
          style={{
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05)' 
              : '0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Close button */}
          <button 
            onClick={() => setIsVisible(false)}
            className={`absolute top-3 right-3 rounded-full p-1
                       ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} 
                       transition-colors`}
            aria-label="Close popup"
          >
            <X size={16} />
          </button>
          
          <div className="flex items-center mb-3">
            <Volume2 
              className={`mr-3 ${isPlaying ? 'text-violet-500' : 'text-gray-400'}`} 
              size={24} 
            />
            <h3 className="font-semibold text-lg">Background Music</h3>
          </div>
          
          <p className="text-sm mb-4 opacity-90">
            This website features background music to enhance your experience.
          </p>
          
          {/* Controls section */}
          <div className="mb-2">
            <button
              onClick={toggleMusic}
              className={`${isDark 
                ? 'bg-violet-600 hover:bg-violet-500' 
                : 'bg-violet-500 hover:bg-violet-400'} 
                text-white px-4 py-2 rounded-lg font-medium text-sm w-full transition-colors`}
            >
              {isPlaying ? 'Pause Music' : 'Play Music'}
            </button>
          </div>
          
          {/* Toggle keyboard shortcuts info */}
          <div className="mt-4 text-xs">
            <button 
              onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
              className={`flex items-center text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} hover:underline`}
            >
              {showKeyboardShortcuts ? 'Hide Controls' : 'Show Controls'}
            </button>
            
            <AnimatePresence>
              {showKeyboardShortcuts && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    {/* Desktop */}
                    <div className="flex items-center mb-2">
                      <Keyboard size={14} className="mr-2" />
                      <span className="text-xs font-medium">Keyboard:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        Spacebar
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        "K" key
                      </div>
                    </div>
                    
                    {/* Mobile */}
                    <div className="flex items-center mb-2">
                      <Smartphone size={14} className="mr-2" />
                      <span className="text-xs font-medium">Mobile:</span>
                    </div>
                    <div className="text-xs">
                      Use the button above or toggle music from the navbar.
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MusicPopup;
