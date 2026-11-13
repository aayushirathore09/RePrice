import { useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`)
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

  return (
    <>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a product, e.g. Canon, iPhone, HP"
          className="flex-1 rounded-xl border border-border bg-white px-4 py-2 outline-none focus:border-primary"
        />
        <button className="rounded-xl bg-primary px-5 font-semibold text-white hover:opacity-90">Search</button>
      </form>

      {!searched && !loading && (
        <p className="rounded-xl bg-info-soft p-4 text-sm text-primary">
          Search for a product to see how much you can save by buying second-hand.
        </p>
      )}
      {loading && <p className="text-muted">Searching...</p>}
      {error && <p className="rounded-xl bg-danger-soft p-4 text-sm text-rose-600">{error}</p>}
      {searched && !loading && !error && results.length === 0 && (
        <p className="rounded-xl bg-warn-soft p-4 text-sm text-amber-700">
          No results found. Try a different product name.
        </p>
      )}
      <div className="space-y-3">
        {results.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  )
}