import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import { motionVariants } from '../utils/animationUtils';
gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const { isDark } = useTheme();
  const contactRef = useRef(null);

  useEffect(() => {
    const el = contactRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
        },
      }
    );
  }, []);

  return (
    <section
      ref={contactRef}
      id="contact"
      className={`py-20 px-4 sm:px-6 min-h-screen flex flex-col justify-center ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-h1 mb-4">
            Contact <span className="gradient-heading">Me</span>
          </h2>
          <div className="divider mb-6"></div>
          <p className={`section-subtitle text-body-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a project in mind or just want to say hello? Feel free to reach out!
          </p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          variants={motionVariants.fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-xl overflow-hidden`}
        >
          <div className="grid md:grid-cols-5 items-stretch">
            {/* Left side - Info */}
            <div className={`p-8 md:p-10 col-span-2 ${isDark ? 'bg-violet-900/20' : 'bg-violet-50'}`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>Let's Connect</h3>
              <p className={`mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                I'm currently open to freelance opportunities and collaborations. Don't hesitate to reach out if you have any questions!              
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className={`mr-3 mt-1 w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Email</p>
                    <a href="mailto:contact@example.com" className={`${isDark ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-800'}`}>contact@example.com</a>
                  </div>
                </li>
                <li className="flex items-start">
                  <MessageSquare className={`mr-3 mt-1 w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-800'}`}>Response Time</p>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Within 24 hours</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-10 col-span-3">
              <form className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-4 pointer-events-none">
                    <User className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <motion.input
                    type="text"
                    placeholder="Your Name"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 text-white border-gray-700 focus:ring-violet-500' : 'bg-gray-50 text-gray-900 border border-gray-200 focus:ring-violet-500'}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-4 pointer-events-none">
                    <Mail className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <motion.input
                    type="email"
                    placeholder="Your Email"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 text-white border-gray-700 focus:ring-violet-500' : 'bg-gray-50 text-gray-900 border border-gray-200 focus:ring-violet-500'}`}
                    whileFocus={{ scale: 1.01 }}
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-4 top-4 pointer-events-none">
                    <MessageSquare className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                  <motion.textarea
                    placeholder="Your Message"
                    rows="5"
                    className={`w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${isDark ? 'bg-gray-800 text-white border-gray-700 focus:ring-violet-500' : 'bg-gray-50 text-gray-900 border border-gray-200 focus:ring-violet-500'}`}
                    whileFocus={{ scale: 1.01 }}
                  ></motion.textarea>
                </div>
                <motion.button
                  type="submit"
                  className={`flex items-center justify-center w-full font-medium py-3 px-6 rounded-lg transition-all duration-300 ${isDark ? 'bg-violet-600 hover:bg-violet-700 text-white' : 'bg-violet-600 hover:bg-violet-700 text-white'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;