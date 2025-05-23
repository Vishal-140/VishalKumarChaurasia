// Helper functions for smooth scrolling and active section tracking

/**
 * Smoothly scrolls to a target element by ID
 * @param {string} id - The ID of the element to scroll to
 * @param {number} duration - Animation duration in ms
 */
export const scrollToSection = (id, duration = 800) => {
  const targetElement = document.getElementById(id);
  
  if (!targetElement) return;
  
  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;
  
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const scrollY = easeInOutCubic(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, scrollY);
    
    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }
  
  // Easing function for smooth animation
  function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
  }
  
  requestAnimationFrame(animation);
};

/**
 * Determines which section is currently in view
 * @returns {string} The ID of the active section
 */
export const getActiveSection = () => {
  const sections = [
    'home',
    'about',
    'experiences',
    'projects',
    'skills',
    'contact'
  ];
  
  // Get all section elements
  const sectionElements = sections.map(id => document.getElementById(id));
  
  // Filter out any null elements (sections that don't exist in the DOM)
  const validSections = sectionElements.filter(el => el !== null);
  
  // Calculate which section is most in view
  let maxVisibleSection = null;
  let maxVisiblePercentage = 0;
  
  validSections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how much of the section is visible
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const sectionHeight = rect.height;
    
    // Calculate percentage of section visible (0 to 1)
    const visiblePercentage = visibleHeight > 0 ? visibleHeight / sectionHeight : 0;
    
    // Update max if this section has more visible area
    if (visiblePercentage > maxVisiblePercentage) {
      maxVisiblePercentage = visiblePercentage;
      maxVisibleSection = section.id;
    }
  });
  
  return maxVisibleSection;
};
