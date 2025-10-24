import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchFoods, getFoodsByCategory } from '../data/foodDatabase';
import './AddFoodModal.css';

export default function AddFoodModal({ isOpen, onClose, onAddFood }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [activeTab, setActiveTab] = useState('search');
  const [showCamera, setShowCamera] = useState(false);

  // Handle search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim()) {
      setSearchResults(searchFoods(query));
    } else {
      // Show popular foods when no search query
      setSearchResults([
        ...getFoodsByCategory('healthy').slice(0, 3),
        ...getFoodsByCategory('moderate').slice(0, 3),
        ...getFoodsByCategory('high').slice(0, 3)
      ]);
    }
  };

  // Initialize popular foods on mount
  React.useEffect(() => {
    if (isOpen && searchResults.length === 0) {
      setSearchResults([
        ...getFoodsByCategory('healthy').slice(0, 3),
        ...getFoodsByCategory('moderate').slice(0, 3),
        ...getFoodsByCategory('high').slice(0, 3)
      ]);
    }
  }, [isOpen]);

  // Handle food selection
  const handleFoodSelect = (food) => {
    onAddFood({
      ...food,
      timestamp: new Date(),
      id: Date.now() // Add unique tracking ID
    });
    onClose();
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle photo capture (placeholder for now)
  const handlePhotoCapture = () => {
    setShowCamera(true);
    // Simulate camera interface
    setTimeout(() => {
      setShowCamera(false);
      alert('Photo analysis coming soon! For now, please use the search feature.');
    }, 1500);
  };

  // Quick food suggestions
  const quickSuggestions = [
    { emoji: '🥗', name: 'Salad', category: 'healthy' },
    { emoji: '🍛', name: 'Dal', category: 'healthy' },
    { emoji: '🍕', name: 'Pizza', category: 'high' },
    { emoji: '🍟', name: 'Fries', category: 'high' },
    { emoji: '🥪', name: 'Sandwich', category: 'moderate' }
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="add-food-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="add-food-modal"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="modal-header">
            <h2>Add Food</h2>
            <button className="close-button" onClick={onClose}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="modal-tabs">
            <button 
              className={`tab-button ${activeTab === 'search' ? 'active' : ''}`}
              onClick={() => setActiveTab('search')}
            >
              <i className="bi bi-search"></i>
              Search
            </button>
            <button 
              className={`tab-button ${activeTab === 'photo' ? 'active' : ''}`}
              onClick={() => setActiveTab('photo')}
            >
              <i className="bi bi-camera"></i>
              Photo
            </button>
          </div>

          {/* Content */}
          <div className="modal-content">
            {activeTab === 'search' && (
              <motion.div 
                className="search-section"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Search Bar */}
                <div className="search-container">
                  <div className="search-input-wrapper">
                    <i className="bi bi-search search-icon"></i>
                    <input
                      type="text"
                      placeholder="Search foods (e.g., samosa, dal, pizza...)"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className="search-input"
                      autoFocus
                    />
                    {searchQuery && (
                      <button 
                        className="clear-search"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([
                            ...getFoodsByCategory('healthy').slice(0, 3),
                            ...getFoodsByCategory('moderate').slice(0, 3),
                            ...getFoodsByCategory('high').slice(0, 3)
                          ]);
                        }}
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Quick Suggestions */}
                {!searchQuery && (
                  <div className="quick-suggestions">
                    <p className="suggestions-label">Quick Add:</p>
                    <div className="suggestions-grid">
                      {quickSuggestions.map((item, index) => (
                        <button
                          key={index}
                          className="suggestion-button"
                          onClick={() => setSearchQuery(item.name)}
                        >
                          <span className="suggestion-emoji">{item.emoji}</span>
                          <span className="suggestion-text">{item.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                <div className="search-results">
                  {searchResults.length > 0 ? (
                    <div className="food-grid">
                      {searchResults.map((food) => (
                        <motion.div
                          key={food.id}
                          className={`food-card ${food.category}`}
                          onClick={() => handleFoodSelect(food)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          layout
                        >
                          <div className="food-emoji">{food.emoji}</div>
                          <div className="food-info">
                            <h3 className="food-name">{food.name}</h3>
                            <p className="food-details">
                              {food.cookingMethod} • {food.calories} cal
                            </p>
                            <div className="oil-indicator">
                              <span className="oil-label">Oil:</span>
                              <div className="oil-dots">
                                {[...Array(6)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`oil-dot ${i < (food.oilLevel / 100) * 6 ? 'filled' : ''}`}
                                  ></span>
                                ))}
                              </div>
                              <span className="oil-level">{food.oilContent}</span>
                            </div>
                            <div className="health-score">
                              <span className="score-value">{food.healthScore}/10</span>
                              <span className="score-stars">
                                {'⭐'.repeat(Math.floor(food.healthScore / 2))}
                              </span>
                            </div>
                          </div>
                          <div className="add-icon">
                            <i className="bi bi-plus-circle"></i>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : searchQuery ? (
                    <div className="no-results">
                      <i className="bi bi-search"></i>
                      <p>No foods found for "{searchQuery}"</p>
                      <p className="no-results-suggestion">Try searching for "samosa", "dal", or "pizza"</p>
                    </div>
                  ) : null}
                </div>
              </motion.div>
            )}

            {activeTab === 'photo' && (
              <motion.div 
                className="photo-section"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                {!showCamera ? (
                  <div className="photo-placeholder">
                    <div className="camera-icon">
                      <i className="bi bi-camera-fill"></i>
                    </div>
                    <h3>Analyze Food with AI</h3>
                    <p>Take a photo of your meal and get instant oil content analysis</p>
                    
                    <button 
                      className="camera-button"
                      onClick={handlePhotoCapture}
                    >
                      <i className="bi bi-camera"></i>
                      Take Photo
                    </button>
                    
                    <div className="coming-soon">
                      <i className="bi bi-info-circle"></i>
                      <span>AI analysis coming soon!</span>
                    </div>
                  </div>
                ) : (
                  <div className="camera-loading">
                    <div className="loading-animation">
                      <div className="loading-spinner"></div>
                    </div>
                    <p>Analyzing your food...</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
