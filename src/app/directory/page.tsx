import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import type { Policy } from '@/types/database'

export const metadata = {
  title: 'Policy Directory | Malpublish',
  description: 'Browse publishing ethics policies from organizations committed to ethical publishing.',
}

const SECTOR_LABELS: Record<string, string> = {
  newsroom: 'Newsroom',
  journalism: 'Newsroom',
  academia: 'Academic Journal',
  corporate: 'Corporate Communications',
  platform: 'Platform Trust & Safety',
  freelance: 'Freelance',
}

const SECTOR_ICONS: Record<string, string> = {
  newsroom: '📰',
  journalism: '📰',
  academia: '🎓',
  corporate: '🏢',
  platform: '🛡️',
  freelance: '✍️',
}

interface SearchParams {
  sector?: string
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

  // Filter by sector if specified
  if (params.sector) {
    query = query.eq('sector', params.sector)
  }

  const { data: policiesData } = await query

  // Cast to proper type
  const policies = (policiesData || []) as unknown as Policy[]

  // Get unique sectors for filter
  const sectors = ['newsroom', 'academia', 'corporate', 'platform']

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
              Browse publishing ethics policies from organizations committed to ethical publishing
            </p>
          </div>

          {/* Sector Filter */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            <Link
              href="/directory"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !params.sector
                  ? 'bg-[#0074ff] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All
            </Link>
            {sectors.map(sector => (
              <Link
                key={sector}
                href={`/directory?sector=${sector}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  params.sector === sector
                    ? 'bg-[#0074ff] text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {SECTOR_ICONS[sector]} {SECTOR_LABELS[sector]}
              </Link>
            ))}
          </div>

          {/* Policies Grid */}
          {policies.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {policies.map(policy => (
                <Link
                  key={policy.id}
                  href={`/policy/${policy.view_token}`}
                  className="bg-white rounded-lg border border-gray-200 p-6 hover:border-[#0074ff] hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">
                      {SECTOR_ICONS[policy.sector] || '📋'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {policy.created_at ? new Date(policy.created_at).toLocaleDateString() : ''}
                    </span>
                  </div>
                  <h2 className="font-semibold text-gray-900 mb-1">
                    {policy.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {SECTOR_LABELS[policy.sector] || policy.sector}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">
                {params.sector
                  ? `No public policies found for ${SECTOR_LABELS[params.sector] || params.sector}`
                  : 'No public policies yet'}
              </p>
              <Link
                href="/new"
                className="inline-block bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] transition-colors"
              >
                Create the First One
              </Link>
            </div>
          )}

          {/* CTA */}
          {policies.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">
                Ready to define your organization&apos;s publishing ethics?
              </p>
              <Link
                href="/new"
                className="inline-block bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] transition-colors"
              >
                Create Your Policy
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
