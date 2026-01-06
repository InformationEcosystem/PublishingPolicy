import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const SECTOR_CATEGORIES = [
  {
    name: 'Media & Journalism',
    examples: 'Newsrooms, podcasts, newsletters',
    icon: '📰',
  },
  {
    name: 'Academic & Research',
    examples: 'Journals, universities, think tanks',
    icon: '🎓',
  },
  {
    name: 'Government & Public',
    examples: 'Agencies, municipalities, libraries',
    icon: '🏛️',
  },
  {
    name: 'Corporate & Professional',
    examples: 'PR, internal comms, associations',
    icon: '🏢',
  },
  {
    name: 'Platform & Technology',
    examples: 'Social platforms, forums, AI content',
    icon: '💻',
  },
  {
    name: 'Nonprofit & Advocacy',
    examples: 'Foundations, advocacy orgs',
    icon: '🤝',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Positive Framing */}
      <section className="bg-[#0074ff] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Define What You Stand For
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90">
            Every publisher needs a policy. Create yours in minutes.
          </p>
          <p className="text-lg mb-8 opacity-80">
            Your commitments. Your standards. Your accountability.
          </p>
          <Link
            href="/build"
            className="inline-block bg-white text-[#0074ff] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Build Your Publishing Policy
          </Link>
        </div>
      </section>

      {/* What You'll Define */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            What Your Audience Deserves to Know
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            When someone reads your content, they trust you. A publishing policy makes that trust explicit.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Your Identity</h3>
              <p className="text-gray-600">
                Who you are, who you serve, and what drives your publishing mission.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📝</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Your Commitments</h3>
              <p className="text-gray-600">
                How you verify sources, ensure accuracy, and maintain independence.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">⚖️</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Your Accountability</h3>
              <p className="text-gray-600">
                How you correct errors, receive feedback, and stay accountable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Malpublish Moment */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#0074ff]">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Then We Define What Violates Those Commitments
            </h2>
            <p className="text-gray-700 mb-4">
              Based on your commitments, we generate <strong>malpublishing definitions</strong> specific to your organization. If you commit to two-source verification, then publishing without it is malpublishing <em>for you</em>.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mt-4">
              <p className="text-sm text-gray-500 italic mb-2">
                &ldquo;Malpublish&rdquo; /mal-PUB-lish/ (verb)
              </p>
              <p className="text-gray-700">
                To publish in a manner that violates your own stated ethical standards.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Term coined March 2023 by Roarke Clinton
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Built for Every Sector
          </h2>
          <p className="text-center text-gray-600 mb-12">
            31 templates across 7 categories. Start with one designed for your industry.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {SECTOR_CATEGORIES.map((sector) => (
              <div
                key={sector.name}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#0074ff] transition-colors"
              >
                <span className="text-3xl mb-3 block">{sector.icon}</span>
                <h3 className="font-semibold text-lg">{sector.name}</h3>
                <p className="text-gray-500 text-sm">{sector.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon: Certification */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium mb-4">
            Coming Soon
          </span>
          <h2 className="text-3xl font-bold mb-4">
            Certification Tiers
          </h2>
          <p className="text-gray-600 mb-8">
            Move beyond self-declaration. Earn verification badges that show your audience you mean business.
          </p>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 mb-1">Declared</div>
              <p className="text-gray-500">Self-published policy</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="font-semibold text-gray-900 mb-1">Committed</div>
              <p className="text-gray-500">Public accountability</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-blue-200 border-2">
              <div className="font-semibold text-blue-700 mb-1">Verified</div>
              <p className="text-gray-500">Third-party review</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-amber-200 border-2">
              <div className="font-semibold text-amber-700 mb-1">Exemplary</div>
              <p className="text-gray-500">Industry leadership</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#0074ff] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Define Your Standards?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join organizations committed to transparent, accountable publishing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/build"
              className="bg-white text-[#0074ff] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Build Your Policy
            </Link>
            <Link
              href="/directory"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              View Directory
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
