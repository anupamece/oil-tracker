import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './UserProfile.css';

export default function UserProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [activeSection, setActiveSection] = useState(params.section || null);
  
  // Check if user is logged in, redirect to onboarding if not
  useEffect(() => {
    const userLoggedIn = localStorage.getItem('userLoggedIn');
    if (!userLoggedIn) {
      navigate('/');
    }
  }, [navigate]);
  
  // Get user data from localStorage or from route state
  const [userName, setUserName] = useState("User");
  const [firstName, setFirstName] = useState("User");
  const [userInitial, setUserInitial] = useState("U");
  
  // Load user data on component mount
  useEffect(() => {
    // Try to get user data from localStorage first
    const storedUserData = localStorage.getItem('userData');
    
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUserName(userData.name || "User");
      setFirstName((userData.name || "User").split(' ')[0]);
      setUserInitial(userData.initial || "U");
    } else if (location.state?.userName) {
      // Fall back to route state if available
      setUserName(location.state.userName);
      setFirstName(location.state.userName.split(' ')[0]);
      setUserInitial(location.state.userName.charAt(0).toUpperCase());
    }
  }, [location.state]);
  
  useEffect(() => {
    if (params.section) {
      setActiveSection(params.section);
    }
  }, [params.section]);
  
  const handleBack = () => {
    if (activeSection) {
      navigate('/profile', { state: { userName } });
      setActiveSection(null);
    } else {
      navigate('/home', { state: { userName } });
    }
  };
  
  const handleMenuItemClick = (sectionId) => {
    setActiveSection(sectionId);
    navigate(`/profile/${sectionId}`, { state: { userName } });
  };
  
  // Profile menu items
  const profileMenuItems = [
    {
      id: 'reminders',
      title: 'Reminders',
      icon: 'bi-alarm',
      description: 'Set reminders for oil tracking and health checks'
    },
    {
      id: 'goals',
      title: 'Goals',
      icon: 'bi-trophy',
      description: 'Set and track your health and nutrition goals'
    },
    {
      id: 'tasks',
      title: 'Tasks',
      icon: 'bi-check2-square',
      description: 'Daily tasks for better health habits'
    },
    {
      id: 'gallery',
      title: 'Snap Gallery',
      icon: 'bi-images',
      description: 'View your food photo history'
    },
    {
      id: 'metrics',
      title: 'Weight & Body Metrics',
      icon: 'bi-graph-up',
      description: 'Track your body measurements and progress'
    },
    {
      id: 'health',
      title: 'Health & Medical Info',
      icon: 'bi-heart-pulse',
      description: 'Manage your health records and medical history'
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: 'bi-question-circle',
      description: 'Get assistance and contact support'
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: 'bi-gear',
      description: 'Manage your account preferences'
    }
  ];

  return (
    <div className="user-profile-page">
      <motion.div 
        className="profile-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Back button row */}
        <div className="back-button-row">
          <div className="back-button" onClick={handleBack}>
            <i className="bi bi-chevron-left"></i>
          </div>
        </div>
        
        {/* User info and edit button row */}
        <div className="profile-info-row">
          <div className="user-profile-info">
            <div className="user-avatar-large">
              {userInitial}
            </div>
            <div className="user-name-section">
              <h1>{firstName}</h1>
              <p>{userName}</p>
            </div>
          </div>
          
          <div className="edit-profile-button">
            <i className="bi bi-pencil"></i>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="profile-stats-summary"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <div className="stat-summary-item">
          <h3>0</h3>
          <p>Meals Tracked</p>
        </div>
        <div className="stat-summary-item">
          <h3>0</h3>
          <p>Days Active</p>
        </div>
        <div className="stat-summary-item">
          <h3>0g</h3>
          <p>Avg. Oil Used</p>
        </div>
      </motion.div>
      
      {!activeSection ? (
        <div className="profile-menu-container">
          {profileMenuItems.map((item, index) => (
            <motion.div 
              key={item.id}
              className="profile-menu-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 + 0.2, duration: 0.3 }}
              onClick={() => handleMenuItemClick(item.id)}
            >
              <div className="menu-item-icon">
                <i className={`bi ${item.icon}`}></i>
              </div>
              <div className="menu-item-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="menu-item-arrow">
                <i className="bi bi-chevron-right"></i>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="section-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="section-header">
            {profileMenuItems.find(item => item.id === activeSection) && (
              <>
                <div className="section-icon">
                  <i className={`bi ${profileMenuItems.find(item => item.id === activeSection).icon}`}></i>
                </div>
                <h2>{profileMenuItems.find(item => item.id === activeSection).title}</h2>
              </>
            )}
          </div>
          
          <div className="section-body">
            {activeSection === 'reminders' && (
              <div className="section-placeholder">
                <i className="bi bi-alarm"></i>
                <h3>Your Reminders</h3>
                <p>You don't have any reminders set yet. Tap the button below to add your first reminder.</p>
                <button className="action-button">Add Reminder</button>
              </div>
            )}
            
            {activeSection === 'goals' && (
              <div className="goals-section">
                <div className="goals-intro">
                  <div className="goals-icon">
                    <i className="bi bi-trophy"></i>
                  </div>
                  <div className="goals-text">
                    <h3>Your Health Goals</h3>
                    <p>Set goals to track your progress and stay motivated on your healthy oil consumption journey.</p>
                  </div>
                </div>
                
                <div className="goals-grid">
                  {/* Sample Goals */}
                  <div className="goal-card">
                    <div className="goal-header">
                      <div className="goal-type">Daily</div>
                      <div className="goal-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '75%' }}></div>
                        </div>
                        <span>75%</span>
                      </div>
                    </div>
                    <h4>Limit oil consumption to 15ml per day</h4>
                    <div className="goal-details">
                      <span><i className="bi bi-calendar3"></i> Updated today</span>
                      <button className="goal-action-btn">Update</button>
                    </div>
                  </div>
                  
                  <div className="goal-card">
                    <div className="goal-header">
                      <div className="goal-type">Weekly</div>
                      <div className="goal-progress">
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: '40%' }}></div>
                        </div>
                        <span>40%</span>
                      </div>
                    </div>
                    <h4>Try 2 different healthy oils this week</h4>
                    <div className="goal-details">
                      <span><i className="bi bi-calendar3"></i> 4 days left</span>
                      <button className="goal-action-btn">Update</button>
                    </div>
                  </div>
                  
                  <div className="goal-card add-goal">
                    <div className="add-goal-content">
                      <i className="bi bi-plus-circle"></i>
                      <h4>Create New Goal</h4>
                      <p>Set a new health goal to track</p>
                    </div>
                  </div>
                </div>
                
                <div className="goals-suggestions">
                  <h3>Suggested Goals</h3>
                  <div className="suggestion-list">
                    <div className="suggestion-item">
                      <div className="suggestion-icon">
                        <i className="bi bi-droplet"></i>
                      </div>
                      <div className="suggestion-content">
                        <h4>Switch to olive oil for cooking</h4>
                        <p>Olive oil is rich in antioxidants and healthy monounsaturated fats</p>
                      </div>
                      <button className="add-suggestion-btn">
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    
                    <div className="suggestion-item">
                      <div className="suggestion-icon">
                        <i className="bi bi-calculator"></i>
                      </div>
                      <div className="suggestion-content">
                        <h4>Reduce oil intake by 20%</h4>
                        <p>Gradually decrease your daily oil consumption by measuring carefully</p>
                      </div>
                      <button className="add-suggestion-btn">
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeSection === 'tasks' && (
              <div className="section-placeholder">
                <i className="bi bi-check2-square"></i>
                <h3>Daily Tasks</h3>
                <p>Create daily tasks to build healthy habits.</p>
                <button className="action-button">Add Task</button>
              </div>
            )}
            
            {activeSection === 'gallery' && (
              <div className="section-placeholder">
                <i className="bi bi-images"></i>
                <h3>Snap Gallery</h3>
                <p>Your food photos will appear here once you start tracking meals.</p>
              </div>
            )}
            
            {activeSection === 'metrics' && (
              <div className="section-placeholder">
                <i className="bi bi-graph-up"></i>
                <h3>Weight & Body Metrics</h3>
                <p>Track your body measurements and see your progress over time.</p>
                <button className="action-button">Add Metrics</button>
              </div>
            )}
            
            {activeSection === 'health' && (
              <div className="section-placeholder">
                <i className="bi bi-heart-pulse"></i>
                <h3>Health & Medical Info</h3>
                <p>Store important health information for easy reference.</p>
                <button className="action-button">Add Health Info</button>
              </div>
            )}
            
            {activeSection === 'help' && (
              <div className="section-placeholder">
                <i className="bi bi-question-circle"></i>
                <h3>Help & Support</h3>
                <p>Need assistance? Contact our support team or browse our help articles.</p>
                <button className="action-button">Contact Support</button>
              </div>
            )}
            
            {activeSection === 'settings' && (
              <div className="settings-section">
                <div className="settings-category">
                  <h3>Account Settings</h3>
                  <div className="settings-options">
                    <div className="settings-option">
                      <div className="option-info">
                        <i className="bi bi-bell"></i>
                        <h4>Notifications</h4>
                      </div>
                      <div className="toggle-switch active"></div>
                    </div>
                    <div className="settings-option">
                      <div className="option-info">
                        <i className="bi bi-moon"></i>
                        <h4>Dark Mode</h4>
                      </div>
                      <div className="toggle-switch active"></div>
                    </div>
                    <div className="settings-option">
                      <div className="option-info">
                        <i className="bi bi-rulers"></i>
                        <h4>Units (Metric/Imperial)</h4>
                      </div>
                      <div className="toggle-switch"></div>
                    </div>
                    <div className="settings-option">
                      <div className="option-info">
                        <i className="bi bi-envelope"></i>
                        <h4>Email Notifications</h4>
                      </div>
                      <div className="toggle-switch active"></div>
                    </div>
                  </div>
                </div>
                
                <div className="settings-category">
                  <h3>Privacy Settings</h3>
                  <div className="settings-options">
                    <div className="settings-option">
                      <div className="option-info">
                        <i className="bi bi-shield-check"></i>
                        <h4>Data Sharing</h4>
                      </div>
                      <div className="toggle-switch"></div>
                    </div>
                    <div className="settings-option">
                      <div className="option-info">
                        <i className="bi bi-graph-up"></i>
                        <h4>Analytics</h4>
                      </div>
                      <div className="toggle-switch active"></div>
                    </div>
                  </div>
                </div>
                
                <div className="settings-category">
                  <h3>Account Management</h3>
                  <div className="settings-action-buttons">
                    <button className="settings-action-button">
                      <i className="bi bi-person"></i>
                      Edit Profile
                    </button>
                    <button className="settings-action-button">
                      <i className="bi bi-lock"></i>
                      Change Password
                    </button>
                    <button className="settings-action-button danger">
                      <i className="bi bi-trash"></i>
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="logout-button-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <button 
          className="logout-button"
          onClick={() => {
            // Clear user data from storage
            localStorage.removeItem('userLoggedIn');
            localStorage.removeItem('userData');
            sessionStorage.removeItem('userData');
            
            // Add a transition effect before navigating
            const signOutAnimation = async () => {
              // Show a brief fade effect by adding a class
              document.body.classList.add('signing-out');
              
              // Wait a short moment for visual feedback
              setTimeout(() => {
                // Navigate to onboarding page
                navigate('/', { replace: true });
              }, 300);
            };
            
            signOutAnimation();
          }}
        >
          <i className="bi bi-box-arrow-right"></i>
          Sign Out
        </button>
      </motion.div>
    </div>
  );
}