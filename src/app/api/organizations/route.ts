import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()

  const { data: organizations, error } = await supabase
    .from('organizations')
    .select(`
      id,
      name,
      slug,
      domain,
      sector,
      logo_url,
      transparency_status,
      is_featured
    `)
    .eq('is_featured', true)
    .eq('is_public', true)
    .order('name')

  if (error) {
    console.error('Error fetching organizations:', error)
    return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 500 })
  }

  return NextResponse.json(organizations)
}
