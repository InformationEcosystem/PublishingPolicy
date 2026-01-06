import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PolicyBuilder } from './PolicyBuilder'

export const metadata = {
  title: 'Build Your Publishing Policy | Malpublish',
  description: 'Create a customized publishing ethics policy for your organization.',
}

export default async function NewPolicyPage() {
  const supabase = await createClient()

  // Fetch all reference data in parallel
  const [
    { data: templates, error: templatesError },
    { data: facets, error: facetsError },
    { data: items, error: itemsError },
    { data: guidelines, error: guidelinesError },
  ] = await Promise.all([
    supabase.from('sector_templates').select('*').order('name'),
    supabase.from('facets').select('*').order('sort_order'),
    supabase.from('standard_items').select('*').order('facet_id').order('sort_order'),
    supabase.from('prevention_guidelines').select('*').order('sort_order'),
  ])

  // Handle errors gracefully
  if (templatesError || facetsError || itemsError || guidelinesError) {
    console.error('Database error:', { templatesError, facetsError, itemsError, guidelinesError })
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Unable to load policy builder</h1>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <PolicyBuilder
            templates={templates || []}
            facets={facets || []}
            items={items || []}
            guidelines={guidelines || []}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
