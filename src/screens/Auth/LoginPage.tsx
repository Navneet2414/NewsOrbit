'use client'

import { useState } from 'react'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft, FiZap, FiLoader } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import Image from 'next/image'
import Link from 'next/link'

const DEMO = [
  { role: 'Admin',      email: 'admin@newsorbit.com',  pass: 'NewsOrbit@12345', color: 'text-red-400',     dot: 'bg-red-400' },
  { role: 'Journalist', email: 'priya@newsorbit.com',  pass: 'NewsOrbit@12345', color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { role: 'User',       email: 'user@newsorbit.com',   pass: 'NewsOrbit@12345', color: 'text-sky-400',     dot: 'bg-sky-400' },
]

// Kept for future use in the (currently commented) feature list UI.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FEATURES = [
  { icon: '📰', text: 'Breaking local news, delivered instantly' },
  { icon: '🔒', text: 'Secure, role-based access for every user' },
  { icon: '🌆', text: 'Hyperlocal coverage across every city' },
  { icon: '⚡', text: 'Real-time trending stories & live updates' },
]
void FEATURES

export default function LoginPage({ onSuccess }: { onSuccess?: () => void }) {
  const { loginWithCredentials } = useAuth()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginWithCredentials(email.trim(), password)
      onSuccess?.()
    } catch (err: unknown) {
      const fallback = 'Invalid email or password. Please try again.'
      if (err instanceof Error) setError(err.message || fallback)
      else if (typeof err === 'string') setError(err || fallback)
      else if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: unknown }).message === 'string') {
        setError((err as { message: string }).message || fallback)
      } else {
        setError(fallback)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">

      {/* ── Left branding panel ── */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-950 px-14 py-12 lg:flex">

        {/* Ambient blobs */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-sky-600/15 blur-[140px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-indigo-700/20 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[80px]" />

        {/* Top — site badge */}
        <div className="relative flex items-center gap-2">
          <FiZap className="h-4 w-4 text-sky-400" />
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">NewsOrbit Platform</span>
        </div>

        {/* Centre — logo + headline */}
        <div className="relative flex flex-col items-center text-center space-y-8">
          {/* Logo centred */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-[28px] bg-sky-500/20 blur-xl" />
              <span className="relative inline-flex h-24 w-24 items-center justify-center overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-sky-500/30">
                <Image src="/newsorbit_logo.png" alt="NewsOrbit — Local News Platform" width={96} height={96} className="h-24 w-24 object-cover" priority />
              </span>
            </div>
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white">newsOrbit</h1>
              <p className="mt-1 text-sm font-medium tracking-widest text-sky-400/80 uppercase">Your City · Your News · Your Voice</p>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-3 max-w-sm">
            <h2 className="text-2xl font-bold leading-snug text-white">
              India&apos;s Most Trusted<br />
              <span className="text-sky-400">Hyperlocal News Network</span>
            </h2>
            <p className="text-sm leading-7 text-slate-400">
              From breaking crime reports to political developments, cultural events, and career opportunities — NewsOrbit keeps you informed, always.
            </p>
          </div>

          {/* Feature list */}
          {/* <div className="w-full max-w-xs space-y-3 text-left">
            {FEATURES.map((f) => (
              <div key={f.text} className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3">
                <span className="text-base">{f.icon}</span>
                <span className="text-xs font-medium text-slate-300">{f.text}</span>
              </div>
            ))}
          </div> */}
        </div>

        {/* Bottom — back to home */}
        <div className="relative">
          <Link href="/"
            className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <FiArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* ── Right login form ── */}
      <div className="flex w-full flex-col items-center justify-center bg-slate-100 px-6 py-12 lg:w-1/2">

        {/* Mobile logo + home */}
        <div className="mb-8 flex w-full max-w-md items-center justify-between lg:hidden">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white shadow">
              <Image src="/newsorbit_logo.png" alt="NewsOrbit" width={40} height={40} className="h-10 w-10 object-cover" />
            </span>
            <span className="text-lg font-bold text-slate-900">newsOrbit</span>
          </div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800">
            <FiArrowLeft className="h-3.5 w-3.5" /> Home
          </Link>
        </div>

        <div className="w-full max-w-md">

          {/* Header */}
          <div className="mb-8 text-center">
            {/* Logo centred above heading on desktop */}
            <div className="mb-5 hidden lg:flex justify-center">
              <span className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-[20px] bg-white shadow-lg shadow-slate-200">
                <Image src="/newsorbit_logo.png" alt="NewsOrbit" width={64} height={64} className="h-16 w-16 object-cover" />
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Sign In to NewsOrbit</h2>
            <p className="mt-2 text-sm text-slate-500">
              Access breaking news, exclusive reports & your personalised news feed.
            </p>
          </div>

          {/* Quick login */}
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Quick Access — Select a Role</p>
            <div className="space-y-2">
              {DEMO.map((c) => (
                <button key={c.role} type="button"
                  onClick={() => { setEmail(c.email); setPassword(c.pass); setError('') }}
                  className="flex w-full items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-left transition hover:border-sky-200 hover:bg-sky-50"
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
                  <span className={`text-xs font-bold uppercase tracking-widest ${c.color}`}>{c.role}</span>
                  <span className="ml-auto text-xs text-slate-400">{c.email}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="email" value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="Enter your email address" required
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type={showPass ? 'text' : 'password'} value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="Enter your password" required
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
              />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                {showPass ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-2.5 text-xs font-medium text-red-500 border border-red-100">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="w-full rounded-2xl bg-sky-600 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-sky-500 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading && <FiLoader className="h-4 w-4 animate-spin" />}
              {loading ? 'Signing in…' : 'Sign In to Your Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400">
            By signing in, you agree to NewsOrbit&apos;s{' '}
            <span className="cursor-pointer text-sky-500 hover:underline">Terms of Service</span>{' '}
            and{' '}
            <span className="cursor-pointer text-sky-500 hover:underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  )
}
