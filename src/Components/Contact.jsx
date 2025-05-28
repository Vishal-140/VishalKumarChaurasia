import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext'; // Add this import

function Contact() {
  const { isDark } = useTheme(); // Use theme context instead of local state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ 
        type: 'error', 
        message: 'Please fill in all fields.' 
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address.' 
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // Using EmailJS service for sending emails
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'default_service',
          template_id: 'template_contact',
          user_id: 'public_key',
          template_params: {
            from_name: formData.name,
            from_email: formData.email,
            to_email: 'vishalkrchaurasia140@gmail.com',
            message: formData.message,
            subject: `New message from ${formData.name} via Portfolio Contact Form`
          }
        }),
      });

      if (response.ok) {
        setStatus({ 
          type: 'success', 
          message: 'Thank you! Your message has been sent successfully. I\'ll get back to you within 24 hours!' 
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Service unavailable');
      }
    } catch (error) {
      // Fallback: Create mailto link
      const subject = encodeURIComponent(`New message from ${formData.name} via Portfolio Contact Form`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const mailtoLink = `mailto:vishalkrchaurasia140@gmail.com?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoLink;
      
      setStatus({ 
        type: 'success', 
        message: 'Opening your email client... If it doesn\'t open automatically, please copy the details and email me directly at vishalkrchaurasia140@gmail.com' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Contact <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Me</span>
            </h2>
            <div className={`w-24 h-1 mx-auto mb-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full`}></div>
            <p className={`text-lg sm:text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
          </div>

          {/* Contact Form */}
          <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} rounded-2xl shadow-2xl overflow-hidden max-w-5xl mx-auto`}>
            <div className="grid lg:grid-cols-5 min-h-[500px]">
              {/* Left side - Info */}
              <div className={`p-6 sm:p-8 lg:p-10 lg:col-span-2 ${isDark ? 'bg-violet-900/20 border-r border-violet-800/30' : 'bg-violet-50 border-r border-violet-100'}`}>
                <h3 className={`text-xl sm:text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-800'}`}>
                  Let's Connect
                </h3>
                <p className={`mb-8 text-sm sm:text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  I'm currently open to freelance opportunities and collaborations. Don't hesitate to reach out if you have any questions!              
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                      <Mail className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                    </div>
                    <div>
                      <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>Email</p>
                      <a href="mailto:vishalkrchaurasia140@gmail.com" 
                         className={`text-sm sm:text-base hover:underline transition-colors break-all ${isDark ? 'text-violet-300 hover:text-violet-200' : 'text-violet-600 hover:text-violet-800'}`}>
                        vishalkrchaurasia140@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-2 rounded-lg ${isDark ? 'bg-violet-500/20' : 'bg-violet-100'}`}>
                      <MessageSquare className={`w-5 h-5 ${isDark ? 'text-violet-400' : 'text-violet-600'}`} />
                    </div>
                    <div>
                      <p className={`font-semibold mb-1 ${isDark ? 'text-white' : 'text-gray-800'}`}>Response Time</p>
                      <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Within 24 hours</p>
                    </div>
                  </div>
                </div>
                
                {/* Direct Email Button */}
                <div className="mt-8">
                  <a
                    href="mailto:vishalkrchaurasia140@gmail.com"
                    className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                      isDark 
                        ? 'bg-violet-600/20 text-violet-300 hover:bg-violet-600/30 border border-violet-600/30' 
                        : 'bg-violet-100 text-violet-700 hover:bg-violet-200 border border-violet-200'
                    }`}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me Directly
                  </a>
                </div>
              </div>

              {/* Right side - Form */}
              <div className="p-6 sm:p-8 lg:p-10 lg:col-span-3">
                <div className="space-y-6">
                  {/* Status Message */}
                  {status.message && (
                    <div className={`p-4 rounded-lg flex items-start space-x-3 ${
                      status.type === 'success' 
                        ? (isDark ? 'bg-green-900/30 border border-green-700' : 'bg-green-50 border border-green-200')
                        : (isDark ? 'bg-red-900/30 border border-red-700' : 'bg-red-50 border border-red-200')
                    }`}>
                      {status.type === 'success' ? (
                        <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      ) : (
                        <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                      )}
                      <p className={`text-sm leading-relaxed ${
                        status.type === 'success' 
                          ? (isDark ? 'text-green-300' : 'text-green-700')
                          : (isDark ? 'text-red-300' : 'text-red-700')
                      }`}>
                        {status.message}
                      </p>
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors ${
                      formData.name ? (isDark ? 'text-violet-400' : 'text-violet-600') : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.01] ${
                        isDark 
                          ? 'bg-gray-800 text-white border border-gray-700 focus:ring-violet-500 focus:border-violet-500' 
                          : 'bg-gray-50 text-gray-900 border border-gray-200 focus:ring-violet-500 focus:border-violet-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors ${
                      formData.email ? (isDark ? 'text-violet-400' : 'text-violet-600') : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email"
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.01] ${
                        isDark 
                          ? 'bg-gray-800 text-white border border-gray-700 focus:ring-violet-500 focus:border-violet-500' 
                          : 'bg-gray-50 text-gray-900 border border-gray-200 focus:ring-violet-500 focus:border-violet-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Message Textarea */}
                  <div className="relative group">
                    <div className={`absolute left-4 top-4 pointer-events-none transition-colors ${
                      formData.message ? (isDark ? 'text-violet-400' : 'text-violet-600') : (isDark ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your Message"
                      rows="5"
                      className={`w-full pl-12 pr-4 py-3 sm:py-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:scale-[1.01] resize-none ${
                        isDark 
                          ? 'bg-gray-800 text-white border border-gray-700 focus:ring-violet-500 focus:border-violet-500' 
                          : 'bg-gray-50 text-gray-900 border border-gray-200 focus:ring-violet-500 focus:border-violet-500 focus:bg-white'
                      }`}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center font-semibold py-3 sm:py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-70 disabled:cursor-not-allowed ${
                      isDark 
                        ? 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/25' 
                        : 'bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-violet-500/25'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Contact Methods */}
          <div className="mt-12 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Prefer a different way to connect? Feel free to reach out directly at{' '}
              <a 
                href="mailto:vishalkrchaurasia140@gmail.com" 
                className={`underline ${isDark ? 'text-violet-400 hover:text-violet-300' : 'text-violet-600 hover:text-violet-700'}`}
              >
                vishalkrchaurasia140@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;