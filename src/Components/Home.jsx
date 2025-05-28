import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { useTheme } from '../context/ThemeContext';

function Home() {
  const { isDark } = useTheme();
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const animationIdRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: false // Disabled for better performance
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles - reduced count for better performance
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPalette = [
      new THREE.Color(0x3b82f6), // blue
      new THREE.Color(0x8b5cf6), // purple
      new THREE.Color(0x06b6d4), // cyan
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          vColor = color;
          vec3 pos = position;
          
          // Simplified floating animation
          pos.y += sin(time * 0.5 + position.x * 0.1) * 0.3;
          pos.x += cos(time * 0.3 + position.y * 0.1) * 0.2;
          
          // Reduced mouse interaction for better performance
          float mouseInfluence = 0.3 / (distance(pos.xy, vec2(mouseX, mouseY)) + 1.0);
          pos.xy += normalize(pos.xy - vec2(mouseX, mouseY)) * mouseInfluence * 0.3;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (200.0 / -mvPosition.z);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(vColor, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    camera.position.z = 5;

    // Animation loop with performance optimization
    const animate = () => {
      if (!rendererRef.current || !sceneRef.current) return;
      
      const time = Date.now() * 0.001;
      
      if (particlesRef.current) {
        particlesRef.current.material.uniforms.time.value = time;
        particlesRef.current.rotation.y = time * 0.03;
        particlesRef.current.rotation.x = time * 0.01;
      }
      
      rendererRef.current.render(sceneRef.current, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Throttled mouse move handler
    let mouseTimeout;
    const handleMouseMove = (event) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        
        if (particlesRef.current) {
          particlesRef.current.material.uniforms.mouseX.value = x * 3;
          particlesRef.current.material.uniforms.mouseY.value = y * 3;
        }
      }, 16); // ~60fps throttling
    };

    // Resize handler
    const handleResize = () => {
      if (!rendererRef.current) return;
      
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Set loaded state
    setIsLoaded(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (geometry) geometry.dispose();
      if (material) material.dispose();
    };
  }, []);

  const handleDownloadCV = () => {
    // Updated path to the CV in the public folder
    const link = document.createElement('a');
    link.href = '/assets/images/img/VishalCV.pdf';
    link.download = 'Vishal_Kumar_Chaurasia_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      className="min-h-screen relative flex flex-col justify-center px-8 py-20 overflow-hidden"
      style={{ 
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 w-full h-full"
        style={{ backgroundColor: 'transparent' }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-10" />
      
      {/* Content Container */}
      <div className={`relative z-20 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Left Side - Text Content */}
        <div className="flex-1 max-w-2xl space-y-6">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 backdrop-blur-sm rounded-full text-sm font-medium" 
              style={{
                backgroundColor: isDark ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.15)',
                borderWidth: '1px',
                borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.4)',
                color: isDark ? 'rgb(147, 197, 253)' : 'rgb(37, 99, 235)'
              }}
            >
              👋 Welcome to my portfolio
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="block bg-clip-text text-transparent" style={{
              backgroundImage: isDark 
                ? 'linear-gradient(to right, white, #bfdbfe, #e9d5ff)' 
                : 'linear-gradient(to right, #1e3a8a, #3b82f6, #6366f1)'
            }}>
              Hi, I'm
            </span>
            <span className="block bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(to right, #60a5fa, #a855f7, #ec4899)'
            }}>
              Vishal Kumar
            </span>
            <span className="block bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(to right, #a855f7, #ec4899, #ef4444)'
            }}>
              Chaurasia
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-light" style={{ color: 'var(--text-secondary)' }}>
            Full-Stack Developer
          </p>
          
          <p className="text-lg leading-relaxed max-w-lg" style={{ color: 'var(--text-tertiary)' }}>
            I craft beautiful, functional, and scalable web experiences that bring ideas to life. 
            Passionate about creating digital solutions that make a difference.
          </p>
          
          <div className="pt-4">
            <button
              className="px-8 py-4 border-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={handleDownloadCV}
              style={{ 
                borderColor: isDark ? '#60a5fa' : '#3b82f6',
                color: isDark ? '#e5e7eb' : '#1f2937',
                backgroundColor: 'var(--bg-primary)',
                boxShadow: isDark 
                  ? '0 0 15px rgba(59, 130, 246, 0.3)' 
                  : '0 0 15px rgba(37, 99, 235, 0.15)'
              }}
            >
              Download CV
            </button>
          </div>
        </div>
        
        {/* Right Side - Profile Image */}
        <div className="flex-1 flex justify-center lg:justify-end max-w-md">
          <div className="relative">
            {/* Animated Background Elements */}
            <div 
              className="absolute -inset-4 rounded-full blur-2xl animate-pulse"
              style={{
                background: isDark 
                  ? 'linear-gradient(to right, rgba(59, 130, 246, 0.3), rgba(168, 85, 247, 0.3))' 
                  : 'linear-gradient(to right, rgba(37, 99, 235, 0.3), rgba(126, 34, 206, 0.3))'
              }}
            />
            
            {/* Profile Image */}
            <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 animate-bounce" style={{animationDuration: '6s'}}>
              <div className="w-full h-full rounded-full p-1" style={{
                background: 'linear-gradient(to bottom right, #60a5fa, #a855f7, #ec4899)'
              }}>
                <div className="w-full h-full rounded-full p-2" style={{
                  backgroundColor: isDark ? '#1f2937' : '#e5e7eb'
                }}>
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                    style={{
                      background: isDark 
                        ? 'linear-gradient(to bottom right, #374151, #111827)' 
                        : 'linear-gradient(to bottom right, #f3f4f6, #d1d5db)'
                    }}
                  >
                    {/* Placeholder for profile image */}
                    <div className="w-full h-full flex items-center justify-center text-6xl"
                      style={{
                        background: isDark
                          ? 'linear-gradient(to bottom right, rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2))'
                          : 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))'
                      }}
                    >
                      <img src="/assets/images/img/profile.jpg" alt="Vishal Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-6 h-6 rounded-full animate-bounce" 
                style={{
                  backgroundColor: isDark ? '#3b82f6' : '#2563eb',
                  animationDelay: '0s',
                  boxShadow: isDark ? '0 0 15px rgba(59, 130, 246, 0.6)' : '0 0 15px rgba(37, 99, 235, 0.6)'
                }} 
              />
              <div className="absolute -bottom-4 -left-4 w-4 h-4 rounded-full animate-bounce" 
                style={{
                  backgroundColor: isDark ? '#8b5cf6' : '#7c3aed',
                  animationDelay: '1s',
                  boxShadow: isDark ? '0 0 15px rgba(139, 92, 246, 0.6)' : '0 0 15px rgba(124, 58, 237, 0.6)'
                }} 
              />
              <div className="absolute top-8 -left-8 w-3 h-3 rounded-full animate-bounce" 
                style={{
                  backgroundColor: isDark ? '#ec4899' : '#db2777',
                  animationDelay: '2s',
                  boxShadow: isDark ? '0 0 15px rgba(236, 72, 153, 0.6)' : '0 0 15px rgba(219, 39, 119, 0.6)'
                }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 rounded-full flex justify-center animate-pulse"
          style={{
            borderColor: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(59, 130, 246, 0.4)'
          }}
        >
          <div className="w-1 h-2 rounded-full mt-2 animate-bounce"
            style={{
              backgroundColor: isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(59, 130, 246, 0.8)'
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default Home;