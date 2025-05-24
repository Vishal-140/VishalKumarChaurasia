# Vishal's Portfolio Website

A modern, responsive portfolio website built with React and featuring smooth animations, dark/light mode, and an organized component structure.

## 📋 Features

- **Responsive Design**: Optimized for all screen sizes
- **Dark/Light Mode**: Toggle between themes with smooth transitions
- **Interactive UI**: Engaging animations and particle effects
- **Smooth Scrolling**: Easy navigation between sections
- **Component-based Architecture**: Clean, modular code structure
- **Accessibility**: Improved for better user experience

## 🛠️ Technology Stack

- **React**: Frontend library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **Three.js**: 3D graphics library for background effects
- **Framer Motion**: Animation library
- **GSAP**: Animation library for complex animations
- **Lucide Icons**: Beautiful, consistent icon set

## 🧰 Project Structure

```
portfolio/
├── public/               # Static files
├── src/
│   ├── assets/           # Images, fonts, and other assets
│   ├── Components/       # React components for each section
│   ├── context/          # Context providers (Theme)
│   ├── styles/           # CSS files
│   │   ├── common.css    # Standardized typography and spacing
│   │   ├── theme.css     # Theme variables
│   │   └── skills-animations.css
│   ├── utils/            # Utility functions
│   │   ├── animationUtils.js  # Reusable animation utilities
│   │   ├── scrollUtils.js     # Scroll-related utilities
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Entry point
└── package.json          # Dependencies and scripts
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Build for production: `npm run build`

## 📝 Code Quality Guidelines

- **Consistent Naming**: Use descriptive, consistent names for components and variables
- **Component Structure**: Each component has a single responsibility
- **Code Reuse**: Utilize utility functions for common patterns
- **Typography**: Follow the standardized typography classes in common.css
- **Accessibility**: Ensure all interactive elements are keyboard accessible

## 🎨 Design System

The portfolio uses a consistent design system with:

- **Typography Scale**: Standardized text sizes from caption to display
- **Spacing System**: Consistent margins and padding throughout
- **Color Scheme**: Theme-aware colors with smooth transitions
- **Components**: Reusable UI patterns (cards, buttons, section titles)

## 🧩 Recent Improvements

- Standardized typography and spacing across all components
- Created reusable animation utilities
- Optimized background particle effects
- Improved accessibility with proper focus states
- Reduced code duplication with shared utility functions
- Enhanced theme switching with smoother transitions
- Optimized performance by removing redundant animations
