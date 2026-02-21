// ─────────────────────────────────────────────────────────────
// CONTEXT API DEMO — Auth Context
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  const login = (name) =>
    setUser({ name, role: 'Student', avatar: name[0].toUpperCase() })

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
