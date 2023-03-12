import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useContext } from 'react'
import DraggableListItem from './DraggableListItem'
import TextInput from './TextInput'
import generateId from '../utils/generateId'
import BuilderContext from '../BuilderContext'

const Notes = () => {
  const [{notes}, dispatch] = useContext(BuilderContext)

  const dispatchNotes = (val) => {
    dispatch({
      type: 'NOTES',
      payload: val
    })
  }
  
  const handleChangeNote = (id, newNoteValue) => {
    dispatchNotes(notes
      .map(note => note.id !== id 
        ? note 
        : {
          ...note,
          content: newNoteValue
        }
      )
    )
  }

  const handleAddNote = () => {
    dispatchNotes(notes.concat({
      content: '...',
      id: generateId()
    }))
  }

  const handleRemoveNote = (id) => {
    dispatchNotes(notes.filter(Note => Note.id !== id))
  }

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(active.id !== over.id) {
      const ids = notes.map(item => item.id)
      const activeIndex = ids.indexOf(active.id)
      const overIndex = ids.indexOf(over.id)
      dispatchNotes(arrayMove(notes, activeIndex, overIndex))
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
        <li>
          <button onClick={handleAddNote}>
            Add a Note
          </button>
        </li>
      </ul>
      

    </DndContext>
  )
}

export default Notes