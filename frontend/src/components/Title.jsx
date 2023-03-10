import { PropTypes } from 'prop-types'
import { useState } from 'react'

const Title = ({form}) => {

  const [title, setTitle] = useState('Recipe Title')

  return (
    <>
      <input type="text" 
        value={title}
        onChange={event => setTitle(event.target.value)}
        className='text-4xl flex-shrink h-16'
        form={form}
      />
    </>
  )
}
Title.propTypes = {
  form: PropTypes.string.isRequired,
}

export default Title