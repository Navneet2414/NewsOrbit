import Image from 'next/image'
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi'

const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-12 overflow-hidden rounded-[32px] border border-slate-200 bg-white text-slate-700 shadow-xl">
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 px-8 py-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_1.1fr]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
                <Image
                  src="/newsorbit_logo.png"
                  alt="NewsOrbit"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-cover"
                />
              </span>
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">NewsOrbit</h3>
                <p className="text-sm text-slate-500">Your city, your news</p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-600">
              Stay informed with curated local stories, breaking updates, and trending headlines across categories.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >
                Download App
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500"
              >
                Sign In
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Quick Links</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {['Home', 'News', 'About', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-slate-600 transition hover:text-slate-900"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Categories</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {['Crime', 'Politics', 'Events', 'Jobs'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-slate-600 transition hover:text-slate-900">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Follow Us</h4>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                aria-label="Follow on Facebook"
              >
                <FiFacebook className="h-4 w-4" />
                Facebook
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                aria-label="Follow on Twitter"
              >
                <FiTwitter className="h-4 w-4" />
                Twitter
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
                aria-label="Follow on Instagram"
              >
                <FiInstagram className="h-4 w-4" />
                Instagram
              </a>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">Get updates</p>
              <p className="mt-1 text-sm text-slate-500">Weekly highlights in your inbox.</p>
              <div className="mt-3 flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-sky-300"
                />
                <button
                  type="button"
                  className="shrink-0 rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 px-8 py-5">
        <div className="flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} NewsOrbit. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#" className="transition hover:text-slate-900">
              Privacy
            </a>
            <a href="#" className="transition hover:text-slate-900">
              Terms
            </a>
            <a href="#" className="transition hover:text-slate-900">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
