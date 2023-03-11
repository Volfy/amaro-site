import { DndContext, closestCenter } from '@dnd-kit/core'
import { useSortable, arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useRef, useState } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { PropTypes } from 'prop-types'
import TextInput from './TextInput'
import CreatableSelect from 'react-select/Creatable'

const generateId = () => `${Math.floor((Math.random()*1000))}`


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

const fakeIng = [
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
]

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
      <td>
        <TextInput
          state={amount}
          setter={(newAmt) => props.changeAmount(id, newAmt)}
          classes='w-12'
        />
        {isDry ? 'g' : 'ml'}
      </td>
      <td><button onClick={() => props.handleRemoveIngredient(id)}>&#128465;</button></td>
    </tr>
  )
}
DraggableRow.propTypes = {
  ingredient: PropTypes.object.isRequired,
  handleRemoveIngredient: PropTypes.func.isRequired,
  changeAmount: PropTypes.func.isRequired,
}

const createOption = (label, id) => ({
  label,
  id,
  value: label.toLowerCase().replace(/\W/g, ''),
})

let defaultOptions = []
fakeIng.forEach(i => {
  const opt = createOption(i.name, i.id)
  defaultOptions.push(opt)
})

const CreatableIngredient = () => {  
  const [options, setOptions] = useState(defaultOptions)
  const [value, setValue] = useState({})

  const handleCreate = (inputValue) => {
    setTimeout(() => {
      const newOption = createOption(inputValue, generateId())
      setOptions(options.concat(newOption))
      setValue(newOption)
    }, 1000)

  }

  return (
    <CreatableSelect
      isClearable
      onChange={newValue => setValue(newValue)}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  )
}

 

const IngredientsTable = () => {
  const [ingredients, setIngredients] = useState([])
  const [showIngredientForm, setShowIngredientForm] = useState(false)

  const changeAmount = (id, amount) => {
    setIngredients(ingredients
      .map(ingredient=>
        id === ingredient.id
          ? {...ingredient, amount: amount}
          : ingredient
      ))
  }

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

  const handleRemoveIngredient = (id) => {
    setIngredients(ingredients.filter(ingredient => ingredient.id !== id))
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
              <DraggableRow 
                key={ingredient.id} 
                ingredient={ingredient}
                handleRemoveIngredient={handleRemoveIngredient}
                changeAmount={changeAmount}
              />
            ))}

          </SortableContext>

       
          <tr>
            <td colSpan='100%' className='text-center'>
              {showIngredientForm 
                ? <CreatableIngredient /> 
                : <button onClick={() => setShowIngredientForm(true)}>Add an Ingredient</button> }
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