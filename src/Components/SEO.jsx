import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * SEO component for better search engine visibility and social sharing
 */
const SEO = ({ 
  title = 'Vishal Kumar - Full Stack Developer',
  description = 'Portfolio of Vishal Kumar, a Full Stack Developer specializing in modern web applications with React, Node.js, and more.',
  keywords = 'full stack developer, web development, react, node.js, portfolio',
  author = 'Vishal Kumar',
  image = '/assets/images/profile.jpg' // Default social sharing image
}) => {
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Accessibility and mobile */}
      <html lang="en" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#8b5cf6" />
    </Helmet>
  );
};

export default SEO;
