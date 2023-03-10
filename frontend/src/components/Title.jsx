import TextInput from './TextInput'
import { useState } from 'react'

const Title = () => {

  const [title, setTitle] = useState('Recipe Title')

  return <TextInput 
    state={title} 
    setter={setTitle} 
    classes='text-4xl flex-shrink h-16' 
  />
}

export default Title