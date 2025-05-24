import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sun, Moon, Menu, X, FileDown, Home, User, Briefcase, FolderGit2, Award, Mail } from 'lucide-react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection, getActiveSection } from '../utils/scrollUtils';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Experiences', id: 'experiences' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' }
];

function Navbar({ isNavVisible, setIsNavVisible, isMobile }) {
  const { isDark, toggleTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  
  const audioRef = useRef(null);
  const bubbleSoundRef = useRef(null);
  const navRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const particlesRef = useRef(null);

  // Three.js setup
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 288 / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(288, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 50;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: isDark ? 0x60a5fa : 0x3b82f6,
      transparent: true,
      opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    sceneRef.current = { scene, camera, renderer, particlesMesh };
    particlesRef.current = particlesMesh;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
        particlesRef.current.rotation.x += 0.0005;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    return () => {
      renderer.dispose();
    };
  }, [isDark]);

  // Scroll tracking and active section detection
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const currentSection = getActiveSection();
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Audio setup
  useEffect(() => {
    // Initialize audio
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio('/assets/audio/backgroundmusic.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      
      // Initialize bubble sound
      bubbleSoundRef.current = new Audio('/assets/audio/bubblepopup.mp3');
      bubbleSoundRef.current.volume = 0.5;
    }
  }, []);

  // Theme change effect
  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.material.color.setHex(isDark ? 0x60a5fa : 0x3b82f6);
    }
  }, [isDark]);

  // Bubble sound functionality removed as requested

  const toggleMusic = async () => {
    try {
      if (isPlaying) {
        await audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current?.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Music toggle failed:', error);
    }
  };

  const toggleNavbar = () => {
    setIsNavVisible(!isNavVisible);
  };

  const handleNavClick = (id) => {
    // Hide navbar on mobile after clicking an item
    if (isMobile) {
      setIsNavVisible(false);
    }
    
    // Scroll to the section with smooth animation
    scrollToSection(id);
  };
  
  const handleDownloadCV = () => {
    // Create a link to download the CV file
    const link = document.createElement('a');
    link.href = '/assets/VishalCV.pdf';  // CV file in public folder
    link.download = 'Vishal_Kumar_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Dynamic navbar opacity based on scroll
  const navOpacity = Math.max(0.8, 1 - scrollY / 500);

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleNavbar}
        className={`fixed top-6 z-50 p-4 rounded-full transition-all duration-500 hover:scale-110 backdrop-blur-md border`}
        style={{
          left: isNavVisible ? (isMobile ? '270px' : '294px') : '24px',
          transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.95)',
          color: 'var(--text-primary)',
          borderColor: 'var(--accent)',
          boxShadow: isDark 
            ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(96,165,250,0.3)' 
            : '0 10px 30px rgba(71,85,105,0.15), 0 0 0 1px rgba(255,255,255,0.8), inset 0 1px 0 rgba(255,255,255,0.9)'
        }}
      >
        {isNavVisible ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Navbar Container */}
      <div
        ref={navRef}
        className={`fixed z-40 h-full transition-all duration-500 ease-out backdrop-blur-2xl ${
          isMobile
            ? `top-0 left-0 w-64 ${
                isNavVisible ? 'translate-x-0' : '-translate-x-full'
              } shadow-2xl`
            : `top-0 left-0 w-72 ${
                isNavVisible ? 'translate-x-0' : '-translate-x-full'
              }`
        }`}
        style={{
          backgroundColor: 'var(--bg-secondary)',
          boxShadow: isDark
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.8), 0 8px 10px -6px rgba(0, 0, 0, 0.6)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)'
        }}
      >
        {/* Particle Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-40"
        />
        
        {/* Navbar Content Container */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 overflow-y-auto">
          {/* Logo and Nav items */}
          <div>
            <div className="text-center mb-12 mt-6">
              <h2 className="text-h3 gradient-heading animate-pulse">Vishal</h2>
              <p className="text-body-sm font-semibold tracking-wider transition-all duration-500 hover:tracking-widest"
                 style={{ color: 'var(--accent)' }}
              >Full Stack Developer</p>
            </div>
            
            {/* Navigation Links */}
            <nav className="space-y-2">
              {navItems.map((item, index) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {/* Single unified background glow for active/hovered items */}
                  {(activeSection === item.id || hoveredItem === index) && (
                    <div
                      className={`absolute inset-0 rounded-2xl -z-10 ${activeSection === item.id ? 'active-glow' : ''}`}
                      style={{
                        opacity: activeSection === item.id ? 1 : 0.7,
                        background: isDark
                          ? 'linear-gradient(135deg, rgba(30,64,175,0.6) 0%, rgba(67,56,202,0.6) 100%)'
                          : 'linear-gradient(135deg, rgba(37,99,235,0.4) 0%, rgba(79,70,229,0.4) 100%)',
                        boxShadow: activeSection === item.id 
                          ? isDark
                            ? '0 0 15px 2px rgba(59,130,246,0.5)'
                            : '0 0 12px 1px rgba(59,130,246,0.3)'
                          : 'none',
                        border: isDark
                          ? '1px solid rgba(147,197,253,0.5)'
                          : '1px solid rgba(59,130,246,0.4)'
                      }}
                    />
                  )}
                  
                  
                  {/* Navigation Item */}
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`relative w-full text-left ${isMobile ? 'px-6 py-4' : 'px-8 py-5'} rounded-2xl transition-all duration-300 cursor-pointer font-medium ${isMobile ? 'text-base' : 'text-lg'}`}
                    style={{
                      transform: (hoveredItem === index || activeSection === item.id)
                        ? 'translateX(8px)' 
                        : 'translateX(0)',
                      transition: 'all 0.3s ease-in-out',
                      fontWeight: (hoveredItem === index || activeSection === item.id) ? '700' : '500',
                      color: activeSection === item.id
                        ? isDark 
                          ? '#ffffff' 
                          : '#1e3a8a'
                        : (hoveredItem === index)
                          ? isDark ? '#ffffff' : '#000000'
                          : isDark ? '#d1d5db' : '#374151',
                      textShadow: activeSection === item.id
                        ? isDark
                          ? '0 0 2px rgba(0,0,0,0.7)'
                          : '0 0 2px rgba(255,255,255,0.7)'
                        : 'none'
                    }}
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      {item.id === 'home' && 
                        <Home 
                          size={16} 
                          className="transition-all duration-300"
                          style={{
                            color: activeSection === item.id
                              ? isDark ? '#60a5fa' : '#2563eb'
                              : (hoveredItem === index)
                                ? isDark ? '#ffffff' : '#000000'
                                : isDark ? '#6b7280' : '#94a3b8',
                            transform: activeSection === item.id ? 'scale(125%)' : 'scale(100%)'
                          }}
                        />
                      }
                      {item.id === 'about' && 
                        <User 
                          size={16} 
                          className="transition-all duration-300"
                          style={{
                            color: activeSection === item.id
                              ? isDark ? '#60a5fa' : '#2563eb'
                              : (hoveredItem === index)
                                ? isDark ? '#ffffff' : '#000000'
                                : isDark ? '#6b7280' : '#94a3b8',
                            transform: activeSection === item.id ? 'scale(125%)' : 'scale(100%)'
                          }}
                        />
                      }
                      {item.id === 'experiences' && 
                        <Briefcase 
                          size={16} 
                          className="transition-all duration-300"
                          style={{
                            color: activeSection === item.id
                              ? isDark ? '#60a5fa' : '#2563eb'
                              : (hoveredItem === index)
                                ? isDark ? '#ffffff' : '#000000'
                                : isDark ? '#6b7280' : '#94a3b8',
                            transform: activeSection === item.id ? 'scale(125%)' : 'scale(100%)'
                          }}
                        />
                      }
                      {item.id === 'projects' && 
                        <FolderGit2 
                          size={16} 
                          className="transition-all duration-300"
                          style={{
                            color: activeSection === item.id
                              ? isDark ? '#60a5fa' : '#2563eb'
                              : (hoveredItem === index)
                                ? isDark ? '#ffffff' : '#000000'
                                : isDark ? '#6b7280' : '#94a3b8',
                            transform: activeSection === item.id ? 'scale(125%)' : 'scale(100%)'
                          }}
                        />
                      }
                      {item.id === 'skills' && 
                        <Award 
                          size={16} 
                          className="transition-all duration-300"
                          style={{
                            color: activeSection === item.id
                              ? isDark ? '#60a5fa' : '#2563eb'
                              : (hoveredItem === index)
                                ? isDark ? '#ffffff' : '#000000'
                                : isDark ? '#6b7280' : '#94a3b8',
                            transform: activeSection === item.id ? 'scale(125%)' : 'scale(100%)'
                          }}
                        />
                      }
                      {item.id === 'contact' && 
                        <Mail 
                          size={16} 
                          className="transition-all duration-300"
                          style={{
                            color: activeSection === item.id
                              ? isDark ? '#60a5fa' : '#2563eb'
                              : (hoveredItem === index)
                                ? isDark ? '#ffffff' : '#000000'
                                : isDark ? '#6b7280' : '#94a3b8',
                            transform: activeSection === item.id ? 'scale(125%)' : 'scale(100%)'
                          }}
                        />
                      }
                      {item.name}
                    </span>
                    
                    {/* Ripple effect */}
                    {(hoveredItem === index || activeSection === item.id) && (
                      <div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: isDark 
                            ? 'rgba(255,255,255,0.1)' 
                            : 'rgba(0,0,0,0.1)',
                          animation: 'ripple 0.6s ease-out'
                        }}
                      />
                    )}
                  </button>
                </div>
              ))}
            </nav>
          </div>

          {/* Control Buttons Container */}
          <div className="mt-auto">
            <div className="flex justify-center space-x-4 mb-8">
              {/* Music Toggle */}
              <div className="group relative">
                <button
                  onClick={toggleMusic}
                  className={`rounded-full p-3 transition-colors duration-300 ${
                    isDark ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'
                  } text-white shadow-md hover:scale-110 transition-transform`}
                  aria-label="Toggle Music"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isPlaying ? 'Pause Music' : 'Play Music'}
                </div>
              </div>
              
              {/* Theme Toggle */}
              <div className="group relative">
                <button
                  onClick={toggleTheme}
                  className="rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-md"
                  style={{
                    backgroundColor: isDark ? 'var(--accent-secondary)' : 'var(--accent)',
                    color: '#ffffff',
                    boxShadow: isDark
                      ? '0 4px 12px rgba(167, 139, 250, 0.5)'
                      : '0 4px 12px rgba(59, 130, 246, 0.5)'
                  }}
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </div>
              </div>
              
              {/* Download CV Button */}
              <div className="group relative">
                <button
                  onClick={handleDownloadCV}
                  className={`rounded-full p-3 transition-colors duration-300 ${
                    isDark ? 'bg-green-600 hover:bg-green-500' : 'bg-green-500 hover:bg-green-400'
                  } text-white shadow-md hover:scale-110 transition-transform`}
                  aria-label="Download CV"
                >
                  <FileDown size={20} />
                </button>
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black bg-opacity-75 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Download CV
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className={`text-center ${isMobile ? 'text-xs' : 'text-sm'} ${
              isDark ? 'text-gray-400' : 'text-slate-500'
            } font-light`}>
              <div className={`h-px w-full mb-4 ${
                isDark ? 'bg-gray-700' : 'bg-slate-300'
              }`} />
              © {new Date().getFullYear()} Vishal Portfolio
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        
        @keyframes glow-pulse {
          0% {
            opacity: 0.8;
            box-shadow: 0 0 15px 2px rgba(59,130,246,0.5);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 25px 4px rgba(59,130,246,0.7), 0 0 10px rgba(147,197,253,0.5);
          }
          100% {
            opacity: 0.8;
            box-shadow: 0 0 15px 2px rgba(59,130,246,0.5);
          }
        }
        
        .active-glow {
          animation: glow-pulse 2s infinite ease-in-out;
        }
        
        @media (max-width: 768px) {
          .backdrop-blur-2xl {
            backdrop-filter: blur(20px);
          }
        }
        
        .dark {
          color-scheme: dark;
        }
      `}</style>
    </>
  );
}

export default Navbar;