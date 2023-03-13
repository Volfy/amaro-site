import { DndContext, closestCenter } from '@dnd-kit/core'
import { useSortable, arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, useContext } from 'react'
import { CSS } from '@dnd-kit/utilities'
import { PropTypes } from 'prop-types'
import TextInput from './TextInput'
import CreatableSelect from 'react-select/Creatable'
import BuilderContext from '../BuilderContext'
import { getIngredients, createIngredient } from '../requests'
import { useMutation, useQuery, useQueryClient } from 'react-query'

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

// helper functions 

const createOption = (option) => ({
  ...option,
  label: option.name,
  value: option.name.toLowerCase().replace(/\W/g, '')
    + option.description.toLowerCase().replace(/\W/g, ''),
})

// ROW 

const DraggableRow = (props) => {
  const {
    id, name, description, defaultAmount, isDry
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
          state={defaultAmount+''}
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

// AUTOCOMPLETE INPUT

const CreatableIngredient = ({handleIngredientSelection, addIngredient, options, selectedValue, setSelectedValue}) => {  

  return (
    <CreatableSelect
      isClearable
      onChange={newValue => setSelectedValue(newValue)}
      onCreateOption={addIngredient}
      onBlur={() => selectedValue
        ? handleIngredientSelection(selectedValue.id) 
        : handleIngredientSelection(null)
      }
      options={options}
      value={selectedValue}
    />
  )
}
CreatableIngredient.propTypes = {
  handleIngredientSelection: PropTypes.func.isRequired,
  addIngredient: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  selectedValue: PropTypes.object,
  setSelectedValue: PropTypes.func.isRequired,
}



// FINAL COMPONENT

const IngredientsTable = () => {
  const queryClient = useQueryClient()
  const [showIngredientForm, setShowIngredientForm] = useState(false)
  const [{ingredients}, dispatch] = useContext(BuilderContext)
  const [selectedValue, setSelectedValue] = useState({})

  const servedData = useQuery('ingredients', getIngredients, {
    refetchOnWindowFocus: false,
  })
  const newIngredientMutation = useMutation(createIngredient, {
    onSuccess: (newIng) => {
      const optioned = createOption(newIng)
      setSelectedValue(optioned)
      queryClient.setQueryData('ingredients', options.concat(optioned))
    }
  })
  
  if(servedData.isLoading) { 
    return <div>LOADING DATA</div>
  }
  if (servedData.isError) {
    return <div>ERROR IN DATA</div>
  }

  const options = servedData.data.map(i => (createOption(i)))

  const addIngredient = async (name) => {
    newIngredientMutation.mutate(
      {
        name,
        description: '',
        defaultAmount: 0,
        isDry: true,
      }
    )
  }
  
  const dispatchIngredients = (ingredientObject) => {
    dispatch({
      type: 'INGREDIENTS',
      payload: ingredientObject
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
    if(id === null){
      setShowIngredientForm(false)
      return
    }
    // ensure no duplicates
    ingredients.filter(i => i.id === id).length
      ? dispatchIngredients(ingredients)
      : dispatchIngredients(ingredients.concat(options.filter(i => i.id === id)))
    setShowIngredientForm(false)
    setSelectedValue({})
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
                ? <CreatableIngredient 
                  handleIngredientSelection={handleIngredientSelection} 
                  addIngredient={addIngredient} 
                  options={options}
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}/> 
                : <button onClick={() => setShowIngredientForm(true)}>Add an Ingredient</button> }
            </td>
          </tr>

        </tbody>
      </table>
    </DndContext>
  )
}

export default IngredientsTable