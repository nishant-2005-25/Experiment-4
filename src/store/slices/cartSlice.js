// ─────────────────────────────────────────────────────────────
// REDUX TOOLKIT — Shopping Cart Slice
// Demonstrates: createSlice with complex state logic
// Experiment 4: State Management in SPA
// Student : Nishant Verma
// UID     : 23BAI70013
// Course  : Full Stack II (23CSH-382) | AI201 | 4th Semester
// Faculty : Mr. Prince Pal Singh (E18505)
// ─────────────────────────────────────────────────────────────
import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',

  initialState: {
    items: [],   // [{ id, name, price, emoji, category, qty }]
    total: 0,
  },

  reducers: {
    addItem(state, action) {
      const product = action.payload
      const existing = state.items.find(i => i.id === product.id)

      if (existing) {
        existing.qty += 1
      } else {
        state.items.push({ ...product, qty: 1 })
      }

      state.total = parseFloat((state.total + product.price).toFixed(2))
    },

    removeItem(state, action) {
      const id   = action.payload
      const item = state.items.find(i => i.id === id)
      if (item) {
        state.total = parseFloat((state.total - item.price * item.qty).toFixed(2))
        state.items = state.items.filter(i => i.id !== id)
      }
    },

    clearCart(state) {
      state.items = []
      state.total = 0
    },
  },
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => state.cart.total
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0)

export default cartSlice.reducer
