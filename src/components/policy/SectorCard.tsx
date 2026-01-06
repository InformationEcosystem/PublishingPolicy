'use client'

import type { SectorTemplate } from '@/types/database'

const SECTOR_ICONS: Record<string, string> = {
  newspaper: '📰',
  'graduation-cap': '🎓',
  building: '🏢',
  shield: '🛡️',
}

interface SectorCardProps {
  template: SectorTemplate
  isSelected: boolean
  onSelect: (template: SectorTemplate) => void
}

export function SectorCard({ template, isSelected, onSelect }: SectorCardProps) {
  const icon = template.icon ? SECTOR_ICONS[template.icon] || '📋' : '📋'

  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      className={`
        w-full p-6 rounded-lg text-left transition-all
        ${isSelected
          ? 'bg-[#0074ff] text-white ring-2 ring-[#0074ff] ring-offset-2'
          : 'bg-white border border-gray-200 hover:border-[#0074ff] hover:shadow-md'
        }
      `}
    >
      <span className="text-3xl mb-3 block">{icon}</span>
      <h3 className={`font-semibold text-lg ${isSelected ? 'text-white' : 'text-gray-900'}`}>
        {template.name}
      </h3>
      <p className={`text-sm mt-1 ${isSelected ? 'text-white/80' : 'text-gray-600'}`}>
        {template.description}
      </p>
      <p className={`text-xs mt-3 ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
        {(template.default_items?.length ?? 0)} items · {(template.default_guidelines?.length ?? 0)} guidelines
      </p>
    </button>
  )
}
