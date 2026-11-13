import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import Product from './models/Product.js'

const app = express()
app.use(cors())
app.use(express.json())

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const withSaving = (p) => ({
  ...p,
  id: p._id,
  savingPercent: Math.round(((p.newPrice - p.usedPrice) / p.newPrice) * 100),
})

const STOP = new Set(['the', 'and', 'with', 'for', 'in', 'of', 'a', 'an', 'new', 'buy', 'check', 'out', 'this', 'on', 'at', 'from', 'https', 'http', 'www', 'com'])
const tokenize = (s) =>
  s.toLowerCase().replace(/https?:\/\/\S+/g, ' ').split(/[^a-z0-9]+/).filter((t) => t && !STOP.has(t))

app.get('/api/search', async (req, res) => {
  try {
    const q = (req.query.q || '').trim()
    if (!q) return res.json([])
    const rx = new RegExp(escapeRegex(q), 'i')
    const products = await Product.find({ $or: [{ name: rx }, { category: rx }] }).lean()
    res.json(
      products.map(withSaving)
    )
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

app.get('/api/match', async (req, res) => {
  try {
    const text = (req.query.text || '').trim()
    if (!text) return res.json([])
    const words = new Set(tokenize(text))
    const products = await Product.find().lean()
    const matches = products
      .map((p) => {
        const tokens = tokenize(p.name)
        const hits = tokens.filter((t) => words.has(t)).length
        return { p, score: tokens.length ? hits / tokens.length : 0 }
      })
      .filter((x) => x.score >= 0.6)
      .sort((a, b) => b.score - a.score)
    res.json(matches.map((x) => withSaving(x.p)))
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(process.env.PORT || 5000, () => console.log('Server running'))
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  })