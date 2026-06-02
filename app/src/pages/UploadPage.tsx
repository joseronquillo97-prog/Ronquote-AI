import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  UploadCloud,
  FileText,
  FileSpreadsheet,
  FileBox,
  CheckCircle2,
  X,
  ArrowRight,
} from 'lucide-react'
import { SUPPORTED_TYPES, SAMPLE_FILES, type UploadFile } from '../data/mock'

function iconForType(type: string) {
  if (type === 'XLSX') return FileSpreadsheet
  if (type === 'DWG' || type === 'ZIP') return FileBox
  return FileText
}

function extToType(name: string): string {
  const ext = name.split('.').pop()?.toUpperCase() ?? ''
  return SUPPORTED_TYPES.includes(ext) ? ext : 'PDF'
}

function formatSize(bytes: number): string {
  if (bytes > 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes > 1000) return `${Math.round(bytes / 1000)} KB`
  return `${bytes} B`
}

function FileRow({ file, onRemove }: { file: UploadFile; onRemove: () => void }) {
  const Icon = iconForType(file.type)
  const done = file.progress >= 100
  return (
    <div className="bg-[#1F2937] border border-white/8 rounded-xl p-4 flex items-center gap-4">
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-2.5 shrink-0">
        <Icon size={18} className="text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="text-sm text-white truncate font-medium">{file.name}</span>
          <span className="text-xs text-white/40 font-mono shrink-0">{file.size}</span>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${done ? 'bg-green-500' : 'bg-blue-500'}`}
              style={{ width: `${file.progress}%` }}
            />
          </div>
          {done ? (
            <span className="flex items-center gap-1 text-xs text-green-400 shrink-0">
              <CheckCircle2 size={12} /> Done
            </span>
          ) : (
            <span className="text-xs text-blue-400 font-mono shrink-0">{file.progress}%</span>
          )}
        </div>
      </div>
      <button onClick={onRemove} className="text-white/30 hover:text-white/70 transition-colors shrink-0">
        <X size={16} />
      </button>
    </div>
  )
}

export default function UploadPage() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<UploadFile[]>(SAMPLE_FILES)
  const [dragActive, setDragActive] = useState(false)

  // Animate any in-progress files up to 100%
  useEffect(() => {
    const hasPending = files.some((f) => f.progress < 100)
    if (!hasPending) return
    const t = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => (f.progress < 100 ? { ...f, progress: Math.min(100, f.progress + 9) } : f)),
      )
    }, 400)
    return () => clearInterval(t)
  }, [files])

  function addFiles(list: FileList | null) {
    if (!list) return
    const next: UploadFile[] = Array.from(list).map((f) => ({
      name: f.name,
      type: extToType(f.name),
      size: formatSize(f.size),
      progress: 0,
    }))
    setFiles((prev) => [...prev, ...next])
  }

  const allDone = files.length > 0 && files.every((f) => f.progress >= 100)

  return (
    <div className="px-8 py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="text-xs text-white/35 font-mono mb-1">New RFQ · Step 1 of 4</div>
        <h1 className="text-2xl font-bold text-white">Upload your documents</h1>
        <p className="text-white/45 text-sm mt-1">
          Add the RFQ, drawings, datasheets, and specs. We'll extract the scope automatically.
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragActive(true)
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragActive(false)
          addFiles(e.dataTransfer.files)
        }}
        onClick={() => inputRef.current?.click()}
        className={`rounded-2xl border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
          dragActive
            ? 'border-blue-500 bg-blue-500/10'
            : 'border-white/15 bg-[#1F2937]/40 hover:border-blue-500/50 hover:bg-[#1F2937]/70'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        <div className="inline-flex bg-blue-500/15 border border-blue-500/25 rounded-2xl p-4 mb-4">
          <UploadCloud size={28} className="text-blue-400" />
        </div>
        <div className="text-white font-medium">Drag &amp; drop files here</div>
        <div className="text-white/40 text-sm mt-1">
          or <span className="text-blue-400">browse</span> to choose files
        </div>
        <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
          {SUPPORTED_TYPES.map((t) => (
            <span key={t} className="text-[11px] font-mono text-white/40 bg-white/5 border border-white/8 px-2 py-1 rounded">
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/55">
              {files.length} file{files.length !== 1 ? 's' : ''}
            </span>
            <button onClick={() => setFiles([])} className="text-xs text-white/40 hover:text-white/70">
              Clear all
            </button>
          </div>
          {files.map((f, i) => (
            <FileRow key={`${f.name}-${i}`} file={f} onRemove={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 flex items-center justify-end gap-3">
        <button
          onClick={() => navigate('/app')}
          className="text-white/55 hover:text-white text-sm px-4 py-2.5 transition-colors"
        >
          Cancel
        </button>
        <button
          disabled={!allDone}
          onClick={() => navigate('/app/rfq/4829/processing')}
          className="bg-blue-500 enabled:hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2"
        >
          Build Scope <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
