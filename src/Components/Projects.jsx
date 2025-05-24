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
      title: "Task Management Project",
      description: "Designed a full-stack task management platform to assign, track, and manage tasks with CRUD operations. Built a secure authentication system using JWT, OTP verification, and Nodemailer.",
      features: [
        "Secure authentication system using JWT & OTP verification",
        "Highly scalable backend with Node.js & Express.js",
        "Responsive UI with real-time task updates",
        "AI-driven query resolution using Gemini API"
      ],
      technologies: ["MERN Stack", "Node.js", "Express.js", "MongoDB", "React.js", "Vite"],
      timeline: "Jan 2025 – Feb 2025",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "Full Stack",
      status: "Completed"
    },
    {
      id: 2,
      title: "CoderStats Project",
      description: "Built a full-stack coding profile analytics platform, aggregating data from LeetCode, Codeforces, and GeeksforGeeks. Implemented secure user authentication.",
      features: [
        "Multi-platform coding analytics aggregation",
        "Firebase authentication with OAuth integration",
        "Interactive dashboard with real-time updates",
        "40% improvement in user engagement"
      ],
      technologies: ["React.js", "Firebase", "APIs", "OAuth", "JavaScript", "CSS"],
      timeline: "Dec 2024 – Feb 2025",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "Analytics Platform",
      status: "Completed"
    },
    {
      id: 3,
      title: "E-Commerce Website",
      description: "Developed a responsive e-commerce platform with product catalog, shopping cart, and secure payment integration using Stripe API.",
      features: [
        "Product catalog with search and filtering",
        "Shopping cart with localStorage persistence",
        "Secure payment processing with Stripe",
        "User accounts and order history"
      ],
      technologies: ["React.js", "Next.js", "Tailwind CSS", "Stripe API", "MongoDB", "Auth0"],
      timeline: "Mar 2024 – Apr 2024",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "Web App",
      status: "Completed"
    },
    {
      id: 4,
      title: "AI Image Generator",
      description: "Created an AI-powered image generation tool using OpenAI's DALL-E API with custom prompt engineering capabilities.",
      features: [
        "Integration with DALL-E API",
        "Custom prompt templates and history",
        "Image gallery and sharing options",
        "User accounts with saved generations"
      ],
      technologies: ["JavaScript", "React", "Node.js", "OpenAI API", "MongoDB", "AWS S3"],
      timeline: "May 2024 – Jun 2024",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "AI Application",
      status: "Completed"
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description: "Built a weather forecasting application with interactive maps, hourly and daily forecasts, and location-based services.",
      features: [
        "Real-time weather data from OpenWeatherMap API",
        "Interactive maps with Mapbox",
        "Location-based forecasting",
        "Historical weather data visualization"
      ],
      technologies: ["React", "Redux", "D3.js", "OpenWeatherMap API", "Mapbox GL", "Styled Components"],
      timeline: "Jul 2024 – Aug 2024",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "Web App",
      status: "Completed"
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Designed a mobile-first fitness tracking application with workout plans, progress monitoring, and nutrition tracking features.",
      features: [
        "Custom workout plan creator",
        "Progress visualization with charts",
        "Nutrition and calorie tracking",
        "Social sharing and challenges"
      ],
      technologies: ["React Native", "Firebase", "Redux", "Chart.js", "Expo", "Google Fit API"],
      timeline: "Sep 2024 – Oct 2024",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "Mobile App",
      status: "In Progress"
    },
    {
      id: 7,
      title: "Blog Platform",
      description: "Created a modern blog platform with rich text editing, comment system, and SEO optimization. Supports multiple authors and content categories.",
      features: [
        "Rich text editor with image uploads",
        "Comment and moderation system",
        "SEO optimization tools",
        "Analytics and traffic monitoring"
      ],
      technologies: ["Next.js", "GraphQL", "PostgreSQL", "Tailwind CSS", "AWS", "Vercel"],
      timeline: "Nov 2023 – Dec 2023",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
      type: "Web App",
      status: "Completed"
    },
    {
      id: 8,
      title: "Portfolio Website",
      description: "Designed and developed a personal portfolio website with interactive UI components, dark/light mode, and responsive design for all devices.",
      features: [
        "Dark/light mode theming",
        "Interactive 3D elements with Three.js",
        "Responsive design for all devices",
        "Contact form with validation"
      ],
      technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion", "Vite", "Netlify"],
      timeline: "Jan 2023 – Feb 2023",
      github: "https://github.com/username/project",
      demo: "#",
      image: null,
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