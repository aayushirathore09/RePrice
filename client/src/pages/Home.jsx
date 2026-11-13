import { useState } from 'react'
import { API_URL } from '../config'
import ProductCard from '../components/ProductCard'

const CATEGORIES = [
  { label: 'Cameras', icon: '📷', query: 'camera' },
  { label: 'Phones', icon: '📱', query: 'phone' },
  { label: 'Laptops', icon: '💻', query: 'laptop' },
]

const TRENDING = ['Canon', 'iPhone 13', 'MacBook Air', 'OnePlus']

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const runSearch = async (term) => {
    if (!term.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(term)}`)
      if (!res.ok) throw new Error('Request failed')
      setResults(await res.json())
    } catch (err) {
      console.error(err)
      setResults([])
      setError('Something went wrong. Please check your connection and try again.')
    }
    setSearched(true)
    setLoading(false)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    runSearch(query)
  }

  const handleQuickSearch = (term) => {
    setQuery(term)
    runSearch(term)
  }

  return (
    <>
      {/* Hero */}
      <section className="mb-6 rounded-2xl bg-gradient-to-br from-primary to-indigo-800 p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-200">
          Smart shopping starts here
        </p>
        <h2 className="mt-1 text-2xl font-bold leading-snug">
          Don't pay full price.<br />Find it second-hand first.
        </h2>
        <p className="mt-2 text-sm text-indigo-100">
          RePrice checks resale listings so you know the real savings before you buy new.
        </p>

        <div className="mt-4 flex gap-4 text-center">
          <div className="flex-1 rounded-xl bg-white/10 p-3">
            <p className="text-lg font-bold">30%</p>
            <p className="text-xs text-indigo-100">Avg. savings</p>
          </div>
          <div className="flex-1 rounded-xl bg-white/10 p-3">
            <p className="text-lg font-bold">3</p>
            <p className="text-xs text-indigo-100">Categories</p>
          </div>
          <div className="flex-1 rounded-xl bg-white/10 p-3">
            <p className="text-lg font-bold">10+</p>
            <p className="text-xs text-indigo-100">Listings</p>
          </div>
        </div>
      </section>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-3 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a product, e.g. Canon, iPhone, HP"
          className="flex-1 rounded-xl border border-border bg-white px-4 py-2 outline-none focus:border-primary"
        />
        <button className="rounded-xl bg-primary px-5 font-semibold text-white hover:opacity-90">
          Search
        </button>
      </form>

      {/* Trending chips */}
      <div className="mb-6 flex flex-wrap gap-2">
        {TRENDING.map((term) => (
          <button
            key={term}
            onClick={() => handleQuickSearch(term)}
            className="rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted hover:border-primary hover:text-primary"
          >
            {term}
          </button>
        ))}
      </div>

      {/* Categories */}
      {!searched && (
        <section className="mb-6">
          <h3 className="mb-2 text-sm font-semibold text-muted">Browse by category</h3>
          <div className="grid grid-cols-3 gap-3">
            {CATEGORIES.map((c) => (
              <button
                key={c.query}
                onClick={() => handleQuickSearch(c.query)}
                className="flex flex-col items-center gap-1 rounded-2xl border border-border bg-white py-4 text-sm font-medium text-ink hover:border-primary"
              >
                <span className="text-2xl">{c.icon}</span>
                {c.label}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!searched && !loading && (
        <div className="rounded-2xl bg-info-soft p-6 text-center">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 text-sm font-medium text-primary">
            Search for a product to see how much you can save by buying second-hand.
          </p>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {[0, 1].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-2xl bg-white border border-border" />
          ))}
        </div>
      )}

      {/* Error */}
      {error && <p className="rounded-xl bg-danger-soft p-4 text-sm text-rose-600">{error}</p>}

      {/* No results */}
      {searched && !loading && !error && results.length === 0 && (
        <div className="rounded-2xl bg-warn-soft p-6 text-center">
          <p className="text-3xl">😕</p>
          <p className="mt-2 text-sm font-medium text-amber-700">
            No results found. Try a different product name.
          </p>
        </div>
      )}

      {/* Results */}
      <div className="space-y-3">
        {results.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  )
}