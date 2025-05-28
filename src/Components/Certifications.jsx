import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Custom intersection observer hook
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

// Certificate data
const certificatesData = [
  {
    id: 'cloud-cert',
    title: 'Cloud Computing',
    issuer: 'NPTEL',
    category: 'Cloud Computing',
    date: '2024',
    image: '/assets/images/certificates/cloud.png',
    link: '/assets/images/certificates/CloudComputing.pdf',
    isPdf: true
  },
  {
    id: 'kotlin-cert',
    title: 'Android Development',
    issuer: 'Coursera',
    category: 'Android App Development with Kotlin',
    date: '2024',
    image: '/assets/images/certificates/android.png',
    link: 'https://www.coursera.org/account/accomplishments/verify/43J5ANSE5EMT'
  },
  {
    id: 'ai-cert',
    title: 'Prompt Engineering',
    issuer: 'Coursera',
    category: 'ChatGPT Prompt Engineering for Developers',
    date: '2024',
    image: '/assets/images/certificates/prompt.png',
    link: 'https://www.coursera.org/account/accomplishments/verify/83V3FM5HCUFX'
    
  }
];

const Certifications = () => {
  const { isDark } = useTheme();
  const certificatesRef = useRef([]);
  const canvasRef = useRef(null);
  const [sectionRef, inView] = useIntersectionObserver({ threshold: 0.3 });
  const controls = useAnimation();
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  
  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
  
  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    
    // Set renderer size and position
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.z = 5;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: isDark ? 0x9c88ff : 0x6c5ce7,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Update canvas on resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse move parallax effect
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      
      particlesMesh.rotation.x += mouseY * 0.001;
      particlesMesh.rotation.y += mouseX * 0.001;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
    };
  }, [isDark]);
  
  // Setup GSAP animations when section comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
      
      // Animate each certificate card with GSAP
      certificatesRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(
          card,
          { 
            y: 100, 
            opacity: 0,
            rotateY: -15,
            scale: 0.9
          },
          { 
            y: 0, 
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.2,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);
  
  // Handle certificate click to show modal
  const openCertificateModal = (certificate) => {
    setSelectedCertificate(certificate);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };
  
  // Close certificate modal
  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };
  
  return (
    <section
      id="certifications"
      data-section-name="certifications"
      ref={sectionRef}
      className={`min-h-screen relative overflow-hidden section-spacing ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      {/* Three.js background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
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
            Certifications & Courses
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
            Professional certificates and courses that have enhanced my skills and knowledge
          </motion.p>
        </div>
        
        {/* Certificates grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 mb-8"
        >
          {certificatesData.map((certificate, index) => (
            <motion.div
              key={certificate.id}
              variants={itemVariants}
              whileHover={{ 
                zIndex: 10,
                boxShadow: isDark 
                  ? '0 0 20px rgba(156, 136, 255, 0.5), 0 0 30px rgba(156, 136, 255, 0.2)' 
                  : '0 0 20px rgba(108, 92, 231, 0.4), 0 0 30px rgba(108, 92, 231, 0.1)',
                borderColor: isDark ? 'rgba(156, 136, 255, 0.6)' : 'rgba(108, 92, 231, 0.5)',
                transition: { duration: 0.3 }
              }}
              className={`card overflow-hidden ${
                isDark 
                  ? 'bg-gray-800 border border-gray-700 hover:border-violet-600/50' 
                  : 'bg-white border border-gray-200 hover:border-violet-500/50'
              } rounded-xl`}
              ref={el => certificatesRef.current[index] = el}
              onClick={() => openCertificateModal(certificate)}
            >
              {/* Certificate image (blurred background as fallback) */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-r from-violet-500/20 to-purple-500/20">
                <img
                  src={certificate.image}
                  alt={`${certificate.title} from ${certificate.issuer}`}
                  className="w-full h-full transition-transform duration-700 hover:scale-110"
                  style={{ objectFit: 'contain', transform: 'scale(0.9)' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.opacity = '0.1';
                  }}
                  loading="lazy"
                />
                {/* No overlay badges for cleaner certificate display */}
              </div>
              
              {/* Certificate details */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-h4 font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                      {certificate.title}
                    </h3>
                    <p className={`text-sm ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                      {certificate.category}
                    </p>
                  </div>
                  <span className={`text-caption px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                    {certificate.date}
                  </span>
                </div>
                
                <p className={`mt-4 mb-6 text-body-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Issued by <span className="font-medium">{certificate.issuer}</span>
                </p>
                
                <div className="flex justify-end">
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-body-sm px-3 py-1.5 rounded-full bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${certificate.title} ${certificate.isPdf ? 'PDF' : 'certificate'}`}
                  >
                    <ExternalLink size={14} />
                    <span>{certificate.isPdf ? 'View PDF' : 'View Certificate'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Certificate modal overlay */}
      {selectedCertificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeCertificateModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`relative max-w-3xl w-full rounded-2xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={`absolute top-4 right-4 z-10 p-2 rounded-full ${
                isDark ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
              onClick={closeCertificateModal}
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Certificate image */}
            <div className="w-full h-[70vh] overflow-hidden">
              <img
                src={selectedCertificate.image}
                alt={`${selectedCertificate.title} certificate from ${selectedCertificate.issuer}`}
                className="w-full h-full object-contain"
                style={{ maxWidth: '90%', margin: '0 auto' }}
              />
            </div>
            
            {/* Certificate details */}
            <div className="p-6">
              <h3 className={`text-h3 font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {selectedCertificate.title}
              </h3>
              <p className={`text-body ${isDark ? 'text-violet-400' : 'text-violet-600'}`}>
                {selectedCertificate.category}
              </p>
              <div className="flex justify-between items-center mt-4">
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Issued by <span className="font-medium">{selectedCertificate.issuer}</span> · {selectedCertificate.date}
                </p>
                {selectedCertificate.isPdf ? (
                  <a
                    href={selectedCertificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                    aria-label={`View ${selectedCertificate.title} PDF`}
                  >
                    <ExternalLink size={16} />
                    <span>View PDF</span>
                  </a>
                ) : (
                  <a
                    href={selectedCertificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                    aria-label={`View ${selectedCertificate.title} certificate`}
                  >
                    <ExternalLink size={16} />
                    <span>View Certificate</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Certifications;
