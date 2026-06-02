// ─── Shared mock data for the v1 prototype ───────────────────────────────────
// No backend in v1 — every screen reads from here.

export type Confidence = 'high' | 'medium' | 'low'

export interface MetricCard {
  label: string
  value: string
  trend: string
  trendUp: boolean
}

export interface RfqRow {
  id: string
  project: string
  customer: string
  items: number
  status: 'Draft' | 'Processing' | 'In Review' | 'Priced' | 'Sent'
  updated: string
}

export interface EquipmentField {
  label: string
  value: string
  confidence: Confidence
  /** id of the source zone this field maps to (for bidirectional highlight) */
  sourceZone?: string
}

export interface EquipmentItem {
  id: string
  index: number
  type: string
  spec: string
  confidence: Confidence
  fields: EquipmentField[]
}

export interface SourceZone {
  id: string
  /** % position within the mock document page */
  top: number
  left: number
  width: number
  height: number
  label: string
}

export interface SimilarProject {
  id: string
  customer: string
  year: number
  equipment: string
  soldPrice: string
  match: number
}

export interface CostSlice {
  label: string
  amount: number // in $k
  color: string
}

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const METRICS: MetricCard[] = [
  { label: 'Active RFQs', value: '42', trend: '+6 this week', trendUp: true },
  { label: 'Pending Review', value: '8', trend: '3 urgent', trendUp: false },
  { label: 'Historical Projects', value: '1,248', trend: '+12 this month', trendUp: true },
  { label: 'Avg Accuracy', value: '94.6%', trend: '+1.2%', trendUp: true },
]

export const RECENT_RFQS: RfqRow[] = [
  { id: '4829', project: 'West Texas Tank Farm', customer: 'Chevron', items: 4, status: 'In Review', updated: '12 min ago' },
  { id: '4821', project: 'Permian Separator Pkg', customer: 'Occidental', items: 7, status: 'Processing', updated: '1 hr ago' },
  { id: '4814', project: 'Midland Storage Expansion', customer: 'ExxonMobil', items: 3, status: 'Priced', updated: '3 hrs ago' },
  { id: '4802', project: 'Delaware Basin Skid', customer: 'EOG Resources', items: 9, status: 'Sent', updated: 'Yesterday' },
  { id: '4795', project: 'Loving County Vessels', customer: 'Diamondback', items: 5, status: 'Draft', updated: '2 days ago' },
]

// ─── Upload ──────────────────────────────────────────────────────────────────

export interface UploadFile {
  name: string
  type: string
  size: string
  progress: number
}

export const SAMPLE_FILES: UploadFile[] = [
  { name: 'Chevron_RFQ_2026.pdf', type: 'PDF', size: '4.2 MB', progress: 100 },
  { name: 'Tank_Datasheet_API650.xlsx', type: 'XLSX', size: '880 KB', progress: 100 },
  { name: 'GA_Drawing_Rev_C.dwg', type: 'DWG', size: '12 MB', progress: 64 },
]

export const SUPPORTED_TYPES = ['PDF', 'DWG', 'XLSX', 'DOCX', 'ZIP']

// ─── AI Processing ───────────────────────────────────────────────────────────

export const PROCESSING_STEPS = [
  'Reading RFQ documents…',
  'Extracting equipment dimensions…',
  'Identifying pressure requirements…',
  'Analyzing material specifications…',
  'Comparing against historical projects…',
  'Determining confidence levels…',
]

// ─── Equipment Review ────────────────────────────────────────────────────────

export const SOURCE_ZONES: SourceZone[] = [
  { id: 'z-diameter', top: 22, left: 12, width: 40, height: 5, label: 'Diameter' },
  { id: 'z-height', top: 29, left: 12, width: 40, height: 5, label: 'Height' },
  { id: 'z-material', top: 44, left: 12, width: 55, height: 5, label: 'Material' },
  { id: 'z-pressure', top: 58, left: 12, width: 48, height: 5, label: 'Pressure' },
  { id: 'z-code', top: 65, left: 12, width: 35, height: 5, label: 'Code' },
]

export const EQUIPMENT: EquipmentItem[] = [
  {
    id: 'eq-1',
    index: 1,
    type: 'Storage Tank',
    spec: 'API 650 · Vertical',
    confidence: 'high',
    fields: [
      { label: 'Type', value: 'Storage Tank', confidence: 'high' },
      { label: 'Quantity', value: '2', confidence: 'high' },
      { label: 'Diameter', value: "12'-0\"", confidence: 'high', sourceZone: 'z-diameter' },
      { label: 'Height', value: "20'-0\"", confidence: 'high', sourceZone: 'z-height' },
      { label: 'Capacity', value: '14,130 bbl', confidence: 'high' },
      { label: 'Material', value: 'A36 Carbon Steel', confidence: 'high', sourceZone: 'z-material' },
      { label: 'Pressure', value: 'Atmospheric', confidence: 'high', sourceZone: 'z-pressure' },
      { label: 'Coating', value: 'Internal Epoxy', confidence: 'medium' },
      { label: 'Code', value: 'API 650', confidence: 'high', sourceZone: 'z-code' },
    ],
  },
  {
    id: 'eq-2',
    index: 2,
    type: 'Horizontal Separator',
    spec: 'ASME VIII · 2-Phase',
    confidence: 'low',
    fields: [
      { label: 'Type', value: 'Separator', confidence: 'high' },
      { label: 'Quantity', value: '1', confidence: 'high' },
      { label: 'Diameter', value: '48"', confidence: 'medium' },
      { label: 'Length', value: "10'-0\"", confidence: 'medium' },
      { label: 'Pressure', value: 'Not specified', confidence: 'low' },
      { label: 'Material', value: 'SS 316L', confidence: 'medium' },
      { label: 'Code', value: 'ASME VIII Div 1', confidence: 'high' },
      { label: 'Nozzle Sched.', value: 'Not specified', confidence: 'low' },
      { label: 'Design Temp', value: '150°F', confidence: 'medium' },
    ],
  },
  {
    id: 'eq-3',
    index: 3,
    type: 'Vertical Vessel',
    spec: 'ASME VIII · Surge',
    confidence: 'medium',
    fields: [
      { label: 'Type', value: 'Surge Vessel', confidence: 'high' },
      { label: 'Quantity', value: '1', confidence: 'high' },
      { label: 'Diameter', value: '36"', confidence: 'high' },
      { label: 'Height', value: "8'-0\"", confidence: 'medium' },
      { label: 'Pressure', value: '150 psig', confidence: 'high' },
      { label: 'Material', value: 'A516-70', confidence: 'high' },
      { label: 'Code', value: 'ASME VIII Div 1', confidence: 'high' },
      { label: 'Coating', value: 'Not specified', confidence: 'low' },
      { label: 'Design Temp', value: '200°F', confidence: 'medium' },
    ],
  },
]

export const INFORMATION_NEEDED = [
  { item: 'Roof Type', detail: 'Cone vs. dome not stated for Tank #1' },
  { item: 'Corrosion Allowance', detail: 'No CA value found in datasheet' },
  { item: 'Internal Coating', detail: 'Spec referenced but not attached' },
  { item: 'Nozzle Schedule', detail: 'Missing for Separator #2' },
  { item: 'Wind Design Criteria', detail: 'Site wind load not provided' },
  { item: 'Seismic Requirements', detail: 'Seismic zone unspecified' },
]

// ─── Historical Pricing ──────────────────────────────────────────────────────

export const PRICE_LOW = 890000
export const PRICE_HIGH = 1120000
export const PRICE_MID = 1010000
export const PRICE_CONFIDENCE = 87
export const SIMILAR_COUNT = 14

export const COST_BREAKDOWN: CostSlice[] = [
  { label: 'Material', amount: 360, color: '#3B82F6' },
  { label: 'Labor', amount: 240, color: '#60A5FA' },
  { label: 'Coating', amount: 95, color: '#10B981' },
  { label: 'Freight', amount: 60, color: '#F59E0B' },
  { label: 'Engineering', amount: 70, color: '#8B5CF6' },
  { label: 'Contingency', amount: 55, color: '#64748B' },
  { label: 'Margin', amount: 130, color: '#34D399' },
]

export const RANGE_DRIVERS = [
  { factor: 'Steel price volatility', effect: 'widens', note: 'Plate pricing up 8% QoQ' },
  { factor: 'Coating specification', effect: 'widens', note: 'Internal coating not finalized' },
  { factor: 'Freight distance', effect: 'tightens', note: 'Known delivery radius' },
  { factor: 'Historical match', effect: 'tightens', note: '14 close comparables' },
] as const

export const SIMILAR_PROJECTS: SimilarProject[] = [
  { id: '4582', customer: 'Chevron', year: 2024, equipment: "12'×20' API 650", soldPrice: '$302,000', match: 94 },
  { id: '4410', customer: 'Occidental', year: 2023, equipment: "12'×24' API 650", soldPrice: '$338,000', match: 89 },
  { id: '4298', customer: 'EOG Resources', year: 2023, equipment: "10'×20' API 650", soldPrice: '$271,000', match: 86 },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

export const confidenceColor: Record<Confidence, string> = {
  high: 'text-green-400 bg-green-500/15 border-green-500/30',
  medium: 'text-blue-400 bg-blue-500/15 border-blue-500/30',
  low: 'text-amber-400 bg-amber-500/15 border-amber-500/30',
}

export const confidenceLabel: Record<Confidence, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Needs review',
}
