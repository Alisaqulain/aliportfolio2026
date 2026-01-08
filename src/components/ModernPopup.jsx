import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaTimes } from 'react-icons/fa'
import './ModernPopup.css'

const ModernPopup = ({ isOpen, onClose, message, type = 'success' }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modern-popup"
            initial={{ opacity: 0, scale: 0.8, y: 50, z: -100 }}
            animate={{ opacity: 1, scale: 1, y: 0, z: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50, z: -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="popup-content">
              <motion.div
                className="popup-icon-wrapper"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <div className="popup-icon-circle">
                  <FaCheckCircle className="popup-icon" />
                </div>
                <div className="popup-icon-glow"></div>
              </motion.div>

              <motion.h3
                className="popup-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Success!
              </motion.h3>

              <motion.p
                className="popup-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {message}
              </motion.p>

              <motion.button
                className="popup-close-btn"
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <FaTimes />
              </motion.button>

              <div className="popup-progress-bar">
                <motion.div
                  className="popup-progress-fill"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default ModernPopup



