'use client'

import { useState } from 'react'
import { OrganizationCarousel } from './OrganizationCarousel'
import { OrganizationModal } from './OrganizationModal'

interface Organization {
  id: string
  name: string
  slug: string
  domain: string | null
  sector: string | null
  logo_url: string | null
  transparency_status: string | null
}

interface OrganizationShowcaseProps {
  organizations: Organization[]
}

export function OrganizationShowcase({ organizations }: OrganizationShowcaseProps) {
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  return (
    <>
      <OrganizationCarousel
        organizations={organizations}
        onOrganizationClick={setSelectedOrg}
      />
      <OrganizationModal
        organization={selectedOrg}
        onClose={() => setSelectedOrg(null)}
      />
    </>
  )
}
