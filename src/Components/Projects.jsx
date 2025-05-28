import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, Calendar, Code, Database, Shield, Cpu, Smartphone, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { createBackgroundParticles, playSound } from '../utils/animationUtils';
import { getProjectImageAlt, handleImageError } from '../utils/accessibilityUtils';

const Projects = () => {
  const { isDark } = useTheme();
  const [hoveredTech, setHoveredTech] = useState(null);
  const containerRef = useRef(null);
  const audioRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Task Management",
      description: "A full-stack task management platform with CRUD operations, user authentication, and real-time updates. Features include task assignment, tracking, and AI-driven query resolution.",
      features: [
        "Secure authentication with JWT & OTP verification",
        "Real-time task updates and notifications",
        "Responsive UI with modern design",
        "Role-based access control"
      ],
      technologies: ["MERN Stack", "Node.js", "Express.js", "MongoDB", "React.js", "Vite"],
      timeline: "2025",
      github: "https://github.com/Vishal-140/Task-Management-Frontend",
      demo: "https://task--management--live.vercel.app",
      image: "/assets/images/projects/task.png",
      type: "Full Stack",
      status: "Completed"
    },
    {
      id: 2,
      title: "CoderStats",
      description: "A coding profile analytics platform that aggregates data from various competitive programming platforms like LeetCode, Codeforces, and GeeksforGeeks.",
      features: [
        "Multi-platform coding analytics",
        "Real-time profile data tracking",
        "Interactive dashboard with statistics",
        "Profile comparison and insights"
      ],
      technologies: ["React.js", "Firebase", "APIs", "JavaScript", "CSS"],
      timeline: "2025",
      github: "https://github.com/Vishal-140/CoderStats",
      demo: "https://coderstats-live.vercel.app",
      image: "/assets/images/projects/coderstats.png",
      type: "Web App",
      status: "Completed"
    },
    {
      id: 3,
      title: "Obys Agency",
      description: "A creative agency website clone with impressive animations, transitions, and interactive elements using modern web technologies.",
      features: [
        "Smooth scroll animations with Locomotive Scroll",
        "Interactive 3D elements with Three.js",
        "Advanced animations with GSAP",
        "Responsive design for all devices"
      ],
      technologies: ["HTML", "CSS", "JavaScript", "GSAP", "Shery.js", "Locomotive Scroll", "Three.js"],
      timeline: "2024",
      github: "https://github.com/Vishal-140/Obys-Agency",
      demo: "https://vishal-140.github.io/Obys-Agency/",
      image: "/assets/images/projects/obys.png",
      type: "Frontend",
      status: "Completed"
    },
    {
      id: 4,
      title: "Shopper Shoes",
      description: "A responsive e-commerce website focused on showcasing premium footwear with a modern design and smooth user experience.",
      features: [
        "Product catalog with filtering",
        "Responsive product gallery",
        "Smooth animations and transitions",
        "Mobile-first design approach"
      ],
      technologies: ["HTML", "CSS", "JavaScript"],
      timeline: "2024",
      github: "https://github.com/Vishal-140/Shopper-Shoes",
      demo: "https://vishal-140.github.io/Shopper-Shoes/",
      image: "/assets/images/projects/shopper.png",
      type: "Frontend",
      status: "Completed"
    },
    {
      id: 5,
      title: "Spotify Clone",
      description: "A functional clone of the Spotify music streaming platform with a focus on replicating the user interface and core music playback features.",
      features: [
        "Music player with controls",
        "Playlist management",
        "Responsive UI matching Spotify's design",
        "Dark mode interface"
      ],
      technologies: ["HTML", "CSS", "JavaScript"],
      timeline: "2023",
      github: "https://github.com/Vishal-140/Spotify-clone",
      demo: "https://vishal-140.github.io/Spotify-clone/",
      image: "/assets/images/projects/spotify.png",
      type: "Frontend",
      status: "Completed"
    },
    {
      id: 6,
      title: "3D Animated",
      description: "An interactive 3D animation showcase demonstrating modern web animation techniques and creative visual effects.",
      features: [
        "Advanced CSS animations",
        "Interactive 3D elements",
        "Smooth transitions and effects",
        "Responsive design for all devices"
      ],
      technologies: ["HTML", "CSS", "JavaScript"],
      timeline: "2023",
      github: "https://github.com/Vishal-140/3D-Animation",
      demo: "https://vishal-140.github.io/3D-Animation/",
      image: "/assets/images/projects/3D.png",
      type: "Frontend",
      status: "Completed"
    }
  ];

  const playBubbleSound = () => {
    playSound(audioRef.current, { volume: 0.5 });
  };

  const getTechIcon = (tech) => {
    const icons = {
      'MERN Stack': <Code className="w-4 h-4" />,
      'Node.js': <Cpu className="w-4 h-4" />,
      'Express.js': <Database className="w-4 h-4" />,
      'MongoDB': <Database className="w-4 h-4" />,
      'React.js': <Code className="w-4 h-4" />,
      'Firebase': <Shield className="w-4 h-4" />,
      'APIs': <Globe className="w-4 h-4" />,
      'JWT': <Shield className="w-4 h-4" />,
      'CSS': <Smartphone className="w-4 h-4" />
    };
    return icons[tech] || <Code className="w-4 h-4" />;
  };

  useEffect(() => {
    // Use the centralized background particles utility
    const { cleanup } = createBackgroundParticles({
      count: 50,
      color: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.4)',
      size: { min: 2, max: 4 },
      duration: { min: 15, max: 25 }
    });
    
    // Return cleanup function
    return cleanup;
  }, [isDark]);

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           backgroundColor: 'var(--bg-primary)',
           color: 'var(--text-primary)'
         }}>
      {/* Audio element for bubble sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/assets/audio/bubblepopup.mp3" type="audio/mpeg" />
      </audio>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(${isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? 'rgba(139, 92, 246, 0.1)' : 'rgba(139, 92, 246, 0.2)'} 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'wave 20s ease-in-out infinite'
        }} />
      </div>

      <div ref={containerRef} className="container mx-auto px-6 py-20 relative z-10">
        {/* Section Title */}
        <div className="section-title-container">
          <h2 className="text-h1 gradient-heading mb-4">
            Featured Projects
          </h2>
          <div className="divider" />
          <p className={`mt-6 text-body-lg section-subtitle ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Showcasing innovative solutions built with modern technologies and best practices
          </p>
        </div>

        {/* Projects Grid - Redesigned with larger cards, 3 per row max */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${isDark ? 'bg-gray-900/70 border border-gray-800/50 hover:border-violet-500/50' : 'bg-white/90 border border-gray-200 hover:border-violet-500/30'}`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animation: 'fadeInUp 0.5s ease-out forwards'
              }}
            >
              {/* Project Image - Increased height */}
              <div className={`relative h-48 overflow-hidden ${isDark ? 'bg-gradient-to-r from-violet-900/20 to-purple-900/20' : 'bg-gradient-to-r from-violet-200/30 to-purple-200/30'}`}>
                
                {/* Type Badge - Made smaller and positioned top left */}
                <div className="absolute top-2 left-2 z-20">
                  <span className="px-2 py-0.5 bg-violet-600/80 backdrop-blur-sm rounded-full text-[10px] font-medium text-white">
                    {project.type}
                  </span>
                </div>
                
                {/* Project Image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-600/20 to-purple-600/20">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={getProjectImageAlt(project)}
                      className="w-full h-full object-cover"
                      onError={(e) => handleImageError(e)}
                      loading="lazy"
                    />
                  ) : (
                    <Code className="w-16 h-16 text-violet-300 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                  )}
                </div>
              </div>

              {/* Project Content - Increased padding */}
              <div className="p-5">
                {/* Title and Timeline - Increased size */}
                <div className="mb-3">
                  <h3 className={`text-lg font-bold mb-2 transition-colors duration-300 line-clamp-1 ${isDark ? 'text-white group-hover:text-violet-300' : 'text-gray-800 group-hover:text-violet-700'}`}>
                    {project.title}
                  </h3>
                  <div className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Calendar className="w-4 h-4 mr-2" />
                    {project.timeline}
                  </div>
                </div>

                {/* Description - Increased size */}
                <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {project.description}
                </p>

                {/* Technologies - Slightly larger tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className={`inline-flex items-center text-xs px-2 py-1 rounded transition-colors ${isDark ? 'bg-gray-800 text-gray-300 hover:bg-violet-900/30 hover:text-violet-300' : 'bg-gray-100 text-gray-700 hover:bg-violet-100 hover:text-violet-700'}`}
                        onMouseEnter={() => {
                          setHoveredTech(tech);
                          playBubbleSound();
                        }}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons - Larger and more prominent */}
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded text-sm font-medium transition-all duration-300 ${isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    aria-label={`View source code for ${project.title} on GitHub`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    Code
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-violet-600 rounded text-white text-sm font-medium hover:bg-violet-700 transition-all duration-300"
                    aria-label={`View live demo for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    Demo
                  </a>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/5 to-purple-600/5 rounded-lg" />
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tech Badge (appears on hover) */}
        {hoveredTech && (
          <div className="fixed top-4 right-4 z-50 px-4 py-2 bg-violet-600/90 backdrop-blur-sm rounded-lg text-white text-sm font-medium animate-pulse">
            Exploring: {hoveredTech}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;