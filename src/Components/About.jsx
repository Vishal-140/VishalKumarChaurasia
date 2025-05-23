import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

function About() {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        backgroundColor: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Side - Text Content */}
        <div 
          className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </div>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p style={{ color: 'var(--text-secondary)' }}>
              Hi! I'm <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Vishal Kumar Chaurasia</span>, 
              a passionate Full-Stack Developer from Varanasi, Uttar Pradesh. Currently pursuing 
              my B.Tech in Computer Science at Lovely Professional University, I'm dedicated to 
              crafting digital experiences that seamlessly blend creativity with functionality.
            </p>
            
            <p style={{ color: 'var(--text-secondary)' }}>
              My journey in technology spans across modern web development, from creating 
              responsive frontends with React.js to building scalable backends with Node.js 
              and MongoDB. I thrive on transforming complex problems into elegant, 
              user-friendly solutions that make a real impact.
            </p>
            
            <p style={{ color: 'var(--text-secondary)' }}>
              When I'm not immersed in code, you'll find me exploring the latest tech trends, 
              contributing to open-source projects, or tackling algorithmic challenges. 
              I believe in continuous learning and am always excited to collaborate on 
              projects that push the boundaries of what's possible.
            </p>
          </div>
        </div>
        
        {/* Right Side - Visual Element */}
        <div 
          className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
        >
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-3xl"></div>
          <div className="absolute inset-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-3xl blur-2xl"></div>
          
          {/* Main Content Card */}
          <div className="relative bg-gray-800/30 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
            
            {/* Profile Avatar */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-full p-1">
                  <div className="w-full h-full bg-gray-800 rounded-full flex items-center justify-center text-4xl">
                    👨‍💻
                  </div>
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              </div>
            </div>
            
            {/* Tech Stack Icons */}
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Tech Stack</h3>
              <div className="flex justify-center flex-wrap gap-4">
                {[
                  { name: 'React', emoji: '⚛️', color: 'from-blue-400 to-cyan-400' },
                  { name: 'Node.js', emoji: '🟢', color: 'from-green-400 to-emerald-400' },
                  { name: 'MongoDB', emoji: '🍃', color: 'from-green-500 to-teal-500' },
                  { name: 'JavaScript', emoji: '⚡', color: 'from-yellow-400 to-orange-400' }
                ].map((tech, idx) => (
                  <div 
                    key={idx}
                    className={`group relative px-4 py-2 bg-gradient-to-r ${tech.color} rounded-full text-white font-medium text-sm hover:scale-110 transition-transform duration-300 cursor-pointer`}
                  >
                    <span className="mr-2">{tech.emoji}</span>
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-gray-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">2+</div>
                <div className="text-xs text-gray-400">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">20+</div>
                <div className="text-xs text-gray-400">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-400">∞</div>
                <div className="text-xs text-gray-400">Ideas</div>
              </div>
            </div>
          </div>
          
          {/* Floating Code Snippets */}
          <div className="absolute -top-4 -left-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700 text-xs font-mono text-green-400 animate-pulse">
            <div>const dev = "Vishal";</div>
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 border border-gray-700 text-xs font-mono text-blue-400 animate-pulse" style={{animationDelay: '1s'}}>
            <div>coding = true;</div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center animate-pulse">
          <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
}

export default About;