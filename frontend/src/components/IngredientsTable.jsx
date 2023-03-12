import { DndContext, closestCenter } from '@dnd-kit/core'
import { useSortable, arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, useContext } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { PropTypes } from 'prop-types'
import TextInput from './TextInput'
import CreatableSelect from 'react-select/Creatable'
import generateId from '../utils/generateId'
import BuilderContext from '../BuilderContext'

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

let fakeIng = [
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

// ROW 

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
          classes='w-12 text-right'
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

// PREPARE OPTIONS

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

// AUTOCOMPLETE INPUT

const CreatableIngredient = ({handleBlur, options, setOptions}) => {  
  const [value, setValue] = useState({})

  const handleCreate = (inputValue) => {
    const newOption = createOption(inputValue, generateId())
    setOptions(options.concat(newOption))
    fakeIng.push({
      id: newOption.id,
      name: newOption.label,
      isDry: true,
      amount: '0',
      description: '',
    })
    setValue(newOption)
  }

  return (
    <CreatableSelect
      isClearable
      onChange={newValue => setValue(newValue)}
      onCreateOption={handleCreate}
      onBlur={() => handleBlur(value.id)}
      options={options}
      value={value}
    />
  )
}
CreatableIngredient.propTypes = {
  handleBlur: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  setOptions: PropTypes.func.isRequired,
}

// FINAL COMPONENT

const IngredientsTable = () => {
  const [options, setOptions] = useState(defaultOptions)
  const [showIngredientForm, setShowIngredientForm] = useState(false)
  const [{ingredients}, dispatch] = useContext(BuilderContext)

  const dispatchIngredients = (ingr) => {
    dispatch({
      type: 'INGREDIENTS',
      payload: ingr
    })
  }


  const changeAmount = (id, amount) => {
    dispatchIngredients(ingredients
      .map(ingredient=>
        id === ingredient.id
          ? {...ingredient, amount: amount}
          : ingredient
      ))
  }

  const handleDragEnd = (event) => {
    const {active, over} = event
    if(active.id !== over.id) {
      const ids = ingredients.map(item => item.id)
      const activeIndex = ids.indexOf(active.id)
      const overIndex = ids.indexOf(over.id)
      dispatchIngredients(arrayMove(ingredients, activeIndex, overIndex))
    }
  }

  const handleRemoveIngredient = (id) => {
    dispatchIngredients(ingredients.filter(ingredient => ingredient.id !== id))
  }

  const handleIngredientSelection = (id) => {
    // ensure no duplicates
    ingredients.filter(i => i.id === id).length
      ? dispatchIngredients(ingredients)
      : dispatchIngredients(ingredients.concat(fakeIng.filter(i => i.id === id)))
    setShowIngredientForm(false)
  }


  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <table className='w-full'>
        <thead>
          <tr className='text-left'>
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
                ? <CreatableIngredient handleBlur={handleIngredientSelection} options={options} setOptions={setOptions}/> 
                : <button onClick={() => setShowIngredientForm(true)}>Add an Ingredient</button> }
            </td>
          </tr>

        </tbody>
      </table>
    </DndContext>
  )
}

export default IngredientsTable