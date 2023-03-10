import { PropTypes } from 'prop-types'

const TextInput = ({state, setter, classes, form}) => <input type="text" 
  value={state}
  onInput={event => {
    setter(event.target.value)
  }}
  onKeyDown={event => {
    if(event.key === 'Enter') {
      event.target.blur()
    }
  }}
  className={classes}
  form={form ? form : null}
/>

TextInput.propTypes = {
  state: PropTypes.string.isRequired,
  setter: PropTypes.func.isRequired,
  form: PropTypes.string,
  classes: PropTypes.string,
}

export default TextInput