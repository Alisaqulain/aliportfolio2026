import React, { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'
import './McaToast.css'

const ToastContext = createContext(null)

export function McaToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="mca-toast-container">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              className={`mca-toast mca-toast-${toast.type}`}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {toast.type === 'success' ? (
                <FaCheckCircle className="mca-toast-icon" />
              ) : (
                <FaTimesCircle className="mca-toast-icon" />
              )}
              <span>{toast.message}</span>
              <button
                type="button"
                className="mca-toast-close"
                onClick={() => removeToast(toast.id)}
                aria-label="Dismiss"
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useMcaToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useMcaToast must be used within McaToastProvider')
  return ctx
}
