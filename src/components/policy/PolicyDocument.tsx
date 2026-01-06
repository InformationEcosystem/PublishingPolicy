import type { Policy, Facet, StandardItem, PreventionGuideline } from '@/types/database'

interface PolicyDocumentProps {
  policy: Policy
  facets: Facet[]
  items: StandardItem[]
  guidelines: PreventionGuideline[]
  selectedItemIds: string[]
  selectedGuidelineIds: string[]
}

const SECTOR_LABELS: Record<string, string> = {
  newsroom: 'Newsroom',
  academia: 'Academic Journal',
  corporate: 'Corporate Communications',
  platform: 'Platform Trust & Safety',
  journalism: 'Newsroom',
  freelance: 'Freelance',
}

export function PolicyDocument({
  policy,
  facets,
  items,
  guidelines,
  selectedItemIds,
  selectedGuidelineIds,
}: PolicyDocumentProps) {
  // Group selected items by facet
  const itemsByFacet = facets.map(facet => ({
    facet,
    items: items.filter(
      item => item.facet_id === facet.id && selectedItemIds.includes(item.id)
    ),
  })).filter(group => group.items.length > 0)

  // Get selected guidelines
  const selectedGuidelines = guidelines.filter(g => selectedGuidelineIds.includes(g.id))

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{policy.name}</h1>
        <p className="text-gray-500">
          {SECTOR_LABELS[policy.sector] || policy.sector}
          {policy.created_at && ` · Created ${new Date(policy.created_at).toLocaleDateString()}`}
        </p>
        {policy.description && (
          <p className="text-gray-600 mt-4">{policy.description}</p>
        )}
      </div>

      {/* Malpublishing Definition */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Malpublishing Definition
        </h2>
        <p className="text-gray-600 mb-6">
          Our organization considers the following actions to constitute malpublishing:
        </p>

        {itemsByFacet.map(({ facet, items: facetItems }) => (
          <div key={facet.id} className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3 flex items-center">
              <span className="w-2 h-2 bg-[#0074ff] rounded-full mr-2" />
              {facet.name}
            </h3>
            <ul className="space-y-2 ml-4">
              {facetItems.map(item => (
                <li key={item.id} className="flex items-start">
                  <span className="text-gray-400 mr-2">•</span>
                  <span className="text-gray-700">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Prevention Commitments */}
      {selectedGuidelines.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Prevention Commitments
          </h2>
          <p className="text-gray-600 mb-6">
            To uphold these standards, we commit to:
          </p>
          <ul className="space-y-3">
            {selectedGuidelines.map(guideline => (
              <li key={guideline.id} className="flex items-start">
                <span className="text-green-600 mr-3 mt-0.5">✓</span>
                <div>
                  <span className="text-gray-700">{guideline.text}</span>
                  {guideline.description && (
                    <p className="text-sm text-gray-500 mt-1">{guideline.description}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 pt-6 mt-8">
        <p className="text-sm text-gray-400">
          This policy was created using{' '}
          <a href="/" className="text-[#0074ff] hover:underline">
            Malpublish
          </a>
          , a tool for defining publishing ethics standards.
        </p>
      </footer>
    </div>
  )
}
