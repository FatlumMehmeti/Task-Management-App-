import './liststyles.css'
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
    <div className="list-header">
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
          className="list-rename-input"
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="list-title-btn"
          title="Rename list"
        >
          {title}
        </button>
      )}
    </div>
  )
}