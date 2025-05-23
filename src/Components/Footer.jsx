import React from 'react';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';
import { scrollToSection } from '../utils/scrollUtils';
import { Github, Linkedin, Twitter, Mail, ExternalLink, Heart } from 'lucide-react';

function Footer() {
  const { isDark } = useTheme();
  const footerRef = useRef(null);

  const handleNavClick = (id) => {
    scrollToSection(id);
  };

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, url: 'https://github.com/', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com/', label: 'Twitter' },
    { icon: <Mail className="w-5 h-5" />, url: 'mailto:contact@example.com', label: 'Email' }
  ];

  return (
    <footer
      ref={footerRef}
      className={`${isDark ? 'bg-gray-950 text-gray-300' : 'bg-white text-gray-600'} border-t ${isDark ? 'border-gray-800' : 'border-gray-200'}`}
    >
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl mr-3">
                V
              </div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-800'}`}>Vishal Kumar</h3>
            </div>
            <p className="mb-6 text-sm">
              A passionate web developer crafting beautiful and functional digital experiences.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${isDark ? 'bg-gray-800 hover:bg-violet-900/50 text-white' : 'bg-gray-100 hover:bg-violet-100 text-gray-700'} p-2 rounded-full transition-colors duration-300`}
                  whileHover={{ y: -3 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Quick Links</h3>
            <ul className="space-y-2">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <motion.button
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center text-sm hover:translate-x-1 transition-transform ${isDark ? 'hover:text-violet-400' : 'hover:text-violet-600'}`}
                    whileHover={{ x: 4 }}
                  >
                    <span className="w-1 h-1 rounded-full bg-violet-500 mr-2"></span>
                    {item.label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'}`}>Get In Touch</h3>
            <p className="text-sm mb-4">
              Have a project idea or want to collaborate? Feel free to reach out!
            </p>
            <motion.a
              href="#contact"
              onClick={() => handleNavClick('contact')}
              className={`inline-flex items-center px-4 py-2 rounded-lg ${isDark ? 'bg-violet-600 hover:bg-violet-700' : 'bg-violet-600 hover:bg-violet-700'} text-white text-sm font-medium transition-colors duration-300`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </motion.a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`${isDark ? 'bg-gray-900/50 border-t border-gray-800' : 'bg-gray-50 border-t border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <p className="text-xs">
              &copy; {new Date().getFullYear()} Vishal Kumar Chaurasia. All rights reserved.
            </p>
            <div className="flex items-center text-xs">
              <span>Made with</span>
              <Heart className="w-3 h-3 mx-1 text-red-500 fill-current" />
              <span>by Vishal Kumar Chaurasia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;