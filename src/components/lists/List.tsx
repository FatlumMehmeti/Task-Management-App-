import './liststyles.css'
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
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (index: number) => void
}

export default function List({
  id, index, title, onRename, onDelete, onDragStart, onDragOver, onDragLeave, onDrop
}: Props) {
  const [editSignal, setEditSignal] = useState(0)

  return (
    <div
      className="list-card"
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={(e) => onDragOver(index, e)}
      onDragLeave={(e) => onDragLeave(e)}
      onDrop={() => onDrop(index)}
    >
      <div className="list-header-row">
        <ListHeader title={title} onRename={t => onRename(id, t)} activateEdit={editSignal} />
        <ListActions onRename={() => setEditSignal(v => v + 1)} onDelete={() => onDelete(id)} />
      </div>

      <div className="list-inset">No tasks yet</div>

      <button className="list-add-task" type="button">+ Add a task</button>
    </div>
  )
}