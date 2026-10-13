/**
 * Mathematical calculations and reporting helpers for Orbit Admin Dashboard.
 * Ensures consistent derivations across KPI cards, charts, and tables.
 */

export function calculateFinancials(orders, returns = []) {
  // Eligible orders for revenue: Paid, Delivered, Shipped, Processing (exclude Cancelled or unpaid Pending)
  const eligibleOrders = orders.filter(
    (o) => o.paymentStatus === "Paid" && o.fulfillmentStatus !== "Cancelled"
  );

  const grossRevenue = eligibleOrders.reduce((acc, o) => acc + (o.grandTotal || 0), 0);

  // Total approved or refunded returns
  const totalRefunds = returns
    .filter((r) => r.status === "Approved" || r.status === "Refunded")
    .reduce((acc, r) => acc + (r.refundAmount || 0), 0);

  const netRevenue = Math.max(0, grossRevenue - totalRefunds);

  const averageOrderValue = eligibleOrders.length > 0
    ? Math.round(grossRevenue / eligibleOrders.length)
    : 0;

  // Total products units sold
  const totalUnitsSold = eligibleOrders.reduce((acc, o) => {
    return acc + (o.items || []).reduce((itemAcc, item) => itemAcc + (item.quantity || 1), 0);
  }, 0);

  return {
    grossRevenue,
    netRevenue,
    totalRefunds,
    averageOrderValue,
    eligibleOrdersCount: eligibleOrders.length,
    totalOrdersCount: orders.length,
    totalUnitsSold,
  };
}

export function calculateOrderStatuses(orders) {
  const counts = {
    Pending: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  orders.forEach((o) => {
    const status = o.fulfillmentStatus || "Pending";
    if (counts[status] !== undefined) {
      counts[status]++;
    } else {
      counts[status] = 1;
    }
  });

  return counts;
}

export function calculateCategorySales(orders, products) {
  const categoryTotals = {};

  // Map product to category
  const productCatMap = {};
  products.forEach((p) => {
    productCatMap[p.id] = p.categoryId || "other";
  });

  orders
    .filter((o) => o.paymentStatus === "Paid" && o.fulfillmentStatus !== "Cancelled")
    .forEach((o) => {
      (o.items || []).forEach((item) => {
        const cat = productCatMap[item.productId] || "other";
        const catName = formatCategoryName(cat);
        if (!categoryTotals[catName]) {
          categoryTotals[catName] = { name: catName, value: 0, units: 0 };
        }
        categoryTotals[catName].value += item.total || (item.price * item.quantity);
        categoryTotals[catName].units += item.quantity || 1;
      });
    });

  return Object.values(categoryTotals);
}

function formatCategoryName(cat) {
  const map = {
    tvs: "Televisions",
    refrigerators: "Refrigerators",
    "washing-machines": "Washing Machines",
    "air-conditioners": "Air Conditioners",
    smartphones: "Smartphones",
    kitchen: "Kitchen Appliances",
    audio: "Audio & Soundbars",
    other: "Other Electronics",
  };
  return map[cat] || cat;
}

export function calculateInventoryMetrics(products) {
  let lowStockCount = 0;
  let outOfStockCount = 0;
  let totalStockUnits = 0;
  let totalInventoryValuation = 0;

  products.forEach((p) => {
    const stock = Number(p.stock) || 0;
    const threshold = Number(p.lowStockThreshold) || 10;
    const cost = Number(p.costPrice) || Number(p.price) * 0.7;

    totalStockUnits += stock;
    totalInventoryValuation += stock * cost;

    if (stock === 0) {
      outOfStockCount++;
    } else if (stock <= threshold) {
      lowStockCount++;
    }
  });

  return {
    totalProducts: products.length,
    lowStockCount,
    outOfStockCount,
    totalStockUnits,
    totalInventoryValuation,
  };
}

export function calculateCustomerMetrics(customers, orders) {
  const customerSpendMap = {};
  const customerOrderCountMap = {};

  orders
    .filter((o) => o.paymentStatus === "Paid" && o.fulfillmentStatus !== "Cancelled")
    .forEach((o) => {
      const cId = o.customerId;
      if (!customerSpendMap[cId]) {
        customerSpendMap[cId] = 0;
        customerOrderCountMap[cId] = 0;
      }
      customerSpendMap[cId] += o.grandTotal || 0;
      customerOrderCountMap[cId]++;
    });

  const enrichedCustomers = customers.map((c) => {
    const lifetimeSpend = customerSpendMap[c.id] || 0;
    const orderCount = customerOrderCountMap[c.id] || 0;
    const aov = orderCount > 0 ? Math.round(lifetimeSpend / orderCount) : 0;
    return {
      ...c,
      lifetimeSpend,
      orderCount,
      aov,
    };
  });

  return enrichedCustomers;
}

export function getSimulatedConversionData(eligibleOrdersCount) {
  const simulatedVisitors = 18450;
  const conversionRate = ((eligibleOrdersCount / simulatedVisitors) * 100).toFixed(2);

  return {
    simulatedVisitors,
    eligibleOrdersCount,
    conversionRate: `${conversionRate}%`,
    note: "Simulated store visitor traffic (Local Demo Model)",
  };
}

export function calculateTimePeriodRevenue(orders, period = "month") {
  // Monthly distribution mock
  if (period === "day") {
    return [
      { name: "Mon", revenue: 85000, previousRevenue: 72000, orders: 2 },
      { name: "Tue", revenue: 145000, previousRevenue: 110000, orders: 3 },
      { name: "Wed", revenue: 95000, previousRevenue: 85000, orders: 2 },
      { name: "Thu", revenue: 180000, previousRevenue: 140000, orders: 4 },
      { name: "Fri", revenue: 233150, previousRevenue: 190000, orders: 5 },
      { name: "Sat", revenue: 122250, previousRevenue: 160000, orders: 3 },
      { name: "Sun", revenue: 75250, previousRevenue: 65000, orders: 2 },
    ];
  } else if (period === "week") {
    return [
      { name: "Week 1", revenue: 290000, previousRevenue: 240000, orders: 6 },
      { name: "Week 2", revenue: 410000, previousRevenue: 350000, orders: 8 },
      { name: "Week 3", revenue: 380000, previousRevenue: 390000, orders: 7 },
      { name: "Week 4", revenue: 520000, previousRevenue: 440000, orders: 11 },
    ];
  } else if (period === "year") {
    return [
      { name: "2023", revenue: 4500000, previousRevenue: 3200000, orders: 95 },
      { name: "2024", revenue: 7800000, previousRevenue: 4500000, orders: 154 },
      { name: "2025", revenue: 11200000, previousRevenue: 7800000, orders: 210 },
      { name: "2026 (YTD)", revenue: 14850000, previousRevenue: 9800000, orders: 285 },
    ];
  }

  // Default "month"
  return [
    { name: "May", revenue: 640000, previousRevenue: 510000, orders: 12 },
    { name: "Jun", revenue: 820000, previousRevenue: 690000, orders: 16 },
    { name: "Jul", revenue: 910000, previousRevenue: 780000, orders: 18 },
    { name: "Aug", revenue: 1050000, previousRevenue: 890000, orders: 21 },
    { name: "Sep", revenue: 1280000, previousRevenue: 980000, orders: 25 },
    { name: "Oct (MTD)", revenue: 728850, previousRevenue: 610000, orders: 15 },
  ];
}
