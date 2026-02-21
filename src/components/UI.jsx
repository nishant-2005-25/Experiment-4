// ─────────────────────────────────────────────────────────────
// Shared UI Components
// Button, Badge, Card, SectionHeader, CodeBlock
// Experiment 4: State Management in SPA
// ─────────────────────────────────────────────────────────────
import { useState } from 'react'

// ── Badge ────────────────────────────────────────────────────
export function Badge({ children, color = 'accent' }) {
  const colorMap = {
    accent:  { bg: 'var(--accent-soft)', text: 'var(--accent)',  border: 'var(--accent)' },
    success: { bg: '#22c87a20',          text: 'var(--success)', border: 'var(--success)' },
    danger:  { bg: '#f74a4a20',          text: 'var(--danger)',  border: 'var(--danger)' },
    warning: { bg: '#f7a94a20',          text: 'var(--warning)', border: 'var(--warning)' },
    muted:   { bg: '#6b6b8a20',          text: 'var(--muted)',   border: 'var(--muted)' },
  }
  const c = colorMap[color] || colorMap.accent

  return (
    <span style={{
      background:   c.bg,
      color:        c.text,
      border:       `1px solid ${c.border}44`,
      borderRadius: 99,
      padding:      '2px 10px',
      fontSize:     11,
      fontWeight:   700,
      letterSpacing: 1,
      textTransform: 'uppercase',
    }}>
      {children}
    </span>
  )
}

// ── Button ───────────────────────────────────────────────────
export function Button({
  children,
  onClick,
  variant  = 'primary',
  size     = 'md',
  disabled = false,
  fullWidth = false,
  style: extra,
}) {
  const [hov, setHov] = useState(false)

  const variants = {
    primary: {
      background: hov ? 'var(--accent-h)' : 'var(--accent)',
      color:      '#fff',
      border:     'none',
    },
    ghost: {
      background: hov ? 'var(--accent-soft)' : 'transparent',
      color:      'var(--accent)',
      border:     '1px solid var(--border)',
    },
    danger: {
      background: hov ? '#c43030' : 'var(--danger)',
      color:      '#fff',
      border:     'none',
    },
    success: {
      background: hov ? '#14924f' : 'var(--success)',
      color:      '#fff',
      border:     'none',
    },
  }

  const sizes = {
    sm: { padding: '4px 12px',  fontSize: 12 },
    md: { padding: '8px 18px',  fontSize: 14 },
    lg: { padding: '12px 28px', fontSize: 15 },
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...(variants[variant] || variants.primary),
        ...(sizes[size] || sizes.md),
        borderRadius: 8,
        fontWeight:   700,
        cursor:       disabled ? 'not-allowed' : 'pointer',
        opacity:      disabled ? 0.5 : 1,
        transition:   'all 0.15s',
        fontFamily:   'inherit',
        letterSpacing: 0.5,
        width:        fullWidth ? '100%' : undefined,
        ...extra,
      }}
    >
      {children}
    </button>
  )
}

// ── Card ─────────────────────────────────────────────────────
export function Card({ children, style: extra }) {
  return (
    <div style={{
      background:   'var(--card)',
      border:       '1px solid var(--border)',
      borderRadius: 16,
      padding:      24,
      ...extra,
    }}>
      {children}
    </div>
  )
}

export function Surface({ children, style: extra }) {
  return (
    <div style={{
      background:   'var(--surface)',
      border:       '1px solid var(--border)',
      borderRadius: 16,
      padding:      24,
      ...extra,
    }}>
      {children}
    </div>
  )
}

// ── Section Header ───────────────────────────────────────────
export function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ width: 3, height: 20, background: 'var(--accent)', borderRadius: 2 }} />
        <span style={{
          color:        'var(--accent)',
          fontSize:     11,
          fontWeight:   700,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          {label}
        </span>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ color: 'var(--muted)', fontSize: 13 }}>{subtitle}</p>
      )}
    </div>
  )
}

// ── Code Block ───────────────────────────────────────────────
export function CodeBlock({ code, title }) {
  return (
    <div>
      {title && (
        <div style={{
          fontWeight:  700,
          marginBottom: 12,
          fontSize:    13,
          display:     'flex',
          alignItems:  'center',
          gap:         8,
          color:       'var(--text)',
        }}>
          📄 {title}
        </div>
      )}
      <pre style={{
        background:    'var(--bg)',
        border:        '1px solid var(--border)',
        borderRadius:  10,
        padding:       16,
        fontSize:      12,
        color:         'var(--accent)',
        overflowX:     'auto',
        lineHeight:    1.8,
        margin:        0,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ── Text Input ───────────────────────────────────────────────
export function TextInput({ value, onChange, onKeyDown, placeholder, style: extra }) {
  return (
    <input
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={{
        background:   'var(--bg)',
        border:       '1px solid var(--border)',
        borderRadius: 8,
        padding:      '8px 12px',
        color:        'var(--text)',
        fontSize:     14,
        outline:      'none',
        width:        '100%',
        ...extra,
      }}
    />
  )
}
