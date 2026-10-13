"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Boxes,
  AlertTriangle,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  X,
  FileSpreadsheet,
  Edit2,
  DollarSign,
  TrendingDown,
} from "lucide-react";
import { useAdminStore } from "@/lib/adminStore";
import { calculateInventoryMetrics } from "@/lib/calculations";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminInventoryPage() {
  const { products, adjustStock, bulkImportProducts } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterMode, setFilterMode] = useState("all"); // 'all', 'low', 'out'
  const [stockModalProduct, setStockModalProduct] = useState(null);
  const [newStockValue, setNewStockValue] = useState("");
  const [adjustReason, setAdjustReason] = useState("Warehouse Inward Restock");

  // CSV Import Modal
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [parsedRows, setParsedRows] = useState([]);
  const [importErrors, setImportErrors] = useState([]);

  // Metrics
  const metrics = useMemo(() => calculateInventoryMetrics(products), [products]);

  // Filtered List
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        (p.model && p.model.toLowerCase().includes(q));

      const stock = Number(p.stock) || 0;
      const threshold = Number(p.lowStockThreshold) || 10;

      if (filterMode === "low") {
        return matchesSearch && stock <= threshold && stock > 0;
      }
      if (filterMode === "out") {
        return matchesSearch && stock === 0;
      }
      return matchesSearch;
    });
  }, [products, searchQuery, filterMode]);

  // Handle stock adjustment submit
  function handleStockSubmit(e) {
    e.preventDefault();
    if (!stockModalProduct || newStockValue === "" || isNaN(newStockValue)) {
      toast.error("Please enter a valid stock integer.");
      return;
    }
    adjustStock(stockModalProduct.id, Number(newStockValue), adjustReason);
    setStockModalProduct(null);
  }

  // Export CSV
  function handleExportCsv() {
    const headers = ["SKU", "Appliance Name", "Category", "Current Stock", "Reserved Stock", "Available Stock", "Reorder Threshold", "Unit Price (ETB)", "Inventory Valuation (ETB)"];
    const rows = filteredProducts.map((p) => {
      const current = Number(p.stock) || 0;
      const reserved = Number(p.reservedStock) || 0;
      const available = Math.max(0, current - reserved);
      const val = current * (p.price || 0);
      return [
        p.sku,
        `"${p.name}"`,
        p.categoryId,
        current,
        reserved,
        available,
        p.lowStockThreshold || 10,
        p.price || 0,
        val,
      ];
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orbit_inventory_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Inventory exported to CSV.");
  }

  // Parse CSV Text
  function parseCsvContent(raw) {
    const lines = raw.trim().split("\n");
    if (lines.length < 2) {
      setImportErrors(["CSV must contain at least a header row and one data row."]);
      setParsedRows([]);
      return;
    }

    const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const reqHeaders = ["name", "sku", "category", "price", "stock"];
    const missing = reqHeaders.filter((rh) => !headers.includes(rh));

    if (missing.length > 0) {
      setImportErrors([`Missing required header columns: ${missing.join(", ")}`]);
      setParsedRows([]);
      return;
    }

    const rows = [];
    const errors = [];
    const existingSkus = new Set(products.map((p) => p.sku.toLowerCase()));
    const newSkus = new Set();

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const cols = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
      const rowObj = {};
      headers.forEach((h, idx) => {
        rowObj[h] = cols[idx] || "";
      });

      // Validation
      const rowNum = i + 1;
      if (!rowObj.name) errors.push(`Row ${rowNum}: Missing product name`);
      if (!rowObj.sku) errors.push(`Row ${rowNum}: Missing SKU`);
      else {
        const skuLower = rowObj.sku.toLowerCase();
        if (existingSkus.has(skuLower) || newSkus.has(skuLower)) {
          errors.push(`Row ${rowNum}: Duplicate SKU "${rowObj.sku}"`);
        }
        newSkus.add(skuLower);
      }

      if (isNaN(rowObj.price) || Number(rowObj.price) <= 0) errors.push(`Row ${rowNum}: Invalid price "${rowObj.price}"`);
      if (isNaN(rowObj.stock) || Number(rowObj.stock) < 0) errors.push(`Row ${rowNum}: Invalid stock count "${rowObj.stock}"`);

      rows.push({
        name: rowObj.name,
        sku: (rowObj.sku || "").toUpperCase(),
        categoryId: rowObj.category || "tvs",
        brand: rowObj.brand || "Orbit",
        price: Number(rowObj.price) || 0,
        costPrice: Math.round((Number(rowObj.price) || 0) * 0.72),
        stock: Number(rowObj.stock) || 0,
        lowStockThreshold: Number(rowObj.threshold) || 10,
        status: "Active",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
      });
    }

    setImportErrors(errors);
    setParsedRows(rows);
  }

  function handleApplyImport() {
    if (importErrors.length > 0) {
      toast.error("Resolve CSV errors before importing.");
      return;
    }
    if (parsedRows.length === 0) {
      toast.error("No valid rows to import.");
      return;
    }
    bulkImportProducts(parsedRows);
    setImportModalOpen(false);
    setCsvText("");
    setParsedRows([]);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Inventory & Stock Control
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Real-time physical stock counts, warehouse reservations, replenishment thresholds, and CSV ingestion.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={() => setImportModalOpen(true)}
          >
            <Upload className="h-4 w-4" /> Import CSV
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 text-xs"
            onClick={handleExportCsv}
          >
            <Download className="h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Highlights Bar */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Total Catalog SKUs</div>
          <div className="mt-2 text-2xl font-bold text-foreground">{metrics.totalProducts}</div>
          <div className="mt-1 text-xs text-text-muted">{metrics.totalStockUnits} total units in stock</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-text-muted tracking-wider">Inventory Valuation</div>
          <div className="mt-2 text-2xl font-bold text-primary">
            {metrics.totalInventoryValuation.toLocaleString()} ETB
          </div>
          <div className="mt-1 text-xs text-text-muted">Based on weighted cost basis</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-warning tracking-wider flex items-center gap-1.5">
            <AlertTriangle className="h-4 w-4" /> Low Stock Items
          </div>
          <div className="mt-2 text-2xl font-bold text-warning">{metrics.lowStockCount}</div>
          <div className="mt-1 text-xs text-text-muted">Units &le; configured threshold</div>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <div className="text-xs font-semibold uppercase text-danger tracking-wider">Out of Stock</div>
          <div className="mt-2 text-2xl font-bold text-danger">{metrics.outOfStockCount}</div>
          <div className="mt-1 text-xs text-text-muted">Zero physical availability</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-xl border border-border bg-surface p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search appliance by SKU or title..."
            className="w-full rounded-lg border border-border bg-surface pl-9 pr-3 py-2 text-xs text-foreground placeholder:text-text-muted focus:border-primary focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 self-end sm:self-auto">
          {[
            { id: "all", label: `All Items (${products.length})` },
            { id: "low", label: `Low Stock (${metrics.lowStockCount})` },
            { id: "out", label: `Out of Stock (${metrics.outOfStockCount})` },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setFilterMode(btn.id)}
              className={`rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                filterMode === btn.id
                  ? "bg-primary text-white font-semibold"
                  : "bg-surface-muted text-text-muted hover:text-foreground"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-xl border border-border bg-surface shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-muted text-text-muted uppercase text-[11px] border-b border-border">
              <tr>
                <th className="px-6 py-3 font-semibold">SKU & Code</th>
                <th className="px-6 py-3 font-semibold">Appliance Description</th>
                <th className="px-6 py-3 font-semibold">Category</th>
                <th className="px-6 py-3 font-semibold text-center">Physical Stock</th>
                <th className="px-6 py-3 font-semibold text-center">Reserved</th>
                <th className="px-6 py-3 font-semibold text-center">Available</th>
                <th className="px-6 py-3 font-semibold text-center">Reorder Point</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-text-muted">
                    No inventory records match the current filters.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const stock = Number(p.stock) || 0;
                  const reserved = Number(p.reservedStock) || 0;
                  const available = Math.max(0, stock - reserved);
                  const threshold = Number(p.lowStockThreshold) || 10;
                  const isOut = stock === 0;
                  const isLow = stock <= threshold && !isOut;

                  return (
                    <tr key={p.id} className="hover:bg-surface-muted/50 transition-colors">
                      <td className="px-6 py-3.5 font-mono font-semibold text-foreground">
                        {p.sku}
                      </td>
                      <td className="px-6 py-3.5">
                        <div className="font-semibold text-foreground">{p.name}</div>
                        <div className="text-[11px] text-text-muted">{p.model}</div>
                      </td>
                      <td className="px-6 py-3.5 capitalize text-text-muted">
                        {p.categoryId?.replace("-", " ")}
                      </td>
                      <td className="px-6 py-3.5 text-center font-bold text-foreground">
                        {stock}
                      </td>
                      <td className="px-6 py-3.5 text-center text-text-muted">
                        {reserved}
                      </td>
                      <td className="px-6 py-3.5 text-center font-bold text-primary">
                        {available}
                      </td>
                      <td className="px-6 py-3.5 text-center text-text-muted">
                        {threshold}
                      </td>
                      <td className="px-6 py-3.5">
                        {isOut ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-danger-soft px-2 py-0.5 text-[10px] font-bold text-danger">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-warning-soft px-2 py-0.5 text-[10px] font-bold text-warning">
                            <AlertTriangle className="h-3 w-3" /> Low Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-0.5 text-[10px] font-bold text-success">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => {
                            setStockModalProduct(p);
                            setNewStockValue(String(p.stock));
                          }}
                        >
                          <Edit2 className="h-3 w-3 mr-1" /> Adjust Stock
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adjust Stock Modal */}
      {stockModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="text-base font-bold text-foreground">
                Adjust Physical Stock Count
              </h2>
              <button
                onClick={() => setStockModalProduct(null)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleStockSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <span className="text-text-muted block">Appliance:</span>
                <span className="font-semibold text-foreground text-sm">{stockModalProduct.name}</span>
                <span className="text-[11px] font-mono text-text-faint block">{stockModalProduct.sku}</span>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">New Physical Quantity *</label>
                <input
                  type="number"
                  min="0"
                  value={newStockValue}
                  onChange={(e) => setNewStockValue(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground text-sm font-bold focus:border-primary focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-foreground">Audit Reason</label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground focus:border-primary focus:outline-none"
                >
                  <option value="Warehouse Inward Restock">Warehouse Inward Restock</option>
                  <option value="Physical Audit Discrepancy Correction">Physical Audit Discrepancy Correction</option>
                  <option value="Damaged Floor Model Write-off">Damaged Floor Model Write-off</option>
                  <option value="Customer Return Stock Return">Customer Return Stock Return</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setStockModalProduct(null)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit">
                  Save Stock Count
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Bulk Import Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-xl border border-border bg-surface p-6 shadow-2xl animate-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <h2 className="text-base font-bold text-foreground">
                  Bulk CSV Inventory Import
                </h2>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="p-1 rounded-lg text-text-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              <p className="text-text-muted leading-relaxed">
                Paste CSV content below with header columns: <code className="font-mono text-primary">name,sku,category,price,stock,threshold</code>
              </p>

              <div>
                <textarea
                  rows={5}
                  value={csvText}
                  onChange={(e) => {
                    setCsvText(e.target.value);
                    parseCsvContent(e.target.value);
                  }}
                  placeholder={`name,sku,category,price,stock,threshold\nOrbit 43" Smart TV,ORB-TV-43-SMT,tvs,38000,20,5\nOrbit Compact 120L Refrigerator,ORB-REF-120-BAR,refrigerators,24000,15,4`}
                  className="w-full rounded-lg border border-border bg-surface p-3 font-mono text-xs text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              {/* Sample Template Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
                    const sample = `name,sku,category,price,stock,threshold\nOrbit 43" Smart TV,ORB-TV-43-SMT,tvs,38000,20,5\nOrbit Compact 120L Refrigerator,ORB-REF-120-BAR,refrigerators,24000,15,4\nOrbit 7kg Top Load Washer,ORB-WM-70-TL,washing-machines,29500,12,3`;
                    setCsvText(sample);
                    parseCsvContent(sample);
                  }}
                  className="text-xs text-primary font-medium hover:underline"
                >
                  Load Sample Data
                </button>
              </div>

              {/* Validation errors */}
              {importErrors.length > 0 && (
                <div className="rounded-lg bg-danger-soft p-3 text-danger space-y-1">
                  <span className="font-bold">Validation Issues Found:</span>
                  <ul className="list-disc list-inside">
                    {importErrors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Preview Table */}
              {parsedRows.length > 0 && importErrors.length === 0 && (
                <div className="space-y-2">
                  <div className="font-semibold text-foreground flex items-center gap-1.5 text-success">
                    <CheckCircle2 className="h-4 w-4" /> Ready to Import {parsedRows.length} Product(s)
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-border rounded-lg">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-surface-muted uppercase">
                        <tr>
                          <th className="p-2">Name</th>
                          <th className="p-2">SKU</th>
                          <th className="p-2">Category</th>
                          <th className="p-2 text-right">Price</th>
                          <th className="p-2 text-center">Stock</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {parsedRows.map((r, i) => (
                          <tr key={i}>
                            <td className="p-2 font-medium">{r.name}</td>
                            <td className="p-2 font-mono">{r.sku}</td>
                            <td className="p-2">{r.categoryId}</td>
                            <td className="p-2 text-right">{r.price.toLocaleString()} ETB</td>
                            <td className="p-2 text-center font-bold">{r.stock}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button variant="outline" size="sm" type="button" onClick={() => setImportModalOpen(false)}>
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="button"
                  disabled={parsedRows.length === 0 || importErrors.length > 0}
                  onClick={handleApplyImport}
                >
                  Confirm & Ingest Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
