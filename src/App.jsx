// ─────────────────────────────────────────────────────────────
// App.jsx — Root Component
// Wraps everything in Context Providers, renders tab navigation
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { AuthProvider, useAuth }   from './context/AuthContext'
import { LanguageProvider }        from './context/LanguageContext'
import { useSelector }             from 'react-redux'
import { selectCartCount }         from './store/slices/cartSlice'

import ContextPage      from './pages/ContextPage'
import CounterPage      from './pages/CounterPage'
import CartPage         from './pages/CartPage'
import TodoPage         from './pages/TodoPage'
import ArchitecturePage from './pages/ArchitecturePage'

const TABS = [
  { id: 'context', label: 'Context API',   icon: '🔵' },
  { id: 'counter', label: 'Counter Slice', icon: '🔢' },
  { id: 'cart',    label: 'Cart Slice',    icon: '🛒' },
  { id: 'todo',    label: 'Todo + Async',  icon: '✅' },
  { id: 'arch',    label: 'Architecture',  icon: '📐' },
]

// ── Navbar ───────────────────────────────────────────────────
function Navbar({ tab, setTab }) {
  const { theme, toggleTheme } = useTheme()
  const { user }    = useAuth()
  const cartCount   = useSelector(selectCartCount)

  return (
    <header style={{
      background:    'var(--surface)',
      borderBottom:  '1px solid var(--border)',
      position:      'sticky',
      top:           0,
      zIndex:        100,
      backdropFilter: 'blur(12px)',
    }}>
      {/* Brand + tabs + actions */}
      <div style={{
        maxWidth:   1200,
        margin:     '0 auto',
        padding:    '0 24px',
        display:    'flex',
        alignItems: 'center',
        gap:        16,
        height:     60,
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <div style={{
            width:      32, height: 32,
            background: 'linear-gradient(135deg, var(--accent), var(--success))',
            borderRadius: 8,
            display:    'flex', alignItems: 'center', justifyContent: 'center',
            fontSize:   16,
          }}>
            ⚛
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>Experiment 4</div>
            <div style={{ color: 'var(--muted)', fontSize: 9, letterSpacing: 1.5 }}>STATE MANAGEMENT · SPA</div>
          </div>
        </div>

        {/* Tab navigation */}
        <nav style={{ display: 'flex', gap: 4, flex: 1, justifyContent: 'center' }}>
          {TABS.map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                padding:    '6px 14px',
                borderRadius: 8,
                fontSize:   12,
                fontWeight: 700,
                cursor:     'pointer',
                fontFamily: 'inherit',
                background: tab === id ? 'var(--accent)' : 'transparent',
                color:      tab === id ? '#fff' : 'var(--muted)',
                border:     'none',
                transition: 'all 0.15s',
                display:    'flex',
                alignItems: 'center',
                gap:        6,
                position:   'relative',
              }}
            >
              <span>{icon}</span>
              {label}
              {/* Cart badge */}
              {id === 'cart' && cartCount > 0 && (
                <span style={{
                  position:   'absolute',
                  top:        2, right: 2,
                  width:      16, height: 16,
                  borderRadius: '50%',
                  background: 'var(--danger)',
                  color:      '#fff',
                  fontSize:   9,
                  fontWeight: 800,
                  display:    'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Right side actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          {user && (
            <div title={user.name} style={{
              width:      30, height: 30, borderRadius: '50%',
              background: 'var(--accent)',
              display:    'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 13, color: '#fff',
            }}>
              {user.avatar}
            </div>
          )}
          <button
            onClick={toggleTheme}
            title="Toggle theme"
            style={{
              background:   'var(--card)',
              border:       '1px solid var(--border)',
              borderRadius: 8,
              padding:      '6px 10px',
              cursor:       'pointer',
              fontSize:     16,
              color:        'var(--text)',
            }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>

      {/* Course info banner */}
      <div style={{ background: 'var(--accent-soft)', borderBottom: '1px solid var(--border)' }}>
        <div style={{
          maxWidth:   1200,
          margin:     '0 auto',
          padding:    '6px 24px',
          display:    'flex',
          gap:        16,
          fontSize:   11,
          color:      'var(--muted)',
          flexWrap:   'wrap',
        }}>
          <span>📚 Full Stack II · 23CSH-382</span>
          <span>•</span>
          <span>🎓 Chandigarh University · 4th Semester · AI201</span>
          <span>•</span>
          <span>👤 Nishant Verma · 23BAI70013</span>
          <span>•</span>
          <span>👨‍🏫 Mr. Pritam Das (E19816)</span>
          <span>•</span>
          <span>🎯 CO1 · BT3 — State Management in SPA</span>
        </div>
      </div>
    </header>
  )
}

// ── Inner App (has access to all contexts + store) ───────────
function InnerApp() {
  const [tab, setTab] = useState('context')

  return (
    <>
      <Navbar tab={tab} setTab={setTab} />
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {tab === 'context' && <ContextPage />}
        {tab === 'counter' && <CounterPage />}
        {tab === 'cart'    && <CartPage />}
        {tab === 'todo'    && <TodoPage />}
        {tab === 'arch'    && <ArchitecturePage />}
      </main>
      <footer style={{
        borderTop:  '1px solid var(--border)',
        marginTop:  48,
        padding:    '20px 24px',
        background: 'var(--surface)',
      }}>
        <div style={{
          maxWidth:   1200,
          margin:     '0 auto',
          display:    'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap:   'wrap',
          gap:        16,
        }}>
          {/* Student card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width:      48, height: 48, borderRadius: 12,
              background: 'linear-gradient(135deg, var(--accent), var(--success))',
              display:    'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 800, fontSize: 20, color: '#fff', flexShrink: 0,
            }}>
              N
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 15 }}>Nishant Verma</div>
              <div style={{ color: 'var(--muted)', fontSize: 12, letterSpacing: 0.5 }}>
                UID: 23BAI70013 · AI201 · 4th Semester
              </div>
            </div>
          </div>

          {/* Course info */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>Experiment 4 — State Management in SPA</div>
            <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>
              Full Stack II (23CSH-382) · Chandigarh University · Jan–Jun 2026
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

// ── Root App — Context Providers wrap everything ─────────────
// Note: Redux <Provider> is in main.jsx (wraps App entirely)
export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <InnerApp />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
