import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiEye, FiEyeOff, FiLock, FiSun, FiMoon, FiShield } from 'react-icons/fi'
import ThemeContext from '../context/ThemeContext'
import { mcaApi } from '../utils/mcaApi'
import './McaLogin.css'

const ORBS = [
  { size: 320, x: '10%', y: '15%', delay: 0, color: 'rgba(0, 212, 255, 0.18)' },
  { size: 260, x: '75%', y: '20%', delay: 1.2, color: 'rgba(123, 44, 191, 0.16)' },
  { size: 200, x: '60%', y: '70%', delay: 2.4, color: 'rgba(255, 0, 110, 0.1)' },
]

const McaLogin = ({ onLoginSuccess }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || loading) return

    setLoading(true)
    setError('')

    try {
      await mcaApi.login(password)
      onLoginSuccess()
    } catch (err) {
      if (err.code === 'NETWORK' || err.code === 'OFFLINE') {
        setError('Unable to reach the MCA API. On Vercel, add MCA env vars and redeploy — no separate server is needed.')
      } else if (err.code === 'AUTH') {
        setError('Invalid password. Try again.')
      } else {
        setError(err.message || 'Unable to sign in.')
      }
      setPassword('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mca-login-page">
      <div className="mca-login-grid" aria-hidden="true" />
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="mca-login-orb"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 24, -16, 0],
            y: [0, -20, 12, 0],
            scale: [1, 1.08, 0.96, 1],
          }}
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      <motion.button
        type="button"
        className="mca-login-theme"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </motion.button>

      <motion.div
        className="mca-login-card"
        initial={{ opacity: 0, y: 40, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mca-login-card-glow" aria-hidden="true" />

        <motion.div
          className="mca-login-icon-wrap"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 180, damping: 14 }}
        >
          <motion.div
            className="mca-login-icon-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          <div className="mca-login-icon">
            <FiLock />
          </div>
        </motion.div>

        <motion.div
          className="mca-login-badge"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25 }}
        >
          <FiShield size={12} />
          <span>Secure Access</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          MCA Drive
        </motion.h1>
        <motion.p
          className="mca-login-subtitle"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Enter your password to access the private dashboard
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42 }}
        >
          <label htmlFor="mca-password">Password</label>
          <div className={`mca-login-input-wrapper${focused ? ' is-focused' : ''}${error ? ' has-error' : ''}`}>
            <input
              id="mca-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              placeholder="Enter dashboard password"
              disabled={loading}
              autoComplete="current-password"
              autoFocus
            />
            <button
              type="button"
              className="mca-login-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                className="mca-login-error"
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            className="mca-login-submit"
            disabled={loading || !password}
            whileHover={loading || !password ? {} : { scale: 1.02, y: -1 }}
            whileTap={loading || !password ? {} : { scale: 0.98 }}
          >
            <span className="mca-login-submit-shine" aria-hidden="true" />
            {loading ? (
              <>
                <span className="mca-login-spinner" />
                Verifying…
              </>
            ) : (
              'Access Dashboard'
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  )
}

export default McaLogin
