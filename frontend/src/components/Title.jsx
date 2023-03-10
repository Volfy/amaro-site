import { PropTypes } from 'prop-types'
import { useState } from 'react'

const Title = ({form}) => {

  const [title, setTitle] = useState('Recipe Title')

  return (
    <>
      <input type="text" 
        value={title}
        onInput={event => {
          setTitle(event.target.value)
        }}
        onKeyDown={event => {
          if(event.key === 'Enter') {
            event.target.blur()
          }
        }}
        className='text-4xl flex-shrink h-16'
        form={form || null}
      />
    </>
  )
}
Title.propTypes = {
  form: PropTypes.string,
}

export default Title