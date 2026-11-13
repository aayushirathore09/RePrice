import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Share from './pages/Share'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-ink py-6">
        <div className="mx-auto max-w-xl px-4">
          <Link to="/"><h1 className="text-3xl font-bold text-white">RePrice</h1></Link>
          <p className="text-sm text-slate-300">Check the second-hand price before you buy new.</p>
        </div>
      </header>
      <main className="mx-auto max-w-xl p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/share" element={<Share />} />
        </Routes>
      </main>
    </div>
  )
}