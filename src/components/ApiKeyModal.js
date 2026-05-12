import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ApiKeyModal.css';

function ApiKeyModal({ onSubmit, onClose, currentKey }) {
  const [apiKey, setApiKey] = useState(currentKey || '');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="modal-header">
          <span className="modal-icon">🔑</span>
          <h2 className="modal-title">OpenAI API Key</h2>
        </div>

        <p className="modal-description">
          Enter your OpenAI API key to generate stories and illustrations. 
          Your key is stored locally in your browser and never sent to our servers.
        </p>

        <form onSubmit={handleSubmit} className="api-form">
          <div className="input-group">
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="api-input"
              autoComplete="off"
            />
            <button
              type="button"
              className="toggle-visibility"
              onClick={() => setShowKey(!showKey)}
              aria-label={showKey ? 'Hide key' : 'Show key'}
            >
              {showKey ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              disabled={!apiKey.trim()}
            >
              Save Key
            </button>
          </div>
        </form>

        <div className="modal-footer">
          <p>
            Need an API key? 
            <a 
              href="https://platform.openai.com/api-keys" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get one from OpenAI →
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ApiKeyModal;
