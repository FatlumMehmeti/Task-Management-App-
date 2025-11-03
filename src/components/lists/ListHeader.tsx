import { useEffect, useRef, useState } from 'react'

type Props = {
  title: string
  onRename: (nextTitle: string) => void
  activateEdit?: number
}

export default function ListHeader({ title, onRename, activateEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(title)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isEditing) inputRef.current?.focus()
  }, [isEditing])

  useEffect(() => setValue(title), [title])
  useEffect(() => {
    if (activateEdit !== undefined) {
      setIsEditing(true)
      setValue(title)
    }
  }, [activateEdit, title])

  function commit() {
    setIsEditing(false)
    if (value.trim() !== title.trim()) onRename(value)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, minWidth: 0 }}>
      {isEditing ? (
        <input
          ref={inputRef}
          value={value}
          onChange={e => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit()
            if (e.key === 'Escape') {
              setIsEditing(false)
              setValue(title)
            }
          }}
          style={{
            fontWeight: 600,
            fontSize: 14,
            padding: '4px 6px',
            borderRadius: 6,
            border: '1px solid #cfd4dc',
            color: '#0f172a',
            background: '#ffffff',
            outline: 'none',
            width: '100%'
          }}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          style={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            cursor: 'text',
            fontWeight: 700,
            fontSize: 14,
            color: '#0f172a',
            width: '100%',
            textAlign: 'left',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          title="Rename list"
        >
          {title}
        </button>
      )}
    </div>
  )
}
