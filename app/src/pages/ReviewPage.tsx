import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Sparkles,
  Link2,
  ArrowRight,
  Pencil,
} from 'lucide-react'
import {
  EQUIPMENT,
  SOURCE_ZONES,
  INFORMATION_NEEDED,
  confidenceColor,
  confidenceLabel,
  type EquipmentItem,
  type EquipmentField,
} from '../data/mock'

// ─── Left: document viewer with highlight zones ──────────────────────────────

function DocViewer({
  activeZone,
  onZoneClick,
}: {
  activeZone: string | null
  onZoneClick: (zoneId: string) => void
}) {
  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-2xl overflow-hidden flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <FileText size={15} className="text-blue-400" />
        <span className="text-sm text-white font-medium">Chevron_RFQ_2026.pdf</span>
        <span className="text-xs text-white/35 font-mono ml-auto">p. 3 / 38</span>
      </div>

      {/* Mock document page */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="relative bg-[#0B1220] rounded-lg border border-white/5 aspect-[8.5/11] p-6">
          {/* Fake document text lines */}
          <div className="space-y-2.5">
            <div className="h-3 w-2/3 bg-white/8 rounded" />
            <div className="h-2 w-1/3 bg-white/5 rounded" />
            <div className="h-2 w-full bg-white/5 rounded mt-4" />
            <div className="h-2 w-full bg-white/5 rounded" />
            <div className="h-2 w-4/5 bg-white/5 rounded" />
            <div className="h-2 w-full bg-white/5 rounded mt-4" />
            <div className="h-2 w-3/4 bg-white/5 rounded" />
            <div className="h-2 w-full bg-white/5 rounded" />
            <div className="h-2 w-2/3 bg-white/5 rounded" />
            <div className="h-2 w-full bg-white/5 rounded mt-4" />
            <div className="h-2 w-1/2 bg-white/5 rounded" />
          </div>

          {/* Clickable highlight zones */}
          {SOURCE_ZONES.map((z) => {
            const active = activeZone === z.id
            return (
              <button
                key={z.id}
                onClick={() => onZoneClick(z.id)}
                title={z.label}
                className={`absolute rounded transition-all ${
                  active
                    ? 'bg-blue-500/30 border-2 border-blue-400 ring-2 ring-blue-400/30'
                    : 'bg-blue-500/5 border border-blue-500/20 hover:bg-blue-500/15'
                }`}
                style={{
                  top: `${z.top}%`,
                  left: `${z.left}%`,
                  width: `${z.width}%`,
                  height: `${z.height}%`,
                }}
              >
                {active && (
                  <span className="absolute -top-5 left-0 text-[10px] font-mono text-blue-400 whitespace-nowrap">
                    ↪ {z.label}
                  </span>
                )}
              </button>
            )
          })}
        </div>
        <p className="text-center text-[11px] text-white/25 font-mono mt-3">
          Click a highlighted region to jump to its field
        </p>
      </div>
    </div>
  )
}

// ─── Center: equipment cards ─────────────────────────────────────────────────

function Field({
  field,
  isActive,
  onSelect,
}: {
  field: EquipmentField
  isActive: boolean
  onSelect: () => void
}) {
  const lowConf = field.confidence === 'low'
  const linkable = !!field.sourceZone
  return (
    <button
      onClick={onSelect}
      disabled={!linkable}
      className={`text-left rounded-lg p-2 transition-all w-full ${
        isActive
          ? 'bg-blue-500/15 ring-1 ring-blue-400/50'
          : lowConf
            ? 'bg-amber-500/5'
            : linkable
              ? 'hover:bg-white/5 cursor-pointer'
              : 'cursor-default'
      }`}
    >
      <div className="flex items-center gap-1">
        <span className="text-[10px] text-white/35 font-mono uppercase tracking-wider">{field.label}</span>
        {linkable && <Link2 size={9} className="text-blue-400/60" />}
      </div>
      <div
        className={`text-sm font-mono font-medium mt-0.5 ${
          lowConf ? 'text-amber-400' : 'text-white'
        }`}
      >
        {field.value}
      </div>
    </button>
  )
}

function EquipCard({
  item,
  expanded,
  onToggle,
  selectedField,
  activeZone,
  onFieldSelect,
}: {
  item: EquipmentItem
  expanded: boolean
  onToggle: () => void
  selectedField: string | null
  activeZone: string | null
  onFieldSelect: (fieldLabel: string, zone?: string) => void
}) {
  const needsReview = item.confidence === 'low'
  return (
    <div
      className={`bg-[#1F2937] border rounded-2xl overflow-hidden transition-colors ${
        needsReview ? 'border-amber-500/40' : 'border-white/8'
      }`}
    >
      {/* Header */}
      <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 font-mono">Equipment #{item.index}</span>
          <span className="text-sm font-semibold text-white">{item.type}</span>
          <span className="text-xs text-white/35">· {item.spec}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-mono ${confidenceColor[item.confidence]}`}>
            {item.confidence === 'low' ? <AlertTriangle size={11} /> : <CheckCircle2 size={11} />}
            {confidenceLabel[item.confidence]}
          </span>
          <ChevronDown
            size={16}
            className={`text-white/40 transition-transform ${expanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Body */}
      {expanded && (
        <div className="px-5 pb-5">
          <div className="grid grid-cols-3 gap-1">
            {item.fields.map((f) => {
              const key = `${item.id}-${f.label}`
              const isActive =
                selectedField === key || (!!f.sourceZone && f.sourceZone === activeZone)
              return (
                <Field
                  key={f.label}
                  field={f}
                  isActive={isActive}
                  onSelect={() => onFieldSelect(key, f.sourceZone)}
                />
              )
            })}
          </div>

          {needsReview && (
            <button className="mt-4 flex items-center gap-2 text-xs text-amber-400 bg-amber-500/10 border border-amber-500/25 rounded-lg px-3 py-2 hover:bg-amber-500/15 transition-colors">
              <Sparkles size={13} /> Ask AI to clarify missing fields
            </button>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Right: information needed panel ─────────────────────────────────────────

function MissingPanel() {
  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-2xl overflow-hidden h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
        <AlertTriangle size={15} className="text-amber-400" />
        <span className="text-sm font-medium text-white">Information Needed</span>
        <span className="ml-auto text-xs bg-amber-500/15 text-amber-400 px-2 py-0.5 rounded-full font-mono">
          {INFORMATION_NEEDED.length}
        </span>
      </div>
      <div className="flex-1 overflow-auto p-3 space-y-2">
        {INFORMATION_NEEDED.map((info) => (
          <div
            key={info.item}
            className="bg-[#0B1220] border border-white/5 rounded-xl p-3 hover:border-amber-500/30 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-white font-medium">{info.item}</span>
              <button className="text-[11px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                request <ArrowRight size={10} />
              </button>
            </div>
            <p className="text-xs text-white/40 mt-1">{info.detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ReviewPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [expanded, setExpanded] = useState<Set<string>>(new Set(['eq-1', 'eq-2']))
  const [selectedField, setSelectedField] = useState<string | null>(null)
  const [activeZone, setActiveZone] = useState<string | null>(null)

  function toggleCard(cardId: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      next.has(cardId) ? next.delete(cardId) : next.add(cardId)
      return next
    })
  }

  // Field clicked → highlight its source zone in the doc
  function handleFieldSelect(fieldKey: string, zone?: string) {
    setSelectedField(fieldKey)
    setActiveZone(zone ?? null)
  }

  // Source zone clicked → select the field that maps to it + ensure its card open
  function handleZoneClick(zoneId: string) {
    setActiveZone(zoneId)
    for (const item of EQUIPMENT) {
      const match = item.fields.find((f) => f.sourceZone === zoneId)
      if (match) {
        setSelectedField(`${item.id}-${match.label}`)
        setExpanded((prev) => new Set(prev).add(item.id))
        break
      }
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-white/5 shrink-0">
        <div>
          <div className="text-xs text-white/35 font-mono mb-1">
            RFQ #{id} · Step 3 of 4 · West Texas Tank Farm
          </div>
          <h1 className="text-xl font-bold text-white">
            Equipment Review
            <span className="text-white/35 text-sm font-normal ml-2">{EQUIPMENT.length} items extracted</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm text-white/55 hover:text-white border border-white/10 rounded-lg px-4 py-2 transition-colors">
            <Pencil size={14} /> Edit
          </button>
          <button
            onClick={() => navigate(`/app/rfq/${id}/pricing`)}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg px-5 py-2 transition-colors"
          >
            Accept &amp; Price <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* 3-column body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 overflow-hidden">
        {/* Left — document */}
        <div className="overflow-hidden hidden lg:block">
          <DocViewer activeZone={activeZone} onZoneClick={handleZoneClick} />
        </div>

        {/* Center — equipment cards */}
        <div className="overflow-auto space-y-3 pr-1">
          {EQUIPMENT.map((item) => (
            <EquipCard
              key={item.id}
              item={item}
              expanded={expanded.has(item.id)}
              onToggle={() => toggleCard(item.id)}
              selectedField={selectedField}
              activeZone={activeZone}
              onFieldSelect={handleFieldSelect}
            />
          ))}
        </div>

        {/* Right — information needed */}
        <div className="overflow-hidden hidden lg:block">
          <MissingPanel />
        </div>
      </div>
    </div>
  )
}
