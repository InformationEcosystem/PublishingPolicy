'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SectorTemplate, Facet, StandardItem, PreventionGuideline } from '@/types/database'
import { SectorCard, ChecklistItem, GuidelineItem, WizardProgress } from '@/components/policy'

interface PolicyBuilderProps {
  templates: SectorTemplate[]
  facets: Facet[]
  items: StandardItem[]
  guidelines: PreventionGuideline[]
}

const WIZARD_STEPS = [
  { id: 1, name: 'Select Sector' },
  { id: 2, name: 'Customize' },
  { id: 3, name: 'Preview & Save' },
]

export function PolicyBuilder({ templates, facets, items, guidelines }: PolicyBuilderProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedTemplate, setSelectedTemplate] = useState<SectorTemplate | null>(null)
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())
  const [selectedGuidelines, setSelectedGuidelines] = useState<Set<string>>(new Set())
  const [policyName, setPolicyName] = useState('Publishing Ethics Policy')
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // When a template is selected, pre-select its default items and guidelines
  const handleTemplateSelect = (template: SectorTemplate) => {
    setSelectedTemplate(template)
    setSelectedItems(new Set(template.default_items))
    setSelectedGuidelines(new Set(template.default_guidelines))
  }

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

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    if (!selectedTemplate) return

    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: policyName,
          sector: selectedTemplate.slug,
          items: Array.from(selectedItems),
          guidelines: Array.from(selectedGuidelines),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save policy')
      }

      const { edit_token } = await response.json()
      router.push(`/policy/edit/${edit_token}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsSaving(false)
    }
  }

  // Group items by facet for display
  const itemsByFacet = facets.map(facet => ({
    facet,
    items: items.filter(item => item.facet_id === facet.id),
  }))

  // Get selected items and guidelines for preview
  const previewItems = items.filter(item => selectedItems.has(item.id))
  const previewGuidelines = guidelines.filter(g => selectedGuidelines.has(g.id))

  return (
    <div>
      <WizardProgress steps={WIZARD_STEPS} currentStep={currentStep} />

      {/* Step 1: Select Sector */}
      {currentStep === 1 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Choose Your Sector
            </h1>
            <p className="text-gray-600">
              Start with a template designed for your industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {templates.map(template => (
              <SectorCard
                key={template.id}
                template={template}
                isSelected={selectedTemplate?.id === template.id}
                onSelect={handleTemplateSelect}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedTemplate}
              className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Customize */}
      {currentStep === 2 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Customize Your Policy
            </h1>
            <p className="text-gray-600">
              Select the items and guidelines that apply to your organization
            </p>
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

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              disabled={selectedItems.size === 0}
              className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Preview Policy
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Preview & Save */}
      {currentStep === 3 && (
        <div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Review Your Policy
            </h1>
            <p className="text-gray-600">
              Preview your policy before saving
            </p>
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

          {/* Policy Preview */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{policyName}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {selectedTemplate?.name} Template · Created {new Date().toLocaleDateString()}
              </p>
            </div>

            {/* Selected Items by Facet */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Malpublishing Definition
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Our organization considers the following actions to constitute malpublishing:
              </p>
              {itemsByFacet.map(({ facet, items: facetItems }) => {
                const selectedFacetItems = facetItems.filter(item => selectedItems.has(item.id))
                if (selectedFacetItems.length === 0) return null
                return (
                  <div key={facet.id} className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">{facet.name}</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                      {selectedFacetItems.map(item => (
                        <li key={item.id}>{item.text}</li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            {/* Selected Guidelines */}
            {previewGuidelines.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Prevention Commitments
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  To uphold these standards, we commit to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-2">
                  {previewGuidelines.map(guideline => (
                    <li key={guideline.id}>{guideline.text}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSaving ? 'Saving...' : 'Save Policy'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
