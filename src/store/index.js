// ─────────────────────────────────────────────────────────────
// REDUX TOOLKIT — Store Configuration
// Step 3: configureStore combines all slice reducers
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import cartReducer    from './slices/cartSlice'
import todoReducer    from './slices/todoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,   // state.counter
    cart:    cartReducer,      // state.cart
    todos:   todoReducer,      // state.todos
  },
  // configureStore auto-includes:
  //   ✅ Redux DevTools Extension support
  //   ✅ redux-thunk middleware (for async actions)
  //   ✅ Immutability & serializability checks (dev only)
})

export default store
