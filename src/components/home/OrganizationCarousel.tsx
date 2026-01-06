'use client'

import { useEffect, useRef, useState } from 'react'
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

function getLogoUrl(org: Organization): string {
  if (org.logo_url) return org.logo_url
  if (org.domain) return `https://logo.clearbit.com/${org.domain}`
  return '/logo.svg'
}

function getStatusBadge(status: string | null) {
  switch (status) {
    case 'has_policy':
      return { text: 'Policy Published', className: 'bg-green-100 text-green-800' }
    case 'claimed':
      return { text: 'Claimed', className: 'bg-blue-100 text-blue-800' }
    case 'no_policy':
    default:
      return { text: 'No Known Policy', className: 'bg-gray-100 text-gray-600' }
  }
}

export function OrganizationCarousel({ organizations, onOrganizationClick }: OrganizationCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isPaused) return

    const scrollSpeed = 0.5 // pixels per frame
    let animationId: number

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        // Reset to start for infinite loop effect
        scrollContainer.scrollLeft = 0
      } else {
        scrollContainer.scrollLeft += scrollSpeed
      }
      animationId = requestAnimationFrame(scroll)
    }

    animationId = requestAnimationFrame(scroll)

    return () => cancelAnimationFrame(animationId)
  }, [isPaused])

  // Duplicate organizations for infinite scroll effect
  const duplicatedOrgs = [...organizations, ...organizations]

  return (
    <section className="py-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            Do These Organizations Have a Publishing Policy?
          </h2>
          <p className="text-sm text-gray-500">
            Click to view transparency status
          </p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-hidden px-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {duplicatedOrgs.map((org, index) => {
          const status = getStatusBadge(org.transparency_status)
          return (
            <button
              key={`${org.id}-${index}`}
              onClick={() => onOrganizationClick(org)}
              className="flex-shrink-0 bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:border-[#0074ff] hover:shadow-md transition-all cursor-pointer w-48"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 mb-3 relative bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={getLogoUrl(org)}
                    alt={`${org.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                    onError={(e) => {
                      // Fallback to first letter on error
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      target.parentElement!.innerHTML = `<span class="text-2xl font-bold text-gray-400">${org.name.charAt(0)}</span>`
                    }}
                  />
                </div>
                <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-1">
                  {org.name}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full ${status.className}`}>
                  {status.text}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      <p className="text-center text-xs text-gray-400 mt-4 px-4">
        Transparency status based on publicly available information. Organizations can{' '}
        <span className="text-[#0074ff]">claim their profile</span> to update their status.
      </p>
    </section>
  )
}
