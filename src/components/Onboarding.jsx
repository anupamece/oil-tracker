import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Onboarding.css'
import './OnboardingLight.css'
import Preloader from './Preloader'

export default function Onboarding() {
  const [lang, setLang] = useState('en')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const logoRef = useRef(null)
  const [prePos, setPrePos] = useState({ x: 0, y: 0 })

  const handleGetStarted = () => {
    navigate('/register')
  }

  useEffect(() => {
    const measure = () => {
      const rect = logoRef.current?.getBoundingClientRect()
      if (!rect) return
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const tx = rect.left + rect.width / 2 - cx
      const ty = rect.top + rect.height / 2 - cy
      setPrePos({ x: tx, y: ty })
    }
    const r = requestAnimationFrame(measure)
    const t = setTimeout(() => setLoading(false), 2100)
    return () => { cancelAnimationFrame(r); clearTimeout(t) }
  }, [])

  if (loading) {
    return <Preloader duration={1600} moveDelay={1200} targetX={prePos.x} targetY={prePos.y} />
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
                <img ref={logoRef} src="/logo.png" alt="Lean & Lite Logo" className="app-logo" />
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
              <h1 className="mb-2" style={{ fontWeight: 800 }}>Swasth Kadam</h1>
              <p className="lead mb-2">Small steps. Strong health. A smarter way to eat every day.</p>
              <p className="mb-2">
                Swasth Kadam helps you understand what goes into your plate—especially oils and calories—so you can make
                confident, healthier choices without giving up on the foods you love. Track meals, see insights, and take
                one positive step at a time.
              </p>
              <ul style={{ textAlign: 'left', margin: '0.5rem 0 0.75rem 1.1rem' }}>
                <li>Instant oil-awareness for Indian foods you actually eat</li>
                <li>Daily health score and simple, actionable tips</li>
                <li>Beautiful progress visuals to keep you motivated</li>
              </ul>
              <p className="mb-0">
                We are changing lives with gentle, habit-first guidance. Our aim is simple and ambitious:
                to make India healthier—one plate, one day, one Swasth Kadam at a time.
              </p>
            </div>
            
            <div className="action-buttons">
              <motion.button 
                className="btn btn-lg btn-success me-3 btn-glow"
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
          {/* <div className="illustration">
            <img 
              src="/oil.png" 
              alt="Healthy cooking oil"
              className="oil-image"
              width="100%"
              height="auto"
            />
          </div> */}
        </div>
      </div>
    </motion.main>
  )
}
