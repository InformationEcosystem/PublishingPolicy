'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import type { Policy, Facet, StandardItem, PreventionGuideline } from '@/types/database'
import { ChecklistItem, GuidelineItem } from '@/components/policy'

interface PolicyEditorProps {
  policy: Policy
  facets: Facet[]
  items: StandardItem[]
  guidelines: PreventionGuideline[]
  initialSelectedItems: string[]
  initialSelectedGuidelines: string[]
}

export function PolicyEditor({
  policy,
  facets,
  items,
  guidelines,
  initialSelectedItems,
  initialSelectedGuidelines,
}: PolicyEditorProps) {
  const [policyName, setPolicyName] = useState(policy.name)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set(initialSelectedItems))
  const [selectedGuidelines, setSelectedGuidelines] = useState<Set<string>>(new Set(initialSelectedGuidelines))
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [hasChanges, setHasChanges] = useState(false)
  const [copied, setCopied] = useState(false)

  // Track changes
  useEffect(() => {
    setHasChanges(true)
  }, [policyName, selectedItems, selectedGuidelines])

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }

  const handleGuidelineToggle = (guidelineId: string) => {
    setSelectedGuidelines(prev => {
      const next = new Set(prev)
      if (next.has(guidelineId)) {
        next.delete(guidelineId)
      } else {
        next.add(guidelineId)
      }
      return next
    })
  }

  const handleSave = useCallback(async () => {
    if (isSaving) return

    setIsSaving(true)

    try {
      const response = await fetch(`/api/policies/${policy.edit_token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: policyName,
          items: Array.from(selectedItems),
          guidelines: Array.from(selectedGuidelines),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save')
      }

      setLastSaved(new Date())
      setHasChanges(false)
    } catch (err) {
      console.error('Save error:', err)
    } finally {
      setIsSaving(false)
    }
  }, [policy.edit_token, policyName, selectedItems, selectedGuidelines, isSaving])

  // Auto-save after 2 seconds of inactivity
  useEffect(() => {
    if (!hasChanges) return

    const timer = setTimeout(() => {
      handleSave()
    }, 2000)

    return () => clearTimeout(timer)
  }, [hasChanges, handleSave])

  const copyShareLink = () => {
    const url = `${window.location.origin}/policy/${policy.view_token}`
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Group items by facet
  const itemsByFacet = facets.map(facet => ({
    facet,
    items: items.filter(item => item.facet_id === facet.id),
  }))

  return (
    <div>
      {/* Header with save status */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Edit Policy</h1>
            <p className="text-gray-500 text-sm">
              {isSaving ? 'Saving...' : lastSaved ? `Last saved ${lastSaved.toLocaleTimeString()}` : 'Auto-saves as you edit'}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={copyShareLink}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy Share Link'}
            </button>
            <Link
              href={`/policy/${policy.view_token}`}
              className="px-4 py-2 text-sm font-medium text-white bg-[#0074ff] rounded-lg hover:bg-[#0063dd] transition-colors"
            >
              View Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Policy Name */}
      <div className="mb-6">
        <label htmlFor="policyName" className="block text-sm font-medium text-gray-700 mb-1">
          Policy Name
        </label>
        <input
          type="text"
          id="policyName"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074ff] focus:border-transparent"
        />
      </div>

      {/* Checklist Items by Facet */}
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900">
          What Constitutes Malpublishing
        </h2>
        {itemsByFacet.map(({ facet, items: facetItems }) => (
          <div key={facet.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="font-medium text-gray-900 mb-2">{facet.name}</h3>
            {facet.description && (
              <p className="text-sm text-gray-500 mb-3">{facet.description}</p>
            )}
            <div className="space-y-1">
              {facetItems.map(item => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  isSelected={selectedItems.has(item.id)}
                  onToggle={handleItemToggle}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Prevention Guidelines */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Prevention Guidelines
        </h2>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="space-y-1">
            {guidelines.map(guideline => (
              <GuidelineItem
                key={guideline.id}
                guideline={guideline}
                isSelected={selectedGuidelines.has(guideline.id)}
                onToggle={handleGuidelineToggle}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Selection Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-8">
        <p className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{selectedItems.size}</span> items selected ·
          <span className="font-medium text-gray-900 ml-1">{selectedGuidelines.size}</span> guidelines selected
        </p>
      </div>

      {/* Manual save button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
