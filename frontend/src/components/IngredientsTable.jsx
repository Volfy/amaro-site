import { DndContext, closestCenter } from '@dnd-kit/core'
import { useSortable, arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { CSS } from '@dnd-kit/utilities'

import { PropTypes } from 'prop-types'


{/* data structure
th>
<th >Name</th>
<th>Alt.</th>
<th>Latin</th>
<th >Description</th>
<th>Tags</th>
<th>Warnings</th>
<th >Amount (g)</th>
<th /> 
*/}

const DraggableRow = (props) => {
  const {
    id, name, description, amount, isDry
  } = props.ingredient

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: id})

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <tr ref={setNodeRef} style={style}>
      <td {...attributes} {...listeners}><img src='drag.svg' className='h-4 inline'/></td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{amount}{isDry ? 'g' : 'ml'}</td>
      <td><button onClick={() => console.log('remove', id)}>&#128465;</button></td>
    </tr>
  )
}
DraggableRow.propTypes = {
  ingredient: PropTypes.object.isRequired
}

const IngredientsTable = () => {
  const [ingredients, setIngredients] = useState([
    {
      name: 'Wormwood',
      description: 'Bittering agent',
      amount: '1',
      isDry: true,
      id: '1',
    },
    {
      name: 'Vodka',
      description: 'solvent',
      amount: '300',
      isDry: false,
      id: '2',
    },
    {
      name: 'Orange peel',
      description: 'citrus fruit',
      amount: '6',
      isDry: true,
      id: '3',
    },
  ])

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(active.id !== over.id) {
      setIngredients((items) => {
        const ids = items.map(item => item.id)
        const activeIndex = ids.indexOf(active.id)
        const overIndex = ids.indexOf(over.id)
        return arrayMove(ingredients, activeIndex, overIndex)
      })
    }
  }
  
  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table className='w-full'>
        <thead>
          <tr>
            <th />
            <th>Name</th>
            <th>Description</th>
            <th>Amount</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <SortableContext
            items={ingredients}
            strategy={verticalListSortingStrategy}
          >
            {ingredients.map(ingredient => (
              <DraggableRow key={ingredient.id} ingredient={ingredient}/>
            ))}

          </SortableContext>

       

          <tr>
            <td className='text-center' colSpan='100%'>
            ADD NEW
            </td>
          </tr>

        </tbody>
      </table>
    </DndContext>
  )
}

IngredientsTable.propTypes = {
  data: PropTypes.array.isRequired,
}

export default IngredientsTable