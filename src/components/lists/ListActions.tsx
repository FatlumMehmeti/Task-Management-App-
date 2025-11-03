import { useEffect, useRef, useState } from 'react'

type Props = {
  onRename: () => void
  onDelete: () => void
}

export default function ListActions({ onRename, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current) return
      if (containerRef.current.contains(e.target as Node)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
  }, [])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <button
        aria-label="List menu"
        onClick={() => setOpen(v => !v)}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 4,
          lineHeight: 1,
          color: '#6b7280',
          fontSize: 18
        }}
      >
        ⋯
      </button>
      {open ? (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: 6,
            background: '#ffffff',
            border: '1px solid #e6e8eb',
            borderRadius: 8,
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            minWidth: 160,
            overflow: 'hidden',
            zIndex: 10
          }}
        >
          <button
            onClick={() => {
              onRename()
              setOpen(false)
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              color: '#111827',
              cursor: 'pointer'
            }}
          >
            Rename List
          </button>
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '8px 12px',
              background: 'transparent',
              border: 'none',
              color: '#b10000',
              cursor: 'pointer'
            }}
          >
            Delete List
          </button>
        </div>
      ) : null}
    </div>
  )
}
