import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

interface RouteContext {
  params: Promise<{ slug: string }>
}

interface OrgPublic {
  id: string
  name: string
  slug: string
  domain: string | null
  sector: string | null
  website: string | null
  logo_url: string | null
  transparency_status: string | null
  is_featured: boolean | null
  is_public: boolean | null
}

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('organizations')
    .select(`
      id,
      name,
      slug,
      domain,
      sector,
      website,
      logo_url,
      transparency_status,
      is_featured,
      is_public
    `)
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
  }

  const organization = data as OrgPublic

  // Check if org is public or featured
  if (!organization.is_public && !organization.is_featured) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
  }

  return NextResponse.json(organization)
}
