"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Archive,
  CheckCircle2,
  AlertTriangle,
  X,
  Package,
  Layers,
  Sparkles,
  Sliders,
  DollarSign,
  Tag,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminProductsPage() {
  const { products, categories, addProduct, updateProduct, archiveProduct } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    model: "",
    sku: "",
    brand: "Orbit",
    categoryId: "tvs",
    price: "",
    costPrice: "",
    stock: "",
    lowStockThreshold: 10,
    warrantyMonths: 24,
    description: "",
    image: "",
    status: "Active",
  });
  const [formErrors, setFormErrors] = useState({});

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.model && p.model.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCat = selectedCategory === "all" || p.categoryId === selectedCategory;
      const matchesStatus = statusFilter === "all" || p.status === statusFilter;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [products, searchQuery, selectedCategory, statusFilter]);

  function openCreateModal() {
    setEditingProduct(null);
    setFormData({
      name: "",
      model: "",
      sku: "",
      brand: "Orbit",
      categoryId: "tvs",
      price: "",
      costPrice: "",
      stock: "",
      lowStockThreshold: 10,
      warrantyMonths: 24,
      description: "",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
      status: "Active",
    });
    setFormErrors({});
    setModalOpen(true);
  }

  function openEditModal(prod) {
    setEditingProduct(prod);
    setFormData({
      name: prod.name || "",
      model: prod.model || "",
      sku: prod.sku || "",
      brand: prod.brand || "Orbit",
      categoryId: prod.categoryId || "tvs",
      price: prod.price ? String(prod.price) : "",
      costPrice: prod.costPrice ? String(prod.costPrice) : "",
      stock: prod.stock !== undefined ? String(prod.stock) : "",
      lowStockThreshold: prod.lowStockThreshold || 10,
      warrantyMonths: prod.warrantyMonths || 24,
      description: prod.description || "",
      image: prod.image || "",
      status: prod.status || "Active",
    });
    setFormErrors({});
    setModalOpen(true);
  }

  function validateForm() {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Product name is required.";
    if (!formData.sku.trim()) errors.sku = "SKU is required.";
    else {
      // Check SKU uniqueness
      const existing = products.find(
        (p) => p.sku.toLowerCase() === formData.sku.trim().toLowerCase() && p.id !== editingProduct?.id
      );
      if (existing) errors.sku = "SKU already exists in catalog.";
    }
    if (!formData.price || isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = "Enter a valid positive price.";
    }
    if (formData.costPrice && (isNaN(formData.costPrice) || Number(formData.costPrice) < 0)) {
      errors.costPrice = "Cost price must be numeric.";
    }
    if (formData.stock === "" || isNaN(formData.stock) || Number(formData.stock) < 0) {
      errors.stock = "Stock must be 0 or greater.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please resolve form validation errors.");
      return;
    }

    const payload = {
      name: formData.name.trim(),
      model: formData.model.trim(),
      sku: formData.sku.trim().toUpperCase(),
      brand: formData.brand.trim(),
      categoryId: formData.categoryId,
      price: Number(formData.price),
      costPrice: formData.costPrice ? Number(formData.costPrice) : Math.round(Number(formData.price) * 0.72),
      stock: Number(formData.stock),
      lowStockThreshold: Number(formData.lowStockThreshold),
      warrantyMonths: Number(formData.warrantyMonths),
      description: formData.description.trim(),
      image: formData.image.trim(),
      status: formData.status,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
    } else {
      addProduct(payload);
    }
    setModalOpen(false);
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Product Catalog</h1>
          <p className="text-xs text-text-muted mt-1">
            Manage electronic appliances, pricing, warranty terms, specifications, and variants.
          </p>
        </div>

        <Button onClick={openCreateModal} size="sm" className="gap-1.5 shadow-xs">
          <Plus className="h-4 w-4" /> Add New Appliance
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by appliance name, model, or SKU..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs text-text-muted">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs text-foreground focus:border-primary focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">Appliance</th>
                <th className="px-6 py-3 font-semibold">SKU & Model</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold text-right">Retail Price</th>
                <th className="px-6 py-3 font-semibold text-center">Stock</th>
                <th className="px-6 py-3 font-semibold">Warranty</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-text-muted">
                    No products found matching the criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const isLow = p.stock <= (p.lowStockThreshold || 10);
                  const isOut = p.stock === 0;
                  return (
                    <tr key={p.id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-border bg-surface-muted">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package className="h-5 w-5 text-text-muted m-auto mt-2.5" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-foreground truncate max-w-[200px]">
                              {p.name}
                            </div>
                            <div className="text-[11px] text-text-muted">{p.brand}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="font-mono text-foreground font-medium">{p.sku}</div>
                        <div className="text-[11px] text-text-muted">{p.model}</div>
                      </td>
                      <td className="px-6 py-3.5 capitalize text-text-muted">
                        {p.categoryId?.replace("-", " ")}
                      </td>
                      <td className="px-6 py-3.5 text-right font-bold text-foreground">
                        {p.price.toLocaleString()} ETB
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            isOut
                              ? "bg-danger-soft text-danger"
                              : isLow
                              ? "bg-warning-soft text-warning"
                              : "bg-success-soft text-success"
                          }`}
                        >
                          {p.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-text-muted">
                        {p.warrantyMonths ? `${p.warrantyMonths} Months` : "12 Months"}
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                            p.status === "Active"
                              ? "bg-success-soft text-success"
                              : "bg-surface-muted text-text-muted"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right space-x-1.5 whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => openEditModal(p)}
                        >
                          <Edit className="h-3 w-3 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs text-text-muted hover:text-danger"
                          onClick={() => archiveProduct(p.id)}
                          title="Toggle Archive"
                        >
                          <Archive className="h-3 w-3" />
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-3 border-t border-border bg-surface-muted/30 flex items-center justify-between text-xs text-text-muted">
          <span>Showing {filteredProducts.length} of {products.length} appliances</span>
          <span>Catalog changes reflect instantly across orders & inventory</span>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-surface shadow-2xl animate-in zoom-in-95 duration-150 my-8">
            <div className="flex items-center justify-between border-b border-border p-4 px-6">
              <h2 className="text-base font-bold text-foreground">
                {editingProduct ? `Edit Appliance: ${editingProduct.name}` : "Add New Electronic Appliance"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Appliance Title *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Orbit 65&quot; OLED 4K Smart TV"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.name && <span className="text-[11px] text-danger">{formErrors.name}</span>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">SKU Code *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    placeholder="e.g. ORB-TV-65-OLED"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 font-mono text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.sku && <span className="text-[11px] text-danger">{formErrors.sku}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Model Number</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    placeholder="e.g. OQ-65U9K"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Category</label>
                  <select
                    value={formData.categoryId}
                    onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Orbit"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Selling Price (ETB) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="85000"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.price && <span className="text-[11px] text-danger">{formErrors.price}</span>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Cost Price (ETB)</label>
                  <input
                    type="number"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    placeholder="62000"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.costPrice && <span className="text-[11px] text-danger">{formErrors.costPrice}</span>}
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Initial Stock Count *</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="25"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                  {formErrors.stock && <span className="text-[11px] text-danger">{formErrors.stock}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Reorder Threshold</label>
                  <input
                    type="number"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                    placeholder="10"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Warranty (Months)</label>
                  <input
                    type="number"
                    value={formData.warrantyMonths}
                    onChange={(e) => setFormData({ ...formData, warrantyMonths: e.target.value })}
                    placeholder="24"
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-foreground">Publication State</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Description & Key Selling Points</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe technical features, energy rating, and appliance benefits..."
                  className="w-full rounded-lg border border-border bg-surface p-3 text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  {editingProduct ? "Update Appliance" : "Save to Catalog"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
