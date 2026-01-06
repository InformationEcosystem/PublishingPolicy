'use client'

import type { PreventionGuideline } from '@/types/database'

interface GuidelineItemProps {
  guideline: PreventionGuideline
  isSelected: boolean
  onToggle: (guidelineId: string) => void
}

export function GuidelineItem({ guideline, isSelected, onToggle }: GuidelineItemProps) {
  return (
    <label
      className={`
        flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
        ${isSelected ? 'bg-green-50' : 'hover:bg-gray-50'}
      `}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(guideline.id)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
      />
      <div>
        <span className={`text-sm font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
          {guideline.text}
        </span>
        {guideline.description && (
          <p className="text-xs text-gray-500 mt-1">{guideline.description}</p>
        )}
      </div>
    </label>
  )
}
