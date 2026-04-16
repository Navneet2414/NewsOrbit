'use client'

import { useState, useRef, useCallback, DragEvent, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { FiX, FiImage, FiMapPin, FiTag, FiSend, FiUpload, FiLoader } from 'react-icons/fi'
import 'react-quill-new/dist/quill.snow.css'
import { useUploadImageMutation } from '../../../features/journalist/JournalistApi'
import type { JournalistArticle } from '../../../features/journalist/JournalistApi'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const CATEGORIES = ['Crime', 'Politics', 'Events', 'Jobs']
const LOCATIONS  = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Jaipur', 'Ahmedabad', 'Surat']

const TOOLBAR = [
  [{ header: [1, 2, 3, 4, false] }],
  [{ font: [] }, { size: ['small', false, 'large', 'huge'] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],
  ['clean'],
]

export interface ArticlePayload {
  title: string
  summary: string
  content: string
  category: string
  city: string
  image: string
  imagekitFileId: string
}

interface Props {
  onClose: () => void
  onPublish: (article: ArticlePayload) => void
  editData?: JournalistArticle | null
}

export default function ArticleEditor({ onClose, onPublish, editData }: Props) {
  const [title, setTitle]           = useState(editData?.title ?? '')
  const [summary, setSummary]       = useState(editData?.summary ?? '')
  const [category, setCategory]     = useState(editData?.category ?? '')
  const [city, setCity]             = useState(editData?.city ?? '')
  const [coverImage, setCoverImage] = useState(editData?.image ?? '')
  const [coverFileId, setCoverFileId] = useState(editData?.imagekitFileId ?? '')
  const [isDragging, setIsDragging] = useState(false)
  const [coverUploading, setCoverUploading] = useState(false)
  const [content, setContent]       = useState(editData?.content ?? '')
  const [errors, setErrors]         = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)
  const quillRef = useRef<any>(null)

  const [uploadImage] = useUploadImageMutation()

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const uploadToImageKit = async (file: File, folder = 'newsorbit/covers') => {
    const base64 = await fileToBase64(file)
    const res = await uploadImage({ base64, fileName: file.name, folder }).unwrap()
    return res
  }

  const handleCoverFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return
    setCoverUploading(true)
    try {
      const res = await uploadToImageKit(file, 'newsorbit/covers')
      setCoverImage(res.url)
      setCoverFileId(res.fileId)
    } catch {
      setErrors((e) => ({ ...e, image: 'Image upload failed. Try again.' }))
    } finally {
      setCoverUploading(false)
    }
  }

  const onDragOver  = useCallback((e: DragEvent) => { e.preventDefault(); setIsDragging(true) }, [])
  const onDragLeave = useCallback(() => setIsDragging(false), [])
  const onDrop      = useCallback((e: DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const f = e.dataTransfer.files?.[0]
    if (f) handleCoverFile(f)
  }, [])

  // Intercept Quill image handler — upload to ImageKit, insert URL not base64
  useEffect(() => {
    const quill = quillRef.current?.getEditor?.()
    if (!quill) return
    const toolbar = quill.getModule('toolbar')
    toolbar.addHandler('image', () => {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = async () => {
        const file = input.files?.[0]
        if (!file) return
        try {
          const res = await uploadImage({
            base64: await fileToBase64(file),
            fileName: file.name,
            folder: 'newsorbit/content',
          }).unwrap()
          const range = quill.getSelection(true)
          quill.insertEmbed(range.index, 'image', res.url)
          quill.setSelection(range.index + 1)
        } catch {
          alert('Inline image upload failed.')
        }
      }
      input.click()
    })
  }, [quillRef.current])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!title.trim())                              e.title    = 'Headline is required.'
    if (!summary.trim())                            e.summary  = 'Summary is required.'
    if (!content.replace(/<[^>]*>/g, '').trim())   e.content  = 'Article content is required.'
    if (!category)                                  e.category = 'Select a category.'
    if (!city)                                    e.city     = 'Select a city.'
    if (!coverImage)                                e.image    = 'Cover image is required.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePublish = () => {
    if (!validate()) return
    onPublish({
      title: title.trim(),
      summary: summary.trim(),
      content,
      category,
      city,
      image: coverImage,
      imagekitFileId: coverFileId,
    })
    onClose()
  }

  return (
    <>
      <style>{`
        .ql-toolbar.ql-snow { border: none; border-bottom: 1px solid #f1f5f9; background: #f8fafc; padding: 10px 12px; flex-wrap: wrap; }
        .ql-container.ql-snow { border: none; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .ql-editor { min-height: 320px; font-size: 15px; line-height: 1.8; color: #1e293b; padding: 20px 24px; }
        .ql-editor.ql-blank::before { color: #94a3b8; font-style: normal; }
        .ql-editor h1 { font-size: 2em; font-weight: 700; color: #0f172a; margin: 0.75em 0 0.25em; }
        .ql-editor h2 { font-size: 1.5em; font-weight: 700; color: #0f172a; margin: 0.75em 0 0.25em; }
        .ql-editor h3 { font-size: 1.25em; font-weight: 600; color: #0f172a; margin: 0.75em 0 0.25em; }
        .ql-editor blockquote { border-left: 4px solid #10b981; background: #f0fdf4; padding: 10px 16px; margin: 1em 0; border-radius: 0 8px 8px 0; color: #374151; }
        .ql-editor pre { background: #1e293b; color: #e2e8f0; padding: 1em; border-radius: 8px; }
        .ql-editor img { max-width: 100%; border-radius: 12px; margin: 1em 0; }
        .ql-editor a { color: #0ea5e9; }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <div className="relative flex w-full max-w-4xl flex-col max-h-[94vh] overflow-hidden rounded-[28px] bg-white shadow-2xl">

          {/* Header */}
          <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-7 py-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">{editData ? 'Edit Article' : 'New Article'}</h2>
              <p className="text-xs text-gray-400">Fill in all fields · submitted for editorial review</p>
            </div>
            <button onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-2xl border border-gray-200 text-gray-400 hover:bg-gray-50 hover:text-gray-700">
              <FiX className="h-4 w-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-7 py-6 space-y-6">

            {/* Cover image */}
            <div>
              <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                <FiImage className="h-3.5 w-3.5" /> Cover Image
              </label>
              {coverImage ? (
                <div className="relative overflow-hidden rounded-2xl">
                  <img src={coverImage} alt="Cover" className="h-56 w-full object-cover" />
                  <button onClick={() => { setCoverImage(''); setCoverFileId('') }}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70">
                    <FiX className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                  onClick={() => !coverUploading && fileRef.current?.click()}
                  className={`flex h-48 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed transition ${
                    isDragging ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 bg-gray-50 hover:border-emerald-300 hover:bg-emerald-50/50'
                  }`}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    {coverUploading
                      ? <FiLoader className="h-6 w-6 text-emerald-500 animate-spin" />
                      : <FiUpload className={`h-6 w-6 ${isDragging ? 'text-emerald-500' : 'text-gray-400'}`} />}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700">
                      {coverUploading ? 'Uploading…' : isDragging ? 'Drop image here' : 'Drag & drop or click to upload'}
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG, WEBP — up to 10 MB</p>
                  </div>
                </div>
              )}
              <input ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverFile(f) }} />
              {errors.image && <p className="mt-1 text-xs text-red-500">{errors.image}</p>}
            </div>

            {/* Category + Location */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  <FiTag className="h-3.5 w-3.5" /> Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((c) => (
                    <button key={c} type="button" onClick={() => setCategory(c)}
                      className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                        category === c
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'border border-gray-200 bg-gray-50 text-gray-600 hover:border-emerald-300 hover:text-emerald-600'
                      }`}>
                      {c}
                    </button>
                  ))}
                </div>
                {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category}</p>}
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                  <FiMapPin className="h-3.5 w-3.5" /> City
                </label>
                <select value={city} onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100">
                  <option value="">Select city</option>
                  {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">Headline</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                placeholder="Write a compelling headline…"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-base font-semibold text-gray-900 outline-none placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
            </div>

            {/* Summary */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">
                Summary <span className="normal-case font-normal text-gray-400">(shown on news card)</span>
              </label>
              <textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={2}
                placeholder="Brief description shown on the news card preview…"
                className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none placeholder:text-gray-400 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
              />
              {errors.summary && <p className="mt-1 text-xs text-red-500">{errors.summary}</p>}
            </div>

            {/* Quill Editor */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-400">Article Content</label>
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={{ toolbar: TOOLBAR }}
                  placeholder="Start writing your article here…"
                />
              </div>
              {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex shrink-0 items-center justify-end gap-3 border-t border-gray-100 bg-white px-7 py-4">
            <button onClick={onClose}
              className="rounded-2xl border border-gray-200 px-6 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-50">
              Cancel
            </button>
            <button onClick={handlePublish} disabled={coverUploading}
              className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-500 active:scale-[0.98] disabled:opacity-60">
              <FiSend className="h-4 w-4" /> {editData ? 'Update Article' : 'Submit for Review'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
