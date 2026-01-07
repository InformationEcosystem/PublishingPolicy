'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Organization {
  id: string
  name: string
  slug: string
  domain: string | null
  sector: string | null
  logo_url: string | null
  transparency_status: string | null
}

interface OrganizationCarouselProps {
  organizations: Organization[]
  onOrganizationClick: (org: Organization) => void
}

// Animation durations in seconds - top is slower (higher = slower)
const TOP_ROW_DURATION = 60
const BOTTOM_ROW_DURATION = 25

function getStatusBadge(status: string | null) {
  switch (status) {
    case 'has_policy':
      return { text: 'Has Policy', shortText: 'Policy', className: 'bg-green-100 text-green-800' }
    case 'claimed':
      return { text: 'Claimed', shortText: 'Claimed', className: 'bg-blue-100 text-blue-800' }
    case 'no_policy':
    default:
      return { text: 'No Known Policy', shortText: 'Unknown', className: 'bg-gray-100 text-gray-600' }
  }
}

interface CarouselRowProps {
  organizations: Organization[]
  duration: number
  onOrganizationClick: (org: Organization) => void
}

function OrganizationLogo({ org }: { org: Organization }) {
  const [hasError, setHasError] = useState(false)

  // Try org's custom logo first, then Google favicon, then fallback to letter
  const logoUrl = org.logo_url || (org.domain ? `https://www.google.com/s2/favicons?domain=${org.domain}&sz=128` : null)

  if (!logoUrl || hasError) {
    return (
      <span className="text-base sm:text-lg md:text-2xl font-bold text-gray-400">
        {org.name.charAt(0)}
      </span>
    )
  }

  return (
    <Image
      src={logoUrl}
      alt={`${org.name} logo`}
      width={48}
      height={48}
      className="object-contain w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12"
      onError={() => setHasError(true)}
      unoptimized={!org.logo_url} // Skip optimization for external favicon URLs
    />
  )
}

function CarouselRow({ organizations, duration, onOrganizationClick }: CarouselRowProps) {
  const [isPaused, setIsPaused] = useState(false)

  // Duplicate for seamless infinite scroll
  const duplicatedOrgs = [...organizations, ...organizations]

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div
        className="flex gap-2 sm:gap-3 md:gap-4 w-fit"
        style={{
          animation: `scroll ${duration}s linear infinite`,
          animationPlayState: isPaused ? 'paused' : 'running',
        }}
      >
        {duplicatedOrgs.map((org, index) => {
          const status = getStatusBadge(org.transparency_status)
          return (
            <button
              key={`${org.id}-${index}`}
              onClick={() => onOrganizationClick(org)}
              className="flex-shrink-0 bg-white rounded-lg p-2 sm:p-3 md:p-4 shadow-sm border border-gray-200 hover:border-[#0074ff] hover:shadow-md transition-all cursor-pointer w-28 sm:w-36 md:w-48"
            >
              <div className="flex flex-col items-center text-center">
                {/* Logo - responsive sizing */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mb-1.5 sm:mb-2 md:mb-3 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <OrganizationLogo org={org} />
                </div>
                {/* Name - truncate on small screens */}
                <h3 className="font-medium text-gray-900 text-[11px] sm:text-xs md:text-sm mb-1 sm:mb-2 line-clamp-1 w-full">
                  {org.name}
                </h3>
                {/* Badge - shorter text on mobile */}
                <span className={`text-[9px] sm:text-[10px] md:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap ${status.className}`}>
                  <span className="md:hidden">{status.shortText}</span>
                  <span className="hidden md:inline">{status.text}</span>
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function OrganizationCarousel({ organizations, onOrganizationClick }: OrganizationCarouselProps) {
  // Split organizations into two rows (alternating for variety)
  const topRowOrgs = organizations.filter((_, i) => i % 2 === 0)
  const bottomRowOrgs = organizations.filter((_, i) => i % 2 === 1)

  return (
    <section className="py-6 sm:py-8 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-3 sm:mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
            Do These Organizations Have a Publishing Policy?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">
            Click to view transparency status
          </p>
        </div>
      </div>

      {/* Two-row carousel with differential speeds (CSS animations) */}
      <div className="space-y-2 sm:space-y-3 md:space-y-4 px-4">
        <CarouselRow
          organizations={topRowOrgs}
          duration={TOP_ROW_DURATION}
          onOrganizationClick={onOrganizationClick}
        />
        <CarouselRow
          organizations={bottomRowOrgs}
          duration={BOTTOM_ROW_DURATION}
          onOrganizationClick={onOrganizationClick}
        />
      </div>

      {/* Footer text */}
      <p className="text-center text-[10px] sm:text-xs text-gray-400 mt-3 sm:mt-4 px-4">
        Transparency status based on publicly available information. Organizations can{' '}
        <span className="text-[#0074ff]">claim their profile</span> to update their status.
      </p>
    </section>
  )
}
