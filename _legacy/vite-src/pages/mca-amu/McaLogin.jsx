import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiEye, FiEyeOff, FiLock, FiSun, FiMoon } from 'react-icons/fi'
import ThemeContext from '../../context/ThemeContext'
import { mcaApi } from '../../utils/mcaApi'
import './McaLogin.css'

const McaLogin = ({ onLoginSuccess }) => {
  const { theme, toggleTheme } = React.useContext(ThemeContext)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!password || loading) return

    setLoading(true)
    setError('')

    try {
      await mcaApi.login(password)
      onLoginSuccess()
    } catch (err) {
      if (err.code === 'NETWORK') {
        setError('Unable to connect to server. Run npm run dev:api in another terminal.')
      } else if (err.code === 'AUTH') {
        setError('Invalid password.')
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
      <button type="button" className="mca-login-theme" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>

      <motion.div
        className="mca-login-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mca-login-icon"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          <FiLock />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          MCA AMU
        </motion.h1>
        <motion.p
          className="mca-login-subtitle"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          Private Dashboard
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label htmlFor="mca-password">Enter password</label>
          <div className="mca-login-input-wrapper">
            <input
              id="mca-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError('') }}
              placeholder="•••••••••••••••"
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

          {error && (
            <motion.p
              className="mca-login-error"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            className="mca-login-submit"
            disabled={loading || !password}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <span className="mca-login-spinner" />
                Signing in...
              </>
            ) : (
              'Access Dashboard'
            )}
          </motion.button>
        </motion.form>
      </motion.div>

      <div className="mca-login-bg-glow" />
    </div>
  )
}

export default McaLogin
