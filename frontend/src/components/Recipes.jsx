import { useQueryClient } from 'react-query'
import { 
  Link
} from 'react-router-dom'

const RecipeCard = (props) => {
  return (
    <li className='px-8 py-4 bg-slate-100 border-2 border-slate-300 w-72 h-96 rounded-2xl shadow-lg
    hover:border-slate-500 hover:scale-105 hover:shadow-slate-600'>
      {props.children}
    </li>
  )
}

const Recipes = () => {
  const queryClient = useQueryClient()
  const recipesList = queryClient.getQueryData('recipes')

  return (
    <div>
      <h2 className='text-4xl h-16 text-center'>Recipe List</h2>
        <ul className='flex gap-10 flex-wrap justify-center'>
            {recipesList.map(r => {
              let arrIng = [...r.ingredients.map(i => i.ingredient.name)]
              const length = arrIng.length
              arrIng = arrIng.slice(0, 7)
              return  (
                <Link to={`${r.id}`} key={r.id}>
                  <RecipeCard key={r.id}>
                    <h3 className='text-xl font-bold text-center'>{r.title}</h3>
                    <p className='italic text-sm py-4'>{r.notes[0]}</p>
                    <ul>
                      {arrIng.map((i, idx) => <li className='text-xl' key={idx}>- {i}</li>)}
                      {length > 7 ? <li className='text-xl'>...</li> : null}
                    </ul>
                  </RecipeCard>
                </Link>
            )})}
        </ul>
    </div>
  )
}

export default Recipes