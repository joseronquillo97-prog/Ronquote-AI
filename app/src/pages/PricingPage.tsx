import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Download,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Minus,
  CheckCircle2,
} from 'lucide-react'
import {
  PRICE_LOW,
  PRICE_HIGH,
  PRICE_MID,
  PRICE_CONFIDENCE,
  SIMILAR_COUNT,
  COST_BREAKDOWN,
  RANGE_DRIVERS,
  SIMILAR_PROJECTS,
} from '../data/mock'

function fmt(n: number): string {
  return '$' + n.toLocaleString('en-US')
}

/** Count up to a target value once on mount, with a guaranteed final value. */
function useCountUp(target: number, durationMs = 1000) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(Math.round(target * eased))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    // Fallback: if rAF is throttled (background tab, reduced motion),
    // ensure the final value still lands.
    const settle = setTimeout(() => setValue(target), durationMs + 150)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(settle)
    }
  }, [target, durationMs])
  return value
}

function PriceHero() {
  const low = useCountUp(PRICE_LOW)
  const high = useCountUp(PRICE_HIGH)
  return (
    <div className="text-center py-10">
      <div className="text-sm text-white/45 uppercase tracking-widest mb-4">Budgetary Estimate</div>
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <span className="text-4xl md:text-5xl font-bold text-blue-400 font-mono">{fmt(low)}</span>
        <span className="text-white/30 text-3xl">–</span>
        <span className="text-4xl md:text-5xl font-bold text-blue-400 font-mono">{fmt(high)}</span>
      </div>
      <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
        <span className="flex items-center gap-1.5 bg-green-500/15 text-green-400 text-sm px-3 py-1.5 rounded-full font-medium">
          <CheckCircle2 size={14} /> {PRICE_CONFIDENCE}% confidence
        </span>
        <span className="bg-white/5 border border-white/10 text-white/60 text-sm px-3 py-1.5 rounded-full font-mono">
          Midpoint ~{fmt(PRICE_MID)}
        </span>
        <span className="bg-white/5 border border-white/10 text-white/60 text-sm px-3 py-1.5 rounded-full">
          Based on {SIMILAR_COUNT} similar projects
        </span>
      </div>
    </div>
  )
}

function CostBreakdown() {
  const total = COST_BREAKDOWN.reduce((sum, c) => sum + c.amount, 0)
  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-1">Cost Breakdown</h3>
      <p className="text-xs text-white/40 mb-5">Estimated at midpoint · {fmt(total * 1000)}</p>

      {/* Stacked bar */}
      <div className="flex h-4 rounded-full overflow-hidden mb-5">
        {COST_BREAKDOWN.map((c) => (
          <div
            key={c.label}
            style={{ width: `${(c.amount / total) * 100}%`, backgroundColor: c.color }}
            title={`${c.label}: ${fmt(c.amount * 1000)}`}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
        {COST_BREAKDOWN.map((c) => (
          <div key={c.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: c.color }} />
              <span className="text-white/60">{c.label}</span>
            </div>
            <span className="text-white font-mono text-xs">{fmt(c.amount * 1000)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function RangeDrivers() {
  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-2xl p-6">
      <h3 className="font-semibold text-white mb-1">What drives the range</h3>
      <p className="text-xs text-white/40 mb-5">Factors widening or tightening the estimate</p>
      <div className="space-y-3">
        {RANGE_DRIVERS.map((d) => {
          const widens = d.effect === 'widens'
          return (
            <div key={d.factor} className="flex items-start gap-3">
              <div
                className={`mt-0.5 rounded-md p-1.5 shrink-0 ${
                  widens ? 'bg-amber-500/15 text-amber-400' : 'bg-green-500/15 text-green-400'
                }`}
              >
                {widens ? <ArrowUp size={13} /> : <ArrowDown size={13} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-medium">{d.factor}</span>
                  <span className={`text-[11px] font-mono ${widens ? 'text-amber-400' : 'text-green-400'}`}>
                    {widens ? 'widens' : 'tightens'}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-0.5">{d.note}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SimilarProjects() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={16} className="text-blue-400" />
        <h3 className="font-semibold text-white">Similar historical projects</h3>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {SIMILAR_PROJECTS.map((p) => (
          <div
            key={p.id}
            className="bg-[#1F2937] border border-white/8 rounded-2xl p-5 hover:border-blue-500/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-blue-400 text-sm">#{p.id}</span>
              <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded-full font-mono">
                {p.match}% match
              </span>
            </div>
            <div className="text-white font-medium">{p.customer}</div>
            <div className="text-xs text-white/40 mt-0.5">{p.year} · {p.equipment}</div>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="text-[11px] text-white/35 uppercase tracking-wider">Sold price</div>
              <div className="text-lg font-bold text-white font-mono mt-0.5">{p.soldPrice}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PricingPage() {
  const navigate = useNavigate()
  const { id } = useParams()

  return (
    <div className="px-8 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(`/app/rfq/${id}/review`)}
          className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors"
        >
          <ArrowLeft size={15} /> Back to Review
        </button>
        <button className="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
          <Download size={15} /> Export Quote
        </button>
      </div>

      <div className="text-xs text-white/35 font-mono mb-1">
        RFQ #{id} · Step 4 of 4 · West Texas Tank Farm
      </div>
      <h1 className="text-2xl font-bold text-white">Historical Pricing Analysis</h1>

      {/* Hero */}
      <div className="bg-[#1F2937] border border-white/8 rounded-2xl mt-6">
        <PriceHero />
      </div>

      {/* Breakdown + drivers */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <CostBreakdown />
        <RangeDrivers />
      </div>

      {/* Similar projects */}
      <div className="mt-8">
        <SimilarProjects />
      </div>
    </div>
  )
}
