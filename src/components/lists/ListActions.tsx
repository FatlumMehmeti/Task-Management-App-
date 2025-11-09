import './liststyles.css'
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
    <div ref={containerRef} className="list-actions">
      <button aria-label="List menu" onClick={() => setOpen(v => !v)} className="menu-btn">
        ⋯
      </button>

      {open ? (
        <div className="menu-dropdown" role="menu">
          <button
            onClick={() => {
              onRename()
              setOpen(false)
            }}
            className="menu-item"
            type="button"
            role="menuitem"
          >
            Rename List
          </button>

          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="menu-item menu-item--danger"
            type="button"
            role="menuitem"
          >
            Delete List
          </button>
        </div>
      ) : null}
    </div>
  )
}