import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  FileText,
  FolderKanban,
  TrendingUp,
  Archive,
  BarChart3,
  Shield,
  Settings,
  HelpCircle,
  Plus,
  ChevronRight,
} from 'lucide-react'
import Logo from './Logo'

const NAV_ITEMS = [
  { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/rfq/new', label: 'My RFQs', icon: FileText, end: false },
  { to: '/app/projects', label: 'Projects', icon: FolderKanban, end: false },
  { to: '/app/pricing', label: 'Pricing Analysis', icon: TrendingUp, end: false },
  { to: '/app/historical', label: 'Historical Projects', icon: Archive, end: false },
  { to: '/app/reports', label: 'Reports', icon: BarChart3, end: false },
  { to: '/app/admin', label: 'Admin', icon: Shield, end: false },
  { to: '/app/settings', label: 'Settings', icon: Settings, end: false },
]

function ProfileCard() {
  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-xl p-3 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-semibold shrink-0">
        JM
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-white truncate">Jose Martinez</div>
        <div className="text-[11px] text-white/40 truncate">Sr. Estimator</div>
      </div>
      <ChevronRight size={14} className="text-white/30 shrink-0" />
    </div>
  )
}

export default function AppShell() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0B1220] flex">
      {/* ─── Sidebar ─────────────────────────────────────────────── */}
      <aside className="w-[232px] shrink-0 bg-[#111827] border-r border-white/5 flex flex-col h-screen sticky top-0">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/5">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        {/* New RFQ button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => navigate('/app/rfq/new')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} /> New RFQ
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="text-[10px] uppercase tracking-widest text-white/25 font-semibold px-2 mb-2">
            Menu
          </div>
          <ul className="space-y-0.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive
                          ? 'bg-blue-500/15 text-blue-400 font-medium'
                          : 'text-white/55 hover:text-white hover:bg-white/5'
                      }`
                    }
                  >
                    <Icon size={16} />
                    {item.label}
                  </NavLink>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Help + profile */}
        <div className="px-3 pb-4 space-y-3">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/5 transition-colors"
          >
            <HelpCircle size={16} /> Help &amp; Support
          </a>
          <div className="px-1">
            <ProfileCard />
          </div>
        </div>
      </aside>

      {/* ─── Main content ────────────────────────────────────────── */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  )
}
