import { createContext, useReducer } from 'react'
import { PropTypes } from 'prop-types'

const recipeReducer = (state, action) => {
  switch (action.type) {
  case 'TITLE':
    return {
      ...state,
      title: action.payload
    }
  case 'INGREDIENTS':
    return {
      ...state,
      ingredients: action.payload
    }
  case 'PROCESS':
    return {
      ...state,
      process: action.payload
    }
  case 'NOTES':
    return {
      ...state,
      notes: action.payload
    }
  case 'CLEAR':
    return {
      title: 'Recipe Title',
      ingredients: [],
      process: [],
      notes: [],
    }
  default:
    return state
  }
}

const BuilderContext = createContext()

export const BuilderContextProvider = (props) => {
  const [recipe, recipeDispatch] = useReducer(recipeReducer, {
    title: 'Recipe Title',
    ingredients: [],
    process: [],
    notes: [],
  })

  return (
    <BuilderContext.Provider value={[recipe, recipeDispatch]}>
      {props.children}
    </BuilderContext.Provider>
  )
}
BuilderContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default BuilderContext