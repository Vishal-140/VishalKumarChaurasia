import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Experiences from "./Components/Experiences";
import Projects from "./Components/Projects";
import Skills from "./Components/Skills";
import Footer from "./Components/Footer";
import Contact from "./Components/Contact";
import SEO from "./Components/SEO";
import { ThemeProvider } from "./context/ThemeContext";
import { setupSmoothScrolling, setupLazyLoading, preloadResources } from "./utils/performanceUtils";

function App() {
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection and performance optimizations
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // On mobile, start with navbar closed
      if (mobile) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
    };
    
    // Initialize all performance optimizations
    setupSmoothScrolling();
    setupLazyLoading();
    
    // Preload essential resources
    preloadResources([
      { url: '/src/assets/images/profile.jpg', type: 'image' },
      { url: '/src/assets/VishalCV.pdf', type: 'document' }
    ]);
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate the navbar width based on screen size
  const getNavbarWidth = () => {
    if (isMobile) return "16rem"; // 64 * 0.25rem = 16rem for mobile
    return "18rem"; // 72 * 0.25rem = 18rem for desktop
  };

  return (
    <ThemeProvider>
      <SEO />
      <div className="min-h-screen transition-all duration-300" style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
      {/* Pass state management props to Navbar */}
      <Navbar 
        isNavVisible={isNavVisible} 
        setIsNavVisible={setIsNavVisible}
        isMobile={isMobile}
      />
      
      {/* Main content area with smooth transition */}
<div
  className="transition-all duration-500 ease-out min-h-screen w-full overflow-x-hidden"
  style={{
    marginLeft: isNavVisible && !isMobile ? getNavbarWidth() : "0",
    width: isNavVisible && !isMobile ? `calc(100% - ${getNavbarWidth()})` : "100%",
    transform: isNavVisible && !isMobile ? "scale(1)" : "scale(1)",
    transformOrigin: "left center",
  }}
>
  {/* Mobile overlay backdrop when navbar is open */}
  {isMobile && isNavVisible && (
    <div 
      className="fixed inset-0 z-30 backdrop-blur-sm transition-opacity duration-300"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
      }}
      onClick={() => setIsNavVisible(false)}
    />
  )}

  {/* Actual Page Content */}
  <div className="relative z-10">
    <div id="home"><Home /></div>
    <div id="about"><About /></div>
    <div id="experiences"><Experiences /></div>
    <div id="projects"><Projects /></div>
    <div id="skills"><Skills /></div>
    <div id="contact"><Contact /></div>
    <div id="footer"><Footer /></div>
  </div>
</div>

    </div>
    </ThemeProvider>
  );
}

export default App;