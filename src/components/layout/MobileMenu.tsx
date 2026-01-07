'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-out drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-900">Menu</span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              About
            </Link>
            <Link
              href="/directory"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Directory
            </Link>
          </div>

          {/* CTA button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Link
              href="/build"
              onClick={onClose}
              className="block w-full bg-[#0074ff] text-white text-center px-4 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Build Your Policy
            </Link>
          </div>
        </nav>
      </div>
    </>
  )
}
