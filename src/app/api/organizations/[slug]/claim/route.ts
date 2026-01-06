import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import crypto from 'crypto'

interface RouteContext {
  params: Promise<{ slug: string }>
}

interface OrgClaim {
  id: string
  name: string
  slug: string
  domain: string | null
  dns_verification_code: string | null
  dns_verified_at: string | null
}

// POST: Initiate claim - generate DNS verification code
export async function POST(request: Request, context: RouteContext) {
  const { slug } = await context.params
  const supabase = await createClient()
  const adminClient = createAdminClient()

  // Get organization
  const { data, error } = await supabase
    .from('organizations')
    .select('id, name, slug, domain, dns_verification_code, dns_verified_at')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
  }

  const organization = data as OrgClaim

  // Check if already verified
  if (organization.dns_verified_at) {
    return NextResponse.json({
      error: 'Organization already claimed',
      verified_at: organization.dns_verified_at
    }, { status: 400 })
  }

  // Generate verification code if not exists
  let verificationCode = organization.dns_verification_code
  if (!verificationCode) {
    verificationCode = `publishingpolicy-verify=${crypto.randomUUID()}`

    const { error: updateError } = await adminClient
      .from('organizations')
      .update({ dns_verification_code: verificationCode })
      .eq('id', organization.id)

    if (updateError) {
      console.error('Error updating verification code:', updateError)
      return NextResponse.json({ error: 'Failed to generate verification code' }, { status: 500 })
    }
  }

  return NextResponse.json({
    organization_id: organization.id,
    name: organization.name,
    domain: organization.domain,
    verification_code: verificationCode,
    instructions: `Add the following TXT record to your domain's DNS settings:\n\nHost: @ or ${organization.domain}\nType: TXT\nValue: ${verificationCode}\n\nNote: DNS changes may take up to 48 hours to propagate.`
  })
}

// PUT: Verify DNS record
export async function PUT(request: Request, context: RouteContext) {
  const { slug } = await context.params
  const supabase = await createClient()
  const adminClient = createAdminClient()

  // Get organization
  const { data, error } = await supabase
    .from('organizations')
    .select('id, name, domain, dns_verification_code, dns_verified_at')
    .eq('slug', slug)
    .single()

  if (error || !data) {
    return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
  }

  const organization = data as OrgClaim

  if (!organization.domain) {
    return NextResponse.json({ error: 'Organization has no domain configured' }, { status: 400 })
  }

  if (!organization.dns_verification_code) {
    return NextResponse.json({ error: 'No verification code generated. Start the claim process first.' }, { status: 400 })
  }

  if (organization.dns_verified_at) {
    return NextResponse.json({
      success: true,
      message: 'Organization already verified',
      verified_at: organization.dns_verified_at
    })
  }

  // Check DNS TXT record using Google DNS API
  try {
    const dnsResponse = await fetch(
      `https://dns.google/resolve?name=${organization.domain}&type=TXT`,
      { headers: { 'Accept': 'application/dns-json' } }
    )

    if (!dnsResponse.ok) {
      return NextResponse.json({ error: 'Failed to check DNS records' }, { status: 500 })
    }

    const dnsData = await dnsResponse.json()

    // Check if verification code exists in TXT records
    const txtRecords = dnsData.Answer || []
    const verified = txtRecords.some((record: { data: string }) => {
      // TXT records are returned with quotes, strip them
      const value = record.data.replace(/^"|"$/g, '')
      return value === organization.dns_verification_code
    })

    if (verified) {
      // Update organization as verified and claimed
      const { error: updateError } = await adminClient
        .from('organizations')
        .update({
          dns_verified_at: new Date().toISOString(),
          transparency_status: 'claimed'
        })
        .eq('id', organization.id)

      if (updateError) {
        console.error('Error updating verification status:', updateError)
        return NextResponse.json({ error: 'Failed to update verification status' }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: 'Domain verified successfully! You can now manage this organization\'s publishing policy.',
        verified_at: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Verification code not found in DNS TXT records. Please ensure the TXT record is properly configured and allow time for DNS propagation.',
        expected_code: organization.dns_verification_code,
        found_records: txtRecords.map((r: { data: string }) => r.data.replace(/^"|"$/g, ''))
      }, { status: 400 })
    }
  } catch (err) {
    console.error('DNS verification error:', err)
    return NextResponse.json({ error: 'Failed to verify DNS record' }, { status: 500 })
  }
}
