import { getRecipes } from '../requests'
import { useQuery } from 'react-query'

const Recipes = () => {
  const recipesList = useQuery('recipes', getRecipes)
  console.log(recipesList)

  return (
    <div>
      <h2>Recipes List</h2>
      <ul>
        {recipesList.isSuccess && recipesList.data.map(r => 
          <li key={r.id}>{r.title}</li>
        )}
      </ul>
    </div>
  )
}

export default Recipes