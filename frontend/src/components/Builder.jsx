import Title from './Title'
import Process from './Process'
import Notes from './Notes'
import IngredientsTable from './IngredientsTable'
import BuilderContext from '../BuilderContext'
import { useMutation } from 'react-query'
import { createRecipe } from '../requests'
import { useContext } from 'react'

const Builder = () => {
  const [recipe, dispatch] = useContext(BuilderContext)
  const newRecipeMutation = useMutation(createRecipe)

  const addRecipe = async (event) => {
    event.preventDefault()
    
    newRecipeMutation.mutate({ 
      ...recipe,
      ingredients: recipe.ingredients.map(i => 
        ({ingredient: i.id, amount: i.amount || i.defaultAmount})),
      process: recipe.process.map(i => i.content),
      notes: recipe.notes.map(i => i.content)
    })
    dispatch({type: 'CLEAR'})
  }

  return (
    <>
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


      <button onClick={addRecipe}>
        Add Recipe
      </button>
    </>
 
  )
}

export default Builder