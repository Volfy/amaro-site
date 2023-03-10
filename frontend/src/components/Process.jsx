import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import DraggableListItem from './DraggableListItem'
import TextInput from './TextInput'

const generateId = () => `${Math.floor((Math.random()*1000))}`

const Process = () => {
  const [steps, setSteps] = useState([])
  
  const handleChangeStep = (id, newStepValue) => {
    setSteps(steps
      .map(step => step.id !== id 
        ? step 
        : {
          ...step,
          content: newStepValue
        }
      )
    )
  }

  const handleAddStep = (newStepValue) => {
    setSteps(steps.concat({
      content: newStepValue,
      id: generateId()
    }))
  }

  const handleRemoveStep = (id) => {
    setSteps(steps.filter(step => step.id !== id))
  }

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
      <ol>
        <SortableContext
          items={steps}
          strategy={verticalListSortingStrategy}
        >
          
          {steps.map((step, index) => {
            return (
              <DraggableListItem key={step.id} id={step.id} dragHandle={`${index + 1}.`}>
                <TextInput state={step.content} setter={(newVal) => handleChangeStep(step.id, newVal)}
                  classes='w-3/4'/>
                <button onClick={() => handleRemoveStep(step.id)}>&#128465;</button>
              </DraggableListItem>  
            )
          })}
        </SortableContext>
        <li onClick={() => handleAddStep('...')}>Add a Step</li>
      </ol>
      

    </DndContext>
  )
}

export default Process