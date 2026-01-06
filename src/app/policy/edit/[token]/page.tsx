import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PolicyEditor } from './PolicyEditor'
import type { Policy, Facet, StandardItem, PreventionGuideline } from '@/types/database'

export const metadata = {
  title: 'Edit Policy | Malpublish',
  description: 'Edit your publishing ethics policy.',
}

interface PageProps {
  params: Promise<{ token: string }>
}

export default async function EditPolicyPage({ params }: PageProps) {
  const { token } = await params
  const supabase = createAdminClient()

  // Fetch the policy by edit_token
  const { data: policyData, error: policyError } = await supabase
    .from('policies')
    .select('*')
    .eq('edit_token', token)
    .single()

  if (policyError || !policyData) {
    notFound()
  }

  // Cast to proper type (RLS restrictions cause type to be 'never')
  const policy = policyData as unknown as Policy

  // Fetch current policy items
  const { data: policyItems } = await supabase
    .from('policy_items')
    .select('standard_item_id')
    .eq('policy_id', policy.id)

  // Fetch current policy guidelines
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

  // Cast to proper types (reference tables don't have RLS restrictions, but types are still inferred as never)
  const facets = (facetsData || []) as unknown as Facet[]
  const items = (itemsData || []) as unknown as StandardItem[]
  const guidelines = (guidelinesData || []) as unknown as PreventionGuideline[]

  // Extract selected IDs (cast due to RLS type restrictions)
  type ItemRow = { standard_item_id: string | null }
  type GuidelineRow = { guideline_id: string | null }
  const itemRows = (policyItems || []) as unknown as ItemRow[]
  const guidelineRows = (policyGuidelines || []) as unknown as GuidelineRow[]
  const selectedItemIds = itemRows.map(pi => pi.standard_item_id).filter(Boolean) as string[]
  const selectedGuidelineIds = guidelineRows.map(pg => pg.guideline_id).filter(Boolean) as string[]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <PolicyEditor
            policy={policy}
            facets={facets}
            items={items}
            guidelines={guidelines}
            initialSelectedItems={selectedItemIds}
            initialSelectedGuidelines={selectedGuidelineIds}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
