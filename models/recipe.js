const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const ingredientItemSchema = new mongoose.Schema({
  ingredient: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient'
  },
  amount: Number
}, { _id: false })

const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [ingredientItemSchema],
  process: [String],
  notes: [String],
})

recipeSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)