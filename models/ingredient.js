const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const ingredientSchema = new mongoose.Schema({
  name: String,
  description: String,
  isDry: Boolean,
  defaultAmount: Number,
})

ingredientSchema.set('toJSON', {
  transform: (document, returned) => {
    returned.id = returned._id.toString()
    delete returned._id
    delete returned.__v
  }
})

module.exports = mongoose.model('Ingredient', ingredientSchema)