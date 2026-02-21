// ─────────────────────────────────────────────────────────────
// REDUX TOOLKIT — Todo Slice + createAsyncThunk
// Demonstrates: async actions, loading/error states
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ── Async Thunk: simulates fetching todos from an API ────────
export const fetchTodos = createAsyncThunk(
  'todos/fetchAll',
  async () => {
    // Simulated network delay (replace with real fetch in production)
    await new Promise(r => setTimeout(r, 1200))
    return [
      { id: 1001, text: 'Learn Context API', completed: false },
      { id: 1002, text: 'Set up Redux Store', completed: false },
      { id: 1003, text: 'Create Feature Slices', completed: false },
      { id: 1004, text: 'Use useSelector & useDispatch', completed: false },
      { id: 1005, text: 'Debug with Redux DevTools', completed: false },
    ]
  }
)

// ── Slice ────────────────────────────────────────────────────
const todoSlice = createSlice({
  name: 'todos',

  initialState: {
    items:   [],
    loading: false,
    error:   null,
  },

  // Synchronous reducers
  reducers: {
    addTodo(state, action) {
      state.items.push({
        id:        Date.now(),
        text:      action.payload,
        completed: false,
      })
    },

    toggleTodo(state, action) {
      const todo = state.items.find(t => t.id === action.payload)
      if (todo) todo.completed = !todo.completed
    },

    deleteTodo(state, action) {
      state.items = state.items.filter(t => t.id !== action.payload)
    },
  },

  // Async thunk lifecycle handlers
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false
        state.items   = [...state.items, ...action.payload]
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false
        state.error   = action.error.message
      })
  },
})

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions

// Selectors
export const selectTodos       = (state) => state.todos.items
export const selectTodosLoading = (state) => state.todos.loading
export const selectTodosError  = (state) => state.todos.error
export const selectDoneCount   = (state) =>
  state.todos.items.filter(t => t.completed).length

export default todoSlice.reducer
