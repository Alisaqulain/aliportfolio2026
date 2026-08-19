'use client'

import { useEffect, useState } from 'react'
import ThemeContext from '@/src/context/ThemeContext'
import McaAmu from '@/src/mca-amu/McaAmu'
import '@/src/mca-amu/mca-theme.css'
import '@/src/mca-amu/McaAmu.css'
import '@/src/mca-amu/McaLogin.css'
import '@/src/components/mca/FileManager.css'
import '@/src/components/mca/McaModal.css'
import '@/src/components/mca/McaToast.css'

export function McaShell() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }}>
      <McaAmu />
    </ThemeContext.Provider>
  )
}
