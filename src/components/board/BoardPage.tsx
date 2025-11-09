import './boardstyle.css'
import { useRef, useState } from 'react'
import { useLists } from '../lists/useLists'
import List from '../lists/List'

export default function BoardPage() {
  const { lists, addList, renameList, deleteList, reorderLists } = useLists()
  const dragFromIndex = useRef<number | null>(null)
  const [isAddingList, setIsAddingList] = useState(false)
  const [newListTitle, setNewListTitle] = useState('')
  const addListInputRef = useRef<HTMLInputElement | null>(null)

  function handleDragStart(index: number) {
    dragFromIndex.current = index
  }

  function handleDragOver(index: number, e: React.DragEvent) {
    e.preventDefault()
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
  }

  function handleDrop(toIndex: number) {
    const from = dragFromIndex.current
    if (from === null || from === toIndex) {
      dragFromIndex.current = null
      return
    }
    reorderLists(from, toIndex)
    dragFromIndex.current = null
  }

  function handleAddListClick() {
    setIsAddingList(true)
    setTimeout(() => addListInputRef.current?.focus(), 0)
  }

  function handleAddListSubmit() {
    if (newListTitle.trim()) {
      addList(newListTitle.trim())
      setNewListTitle('')
    }
    setIsAddingList(false)
  }

  function handleAddListCancel() {
    setNewListTitle('')
    setIsAddingList(false)
  }

  return (
    <div className="board-root">
      <div className="lists-container">
        {lists.map((l, idx) => (
          <List
            key={l.id}
            id={l.id}
            index={idx}
            title={l.title}
            onRename={renameList}
            onDelete={deleteList}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          />
        ))}

        {!isAddingList ? (
          <div
            className="add-list-card"
            onClick={handleAddListClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleAddListClick()
            }}
          >
            <span className="add-sign">+</span>
            <span>Add another list</span>
          </div>
        ) : (
          <div className="add-list-form">
            <input
              ref={addListInputRef}
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddListSubmit()
                if (e.key === 'Escape') handleAddListCancel()
              }}
              placeholder="Enter list title..."
              className="add-list-input"
              autoFocus
            />
            <div className="add-form-actions">
              <button onClick={handleAddListSubmit} className="add-btn" type="button">
                Add list
              </button>
              <button
                onClick={handleAddListCancel}
                className="cancel-btn"
                type="button"
                aria-label="Cancel add list"
              >
                ×
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}