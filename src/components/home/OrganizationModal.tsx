'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Organization {
  id: string
  name: string
  slug: string
  domain: string | null
  sector: string | null
  logo_url: string | null
  transparency_status: string | null
}

interface OrganizationModalProps {
  organization: Organization | null
  onClose: () => void
}

function getLogoUrl(org: Organization): string {
  if (org.logo_url) return org.logo_url
  if (org.domain) return `https://logo.clearbit.com/${org.domain}`
  return '/logo.svg'
}

function formatSector(sector: string | null): string {
  if (!sector) return 'Organization'
  return sector
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

export function OrganizationModal({ organization, onClose }: OrganizationModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!organization) return null

  const hasPolicy = organization.transparency_status === 'has_policy'
  const isClaimed = organization.transparency_status === 'claimed'

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            <Image
              src={getLogoUrl(organization)}
              alt={`${organization.name} logo`}
              width={48}
              height={48}
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                target.parentElement!.innerHTML = `<span class="text-2xl font-bold text-gray-400">${organization.name.charAt(0)}</span>`
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-gray-900 truncate">
              {organization.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {formatSector(organization.sector)}
            </p>
            {organization.domain && (
              <a
                href={`https://${organization.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0074ff] text-sm hover:underline"
              >
                {organization.domain}
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status */}
        <div className="mb-6">
          {hasPolicy ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Publishing Policy Available
              </div>
              <p className="text-green-700 text-sm">
                This organization has published their editorial standards and accountability framework.
              </p>
            </div>
          ) : isClaimed ? (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-800 font-medium mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                Profile Claimed
              </div>
              <p className="text-blue-700 text-sm">
                This organization has verified ownership but hasn&apos;t published a policy yet.
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-700 font-medium mb-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                No Known Publishing Policy
              </div>
              <p className="text-gray-600 text-sm">
                We haven&apos;t found a public publishing policy for this organization. If you represent {organization.name}, you can claim this profile.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {hasPolicy ? (
            <Link
              href={`/organization/${organization.slug}`}
              className="block w-full bg-[#0074ff] text-white text-center px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Publishing Policy
            </Link>
          ) : (
            <Link
              href={`/claim/${organization.slug}`}
              className="block w-full bg-[#0074ff] text-white text-center px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Claim This Organization
            </Link>
          )}
          <button
            onClick={onClose}
            className="block w-full border border-gray-300 text-gray-700 text-center px-4 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Status based on publicly available information as of {new Date().toLocaleDateString()}.
        </p>
      </div>
    </div>
  )
}
