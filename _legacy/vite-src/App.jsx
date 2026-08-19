import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import ThemeContext from './context/ThemeContext'
import './App.css'

function AppContent() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      return saved || 'dark'
    } catch (e) {
      console.warn('localStorage not available:', e)
      return 'dark'
    }
  })

  useEffect(() => {
    try {
      // Set theme immediately on mount
      const html = document.documentElement
      html.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
      
      // Update body background
      const bgColor = getComputedStyle(html).getPropertyValue('--bg-primary') || '#0a0a0f'
      const textColor = getComputedStyle(html).getPropertyValue('--text-primary') || '#ffffff'
      document.body.style.background = bgColor
      document.body.style.color = textColor
    } catch (e) {
      console.error('Error setting theme:', e)
    }
  }, [theme])
  
  // Set initial theme before first render
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme') || 'dark'
      document.documentElement.setAttribute('data-theme', savedTheme)
    } catch (e) {
      console.warn('Error setting initial theme:', e)
      document.documentElement.setAttribute('data-theme', 'dark')
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" data-theme={theme}>
        <Header />
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </ThemeContext.Provider>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App