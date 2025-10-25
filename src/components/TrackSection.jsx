import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getOilLevelColor, getHealthScoreColor } from '../data/foodDatabase';
import './TrackSection.css';

export default function TrackSection({ trackedFoods, onRemoveFood, userName }) {
  // Calculate daily totals
  const dailyTotals = React.useMemo(() => {
    const today = new Date().toDateString();
    const todaysFoods = trackedFoods.filter(food => 
      food.timestamp && new Date(food.timestamp).toDateString() === today
    );

    return todaysFoods.reduce((totals, food) => ({
      calories: totals.calories + (food.calories || 0),
      oilLevel: Math.max(totals.oilLevel, food.oilLevel || 0), // Take highest oil level
      avgHealthScore: (totals.avgHealthScore + (food.healthScore || 0)) / 2,
      foodCount: totals.foodCount + 1
    }), { calories: 0, oilLevel: 0, avgHealthScore: 0, foodCount: 0 });
  }, [trackedFoods]);

  // Get oil level status
  const getOilStatus = (oilLevel) => {
    if (oilLevel <= 20) return { text: 'Excellent', color: '#10B981', icon: '💚' };
    if (oilLevel <= 50) return { text: 'Moderate', color: '#F59E0B', icon: '⚠️' };
    return { text: 'High', color: '#EF4444', icon: '🚨' };
  };

  // Format time
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Group foods by date
  const groupedFoods = React.useMemo(() => {
    const groups = {};
    trackedFoods.forEach(food => {
      const date = new Date(food.timestamp).toDateString();
      if (!groups[date]) groups[date] = [];
      groups[date].push(food);
    });
    
    // Sort dates (newest first)
    return Object.entries(groups).sort(([a], [b]) => new Date(b) - new Date(a));
  }, [trackedFoods]);

  const oilStatus = getOilStatus(dailyTotals.oilLevel);

  if (trackedFoods.length === 0) {
    return (
      <motion.div 
        className="track-section empty-track"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h2>Start Tracking Your Meals</h2>
          <p>Add your first meal to see detailed oil and calorie analysis</p>
          <div className="empty-tips">
            <div className="tip-item">
              <span className="tip-icon">📱</span>
              <span>Tap the + button to add food</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📸</span>
              <span>Take photos or search our database</span>
            </div>
            <div className="tip-item">
              <span className="tip-icon">📈</span>
              <span>Get instant health insights</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="track-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Daily Summary Header */}
      <div className="daily-summary">
        <div className="summary-header">
          <h1>Today's Tracking</h1>
          <p className="greeting">Hey {userName || 'there'}! Here's your daily overview</p>
        </div>
      </div>

      {/* Food Timeline */}
      <div className="food-timeline">
        <AnimatePresence>
          {groupedFoods.map(([date, foods], dateIndex) => (
            <motion.div 
              key={date}
              className="timeline-day"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: dateIndex * 0.1, duration: 0.3 }}
            >
              <div className="day-header">
                <h3>{date === new Date().toDateString() ? 'Today' : new Date(date).toLocaleDateString()}</h3>
                <span className="food-count">{foods.length} item{foods.length !== 1 ? 's' : ''}</span>
              </div>

              <div className="day-foods">
                {foods.map((food, foodIndex) => (
                  <motion.div
                    key={`${food.id}-${food.timestamp}`}
                    className={`food-track-card ${food.category}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: foodIndex * 0.05, duration: 0.2 }}
                  >
                    <div className="food-track-header">
                      <div className="food-basic-info">
                        <span className="food-emoji">{food.emoji}</span>
                        <div className="food-name-time">
                          <h4>{food.name}</h4>
                          <span className="food-time">{formatTime(food.timestamp)}</span>
                        </div>
                      </div>
                      <button 
                        className="remove-food"
                        onClick={() => onRemoveFood(food.id, food.timestamp)}
                        title="Remove food"
                      >
                        <i className="bi bi-x"></i>
                      </button>
                    </div>

                    <div className="food-track-details">
                      {/* Calories */}
                      <div className="detail-item">
                        <span className="detail-label">Calories:</span>
                        <span className="detail-value">{food.calories} kcal</span>
                      </div>

                      {/* Oil Content */}
                      <div className="detail-item oil-detail">
                        <span className="detail-label">Oil Content:</span>
                        <div className="oil-visual">
                          <div className="oil-dots-track">
                            {[...Array(6)].map((_, i) => (
                              <span
                                key={i}
                                className={`oil-dot-track ${i < (food.oilLevel / 100) * 6 ? 'filled' : ''}`}
                                style={{
                                  backgroundColor: i < (food.oilLevel / 100) * 6 
                                    ? getOilLevelColor(food.oilLevel) 
                                    : 'rgba(255, 255, 255, 0.2)'
                                }}
                              ></span>
                            ))}
                          </div>
                          <span className="oil-amount">{food.oilAmount}</span>
                        </div>
                      </div>

                      {/* Cooking Method */}
                      <div className="detail-item">
                        <span className="detail-label">Method:</span>
                        <span className="detail-value">{food.cookingMethod}</span>
                      </div>

                      {/* Health Score */}
                      <div className="detail-item">
                        <span className="detail-label">Health Score:</span>
                        <span 
                          className="detail-value health-score-value"
                          style={{ color: getHealthScoreColor(food.healthScore) }}
                        >
                          {food.healthScore}/10 {'⭐'.repeat(Math.floor(food.healthScore / 2))}
                        </span>
                      </div>

                      {/* Better Alternative */}
                      {food.betterAlternative && (
                        <div className="better-alternative">
                          <i className="bi bi-lightbulb"></i>
                          <span>Try: {food.betterAlternative}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Daily Insights */}
      {dailyTotals.foodCount > 0 && (
        <motion.div 
          className="daily-insights"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <h3>Today's Insights</h3>
          <div className="insights-grid">
            {dailyTotals.oilLevel > 70 && (
              <div className="insight-card warning">
                <i className="bi bi-exclamation-triangle"></i>
                <p>High oil intake today. Consider grilling or steaming your next meal.</p>
              </div>
            )}
            {dailyTotals.avgHealthScore >= 8 && (
              <div className="insight-card success">
                <i className="bi bi-check-circle"></i>
                <p>Great food choices today! You're maintaining a healthy diet.</p>
              </div>
            )}
            {dailyTotals.foodCount >= 3 && (
              <div className="insight-card info">
                <i className="bi bi-info-circle"></i>
                <p>Good tracking consistency! Regular logging helps build healthy habits.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
