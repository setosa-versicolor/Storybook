import React, { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import StoryPrompt from './components/StoryPrompt';
import StoryBook from './components/StoryBook';
import LoadingScreen from './components/LoadingScreen';
import ApiKeyModal from './components/ApiKeyModal';
import { generateStory, generateImages } from './services/openai';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState(null);

  const handleGenerateStory = useCallback(async (prompt) => {
    if (!apiKey) {
      setShowApiModal(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      setLoadingMessage('Crafting your whimsical tale...');
      const storyData = await generateStory(apiKey, prompt);
      
      setLoadingMessage('Painting magical illustrations...');
      const storyWithImages = await generateImages(apiKey, storyData);
      
      setStory(storyWithImages);
    } catch (err) {
      console.error('Error generating story:', err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  const handleApiKeySubmit = (key) => {
    setApiKey(key);
    setShowApiModal(false);
  };

  const handleBackToStart = () => {
    setStory(null);
    setError(null);
  };

  return (
    <div className="app">
      {/* Background decorations */}
      <div className="bg-decoration">
        <div className="bg-circle bg-circle-1" />
        <div className="bg-circle bg-circle-2" />
        <div className="bg-circle bg-circle-3" />
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" message={loadingMessage} />
        ) : story ? (
          <StoryBook key="book" story={story} onBack={handleBackToStart} />
        ) : (
          <StoryPrompt 
            key="prompt"
            onSubmit={handleGenerateStory}
            onApiKeyClick={() => setShowApiModal(true)}
            hasApiKey={!!apiKey}
            error={error}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showApiModal && (
          <ApiKeyModal
            onSubmit={handleApiKeySubmit}
            onClose={() => setShowApiModal(false)}
            currentKey={apiKey}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
