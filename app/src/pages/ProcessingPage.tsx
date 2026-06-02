import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle2, Loader2, Circle } from 'lucide-react'
import { PROCESSING_STEPS } from '../data/mock'

function Engine() {
  // 6 nodes evenly placed around the ring
  const nodes = Array.from({ length: 6 }, (_, i) => i * 60)
  return (
    <div className="relative w-56 h-56 mx-auto">
      {/* Outer ring */}
      <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-spin-slow" />
      {/* Middle dashed ring (reverse) */}
      <div
        className="absolute inset-6 rounded-full border-2 border-dashed border-blue-500/30 animate-spin-reverse"
      />
      {/* Inner ring */}
      <div className="absolute inset-12 rounded-full border border-blue-400/40 animate-spin-slow" />

      {/* Pulsing nodes around the outer ring */}
      {nodes.map((deg, i) => (
        <div
          key={deg}
          className="absolute top-1/2 left-1/2 w-2.5 h-2.5"
          style={{ transform: `rotate(${deg}deg) translateY(-112px)` }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-node"
            style={{ animationDelay: `${i * 0.25}s` }}
          />
        </div>
      ))}

      {/* Core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-blue-500/15 border border-blue-500/40 flex items-center justify-center">
          <span className="text-blue-400 font-mono font-bold text-lg tracking-wider">AI</span>
        </div>
      </div>
    </div>
  )
}

export default function ProcessingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeStep, setActiveStep] = useState(0)

  // Advance through the feed, then route to review
  useEffect(() => {
    if (activeStep >= PROCESSING_STEPS.length) {
      const done = setTimeout(() => navigate(`/app/rfq/${id}/review`), 900)
      return () => clearTimeout(done)
    }
    const t = setTimeout(() => setActiveStep((s) => s + 1), 1400)
    return () => clearTimeout(t)
  }, [activeStep, id, navigate])

  const totalSteps = PROCESSING_STEPS.length
  const pct = Math.min(100, Math.round((activeStep / totalSteps) * 100))
  const secondsLeft = Math.max(0, (totalSteps - activeStep) * 17)

  return (
    <div className="px-8 py-16 max-w-2xl mx-auto flex flex-col items-center">
      <Engine />

      <h1 className="text-2xl font-bold text-white mt-10">Building your scope…</h1>
      <p className="text-white/45 text-sm mt-2">Analyzing 4 documents · 38 pages</p>
      <p className="text-blue-400 font-mono text-sm mt-1">
        {secondsLeft > 0 ? `Estimated time remaining: ~${secondsLeft}s` : 'Finishing up…'}
      </p>

      {/* Overall progress */}
      <div className="w-full max-w-md mt-6">
        <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Activity feed */}
      <div className="w-full max-w-md mt-8 bg-[#1F2937] border border-white/8 rounded-2xl p-5 space-y-1">
        {PROCESSING_STEPS.map((step, i) => {
          const isDone = i < activeStep
          const isCurrent = i === activeStep
          return (
            <div
              key={step}
              className={`flex items-center gap-3 py-2 px-2 rounded-lg transition-colors ${
                isCurrent ? 'bg-blue-500/10' : ''
              }`}
            >
              {isDone ? (
                <CheckCircle2 size={16} className="text-green-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 size={16} className="text-blue-400 animate-spin shrink-0" />
              ) : (
                <Circle size={16} className="text-white/15 shrink-0" />
              )}
              <span
                className={`text-sm ${
                  isDone ? 'text-white/45' : isCurrent ? 'text-white font-medium' : 'text-white/25'
                }`}
              >
                {step}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
