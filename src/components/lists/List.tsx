import ListHeader from './ListHeader'
import ListActions from './ListActions'
import { useState } from 'react'

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

export default function List({ id, index, title, onRename, onDelete, onDragStart, onDragOver, onDrop }: Props) {
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
        background: '#eef1f6',
        border: '1px solid #e6e8eb',
        borderRadius: 10,
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ListHeader title={title} onRename={t => onRename(id, t)} activateEdit={editSignal} />
        <ListActions onRename={() => setEditSignal(v => v + 1)} onDelete={() => onDelete(id)} />
      </div>

      <div style={{ padding: 16, background: '#f8fafc', border: '1px dashed #dcdfe4', borderRadius: 8, color: '#526074', fontSize: 14, textAlign: 'center' }}>No tasks yet</div>
      <button style={{
        marginTop: 8,
        background: 'transparent',
        border: 'none',
        color: '#3b82f6',
        cursor: 'pointer',
        textAlign: 'left'
      }}>+ Add a task</button>
    </div>
  )
}
