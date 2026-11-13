const conditionStyles = {
  'Like new': 'bg-accent-soft text-accent',
  Good: 'bg-info-soft text-primary',
  Fair: 'bg-warn-soft text-amber-700',
}

export default function ProductCard({ p }) {
  const hasWarranty = !/^(none|no warranty)/i.test(p.warranty)

  return (
    <div className="rounded-2xl border border-border bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold text-ink">{p.name}</h3>
          <p className="text-xs capitalize text-muted">{p.category}</p>
        </div>
        <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
          Save {p.savingPercent}%
        </span>
      </div>

      <div className="mt-3 flex items-end gap-3">
        <span className="text-2xl font-bold text-primary">
          ₹{p.usedPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-sm text-muted line-through">
          ₹{p.newPrice.toLocaleString('en-IN')}
        </span>
        <span className="text-xs text-muted">used / new</span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2 text-xs">
        <span className={`rounded-full px-3 py-1 font-medium ${conditionStyles[p.condition] || 'bg-info-soft text-primary'}`}>
          {p.condition}
        </span>
        <span className={`rounded-full px-3 py-1 font-medium ${hasWarranty ? 'bg-accent-soft text-accent' : 'bg-danger-soft text-rose-600'}`}>
          {hasWarranty ? `Warranty: ${p.warranty}` : 'No warranty'}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3 text-sm text-muted">
        <p>Used for: <b className="text-ink">{p.usage}</b></p>
        <p>Seller rating: <b className="text-ink">⭐ {p.sellerRating}</b></p>
      </div>
    </div>
  )
}