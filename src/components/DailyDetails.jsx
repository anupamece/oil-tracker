import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './DailyDetails.css';

export default function DailyDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const trackedFoods = React.useMemo(() => {
    if (location.state?.trackedFoods) return location.state.trackedFoods;
    try {
      const saved = localStorage.getItem('trackedFoods');
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (_) {
      return [];
    }
  }, [location.state?.trackedFoods]);
  const userName = React.useMemo(() => {
    if (location.state?.userName) return location.state.userName;
    try {
      const s = localStorage.getItem('userData');
      const d = s ? JSON.parse(s) : null;
      return d?.name || '';
    } catch (_) {
      return '';
    }
  }, [location.state?.userName]);

  // Filter today's foods
  const todaysFoods = React.useMemo(() => {
    const today = new Date().toDateString();
    return trackedFoods.filter(food => food.timestamp && new Date(food.timestamp).toDateString() === today);
  }, [trackedFoods]);

  // Totals and maxima for linear scaling
  const summary = React.useMemo(() => {
    const totals = todaysFoods.reduce((acc, f) => {
      acc.calories += f.calories || 0;
      acc.protein += f.protein || 0;
      acc.carbs += f.carbs || 0;
      acc.fat += f.fat || 0;
      acc.fiber += f.fiber || 0;
      acc.maxOilLevel = Math.max(acc.maxOilLevel, f.oilLevel || 0);
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0, maxOilLevel: 0 });

    const maxes = todaysFoods.reduce((acc, f) => ({
      protein: Math.max(acc.protein, f.protein || 0),
      carbs: Math.max(acc.carbs, f.carbs || 0),
      fat: Math.max(acc.fat, f.fat || 0),
      fiber: Math.max(acc.fiber, f.fiber || 0),
    }), { protein: 1, carbs: 1, fat: 1, fiber: 1 });

    return { totals, maxes };
  }, [todaysFoods]);

  const oilStatus = (oilLevel) => {
    if (oilLevel <= 20) return { text: 'Excellent', color: '#10B981', icon: '💚' };
    if (oilLevel <= 50) return { text: 'Moderate', color: '#F59E0B', icon: '⚠️' };
    return { text: 'High', color: '#EF4444', icon: '🚨' };
  };

  const oil = oilStatus(summary.totals.maxOilLevel);

  return (
    <motion.main 
      className="daily-details-page"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.2 }}
    >
      <div className="details-header">
        <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
          <i className="bi bi-chevron-left"></i>
        </button>
        <h1>Today's Details</h1>
        <p className="sub">{userName ? `Hello, ${userName}. ` : ''}Here is what you ate today.</p>
      </div>

      {/* Top summary: Calories and Oil (larger visuals) */}
      <div className="top-summary">
        <div className="circle-card">
          <svg className="circular-progress" viewBox="0 0 120 120">
            <circle className="circular-progress-bg" cx="60" cy="60" r="52" />
            <circle
              className="circular-progress-fill"
              cx="60"
              cy="60"
              r="52"
              style={{ strokeDashoffset: 327 - (327 * Math.min(summary.totals.calories / 2000, 1)), stroke: summary.totals.calories > 2000 ? '#EF4444' : '#10B981' }}
            />
            <text x="60" y="60" className="circular-emoji">🔥</text>
          </svg>
          <div className="circle-info">
            <div className="circle-value">{summary.totals.calories}</div>
            <div className="circle-label">Calories</div>
          </div>
        </div>

        <div className="circle-card">
          <svg className="circular-progress" viewBox="0 0 120 120">
            <circle className="circular-progress-bg" cx="60" cy="60" r="52" />
            <circle
              className="circular-progress-fill"
              cx="60"
              cy="60"
              r="52"
              style={{ strokeDashoffset: 327 - (327 * Math.min(summary.totals.maxOilLevel / 100, 1)), stroke: oil.color }}
            />
            <text x="60" y="60" className="circular-emoji">{oil.icon}</text>
          </svg>
          <div className="circle-info">
            <div className="circle-value" style={{ color: oil.color }}>{oil.text}</div>
            <div className="circle-label">Oil Level</div>
          </div>
        </div>
      </div>

      {/* Items list: per food with linear bars for macros */}
      <div className="foods-list">
        {todaysFoods.length === 0 ? (
          <div className="empty">
            <div className="emoji">📋</div>
            <p>No foods tracked yet today.</p>
          </div>
        ) : (
          todaysFoods.map((food) => {
            const time = new Date(food.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            const macro = (v, max) => `${Math.min(100, Math.round((v / (max || 1)) * 100))}%`;
            return (
              <div key={`${food.id}-${food.timestamp}`} className="food-row">
                <div className="food-head">
                  <div className="left">
                    <span className="emoji">{food.emoji}</span>
                    <div className="names">
                      <h3>{food.name}</h3>
                      <span className="time">{time}</span>
                    </div>
                  </div>
                  <div className="right">
                    <div className="cal">{food.calories} cal</div>
                  </div>
                </div>

                <div className="macro-bars">
                  <div className="bar-row">
                    <span className="lbl">Protein</span>
                    <div className="bar"><div className="fill protein" style={{ width: macro(food.protein || 0, summary.maxes.protein) }}></div></div>
                    <span className="val">{food.protein || 0} g</span>
                  </div>
                  <div className="bar-row">
                    <span className="lbl">Carbs</span>
                    <div className="bar"><div className="fill carbs" style={{ width: macro(food.carbs || 0, summary.maxes.carbs) }}></div></div>
                    <span className="val">{food.carbs || 0} g</span>
                  </div>
                  <div className="bar-row">
                    <span className="lbl">Fat</span>
                    <div className="bar"><div className="fill fat" style={{ width: macro(food.fat || 0, summary.maxes.fat) }}></div></div>
                    <span className="val">{food.fat || 0} g</span>
                  </div>
                  <div className="bar-row">
                    <span className="lbl">Fiber</span>
                    <div className="bar"><div className="fill fiber" style={{ width: macro(food.fiber || 0, summary.maxes.fiber) }}></div></div>
                    <span className="val">{food.fiber || 0} g</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.main>
  );
}
