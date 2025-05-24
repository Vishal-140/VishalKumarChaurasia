// Standardized animation utilities for consistent effects across components

/**
 * Creates particles for background effects
 * @param {Object} options - Configuration options
 * @returns {Object} - Cleanup function
 */
export const createBackgroundParticles = ({ 
  count = 50, 
  elementClass = 'floating-particle',
  color = 'rgba(139, 92, 246, 0.3)',
  size = { min: 2, max: 4 },
  duration = { min: 15, max: 25 },
  container = document.body
} = {}) => {
  // Clear any existing particles with the same class
  const existingParticles = document.querySelectorAll(`.${elementClass}`);
  existingParticles.forEach(particle => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  });

  // Create new particles
  const particles = [];
  const createParticle = () => {
    const particle = document.createElement('div');
    particle.className = elementClass;
    
    // Calculate random size between min and max
    const particleSize = Math.random() * (size.max - size.min) + size.min;
    
    // Calculate random animation duration
    const animationDuration = Math.random() * (duration.max - duration.min) + duration.min;
    
    particle.style.cssText = `
      position: fixed;
      width: ${particleSize}px;
      height: ${particleSize}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 1;
      left: ${Math.random() * 100}vw;
      top: 100vh;
      animation: float-up ${animationDuration}s linear infinite;
    `;
    
    container.appendChild(particle);
    particles.push(particle);
    
    // Remove particle after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
        const index = particles.indexOf(particle);
        if (index > -1) {
          particles.splice(index, 1);
        }
      }
    }, animationDuration * 1000);
  };
  
  // Create initial batch of particles
  for (let i = 0; i < count; i++) {
    setTimeout(() => createParticle(), i * 300);
  }
  
  // Continue creating particles at intervals
  const particleInterval = setInterval(createParticle, 300);
  
  // Add necessary CSS animation
  const styleId = 'particle-animations';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes float-up {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translateY(-100vh) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Return cleanup function
  return {
    cleanup: () => {
      clearInterval(particleInterval);
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    }
  };
};

/**
 * Common animation variants for Framer Motion
 */
export const motionVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  popIn: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 15 
      } 
    }
  }
};

/**
 * Helper function to play sounds with better error handling
 * @param {HTMLAudioElement} audioElement - The audio element to play
 * @param {Object} options - Additional options
 */
export const playSound = (audioElement, { volume = 0.5, onError = null } = {}) => {
  if (!audioElement) return;
  
  // Reset audio state
  audioElement.currentTime = 0;
  audioElement.volume = volume;
  
  // Play with error handling
  audioElement.play().catch(error => {
    console.log('Audio play failed:', error);
    if (onError && typeof onError === 'function') {
      onError(error);
    }
  });
};
