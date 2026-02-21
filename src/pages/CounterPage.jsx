// ─────────────────────────────────────────────────────────────
// PAGE 2: Redux Counter Slice Demo
// Shows: useSelector, useDispatch, action creators
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  increment, decrement, incrementByAmount, reset,
  selectCount, selectHistory,
} from '../store/slices/counterSlice'
import { Button, Card, Surface, SectionHeader, CodeBlock } from '../components/UI'

const COUNTER_CODE = `// store/slices/counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment:         (state) => { state.value += 1 },
    decrement:         (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => { state.value += action.payload },
    reset:             (state) => { state.value = 0 },
  }
})

export const { increment, decrement, incrementByAmount, reset }
  = counterSlice.actions
export default counterSlice.reducer

// In component:
const count    = useSelector(state => state.counter.value)
const dispatch = useDispatch()

dispatch(increment())             // { type: 'counter/increment' }
dispatch(incrementByAmount(5))    // { type: 'counter/incrementByAmount', payload: 5 }`

export default function CounterPage() {
  const count   = useSelector(selectCount)
  const history = useSelector(selectHistory)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(5)

  const recentHistory = [...history].reverse().slice(0, 7)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader
        label="Part 2 — Redux Toolkit"
        title="Counter Slice"
        subtitle="createSlice() generates action creators automatically. Reducers use Immer for safe state mutation."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>

        {/* Counter Display & Controls */}
        <Card>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{
              fontSize: 11, color: 'var(--muted)', marginBottom: 8,
              letterSpacing: 2, textTransform: 'uppercase',
            }}>
              state.counter.value
            </div>
            <div style={{
              fontSize: 80, fontWeight: 800,
              color:    'var(--accent)',
              fontFamily: 'Space Mono, monospace',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}>
              {count}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <Button onClick={() => dispatch(increment())} size="lg">＋ Increment</Button>
            <Button onClick={() => dispatch(decrement())} variant="ghost" size="lg">－ Decrement</Button>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: 8, padding: '8px 12px',
                color: 'var(--text)', fontSize: 14, width: 80, outline: 'none',
              }}
            />
            <Button
              onClick={() => dispatch(incrementByAmount(amount))}
              variant="ghost"
              style={{ flex: 1 }}
            >
              Add {amount}
            </Button>
            <Button onClick={() => dispatch(reset())} variant="danger">Reset</Button>
          </div>
        </Card>

        {/* Action Log — simulates Redux DevTools */}
        <Card>
          <div style={{
            fontWeight: 700, marginBottom: 14, fontSize: 12,
            color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase',
          }}>
            ⚡ Action Log (Redux DevTools)
          </div>

          {recentHistory.length === 0 ? (
            <div style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', padding: '32px 0' }}>
              Dispatch an action to see logs
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {recentHistory.map((entry, i) => (
                <div key={i} style={{
                  background:   'var(--bg)',
                  borderRadius: 8,
                  padding:      '8px 14px',
                  fontSize:     12,
                  fontFamily:   'Space Mono, monospace',
                  color:        i === 0 ? 'var(--accent)' : 'var(--muted)',
                  border:       `1px solid ${i === 0 ? 'var(--accent)44' : 'var(--border)'}`,
                }}>
                  {entry}
                </div>
              ))}
            </div>
          )}

          <div style={{
            marginTop: 16, padding: 12,
            background: 'var(--accent-soft)', borderRadius: 10,
            fontSize: 12, color: 'var(--accent)',
          }}>
            <strong>Pro tip:</strong> Install the Redux DevTools browser extension for time-travel debugging, action replay, and state inspection.
          </div>
        </Card>
      </div>

      <Surface>
        <CodeBlock title="counterSlice.js — createSlice Pattern" code={COUNTER_CODE} />
      </Surface>
    </div>
  )
}
