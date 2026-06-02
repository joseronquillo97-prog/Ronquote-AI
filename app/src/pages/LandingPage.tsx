import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Upload,
  Cpu,
  ScanSearch,
  BarChart3,
  Diamond,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react'

// ─── Data ────────────────────────────────────────────────────────────────────

const COMPANIES = [
  'Chevron',
  'ConocoPhillips',
  'ExxonMobil',
  'Occidental',
  'EOG Resources',
  'Diamondback Energy',
]

const STATS = [
  { value: '1,248', label: 'Projects Analyzed' },
  { value: '94.6%', label: 'Extraction Accuracy' },
  { value: '<5 min', label: 'Avg Processing Time' },
]

const STEPS = [
  {
    icon: Upload,
    number: '01',
    title: 'Upload Your RFQ',
    description:
      'Drop in PDFs, DWGs, datasheets, and spreadsheets. Any format your client sends — we handle it.',
  },
  {
    icon: Cpu,
    number: '02',
    title: 'AI Extraction',
    description:
      'Our AI reads every page and extracts equipment specs, dimensions, and requirements in minutes, not hours.',
  },
  {
    icon: ScanSearch,
    number: '03',
    title: 'Review & Verify',
    description:
      'See exactly where each data point came from. Click any field to highlight its source in the original document.',
  },
  {
    icon: BarChart3,
    number: '04',
    title: 'Get Budget Pricing',
    description:
      'Compare against 1,200+ historical projects and receive a confident price range with full cost breakdown.',
  },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 rotate-45 bg-blue-500 rounded-sm flex items-center justify-center">
        <Diamond size={12} className="text-white -rotate-45" fill="white" />
      </div>
      <span className="font-semibold text-white tracking-wide text-sm">
        RONQUOTE <span className="text-blue-400">AI</span>
      </span>
    </div>
  )
}

function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-[#0B1220]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-8 text-sm text-white/50">
          <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <Link to="/app" className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2">
          Launch App <ArrowRight size={14} />
        </Link>
      </div>
    </nav>
  )
}

function TrustStrip() {
  return (
    <div className="bg-[#111827] border-b border-white/5 py-3 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 flex-wrap">
        <span className="text-white/25 text-xs uppercase tracking-widest font-medium shrink-0">
          Trusted by
        </span>
        <div className="flex items-center gap-6 flex-wrap">
          {COMPANIES.map((c) => (
            <span key={c} className="text-white/35 text-xs font-semibold tracking-wide hover:text-white/55 transition-colors">
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProductPreview() {
  return (
    <div className="relative">
      {/* Glow behind the card */}
      <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-3xl" />

      <div className="relative bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {/* Mini app header */}
        <div className="bg-[#0B1220] border-b border-white/5 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-amber-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-white/40 font-mono">
            <span>RFQ #4829</span>
            <span>/</span>
            <span className="text-blue-400">Equipment Review</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-500/15 text-blue-400 px-2 py-0.5 rounded font-mono">
              4 items
            </span>
            <button className="text-xs bg-green-500 text-white px-3 py-1 rounded font-medium">
              Accept &amp; Price →
            </button>
          </div>
        </div>

        {/* Equipment cards area */}
        <div className="p-4 space-y-3">
          {/* Card 1 — high confidence */}
          <div className="bg-[#1F2937] border border-white/8 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40 font-mono">Equipment #1</span>
                <span className="text-sm font-semibold text-white">Storage Tank · API 650</span>
              </div>
              <div className="flex items-center gap-1.5 bg-green-500/15 text-green-400 text-xs px-2.5 py-1 rounded-full font-mono">
                <CheckCircle2 size={11} />
                94% confidence
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Diameter', "12'-0\""],
                ['Height', "20'-0\""],
                ['Capacity', '14,130 bbl'],
                ['Material', 'A36 Carbon'],
                ['Pressure', 'Atmospheric'],
                ['Coating', 'Int. Epoxy'],
              ].map(([label, value]) => (
                <div key={label} className="space-y-0.5">
                  <div className="text-[10px] text-white/35 font-mono uppercase tracking-wider">{label}</div>
                  <div className="text-xs text-white font-mono font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2 — needs review */}
          <div className="bg-[#1F2937] border border-amber-500/40 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/40 font-mono">Equipment #2</span>
                <span className="text-sm font-semibold text-white">Separator · Horizontal</span>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-500/15 text-amber-400 text-xs px-2.5 py-1 rounded-full font-mono">
                <AlertTriangle size={11} />
                Needs review
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ['Diameter', "48\""],
                ['Length', "10'-0\""],
                ['Pressure', <span key="p" className="text-amber-400">—</span>],
                ['Material', 'SS316L'],
                ['Code', 'ASME VIII'],
                ['Nozzles', <span key="n" className="text-amber-400">—</span>],
              ].map(([label, value]) => (
                <div key={String(label)} className="space-y-0.5">
                  <div className="text-[10px] text-white/35 font-mono uppercase tracking-wider">{label}</div>
                  <div className="text-xs text-white font-mono font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer hint */}
        <div className="px-4 pb-3 text-center text-[11px] text-white/20 font-mono">
          Click any field to highlight its source in the document
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center">
      {/* Left: copy */}
      <div className="space-y-8">
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          AI-Powered Estimating for Oil &amp; Gas
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
          From RFQ to Budget{' '}
          <span className="text-blue-400">Price</span> in Minutes
        </h1>

        <p className="text-white/55 text-lg leading-relaxed">
          Upload your RFQ documents. AI extracts every equipment spec,
          cross-references 1,200+ historical projects, and returns a confident
          budgetary price range — with full source traceability.
        </p>

        {/* Stats */}
        <div className="flex items-center gap-6 pt-2">
          {STATS.map((s, i) => (
            <div key={s.label} className="flex items-center gap-6">
              <div>
                <div className="text-2xl font-bold text-white font-mono">{s.value}</div>
                <div className="text-xs text-white/40 mt-0.5">{s.label}</div>
              </div>
              {i < STATS.length - 1 && (
                <div className="w-px h-8 bg-white/10" />
              )}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-4 pt-2">
          <Link to="/app" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2">
            Launch App <ArrowRight size={16} />
          </Link>
          <Link to="/app/rfq/new" className="text-white/60 hover:text-white text-sm font-medium flex items-center gap-2 transition-colors">
            Start a New RFQ <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Right: product preview */}
      <ProductPreview />
    </section>
  )
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#111827] border-t border-white/5 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="text-blue-400 text-sm font-medium tracking-widest uppercase">
            How it works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            Four steps from document to price
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">
            No manual re-keying. No spreadsheet archaeology. Just upload, review, and price.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group bg-[#1F2937] border border-white/8 rounded-2xl p-6 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-2.5">
                    <Icon size={18} className="text-blue-400" />
                  </div>
                  <span className="text-white/10 font-mono font-bold text-2xl">{step.number}</span>
                </div>
                <h3 className="font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Logo />
        <p className="text-white/25 text-xs">
          © 2026 Permian Tank · Ronquote AI · Internal Tool
        </p>
      </div>
    </footer>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0B1220]">
      <Nav />
      <TrustStrip />
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  )
}
