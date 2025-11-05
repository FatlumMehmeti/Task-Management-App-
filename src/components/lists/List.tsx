import ListHeader from './ListHeader'
import ListActions from './ListActions'
import { useState } from 'react'

const ui = {
  boardBg:  '#0b0d11',   // darker board
  cardBg:   '#1e1e1e',   // darker blue-gray list
  cardBr:   '#818da3',
  cardShadow: '0 1px 0 rgba(0,0,0,0.25)',
  insetBg:  '#6e6e6e',   // inner panel darker
  insetBr:  '#1e1e1e',
  insetText:'#fff',   // stronger contrast
  link:     '#fff',   // darker link
}

type Props = {
  id: string
  index: number
  title: string
  onRename: (id: string, next: string) => void
  onDelete: (id: string) => void
  onDragStart: (index: number) => void
  onDragOver: (index: number, e: React.DragEvent) => void
  onDrop: (index: number) => void
}

export default function List({
  id, index, title, onRename, onDelete, onDragStart, onDragOver, onDrop
}: Props) {
  const [editSignal, setEditSignal] = useState(0)

  return (
    <div
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={e => onDragOver(index, e)}
      onDrop={() => onDrop(index)}
      style={{
        width: 300,
        flex: '0 0 300px',
        background: ui.cardBg,
        border: `1px solid ${ui.cardBr}`,
        borderRadius: 12,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        boxShadow: ui.cardShadow
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ListHeader title={title} onRename={t => onRename(id, t)} activateEdit={editSignal} />
        <ListActions onRename={() => setEditSignal(v => v + 1)} onDelete={() => onDelete(id)} />
      </div>

      <div
        style={{
          padding: 14,
          background: ui.insetBg,
          border: `1px dashed ${ui.insetBr}`,
          borderRadius: 10,
          color: ui.insetText,
          fontSize: 14,
          textAlign: 'center'
        }}
      >
        No tasks yet
      </div>

      <button
        style={{
          marginTop: 8,
          background: 'transparent',
          border: 'none',
          color: ui.link,
          cursor: 'pointer',
          textAlign: 'left',
          fontWeight: 500
        }}
      >
        + Add a task
      </button>
    </div>
  )
}
