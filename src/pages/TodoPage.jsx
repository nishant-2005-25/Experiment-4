// ─────────────────────────────────────────────────────────────
// PAGE 4: Todo Slice + createAsyncThunk Demo
// Shows: async actions, loading/error states, extraReducers
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addTodo, toggleTodo, deleteTodo, fetchTodos,
  selectTodos, selectTodosLoading, selectDoneCount,
} from '../store/slices/todoSlice'
import { Button, Card, Surface, SectionHeader, CodeBlock, TextInput } from '../components/UI'

const ASYNC_CODE = `// store/slices/todoSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ── Async Thunk: handles pending / fulfilled / rejected ──────
export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async () => {
    const res = await fetch('https://api.example.com/todos')
    return res.json()   // → becomes action.payload
  }
)

const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    addTodo:    (state, action) => { state.items.push({ id: Date.now(), text: action.payload, completed: false }) },
    toggleTodo: (state, action) => { const t = state.items.find(t => t.id === action.payload); if (t) t.completed = !t.completed },
    deleteTodo: (state, action) => { state.items = state.items.filter(t => t.id !== action.payload) },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending,   (state)          => { state.loading = true })
      .addCase(fetchTodos.fulfilled, (state, action)  => { state.loading = false; state.items = action.payload })
      .addCase(fetchTodos.rejected,  (state, action)  => { state.loading = false; state.error = action.error.message })
  }
})`

export default function TodoPage() {
  const todos   = useSelector(selectTodos)
  const loading = useSelector(selectTodosLoading)
  const done    = useSelector(selectDoneCount)
  const dispatch = useDispatch()

  const [input,  setInput]  = useState('')
  const [filter, setFilter] = useState('all')

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input.trim()))
      setInput('')
    }
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'done')   return t.completed
    return true
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader
        label="Part 4 — Redux Toolkit"
        title="Todo Slice + createAsyncThunk"
        subtitle="Synchronous CRUD reducers combined with async thunk for API data fetching. Handles pending, fulfilled, and rejected states."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>

        {/* Main Todo List */}
        <Card>
          {/* Add input */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
            <TextInput
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              placeholder="Add a new todo…"
              style={{ flex: 1 }}
            />
            <Button onClick={handleAdd}>Add</Button>
          </div>

          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 16 }}>
            {['all', 'active', 'done'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '4px 14px', borderRadius: 99, fontSize: 12,
                  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  background: filter === f ? 'var(--accent)' : 'transparent',
                  color:      filter === f ? '#fff' : 'var(--muted)',
                  border:     `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {f}
              </button>
            ))}
            <span style={{ marginLeft: 'auto', color: 'var(--muted)', fontSize: 12 }}>
              {done} / {todos.length} done
            </span>
          </div>

          {/* Todo items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filtered.length === 0 && (
              <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px 0', fontSize: 13 }}>
                No todos yet — add one above or fetch sample todos →
              </div>
            )}
            {filtered.map(todo => (
              <div
                key={todo.id}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          12,
                  background:   'var(--bg)',
                  borderRadius: 10,
                  padding:      '10px 14px',
                  border:       `1px solid ${todo.completed ? 'var(--success)33' : 'var(--border)'}`,
                }}
              >
                {/* Checkbox */}
                <div
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{
                    width:        20,
                    height:       20,
                    borderRadius: 6,
                    border:       `2px solid ${todo.completed ? 'var(--success)' : 'var(--border)'}`,
                    background:   todo.completed ? 'var(--success)' : 'transparent',
                    cursor:       'pointer',
                    display:      'flex',
                    alignItems:   'center',
                    justifyContent: 'center',
                    flexShrink:   0,
                    transition:   'all 0.15s',
                  }}
                >
                  {todo.completed && <span style={{ color: '#fff', fontSize: 12 }}>✓</span>}
                </div>

                <span style={{
                  flex:           1,
                  fontSize:       14,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color:          todo.completed ? 'var(--muted)' : 'var(--text)',
                }}>
                  {todo.text}
                </span>

                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  style={{
                    background: 'transparent', border: 'none',
                    color: 'var(--muted)', cursor: 'pointer', fontSize: 16, padding: '0 4px',
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Async Thunk Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card>
            <div style={{ fontWeight: 700, marginBottom: 10, fontSize: 15 }}>⚡ Async Thunk Demo</div>
            <div style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 14, lineHeight: 1.7 }}>
              Click to simulate <code style={{ color: 'var(--accent)', fontSize: 12 }}>createAsyncThunk</code> fetching todos from an API.
              Watch the loading state update automatically.
            </div>

            <Button
              onClick={() => dispatch(fetchTodos())}
              disabled={loading}
              fullWidth
            >
              {loading ? '⏳ Fetching from API…' : '🌐 Fetch Sample Todos'}
            </Button>

            {loading && (
              <div style={{ marginTop: 12, height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height:     '100%',
                  background: 'var(--accent)',
                  borderRadius: 2,
                  animation:  'progress 1.2s ease-in-out forwards',
                  width:      '0%',
                }} />
              </div>
            )}

            {/* States explained */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { state: 'pending',   color: 'var(--warning)', desc: 'state.loading = true' },
                { state: 'fulfilled', color: 'var(--success)', desc: 'state.items = payload' },
                { state: 'rejected',  color: 'var(--danger)',  desc: 'state.error = message' },
              ].map(({ state, color, desc }) => (
                <div key={state} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 12 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                  <code style={{ color, minWidth: 70 }}>{state}</code>
                  <span style={{ color: 'var(--muted)' }}>{desc}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Mini stats */}
          <Card>
            <div style={{ fontWeight: 700, marginBottom: 12, fontSize: 13 }}>📊 State Snapshot</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { label: 'Total Todos', value: todos.length, color: 'var(--accent)' },
                { label: 'Completed',   value: done,         color: 'var(--success)' },
                { label: 'Remaining',   value: todos.length - done, color: 'var(--warning)' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--muted)', fontSize: 13 }}>{label}</span>
                  <span style={{ fontWeight: 800, color, fontFamily: 'Space Mono, monospace' }}>{value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Surface>
        <CodeBlock title="todoSlice.js — createAsyncThunk Pattern" code={ASYNC_CODE} />
      </Surface>
    </div>
  )
}
