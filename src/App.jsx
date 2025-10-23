import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import './App.css'

import Onboarding from './components/Onboarding'
import RegistrationForm from './components/RegistrationForm'
import LandingPage from './components/LandingPage'

// Wrapper component for animation context
function AnimationLayout() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait" initial={false} exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Onboarding />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/home" element={<LandingPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AnimationLayout />
    </BrowserRouter>
  )
}
