// ─────────────────────────────────────────────────────────────
// CONTEXT API DEMO — Theme Context
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { createContext, useState, useContext, useEffect } from 'react'

// Step 1: Create the context
const ThemeContext = createContext()

// Step 2: Create the Provider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark')

  // Sync theme with CSS variables on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Step 3: Custom hook for easy consumption
export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
