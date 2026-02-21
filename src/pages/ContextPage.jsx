// ─────────────────────────────────────────────────────────────
// PAGE 1: Context API Demo
// Shows: ThemeContext, AuthContext, LanguageContext live
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useTheme }    from '../context/ThemeContext'
import { useAuth }     from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { Button, Badge, Card, Surface, SectionHeader, CodeBlock, TextInput } from '../components/UI'

// ── Auth Panel ───────────────────────────────────────────────
function AuthPanel() {
  const { user, login, logout } = useAuth()
  const { t } = useLanguage()
  const [name, setName] = useState('')

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>🔐</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Auth Context</div>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>useContext(AuthContext)</div>
        </div>
      </div>

      {user ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'var(--accent)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 18, color: '#fff',
            }}>
              {user.avatar}
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>{user.name}</div>
              <Badge color="success">{user.role}</Badge>
            </div>
          </div>
          <Button onClick={logout} variant="ghost" size="sm">{t.logout}</Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <TextInput
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter your name…"
          />
          <Button
            onClick={() => { if (name.trim()) { login(name.trim()); setName('') } }}
            size="sm"
          >
            Login
          </Button>
        </div>
      )}
    </Card>
  )
}

// ── Theme Panel ──────────────────────────────────────────────
function ThemePanel() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>🎨</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Theme Context</div>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>useContext(ThemeContext)</div>
        </div>
      </div>

      <div style={{ marginBottom: 14 }}>
        <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>Current Theme</div>
        <Badge color={theme === 'dark' ? 'accent' : 'warning'}>
          {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </Badge>
      </div>

      <Button onClick={toggleTheme} size="sm">
        Switch to {theme === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </Card>
  )
}

// ── Language Panel ───────────────────────────────────────────
function LanguagePanel() {
  const { language, setLanguage, TRANSLATIONS } = useLanguage()

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 20 }}>🌐</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14 }}>Language Context</div>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>useContext(LanguageContext)</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {Object.keys(TRANSLATIONS).map(lang => (
          <div
            key={lang}
            onClick={() => setLanguage(lang)}
            style={{
              padding:    '7px 12px',
              borderRadius: 8,
              cursor:     'pointer',
              background: language === lang ? 'var(--accent-soft)' : 'transparent',
              color:      language === lang ? 'var(--accent)' : 'var(--muted)',
              border:     `1px solid ${language === lang ? 'var(--accent)44' : 'transparent'}`,
              fontSize:   13,
              fontWeight: language === lang ? 700 : 400,
              transition: 'all 0.15s',
            }}
          >
            {TRANSLATIONS[lang].flag} {lang}
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── Code Reference ───────────────────────────────────────────
const CONTEXT_CODE = `// 1. CREATE CONTEXT
const UserContext = createContext()

// 2. PROVIDER — holds state & exposes methods
export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const login  = (data) => setUser(data)
  const logout = ()     => setUser(null)
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

// 3. CUSTOM HOOK — consume anywhere
export const useUser = () => useContext(UserContext)

// 4. USAGE — any child component
function Header() {
  const { user, logout } = useUser()
  return <p>Welcome, {user?.name}!</p>
}`

// ── Page Export ──────────────────────────────────────────────
export default function ContextPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader
        label="Part 1 — Context API"
        title="Built-in React State Management"
        subtitle="No extra dependencies. createContext → Provider → useContext. Best for theme, auth, and simple global state."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <AuthPanel />
        <ThemePanel />
        <LanguagePanel />
      </div>

      <Surface>
        <CodeBlock title="UserContext.jsx — Full Pattern" code={CONTEXT_CODE} />
      </Surface>
    </div>
  )
}
