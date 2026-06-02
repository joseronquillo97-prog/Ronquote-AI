import { useNavigate } from 'react-router-dom'
import { Search, Bell, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'
import { METRICS, RECENT_RFQS, type RfqRow } from '../data/mock'

const STATUS_STYLES: Record<RfqRow['status'], string> = {
  Draft: 'bg-white/10 text-white/60',
  Processing: 'bg-blue-500/15 text-blue-400',
  'In Review': 'bg-amber-500/15 text-amber-400',
  Priced: 'bg-green-500/15 text-green-400',
  Sent: 'bg-purple-500/15 text-purple-400',
}

function TopBar() {
  return (
    <div className="flex items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Good morning, Jose</h1>
        <p className="text-white/45 text-sm mt-1">
          You have <span className="text-amber-400 font-medium">3 RFQs</span> awaiting review.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search RFQs, projects…"
            className="bg-[#1F2937] border border-white/8 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 w-64 focus:outline-none focus:border-blue-500/50"
          />
        </div>
        <button className="relative bg-[#1F2937] border border-white/8 rounded-lg p-2.5 text-white/55 hover:text-white transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-400" />
        </button>
      </div>
    </div>
  )
}

function MetricCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {METRICS.map((m) => (
        <div
          key={m.label}
          className="bg-[#1F2937] border border-white/8 rounded-2xl p-5 hover:border-blue-500/30 transition-colors"
        >
          <div className="text-sm text-white/45">{m.label}</div>
          <div className="text-3xl font-bold text-white font-mono mt-2">{m.value}</div>
          <div
            className={`flex items-center gap-1 text-xs mt-2 ${
              m.trendUp ? 'text-green-400' : 'text-amber-400'
            }`}
          >
            {m.trendUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {m.trend}
          </div>
        </div>
      ))}
    </div>
  )
}

function RecentRfqs() {
  const navigate = useNavigate()

  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <h2 className="font-semibold text-white">Recent RFQs</h2>
        <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
          View all <ArrowUpRight size={12} />
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-white/35 text-xs uppercase tracking-wider">
            <th className="font-medium px-6 py-3">RFQ #</th>
            <th className="font-medium px-6 py-3">Project</th>
            <th className="font-medium px-6 py-3">Customer</th>
            <th className="font-medium px-6 py-3 text-center">Items</th>
            <th className="font-medium px-6 py-3">Status</th>
            <th className="font-medium px-6 py-3 text-right">Updated</th>
          </tr>
        </thead>
        <tbody>
          {RECENT_RFQS.map((rfq) => (
            <tr
              key={rfq.id}
              onClick={() => navigate(`/app/rfq/${rfq.id}/review`)}
              className="border-t border-white/5 hover:bg-white/[0.03] cursor-pointer transition-colors"
            >
              <td className="px-6 py-4 font-mono text-blue-400">#{rfq.id}</td>
              <td className="px-6 py-4 text-white">{rfq.project}</td>
              <td className="px-6 py-4 text-white/55">{rfq.customer}</td>
              <td className="px-6 py-4 text-center text-white/55 font-mono">{rfq.items}</td>
              <td className="px-6 py-4">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[rfq.status]}`}>
                  {rfq.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-white/40 text-xs">{rfq.updated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="px-8 py-8 max-w-6xl">
      <TopBar />
      <MetricCards />
      <RecentRfqs />
    </div>
  )
}
