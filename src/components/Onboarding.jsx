import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Onboarding.css'

export default function Onboarding() {
  const [lang, setLang] = useState('en')
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/register')
  }

  return (
    <motion.main 
      className="onboard-hero"
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100%', opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: 0.2
      }}
    >
      <div className="hero-card">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="d-flex justify-content-between align-items-start mb-3 app-header">
              <div className="app-logo-container">
                <div className="logo-circle-bg">
                  <img src="/logo.png" alt="Lean & Lite Logo" className="app-logo" />
                </div>
              </div>

              <div className="lang-select">
                <label className="me-2">Language</label>
                <div className="btn-group" role="group" aria-label="Language select">
                  <button
                    type="button"
                    className={`btn btn-sm ${lang === 'en' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setLang('en')}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm ${lang === 'hi' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setLang('hi')}
                  >
                    हिन्दी
                  </button>
                </div>
              </div>
            </div>

            <div className="description-text">
              <p className="mb-2">Track the oil content in meals and get friendly suggestions to make small changes for better health.</p>
            </div>
            
            <div className="illustration">
              <img 
                src="/oil.png" 
                alt="Healthy cooking oil"
                className="oil-image"
                width="100%"
                height="auto"
              />
            </div>
            
            <div className="action-buttons">
              <motion.button 
                className="btn btn-lg btn-success me-3"
                onClick={handleGetStarted}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, duration: 0.1 }}
              >
                <i className="bi bi-rocket-takeoff me-2" aria-hidden="true"></i>
                Get Started
              </motion.button>

              <button className="btn btn-outline-secondary btn-lg">
                <i className="bi bi-info-circle me-2" aria-hidden="true"></i>
                Learn More
              </button>
            </div>
          </div>
          
          {/* This illustration is for desktop layout only */}
          <div className="illustration">
            <img 
              src="/oil.png" 
              alt="Healthy cooking oil"
              className="oil-image"
              width="100%"
              height="auto"
            />
          </div>
        </div>
      </div>
    </motion.main>
  )
}
