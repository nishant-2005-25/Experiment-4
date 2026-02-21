// ─────────────────────────────────────────────────────────────
// PAGE 5: Architecture Reference
// Shows: setup steps, comparison table, folder structure
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { Card, Surface, SectionHeader, CodeBlock } from '../components/UI'

// ── Setup Steps ──────────────────────────────────────────────
const STEPS = [
  {
    num:   1,
    title: 'Install Packages',
    code:  `npm install @reduxjs/toolkit react-redux`,
  },
  {
    num:   2,
    title: 'Create a Slice  (src/store/slices/counterSlice.js)',
    code:
`import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1 },
  }
})

export const { increment } = counterSlice.actions
export default counterSlice.reducer`,
  },
  {
    num:   3,
    title: 'Configure Store  (src/store/index.js)',
    code:
`import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'

export const store = configureStore({
  reducer: { counter: counterReducer }
})
// ✅ Redux DevTools + Thunk middleware auto-included`,
  },
  {
    num:   4,
    title: 'Provide Store to App  (src/main.jsx)',
    code:
`import { Provider } from 'react-redux'
import { store }    from './store'

<Provider store={store}>
  <App />
</Provider>`,
  },
  {
    num:   5,
    title: 'Use in Components',
    code:
`import { useSelector, useDispatch } from 'react-redux'
import { increment } from './store/slices/counterSlice'

function Counter() {
  const count    = useSelector(state => state.counter.value)
  const dispatch = useDispatch()
  return <button onClick={() => dispatch(increment())}>{count}</button>
}`,
  },
]

// ── Comparison rows ──────────────────────────────────────────
const COMPARE = [
  { label: 'Install',      ctx: 'Built into React',        rdx: 'npm install needed'         },
  { label: 'Complexity',   ctx: 'Simple',                  rdx: 'Structured but scalable'    },
  { label: 'Best for',     ctx: 'Theme, Auth, Prefs',      rdx: 'Cart, Data, Large apps'     },
  { label: 'DevTools',     ctx: 'React DevTools only',     rdx: 'Powerful Redux DevTools'     },
  { label: 'Async',        ctx: 'Manual (useEffect)',       rdx: 'createAsyncThunk'           },
  { label: 'Performance',  ctx: 'All consumers re-render', rdx: 'Selective re-renders'       },
  { label: 'Time-travel',  ctx: '❌ Not supported',         rdx: '✅ Built-in'                },
  { label: 'Middleware',   ctx: '❌ Not supported',         rdx: '✅ Full middleware chain'   },
  { label: 'Team size',    ctx: 'Solo / small apps',       rdx: 'Medium to large teams'      },
]

const FOLDER_CODE = `src/
├── context/                    ← Context API providers
│   ├── ThemeContext.jsx         createContext + useContext
│   ├── AuthContext.jsx          login / logout state
│   └── LanguageContext.jsx      i18n preferences
│
├── store/                      ← Redux Toolkit
│   ├── index.js                 configureStore()
│   └── slices/
│       ├── counterSlice.js      increment / decrement / reset
│       ├── cartSlice.js         addItem / removeItem / clearCart
│       └── todoSlice.js         CRUD + createAsyncThunk
│
├── pages/                      ← Tab pages
│   ├── ContextPage.jsx
│   ├── CounterPage.jsx
│   ├── CartPage.jsx
│   ├── TodoPage.jsx
│   └── ArchitecturePage.jsx
│
├── components/
│   └── UI.jsx                  Button, Card, Badge, CodeBlock…
│
├── App.jsx                     Tabs + ThemeProvider + AuthProvider
├── main.jsx                    <Provider store={store}> root
└── index.css                   CSS variables + global styles`

export default function ArchitecturePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader
        label="Reference"
        title="Setup Guide & Architecture"
        subtitle="Complete Redux Toolkit project structure, 5-step setup, and Context API vs Redux comparison."
      />

      {/* Redux 5-step setup */}
      <Card>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 24 }}>
          🚀 Redux Toolkit — 5-Step Setup
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {STEPS.map(step => (
            <div key={step.num} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{
                width:      32, height: 32, borderRadius: '50%',
                background: 'var(--accent)', color: '#fff',
                display:    'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 800, flexShrink: 0, fontSize: 14,
              }}>
                {step.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{step.title}</div>
                <CodeBlock code={step.code} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Comparison Table */}
      <Card>
        <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>
          ⚖️ Context API vs Redux Toolkit
        </div>

        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr 1fr', gap: 12, marginBottom: 8 }}>
          <div />
          <div style={{ fontWeight: 800, color: 'var(--accent)', fontSize: 13 }}>🔵 Context API</div>
          <div style={{ fontWeight: 800, color: 'var(--success)', fontSize: 13 }}>🟢 Redux Toolkit</div>
        </div>

        {COMPARE.map(({ label, ctx, rdx }) => (
          <div key={label} style={{
            display:       'grid',
            gridTemplateColumns: '150px 1fr 1fr',
            gap:           12,
            alignItems:    'center',
            padding:       '10px 0',
            borderBottom:  '1px solid var(--border)',
          }}>
            <div style={{ color: 'var(--muted)', fontSize: 12, fontWeight: 700 }}>{label}</div>
            <div style={{ background: 'var(--accent-soft)', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: 'var(--accent)' }}>
              {ctx}
            </div>
            <div style={{ background: '#22c87a20', borderRadius: 8, padding: '6px 12px', fontSize: 12, color: 'var(--success)' }}>
              {rdx}
            </div>
          </div>
        ))}

        <div style={{ marginTop: 16, padding: 14, background: 'var(--accent-soft)', borderRadius: 12, fontSize: 13, color: 'var(--accent)' }}>
          💡 <strong>Rule of thumb:</strong> If state is needed by only 2–3 nearby components, use local useState. If it's shared across distant components with simple logic, use Context API. For complex, frequently-updated shared state, use Redux Toolkit.
        </div>
      </Card>

      {/* Folder structure */}
      <Surface>
        <CodeBlock title="Recommended Project Structure" code={FOLDER_CODE} />
      </Surface>
    </div>
  )
}
