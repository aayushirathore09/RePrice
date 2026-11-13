import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  newPrice: { type: Number, required: true },
  usedPrice: { type: Number, required: true },
  condition: { type: String, enum: ['Like new', 'Good', 'Fair'], required: true },
  usage: String,
  warranty: String,
  sellerRating: Number,
  sellerName: String,
  sellerContact: String,
})

export default mongoose.model('Product', productSchema)