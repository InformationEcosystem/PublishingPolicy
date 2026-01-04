import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Malpublish</h3>
            <p className="text-gray-400 text-sm">
              Helping organizations define and commit to publishing ethics standards.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/directory" className="hover:text-white">Directory</Link></li>
              <li><Link href="/new" className="hover:text-white">Build Policy</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <a
              href="mailto:stopmalpublishing@gmail.com"
              className="text-[#64b4ff] hover:underline text-sm"
            >
              stopmalpublishing@gmail.com
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>Linguistic Innovation | Neologism</p>
          <p className="mt-2">Term coined by Roarke Clinton, March 2023</p>
        </div>
      </div>
    </footer>
  )
}
