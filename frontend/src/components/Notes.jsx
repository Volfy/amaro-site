import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import DraggableListItem from './DraggableListItem'

const generateId = () => `${(Math.random()*1000)}`

const fakeNotes = [
  {
    content: 'Light floral top notes',
    id: generateId()
  }, 
  {
    content: 'Bitter aftertaste',
    id: generateId()
  }, 
  {
    content: 'Caramel notes, suitable as an aperitif or digestif with pork',
    id: generateId(),
  }
]

const Notes = () => {
  const [notes, setNotes] = useState(fakeNotes)

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(active.id !== over.id) {
      setNotes((items) => {
        const ids = items.map(item => item.id)
        const activeIndex = ids.indexOf(active.id)
        const overIndex = ids.indexOf(over.id)
        return arrayMove(notes, activeIndex, overIndex)
      })
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ul className='list-disc'>
        <SortableContext
          items={notes}
          strategy={verticalListSortingStrategy}
        >
          
          {notes.map(step => {
            return <DraggableListItem key={step.id} id={step.id} content={step.content}/>
          })}
        </SortableContext>
      </ul>
      

    </DndContext>
  )
}

export default Notes