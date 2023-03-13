import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'

export const createRecipe = newRecipe => 
  axios.post(`${baseUrl}/recipes`, newRecipe).then(res => res.data)

export const getIngredients = () => 
  axios.get(`${baseUrl}/ingredients`).then(res => res.data)  
 
export const createIngredient = newIngredient => 
  axios.post(`${baseUrl}/ingredients`, newIngredient).then(res => res.data)