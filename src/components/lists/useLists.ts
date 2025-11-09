import './liststyles.css'
import { useCallback, useMemo, useState } from 'react'

export type BoardList = {
  id: string
  title: string
}

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

export function useLists(initial?: BoardList[]) {
  const [lists, setLists] = useState<BoardList[]>(
    initial?.length ? initial : [
      { id: generateId(), title: 'Backlog' },
      { id: generateId(), title: 'In Progress' },
      { id: generateId(), title: 'Done' }
    ]
  )

  const addList = useCallback((title: string) => {
    const newList: BoardList = { id: generateId(), title: title.trim() || 'Untitled' }
    setLists(prev => [...prev, newList])
  }, [])

  const renameList = useCallback((id: string, title: string) => {
    setLists(prev => prev.map(l => (l.id === id ? { ...l, title: title.trim() || 'Untitled' } : l)))
  }, [])

  const deleteList = useCallback((id: string) => {
    setLists(prev => prev.filter(l => l.id !== id))
  }, [])

  const reorderLists = useCallback((fromIndex: number, toIndex: number) => {
    setLists(prev => {
      const next = [...prev]
      const [moved] = next.splice(fromIndex, 1)
      next.splice(toIndex, 0, moved)
      return next
    })
  }, [])

  const idToIndex = useMemo(() => {
    const map = new Map<string, number>()
    lists.forEach((l, idx) => map.set(l.id, idx))
    return map
  }, [lists])

  return { lists, addList, renameList, deleteList, reorderLists, idToIndex }
}