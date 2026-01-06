'use client'

import type { StandardItem } from '@/types/database'

interface ChecklistItemProps {
  item: StandardItem
  isSelected: boolean
  onToggle: (itemId: string) => void
}

export function ChecklistItem({ item, isSelected, onToggle }: ChecklistItemProps) {
  return (
    <label
      className={`
        flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors
        ${isSelected ? 'bg-[#e6f0ff]' : 'hover:bg-gray-50'}
      `}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(item.id)}
        className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0074ff] focus:ring-[#0074ff]"
      />
      <span className={`text-sm ${isSelected ? 'text-gray-900' : 'text-gray-600'}`}>
        {item.text}
      </span>
    </label>
  )
}
