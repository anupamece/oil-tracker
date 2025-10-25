import React from 'react';
import './Preloader.css';

export default function Preloader({ duration = 1600, moveDelay = 1200, targetX = 0, targetY = 0 }) {
  // Expose timings and movement to CSS via custom properties
  const style = {
    ['--preloader-duration']: `${duration}ms`,
    ['--move-delay']: `${moveDelay}ms`,
    ['--overlay-fade-delay']: `${moveDelay + 600}ms`,
    ['--move-x']: `${Math.round(targetX)}px`,
    ['--move-y']: `${Math.round(targetY)}px`,
  };

  return (
    <div className="preloader-overlay" style={style} aria-busy="true" aria-live="polite">
      <div className="preloader-ball">
        <div className="preloader-liquid">
          <div className="wave wave1" />
          <div className="wave wave2" />
        </div>
        <img src="/logo.png" alt="App logo" className="preloader-logo" />
      </div>
    </div>
  );
}
