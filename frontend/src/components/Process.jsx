import { DndContext, closestCenter } from '@dnd-kit/core'
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useContext } from 'react'
import DraggableListItem from './DraggableListItem'
import TextInput from './TextInput'
import generateId from '../utils/generateId'
import BuilderContext from '../BuilderContext'

const Process = () => {
  const [{process}, dispatch] = useContext(BuilderContext)
  
  const dispatchProcess = (steps) => {
    dispatch({
      type: 'PROCESS',
      payload: steps
    })
  }
  
  const handleChangeStep = (id, newStepValue) => {
    dispatchProcess(process
      .map(step => step.id !== id 
        ? step 
        : {
          ...step,
          content: newStepValue
        }
      )
    )
  }

  const handleAddStep = () => {
    dispatchProcess(process.concat({
      content: '...',
      id: generateId()
    }))
  }

  const handleRemoveStep = (id) => {
    dispatchProcess(process.filter(step => step.id !== id))
  }

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(active.id !== over.id) {
      const ids = process.map(item => item.id)
      const activeIndex = ids.indexOf(active.id)
      const overIndex = ids.indexOf(over.id)
      dispatchProcess(arrayMove(process, activeIndex, overIndex))
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ol>
        <SortableContext
          items={process}
          strategy={verticalListSortingStrategy}
        >
          
          {process.map((step, index) => {
            return (
              <DraggableListItem key={step.id} id={step.id} dragHandle={`${index + 1}.`}>
                <TextInput state={step.content} setter={(newVal) => handleChangeStep(step.id, newVal)}
                  classes='w-3/4'/>
                <button onClick={() => handleRemoveStep(step.id)}>&#128465;</button>
              </DraggableListItem>  
            )
          })}
        </SortableContext>
        <li>
          <button onClick={handleAddStep}>
            Add a Step
          </button>
        </li>
      </ol>
      

    </DndContext>
  )
}

export default Process