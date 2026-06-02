import { Diamond } from 'lucide-react'

interface LogoProps {
  /** smaller variant for tight spaces like the sidebar */
  size?: 'sm' | 'md'
}

export default function Logo({ size = 'md' }: LogoProps) {
  const box = size === 'sm' ? 'w-6 h-6' : 'w-7 h-7'
  const text = size === 'sm' ? 'text-xs' : 'text-sm'
  return (
    <div className="flex items-center gap-2">
      <div className={`${box} rotate-45 bg-blue-500 rounded-sm flex items-center justify-center shrink-0`}>
        <Diamond size={size === 'sm' ? 10 : 12} className="text-white -rotate-45" fill="white" />
      </div>
      <span className={`font-semibold text-white tracking-wide ${text}`}>
        RONQUOTE <span className="text-blue-400">AI</span>
      </span>
    </div>
  )
}
