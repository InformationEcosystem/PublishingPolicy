import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Policy, PublishingIdentity, EditorialCommitments } from '@/types/database'

export const metadata = {
  title: 'Policy Directory | Publishing Policy',
  description: 'Browse publishing policies from organizations committed to transparent, accountable publishing.',
}

// Category-based sector groupings
const SECTOR_CATEGORIES = {
  'media': {
    label: 'Media & Journalism',
    icon: '📰',
    sectors: ['newsroom', 'local_news', 'digital_media', 'newsletter', 'podcast', 'documentary', 'journalism'],
  },
  'academic': {
    label: 'Academic & Research',
    icon: '🎓',
    sectors: ['academic_journal', 'university', 'research_institution', 'think_tank', 'academia'],
  },
  'government': {
    label: 'Government & Public',
    icon: '🏛️',
    sectors: ['federal_agency', 'state_government', 'municipal', 'school_district', 'public_library'],
  },
  'corporate': {
    label: 'Corporate & Professional',
    icon: '🏢',
    sectors: ['corporate_comms', 'pr_agency', 'internal_comms', 'industry_association', 'corporate'],
  },
  'platform': {
    label: 'Platform & Technology',
    icon: '💻',
    sectors: ['social_platform', 'content_platform', 'community_forum', 'ai_content', 'platform'],
  },
  'nonprofit': {
    label: 'Nonprofit & Advocacy',
    icon: '🤝',
    sectors: ['nonprofit', 'foundation', 'advocacy_org', 'religious_org'],
  },
  'individual': {
    label: 'Individual & Creator',
    icon: '✍️',
    sectors: ['independent_journalist', 'blogger', 'consultant', 'creator', 'freelance'],
  },
}

// Map sector to category
function getSectorCategory(sector: string): string | null {
  for (const [category, data] of Object.entries(SECTOR_CATEGORIES)) {
    if (data.sectors.includes(sector)) {
      return category
    }
  }
  return null
}

// Get category display info
function getCategoryInfo(sector: string) {
  const category = getSectorCategory(sector)
  if (category && SECTOR_CATEGORIES[category as keyof typeof SECTOR_CATEGORIES]) {
    return SECTOR_CATEGORIES[category as keyof typeof SECTOR_CATEGORIES]
  }
  return { label: sector, icon: '📋' }
}

// Format commitment summary
function getCommitmentSummary(policy: Policy): string | null {
  const commitments = policy.editorial_commitments as EditorialCommitments | null
  if (!commitments) return null

  const highlights: string[] = []

  if (commitments.sourcing === 'two_independent' || commitments.sourcing === 'three_or_more') {
    highlights.push('Multi-source verification')
  }
  if (commitments.accuracy === 'formal_process' || commitments.accuracy === 'editor_review') {
    highlights.push('Editorial review')
  }
  if (commitments.transparency?.funding) {
    highlights.push('Funding disclosure')
  }

  return highlights.length > 0 ? highlights.slice(0, 2).join(' · ') : null
}

// Certification tier badge
function CertificationBadge({ tier }: { tier: string | null }) {
  if (!tier || tier === 'declared') {
    return null
  }

  const badges: Record<string, { label: string; className: string }> = {
    committed: { label: 'Committed', className: 'bg-gray-100 text-gray-700' },
    verified: { label: 'Verified', className: 'bg-blue-100 text-blue-700' },
    exemplary: { label: 'Exemplary', className: 'bg-amber-100 text-amber-700' },
  }

  const badge = badges[tier]
  if (!badge) return null

  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${badge.className}`}>
      {badge.label}
    </span>
  )
}

interface SearchParams {
  category?: string
}

interface PageProps {
  searchParams: Promise<SearchParams>
}

export default async function DirectoryPage({ searchParams }: PageProps) {
  const params = await searchParams
  const supabase = createAdminClient()

  // Build query for public policies
  let query = supabase
    .from('policies')
    .select('*')
    .eq('is_public', true)
    .order('created_at', { ascending: false })

  // Filter by category if specified
  if (params.category && SECTOR_CATEGORIES[params.category as keyof typeof SECTOR_CATEGORIES]) {
    const categoryData = SECTOR_CATEGORIES[params.category as keyof typeof SECTOR_CATEGORIES]
    query = query.in('sector', categoryData.sectors)
  }

  const { data: policiesData } = await query

  // Cast to proper type
  const policies = (policiesData || []) as unknown as Policy[]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Policy Directory
            </h1>
            <p className="text-gray-600">
              Organizations committed to transparent, accountable publishing
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Link
              href="/directory"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !params.category
                  ? 'bg-[#0074ff] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All
            </Link>
            {Object.entries(SECTOR_CATEGORIES).map(([key, data]) => (
              <Link
                key={key}
                href={`/directory?category=${key}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  params.category === key
                    ? 'bg-[#0074ff] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {data.icon} {data.label}
              </Link>
            ))}
          </div>

          {/* Policies Grid */}
          {policies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {policies.map(policy => {
                const categoryInfo = getCategoryInfo(policy.sector)
                const identity = policy.publishing_identity as PublishingIdentity | null
                const commitmentSummary = getCommitmentSummary(policy)

                return (
                  <Link
                    key={policy.id}
                    href={`/policy/${policy.view_token}`}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:border-[#0074ff] hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-2xl">{categoryInfo.icon}</span>
                      <div className="flex items-center gap-2">
                        <CertificationBadge tier={policy.certification_tier} />
                        <span className="text-xs text-gray-400">
                          {policy.created_at ? new Date(policy.created_at).toLocaleDateString() : ''}
                        </span>
                      </div>
                    </div>
                    <h2 className="font-semibold text-gray-900 mb-1">
                      {policy.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {categoryInfo.label}
                    </p>
                    {identity?.primary_audience && (
                      <p className="text-xs text-gray-400 mb-2">
                        Audience: {identity.primary_audience}
                      </p>
                    )}
                    {commitmentSummary && (
                      <p className="text-xs text-blue-600">
                        {commitmentSummary}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">
                {params.category
                  ? `No public policies found for ${SECTOR_CATEGORIES[params.category as keyof typeof SECTOR_CATEGORIES]?.label || params.category}`
                  : 'No public policies yet'}
              </p>
              <Link
                href="/build"
                className="inline-block bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] transition-colors"
              >
                Create the First One
              </Link>
            </div>
          )}

          {/* CTA */}
          {policies.length > 0 && (
            <div className="text-center mt-12 p-8 bg-white rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">
                Want your policy listed here?
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Build your publishing policy and make it public to appear in the directory.
              </p>
              <Link
                href="/build"
                className="inline-block bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] transition-colors"
              >
                Build Your Policy
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
