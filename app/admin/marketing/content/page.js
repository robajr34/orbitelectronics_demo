"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sliders,
  ArrowLeft,
  Plus,
  Eye,
  Trash2,
  Edit,
  CheckCircle2,
  Clock,
  X,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminContentPage() {
  const { banners, createBanner, updateBanner, deleteBanner } = useAdminStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    ctaText: "Explore Collection",
    ctaLink: "/products",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200",
    badge: "Special Showcase",
    status: "Published",
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "2026-12-31",
  });

  function openCreate() {
    setEditingBanner(null);
    setForm({
      title: "",
      subtitle: "",
      ctaText: "Explore Collection",
      ctaLink: "/products",
      imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200",
      badge: "Special Showcase",
      status: "Published",
      startDate: new Date().toISOString().slice(0, 10),
      endDate: "2026-12-31",
    });
    setModalOpen(true);
  }

  function openEdit(b) {
    setEditingBanner(b);
    setForm({
      title: b.title,
      subtitle: b.subtitle,
      ctaText: b.ctaText,
      ctaLink: b.ctaLink,
      imageUrl: b.imageUrl,
      badge: b.badge,
      status: b.status,
      startDate: b.startDate,
      endDate: b.endDate,
    });
    setModalOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please enter a banner headline.");
      return;
    }
    if (editingBanner) {
      updateBanner(editingBanner.id, form);
    } else {
      createBanner(form);
    }
    setModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/marketing">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Homepage Content & Merchandising
            </h1>
            <p className="text-xs text-text-muted mt-0.5">
              Hero banners, featured campaign slides, promotional badges, and visual marketing assets.
            </p>
          </div>
        </div>

        <Button size="sm" onClick={openCreate} className="gap-1.5 shadow-xs text-xs">
          <Plus className="h-4 w-4" /> Add Banner Slide
        </Button>
      </div>

      {/* Live Preview Box of First Banner */}
      {banners.length > 0 && (
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-primary">
              <Sparkles className="h-4 w-4" /> Live Hero Banner Preview (Storefront Rendering)
            </span>
            <span className="text-[11px] font-normal text-text-muted">Slide #1 Active</span>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-slate-900 text-white min-h-[220px] sm:min-h-[260px] flex items-center p-6 sm:p-10 shadow-lg">
            <img
              src={banners[0].imageUrl}
              alt="Banner background"
              className="absolute inset-0 h-full w-full object-cover opacity-35"
            />
            <div className="relative z-10 max-w-lg space-y-2">
              <span className="inline-block rounded-full bg-primary px-3 py-0.5 text-[11px] font-bold text-white shadow-xs">
                {banners[0].badge}
              </span>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                {banners[0].title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 line-clamp-2">
                {banners[0].subtitle}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-slate-900 shadow-sm">
                  {banners[0].ctaText} <ExternalLink className="h-3 w-3" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Banner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {banners.map((b) => (
          <div
            key={b.id}
            className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm flex flex-col justify-between hover:border-primary transition-all"
          >
            <div className="relative h-36 bg-surface-muted overflow-hidden">
              <img src={b.imageUrl} alt={b.title} className="h-full w-full object-cover" />
              <div className="absolute top-2 right-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold shadow-xs ${
                    b.status === "Published"
                      ? "bg-success text-white"
                      : "bg-surface-muted text-text-muted border border-border"
                  }`}
                >
                  {b.status}
                </span>
              </div>
              <div className="absolute bottom-2 left-2">
                <span className="rounded-md bg-black/70 backdrop-blur-xs px-2 py-0.5 text-[10px] font-semibold text-white">
                  {b.badge}
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2 text-xs flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground line-clamp-1">{b.title}</h3>
                <p className="text-text-muted text-xs line-clamp-2 mt-1 leading-relaxed">
                  {b.subtitle}
                </p>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between text-text-muted">
                <span className="text-[11px] font-medium text-primary">
                  Link: {b.ctaLink}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs"
                    onClick={() => openEdit(b)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-danger hover:bg-danger-soft"
                    onClick={() => deleteBanner(b.id)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Banner Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">
                {editingBanner ? "Edit Homepage Banner" : "Create Hero Banner Slide"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="p-1 text-text-muted hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-foreground">Main Headline *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Next-Gen 8K OLED Showcase"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Subtitle / Pitch</label>
                <input
                  type="text"
                  value={form.subtitle}
                  onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                  placeholder="e.g. Revolutionary HDR contrast with 120Hz gaming support"
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Badge Label</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    placeholder="New Release 2026"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Publication Status</label>
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

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">CTA Button Text</label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    placeholder="Shop QLED TVs"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">CTA Target Link</label>
                  <input
                    type="text"
                    value={form.ctaLink}
                    onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                    placeholder="/products?category=tvs"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Hero Image URL</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  {editingBanner ? "Update Banner" : "Publish Slide"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
