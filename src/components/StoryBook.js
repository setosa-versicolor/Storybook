import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './StoryBook.css';

function StoryBook({ story, onBack }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const bookRef = useRef(null);

  // Total pages: cover + story pages + end page
  const totalPages = story.pages.length + 2;

  const goToPage = useCallback((newPage, dir) => {
    if (isAnimating) return;
    if (newPage < 0 || newPage >= totalPages) return;
    
    setIsAnimating(true);
    setDirection(dir);
    setCurrentPage(newPage);
    
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1, 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1, -1);
  }, [currentPage, goToPage]);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        nextPage();
      } else {
        prevPage();
      }
    }
  };

  // Click handlers for left/right sides
  const handleClick = (e) => {
    if (!bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const halfWidth = rect.width / 2;

    if (clickX < halfWidth) {
      prevPage();
    } else {
      nextPage();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
      } else if (e.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, onBack]);

  // Page content renderer
  const renderPage = () => {
    if (currentPage === 0) {
      // Cover page
      return (
        <div className="book-page cover-page">
          <div className="cover-decoration top-left">✦</div>
          <div className="cover-decoration top-right">✦</div>
          <div className="cover-decoration bottom-left">✦</div>
          <div className="cover-decoration bottom-right">✦</div>
          <div className="cover-content">
            <h1 className="book-title">{story.title}</h1>
            <div className="cover-divider">〰️</div>
            <p className="book-subtitle">A Whimsical Tale</p>
          </div>
          <p className="tap-hint">Tap or swipe to turn pages</p>
        </div>
      );
    }

    if (currentPage === totalPages - 1) {
      // End page
      return (
        <div className="book-page end-page">
          <div className="end-content">
            <span className="end-icon">🌟</span>
            <h2 className="end-title">The End</h2>
            <p className="end-subtitle">We hope you enjoyed this tale!</p>
            <motion.button
              className="new-story-button"
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Another Story
            </motion.button>
          </div>
        </div>
      );
    }

    // Story pages
    const pageIndex = currentPage - 1;
    const page = story.pages[pageIndex];

    return (
      <div className="book-page story-page">
        <div className="page-image-container">
          {page.imageUrl ? (
            <img 
              src={page.imageUrl} 
              alt={`Illustration for page ${pageIndex + 1}`}
              className="page-image"
            />
          ) : (
            <div className="page-image-placeholder">
              <span>🎨</span>
              <p>Illustration</p>
            </div>
          )}
        </div>
        <div className="page-text-container">
          <p className="page-text">{page.text}</p>
        </div>
        <span className="page-number">{pageIndex + 1}</span>
      </div>
    );
  };

  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      rotateY: 0,
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      rotateY: direction > 0 ? -15 : 15,
    }),
  };

  return (
    <motion.div 
      className="story-book-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Back button */}
      <motion.button
        className="back-button"
        onClick={onBack}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span>←</span> Back
      </motion.button>

      {/* Progress indicator */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
        />
      </div>

      {/* Book */}
      <div 
        ref={bookRef}
        className="book no-select swipeable"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="book-spine" />
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentPage}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              rotateY: { duration: 0.4 },
            }}
            className="page-wrapper"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows (visible on desktop) */}
      <div className="nav-arrows">
        <motion.button
          className="nav-arrow nav-prev"
          onClick={prevPage}
          disabled={currentPage === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ‹
        </motion.button>
        <motion.button
          className="nav-arrow nav-next"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ›
        </motion.button>
      </div>

      {/* Page indicator */}
      <div className="page-indicator">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`indicator-dot ${i === currentPage ? 'active' : ''}`}
            onClick={() => goToPage(i, i > currentPage ? 1 : -1)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default StoryBook;
