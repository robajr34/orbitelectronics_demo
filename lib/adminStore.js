"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  initialStoreSettings,
  initialCategories,
  initialProducts,
  initialCustomers,
  initialOrders,
  initialReturns,
  initialShipments,
  initialWarranties,
  initialSupportTickets,
  initialRepairs,
  initialKnowledgeBase,
  initialCoupons,
  initialBanners,
  initialCampaigns,
  initialReviews,
  initialRoles,
  initialAuditLogs,
  initialNotifications,
} from "./adminData";

const STORAGE_KEY = "orbit_admin_state_v2";

const AdminContext = createContext(null);

function getStoredValue(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed[key] !== undefined) return parsed[key];
    }
  } catch {}
  return fallback;
}

export function AdminProvider({ children }) {
  const [storeSettings, setStoreSettings] = useState(() => getStoredValue("storeSettings", initialStoreSettings));
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(() => getStoredValue("products", initialProducts));
  const [customers, setCustomers] = useState(() => getStoredValue("customers", initialCustomers));
  const [orders, setOrders] = useState(() => getStoredValue("orders", initialOrders));
  const [returns, setReturns] = useState(() => getStoredValue("returns", initialReturns));
  const [shipments, setShipments] = useState(() => getStoredValue("shipments", initialShipments));
  const [warranties, setWarranties] = useState(() => getStoredValue("warranties", initialWarranties));
  const [supportTickets, setSupportTickets] = useState(() => getStoredValue("supportTickets", initialSupportTickets));
  const [repairs, setRepairs] = useState(() => getStoredValue("repairs", initialRepairs));
  const [knowledgeBase, setKnowledgeBase] = useState(() => getStoredValue("knowledgeBase", initialKnowledgeBase));
  const [coupons, setCoupons] = useState(() => getStoredValue("coupons", initialCoupons));
  const [banners, setBanners] = useState(() => getStoredValue("banners", initialBanners));
  const [campaigns, setCampaigns] = useState(() => getStoredValue("campaigns", initialCampaigns));
  const [reviews, setReviews] = useState(() => getStoredValue("reviews", initialReviews));
  const [roles, setRoles] = useState(() => getStoredValue("roles", initialRoles));
  const [currentRole, setCurrentRole] = useState(() => getStoredValue("currentRole", "Super Admin"));
  const [auditLogs, setAuditLogs] = useState(() => getStoredValue("auditLogs", initialAuditLogs));
  const [notifications, setNotifications] = useState(() => getStoredValue("notifications", initialNotifications));

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const stateToSave = {
        storeSettings,
        products,
        orders,
        customers,
        returns,
        shipments,
        warranties,
        supportTickets,
        repairs,
        knowledgeBase,
        coupons,
        banners,
        campaigns,
        reviews,
        roles,
        currentRole,
        auditLogs,
        notifications,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn("Error saving admin state to localStorage:", e);
    }
  }, [
    storeSettings,
    products,
    orders,
    customers,
    returns,
    shipments,
    warranties,
    supportTickets,
    repairs,
    knowledgeBase,
    coupons,
    banners,
    campaigns,
    reviews,
    roles,
    currentRole,
    auditLogs,
    notifications,
  ]);


  // Helper to add audit logs
  const logAudit = useCallback((action, resource, details, status = "Success") => {
    const newLog = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      actor: `Admin (${currentRole})`,
      role: currentRole,
      action,
      resource,
      details,
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      status,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, [currentRole]);

  // Reset Demo Data
  const resetDemoData = useCallback(() => {
    setStoreSettings(initialStoreSettings);
    setCategories(initialCategories);
    setProducts(initialProducts);
    setCustomers(initialCustomers);
    setOrders(initialOrders);
    setReturns(initialReturns);
    setShipments(initialShipments);
    setWarranties(initialWarranties);
    setSupportTickets(initialSupportTickets);
    setRepairs(initialRepairs);
    setKnowledgeBase(initialKnowledgeBase);
    setCoupons(initialCoupons);
    setBanners(initialBanners);
    setCampaigns(initialCampaigns);
    setReviews(initialReviews);
    setRoles(initialRoles);
    setCurrentRole("Super Admin");
    setAuditLogs(initialAuditLogs);
    setNotifications(initialNotifications);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    toast.success("Demo dataset successfully restored to original factory state!");
  }, []);

  // --- Product Mutations ---
  const addProduct = useCallback((productData) => {
    const newId = `prod_${Date.now().toString().slice(-4)}`;
    const newProduct = {
      ...productData,
      id: newId,
      createdAt: new Date().toISOString(),
      status: productData.status || "Active",
      rating: 5.0,
      reviewsCount: 0,
    };
    setProducts((prev) => [newProduct, ...prev]);
    logAudit("Created Product", `Product: ${newProduct.name}`, `SKU: ${newProduct.sku}, Price: ${newProduct.price} ETB`);
    toast.success(`Product "${newProduct.name}" created successfully.`);
    return newProduct;
  }, [logAudit]);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    logAudit("Updated Product", `Product ID: ${id}`, `Modified attributes: ${Object.keys(updates).join(", ")}`);
    toast.success("Product details updated.");
  }, [logAudit]);

  const archiveProduct = useCallback((id) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: p.status === "Archived" ? "Active" : "Archived" } : p))
    );
    logAudit("Product Status Change", `Product ID: ${id}`, "Toggled Active/Archived state");
    toast.info("Product archived status updated.");
  }, [logAudit]);

  const adjustStock = useCallback((id, newStock, reason = "Manual Adjustment") => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const prevStock = p.stock;
          return { ...p, stock: Number(newStock) };
        }
        return p;
      })
    );
    logAudit("Stock Adjustment", `Product ID: ${id}`, `Adjusted stock to ${newStock} units (${reason})`);
    toast.success("Stock count updated.");
  }, [logAudit]);

  const bulkImportProducts = useCallback((newProductsList) => {
    setProducts((prev) => [...newProductsList, ...prev]);
    logAudit("CSV Bulk Import", "Product Catalog", `Imported ${newProductsList.length} products`);
    toast.success(`Successfully imported ${newProductsList.length} products from CSV.`);
  }, [logAudit]);

  // --- Order Mutations ---
  const updateOrderStatus = useCallback((orderId, newFulfillmentStatus) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            fulfillmentStatus: newFulfillmentStatus,
            deliveredAt: newFulfillmentStatus === "Delivered" ? new Date().toISOString() : o.deliveredAt,
          };
        }
        return o;
      })
    );
    logAudit("Order Status Transition", `Order #${orderId}`, `Status changed to "${newFulfillmentStatus}"`);
    toast.success(`Order #${orderId} marked as ${newFulfillmentStatus}`);
  }, [logAudit]);

  const updatePaymentStatus = useCallback((orderId, newPaymentStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o))
    );
    logAudit("Order Payment Update", `Order #${orderId}`, `Payment status changed to "${newPaymentStatus}"`);
    toast.success(`Order #${orderId} payment status set to ${newPaymentStatus}`);
  }, [logAudit]);

  const cancelOrder = useCallback((orderId, reason = "Customer Request") => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, fulfillmentStatus: "Cancelled", paymentStatus: o.paymentStatus === "Paid" ? "Refunded" : "Cancelled", notes: `${o.notes || ""} [Cancelled: ${reason}]` }
          : o
      )
    );
    logAudit("Cancelled Order", `Order #${orderId}`, `Cancellation reason: ${reason}`);
    toast.error(`Order #${orderId} has been cancelled.`);
  }, [logAudit]);

  // --- Returns Mutations ---
  const updateReturnStatus = useCallback((returnId, newStatus, notes = "") => {
    setReturns((prev) =>
      prev.map((r) =>
        r.id === returnId ? { ...r, status: newStatus, notes: notes || r.notes } : r
      )
    );
    logAudit("Return Request Updated", `Return #${returnId}`, `Status set to ${newStatus}`);
    toast.success(`Return #${returnId} status updated to ${newStatus}`);
  }, [logAudit]);

  // --- Shipment Mutations ---
  const updateShipmentStatus = useCallback((shipmentId, newStatus, newEventDesc) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id === shipmentId) {
          const events = [...(s.events || [])];
          if (newEventDesc) {
            events.push({
              time: new Date().toISOString().replace("T", " ").slice(0, 16),
              description: newEventDesc,
              location: "Orbit Central Logistics Hub",
            });
          }
          return { ...s, status: newStatus, events };
        }
        return s;
      })
    );
    logAudit("Shipment Updated", `Shipment #${shipmentId}`, `Status updated to ${newStatus}`);
    toast.success(`Shipment #${shipmentId} updated.`);
  }, [logAudit]);

  // --- Customer Mutations ---
  const updateCustomer = useCallback((customerId, updates) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, ...updates } : c))
    );
    logAudit("Customer Profile Updated", `Customer ID: ${customerId}`, "Updated contact or address information");
    toast.success("Customer profile updated.");
  }, [logAudit]);

  const toggleCustomerTag = useCallback((customerId, tag) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === customerId) {
          const currentTags = c.tags || [];
          const newTags = currentTags.includes(tag)
            ? currentTags.filter((t) => t !== tag)
            : [...currentTags, tag];
          return { ...c, tags: newTags };
        }
        return c;
      })
    );
    toast.info(`Updated customer segment tags.`);
  }, []);

  // --- Support & Tickets ---
  const createTicket = useCallback((ticketData) => {
    const newId = `TICK-${Date.now().toString().slice(-4)}`;
    const newTicket = {
      ...ticketData,
      id: newId,
      status: "Open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      internalNotes: [],
    };
    setSupportTickets((prev) => [newTicket, ...prev]);
    logAudit("Created Support Ticket", `Ticket #${newId}`, `Subject: ${ticketData.subject}`);
    toast.success(`Support ticket #${newId} created.`);
    return newTicket;
  }, [logAudit]);

  const updateTicket = useCallback((ticketId, updates) => {
    setSupportTickets((prev) =>
      prev.map((t) =>
        t.id === ticketId
          ? { ...t, ...updates, updatedAt: new Date().toISOString() }
          : t
      )
    );
    logAudit("Updated Ticket", `Ticket #${ticketId}`, `Changed: ${Object.keys(updates).join(", ")}`);
    toast.success(`Ticket #${ticketId} updated.`);
  }, [logAudit]);

  const addTicketNote = useCallback((ticketId, noteText) => {
    setSupportTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const notes = [
            ...(t.internalNotes || []),
            {
              id: `note_${Date.now()}`,
              author: `Staff (${currentRole})`,
              text: noteText,
              timestamp: new Date().toISOString().replace("T", " ").slice(0, 16),
            },
          ];
          return { ...t, internalNotes: notes, updatedAt: new Date().toISOString() };
        }
        return t;
      })
    );
    toast.success("Internal note added to ticket.");
  }, [currentRole]);

  // --- Warranties ---
  const registerWarranty = useCallback((warrantyData) => {
    const newId = `WAR-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`;
    const newWarranty = {
      ...warrantyData,
      id: newId,
      status: "Active",
    };
    setWarranties((prev) => [newWarranty, ...prev]);
    logAudit("Registered Warranty", `Serial: ${warrantyData.serialNumber}`, `Product: ${warrantyData.productName}`);
    toast.success(`Warranty #${newId} registered successfully.`);
    return newWarranty;
  }, [logAudit]);

  // --- Repairs & Service ---
  const updateRepairStatus = useCallback((repairId, newStatus, technician, notes) => {
    setRepairs((prev) =>
      prev.map((r) =>
        r.id === repairId
          ? {
              ...r,
              status: newStatus,
              technician: technician || r.technician,
              notes: notes || r.notes,
            }
          : r
      )
    );
    logAudit("Repair Status Updated", `Repair #${repairId}`, `Status changed to ${newStatus}`);
    toast.success(`Repair #${repairId} updated.`);
  }, [logAudit]);

  const createRepair = useCallback((repairData) => {
    const newId = `REP-${new Date().getFullYear()}-${Date.now().toString().slice(-3)}`;
    const newRepair = {
      ...repairData,
      id: newId,
      status: "Requested",
    };
    setRepairs((prev) => [newRepair, ...prev]);
    logAudit("Created Repair Request", `Appliance: ${repairData.appliance}`, `Customer: ${repairData.customerName}`);
    toast.success(`Service request #${newId} created.`);
    return newRepair;
  }, [logAudit]);

  // --- Knowledge Base ---
  const createArticle = useCallback((article) => {
    const newId = `kb_${Date.now().toString().slice(-4)}`;
    const newArt = {
      ...article,
      id: newId,
      views: 0,
      updatedAt: new Date().toISOString().slice(0, 10),
    };
    setKnowledgeBase((prev) => [newArt, ...prev]);
    logAudit("Created KB Article", `Article: ${article.title}`, `Status: ${article.status}`);
    toast.success("Knowledge Base article saved.");
  }, [logAudit]);

  const updateArticle = useCallback((articleId, updates) => {
    setKnowledgeBase((prev) =>
      prev.map((a) => (a.id === articleId ? { ...a, ...updates, updatedAt: new Date().toISOString().slice(0, 10) } : a))
    );
    toast.success("Knowledge Base article updated.");
  }, []);

  const deleteArticle = useCallback((articleId) => {
    setKnowledgeBase((prev) => prev.filter((a) => a.id !== articleId));
    toast.info("Article removed.");
  }, []);

  // --- Marketing: Coupons ---
  const createCoupon = useCallback((coupon) => {
    const newId = `CPN-${Date.now().toString().slice(-3)}`;
    const newCpn = {
      ...coupon,
      id: newId,
      usedCount: 0,
      isActive: true,
    };
    setCoupons((prev) => [newCpn, ...prev]);
    logAudit("Created Discount Coupon", `Code: ${coupon.code}`, `Value: ${coupon.value}${coupon.type === "percentage" ? "%" : " ETB"}`);
    toast.success(`Coupon code ${coupon.code} created.`);
  }, [logAudit]);

  const toggleCoupon = useCallback((couponId) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
    toast.info("Coupon status updated.");
  }, []);

  const deleteCoupon = useCallback((couponId) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
    toast.info("Coupon deleted.");
  }, []);

  // --- Marketing: Banners & CMS ---
  const createBanner = useCallback((banner) => {
    const newId = `BAN-${Date.now().toString().slice(-3)}`;
    const newBanner = { ...banner, id: newId };
    setBanners((prev) => [newBanner, ...prev]);
    logAudit("Created Homepage Banner", `Title: ${banner.title}`, `Status: ${banner.status}`);
    toast.success("Homepage banner saved.");
  }, [logAudit]);

  const updateBanner = useCallback((bannerId, updates) => {
    setBanners((prev) =>
      prev.map((b) => (b.id === bannerId ? { ...b, ...updates } : b))
    );
    toast.success("Banner updated.");
  }, []);

  const deleteBanner = useCallback((bannerId) => {
    setBanners((prev) => prev.filter((b) => b.id !== bannerId));
    toast.info("Banner removed.");
  }, []);

  // --- Marketing: Campaigns ---
  const createCampaign = useCallback((campaign) => {
    const newId = `CMP-${Date.now().toString().slice(-3)}`;
    const newCamp = {
      ...campaign,
      id: newId,
      status: "Draft",
      openRate: "-",
      clickRate: "-",
      sentDate: null,
    };
    setCampaigns((prev) => [newCamp, ...prev]);
    logAudit("Created Email Campaign Draft", `Campaign: ${campaign.title}`, `Subject: ${campaign.subject}`);
    toast.success(`Email campaign draft "${campaign.title}" created.`);
  }, [logAudit]);

  const simulateSendCampaign = useCallback((campaignId) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === campaignId
          ? {
              ...c,
              status: "Sent",
              sentDate: new Date().toISOString().slice(0, 10),
              openRate: "42.8%",
              clickRate: "16.4%",
            }
          : c
      )
    );
    logAudit("Simulated Campaign Send", `Campaign ID: ${campaignId}`, "Dispatched simulated marketing broadcast");
    toast.success("Simulated email campaign broadcast completed.");
  }, [logAudit]);

  // --- Marketing: Reviews ---
  const moderateReview = useCallback((reviewId, status) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, status } : r))
    );
    logAudit("Moderated Product Review", `Review #${reviewId}`, `Set moderation status to ${status}`);
    toast.success(`Review #${reviewId} marked as ${status}.`);
  }, [logAudit]);

  // --- Roles & Settings ---
  const updateRolePermissions = useCallback((roleId, moduleName, permType, value) => {
    setRoles((prev) =>
      prev.map((r) => {
        if (r.id === roleId) {
          const mod = r.permissions[moduleName] || {};
          return {
            ...r,
            permissions: {
              ...r.permissions,
              [moduleName]: { ...mod, [permType]: value },
            },
          };
        }
        return r;
      })
    );
    toast.success("Role permissions matrix updated.");
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setStoreSettings((prev) => ({ ...prev, ...newSettings }));
    logAudit("Updated Store Settings", "Store Configuration", "Updated general company and store details");
    toast.success("Store settings updated successfully.");
  }, [logAudit]);

  // --- Notifications ---
  const markNotificationRead = useCallback((notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read.");
  }, []);

  const value = useMemo(
    () => ({
      storeSettings,
      updateSettings,
      categories,
      products,
      addProduct,
      updateProduct,
      archiveProduct,
      adjustStock,
      bulkImportProducts,
      orders,
      updateOrderStatus,
      updatePaymentStatus,
      cancelOrder,
      returns,
      updateReturnStatus,
      shipments,
      updateShipmentStatus,
      customers,
      updateCustomer,
      toggleCustomerTag,
      supportTickets,
      createTicket,
      updateTicket,
      addTicketNote,
      warranties,
      registerWarranty,
      repairs,
      updateRepairStatus,
      createRepair,
      knowledgeBase,
      createArticle,
      updateArticle,
      deleteArticle,
      coupons,
      createCoupon,
      toggleCoupon,
      deleteCoupon,
      banners,
      createBanner,
      updateBanner,
      deleteBanner,
      campaigns,
      createCampaign,
      simulateSendCampaign,
      reviews,
      moderateReview,
      roles,
      currentRole,
      setCurrentRole,
      updateRolePermissions,
      auditLogs,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      resetDemoData,
    }),
    [
      storeSettings,
      updateSettings,
      categories,
      products,
      addProduct,
      updateProduct,
      archiveProduct,
      adjustStock,
      bulkImportProducts,
      orders,
      updateOrderStatus,
      updatePaymentStatus,
      cancelOrder,
      returns,
      updateReturnStatus,
      shipments,
      updateShipmentStatus,
      customers,
      updateCustomer,
      toggleCustomerTag,
      supportTickets,
      createTicket,
      updateTicket,
      addTicketNote,
      warranties,
      registerWarranty,
      repairs,
      updateRepairStatus,
      createRepair,
      knowledgeBase,
      createArticle,
      updateArticle,
      deleteArticle,
      coupons,
      createCoupon,
      toggleCoupon,
      deleteCoupon,
      banners,
      createBanner,
      updateBanner,
      deleteBanner,
      campaigns,
      createCampaign,
      simulateSendCampaign,
      reviews,
      moderateReview,
      roles,
      currentRole,
      setCurrentRole,
      updateRolePermissions,
      auditLogs,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      resetDemoData,
    ]
  );

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdminStore() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminStore must be used within an AdminProvider");
  }
  return context;
}
