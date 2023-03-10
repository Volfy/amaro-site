import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import DraggableListItem from './DraggableListItem'
import TextInput from './TextInput'

const generateId = () => `${Math.floor((Math.random()*1000))}`

const Notes = () => {
  const [notes, setNotes] = useState([])
  
  const handleChangeNote = (id, newNoteValue) => {
    setNotes(notes
      .map(note => note.id !== id 
        ? note 
        : {
          ...note,
          content: newNoteValue
        }
      )
    )
  }

  const handleAddNote = (newNoteValue) => {
    setNotes(notes.concat({
      content: newNoteValue,
      id: generateId()
    }))
  }

  const handleRemoveNote = (id) => {
    setNotes(notes.filter(Note => Note.id !== id))
  }

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
      <ul>
        <SortableContext
          items={notes}
          strategy={verticalListSortingStrategy}
        >
          
          {notes.map(note => {
            return (
              <DraggableListItem key={note.id} id={note.id} dragHandle={<img src='drag.svg' className='h-4 inline'/>}>
                <TextInput state={note.content} setter={(newVal) => handleChangeNote(note.id, newVal)}
                  classes='w-3/4'/>
                <button onClick={() => handleRemoveNote(note.id)}>&#128465;</button>
              </DraggableListItem>  
            )
          })}
        </SortableContext>
        <li onClick={() => handleAddNote('...')}>Add a Note</li>
      </ul>
      

    </DndContext>
  )
}

export default Notes