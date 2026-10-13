"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  X,
  FileText,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminKnowledgeBasePage() {
  const { knowledgeBase, createArticle, updateArticle, deleteArticle } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "Television & Gaming",
    status: "Published",
    author: "Tewodros K.",
    content: "",
  });

  const categories = [
    "Television & Gaming",
    "Refrigeration",
    "Air Conditioning",
    "Washing Machines",
    "Warranty & Policy",
  ];

  const filtered = knowledgeBase.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      (a.content && a.content.toLowerCase().includes(q))
    );
  });

  function openCreate() {
    setEditingArticle(null);
    setForm({
      title: "",
      category: "Television & Gaming",
      status: "Published",
      author: "Tewodros K.",
      content: "",
    });
    setModalOpen(true);
  }

  function openEdit(art) {
    setEditingArticle(art);
    setForm({
      title: art.title,
      category: art.category,
      status: art.status,
      author: art.author,
      content: art.content || "",
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Title and content are required.");
      return;
    }
    if (editingArticle) {
      updateArticle(editingArticle.id, form);
    } else {
      createArticle(form);
    }
    setModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/support">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Customer Knowledge Base & Self-Help
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Troubleshooting documentation, appliance operating manuals, and technical setup articles.
            </p>
          </div>
        </div>

        <Button size="sm" onClick={openCreate} className="gap-1.5 shadow-xs text-xs">
          <Plus className="h-4 w-4" /> New Help Article
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search article title, instructions, or category..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((art) => (
          <div
            key={art.id}
            className="rounded-xl border border-border bg-surface p-5 shadow-sm flex flex-col justify-between hover:border-primary transition-all space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="rounded-full bg-primary-soft text-primary px-2 py-0.5 text-[10px] font-bold">
                  {art.category}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    art.status === "Published"
                      ? "bg-success-soft text-success"
                      : "bg-surface-muted text-text-muted"
                  }`}
                >
                  {art.status}
                </span>
              </div>
              <h3 className="font-bold text-sm text-foreground leading-snug">{art.title}</h3>
              <p className="mt-2 text-xs text-text-muted line-clamp-3 leading-relaxed">
                {art.content}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-text-muted">
              <div className="flex items-center gap-1.5 text-[11px]">
                <Eye className="h-3.5 w-3.5 text-text-faint" />
                <span>{art.views || 0} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs"
                  onClick={() => openEdit(art)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-danger hover:bg-danger-soft"
                  onClick={() => deleteArticle(art.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Article Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">
                {editingArticle ? "Edit Help Article" : "Create Help Article"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Article Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Setting Up Orbit 120Hz VRR on Gaming Consoles"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-2.5 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Article Body & Guide *</label>
                <textarea
                  rows={6}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Provide step-by-step instructions for customers..."
                  className="w-full rounded-lg border border-border bg-surface p-3 text-foreground leading-relaxed focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  {editingArticle ? "Update Article" : "Publish Article"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
