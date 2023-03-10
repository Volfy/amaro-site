import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import DraggableListItem from './DraggableListItem'

const generateId = () => `${(Math.random()*1000)}`

const fakeSteps = [
  {
    content: 'Do first',
    id: generateId()
  }, 
  {
    content: 'Do second',
    id: generateId()
  }, 
  {
    content: 'do third',
    id: generateId(),
  }
]



const Process = () => {
  const [steps, setSteps] = useState(fakeSteps)
  

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(active.id !== over.id) {
      setSteps((items) => {
        const ids = items.map(item => item.id)
        const activeIndex = ids.indexOf(active.id)
        const overIndex = ids.indexOf(over.id)
        return arrayMove(steps, activeIndex, overIndex)
      })
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ol className='list-decimal'>
        <SortableContext
          items={steps}
          strategy={verticalListSortingStrategy}
        >
          
          {steps.map(step => {
            return <DraggableListItem key={step.id} id={step.id} content={step.content}/>
          })}
        </SortableContext>
      </ol>
      

    </DndContext>
  )
}

export default Process