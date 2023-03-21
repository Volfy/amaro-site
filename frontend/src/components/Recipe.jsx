import { useParams } from "react-router-dom"

const Recipe = () => {
  const params = useParams()
  return (
    <div>
      <h2 className='text-4xl h-16 text-center'>{params.id}</h2>
    </div>
  )
}

export default Recipe