import { useQueryClient } from "react-query"
import { useParams, Navigate, Link } from "react-router-dom"

const Recipe = () => {
  const params = useParams()
  const queryClient = useQueryClient()
  const recipe = queryClient.getQueryData('recipes').filter(r => r.id === params.id)[0]

  // if id is fake
  if(!recipe) {
    return <Navigate to='/recipes' replace={true} />
  }

  return (
    <div>
      <h2 className='text-4xl h-16 text-center'>{recipe.title}</h2>

      {/* Ingredients table filled in without editing */}
      {/* Process notes */}
      {/* Tasting Notes */}
      {/* Edit button, return */}
      <Link to='/recipes'>Return to Recipe List</Link>
    </div>
  )
}

export default Recipe