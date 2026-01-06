import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PolicyDocument } from '@/components/policy'
import type { Policy, Facet, StandardItem, PreventionGuideline } from '@/types/database'

export const metadata = {
  title: 'View Policy | Malpublish',
  description: 'View a publishing ethics policy.',
}

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function ViewPolicyPage({ params }: PageProps) {
  const { token } = await params
  const supabase = createAdminClient()

  // Fetch the policy by view_token
  const { data: policyData, error: policyError } = await supabase
    .from('policies')
    .select('*')
    .eq('view_token', token)
    .single()

  if (policyError || !policyData) {
    notFound()
  }

  // Cast to proper type
  const policy = policyData as unknown as Policy

  // Fetch policy items
  const { data: policyItems } = await supabase
    .from('policy_items')
    .select('standard_item_id')
    .eq('policy_id', policy.id)

  // Fetch policy guidelines
  const { data: policyGuidelines } = await supabase
    .from('policy_guidelines')
    .select('guideline_id')
    .eq('policy_id', policy.id)

  // Fetch reference data
  const [
    { data: facetsData },
    { data: itemsData },
    { data: guidelinesData },
  ] = await Promise.all([
    supabase.from('facets').select('*').order('sort_order'),
    supabase.from('standard_items').select('*').order('facet_id').order('sort_order'),
    supabase.from('prevention_guidelines').select('*').order('sort_order'),
  ])

  // Cast to proper types
  const facets = (facetsData || []) as unknown as Facet[]
  const items = (itemsData || []) as unknown as StandardItem[]
  const guidelines = (guidelinesData || []) as unknown as PreventionGuideline[]

  // Extract selected IDs
  type ItemRow = { standard_item_id: string | null }
  type GuidelineRow = { guideline_id: string | null }
  const itemRows = (policyItems || []) as unknown as ItemRow[]
  const guidelineRows = (policyGuidelines || []) as unknown as GuidelineRow[]
  const selectedItemIds = itemRows.map(pi => pi.standard_item_id).filter(Boolean) as string[]
  const selectedGuidelineIds = guidelineRows.map(pg => pg.guideline_id).filter(Boolean) as string[]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Back to directory */}
          <div className="mb-6">
            <Link
              href="/directory"
              className="text-[#0074ff] hover:underline text-sm"
            >
              ← Back to Directory
            </Link>
          </div>

          <PolicyDocument
            policy={policy}
            facets={facets}
            items={items}
            guidelines={guidelines}
            selectedItemIds={selectedItemIds}
            selectedGuidelineIds={selectedGuidelineIds}
          />

          {/* Create your own CTA */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Want to define your organization&apos;s publishing ethics?
            </p>
            <Link
              href="/new"
              className="inline-block bg-[#0074ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#0063dd] transition-colors"
            >
              Create Your Own Policy
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
