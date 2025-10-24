import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './RegistrationForm.css'

export default function RegistrationForm() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic info (Step 1)
    name: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    medicalCondition: '',
    otherCondition: '',
    
    // Household & Cooking info (Step 2)
    householdSize: '',
    cookingFrequency: '',
    dominantOil: '',
    monthlyOilUsage: '',
    eatingOutFrequency: '',
    
    // Health parameters (Step 3)
    cholesterolLevel: '',
    bloodSugarLevel: '',
    bloodPressure: '',
    digestiveIssues: false,
    
    // Notification preferences (Step 4)
    notificationPreference: '',
    
    // Terms and conditions (Step 5 - Summary)
    acceptTerms: false
  })
  
  // Calculate BMI and category
  const calculateBMI = () => {
    if (!formData.weight || !formData.height) return { bmi: null, category: null, color: '#9aa6b2', insights: 'Please provide both height and weight for BMI calculation.' };
    
    // Convert height from cm to m
    const heightInM = formData.height / 100;
    // Calculate BMI: weight (kg) / (height (m) * height (m))
    const bmi = formData.weight / (heightInM * heightInM);
    
    let category = '';
    let color = '';
    let insights = '';
    
    if (bmi < 18.5) {
      category = 'Underweight';
      color = '#3b82f6'; // Blue
      insights = 'You may need to increase your caloric intake. Focus on healthy fats like olive or canola oil in moderation.';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Healthy';
      color = '#10b981'; // Green
      insights = 'You have a healthy BMI. Maintain a balanced diet with moderate oil consumption, focusing on healthier oils like olive oil.';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = '#f97316'; // Orange
      insights = 'Consider reducing oil consumption and opt for heart-healthy oils like olive or avocado oil in smaller quantities.';
    } else {
      category = 'Obese';
      color = '#ef4444'; // Red
      insights = 'Significantly reduce oil consumption and focus on healthier cooking methods like steaming, grilling, or air frying.';
    }
    
    return {
      bmi: bmi.toFixed(1),
      category,
      color,
      insights
    };
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const nextStep = (e) => {
    e.preventDefault()
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const prevStep = (e) => {
    e.preventDefault()
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStep(5)
    window.scrollTo(0, 0)
  }
  
  const finalSubmit = () => {
    // Here you would handle the form submission, like sending data to a server
    console.log('Form submitted:', formData)
    
    // Mark user as logged in
    localStorage.setItem('userLoggedIn', 'true');
    
    // Store user data
    const userData = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      initial: formData.name.charAt(0).toUpperCase()
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Navigate to home
    navigate('/home', { state: { userName: formData.name } })
  }

  const skipAndExplore = () => {
    // Save whatever data we have so far
    console.log('Skipped, partial data:', formData)
    
    // Mark user as logged in even if they skip
    localStorage.setItem('userLoggedIn', 'true');
    
    // Store basic user data
    if (formData.name) {
      const userData = {
        name: formData.name,
        initial: formData.name.charAt(0).toUpperCase()
      };
      localStorage.setItem('userData', JSON.stringify(userData));
    }
    
    navigate('/home', { state: { userName: formData.name } })
  }

  const goBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      navigate('/')
    }
  }

  return (
    <motion.main 
      className="registration-page"
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 30,
        duration: 0.2
      }}
    >
      <motion.div 
        className="registration-container"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.2 }}
      >
        <div className="registration-header">
          <div className="d-flex align-items-center position-relative">
            <button 
              className="btn btn-link back-button" 
              onClick={goBack}
              aria-label="Go back"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          </div>
          
          <div className="logo-centered">
            <motion.div 
              className="form-logo-container"
              initial={{ scale: 1.2 }}
              animate={{ scale: 1.2 }}
              transition={{ duration: 0.3 }}
            >
              <div className="form-logo-circle">
                <img src="/logo.png" alt="Lean & Lite Logo" className="form-logo" />
              </div>
            </motion.div>
          </div>
          
          <h2>
            {step === 1 && "Let's Get to Know You"}
            {step === 2 && "Tell Us About Your Cooking"}
            {step === 3 && "Health Parameters"}
            {step === 4 && "Stay Updated"}
            {step === 5 && "Your Summary"}
          </h2>
          
          {/* Step indicator */}
          <div className="step-indicator">
            <div className={`step-dot ${step >= 1 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 2 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 3 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 4 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 4 ? 'active' : ''}`}></div>
            <div className={`step-line ${step >= 5 ? 'active' : ''}`}></div>
            <div className={`step-dot ${step >= 5 ? 'active' : ''}`}></div>
          </div>
        </div>

        <form className="registration-form">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter your name"
                    autoFocus
                  />
                </div>
                
                <div className="mb-3">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    min="1"
                    max="120"
                    value={formData.age}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter your age"
                  />
                </div>
                
                <div className="mb-3 row">
                  <div className="col-6">
                    <label htmlFor="weight" className="form-label">Weight (kg)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="weight"
                      name="weight"
                      min="1"
                      max="300"
                      value={formData.weight}
                      onChange={handleFormChange}
                      placeholder="Weight in kg"
                      step="0.1"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="height" className="form-label">Height (cm)</label>
                    <input
                      type="number"
                      className="form-control"
                      id="height"
                      name="height"
                      min="50"
                      max="250"
                      value={formData.height}
                      onChange={handleFormChange}
                      placeholder="Height in cm"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="activityLevel" className="form-label">Activity Level</label>
                  <select 
                    className="form-select"
                    id="activityLevel"
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>Select your activity level</option>
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (light exercise 1-3 days/week)</option>
                    <option value="moderate">Moderate (moderate exercise 3-5 days/week)</option>
                    <option value="active">Active (hard exercise 6-7 days/week)</option>
                  </select>
                  <div className="form-text small">This helps tailor recommendations to your lifestyle</div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="medicalCondition" className="form-label">Medical Condition</label>
                  <div className="form-text mb-2 small">Select primary health concern for customized recommendations</div>
                  <select 
                    className="form-select mb-3"
                    id="medicalCondition"
                    name="medicalCondition"
                    value={formData.medicalCondition}
                    onChange={handleFormChange}
                  >
                    <option value="" disabled>Select your medical condition</option>
                    <option value="none">None / Healthy</option>
                    <option value="diabetes">Diabetes</option>
                    <option value="highBP">High Blood Pressure</option>
                    <option value="heartDisease">Heart Disease</option>
                    <option value="thyroid">Thyroid Disorder</option>
                    <option value="kidney">Kidney Disease</option>
                    <option value="liver">Liver Disease</option>
                    <option value="obesity">Obesity</option>
                    <option value="other">Other (please specify)</option>
                  </select>
                  
                  {formData.medicalCondition === 'other' && (
                    <div className="mt-3">
                      <label htmlFor="otherCondition" className="form-label">Please Specify</label>
                      <textarea
                        className="form-control"
                        id="otherCondition"
                        name="otherCondition"
                        rows="2"
                        value={formData.otherCondition}
                        onChange={handleFormChange}
                        placeholder="Please describe your health concerns..."
                      ></textarea>
                    </div>
                  )}
                </div>

                <div className="d-flex flex-column gap-2 mt-4">
                  <motion.button 
                    onClick={nextStep}
                    className="btn btn-lg btn-success"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="bi bi-arrow-right-circle me-2" aria-hidden="true"></i>
                    Continue
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-3">
                  <label htmlFor="householdSize" className="form-label">Household Size</label>
                  <select
                    className="form-select"
                    id="householdSize"
                    name="householdSize"
                    value={formData.householdSize}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>Select household size</option>
                    <option value="1">1 person</option>
                    <option value="2">2 people</option>
                    <option value="3-4">3-4 people</option>
                    <option value="5-6">5-6 people</option>
                    <option value="7+">7+ people</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="cookingFrequency" className="form-label">How often do you cook at home?</label>
                  <select
                    className="form-select"
                    id="cookingFrequency"
                    name="cookingFrequency"
                    value={formData.cookingFrequency}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>Select cooking frequency</option>
                    <option value="rarely">Rarely (1-2 times a week)</option>
                    <option value="sometimes">Sometimes (3-5 times a week)</option>
                    <option value="frequently">Frequently (Once daily)</option>
                    <option value="multiple">Multiple times daily</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="dominantOil" className="form-label">Which cooking oil do you use most often?</label>
                  <select
                    className="form-select"
                    id="dominantOil"
                    name="dominantOil"
                    value={formData.dominantOil}
                    onChange={handleFormChange}
                    required
                  >
                    <option value="" disabled>Select primary cooking oil</option>
                    <option value="mustard">Mustard Oil</option>
                    <option value="sunflower">Sunflower Oil</option>
                    <option value="soybean">Soybean Oil</option>
                    <option value="olive">Olive Oil</option>
                    <option value="groundnut">Groundnut/Peanut Oil</option>
                    <option value="coconut">Coconut Oil</option>
                    <option value="ghee">Ghee</option>
                    <option value="rice-bran">Rice Bran Oil</option>
                    <option value="sesame">Sesame Oil</option>
                    <option value="mixed">Mixed/Blended Oil</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="form-text small">This helps us understand your current cooking preferences</div>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="monthlyOilUsage" className="form-label">How much oil do you buy monthly for your household?</label>
                  <div className="oil-usage-stepper">
                    <div className="d-flex justify-content-between">
                      <div 
                        className={`stepper-option ${formData.monthlyOilUsage === 'below-1L' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'monthlyOilUsage', value: 'below-1L'}})}
                      >
                        <div className="stepper-indicator">
                          <span className="stepper-icon">🍶</span>
                        </div>
                        <div className="stepper-label">Below 1L</div>
                      </div>
                      
                      <div 
                        className={`stepper-option ${formData.monthlyOilUsage === '1-2L' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'monthlyOilUsage', value: '1-2L'}})}
                      >
                        <div className="stepper-indicator">
                          <span className="stepper-icon">🫙</span>
                        </div>
                        <div className="stepper-label">1–2L</div>
                      </div>
                      
                      <div 
                        className={`stepper-option ${formData.monthlyOilUsage === '3-5L' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'monthlyOilUsage', value: '3-5L'}})}
                      >
                        <div className="stepper-indicator">
                          <span className="stepper-icon">🛢️</span>
                        </div>
                        <div className="stepper-label">3–5L</div>
                      </div>
                      
                      <div 
                        className={`stepper-option ${formData.monthlyOilUsage === 'more-than-5L' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'monthlyOilUsage', value: 'more-than-5L'}})}
                      >
                        <div className="stepper-indicator">
                          <span className="stepper-icon">🛢️🛢️</span>
                        </div>
                        <div className="stepper-label">More than 5L</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="eatingOutFrequency" className="form-label">How often do you eat outside or order food online?</label>
                  <div className="emoji-scale">
                    <div className="d-flex justify-content-between">
                      <div 
                        className={`emoji-option ${formData.eatingOutFrequency === 'never' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'eatingOutFrequency', value: 'never'}})}
                      >
                        <div className="emoji">😌</div>
                        <div className="emoji-label">Never</div>
                      </div>
                      
                      <div 
                        className={`emoji-option ${formData.eatingOutFrequency === 'rarely' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'eatingOutFrequency', value: 'rarely'}})}
                      >
                        <div className="emoji">😊</div>
                        <div className="emoji-label">Rarely</div>
                      </div>
                      
                      <div 
                        className={`emoji-option ${formData.eatingOutFrequency === 'sometimes' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'eatingOutFrequency', value: 'sometimes'}})}
                      >
                        <div className="emoji">😋</div>
                        <div className="emoji-label">Sometimes</div>
                      </div>
                      
                      <div 
                        className={`emoji-option ${formData.eatingOutFrequency === 'often' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'eatingOutFrequency', value: 'often'}})}
                      >
                        <div className="emoji">🍔</div>
                        <div className="emoji-label">Often</div>
                      </div>
                      
                      <div 
                        className={`emoji-option ${formData.eatingOutFrequency === 'very-often' ? 'active' : ''}`}
                        onClick={() => handleFormChange({target: {name: 'eatingOutFrequency', value: 'very-often'}})}
                      >
                        <div className="emoji">🍕</div>
                        <div className="emoji-label">Very Often</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <motion.button 
                    onClick={prevStep}
                    className="btn btn-outline-secondary flex-grow-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
                    Back
                  </motion.button>
                  <motion.button 
                    onClick={nextStep}
                    className="btn btn-success flex-grow-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    Next
                    <i className="bi bi-arrow-right ms-1" aria-hidden="true"></i>
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-muted mb-3">These optional health parameters help us provide more accurate recommendations</p>
                
                <div className="mb-3">
                  <label htmlFor="cholesterolLevel" className="form-label">Cholesterol Level</label>
                  <select
                    className="form-select"
                    id="cholesterolLevel"
                    name="cholesterolLevel"
                    value={formData.cholesterolLevel}
                    onChange={handleFormChange}
                  >
                    <option value="">I don't know</option>
                    <option value="normal">Normal</option>
                    <option value="borderline">Borderline High</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="bloodSugarLevel" className="form-label">Blood Sugar Level</label>
                  <select
                    className="form-select"
                    id="bloodSugarLevel"
                    name="bloodSugarLevel"
                    value={formData.bloodSugarLevel}
                    onChange={handleFormChange}
                  >
                    <option value="">I don't know</option>
                    <option value="normal">Normal</option>
                    <option value="prediabetic">Pre-diabetic</option>
                    <option value="diabetic">Diabetic</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="bloodPressure" className="form-label">Blood Pressure</label>
                  <select
                    className="form-select"
                    id="bloodPressure"
                    name="bloodPressure"
                    value={formData.bloodPressure}
                    onChange={handleFormChange}
                  >
                    <option value="">I don't know</option>
                    <option value="normal">Normal</option>
                    <option value="elevated">Elevated</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="digestiveIssues"
                    name="digestiveIssues"
                    checked={formData.digestiveIssues}
                    onChange={handleFormChange}
                  />
                  <label className="form-check-label" htmlFor="digestiveIssues">
                    I experience digestive issues after consuming certain oils
                  </label>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <motion.button 
                    onClick={prevStep}
                    className="btn btn-outline-secondary flex-grow-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
                    Back
                  </motion.button>
                  <motion.button 
                    onClick={nextStep}
                    className="btn btn-success flex-grow-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    Next
                    <i className="bi bi-arrow-right ms-1" aria-hidden="true"></i>
                  </motion.button>
                </div>
                
                <div className="d-flex justify-content-center mt-3">
                  <motion.button 
                    onClick={skipAndExplore}
                    className="btn btn-link"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.1 }}
                  >
                    Skip & Explore
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-4">
                  <h3 className="mb-3">Would you like to receive updates?</h3>
                  <p className="text-muted">Choose how you'd like to receive cooking tips and health insights</p>
                </div>
                
                <div className="notification-options">
                  <div 
                    className={`notification-card ${formData.notificationPreference === 'daily' ? 'active' : ''}`}
                    onClick={() => handleFormChange({target: {name: 'notificationPreference', value: 'daily'}})}
                  >
                    <div className="notification-icon">
                      <i className="bi bi-bell-fill"></i>
                    </div>
                    <h4>Daily Tips</h4>
                    <p className="text-muted small">Get daily oil usage tips and healthy recipes</p>
                    <div className="card-check">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                  </div>
                  
                  <div 
                    className={`notification-card ${formData.notificationPreference === 'weekly' ? 'active' : ''}`}
                    onClick={() => handleFormChange({target: {name: 'notificationPreference', value: 'weekly'}})}
                  >
                    <div className="notification-icon">
                      <i className="bi bi-calendar-week"></i>
                    </div>
                    <h4>Weekly Summary</h4>
                    <p className="text-muted small">Get a weekly summary of your progress</p>
                    <div className="card-check">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                  </div>
                  
                  <div 
                    className={`notification-card ${formData.notificationPreference === 'none' ? 'active' : ''}`}
                    onClick={() => handleFormChange({target: {name: 'notificationPreference', value: 'none'}})}
                  >
                    <div className="notification-icon">
                      <i className="bi bi-bell-slash"></i>
                    </div>
                    <h4>No Notifications</h4>
                    <p className="text-muted small">I'll check the app when needed</p>
                    <div className="card-check">
                      <i className="bi bi-check-circle-fill"></i>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column gap-2 mt-4">
                  <motion.button 
                    onClick={handleSubmit}
                    className="btn btn-lg btn-success"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="bi bi-clipboard-check me-2" aria-hidden="true"></i>
                    View Summary
                  </motion.button>
                  
                  <motion.button 
                    onClick={prevStep}
                    className="btn btn-outline-secondary"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="bi bi-arrow-left me-2" aria-hidden="true"></i>
                    Back
                  </motion.button>

                  <motion.button 
                    onClick={skipAndExplore}
                    className="btn btn-link"
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.1 }}
                  >
                    Skip & Explore
                  </motion.button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center mb-4">
                  <h3 className="mb-3">Your Health Summary</h3>
                  <p className="text-summary-subtitle">Review your information before completing registration</p>
                </div>
                
                {/* User summary */}
                <div className="user-summary mb-4">
                  <div className="card p-4 mb-4 border-0 shadow-sm">
                    <h4>Personal Information</h4>
                    <p><span className="summary-label">Name:</span> <span className="summary-value">{formData.name}</span></p>
                    <p><span className="summary-label">Age:</span> <span className="summary-value">{formData.age} years</span></p>
                    <p><span className="summary-label">Email:</span> <span className="summary-value">{formData.email}</span></p>
                    <p><span className="summary-label">Household Size:</span> <span className="summary-value">{formData.householdSize}</span></p>
                    <p><span className="summary-label">Cooking Frequency:</span> <span className="summary-value">{formData.cookingFrequency}</span></p>
                  </div>
                  
                  {/* BMI Card */}
                  {formData.weight && formData.height && (
                    <div className="card p-4 mb-4 border-0 shadow-sm">
                      <h4>BMI Calculation</h4>
                      <div className="d-flex align-items-center mb-3">
                        <div 
                          className="bmi-circle"
                          style={{
                            backgroundColor: calculateBMI().color,
                            width: '80px',
                            height: '80px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#F5F1DC',
                            fontWeight: 'bold',
                            fontSize: '24px',
                            marginRight: '20px',
                            fontFamily: "'Courier New', monospace"
                          }}
                        >
                          {calculateBMI().bmi}
                        </div>
                        <div>
                          <h5 style={{ 
                            color: calculateBMI().color, 
                            fontWeight: 'bold',
                            fontFamily: "'Courier New', monospace" 
                          }}>
                            {calculateBMI().category}
                          </h5>
                          <p><span className="bmi-stat">Height:</span> <strong className="bmi-value summary-value">{formData.height} cm</strong> | <span className="bmi-stat">Weight:</span> <strong className="bmi-value summary-value">{formData.weight} kg</strong></p>
                        </div>
                      </div>
                      <div className="alert" style={{ backgroundColor: `${calculateBMI().color}20` }}>
                        <p className="mb-0 summary-value">{calculateBMI().insights}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Health Conditions */}
                  <div className="card p-4 mb-4 border-0 shadow-sm">
                    <h4>Health Information</h4>
                    {formData.medicalCondition && (
                      <p><span className="summary-label">Medical Condition:</span> <span className="summary-value">{formData.medicalCondition}</span></p>
                    )}
                    {formData.otherCondition && (
                      <p><span className="summary-label">Other Condition:</span> <span className="summary-value">{formData.otherCondition}</span></p>
                    )}
                    <p><span className="summary-label">Blood Sugar:</span> <span className="summary-value">{formData.bloodSugarLevel || 'Not specified'}</span></p>
                    <p><span className="summary-label">Blood Pressure:</span> <span className="summary-value">{formData.bloodPressure || 'Not specified'}</span></p>
                    <p><span className="summary-label">Digestive Issues with Oils:</span> <span className="summary-value">{formData.digestiveIssues ? 'Yes' : 'No'}</span></p>
                  </div>
                  
                  {/* Oil Usage */}
                  <div className="card p-4 mb-4 border-0 shadow-sm">
                    <h4>Oil Usage Habits</h4>
                    <p><span className="summary-label">Monthly Oil Purchase:</span> <span className="summary-value">{formData.oilPurchaseQuantity}</span></p>
                    <p><span className="summary-label">Primary Cooking Method:</span> <span className="summary-value">{formData.cookingMethod}</span></p>
                    <p><span className="summary-label">Preferred Oil Type:</span> <span className="summary-value">{formData.preferredOilType}</span></p>
                  </div>
                </div>
                
                {/* Terms and conditions */}
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleFormChange}
                  />
                  <label className="form-check-label" htmlFor="acceptTerms">
                    I accept the <a href="#" className="text-primary">Terms and Conditions</a> and <a href="#" className="text-primary">Privacy Policy</a>
                  </label>
                </div>

                <div className="d-flex gap-2 mt-4">
                  <motion.button 
                    onClick={prevStep}
                    className="btn btn-outline-secondary flex-grow-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                  >
                    <i className="bi bi-arrow-left me-1" aria-hidden="true"></i>
                    Back
                  </motion.button>
                  <motion.button 
                    onClick={finalSubmit}
                    className="btn btn-success flex-grow-1"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.1 }}
                    disabled={!formData.acceptTerms}
                  >
                    <i className="bi bi-check-circle me-1" aria-hidden="true"></i>
                    Complete Registration
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </motion.main>
  )
}