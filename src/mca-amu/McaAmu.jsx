import React, { useState, useEffect } from 'react'
import { mcaApi } from '../utils/mcaApi'
import { McaToastProvider } from '../components/mca/McaToast'
import McaLogin from './McaLogin'
import FileManager from '../components/mca/FileManager'
import './McaAmu.css'

const McaAmu = () => {
  const [authState, setAuthState] = useState('loading')
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    let mounted = true

    const checkSession = async () => {
      try {
        const data = await mcaApi.checkSession()
        if (mounted) {
          setAuthenticated(data.authenticated)
          setAuthState('ready')
        }
      } catch {
        if (mounted) {
          setAuthenticated(false)
          setAuthState('ready')
        }
      }
    }

    checkSession()
    return () => { mounted = false }
  }, [])

  const handleLoginSuccess = () => {
    setAuthenticated(true)
  }

  const handleLogout = () => {
    setAuthenticated(false)
  }

  if (authState === 'loading') {
    return (
      <div className="mca-amu-loading">
        <div className="mca-spinner" />
      </div>
    )
  }

  return (
    <McaToastProvider>
      <div className="mca-amu-root">
        {authenticated ? (
          <FileManager onLogout={handleLogout} />
        ) : (
          <McaLogin onLoginSuccess={handleLoginSuccess} />
        )}
      </div>
    </McaToastProvider>
  )
}

export default McaAmu
