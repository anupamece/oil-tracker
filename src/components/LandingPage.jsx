import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AddFoodModal from './AddFoodModal';
import TrackSection from './TrackSection';
import Carousel from './Carousel';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState("home");
  const [showAddModal, setShowAddModal] = React.useState(false);
  
  // Initialize trackedFoods from localStorage
  const [trackedFoods, setTrackedFoods] = React.useState(() => {
    try {
      const saved = localStorage.getItem('trackedFoods');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading tracked foods:', error);
    }
    return [];
  });

  // Persist tracked foods to localStorage whenever they change
  React.useEffect(() => {
    try {
      localStorage.setItem('trackedFoods', JSON.stringify(trackedFoods));
    } catch (error) {
      console.error('Error saving tracked foods:', error);
    }
  }, [trackedFoods]);
  
  // Mark user as logged in when landing page loads
  React.useEffect(() => {
    localStorage.setItem('userLoggedIn', 'true');
    
    // Store user data if available
    if (location.state?.userName) {
      const userData = {
        name: location.state.userName,
        initial: location.state.userName.charAt(0).toUpperCase()
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  }, [location.state]);
  
  // Get user from route state or localStorage (survives reloads)
  const storedUserData = React.useMemo(() => {
    try {
      const s = localStorage.getItem('userData');
      return s ? JSON.parse(s) : null;
    } catch (_) {
      return null;
    }
  }, []);

  const userName = location.state?.userName || storedUserData?.name || "";
  
  // Extract first letter of user name for avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
  
  const handleTabChange = (tab) => {
    if (tab === 'add') {
      setShowAddModal(true);
      return;
    }
    setActiveTab(tab);
    // Additional logic for each tab can be added here
  };

  // Handle adding food from modal
  const handleAddFood = (food) => {
    setTrackedFoods(prev => [food, ...prev]);
    setActiveTab('track'); // Switch to track section after adding food
  };

  // Handle removing food
  const handleRemoveFood = (foodId, timestamp) => {
    setTrackedFoods(prev => 
      prev.filter(food => !(food.id === foodId && food.timestamp === timestamp))
    );
  };

  return (
    <div className="landing-page">
      <main className="landing-content">
        {/* Dynamic content based on active tab */}
        {activeTab === 'home' && (
          <motion.div 
            className="content-placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Carousel Component */}
            <Carousel />
            
            {/* Content Section with rounded top */}
            <div className="home-content-section">
              <h1>Welcome{userName ? `, ${userName}` : '  User'}!</h1>
              <p>Track your oil consumption and get personalized health insights</p>
              
              {/* Dashboard summary cards */}
              <div className="dashboard-cards">
              <div className="dashboard-card today-tracking-card">
                <h3>Today's Tracking</h3>
                {(() => {
                  // Calculate daily totals
                  const today = new Date().toDateString();
                  const todaysFoods = trackedFoods.filter(food => 
                    food.timestamp && new Date(food.timestamp).toDateString() === today
                  );

                  const dailyTotals = todaysFoods.reduce((totals, food) => ({
                    calories: totals.calories + (food.calories || 0),
                    oilLevel: Math.max(totals.oilLevel, food.oilLevel || 0),
                    avgHealthScore: todaysFoods.length > 0 
                      ? todaysFoods.reduce((sum, f) => sum + (f.healthScore || 0), 0) / todaysFoods.length 
                      : 0,
                    foodCount: totals.foodCount + 1
                  }), { calories: 0, oilLevel: 0, avgHealthScore: 0, foodCount: 0 });

                  const getOilStatus = (oilLevel) => {
                    if (oilLevel <= 20) return { text: 'Excellent', color: '#10B981', icon: '💚' };
                    if (oilLevel <= 50) return { text: 'Moderate', color: '#F59E0B', icon: '⚠️' };
                    return { text: 'High', color: '#EF4444', icon: '🚨' };
                  };

                  const getHealthScoreColor = (score) => {
                    if (score >= 8) return '#10B981';
                    if (score >= 5) return '#F59E0B';
                    return '#EF4444';
                  };

                  const oilStatus = getOilStatus(dailyTotals.oilLevel);

                  if (dailyTotals.foodCount === 0) {
                    return (
                      <>
                        <p>Start tracking your daily oil usage</p>
                        <button className="action-button" onClick={() => handleTabChange('track')}>Track Now</button>
                      </>
                    );
                  }

                  return (
                    <div className="tracking-summary">
                      <div className="tracking-circular-stats">
                        {/* Calories Circular Progress */}
                        <div className="circular-stat">
                          <svg className="circular-progress" viewBox="0 0 120 120">
                            <circle
                              className="circular-progress-bg"
                              cx="60"
                              cy="60"
                              r="52"
                            />
                            <circle
                              className="circular-progress-fill"
                              cx="60"
                              cy="60"
                              r="52"
                              style={{
                                strokeDashoffset: 327 - (327 * Math.min(dailyTotals.calories / 2000, 1)),
                                stroke: dailyTotals.calories > 2000 ? '#EF4444' : '#10B981'
                              }}
                            />
                            <text x="60" y="60" className="circular-emoji">🔥</text>
                          </svg>
                          <div className="circular-stat-info">
                            <span className="circular-stat-value">{dailyTotals.calories}</span>
                            <span className="circular-stat-label">Calories</span>
                          </div>
                        </div>

                        {/* Oil Level Circular Progress */}
                        <div className="circular-stat">
                          <svg className="circular-progress" viewBox="0 0 120 120">
                            <circle
                              className="circular-progress-bg"
                              cx="60"
                              cy="60"
                              r="52"
                            />
                            <circle
                              className="circular-progress-fill"
                              cx="60"
                              cy="60"
                              r="52"
                              style={{
                                strokeDashoffset: 327 - (327 * Math.min(dailyTotals.oilLevel / 100, 1)),
                                stroke: oilStatus.color
                              }}
                            />
                            <text x="60" y="60" className="circular-emoji">{oilStatus.icon}</text>
                          </svg>
                          <div className="circular-stat-info">
                            <span className="circular-stat-value" style={{ color: oilStatus.color }}>{oilStatus.text}</span>
                            <span className="circular-stat-label">Oil Level</span>
                          </div>
                        </div>
                      </div>

                      {/* Health Score */}
                      <div className="tracking-stat health-score-stat">
                        <div className="stat-icon">⭐</div>
                        <div className="stat-info">
                          <span className="stat-label">Health Score</span>
                          <span className="stat-value" style={{ color: getHealthScoreColor(dailyTotals.avgHealthScore) }}>
                            {dailyTotals.avgHealthScore.toFixed(1)}/10
                          </span>
                          <div className="score-stars-mini">
                            {'⭐'.repeat(Math.floor(dailyTotals.avgHealthScore / 2))}
                          </div>
                        </div>
                      </div>

                      <button className="action-button" onClick={() => navigate('/details', { state: { trackedFoods, userName } })}>View Details</button>
                    </div>
                  );
                })()}
              </div>
              
              <div className="dashboard-card health-insights-card">
                <h3>Health Insights</h3>
                {(() => {
                  // Calculate oil level for insights
                  const today = new Date().toDateString();
                  const todaysFoods = trackedFoods.filter(food => 
                    food.timestamp && new Date(food.timestamp).toDateString() === today
                  );

                  const dailyTotals = todaysFoods.reduce((totals, food) => ({
                    oilLevel: Math.max(totals.oilLevel, food.oilLevel || 0),
                    foodCount: totals.foodCount + 1
                  }), { oilLevel: 0, foodCount: 0 });

                  let insights = [];
                  
                  if (dailyTotals.foodCount === 0) {
                    insights = [
                      { icon: '📊', text: 'Start tracking to get personalized health insights' },
                      { icon: '💡', text: 'Learn how different oils affect your health' }
                    ];
                  } else if (dailyTotals.oilLevel <= 20) {
                    // Excellent oil level
                    insights = [
                      { icon: '✅', text: 'Great job! Your oil consumption is in the optimal range' },
                      { icon: '🥗', text: 'Consider adding more healthy fats like nuts and avocados' }
                    ];
                  } else if (dailyTotals.oilLevel <= 50) {
                    // Moderate oil level
                    insights = [
                      { icon: '⚖️', text: 'Your oil intake is moderate. Try to keep it balanced' },
                      { icon: '🍳', text: 'Try steaming or grilling instead of frying for healthier meals' }
                    ];
                  } else {
                    // High oil level
                    insights = [
                      { icon: '⚠️', text: 'High oil consumption detected. Consider healthier cooking methods' },
                      { icon: '🥦', text: 'Switch to olive or avocado oil for better heart health' }
                    ];
                  }

                  return (
                    <>
                      <div className="insights-list">
                        {insights.map((insight, index) => (
                          <div key={index} className="insight-item">
                            <span className="insight-icon">{insight.icon}</span>
                            <span className="insight-text">{insight.text}</span>
                          </div>
                        ))}
                      </div>
                      <a href="#" className="learn-more-link">Learn more →</a>
                    </>
                  );
                })()}
              </div>
            </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'track' && (
          <motion.div 
            className="content-placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TrackSection 
              trackedFoods={trackedFoods}
              onRemoveFood={handleRemoveFood}
              userName={userName}
            />
          </motion.div>
        )}
        
        {activeTab === 'snaps' && (
          <motion.div 
            className="content-placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1>Your Food Snaps</h1>
            <p>Upload photos of your meals to track oil usage</p>
            <div className="empty-state">
              <i className="bi bi-camera-fill"></i>
              <p>No snaps yet. Start capturing your meals!</p>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'profile' && (
          <motion.div 
            className="content-placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="profile-header">
              <div className="large-avatar">{userInitial}</div>
              <h1>{userName || 'User'}</h1>
            </div>
            <div className="profile-stats">
              <div className="stat-card">
                <h3>0</h3>
                <p>Meals Tracked</p>
              </div>
              <div className="stat-card">
                <h3>0</h3>
                <p>Days Active</p>
              </div>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'pro' && (
          <motion.div 
            className="content-placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1>Upgrade to Pro</h1>
            <div className="pro-banner">
              <i className="bi bi-award"></i>
              <h2>Unlock Premium Features</h2>
              <p>Get advanced health insights, detailed analytics, and more</p>
              <button className="premium-button">Go Premium</button>
            </div>
          </motion.div>
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <motion.nav 
        className="bottom-navbar"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <div 
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => handleTabChange('home')}
        >
          <i className="bi bi-house-fill"></i>
          <span>Home</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'track' ? 'active' : ''}`}
          onClick={() => handleTabChange('track')}
        >
          <i className="bi bi-clipboard-data"></i>
          <span>Track</span>
        </div>
        <div className="nav-item add-button">
          <div className="plus-button" onClick={() => handleTabChange('add')}>
            <i className="bi bi-plus-lg"></i>
          </div>
        </div>
        <div 
          className={`nav-item ${activeTab === 'pro' ? 'active' : ''}`}
          onClick={() => handleTabChange('pro')}
        >
          <div className="pro-badge">
            <i className="bi bi-award"></i>
          </div>
          <span>Pro</span>
        </div>
        <div 
          className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => navigate('/profile', { state: { userName } })}
        >
          <div className="user-avatar">
            {userInitial}
          </div>
          <span>Me</span>
        </div>
      </motion.nav>

      {/* Add Food Modal */}
      <AddFoodModal 
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAddFood={handleAddFood}
      />
    </div>
  );
}