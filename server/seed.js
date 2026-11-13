import 'dotenv/config'
import mongoose from 'mongoose'
import Product from './models/Product.js'

const products = [
  { name: 'Canon EOS 200D', category: 'camera', newPrice: 45000, usedPrice: 32000, condition: 'Good', usage: '1.5 years', warranty: '4 months left', sellerRating: 4.5 },
  { name: 'Nikon D3500', category: 'camera', newPrice: 38000, usedPrice: 26000, condition: 'Like new', usage: '8 months', warranty: '6 months left', sellerRating: 4.6 },
  { name: 'Sony ZV-E10', category: 'camera', newPrice: 62000, usedPrice: 47000, condition: 'Good', usage: '1 year', warranty: 'None', sellerRating: 4.3 },
  { name: 'iPhone 13 128GB', category: 'phone', newPrice: 52000, usedPrice: 38000, condition: 'Like new', usage: '8 months', warranty: 'None', sellerRating: 4.2 },
  { name: 'Samsung Galaxy S21', category: 'phone', newPrice: 40000, usedPrice: 24000, condition: 'Good', usage: '2 years', warranty: 'None', sellerRating: 4.0 },
  { name: 'OnePlus 11 5G', category: 'phone', newPrice: 55000, usedPrice: 39000, condition: 'Good', usage: '1 year', warranty: '3 months left', sellerRating: 4.4 },
  { name: 'HP Pavilion 15', category: 'laptop', newPrice: 55000, usedPrice: 34000, condition: 'Fair', usage: '2 years', warranty: 'None', sellerRating: 3.9 },
  { name: 'Dell Inspiron 15', category: 'laptop', newPrice: 50000, usedPrice: 31000, condition: 'Good', usage: '1.5 years', warranty: 'None', sellerRating: 4.1 },
  { name: 'MacBook Air M1', category: 'laptop', newPrice: 92000, usedPrice: 62000, condition: 'Like new', usage: '1 year', warranty: '5 months left', sellerRating: 4.7 },
  { name: 'Lenovo IdeaPad Slim 3', category: 'laptop', newPrice: 45000, usedPrice: 28000, condition: 'Fair', usage: '2 years', warranty: 'None', sellerRating: 3.8 },
]

await mongoose.connect(process.env.MONGO_URI)
await Product.deleteMany({})
await Product.insertMany(products)
console.log(`Seeded ${products.length} products`)
await mongoose.disconnect()