import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-[#0074ff] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Want to champion a healthier information ecosystem?
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Let&apos;s go to work.
          </p>
          <Link
            href="/new"
            className="inline-block bg-white text-[#0074ff] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Build Your Publishing Policy
          </Link>
        </div>
      </section>

      {/* Definition Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border-l-4 border-[#0074ff]">
            <h2 className="text-3xl font-bold text-[#0074ff] mb-2">Malpublish</h2>
            <p className="text-gray-500 italic mb-4">/mal-PUB-lish/ (verb)</p>
            <p className="text-xl text-gray-700">
              &ldquo;To publish in a manner that constitutes malpractice&rdquo;
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Coined March 2023 by Roarke Clinton
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Define Your Publishing Ethics?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e6f0ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Clear Standards</h3>
              <p className="text-gray-600">
                Define what constitutes malpublishing for your organization.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e6f0ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Public Commitment</h3>
              <p className="text-gray-600">
                Show your audience you take publishing ethics seriously.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#e6f0ff] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Accountability</h3>
              <p className="text-gray-600">
                Create a framework for internal review and improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Built for Every Sector
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Start with a template designed for your industry
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'Newsroom', desc: 'News organizations and journalism outlets', icon: '📰' },
              { name: 'Academic Journal', desc: 'Research institutions and scholarly publishers', icon: '🎓' },
              { name: 'Corporate Communications', desc: 'PR departments and marketing teams', icon: '🏢' },
              { name: 'Platform Trust & Safety', desc: 'Social media and content platforms', icon: '🛡️' },
            ].map((sector) => (
              <div
                key={sector.name}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-[#0074ff] transition-colors"
              >
                <span className="text-3xl mb-3 block">{sector.icon}</span>
                <h3 className="font-semibold text-lg">{sector.name}</h3>
                <p className="text-gray-600 text-sm">{sector.desc}</p>
              </div>
            ))}
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
            Join organizations committed to ethical publishing practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/new"
              className="bg-white text-[#0074ff] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Building
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
