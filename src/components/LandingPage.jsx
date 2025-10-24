import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import AddFoodModal from './AddFoodModal';
import TrackSection from './TrackSection';
import './LandingPage.css';

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState("home");
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [carouselVisible, setCarouselVisible] = React.useState(true);
  const [lastScrollTop, setLastScrollTop] = React.useState(0);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [trackedFoods, setTrackedFoods] = React.useState([]);
  
  // Get user name from route state or use default
  const userName = location.state?.userName || "";
  
  // Extract first letter of user name for avatar
  const userInitial = userName ? userName.charAt(0).toUpperCase() : "U";
  
  // Carousel testimonials data
  const testimonials = [
    {
      id: 1,
      type: "featured",
      bgImage: "/c1.png", // Using c1.png which exists in the public folder
      statsCards: [
        { title: "1000+", subtitle: "Families Trust Us" },
        { title: "100k+", subtitle: "Lives Changed" }
      ]
    },
    {
      id: 2,
      type: "featured",
      bgImage: "/c2.png", // Using c2.png which exists in the public folder
      title: "What Our Users Say",
      statsCards: [
        { 
          title: "Real Stories", 
          subtitle: "From Real Users",
          testimonial: "This app helped me identify which oils were causing my digestive issues. Now I cook smarter!",
          name: "Rahul Mehta",
          role: "Fitness Enthusiast",
          image: "/user1.png"
        },
        { 
          title: "Proven Results", 
          subtitle: "For Better Health",
          testimonial: "I've lost 8kg since I started tracking my oil consumption with this app!",
          name: "Priya Sharma",
          role: "Health Coach",
          image: "/user2.png"
        },
        { 
          title: "Business Impact", 
          subtitle: "For Restaurants",
          testimonial: "Our restaurant reduced oil costs by 25% while improving our food quality!",
          name: "Anita Desai", 
          role: "Restaurant Owner",
          image: "/user3.png"
        }
      ]
    },
    {
      id: 3,
      type: "featured",
      bgImage: "/c1.png", // Using c1.png again as a placeholder
      statsCards: [
        { title: "25%", subtitle: "Cost Reduction" },
        { title: "95%", subtitle: "User Satisfaction" }
      ]
    }
  ];
  
  // Carousel auto-scroll
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  // Scroll handler for carousel visibility
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop + 10) {
        // Scrolling down
        setCarouselVisible(false);
      } else if (scrollTop < lastScrollTop - 10) {
        // Scrolling up
        setCarouselVisible(true);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  
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
      {/* Testimonial Carousel */}
      <motion.div 
        className="carousel-container"
        initial={{ opacity: 1, height: 'auto' }}
        animate={{ 
          opacity: carouselVisible ? 1 : 0, 
          height: carouselVisible ? 'auto' : '0px',
          marginTop: carouselVisible ? '0px' : '-20px'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="carousel">
          <div 
            className="carousel-inner" 
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="carousel-slide">
                {testimonial.id === 1 ? (
                  <div className="featured-slide" style={{ backgroundImage: `url(${testimonial.bgImage})` }}>
                    <div className="featured-overlay">
                      <div className="featured-content">
                        <h2 className="featured-title">Empowering Healthier Choices</h2>
                        <p className="featured-subtitle">Transforming cooking habits for a healthier tomorrow</p>
                        
                        <div className="stats-container">
                          {testimonial.statsCards.map((stat, index) => (
                            <motion.div 
                              key={index} 
                              className="stat-box"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 + 0.5, duration: 0.4 }}
                            >
                              <h3 className="stat-number">{stat.title}</h3>
                              <p className="stat-label">{stat.subtitle}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : testimonial.id === 2 ? (
                  <div className="featured-slide" style={{ 
                    backgroundImage: `url(${testimonial.bgImage})`, 
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#222'
                  }}>
                    <div className="featured-overlay" style={{ zIndex: 5 }}>
                      <div className="featured-content">
                        <h2 className="featured-title">{testimonial.title}</h2>
                        <p className="featured-subtitle">Real experiences from our community</p>
                        
                        <div className="stats-container">
                          {testimonial.statsCards.map((stat, index) => (
                            <motion.div 
                              key={index} 
                              className="stat-box testimonial-stat-box"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 + 0.5, duration: 0.4 }}
                            >
                              <h3 className="stat-number">{stat.title}</h3>
                              <p className="stat-label">{stat.subtitle}</p>
                              <div className="testimonial-quote">
                                <i className="bi bi-chat-quote-fill quote-small"></i>
                                <p>{stat.testimonial}</p>
                              </div>
                              <div className="testimonial-user">
                                <div className="user-avatar-small">
                                  {stat.image ? <img src={stat.image} alt={stat.name} /> : stat.name.charAt(0)}
                                </div>
                                <div className="user-info">
                                  <h4>{stat.name}</h4>
                                  <p>{stat.role}</p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : testimonial.id === 3 ? (
                  <div className="featured-slide" style={{ 
                    backgroundImage: `url(${testimonial.bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: '#222'
                  }}>
                    <div className="featured-overlay" style={{ zIndex: 5 }}>
                      <div className="featured-content">
                        <h2 className="featured-title">Drive Business Success</h2>
                        <p className="featured-subtitle">Better oil management for your restaurants</p>
                        
                        <div className="stats-container">
                          {testimonial.statsCards.map((stat, index) => (
                            <motion.div 
                              key={index} 
                              className="stat-box"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.2 + 0.5, duration: 0.4 }}
                            >
                              <h3 className="stat-number">{stat.title}</h3>
                              <p className="stat-label">{stat.subtitle}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="testimonial-card">
                    <div className="quote-icon">
                      <i className="bi bi-chat-quote-fill"></i>
                    </div>
                    <p className="testimonial-text">Testimonial content not available.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <motion.div 
          className="carousel-indicators"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {testimonials.map((_, index) => (
            <motion.span 
              key={index} 
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.2 }}
            ></motion.span>
          ))}
        </motion.div>
      </motion.div>

      <main className={`landing-content ${!carouselVisible ? 'content-expanded' : ''}`}>
        {/* Dynamic content based on active tab */}
        {activeTab === 'home' && (
          <motion.div 
            className="content-placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1>Welcome{userName ? `, ${userName}` : ''}!</h1>
            <p>Track your oil consumption and get personalized health insights</p>
            
            {/* Dashboard summary cards would go here */}
            <div className="dashboard-cards">
              <div className="dashboard-card">
                <h3>Today's Tracking</h3>
                <p>Start tracking your daily oil usage</p>
                <button className="action-button">Track Now</button>
              </div>
              
              <div className="dashboard-card">
                <h3>Health Insights</h3>
                <p>View your personalized health insights</p>
                <button className="action-button">View Insights</button>
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
          onClick={() => handleTabChange('profile')}
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