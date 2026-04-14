const Hero: React.FC = () => {
  return (
    <section
      className="relative mb-10 min-h-[260px] overflow-hidden rounded-[32px] bg-cover bg-center text-white shadow-2xl sm:min-h-[420px] lg:min-h-[280px] xl:min-h-[220px]"
      style={{
        backgroundImage: "url('/images/maincomponent.png')"
      }}
    >
      <div className="absolute inset-0 bg-slate-950/80" />
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-2xl">
          {/* <div className="mb-6 flex flex-wrap items-center gap-3 rounded-full bg-white/10 p-3 text-sm text-slate-200 shadow-sm backdrop-blur-sm">
            <span className="rounded-full bg-sky-500/20 px-3 py-1 font-semibold uppercase tracking-[0.24em] text-sky-200">
              All Cities
            </span>
            <button type="button" className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs text-white transition hover:bg-white/20">
              Select city
            </button>
          </div> */}

          <div className="mb-8 space-y-4">
            <p className="text-sm uppercase tracking-[0.32em] text-sky-300">Breaking stories from</p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              All Cities
            </h1>
            <p className="max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Stay informed with real-time local news, curated for your city.
            </p>
          </div>
        </div>

        {/* <div className="grow">
          <div className="rounded-[32px] border border-white/10 bg-slate-900/70 p-4 shadow-xl backdrop-blur-sm sm:p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                type="search"
                placeholder="Search news..."
                className="w-full rounded-full border border-white/20 bg-slate-950/80 px-4 py-3 text-white placeholder:text-slate-300 outline-none transition focus:border-sky-300"
              />
              <button type="button" className="inline-flex shrink-0 items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400">
                Search
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  )
}

export default Hero
