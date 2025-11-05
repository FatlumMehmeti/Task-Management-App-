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
    <div style={{
      height: 'calc(100vh - 90px)',
      background: '#1e1e1e',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Board Header - Dark Style */}
  

      {/* Lists Container - Horizontal Scroll */}
      <div style={{
        flex: 1,
        display: 'flex',
        gap: '10px',
        padding: '10px',
        overflowX: 'auto',
        overflowY: 'hidden',
        alignItems: 'flex-start',
        scrollbarWidth: 'thin',
        scrollbarColor: '#4d4d4d #1e1e1e'
      }}>
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

        {/* Add List Button - Dark Style */}
        {!isAddingList ? (
          <div
            onClick={handleAddListClick}
            style={{
              minWidth: '272px',
              width: '272px',
              flex: '0 0 272px',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '3px',
              padding: '10px 8px',
              cursor: 'pointer',
              color: '#ffffff',
              fontWeight: 400,
              fontSize: '14px',
              transition: 'background-color 0.2s ease',
              height: 'fit-content',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              border: '1px dashed rgba(255,255,255,0.2)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
            }}
          >
            <span style={{ fontSize: '20px', lineHeight: 1, fontWeight: 300 }}>+</span>
            <span>Add another list</span>
          </div>
        ) : (
          <div
            style={{
              minWidth: '272px',
              width: '272px',
              flex: '0 0 272px',
              background: '#2d2d2d',
              borderRadius: '3px',
              padding: '4px',
              height: 'fit-content',
              border: '1px solid #3d3d3d'
            }}
          >
            <input
              ref={addListInputRef}
              value={newListTitle}
              onChange={(e) => setNewListTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddListSubmit()
                if (e.key === 'Escape') handleAddListCancel()
              }}
              placeholder="Enter list title..."
              style={{
                width: '100%',
                padding: '8px 12px',
                border: 'none',
                borderRadius: '3px',
                fontSize: '14px',
                fontWeight: 600,
                outline: 'none',
                boxSizing: 'border-box',
                boxShadow: 'inset 0 0 0 2px #4a9eff',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                background: '#1e1e1e',
                color: '#ffffff'
              }}
              autoFocus
            />
            <div style={{ 
              display: 'flex', 
              gap: '8px', 
              marginTop: '8px',
              alignItems: 'center'
            }}>
              <button
                onClick={handleAddListSubmit}
                style={{
                  padding: '6px 12px',
                  background: '#4a9eff',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '3px',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#3a8eef'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#4a9eff'
                }}
              >
                Add list
              </button>
              <button
                onClick={handleAddListCancel}
                style={{
                  padding: '6px 8px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: '#999999',
                  lineHeight: 1,
                  transition: 'color 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#999999'
                }}
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
