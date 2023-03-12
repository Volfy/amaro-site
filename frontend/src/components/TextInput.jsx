import { PropTypes } from 'prop-types'
import { useState, useEffect } from 'react'

const TextInput = ({state, setter, classes, form}) => {
  const [val, setVal] = useState('')
  
  useEffect(() => {
    setVal(state)
  }, [state])

  return <input type="text" 
    value={val}
    onInput={event => {
      setVal(event.target.value)
    }}
    onKeyDown={event => {
      if(event.key === 'Enter') {
        event.target.blur()
      }
    }}
    onBlur={() => {
      setter(val)
    }}
    className={classes}
    form={form ? form : null}
  />
}
TextInput.propTypes = {
  state: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
  form: PropTypes.string,
  classes: PropTypes.string,
}


export default TextInput