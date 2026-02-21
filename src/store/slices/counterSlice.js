// ─────────────────────────────────────────────────────────────
// REDUX TOOLKIT — Counter Slice
// Demonstrates: createSlice, actions, reducers
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',

  initialState: {
    value: 0,
    history: [],        // action log for DevTools demo
  },

  reducers: {
    // Immer lets us "mutate" state directly — RTK handles immutability
    increment(state) {
      state.value += 1
      state.history.push(`increment → ${state.value}`)
    },

    decrement(state) {
      state.value -= 1
      state.history.push(`decrement → ${state.value}`)
    },

    // action.payload carries the custom amount
    incrementByAmount(state, action) {
      state.value += action.payload
      state.history.push(`+${action.payload} → ${state.value}`)
    },

    reset(state) {
      state.value = 0
      state.history.push('reset → 0')
    },
  },
})

// Export auto-generated action creators
export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions

// Selectors — reusable, testable
export const selectCount   = (state) => state.counter.value
export const selectHistory = (state) => state.counter.history

export default counterSlice.reducer
