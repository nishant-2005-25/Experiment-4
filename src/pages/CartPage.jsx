// ─────────────────────────────────────────────────────────────
// PAGE 3: Shopping Cart Slice Demo
// Shows: complex state, addItem, removeItem, clearCart
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  addItem, removeItem, clearCart,
  selectCartItems, selectCartTotal, selectCartCount,
} from '../store/slices/cartSlice'
import { Button, Badge, Card, Surface, SectionHeader, CodeBlock } from '../components/UI'

const PRODUCTS = [
  { id: 1, name: 'React Handbook',      price: 29.99, category: 'Books',   emoji: '📚' },
  { id: 2, name: 'Redux DevTools Pro',  price:  9.99, category: 'Tools',   emoji: '🛠️' },
  { id: 3, name: 'TypeScript Course',   price: 49.99, category: 'Courses', emoji: '📘' },
  { id: 4, name: 'Node.js Starter Kit', price: 19.99, category: 'Tools',   emoji: '🟢' },
  { id: 5, name: 'CSS Mastery',         price: 24.99, category: 'Books',   emoji: '🎨' },
  { id: 6, name: 'Next.js Bootcamp',    price: 59.99, category: 'Courses', emoji: '▲' },
]

const CART_CODE = `// store/slices/cartSlice.js
const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem(state, action) {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        existing.qty += 1
      } else {
        state.items.push({ ...action.payload, qty: 1 })
      }
      state.total = parseFloat((state.total + action.payload.price).toFixed(2))
    },
    removeItem(state, action) {
      const item  = state.items.find(i => i.id === action.payload)
      state.total = parseFloat((state.total - item.price * item.qty).toFixed(2))
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart(state) { state.items = []; state.total = 0 }
  }
})
export const { addItem, removeItem, clearCart } = cartSlice.actions

// Selectors (reusable, testable)
export const selectCartItems = (state) => state.cart.items
export const selectCartTotal = (state) => state.cart.total
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0)`

export default function CartPage() {
  const items     = useSelector(selectCartItems)
  const total     = useSelector(selectCartTotal)
  const itemCount = useSelector(selectCartCount)
  const dispatch  = useDispatch()

  const [filter, setFilter] = useState('All')
  const categories = ['All', ...new Set(PRODUCTS.map(p => p.category))]
  const filtered   = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <SectionHeader
        label="Part 3 — Redux Toolkit"
        title="Shopping Cart Slice"
        subtitle="cartSlice with addItem, removeItem, clearCart. useSelector reads state; useDispatch triggers actions."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>

        {/* Product Grid */}
        <div>
          {/* Category filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                style={{
                  padding: '5px 16px', borderRadius: 99, fontSize: 12,
                  fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
                  background: filter === c ? 'var(--accent)' : 'var(--surface)',
                  color:      filter === c ? '#fff' : 'var(--muted)',
                  border:     `1px solid ${filter === c ? 'var(--accent)' : 'var(--border)'}`,
                  transition: 'all 0.15s',
                }}
              >
                {c}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {filtered.map(product => {
              const inCart = items.find(i => i.id === product.id)
              return (
                <div
                  key={product.id}
                  style={{
                    background:   'var(--card)',
                    border:       `1px solid ${inCart ? 'var(--accent)55' : 'var(--border)'}`,
                    borderRadius: 14,
                    padding:      16,
                    transition:   'all 0.2s',
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{product.emoji}</div>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{product.name}</div>
                  <div style={{ marginBottom: 12 }}>
                    <Badge color="accent">{product.category}</Badge>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: 800, color: 'var(--success)',
                      fontFamily: 'Space Mono, monospace',
                    }}>
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => dispatch(addItem(product))}
                      size="sm"
                      variant={inCart ? 'ghost' : 'primary'}
                    >
                      {inCart ? `+1 (${inCart.qty})` : 'Add'}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Cart Sidebar */}
        <Card style={{ height: 'fit-content', position: 'sticky', top: 80 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 16,
          }}>
            <div style={{ fontWeight: 800, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8 }}>
              🛒 Cart <Badge color="accent">{itemCount}</Badge>
            </div>
            {items.length > 0 && (
              <Button onClick={() => dispatch(clearCart())} variant="danger" size="sm">Clear</Button>
            )}
          </div>

          {items.length === 0 ? (
            <div style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px 0', fontSize: 13 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🛒</div>
              Cart is empty
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {items.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    background: 'var(--bg)', borderRadius: 10, padding: '10px 12px',
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>{item.emoji} {item.name}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 12 }}>
                        ${item.price} × {item.qty}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        fontWeight: 800, color: 'var(--success)', fontSize: 13,
                        fontFamily: 'Space Mono, monospace',
                      }}>
                        ${(item.price * item.qty).toFixed(2)}
                      </span>
                      <button
                        onClick={() => dispatch(removeItem(item.id))}
                        style={{
                          background: '#f74a4a22', color: 'var(--danger)',
                          border: 'none', borderRadius: 6,
                          width: 24, height: 24, cursor: 'pointer',
                          fontSize: 14, display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                borderTop: '1px solid var(--border)', paddingTop: 14,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginBottom: 12,
              }}>
                <span style={{ fontWeight: 700, color: 'var(--muted)' }}>Total</span>
                <span style={{
                  fontWeight: 800, fontSize: 20, color: 'var(--success)',
                  fontFamily: 'Space Mono, monospace',
                }}>
                  ${total}
                </span>
              </div>

              <Button fullWidth size="lg">Checkout →</Button>
            </>
          )}
        </Card>
      </div>

      <Surface>
        <CodeBlock title="cartSlice.js — Complex State Pattern" code={CART_CODE} />
      </Surface>
    </div>
  )
}
