'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  FiArrowLeft, FiBookmark, FiClock, FiEye, FiHeart,
  FiMessageCircle, FiMapPin, FiShare2, FiTwitter, FiFacebook, FiLink,
} from 'react-icons/fi'
import { useGetPublicNewsByIdQuery, useGetNewsByCategoryQuery } from '../../../../features/news/NewsApi'

// ── accents ───────────────────────────────────────────────────────────────────
const ACCENT: Record<string, { pill: string; border: string }> = {
  Politics: { pill: 'bg-sky-50 text-sky-700 ring-sky-200',             border: 'border-sky-500' },
  Crime:    { pill: 'bg-rose-50 text-rose-700 ring-rose-200',          border: 'border-rose-500' },
  Events:   { pill: 'bg-amber-50 text-amber-800 ring-amber-200',       border: 'border-amber-500' },
  Jobs:     { pill: 'bg-emerald-50 text-emerald-700 ring-emerald-200', border: 'border-emerald-500' },
}
const DA = { pill: 'bg-slate-50 text-slate-700 ring-slate-200', border: 'border-slate-400' }

// ── TOC ───────────────────────────────────────────────────────────────────────
interface H { id: string; text: string; level: number }

function buildToc(html: string): H[] {
  if (typeof window === 'undefined') return []
  const d = document.createElement('div')
  d.innerHTML = html
  const out: H[] = []
  d.querySelectorAll('h1,h2,h3,h4').forEach((el, i) => {
    out.push({ id: `h${i}`, text: el.textContent ?? '', level: +el.tagName[1] })
  })
  return out
}

function stampIds(html: string): string {
  if (typeof window === 'undefined') return html
  const d = document.createElement('div')
  d.innerHTML = html
  d.querySelectorAll('h1,h2,h3,h4').forEach((el, i) => { el.id = `h${i}` })
  return d.innerHTML
}

// ── Ad ────────────────────────────────────────────────────────────────────────
function Ad({ label, height = 250 }: { label: string; height?: number }) {
  return (
    <div
      style={{ height }}
      className="w-full rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center gap-1.5 shrink-0"
    >
      <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Advertisement</span>
      <span className="text-[10px] text-slate-300">{label}</span>
    </div>
  )
}

// ── TOC panel ─────────────────────────────────────────────────────────────────
function Toc({ items, active }: { items: H[]; active: string }) {
  if (!items.length) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Table of Contents</p>
      </div>
      <nav className="p-3">
        <ol className="space-y-0.5">
          {items.map((h, i) => (
            <li key={h.id} style={{ paddingLeft: `${(h.level - 1) * 10}px` }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }}
                className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-xs leading-snug transition ${
                  active === h.id ? 'bg-sky-50 font-semibold text-sky-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <span className="shrink-0 tabular-nums text-slate-300 mt-px">{String(i + 1).padStart(2, '0')}</span>
                <span className="line-clamp-2">{h.text}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}

// ── Related card ──────────────────────────────────────────────────────────────
function RelCard({ id, image, category, title, date, author }: {
  id: string; image: string; category: string; title: string; date: string; author: string
}) {
  const a = ACCENT[category] ?? DA
  return (
    <Link href={`/news/article/${id}`}
      className="group flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2.5 transition hover:border-slate-200 hover:bg-white hover:shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt={title} className="h-14 w-[72px] shrink-0 rounded-lg object-cover" />
      <div className="min-w-0">
        <span className={`inline-block mb-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest ring-1 ${a.pill}`}>{category}</span>
        <p className="text-xs font-semibold leading-snug text-slate-800 line-clamp-2 group-hover:text-sky-600 transition">{title}</p>
        <p className="mt-0.5 text-[10px] text-slate-400">{author} · {date}</p>
      </div>
    </Link>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router  = useRouter()

  const { data: article, isLoading, isError } = useGetPublicNewsByIdQuery(id)
  const { data: catPage } = useGetNewsByCategoryQuery(
    { page: 1, limit: 20, category: article?.category },
    { skip: !article?.category }
  )

  const [toc, setToc]           = useState<H[]>([])
  const [active, setActive]     = useState('')
  const [html, setHtml]         = useState('')
  const [copied, setCopied]     = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!article?.content) return
    const items = buildToc(article.content)
    setToc(items)
    setHtml(stampIds(article.content))
    if (items.length) setActive(items[0].id)
  }, [article?.content])

  useEffect(() => {
    if (!toc.length) return
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-10% 0px -80% 0px' }
    )
    toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [toc])

  const related = useMemo(() => {
    const allNews = catPage?.data ?? []
    return allNews.filter((n) => n._id !== id).slice(0, 6)
  }, [catPage?.data, id])
  const ac = ACCENT[article?.category ?? ''] ?? DA

  const copy = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }

  // ── states ──
  if (isLoading) return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-sky-200 border-t-sky-600" />
    </div>
  )

  if (isError || !article) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-2xl font-bold text-slate-800">Article not found</p>
      <p className="text-sm text-slate-500">This article may have been removed or the link is invalid.</p>
      <button onClick={() => router.back()}
        className="flex items-center gap-2 rounded-2xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500">
        <FiArrowLeft /> Go Back
      </button>
    </div>
  )

  const author = typeof article.authorId === 'object' ? article.authorId.name : 'NewsOrbit'
  const date   = new Date(article.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  const city   = article.city ?? ''

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6">

        {/* back */}
        <button onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50">
          <FiArrowLeft className="h-4 w-4" /> Back to News
        </button>

        {/*
          TRUE 3-COLUMN LAYOUT
          Each column is a separate grid cell — they NEVER share rows.
          Left and right are position:sticky inside their own cell.
          Center grows freely; ads are pinned to top and do not scroll with content.
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_260px] xl:grid-cols-[240px_1fr_280px] gap-6 items-start">

          {/* ══ LEFT COLUMN — TOC + Ads ══ */}
          <aside className="hidden lg:block">
            {/* sticky wrapper — only the sidebar sticks, not the whole column */}
            <div className="sticky top-6 flex flex-col gap-4">
              {/* TOC at top */}
              <Toc items={toc} active={active} />
              {/* Ads below TOC */}
              <Ad label="160 × 600" height={500} />
              <Ad label="160 × 250" height={250} />
            </div>
          </aside>

          {/* ══ CENTER COLUMN — Article ══ */}
          <article className="min-w-0 w-full">

            {/* Hero */}
            <div className="relative mb-8 overflow-hidden rounded-[28px] shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80'}
                alt={article.title}
                className="h-[380px] w-full object-cover sm:h-[460px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ring-1 ${ac.pill}`}>
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/70">
                    <FiMapPin className="h-3 w-3" /> {city}
                  </span>
                </div>
                <h1 className="text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
                  {article.title}
                </h1>
              </div>
            </div>

            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 font-bold">
                  {author[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{author}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="flex items-center gap-1"><FiClock className="h-3 w-3" />{date}</span>
                    <span className="flex items-center gap-1"><FiEye className="h-3 w-3" />{article.views ?? 0}</span>
                    <span className="flex items-center gap-1"><FiMessageCircle className="h-3 w-3" />{article.comments ?? 0}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-sky-50 hover:text-sky-500">
                  <FiTwitter className="h-3.5 w-3.5" />
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-blue-50 hover:text-blue-600">
                  <FiFacebook className="h-3.5 w-3.5" />
                </a>
                <button onClick={copy}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-500 transition hover:bg-slate-50">
                  <FiLink className="h-3 w-3" />{copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-amber-50 hover:text-amber-500">
                  <FiBookmark className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Summary */}
            {article.summary && (
              <div className={`mb-8 rounded-2xl border-l-4 ${ac.border} bg-white px-6 py-5 shadow-sm`}>
                <p className="text-base font-medium leading-8 text-slate-700 italic">{article.summary}</p>
              </div>
            )}

            {/* TOC mobile */}
            {toc.length > 0 && (
              <div className="mb-8 lg:hidden">
                <Toc items={toc} active={active} />
              </div>
            )}

            {/* Body */}
            <div
              ref={bodyRef}
              className="prose prose-slate prose-base max-w-none
                prose-headings:font-bold prose-headings:text-slate-900 prose-headings:scroll-mt-8
                prose-h2:text-xl prose-h2:mt-8 prose-h3:text-lg prose-h3:mt-6
                prose-p:leading-8 prose-p:text-slate-700
                prose-a:text-sky-600 prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-l-4 prose-blockquote:border-sky-400
                prose-blockquote:bg-sky-50/60 prose-blockquote:rounded-r-2xl
                prose-blockquote:px-5 prose-blockquote:py-3 prose-blockquote:not-italic prose-blockquote:text-slate-700
                prose-img:rounded-2xl prose-img:shadow-md prose-img:w-full
                prose-code:bg-slate-100 prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-rose-600
                prose-pre:bg-slate-900 prose-pre:rounded-2xl
                prose-li:text-slate-700 prose-strong:text-slate-900"
              dangerouslySetInnerHTML={{ __html: html || article.content }}
            />

            {/* Leaderboard ad inside article */}
            <div className="my-10">
              <Ad label="728 × 90 — Leaderboard" height={90} />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Tags:</span>
              {[article.category, city, 'NewsOrbit'].map((t) => (
                <span key={t} className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-50">
                  #{t}
                </span>
              ))}
            </div>

            {/* Author */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-50 text-sky-600 text-lg font-bold">
                {author[0]}
              </div>
              <div>
                <p className="font-bold text-slate-900">{author}</p>
                <p className="text-xs text-slate-400 mb-1.5">Staff Reporter · NewsOrbit</p>
                <p className="text-sm text-slate-600 leading-6">
                  Covering breaking news and in-depth stories across {city} and beyond.
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-6 mb-10 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-3.5 shadow-sm">
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <button className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-rose-50 hover:text-rose-500">
                  <FiHeart className="h-4 w-4" /> {article.views ?? 0}
                </button>
                <button className="flex items-center gap-1.5 rounded-xl px-3 py-2 transition hover:bg-sky-50 hover:text-sky-500">
                  <FiMessageCircle className="h-4 w-4" /> {article.comments ?? 0}
                </button>
              </div>
              <button className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                <FiShare2 className="h-4 w-4" /> Share
              </button>
            </div>

          </article>

          {/* ══ RIGHT COLUMN — Ads + Related ══ */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 flex flex-col gap-4">
              <Ad label="300 × 250" height={250} />
              <Ad label="300 × 250" height={250} />

              {related.length > 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">Related News</p>
                  <div className="space-y-2">
                    {related.map((n) => (
                      <RelCard
                        key={n._id} id={n._id}
                        image={n.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=80'}
                        category={n.category} title={n.title}
                        date={new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        author={typeof n.authorId === 'object' ? n.authorId.name : 'NewsOrbit'}
                      />
                    ))}
                  </div>
                </div>
              )}

              <Ad label="300 × 600" height={400} />
            </div>
          </aside>

        </div>
      </div>
    </div>
  )
}
