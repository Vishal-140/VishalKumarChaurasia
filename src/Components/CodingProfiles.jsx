import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
// Use custom intersection observer hook instead of the package
const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = React.useState(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options.threshold, options.root, options.rootMargin]);

  return [setRef, inView];
};
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { ExternalLink, Code, Award, TrendingUp, Star, BarChart2, Users } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Coding profiles data
const codingProfilesData = [
  {
    id: 'leetcode',
    name: 'LeetCode',
    username: 'vishal_kumar',
    link: 'https://leetcode.com/vishal_kumar/',
    logo: '/assets/images/coding-profiles/leetcode.svg',
    color: '#FFA116',
    stats: {
      problems: '450+',
      contests: '20+',
      ranking: 'Top 5%'
    }
  },
  {
    id: 'gfg',
    name: 'GeeksForGeeks',
    username: 'vishal_kumar123',
    link: 'https://auth.geeksforgeeks.org/user/vishal_kumar123',
    logo: '/assets/images/coding-profiles/gfg.svg',
    color: '#2F8D46',
    stats: {
      problems: '300+',
      articles: '5+',
      score: '1200+'
    }
  },
  {
    id: 'codestudio',
    name: 'CodeStudio',
    username: 'vishal.kumar',
    link: 'https://www.codingninjas.com/studio/profile/vishal.kumar',
    logo: '/assets/images/coding-profiles/codestudio.png',
    color: '#F78D1E',
    stats: {
      problems: '200+',
      streak: '45 days',
      points: '1500+'
    }
  },
  {
    id: 'codechef',
    name: 'CodeChef',
    username: 'vishal_kumar21',
    link: 'https://www.codechef.com/users/vishal_kumar21',
    logo: '/assets/images/coding-profiles/codechef.svg',
    color: '#5B4638',
    stats: {
      rating: '1800+',
      contests: '15+',
      division: 'Div 2'
    }
  },
  {
    id: 'hackerrank',
    name: 'HackerRank',
    username: 'vishal_kumar',
    link: 'https://www.hackerrank.com/vishal_kumar',
    logo: '/assets/images/coding-profiles/hackerrank.svg',
    color: '#00EA64',
    stats: {
      stars: '5★',
      badges: '12+',
      certifications: '3'
    }
  },
  {
    id: 'codeforces',
    name: 'Codeforces',
    username: 'vishal_kumar',
    link: 'https://codeforces.com/profile/vishal_kumar',
    logo: '/assets/images/coding-profiles/codeforces.svg',
    color: '#1F8ACB',
    stats: {
      rating: '1400+',
      contests: '25+',
      problems: '300+'
    }
  }
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12
    }
  }
};

const statsVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { 
      duration: 0.5,
      delay: 0.2,
      ease: 'easeOut' 
    }
  }
};

const CodingProfiles = () => {
  const { isDark } = useTheme();
  const controls = useAnimation();
  const [ref, inView] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px'
  });
  
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const profilesRef = useRef(Array(codingProfilesData.length).fill(null));
  
  // Three.js setup for background effect
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true
    });
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create particle system
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 300;
    
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 10;
      posArray[i + 1] = (Math.random() - 0.5) * 10;
      posArray[i + 2] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particleTexture = new THREE.TextureLoader().load('/assets/images/particle.png');
    
    // Create particle material with appropriate color based on theme
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      map: particleTexture,
      transparent: true,
      color: isDark ? 0x4F46E5 : 0x6366F1,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 5;
    
    // Animation
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate the particle system
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = elapsedTime * 0.03;
      
      // Update controls
      renderer.render(scene, camera);
      
      window.requestAnimationFrame(animate);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [isDark]);
  
  // GSAP animations for scrolling effects
  useEffect(() => {
    if (!inView) return;
    
    controls.start('visible');
    
    // GSAP animations for each profile card
    profilesRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        {
          y: 50,
          opacity: 0,
          rotationY: -5,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Add hover effect
      gsap.set(card, { transformOrigin: 'center center' });
      
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: isDark 
            ? '0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(79, 70, 229, 0.4)' 
            : '0 20px 30px -10px rgba(0, 0, 0, 0.2), 0 0 15px rgba(99, 102, 241, 0.3)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: isDark 
            ? '0 10px 15px -5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(79, 70, 229, 0.2)' 
            : '0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(99, 102, 241, 0.1)',
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    });
  }, [controls, inView, isDark]);
  
  return (
    <section
      id="coding-profiles"
      data-section="coding-profiles"
      ref={(el) => {
        ref(el);
        sectionRef.current = el;
      }}
      className={`min-h-screen relative overflow-hidden section-spacing ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Three.js background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-50"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        {/* Section title */}
        <div className="section-title-container">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-h1 gradient-heading"
          >
            Coding Profiles
          </motion.h2>
          <div className="divider"></div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`section-subtitle text-body-lg ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            My competitive programming and problem-solving journey across platforms
          </motion.p>
        </div>
        
        {/* Coding profiles grid */}
        <motion.div
          ref={sectionRef}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 mb-8"
        >
          {codingProfilesData.map((profile, index) => (
            <motion.a
              key={profile.id}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ 
                zIndex: 10,
                boxShadow: isDark 
                  ? '0 10px 25px rgba(0, 0, 0, 0.3), 0 0 10px rgba(79, 70, 229, 0.3)' 
                  : '0 10px 25px rgba(0, 0, 0, 0.1), 0 0 10px rgba(99, 102, 241, 0.2)',
                borderColor: isDark ? 'rgba(139, 92, 246, 0.5)' : 'rgba(79, 70, 229, 0.5)',
                transition: { duration: 0.3 }
              }}
              className={`relative overflow-hidden rounded-xl ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              }`}
              ref={el => profilesRef.current[index] = el}
              style={{
                boxShadow: isDark 
                  ? '0 10px 15px -5px rgba(0, 0, 0, 0.3), 0 0 5px rgba(79, 70, 229, 0.2)' 
                  : '0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 0 5px rgba(99, 102, 241, 0.1)'
              }}
            >
              {/* Diagonal ribbon with platform color */}
              <div 
                className="absolute top-0 right-0 w-24 h-24 overflow-hidden"
              >
                <div 
                  className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 rotate-45 w-20 h-20"
                  style={{ backgroundColor: profile.color }}
                ></div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {/* Platform logo */}
                  <div 
                    className="w-12 h-12 flex items-center justify-center rounded-lg mr-4 overflow-hidden"
                    style={{ 
                      backgroundColor: `${profile.color}20`,
                      border: `1px solid ${profile.color}40`
                    }}
                  >
                    <motion.img
                      src={profile.logo}
                      alt={`${profile.name} logo`}
                      className="w-8 h-8 object-contain"
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/assets/images/coding-profiles/default.svg';
                      }}
                    />
                  </div>
                  
                  {/* Platform info */}
                  <div>
                    <h3 className={`text-h4 font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {profile.name}
                    </h3>
                    <p className={`text-sm flex items-center ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`}>
                      <Code size={14} className="mr-1" />
                      {profile.username}
                    </p>
                  </div>
                </div>
                
                {/* Stats grid */}
                <motion.div 
                  variants={statsVariants}
                  className="grid grid-cols-3 gap-2 mt-5"
                >
                  {Object.entries(profile.stats).map(([key, value], i) => (
                    <div 
                      key={`${profile.id}-${key}`}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg ${
                        isDark ? 'bg-gray-700/50' : 'bg-gray-100/80'
                      }`}
                    >
                      <span className={`text-xs uppercase ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        {key}
                      </span>
                      <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                        {value}
                      </span>
                      <span className="mt-1">
                        {key === 'problems' && <Code size={12} />}
                        {key === 'contests' && <Award size={12} />}
                        {key === 'ranking' && <TrendingUp size={12} />}
                        {key === 'stars' && <Star size={12} />}
                        {key === 'rating' && <BarChart2 size={12} />}
                        {key === 'score' && <TrendingUp size={12} />}
                        {key === 'badges' && <Award size={12} />}
                        {key === 'streak' && <TrendingUp size={12} />}
                        {key === 'articles' && <Users size={12} />}
                        {key === 'division' && <BarChart2 size={12} />}
                        {key === 'points' && <TrendingUp size={12} />}
                        {key === 'certifications' && <Award size={12} />}
                      </span>
                    </div>
                  ))}
                </motion.div>
                
                {/* Visit link */}
                <motion.div 
                  className="flex justify-end mt-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div 
                    className="flex items-center gap-1 text-body-sm"
                    style={{ color: profile.color }}
                  >
                    <span>Visit Profile</span>
                    <ExternalLink size={14} />
                  </div>
                </motion.div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
