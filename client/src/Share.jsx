import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { API_URL } from '../config'

export default function Share() {
  const [params] = useSearchParams()
  const sharedText = [params.get('title'), params.get('text'), params.get('url')]
    .filter(Boolean)
    .join(' ')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!sharedText) return
    fetch(`${API_URL}/api/match?text=${encodeURIComponent(sharedText)}`)
      .then((r) => {
        if (!r.ok) throw new Error('Request failed')
        return r.json()
      })
      .then((data) => {
        setResults(data)
        setStatus('done')
      })
      .catch(() => setStatus('error'))
  }, [sharedText])

  if (!sharedText) {
    return (
      <p className="rounded-xl bg-info-soft p-4 text-sm text-primary">
        Share a product from Amazon or Flipkart to see its second-hand price here.
      </p>
    )
  }

  return (
    <>
      <p className="mb-3 text-sm text-muted">
        Shared product: <span className="text-ink">{sharedText.replace(/https?:\/\/\S+/g, '').trim()}</span>
      </p>

      {status === 'loading' && <p className="text-muted">Finding second-hand options...</p>}
      {status === 'error' && (
        <p className="rounded-xl bg-danger-soft p-4 text-sm text-rose-600">
          Something went wrong. Please try again.
        </p>
      )}
      {status === 'done' && results.length === 0 && (
        <div className="rounded-xl bg-warn-soft p-4 text-sm text-amber-700">
          We couldn't find second-hand listings for this product yet.{' '}
          <Link to="/" className="font-semibold underline">Search manually</Link>
        </div>
      )}
      <div className="space-y-3">
        {results.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </>
  )
}