/**
 * Utilities for improving accessibility and image optimization
 */

/**
 * Handles image loading optimization with proper error handling
 * @param {Event} event - The image onError event
 * @param {string} fallbackSrc - A fallback image source to use if the original fails
 */
export const handleImageError = (event, fallbackSrc = '/src/assets/images/placeholder.jpg') => {
  console.warn('Image failed to load:', event.target.src);
  event.target.src = fallbackSrc;
  event.target.alt = 'Image could not be loaded';
};

/**
 * Creates descriptive alt text for project images
 * @param {Object} project - Project data object
 * @returns {string} - Descriptive alt text
 */
export const getProjectImageAlt = (project) => {
  return `${project.title} - ${project.type} project using ${project.technologies.slice(0, 3).join(', ')}${project.technologies.length > 3 ? ' and more' : ''}`;
};

/**
 * Enhances focus management for keyboard navigation
 * @param {string} containerId - ID of the container element
 * @param {string} selector - CSS selector for focusable elements
 */
export const setupFocusTrap = (containerId, selector = 'a, button, input, textarea, select, [tabindex]:not([tabindex=\"-1\"])') => {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const focusableElements = container.querySelectorAll(selector);
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  // Handle tabbing through focusable elements
  container.addEventListener('keydown', (event) => {
    // If not Tab key, ignore
    if (event.key !== 'Tab') return;
    
    // Shift + Tab on first element should wrap to last element
    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }
    
    // Tab on last element should wrap to first element
    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  });
  
  return {
    // Focus the first element in the trap
    focusFirst: () => firstElement && firstElement.focus(),
    // Clean up event listeners
    destroy: () => container.removeEventListener('keydown', container)
  };
};

/**
 * Checks and manages ARIA attributes for better accessibility
 * @param {HTMLElement} element - DOM element to enhance
 * @param {Object} attributes - ARIA attributes to set
 */
export const enhanceAriaAttributes = (element, attributes = {}) => {
  if (!element) return;
  
  // Set provided ARIA attributes
  Object.entries(attributes).forEach(([key, value]) => {
    const ariaKey = key.startsWith('aria-') ? key : `aria-${key}`;
    element.setAttribute(ariaKey, value);
  });
  
  // Check for common accessibility issues
  if (element.tagName === 'BUTTON' && !element.getAttribute('aria-label') && !element.textContent.trim()) {
    console.warn('Button missing accessible text content or aria-label', element);
    element.setAttribute('aria-label', 'Unlabeled button');
  }
  
  if (element.tagName === 'A' && element.getAttribute('target') === '_blank' && !element.getAttribute('rel')) {
    element.setAttribute('rel', 'noopener noreferrer');
  }
};
