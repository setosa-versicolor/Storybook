import React from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';

const loadingQuotes = [
  "Summoning the muses...",
  "Brewing rhymes...",
  "Consulting the poetry pixies...",
  "Painting dreams...",
  "Sprinkling story dust...",
];

function LoadingScreen({ message }) {
  const randomQuote = loadingQuotes[Math.floor(Math.random() * loadingQuotes.length)];

  return (
    <motion.div 
      className="loading-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="loading-content">
        {/* Animated book */}
        <div className="loading-book">
          <div className="book-cover">
            <motion.div 
              className="book-page-anim page-1"
              animate={{ rotateY: [0, -30, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="book-page-anim page-2"
              animate={{ rotateY: [0, -25, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />
            <motion.div 
              className="book-page-anim page-3"
              animate={{ rotateY: [0, -20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            />
          </div>
        </div>

        {/* Loading text */}
        <motion.h2 
          className="loading-message"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message || randomQuote}
        </motion.h2>

        {/* Progress dots */}
        <div className="loading-dots">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="loading-dot"
              animate={{ 
                y: [-3, 3, -3],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                delay: i * 0.15 
              }}
            />
          ))}
        </div>

        {/* Floating sparkles */}
        <div className="sparkles">
          {[...Array(6)].map((_, i) => (
            <motion.span
              key={i}
              className="sparkle"
              style={{
                left: `${10 + i * 15}%`,
                animationDelay: `${i * 0.5}s`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              ✨
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default LoadingScreen;
