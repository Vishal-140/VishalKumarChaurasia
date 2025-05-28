import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';
import { createBackgroundParticles } from '../utils/animationUtils';

function Experiences() {
  const { isDark } = useTheme();
  const containerRef = useRef();
  const sceneRef = useRef();
  const experienceRefs = useRef([]);
  const particlesRef = useRef();
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    sceneRef.current.appendChild(renderer.domElement);

    // Particle System
    const particleCount = 100;
    const particles = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }

    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x64ffda,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);
    particlesRef.current = { system: particleSystem, velocities };

    camera.position.z = 5;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Animate particles
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] += velocities[i].x;
        positions[i * 3 + 1] += velocities[i].y;
        positions[i * 3 + 2] += velocities[i].z;

        // Boundary checks
        if (Math.abs(positions[i * 3]) > 10) velocities[i].x *= -1;
        if (Math.abs(positions[i * 3 + 1]) > 10) velocities[i].y *= -1;
        if (Math.abs(positions[i * 3 + 2]) > 10) velocities[i].z *= -1;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
      
      // Rotate particle system
      particleSystem.rotation.y += 0.005;
      
      renderer.render(scene, camera);
    };
    animate();

    // GSAP Animations with ScrollTrigger-like functionality
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          
          // Animate experience cards
          if (target.classList.contains('experience-card')) {
            target.style.transform = 'translateX(0)';
            target.style.opacity = '1';
            
            // Stagger animation for skills
            const skills = target.querySelectorAll('.skill-tag');
            skills.forEach((skill, index) => {
              setTimeout(() => {
                skill.style.transform = 'scale(1) rotate(0deg)';
                skill.style.opacity = '1';
              }, index * 100);
            });
          }
          
          // Animate title
          if (target.classList.contains('main-title')) {
            target.style.transform = 'translateY(0)';
            target.style.opacity = '1';
          }
        }
      });
    }, observerOptions);

    // Observe elements
    const title = containerRef.current.querySelector('.main-title');
    const cards = containerRef.current.querySelectorAll('.experience-card');
    
    if (title) observer.observe(title);
    cards.forEach(card => observer.observe(card));

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x = mouseX * 0.5;
      camera.position.y = mouseY * 0.5;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
      if (sceneRef.current && sceneRef.current.contains(renderer.domElement)) {
        sceneRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const experiences = [
    {
      title: "Web Developer",
      company: "Freelance Projects",
      period: "2023 - Present",
      description: "Created custom websites for small businesses, implemented modern design patterns, and optimized performance for better user engagement.",
      skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS", "Responsive Design"]
    },
    {
      title: "Frontend Intern",
      company: "Gokboru Tech",
      period: "Sep 2024 - Nov 2024",
      description: "Developed responsive UI components, enhanced user experience across multiple projects, and built reusable React components for improved development efficiency. Collaborated with senior developers to implement modern web technologies.",
      skills: ["React", "JavaScript", "CSS3", "Tailwind CSS" , "Responsive Design"],
      certified: true,
      certificateFile: "/assets/images/certificates/intern_gokboru.png",
      certificateType: "image"
    },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden py-24 px-4 md:px-8 lg:px-16"
      ref={containerRef}
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Three.js Background */}
      <div 
        ref={sceneRef} 
        className="absolute inset-0 z-0"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Content */}
      <div ref={containerRef} className="relative z-10 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Animated Title */}
          <h2 
            className="main-title text-h1 gradient-heading mb-10 text-center"
            style={{
              transform: 'translateY(50px)',
              opacity: '0',
              transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)'
            }}
          >
            Experiences
          </h2>
          <div className="divider mb-10"></div>
          
          {/* Experience Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-purple-600 opacity-50 hidden md:block" />
            
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`experience-card relative rounded-xl p-6 backdrop-blur-sm transition-all duration-500 group ${isDark ? 'bg-gray-900/80 border border-gray-800/50 hover:border-cyan-400/50' : 'bg-white/90 border border-gray-200 hover:border-blue-400/70 shadow-md'}`}
                  style={{
                    transform: index % 2 === 0 ? 'translateX(-100px)' : 'translateX(100px)',
                    opacity: '0',
                    transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${index * 0.2}s`
                  }}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-[-33px] top-6 w-4 h-4 rounded-full hidden md:block group-hover:scale-125 transition-transform duration-300 ${isDark ? 'bg-cyan-400 border-2 border-gray-950' : 'bg-blue-500 border-2 border-white'}`} />
                  
                  {/* Glowing Effect */}
                  <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${isDark ? 'bg-gradient-to-r from-cyan-400/10 to-purple-600/10' : 'bg-gradient-to-r from-blue-400/10 to-indigo-500/10'}`} />
                  
                  <div className="relative z-10">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`text-xl font-bold transition-colors duration-300 ${isDark ? 'text-white group-hover:text-cyan-400' : 'text-gray-800 group-hover:text-blue-600'}`}>
                            {exp.title}
                          </h3>
                          {exp.certified && (
                            <button
                              onClick={() => setSelectedCertificate(exp)}
                              className="flex items-center gap-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 transform hover:scale-105 group/cert"
                            >
                              <svg className="w-3 h-3 group-hover/cert:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                              View Certificate
                            </button>
                          )}
                        </div>
                        <p className={`font-semibold text-base ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                          {exp.company}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium mt-2 lg:mt-0 ${isDark ? 'bg-gradient-to-r from-gray-800 to-gray-700 text-cyan-300 border border-gray-600' : 'bg-gradient-to-r from-gray-100 to-gray-200 text-blue-700 border border-gray-300'}`}>
                        {exp.period}
                      </span>
                    </div>
                    
                    <p className={`mb-4 text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exp.description}
                    </p>
                    
                    {/* Animated Skills */}
                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className={`skill-tag px-2.5 py-1 rounded-md text-sm font-medium cursor-default ${
                            isDark
                              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500'
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-400 hover:to-indigo-400'
                          }`}
                          style={{
                            transform: 'scale(0.8) rotate(10deg)',
                            opacity: '0',
                            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div
                    className="absolute top-2 right-2 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-pulse"
                  />
                  <div
                    className="absolute bottom-2 left-2 w-1 h-1 bg-purple-400 rounded-full opacity-50 animate-pulse"
                    style={{ animationDelay: '1s' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="mt-10 text-center">
            <div
              className={`inline-flex items-center gap-2 backdrop-blur-sm rounded-full px-4 py-2 ${
                isDark
                  ? 'bg-gray-900/50 border border-gray-800'
                  : 'bg-gray-100/80 border border-gray-200'
              }`}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span
                className={`${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Available for new opportunities
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gradient Overlays */}
      <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b to-transparent pointer-events-none ${isDark ? 'from-gray-950' : 'from-white'}`} />
      <div className={`absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t to-transparent pointer-events-none ${isDark ? 'from-gray-950' : 'from-white'}`} />
      
      {/* Certificate Modal - Simplified */}
      {selectedCertificate && (
        <div 
          className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isDark ? 'bg-black/80' : 'bg-gray-500/70'}`}
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className={`relative rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedCertificate(null)}
              className={`absolute top-4 right-4 z-10 transition-colors p-2 rounded-full backdrop-blur-sm ${isDark ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Certificate Content */}
            <div className="p-6">
              {selectedCertificate.certificateType === "pdf" ? (
                // PDF Display
                <div className="w-full h-[80vh]">
                  <iframe
                    src={selectedCertificate.certificateFile}
                    className="w-full h-full rounded-lg"
                    title={`${selectedCertificate.title} Certificate`}
                  />
                </div>
              ) : (
                // Image Display
                <div className="flex flex-col items-center justify-center">
                  <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {selectedCertificate.company} - {selectedCertificate.title} Certificate
                  </h3>
                  <div className="w-full overflow-hidden rounded-lg shadow-xl border-2 border-blue-500">
                    <img
                      src={selectedCertificate.certificateFile}
                      alt={`${selectedCertificate.title} Certificate`}
                      className="w-full object-contain bg-white"
                      style={{ maxHeight: '70vh' }}
                      onError={(e) => {
                        console.error('Image failed to load:', selectedCertificate.certificateFile);
                        e.target.onerror = null;
                        e.target.src = '/assets/images/certificates/intern_gokboru.png';
                      }}
                    />
                  </div>
                  <p className="mt-4 text-sm text-center italic">
                    {selectedCertificate.period}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Experiences;