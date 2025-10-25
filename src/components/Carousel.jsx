import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Carousel.css';

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const slides = [
    {
      id: 1,
      type: 'featured',
      bgImage: '/c1.png',
      title: 'Empowering Healthier Choices',
      subtitle: 'Transforming cooking habits for a healthier tomorrow',
      stats: [
        { value: '1000+', label: 'Families Trust Us' },
        { value: '100k+', label: 'Lives Changed' }
      ]
    },
    {
      id: 2,
      type: 'placeholder',
      bgImage: '/c2.png'
    },
    {
      id: 3,
      type: 'placeholder',
      bgImage: '/c3.png'
    }
  ];

  // Auto-scroll carousel every 9 seconds (circular/infinite loop)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 9000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Utility: animated counter for stat values like "1000+" or "100k+"
  const CountUp = ({ value, duration = 1200 }) => {
    const [display, setDisplay] = React.useState(0);
    const [done, setDone] = React.useState(false);

    const parseTargetFromValue = (val) => {
      const str = String(val).trim();
      const hasPlus = str.endsWith('+');
      let core = hasPlus ? str.slice(0, -1).trim() : str;
      let multiplier = 1;
      if (/([kK])$/.test(core)) { multiplier = 1000; core = core.slice(0, -1); }
      if (/([mM])$/.test(core)) { multiplier = 1000000; core = core.slice(0, -1); }
      const num = parseFloat(core.replace(/[,\s]/g, '')) || 0;
      return { target: Math.round(num * multiplier), suffix: hasPlus ? '+' : '' };
    };

    React.useEffect(() => {
      const { target } = parseTargetFromValue(value);
      let rafId;
      setDone(false);
      setDisplay(0);

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const start = performance.now();

      const tick = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutCubic(progress);
        const nextVal = Math.floor(target * eased);
        setDisplay(nextVal);
        if (progress < 1) {
          rafId = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };

      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }, [value, duration, currentSlide]);

    const { target, suffix } = React.useMemo(() => parseTargetFromValue(value), [value]);
    const show = done ? `${target}${suffix}` : display.toLocaleString();
    return <>{show}</>;
  };

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="carousel-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slides[currentSlide].id === 1 ? (
              <div 
                className="slide-background"
                style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
              >
                <div className="slide-overlay">
                  <div className="slide-content">
                    <motion.h2 
                      className="slide-title"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h2>
                    
                    <motion.p 
                      className="slide-subtitle"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      {slides[currentSlide].subtitle}
                    </motion.p>
                    
                    <div className="stats-wrapper">
                      {slides[currentSlide].stats.map((stat, index) => (
                        <motion.div
                          key={index}
                          className="stat-box glow"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                        >
                          <h3 className="stat-value">
                            <CountUp value={stat.value} duration={1200} />
                          </h3>
                          <p className="stat-label">{stat.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div 
                className="slide-background"
                style={{ backgroundImage: `url(${slides[currentSlide].bgImage})` }}
              >
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h2 className="slide-title">Slide {slides[currentSlide].id}</h2>
                    <p className="slide-subtitle">Content coming soon...</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
