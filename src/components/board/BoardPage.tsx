import { useRef } from 'react'
import { useLists } from '../lists/useLists'
import List from '../lists/List'

export default function BoardPage() {
  const { lists, addList, renameList, deleteList, reorderLists } = useLists()
  const dragFromIndex = useRef<number | null>(null)

  function handleDragStart(index: number) {
    dragFromIndex.current = index
  }

  function handleDragOver(_index: number, e: React.DragEvent) {
    e.preventDefault()
  }

  function handleDrop(toIndex: number) {
    const from = dragFromIndex.current
    if (from === null || from === toIndex) return
    reorderLists(from, toIndex)
    dragFromIndex.current = null
  }

  return (
    <div style={{ padding: 16, minHeight: '100vh', background: 'linear-gradient(135deg,#6e78f7,#7d53c3)' }}>
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto' }}>
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
            onDrop={handleDrop}
          />
        ))}
        <button
          onClick={() => addList('New List')}
          style={{
            width: 300,
            flex: '0 0 300px',
            border: 'none',
            background: 'rgba(255,255,255,0.35)',
            borderRadius: 10,
            padding: 16,
            cursor: 'pointer',
            color: '#ffffff',
            fontWeight: 600
          }}
        >
          + Add another list
        </button>
      </div>
    </div>
  )
}
