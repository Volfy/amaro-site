import axios from 'axios'
const baseUrl = 'http://localhost:3001/recipes'

export const createRecipe = newRecipe => 
  axios.post(baseUrl, newRecipe).then(res => res.data)