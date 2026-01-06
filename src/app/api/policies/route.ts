import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

interface PolicyResult {
  id: string
  edit_token: string
  view_token: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, sector, items, guidelines } = body

    // Validate required fields
    if (!sector || !items || !Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Use admin client for server-side insert (bypasses RLS)
    const supabase = createAdminClient()

    // Create the policy
    const { data, error: policyError } = await supabase
      .from('policies')
      .insert({
        name: name || 'Publishing Ethics Policy',
        sector,
        is_public: false,
        is_claimed: false,
      } as never)
      .select('id, edit_token, view_token')
      .single()

    if (policyError || !data) {
      console.error('Policy creation error:', policyError)
      return NextResponse.json(
        { error: 'Failed to create policy' },
        { status: 500 }
      )
    }

    // Cast to our expected type (bypassing RLS type restrictions)
    const policy = data as unknown as PolicyResult

    // Insert policy items
    if (items.length > 0) {
      const policyItems = items.map((itemId: string, index: number) => ({
        policy_id: policy.id,
        standard_item_id: itemId,
        is_selected: true,
        sort_order: index,
      }))

      const { error: itemsError } = await supabase
        .from('policy_items')
        .insert(policyItems as never)

      if (itemsError) {
        console.error('Policy items error:', itemsError)
      }
    }

    // Insert policy guidelines
    if (guidelines && guidelines.length > 0) {
      const policyGuidelines = guidelines.map((guidelineId: string, index: number) => ({
        policy_id: policy.id,
        guideline_id: guidelineId,
        is_selected: true,
        sort_order: index,
      }))

      const { error: guidelinesError } = await supabase
        .from('policy_guidelines')
        .insert(policyGuidelines as never)

      if (guidelinesError) {
        console.error('Policy guidelines error:', guidelinesError)
      }
    }

    return NextResponse.json({
      id: policy.id,
      edit_token: policy.edit_token,
      view_token: policy.view_token,
    })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
