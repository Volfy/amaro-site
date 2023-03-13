require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const Recipe = require('./models/recipe')
const Ingredient = require('./models/ingredient')

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))


app.get('/api/ingredients', async (req, res) => {
  const ings = await Ingredient.find({})
  res.json(ings)
})

app.get('/api/recipes', async (req, res) => {
  const recipes = await Recipe.find({}).populate({
    path: 'ingredients',
    populate: {
      path: 'ingredient',
      model: 'Ingredient',
      select: ['name', 'description']
    }
  })
  res.json(recipes)
})

app.post('/api/ingredients', async (req, res) => {
  const ingredient = req.body

  const newEntry = new Ingredient(ingredient)
  const saved = await newEntry.save()
  res.json(saved)
})

app.post('/api/recipes', async (req, res) => {
  const recipe = req.body

  const newEntry = new Recipe(recipe)
  const saved = await newEntry.save()
  res.json(saved)
})

// 

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, _req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'cast error' })
  }
  if (error.name === 'ValidationError') {
    return res.status(400).json(error.message)
  }

  next(error)
}

app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})