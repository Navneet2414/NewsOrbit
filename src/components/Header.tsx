const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 text-lg font-semibold text-white shadow-lg">
          N
        </div>
        <div>
          <h1 className="text-lg font-semibold text-slate-900">NewsOrbit</h1>
          <p className="text-xs text-slate-500">Your city, your news</p>
        </div>
      </div>
      <nav className="hidden sm:block">
        <ul className="flex items-center gap-8 text-sm text-slate-600">
          {['Home', 'News', 'About', 'Contact'].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="transition hover:text-slate-900">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
