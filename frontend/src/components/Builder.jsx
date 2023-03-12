import { useReducer } from 'react'
import Title from './Title'
import Process from './Process'
import Notes from './Notes'
import IngredientsTable from './IngredientsTable'
import BuilderContext from '../BuilderContext'

const recipeReducer = (state, action) => {
  switch (action.type) {
  case 'TITLE':
    return {
      ...state,
      title: action.payload
    }
  case 'INGREDIENTS':
    return {
      ...state,
      ingredients: action.payload
    }
  case 'PROCESS':
    return {
      ...state,
      process: action.payload
    }
  case 'NOTES':
    return {
      ...state,
      notes: action.payload
    }
  default:
    return state
  }
}


const Builder = () => {
  const [recipe, recipeDispatch] = useReducer(recipeReducer, {
    title: 'Recipe Title',
    ingredients: [],
    process: [],
    notes: [],
  })

  return (
    <BuilderContext.Provider value={[recipe, recipeDispatch]}>
      <Title className='w-full basis-1/12'/>
      <div className='w-full basis-5/12 ml-1'>
        <h2 className='text-2xl'>Ingredients</h2>
        <IngredientsTable />

      </div>

      <div className='w-full basis-3/12 ml-1'>
        <h2 className='text-2xl'>Process</h2>
        <Process />
      </div>

      <div className='w-full basis-3/12 ml-1'>
        <h2 className='text-2xl'>Tasting Notes / Description</h2>
        <Notes />
      </div>


      {/*<button type="submit" onClick={event => event.preventDefault()}>Add Recipe</button>*/}
    </BuilderContext.Provider>
 
  )
}

export default Builder