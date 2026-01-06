'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type {
  PublishingIdentity,
  EditorialCommitments,
  AccountabilityFramework,
  MalpublishDefinition,
  CommitmentTemplate,
} from '@/types/database'
import {
  WizardProgress,
  IdentitySection,
  CommitmentsSection,
  AccountabilitySection,
  MalpublishSection,
} from '@/components/wizard'

interface PolicyWizardProps {
  sectors: Array<{
    slug: string
    name: string
    category: string | null
  }>
  commitmentTemplates: CommitmentTemplate[]
}

const WIZARD_STEPS = [
  { id: 1, name: 'Identity' },
  { id: 2, name: 'Commitments' },
  { id: 3, name: 'Accountability' },
  { id: 4, name: 'Your Policy' },
]

const DEFAULT_IDENTITY: PublishingIdentity = {
  organization_name: '',
  sector: '',
  primary_audience: '',
  publishing_mission: '',
}

const DEFAULT_COMMITMENTS: EditorialCommitments = {
  sourcing: 'two_independent',
  accuracy: 'editor_review',
  transparency: {
    funding: false,
    ownership: false,
    corrections: false,
    editorial_process: false,
  },
  independence: 'disclosure_policy',
}

const DEFAULT_ACCOUNTABILITY: AccountabilityFramework = {
  correction_timeframe: '48h',
  feedback_mechanism: ['email'],
  accountability_contact: '',
  review_schedule: 'annually',
}

// Generate malpublish definitions from commitments
function generateDefinitions(
  commitments: EditorialCommitments,
  accountability: AccountabilityFramework,
  templates: CommitmentTemplate[]
): MalpublishDefinition[] {
  const definitions: MalpublishDefinition[] = []

  // Helper to find template and create definition
  const addFromTemplate = (type: string, value: string) => {
    const template = templates.find(
      t => t.commitment_type === type && t.commitment_value === value
    )
    if (template?.malpublish_template) {
      definitions.push({
        id: `${type}-${value}`,
        text: template.malpublish_template,
        source_commitment: type,
        is_auto_generated: true,
        is_custom: false,
      })
    }
  }

  // Sourcing commitment
  addFromTemplate('sourcing', commitments.sourcing)

  // Accuracy commitment
  addFromTemplate('accuracy', commitments.accuracy)

  // Transparency commitments (check each boolean)
  if (commitments.transparency.funding) {
    addFromTemplate('transparency_funding', 'yes')
  }
  if (commitments.transparency.ownership) {
    addFromTemplate('transparency_ownership', 'yes')
  }
  if (commitments.transparency.corrections) {
    addFromTemplate('transparency_corrections', 'yes')
  }
  if (commitments.transparency.editorial_process) {
    addFromTemplate('transparency_editorial', 'yes')
  }

  // Independence commitment
  addFromTemplate('independence', commitments.independence)

  // Correction timeframe
  addFromTemplate('correction_timeframe', accountability.correction_timeframe)

  // Feedback mechanism (if any mechanism exists)
  if (accountability.feedback_mechanism.length > 0) {
    addFromTemplate('feedback_mechanism', 'has_mechanism')
  }

  // Accountability contact (if provided)
  if (accountability.accountability_contact.trim()) {
    addFromTemplate('accountability_contact', 'has_contact')
  }

  return definitions
}

export function PolicyWizard({ sectors, commitmentTemplates }: PolicyWizardProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [identity, setIdentity] = useState<PublishingIdentity>(DEFAULT_IDENTITY)
  const [commitments, setCommitments] = useState<EditorialCommitments>(DEFAULT_COMMITMENTS)
  const [accountability, setAccountability] = useState<AccountabilityFramework>(DEFAULT_ACCOUNTABILITY)
  const [malpublishDefinitions, setMalpublishDefinitions] = useState<MalpublishDefinition[]>([])
  const [hasGeneratedDefinitions, setHasGeneratedDefinitions] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Generate definitions when entering Section 4
  useEffect(() => {
    if (currentStep === 4 && !hasGeneratedDefinitions) {
      const generated = generateDefinitions(commitments, accountability, commitmentTemplates)
      setMalpublishDefinitions(generated)
      setHasGeneratedDefinitions(true)
    }
  }, [currentStep, hasGeneratedDefinitions, commitments, accountability, commitmentTemplates])

  // Validation for each step
  const isStep1Valid = identity.organization_name.trim() !== '' &&
    identity.sector !== '' &&
    identity.primary_audience.trim() !== ''

  // Step 2 is always valid since we have defaults
  const isStep2Valid = true

  // Step 3 requires at least one feedback mechanism
  const isStep3Valid = accountability.feedback_mechanism.length > 0

  const canProceed = (step: number) => {
    switch (step) {
      case 1: return isStep1Valid
      case 2: return isStep2Valid
      case 3: return isStep3Valid
      default: return false
    }
  }

  const handleNext = () => {
    if (currentStep < 4 && canProceed(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/policies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${identity.organization_name} Publishing Policy`,
          sector: identity.sector,
          publishing_identity: identity,
          editorial_commitments: commitments,
          accountability_framework: accountability,
          malpublish_definitions: malpublishDefinitions,
          // Legacy fields - empty for new wizard
          items: [],
          guidelines: [],
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

  // Map sectors to the format expected by IdentitySection
  const sectorOptions = sectors.map(s => ({
    slug: s.slug,
    name: s.name,
    category: (s.category || 'Other') as import('@/types/database').SectorCategory,
  }))

  return (
    <div>
      <WizardProgress steps={WIZARD_STEPS} currentStep={currentStep} />

      {/* Section 1: Identity */}
      {currentStep === 1 && (
        <IdentitySection
          data={identity}
          sectors={sectorOptions}
          onChange={setIdentity}
        />
      )}

      {/* Section 2: Commitments */}
      {currentStep === 2 && (
        <CommitmentsSection
          data={commitments}
          onChange={setCommitments}
        />
      )}

      {/* Section 3: Accountability */}
      {currentStep === 3 && (
        <AccountabilitySection
          data={accountability}
          onChange={setAccountability}
        />
      )}

      {/* Section 4: The Malpublish Moment */}
      {currentStep === 4 && (
        <div>
          <MalpublishSection
            identity={identity}
            commitments={commitments}
            accountability={accountability}
            templates={commitmentTemplates}
            definitions={malpublishDefinitions}
            onChange={setMalpublishDefinitions}
          />

          {error && (
            <div className="max-w-2xl mx-auto mt-4">
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="max-w-2xl mx-auto mt-8 flex justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="px-6 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>

        {currentStep < 4 ? (
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed(currentStep)}
            className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Policy'}
          </button>
        )}
      </div>
    </div>
  )
}
