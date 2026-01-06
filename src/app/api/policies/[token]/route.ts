import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

interface RouteParams {
  params: Promise<{ token: string }>
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { token } = await params
    const body = await request.json()
    const { name, items, guidelines } = body

    const supabase = createAdminClient()

    // Find policy by edit_token
    const { data: policy, error: findError } = await supabase
      .from('policies')
      .select('id')
      .eq('edit_token', token)
      .single()

    if (findError || !policy) {
      return NextResponse.json(
        { error: 'Policy not found' },
        { status: 404 }
      )
    }

    const policyId = (policy as { id: string }).id

    // Update policy name if provided
    if (name) {
      await supabase
        .from('policies')
        .update({ name } as never)
        .eq('id', policyId)
    }

    // Replace policy items
    if (items && Array.isArray(items)) {
      // Delete existing items
      await supabase
        .from('policy_items')
        .delete()
        .eq('policy_id', policyId)

      // Insert new items
      if (items.length > 0) {
        const policyItems = items.map((itemId: string, index: number) => ({
          policy_id: policyId,
          standard_item_id: itemId,
          is_selected: true,
          sort_order: index,
        }))

        await supabase
          .from('policy_items')
          .insert(policyItems as never)
      }
    }

    // Replace policy guidelines
    if (guidelines && Array.isArray(guidelines)) {
      // Delete existing guidelines
      await supabase
        .from('policy_guidelines')
        .delete()
        .eq('policy_id', policyId)

      // Insert new guidelines
      if (guidelines.length > 0) {
        const policyGuidelines = guidelines.map((guidelineId: string, index: number) => ({
          policy_id: policyId,
          guideline_id: guidelineId,
          is_selected: true,
          sort_order: index,
        }))

        await supabase
          .from('policy_guidelines')
          .insert(policyGuidelines as never)
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
