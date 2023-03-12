import TextInput from './TextInput'
import { useContext } from 'react'
import BuilderContext from '../BuilderContext'

const Title = () => {
  const [{title}, dispatch] = useContext(BuilderContext)
  
  return <TextInput 
    state={title} 
    setter={(returnedTitle) => dispatch({type: 'TITLE', payload: returnedTitle})} 
    classes='text-4xl h-16' 
  />
}

export default Title