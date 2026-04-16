"use client";

import { useState } from "react";
import { FileText, Heart, MessageCircle, Eye, Plus, BarChart2, Pencil } from "lucide-react";
import ArticleEditor, { ArticlePayload } from "./ArticleEditor";
import NewsCard from "../../../components/NewsCard";
import { NewsItem } from "../../../types/news";
import {
  useGetMyArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  type JournalistArticle,
} from "../../../features/journalist/JournalistApi";

type Tab = "Overview" | "My Articles";
type Status = "approved" | "pending" | "rejected";

const statusStyles: Record<Status, string> = {
  approved: "bg-blue-600 text-white",
  pending:  "bg-yellow-400 text-white",
  rejected: "bg-red-500 text-white",
};

const articleToNewsItem = (a: JournalistArticle): NewsItem => ({
  id:        a._id,
  category:  a.category,
  title:     a.title,
  summary:   a.summary,
  image:     a.image,
  author:    "",
  location:  a.city,
  timeLabel: new Date(a.createdAt).toLocaleDateString(),
  views:     a.views ?? 0,
  comments:  a.comments ?? 0,
  shares:    0,
});

export default function JournalistDashboard() {
  const [activeTab, setActiveTab]   = useState<Tab>("Overview");
  const [showEditor, setShowEditor] = useState(false);
  const [editTarget, setEditTarget] = useState<JournalistArticle | null>(null);
 
  const { data: articles = [], isLoading } = useGetMyArticlesQuery();
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const handlePublish = async (payload: ArticlePayload) => {
    if (editTarget) {
      await updateArticle({ id: editTarget._id, ...payload });
    } else {
      await createArticle(payload);
    }
    setEditTarget(null);
    setShowEditor(false);
  };

  const openEdit = (article: JournalistArticle) => {
    setEditTarget(article);
    setShowEditor(true);
  };

  const totalLikes    = articles.reduce((s, a) => s + (a.likes ?? 0), 0);
  const totalComments = articles.reduce((s, a) => s + (a.comments ?? 0), 0);
  const totalViews    = articles.reduce((s, a) => s + (a.views ?? 0), 0);

  const stats = [
    { label: "Total Articles", value: articles.length, icon: FileText,       iconBg: "bg-blue-50",   iconColor: "text-blue-500" },
    { label: "Total Likes",    value: totalLikes,       icon: Heart,          iconBg: "bg-red-50",    iconColor: "text-red-400" },
    { label: "Comments",       value: totalComments,    icon: MessageCircle,  iconBg: "bg-green-50",  iconColor: "text-green-500" },
    { label: "Total Views",    value: totalViews,       icon: Eye,            iconBg: "bg-purple-50", iconColor: "text-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {showEditor && (
        <ArticleEditor
          onClose={() => { setShowEditor(false); setEditTarget(null); }}
          onPublish={handlePublish}
          editData={editTarget}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
            <FileText size={26} className="text-emerald-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Journalist Dashboard</h1>
            <p className="text-gray-500 text-sm mt-0.5">Write, manage and track your articles.</p>
          </div>
        </div>
        <button onClick={() => { setEditTarget(null); setShowEditor(true); }}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm shadow-sm">
          <Plus size={18} strokeWidth={2.5} /> New Article
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6">
        {(["Overview", "My Articles"] as Tab[]).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all ${
              activeTab === tab
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-gray-600 border border-gray-200 hover:border-emerald-200 hover:text-emerald-600"
            }`}>
            {tab === "Overview" ? <BarChart2 size={15} /> : <FileText size={15} />}{tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {stats.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
              <div key={label} className="bg-white border border-gray-200 rounded-2xl px-6 py-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
                  <p className="text-gray-500 text-xs mt-1">{label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Recent articles list */}
          <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5 mb-8">
            <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">Recent Articles</h2>
            {isLoading && <p className="text-sm text-gray-400">Loading…</p>}
            {articles.slice(0, 5).map((a, i) => (
              <div key={a._id} className={`flex items-center justify-between py-3 ${i !== Math.min(articles.length, 5) - 1 ? "border-b border-gray-100" : ""}`}>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{a.title}</p>
                  <div className="flex items-center gap-4 text-gray-400 text-xs">
                    <span className="flex items-center gap-1"><Heart size={12} />{a.likes ?? 0}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={12} />{a.comments ?? 0}</span>
                    <span className="flex items-center gap-1"><Eye size={12} />{a.views ?? 0}</span>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[(a.status as Status) ?? "pending"]}`}>
                  {a.status ?? "pending"}
                </span>
              </div>
            ))}
          </div>

          {/* News cards */}
          {articles.length > 0 && (
            <div>
              <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">Your Published Cards</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((a) => (
                  <NewsCard key={a._id} item={articleToNewsItem(a)} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {activeTab === "My Articles" && (
        <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
          <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-widest mb-5">My Articles</h2>
          {isLoading && <p className="text-sm text-gray-400">Loading…</p>}
          {articles.map((a, i) => (
            <div key={a._id} className={`flex items-center justify-between py-3 ${i !== articles.length - 1 ? "border-b border-gray-100" : ""}`}>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">{a.title}</p>
                <div className="flex items-center gap-4 text-gray-400 text-xs">
                  <span className="flex items-center gap-1"><Heart size={12} />{a.likes ?? 0}</span>
                  <span className="flex items-center gap-1"><Eye size={12} />{a.views ?? 0}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => openEdit(a)}
                  className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                  <Pencil size={11} /> Edit
                </button>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusStyles[(a.status as Status) ?? "pending"]}`}>
                  {a.status ?? "pending"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
