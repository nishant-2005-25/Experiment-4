// ─────────────────────────────────────────────────────────────
// CONTEXT API DEMO — Language / i18n Context
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { createContext, useState, useContext } from 'react'

const TRANSLATIONS = {
  English: { welcome: 'Welcome', addTodo: 'Add Todo', logout: 'Logout', flag: '🇬🇧' },
  Hindi:   { welcome: 'स्वागत है', addTodo: 'जोड़ें', logout: 'लॉग आउट', flag: '🇮🇳' },
  French:  { welcome: 'Bienvenue', addTodo: 'Ajouter', logout: 'Déconnexion', flag: '🇫🇷' },
  Spanish: { welcome: 'Bienvenido', addTodo: 'Agregar', logout: 'Cerrar sesión', flag: '🇪🇸' },
}

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('English')
  const t = TRANSLATIONS[language]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, TRANSLATIONS }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
