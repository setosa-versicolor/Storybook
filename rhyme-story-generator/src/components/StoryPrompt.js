import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './StoryPrompt.css';

const samplePrompts = [
  "A clumsy dragon who can't stop sneezing",
  "A penguin who dreams of living in the desert",
  "A wizard whose spells always go hilariously wrong",
  "A cat who thinks it's a dog",
  "A robot learning to dance at a disco",
];

function StoryPrompt({ onSubmit, onApiKeyClick, hasApiKey, error }) {
  const [prompt, setPrompt] = useState('');
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt.trim());
    }
  };

  const handleSampleClick = (sample) => {
    setPrompt(sample);
  };

  return (
    <motion.div 
      className="story-prompt"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="prompt-container">
        {/* Header */}
        <motion.div 
          className="prompt-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="logo-container">
            <span className="logo-icon">📖</span>
            <h1 className="logo-text">Whimsy Tales</h1>
          </div>
          <p className="tagline">AI-Powered Rhyming Storybooks</p>
        </motion.div>

        {/* API Key Button */}
        <motion.button
          className={`api-key-button ${hasApiKey ? 'has-key' : ''}`}
          onClick={onApiKeyClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="key-icon">{hasApiKey ? '🔓' : '🔑'}</span>
          {hasApiKey ? 'API Key Set' : 'Enter OpenAI API Key'}
        </motion.button>

        {/* Main Form */}
        <motion.form 
          onSubmit={handleSubmit}
          className="prompt-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="prompt-label" htmlFor="story-prompt">
            What shall your story be about?
          </label>
          <div className="input-wrapper">
            <textarea
              id="story-prompt"
              className="prompt-input"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A brave little toaster on an epic quest..."
              rows={3}
              maxLength={500}
            />
            <span className="char-count">{prompt.length}/500</span>
          </div>

          <motion.button
            type="submit"
            className="submit-button"
            disabled={!prompt.trim() || !hasApiKey}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            whileHover={{ scale: hasApiKey && prompt.trim() ? 1.02 : 1 }}
            whileTap={{ scale: hasApiKey && prompt.trim() ? 0.98 : 1 }}
          >
            <span className="button-text">Create My Story</span>
            <motion.span 
              className="button-icon"
              animate={{ x: isHovering ? 5 : 0 }}
            >
              ✨
            </motion.span>
          </motion.button>

          {!hasApiKey && (
            <p className="api-hint">Please add your OpenAI API key to create stories</p>
          )}

          {error && (
            <motion.div 
              className="error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="error-icon">⚠️</span>
              {error}
            </motion.div>
          )}
        </motion.form>

        {/* Sample Prompts */}
        <motion.div 
          className="sample-prompts"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="sample-label">Need inspiration? Try one of these:</p>
          <div className="sample-list">
            {samplePrompts.map((sample, index) => (
              <motion.button
                key={index}
                className="sample-chip"
                onClick={() => handleSampleClick(sample)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
              >
                {sample}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer 
          className="prompt-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p>Powered by OpenAI GPT-4 & DALL-E 3</p>
        </motion.footer>
      </div>
    </motion.div>
  );
}

export default StoryPrompt;
