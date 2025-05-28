import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';
import '../styles/skills-animations.css';

const Skills = () => {
  const { isDark } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  const skillsData = [
    {
      category: 'Languages',
      skills: [
        { 
          name: 'C++', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
          color: '#00599C'
        },
        { 
          name: 'Java', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
          color: '#ED8B00'
        },
        { 
          name: 'JavaScript', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
          color: '#F7DF1E'
        }
      ]
    },
    {
      category: 'Web Development',
      skills: [
        { 
          name: 'HTML', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
          color: '#E34F26'
        },
        { 
          name: 'CSS', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
          color: '#1572B6'
        },
        { 
          name: 'React.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
          color: '#61DAFB'
        },
        { 
          name: 'TailwindCSS', 
          logo: '/assets/images/skills/tailwindcss.svg',
          color: '#06B6D4'
        }
      ]
    },
    {
      category: 'Backend and Databases',
      skills: [
        { 
          name: 'Node.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
          color: '#339933'
        },
        { 
          name: 'Express.js', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
          color: '#000000'
        },
        { 
          name: 'MongoDB', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
          color: '#47A248'
        }
      ]
    },
    {
      category: 'Authentication Systems',
      skills: [
        { 
          name: 'JWT', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
          color: '#000000'
        },
        { 
          name: 'OAuth', 
          logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Oauth_logo.svg',
          color: '#EB5424'
        },
        { 
          name: 'Firebase Auth', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
          color: '#FFCA28'
        }
      ]
    },
    {
      category: 'Mobile Development',
      skills: [
        { 
          name: 'Android Development', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
          color: '#3DDC84'
        },
        { 
          name: 'Kotlin', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg',
          color: '#7F52FF'
        }
      ]
    },
    {
      category: 'Tools and Platforms',
      skills: [
        { 
          name: 'Git', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
          color: '#F05032'
        },
        { 
          name: 'GitHub', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
          color: '#181717'
        },
        { 
          name: 'Firebase', 
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
          color: '#FFCA28'
        }
      ]
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden py-8"
         style={{
           backgroundColor: 'var(--bg-primary)',
           color: 'var(--text-primary)'
         }}>
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-cyan-900/30"></div>
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-purple-500/20"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Custom cursor glow effect */}
      <motion.div
        className="fixed w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-50 mix-blend-screen opacity-60 shadow-glow"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
        initial={{ scale: 1 }}
        animate={{
          scale: hoveredSkill ? 3 : 1,
          opacity: hoveredSkill ? 0.8 : 0.6,
        }}
        transition={{ duration: 0.2 }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with animated underline */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Skills & Technologies
          </h1>
          <motion.div 
            className="h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mx-auto mt-2"
            initial={{ width: 0 }}
            animate={{ width: '4rem' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Skills Categories with Animation */}
        <motion.div 
          className="mx-auto mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((category) => (
              <motion.div 
                key={category.category}
                variants={itemVariants}
                className={`rounded-xl p-4 ${isDark ? 'bg-gray-800/30 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}
                style={{
                  boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Category Title */}
                <div className="flex items-center mb-3">
                  <h2 className={`font-bold mr-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>{category.category}</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-3 gap-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="group"
                      whileHover={{ scale: 1.05 }}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div 
                        className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-300 h-full
                          ${isDark 
                            ? 'bg-gray-900/50 hover:bg-gradient-to-br hover:from-purple-900/40 hover:to-cyan-900/40 border border-gray-700/50 hover:border-purple-500/50' 
                            : 'bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-cyan-50 border border-gray-200 hover:border-purple-300'}`
                        }
                      >
                        <div className={`relative ${hoveredSkill === skill.name ? (isDark ? 'glow-purple-dark' : 'glow-purple-light') : ''}`}>
                          <img 
                            src={skill.logo} 
                            alt={skill.name}
                            className="w-8 h-8 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <span className={`text-xs font-medium text-center transition-colors duration-300 ${isDark 
                          ? 'text-gray-400 group-hover:text-white' 
                          : 'text-gray-600 group-hover:text-purple-700'}`
                        }>
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>

        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className={`inline-flex flex-wrap items-center justify-center gap-6 p-4 rounded-xl ${isDark 
            ? 'bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
            : 'bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm border border-gray-200'}`
          }
          style={{
            boxShadow: isDark ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.05)',
          }}
          >
            <motion.div 
              className="text-center px-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">25+</div>
              <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Technologies</div>
            </motion.div>
            
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
            
            <motion.div 
              className="text-center px-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">6</div>
              <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Categories</div>
            </motion.div>
            
            <div className="hidden sm:block w-px h-8 bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
            
            <motion.div 
              className="text-center px-4"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">4</div>
              <div className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Years</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;