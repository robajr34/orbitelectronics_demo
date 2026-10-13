export const initialStoreSettings = {
  storeName: "Orbit Electronics Flagship",
  companyName: "Orbit Electronics PLC",
  currency: "ETB",
  taxRate: 15,
  supportEmail: "admin@orbitelectronics.et",
  supportPhone: "+251 911 889 900",
  address: "Bole Medhanialem Mall, Suite 402, Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa (EAT)",
  operatingHours: "Mon - Sat: 8:30 AM - 7:30 PM",
  lowStockThresholdDefault: 10,
  taxInclusive: false,
};

export const initialCategories = [
  { id: "tvs", name: "TVs & Entertainment", slug: "tvs" },
  { id: "refrigerators", name: "Refrigerators & Freezers", slug: "refrigerators" },
  { id: "washing-machines", name: "Washing Machines", slug: "washing-machines" },
  { id: "air-conditioners", name: "Air Conditioners", slug: "air-conditioners" },
  { id: "smartphones", name: "Smartphones & Tablets", slug: "smartphones" },
  { id: "kitchen", name: "Kitchen Appliances", slug: "kitchen" },
  { id: "audio", name: "Audio & Soundbars", slug: "audio" },
];

export const initialProducts = [
  {
    id: "prod_001",
    name: "Orbit 55\" QLED 4K Smart TV",
    model: "OQ-55U8K",
    sku: "ORB-TV-55-QLED",
    brand: "Orbit",
    categoryId: "tvs",
    subCategory: "QLED TVs",
    price: 65000,
    costPrice: 48000,
    stock: 45,
    reservedStock: 3,
    lowStockThreshold: 10,
    warrantyMonths: 24,
    status: "Active",
    rating: 4.8,
    reviewsCount: 124,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800"
    ],
    features: ["4K Resolution", "Quantum Dot Color", "Dolby Vision", "120Hz Refresh Rate"],
    variants: [
      { id: "v1_55", name: "55-inch", sku: "ORB-TV-55-QLED", price: 65000, stock: 35 },
      { id: "v1_65", name: "65-inch", sku: "ORB-TV-65-QLED", price: 88000, stock: 10 }
    ],
    specs: {
      Display: "55 inch QLED",
      Resolution: "3840 x 2160 (4K)",
      RefreshRate: "120Hz",
      HDR: "Dolby Vision, HDR10+",
      OS: "OrbitOS 3.0",
      Audio: "2.1 Channel 40W Dolby Atmos"
    },
    description: "Experience brilliant colors and deep contrasts with the Orbit 55\" QLED 4K TV. Perfect for movies and gaming.",
    createdAt: "2026-01-15T08:00:00Z"
  },
  {
    id: "prod_002",
    name: "Orbit 500L French Door Refrigerator",
    model: "ORF-500FD",
    sku: "ORB-REF-500-FD",
    brand: "Orbit",
    categoryId: "refrigerators",
    subCategory: "French Door",
    price: 110000,
    costPrice: 82000,
    stock: 12,
    reservedStock: 2,
    lowStockThreshold: 15,
    warrantyMonths: 120,
    status: "Active",
    rating: 4.9,
    reviewsCount: 89,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=800"],
    features: ["Inverter Compressor", "Frost Free", "Water Dispenser", "Multi Air Flow"],
    variants: [
      { id: "v2_silver", name: "Brushed Silver", sku: "ORB-REF-500-FD-SLV", price: 110000, stock: 8 },
      { id: "v2_black", name: "Matte Black", sku: "ORB-REF-500-FD-BLK", price: 115000, stock: 4 }
    ],
    specs: {
      Capacity: "500 Liters",
      Type: "French Door",
      Compressor: "Smart Inverter",
      EnergyRating: "A+++",
      Defrost: "Total No Frost"
    },
    description: "Keep your food fresh longer with the Orbit French Door Refrigerator featuring advanced Inverter Technology.",
    createdAt: "2026-02-10T10:30:00Z"
  },
  {
    id: "prod_003",
    name: "Orbit 9kg Front Load Washing Machine",
    model: "OWM-90FL",
    sku: "ORB-WM-90-FL",
    brand: "Orbit",
    categoryId: "washing-machines",
    subCategory: "Front Load",
    price: 45000,
    costPrice: 32000,
    stock: 28,
    reservedStock: 4,
    lowStockThreshold: 10,
    warrantyMonths: 36,
    status: "Active",
    rating: 4.7,
    reviewsCount: 56,
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=800"],
    features: ["Steam Wash", "1400 RPM", "Inverter Direct Drive", "Auto Dosing"],
    variants: [
      { id: "v3_white", name: "Polar White", sku: "ORB-WM-90-FL-WHT", price: 45000, stock: 20 },
      { id: "v3_graphite", name: "Dark Graphite", sku: "ORB-WM-90-FL-GRP", price: 47500, stock: 8 }
    ],
    specs: {
      Capacity: "9 kg",
      MaxSpinSpeed: "1400 RPM",
      WashCycles: "16 Programs",
      EnergyRating: "A+++"
    },
    description: "Powerful and efficient front-load washing machine with Steam Wash technology to remove stubborn stains and allergens.",
    createdAt: "2026-03-05T09:15:00Z"
  },
  {
    id: "prod_004",
    name: "Orbit 1.5 Ton Inverter Split AC",
    model: "OAC-18INV",
    sku: "ORB-AC-18-INV",
    brand: "Orbit",
    categoryId: "air-conditioners",
    subCategory: "Inverter AC",
    price: 52000,
    costPrice: 37000,
    stock: 60,
    reservedStock: 5,
    lowStockThreshold: 12,
    warrantyMonths: 60,
    status: "Active",
    rating: 4.6,
    reviewsCount: 210,
    image: "https://images.unsplash.com/photo-1527018263358-2d9cd7a64ce1?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1527018263358-2d9cd7a64ce1?auto=format&fit=crop&q=80&w=800"],
    features: ["Fast Turbo Cooling", "Anti-Bacterial HEPA", "Whisper Quiet 35dB", "Wi-Fi Control"],
    variants: [
      { id: "v4_15", name: "1.5 Ton (18,000 BTU)", sku: "ORB-AC-18-INV", price: 52000, stock: 45 },
      { id: "v4_20", name: "2.0 Ton (24,000 BTU)", sku: "ORB-AC-24-INV", price: 68000, stock: 15 }
    ],
    specs: {
      CoolingCapacity: "18,000 BTU",
      Refrigerant: "R32 Eco-friendly",
      EnergyRating: "5 Star Inverter"
    },
    description: "Stay cool and comfortable with the energy-efficient Orbit 1.5 Ton Inverter Air Conditioner with smart app control.",
    createdAt: "2026-04-20T14:45:00Z"
  },
  {
    id: "prod_005",
    name: "Orbit Ultra 75\" NeoMini-LED 8K TV",
    model: "OQ-75M8K",
    sku: "ORB-TV-75-NEO",
    brand: "Orbit",
    categoryId: "tvs",
    subCategory: "Mini-LED TVs",
    price: 175000,
    costPrice: 130000,
    stock: 7,
    reservedStock: 1,
    lowStockThreshold: 8,
    warrantyMonths: 36,
    status: "Active",
    rating: 4.95,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=800"],
    features: ["Mini-LED Local Dimming", "True 8K Resolution", "144Hz VRR Gaming", "Dolby Atmos 70W"],
    variants: [
      { id: "v5_75", name: "75-inch", sku: "ORB-TV-75-NEO", price: 175000, stock: 7 }
    ],
    specs: {
      Display: "75 inch Mini-LED 8K",
      DimmingZones: "2,048 Zones",
      PeakBrightness: "2,000 nits",
      HDMI: "4x HDMI 2.1 48Gbps"
    },
    description: "Flagship cinematic powerhouse with 2,048 local dimming zones and true 8K resolution.",
    createdAt: "2026-05-12T11:00:00Z"
  },
  {
    id: "prod_006",
    name: "Orbit Pro Titan 5G Smartphone (256GB)",
    model: "OPT-5G-256",
    sku: "ORB-PH-TITAN-256",
    brand: "Orbit",
    categoryId: "smartphones",
    subCategory: "Flagship Phones",
    price: 68000,
    costPrice: 51000,
    stock: 50,
    reservedStock: 8,
    lowStockThreshold: 15,
    warrantyMonths: 24,
    status: "Active",
    rating: 4.85,
    reviewsCount: 168,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"],
    features: ["Snapdragon 8 Gen 3", "200MP OIS Camera", "5000mAh Battery", "65W Fast Charge"],
    variants: [
      { id: "v6_titanium", name: "Natural Titanium", sku: "ORB-PH-TITAN-256-NAT", price: 68000, stock: 30 },
      { id: "v6_midnight", name: "Midnight Blue", sku: "ORB-PH-TITAN-256-BLU", price: 68000, stock: 20 }
    ],
    specs: {
      Screen: "6.7 inch AMOLED 120Hz LTPO",
      RAM: "12GB LPDDR5X",
      Storage: "256GB UFS 4.0",
      Camera: "200MP + 50MP 5x + 12MP Ultra-wide"
    },
    description: "Cutting-edge performance, aerospace titanium frame, and professional-grade mobile photography.",
    createdAt: "2026-06-01T08:00:00Z"
  },
  {
    id: "prod_007",
    name: "Orbit Smart Multi-Zone Air Fryer Oven 25L",
    model: "OAF-25L-PRO",
    sku: "ORB-KIT-AF-25L",
    brand: "Orbit",
    categoryId: "kitchen",
    subCategory: "Cooking & Fryers",
    price: 18500,
    costPrice: 12500,
    stock: 35,
    reservedStock: 2,
    lowStockThreshold: 10,
    warrantyMonths: 12,
    status: "Active",
    rating: 4.75,
    reviewsCount: 94,
    image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=800"],
    features: ["Dual Heating Elements", "14 Preset Modes", "Rotisserie & Dehydrate", "Touch Screen"],
    variants: [
      { id: "v7_silver", name: "Stainless Steel", sku: "ORB-KIT-AF-25L-SS", price: 18500, stock: 35 }
    ],
    specs: {
      Capacity: "25 Liters",
      Power: "1800W",
      TempRange: "40°C - 230°C",
      Accessories: "Baking Tray, Wire Rack, Air Fry Basket"
    },
    description: "Versatile 10-in-1 countertop air fryer oven capable of roasting a whole chicken with 85% less oil.",
    createdAt: "2026-06-15T12:00:00Z"
  },
  {
    id: "prod_008",
    name: "Orbit CineSound Pro 5.1.2 Dolby Atmos Soundbar",
    model: "OSB-512-ATM",
    sku: "ORB-AUD-SB-512",
    brand: "Orbit",
    categoryId: "audio",
    subCategory: "Soundbars",
    price: 36000,
    costPrice: 24000,
    stock: 18,
    reservedStock: 1,
    lowStockThreshold: 6,
    warrantyMonths: 24,
    status: "Active",
    rating: 4.8,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800"],
    features: ["Wireless Subwoofer", "Up-Firing Height Drivers", "eARC HDMI Passthrough", "Bluetooth 5.3"],
    variants: [
      { id: "v8_std", name: "Standard 5.1.2 Set", sku: "ORB-AUD-SB-512", price: 36000, stock: 18 }
    ],
    specs: {
      TotalPower: "560W RMS",
      Configuration: "5.1.2 Channel",
      Inputs: "HDMI eARC, Optical, AUX, USB"
    },
    description: "Immersive 3D surround sound with dedicated wireless subwoofer and room-calibrating acoustics.",
    createdAt: "2026-07-02T10:00:00Z"
  },
  {
    id: "prod_009",
    name: "Orbit Side-by-Side 620L Smart Refrigerator",
    model: "ORF-620SBS",
    sku: "ORB-REF-620-SBS",
    brand: "Orbit",
    categoryId: "refrigerators",
    subCategory: "Side by Side",
    price: 135000,
    costPrice: 102000,
    stock: 4,
    reservedStock: 1,
    lowStockThreshold: 8,
    warrantyMonths: 120,
    status: "Active",
    rating: 4.9,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=800"],
    features: ["Smart Touch Screen Door", "Dual Inverter", "Non-Plumbed Ice Maker", "Door-in-Door Access"],
    variants: [
      { id: "v9_dark", name: "Graphite Steel", sku: "ORB-REF-620-SBS-D", price: 135000, stock: 4 }
    ],
    specs: {
      Capacity: "620 Liters (410L Fridge, 210L Freezer)",
      EnergyRating: "A+++",
      Noise: "36 dB"
    },
    description: "Premium large capacity refrigerator with interactive door display and smart freshness preservation.",
    createdAt: "2026-07-15T15:20:00Z"
  },
  {
    id: "prod_010",
    name: "Orbit 12kg Washer & Dryer Combo",
    model: "OWD-128-COMBO",
    sku: "ORB-WM-12-WD",
    brand: "Orbit",
    categoryId: "washing-machines",
    subCategory: "Washer Dryers",
    price: 68000,
    costPrice: 49000,
    stock: 9,
    reservedStock: 2,
    lowStockThreshold: 10,
    warrantyMonths: 36,
    status: "Active",
    rating: 4.65,
    reviewsCount: 51,
    image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&q=80&w=800"],
    features: ["12kg Wash / 8kg Dry", "Heat Pump Drying", "Steam Refresh", "AI Fabric Sensor"],
    variants: [
      { id: "v10_titanium", name: "Titanium Grey", sku: "ORB-WM-12-WD-TIT", price: 68000, stock: 9 }
    ],
    specs: {
      WashCapacity: "12 kg",
      DryCapacity: "8 kg",
      MaxSpinSpeed: "1600 RPM",
      Motor: "Direct Inverter BLDC"
    },
    description: "All-in-one laundry revolution. Wash and dry family-sized loads in a single uninterrupted cycle.",
    createdAt: "2026-08-01T09:00:00Z"
  },
  {
    id: "prod_011",
    name: "Orbit 2.5 Ton Floor Standing Tower AC",
    model: "OAC-30TWR",
    sku: "ORB-AC-30-TWR",
    brand: "Orbit",
    categoryId: "air-conditioners",
    subCategory: "Tower AC",
    price: 92000,
    costPrice: 69000,
    stock: 6,
    reservedStock: 0,
    lowStockThreshold: 5,
    warrantyMonths: 60,
    status: "Active",
    rating: 4.7,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1614633833026-0820552978b6?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1614633833026-0820552978b6?auto=format&fit=crop&q=80&w=800"],
    features: ["Long Distance Airflow 18m", "Wide Angle 3D Oscillation", "Touch Glass Panel", "R32 Inverter"],
    variants: [
      { id: "v11_white", name: "Pure White Tower", sku: "ORB-AC-30-TWR-WHT", price: 92000, stock: 6 }
    ],
    specs: {
      Capacity: "2.5 Ton (30,000 BTU)",
      Coverage: "Up to 60 sq meters",
      Power: "2400W"
    },
    description: "Elegant floor-standing tower AC designed for expansive living rooms, conference halls, and offices.",
    createdAt: "2026-08-10T14:00:00Z"
  },
  {
    id: "prod_012",
    name: "Orbit Espresso Master Dual Boiler Machine",
    model: "OEM-DB900",
    sku: "ORB-KIT-ESP-DB",
    brand: "Orbit",
    categoryId: "kitchen",
    subCategory: "Coffee & Beverage",
    price: 42000,
    costPrice: 29000,
    stock: 14,
    reservedStock: 1,
    lowStockThreshold: 6,
    warrantyMonths: 24,
    status: "Active",
    rating: 4.9,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800",
    images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800"],
    features: ["Dual Italian Boilers", "PID Temperature Stability", "58mm Commercial Portafilter", "Microfoam Steam Wand"],
    variants: [
      { id: "v12_steel", name: "Polished Chrome", sku: "ORB-KIT-ESP-DB-CH", price: 42000, stock: 14 }
    ],
    specs: {
      Pressure: "15 Bar Italian Pump",
      WaterTank: "2.5 Liters",
      Boilers: "Twin Stainless Steel"
    },
    description: "Barista-grade home espresso machine allowing simultaneous extraction and velvety milk texturing.",
    createdAt: "2026-08-20T10:30:00Z"
  }
];

export const initialCustomers = [
  {
    id: "CUST-001",
    name: "Abebe Kebede",
    email: "abebe.kebede@gmail.com",
    phone: "+251 911 223 344",
    address: "Bole Sub-City, Woreda 03, House 412, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2025-11-14",
    status: "Active",
    tags: ["VIP", "Repeat Customer"],
    notes: "Prefers evening courier delivery. High-value customer."
  },
  {
    id: "CUST-002",
    name: "Sara Tadesse",
    email: "sara.tadesse@outlook.com",
    phone: "+251 912 445 566",
    address: "CMC Michael, Tsehay Real Estate, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-01-08",
    status: "Active",
    tags: ["VIP"],
    notes: "Home appliance enthusiast. Owns French door fridge and OLED TV."
  },
  {
    id: "CUST-003",
    name: "Dawit Alemu",
    email: "dawit.alemu@yahoo.com",
    phone: "+251 922 889 911",
    address: "Sarbet, Near Canadian Embassy, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-02-19",
    status: "Active",
    tags: ["Repeat Customer"],
    notes: "Tech-savvy. Prompt reviewer."
  },
  {
    id: "CUST-004",
    name: "Hiwot Mengistu",
    email: "hiwot.m@ethionet.et",
    phone: "+251 911 772 233",
    address: "Kazanchis, Near UNECA, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-03-02",
    status: "Active",
    tags: ["New Customer"],
    notes: "Recent newlywed furnishing home."
  },
  {
    id: "CUST-005",
    name: "Eskinder Nega",
    email: "eskinder.n@gmail.com",
    phone: "+251 930 114 477",
    address: "Old Airport, Woreda 04, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-03-25",
    status: "Active",
    tags: ["Repeat Customer"],
    notes: "Requested corporate invoice on previous orders."
  },
  {
    id: "CUST-006",
    name: "Bethlehem Haile",
    email: "betty.haile@gmail.com",
    phone: "+251 944 667 788",
    address: "Gerji, Imperial Hotel Area, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-04-10",
    status: "Active",
    tags: ["At Risk"],
    notes: "Had a return on kitchen item last month."
  },
  {
    id: "CUST-007",
    name: "Yared Bekele",
    email: "yared.bekele@moenco.com",
    phone: "+251 913 990 022",
    address: "Gotera, Debre Zeit Road, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-05-15",
    status: "Active",
    tags: ["VIP", "Repeat Customer"],
    notes: "Purchased multi-room AC system."
  },
  {
    id: "CUST-008",
    name: "Selamawit Desta",
    email: "selam.desta@gmail.com",
    phone: "+251 911 334 455",
    address: "Hayahulet, Near Golagol Tower, Addis Ababa",
    city: "Addis Ababa",
    registeredDate: "2026-06-20",
    status: "Active",
    tags: ["New Customer"],
    notes: "Referred by Dawit Alemu."
  }
];

export const initialOrders = [
  {
    id: "ORD-2026-8910",
    customerId: "CUST-001",
    customerName: "Abebe Kebede",
    customerEmail: "abebe.kebede@gmail.com",
    customerPhone: "+251 911 223 344",
    date: "2026-10-12T14:32:00Z",
    deliveryAddress: "Bole Sub-City, Woreda 03, House 412, Addis Ababa",
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Processing",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9921",
    items: [
      {
        productId: "prod_001",
        name: "Orbit 55\" QLED 4K Smart TV",
        sku: "ORB-TV-55-QLED",
        price: 65000,
        quantity: 1,
        total: 65000
      }
    ],
    subtotal: 65000,
    discountAmount: 0,
    taxAmount: 9750,
    shippingAmount: 500,
    grandTotal: 75250,
    notes: "Deliver after 4:00 PM. Call before dispatch."
  },
  {
    id: "ORD-2026-8909",
    customerId: "CUST-002",
    customerName: "Sara Tadesse",
    customerEmail: "sara.tadesse@outlook.com",
    customerPhone: "+251 912 445 566",
    date: "2026-10-11T10:15:00Z",
    deliveryAddress: "CMC Michael, Tsehay Real Estate, Addis Ababa",
    paymentMethod: "CBE Birr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9890",
    items: [
      {
        productId: "prod_002",
        name: "Orbit 500L French Door Refrigerator",
        sku: "ORB-REF-500-FD",
        price: 110000,
        quantity: 1,
        total: 110000
      }
    ],
    subtotal: 110000,
    discountAmount: 5000,
    taxAmount: 15750,
    shippingAmount: 1500,
    grandTotal: 122250,
    deliveredAt: "2026-10-12T16:00:00Z",
    notes: "Delivered successfully with ground technician unboxing."
  },
  {
    id: "ORD-2026-8908",
    customerId: "CUST-003",
    customerName: "Dawit Alemu",
    customerEmail: "dawit.alemu@yahoo.com",
    customerPhone: "+251 922 889 911",
    date: "2026-10-10T16:45:00Z",
    deliveryAddress: "Sarbet, Near Canadian Embassy, Addis Ababa",
    paymentMethod: "Bank Wire (CBE)",
    paymentStatus: "Paid",
    fulfillmentStatus: "Shipped",
    carrier: "DHL Express Ethiopia",
    trackingNumber: "DHL-ET-443912",
    items: [
      {
        productId: "prod_003",
        name: "Orbit 9kg Front Load Washing Machine",
        sku: "ORB-WM-90-FL",
        price: 45000,
        quantity: 1,
        total: 45000
      }
    ],
    subtotal: 45000,
    discountAmount: 0,
    taxAmount: 6750,
    shippingAmount: 800,
    grandTotal: 52550,
    notes: "Shipped via DHL express freight."
  },
  {
    id: "ORD-2026-8907",
    customerId: "CUST-004",
    customerName: "Hiwot Mengistu",
    customerEmail: "hiwot.m@ethionet.et",
    customerPhone: "+251 911 772 233",
    date: "2026-10-09T11:20:00Z",
    deliveryAddress: "Kazanchis, Near UNECA, Addis Ababa",
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9844",
    items: [
      {
        productId: "prod_004",
        name: "Orbit 1.5 Ton Inverter Split AC",
        sku: "ORB-AC-18-INV",
        price: 52000,
        quantity: 1,
        total: 52000
      }
    ],
    subtotal: 52000,
    discountAmount: 2000,
    taxAmount: 7500,
    shippingAmount: 1000,
    grandTotal: 58500,
    deliveredAt: "2026-10-10T15:30:00Z",
    notes: "Installation voucher included."
  },
  {
    id: "ORD-2026-8906",
    customerId: "CUST-005",
    customerName: "Eskinder Nega",
    customerEmail: "eskinder.n@gmail.com",
    customerPhone: "+251 930 114 477",
    date: "2026-10-08T13:00:00Z",
    deliveryAddress: "Old Airport, Woreda 04, Addis Ababa",
    paymentMethod: "Bank Wire (Awash)",
    paymentStatus: "Pending",
    fulfillmentStatus: "Pending",
    carrier: "Pending Assignment",
    trackingNumber: null,
    items: [
      {
        productId: "prod_006",
        name: "Orbit Pro Titan 5G Smartphone (256GB)",
        sku: "ORB-PH-TITAN-256",
        price: 68000,
        quantity: 1,
        total: 68000
      }
    ],
    subtotal: 68000,
    discountAmount: 0,
    taxAmount: 10200,
    shippingAmount: 400,
    grandTotal: 78600,
    notes: "Awaiting bank transfer verification from finance desk."
  },
  {
    id: "ORD-2026-8905",
    customerId: "CUST-007",
    customerName: "Yared Bekele",
    customerEmail: "yared.bekele@moenco.com",
    customerPhone: "+251 913 990 022",
    date: "2026-10-06T09:10:00Z",
    deliveryAddress: "Gotera, Debre Zeit Road, Addis Ababa",
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9772",
    items: [
      {
        productId: "prod_005",
        name: "Orbit Ultra 75\" NeoMini-LED 8K TV",
        sku: "ORB-TV-75-NEO",
        price: 175000,
        quantity: 1,
        total: 175000
      },
      {
        productId: "prod_008",
        name: "Orbit CineSound Pro 5.1.2 Soundbar",
        sku: "ORB-AUD-SB-512",
        price: 36000,
        quantity: 1,
        total: 36000
      }
    ],
    subtotal: 211000,
    discountAmount: 10000,
    taxAmount: 30150,
    shippingAmount: 2000,
    grandTotal: 233150,
    deliveredAt: "2026-10-07T14:00:00Z",
    notes: "Executive installation package delivered."
  },
  {
    id: "ORD-2026-8904",
    customerId: "CUST-006",
    customerName: "Bethlehem Haile",
    customerEmail: "betty.haile@gmail.com",
    customerPhone: "+251 944 667 788",
    date: "2026-10-04T15:20:00Z",
    deliveryAddress: "Gerji, Imperial Hotel Area, Addis Ababa",
    paymentMethod: "CBE Birr",
    paymentStatus: "Refunded",
    fulfillmentStatus: "Cancelled",
    carrier: null,
    trackingNumber: null,
    items: [
      {
        productId: "prod_007",
        name: "Orbit Smart Multi-Zone Air Fryer Oven 25L",
        sku: "ORB-KIT-AF-25L",
        price: 18500,
        quantity: 1,
        total: 18500
      }
    ],
    subtotal: 18500,
    discountAmount: 0,
    taxAmount: 2775,
    shippingAmount: 400,
    grandTotal: 21675,
    notes: "Customer cancelled prior to dispatch. Refund processed."
  },
  {
    id: "ORD-2026-8903",
    customerId: "CUST-008",
    customerName: "Selamawit Desta",
    customerEmail: "selam.desta@gmail.com",
    customerPhone: "+251 911 334 455",
    date: "2026-10-02T11:40:00Z",
    deliveryAddress: "Hayahulet, Near Golagol Tower, Addis Ababa",
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9630",
    items: [
      {
        productId: "prod_012",
        name: "Orbit Espresso Master Dual Boiler Machine",
        sku: "ORB-KIT-ESP-DB",
        price: 42000,
        quantity: 1,
        total: 42000
      }
    ],
    subtotal: 42000,
    discountAmount: 2000,
    taxAmount: 6000,
    shippingAmount: 500,
    grandTotal: 46500,
    deliveredAt: "2026-10-03T17:15:00Z",
    notes: "Delivered with complimentary Ethiopian single-origin roast."
  },
  {
    id: "ORD-2026-8902",
    customerId: "CUST-001",
    customerName: "Abebe Kebede",
    customerEmail: "abebe.kebede@gmail.com",
    customerPhone: "+251 911 223 344",
    date: "2026-09-28T09:30:00Z",
    deliveryAddress: "Bole Sub-City, Woreda 03, House 412, Addis Ababa",
    paymentMethod: "Telebirr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9502",
    items: [
      {
        productId: "prod_004",
        name: "Orbit 1.5 Ton Inverter Split AC",
        sku: "ORB-AC-18-INV",
        price: 52000,
        quantity: 2,
        total: 104000
      }
    ],
    subtotal: 104000,
    discountAmount: 5000,
    taxAmount: 14850,
    shippingAmount: 1200,
    grandTotal: 115050,
    deliveredAt: "2026-09-29T16:00:00Z",
    notes: "Delivered and installed in dual bedrooms."
  },
  {
    id: "ORD-2026-8901",
    customerId: "CUST-003",
    customerName: "Dawit Alemu",
    customerEmail: "dawit.alemu@yahoo.com",
    customerPhone: "+251 922 889 911",
    date: "2026-09-24T14:00:00Z",
    deliveryAddress: "Sarbet, Near Canadian Embassy, Addis Ababa",
    paymentMethod: "CBE Birr",
    paymentStatus: "Paid",
    fulfillmentStatus: "Delivered",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9418",
    items: [
      {
        productId: "prod_007",
        name: "Orbit Smart Multi-Zone Air Fryer Oven 25L",
        sku: "ORB-KIT-AF-25L",
        price: 18500,
        quantity: 1,
        total: 18500
      }
    ],
    subtotal: 18500,
    discountAmount: 0,
    taxAmount: 2775,
    shippingAmount: 400,
    grandTotal: 21675,
    deliveredAt: "2026-09-25T11:00:00Z",
    notes: "Standard express delivery."
  }
];

export const initialReturns = [
  {
    id: "RET-2026-041",
    orderId: "ORD-2026-8904",
    customerId: "CUST-006",
    customerName: "Bethlehem Haile",
    productName: "Orbit Smart Multi-Zone Air Fryer Oven 25L",
    sku: "ORB-KIT-AF-25L",
    reason: "Order cancelled before shipment dispatch",
    refundAmount: 21675,
    status: "Approved",
    requestDate: "2026-10-04T16:00:00Z",
    reviewedBy: "Helen M. (Finance Desk)",
    notes: "Full refund authorized via CBE Birr reversing transaction."
  },
  {
    id: "RET-2026-040",
    orderId: "ORD-2026-8908",
    customerId: "CUST-003",
    customerName: "Dawit Alemu",
    productName: "Orbit 9kg Front Load Washing Machine",
    sku: "ORB-WM-90-FL",
    reason: "Customer ordered White but desires Graphite color exchange",
    refundAmount: 0,
    status: "Reviewed",
    requestDate: "2026-10-11T09:30:00Z",
    reviewedBy: "Biniam T. (Support)",
    notes: "Customer contacted. Arranging warehouse swap upon arrival."
  },
  {
    id: "RET-2026-039",
    orderId: "ORD-2026-8901",
    customerId: "CUST-003",
    customerName: "Dawit Alemu",
    productName: "Orbit Smart Multi-Zone Air Fryer Oven 25L",
    sku: "ORB-KIT-AF-25L",
    reason: "Minor cosmetic scratch on exterior knob",
    refundAmount: 2500,
    status: "Approved",
    requestDate: "2026-09-26T14:15:00Z",
    reviewedBy: "Helen M.",
    notes: "Goodwill partial concession approved. Customer kept unit."
  }
];

export const initialShipments = [
  {
    id: "SHP-101",
    orderId: "ORD-2026-8908",
    carrier: "DHL Express Ethiopia",
    trackingNumber: "DHL-ET-443912",
    recipient: "Dawit Alemu",
    destination: "Sarbet, Addis Ababa",
    status: "In Transit",
    estimatedDelivery: "2026-10-14",
    events: [
      { time: "2026-10-10 17:00", description: "Package manifested and packed at Bole Central Warehouse", location: "Addis Ababa Hub" },
      { time: "2026-10-11 08:30", description: "Departed sorting facility in transit to regional dispatch", location: "Kality Logistics Center" },
      { time: "2026-10-12 11:00", description: "Customs and internal inspection cleared", location: "DHL Regional Depot" }
    ]
  },
  {
    id: "SHP-102",
    orderId: "ORD-2026-8910",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9921",
    recipient: "Abebe Kebede",
    destination: "Bole Woreda 03, Addis Ababa",
    status: "Out for Delivery",
    estimatedDelivery: "2026-10-13",
    events: [
      { time: "2026-10-12 15:00", description: "Order picked and quality verified", location: "Orbit Bole Flagship" },
      { time: "2026-10-13 08:45", description: "Loaded onto Delivery Van #04 with installation team", location: "Addis Ababa" }
    ]
  },
  {
    id: "SHP-103",
    orderId: "ORD-2026-8909",
    carrier: "Orbit Express Fleet",
    trackingNumber: "ORB-EXP-9890",
    recipient: "Sara Tadesse",
    destination: "CMC Tsehay Real Estate, Addis Ababa",
    status: "Delivered",
    estimatedDelivery: "2026-10-12",
    events: [
      { time: "2026-10-11 11:00", description: "Order dispatched", location: "Orbit Central Depot" },
      { time: "2026-10-12 16:00", description: "Delivered and unboxed with customer sign-off", location: "CMC Addis Ababa" }
    ]
  }
];

export const initialWarranties = [
  {
    id: "WAR-2026-001",
    serialNumber: "SN-ORB-QLED-889104",
    productId: "prod_001",
    productName: "Orbit 55\" QLED 4K Smart TV",
    customerId: "CUST-001",
    customerName: "Abebe Kebede",
    orderId: "ORD-2026-8910",
    purchaseDate: "2026-10-12",
    durationMonths: 24,
    expirationDate: "2028-10-12",
    status: "Active"
  },
  {
    id: "WAR-2026-002",
    serialNumber: "SN-ORB-REF-772910",
    productId: "prod_002",
    productName: "Orbit 500L French Door Refrigerator",
    customerId: "CUST-002",
    customerName: "Sara Tadesse",
    orderId: "ORD-2026-8909",
    purchaseDate: "2026-10-11",
    durationMonths: 120,
    expirationDate: "2036-10-11",
    status: "Active"
  },
  {
    id: "WAR-2026-003",
    serialNumber: "SN-ORB-AC-18-5520",
    productId: "prod_004",
    productName: "Orbit 1.5 Ton Inverter Split AC",
    customerId: "CUST-004",
    customerName: "Hiwot Mengistu",
    orderId: "ORD-2026-8907",
    purchaseDate: "2026-10-09",
    durationMonths: 60,
    expirationDate: "2031-10-09",
    status: "Active"
  },
  {
    id: "WAR-2024-089",
    serialNumber: "SN-ORB-TV-50-2024",
    productId: "prod_001",
    productName: "Orbit 50\" UHD 4K Smart TV",
    customerId: "CUST-005",
    customerName: "Eskinder Nega",
    orderId: "ORD-2024-4100",
    purchaseDate: "2024-10-20",
    durationMonths: 24,
    expirationDate: "2026-10-20",
    status: "Expiring Soon"
  },
  {
    id: "WAR-2023-014",
    serialNumber: "SN-ORB-WM-07-2023",
    productId: "prod_003",
    productName: "Orbit 7kg Front Loader Washer",
    customerId: "CUST-006",
    customerName: "Bethlehem Haile",
    orderId: "ORD-2023-1102",
    purchaseDate: "2023-05-10",
    durationMonths: 24,
    expirationDate: "2025-05-10",
    status: "Expired"
  }
];

export const initialSupportTickets = [
  {
    id: "TICK-1024",
    subject: "Assistance configuring OrbitOS Dolby Vision on PS5 Pro",
    customerId: "CUST-001",
    customerName: "Abebe Kebede",
    category: "Technical Setup",
    priority: "Medium",
    status: "Open",
    assignee: "Tewodros Kassahun",
    createdAt: "2026-10-12T16:00:00Z",
    updatedAt: "2026-10-12T16:20:00Z",
    internalNotes: [
      { id: "note_1", author: "Tewodros K.", text: "Customer needs HDMI 2.1 port 3 or 4 configured to 'Enhanced Gaming 120Hz' in settings.", timestamp: "2026-10-12 16:20" }
    ]
  },
  {
    id: "TICK-1023",
    subject: "Urgent: French Door Refrigerator water filter light flashing",
    customerId: "CUST-002",
    customerName: "Sara Tadesse",
    category: "Appliance Maintenance",
    priority: "Urgent",
    status: "In Progress",
    assignee: "Yonas Gebre",
    createdAt: "2026-10-12T08:15:00Z",
    updatedAt: "2026-10-12T10:00:00Z",
    internalNotes: [
      { id: "note_2", author: "Yonas G.", text: "First cycle filter flush required after initial 24 hours. Technicians dispatched spare replacement filter.", timestamp: "2026-10-12 10:00" }
    ]
  },
  {
    id: "TICK-1022",
    subject: "Requesting copy of stamped warranty certificate for AC unit",
    customerId: "CUST-004",
    customerName: "Hiwot Mengistu",
    category: "Warranty & Registration",
    priority: "Low",
    status: "Resolved",
    assignee: "Meron Assefa",
    createdAt: "2026-10-10T11:00:00Z",
    updatedAt: "2026-10-11T14:30:00Z",
    internalNotes: [
      { id: "note_3", author: "Meron A.", text: "Official PDF warranty cert with digital stamp emailed to hiwot.m@ethionet.et.", timestamp: "2026-10-11 14:30" }
    ]
  },
  {
    id: "TICK-1021",
    subject: "Scheduled annual preventive maintenance for split AC inverter",
    customerId: "CUST-007",
    customerName: "Yared Bekele",
    category: "Service Request",
    priority: "High",
    status: "In Progress",
    assignee: "Tewodros Kassahun",
    createdAt: "2026-10-09T14:00:00Z",
    updatedAt: "2026-10-10T09:00:00Z",
    internalNotes: [
      { id: "note_4", author: "Tewodros K.", text: "Technician Solomon assigned for site visit Thursday 2 PM.", timestamp: "2026-10-10 09:00" }
    ]
  }
];

export const initialRepairs = [
  {
    id: "REP-2026-081",
    ticketId: "TICK-1021",
    customerId: "CUST-007",
    customerName: "Yared Bekele",
    appliance: "Orbit 1.5 Ton Inverter Split AC",
    serialNumber: "SN-ORB-AC-18-9901",
    issue: "Preventive deep chemical condenser coil cleaning & gas pressure check",
    technician: "Solomon Tsegaye (Certified Senior HVAC)",
    appointmentDate: "2026-10-15 14:00",
    status: "Scheduled",
    partsNeeded: ["R32 Refrigerant top-up (0.2kg)", "Coil antimicrobial spray"],
    notes: "Site visit confirmed with homeowner at Gotera."
  },
  {
    id: "REP-2026-080",
    ticketId: "TICK-1023",
    customerId: "CUST-002",
    customerName: "Sara Tadesse",
    appliance: "Orbit 500L French Door Refrigerator",
    serialNumber: "SN-ORB-REF-772910",
    issue: "Water filter sensor recalibration and flow meter check",
    technician: "Mulugeta Wolde (Refrigeration Specialist)",
    appointmentDate: "2026-10-13 11:30",
    status: "In Repair",
    partsNeeded: ["Orbit HydroPure Carbon Block Filter cartridge #ORB-WF50"],
    notes: "Technician currently on route."
  },
  {
    id: "REP-2026-079",
    ticketId: "TICK-1018",
    customerId: "CUST-005",
    customerName: "Eskinder Nega",
    appliance: "Orbit 9kg Front Load Washing Machine",
    serialNumber: "SN-ORB-WM-90-4412",
    issue: "Vibration dampening leg adjustment and drum calibration",
    technician: "Solomon Tsegaye",
    appointmentDate: "2026-10-05 10:00",
    status: "Completed",
    partsNeeded: ["Rubber anti-vibration isolation pads (Set of 4)"],
    notes: "Completed successfully. Vibration level verified under 42dB."
  }
];

export const initialKnowledgeBase = [
  {
    id: "kb_001",
    title: "How to Enable 4K 120Hz & VRR on Orbit QLED Smart TVs",
    category: "Television & Gaming",
    status: "Published",
    views: 1420,
    author: "Tewodros K.",
    updatedAt: "2026-09-15",
    content: "To enable 4K 120Hz on PlayStation 5 or Xbox Series X, plug into HDMI port 3 or 4. Go to Settings > Display & Audio > HDMI Format > Enhanced (VRR)."
  },
  {
    id: "kb_002",
    title: "Seasonal Energy Saving Guide for Orbit Inverter Air Conditioners",
    category: "Air Conditioning",
    status: "Published",
    views: 980,
    author: "Solomon T.",
    updatedAt: "2026-08-20",
    content: "Setting your thermostat to 24°C provides the optimal balance of comfort and energy efficiency. Clean filters every 30 days to save up to 15% on electricity."
  },
  {
    id: "kb_003",
    title: "Standard Warranty Claim & Service Protocol in Ethiopia",
    category: "Warranty & Policy",
    status: "Published",
    views: 3120,
    author: "Meron A.",
    updatedAt: "2026-10-01",
    content: "All Orbit appliances are backed by official warranty certificates. Retain your invoice and ensure the serial number sticker remains intact."
  },
  {
    id: "kb_004",
    title: "Troubleshooting Water Filter Indicator on French Door Refrigerators",
    category: "Refrigeration",
    status: "Draft",
    views: 45,
    author: "Yonas G.",
    updatedAt: "2026-10-10",
    content: "Hold the Filter Reset button for 3 seconds after cartridge replacement until the chime sounds and LED returns to green."
  }
];

export const initialCoupons = [
  {
    id: "CPN-001",
    code: "ORBITWELCOME10",
    type: "percentage",
    value: 10,
    minOrderValue: 20000,
    maxDiscount: 10000,
    usageLimit: 500,
    usedCount: 142,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    applicableCategory: "all",
    isActive: true,
    description: "Welcome discount for new customers across all categories."
  },
  {
    id: "CPN-002",
    code: "HOMECOMFORT5000",
    type: "fixed",
    value: 5000,
    minOrderValue: 80000,
    maxDiscount: 5000,
    usageLimit: 100,
    usedCount: 28,
    startDate: "2026-10-01",
    endDate: "2026-11-15",
    applicableCategory: "refrigerators",
    isActive: true,
    description: "5,000 ETB off premium French Door and Side-by-Side refrigerators."
  },
  {
    id: "CPN-003",
    code: "CINEMAPACK15",
    type: "percentage",
    value: 15,
    minOrderValue: 100000,
    maxDiscount: 25000,
    usageLimit: 50,
    usedCount: 12,
    startDate: "2026-10-05",
    endDate: "2026-10-31",
    applicableCategory: "tvs",
    isActive: true,
    description: "15% off big screen QLED and Mini-LED home cinema packages."
  },
  {
    id: "CPN-004",
    code: "EXPIREDPROMO",
    type: "percentage",
    value: 20,
    minOrderValue: 50000,
    maxDiscount: 15000,
    usageLimit: 200,
    usedCount: 200,
    startDate: "2026-08-01",
    endDate: "2026-08-31",
    applicableCategory: "all",
    isActive: false,
    description: "Expired summer promotion campaign."
  }
];

export const initialBanners = [
  {
    id: "BAN-001",
    title: "Pure Cinematic Brilliance: 8K NeoMini-LED",
    subtitle: "Experience revolutionary contrast and 2,048 local dimming zones.",
    ctaText: "Explore 8K TVs",
    ctaLink: "/products?category=tvs",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&q=80&w=1200",
    badge: "Flagship 2026 Series",
    status: "Published",
    startDate: "2026-10-01",
    endDate: "2026-11-30"
  },
  {
    id: "BAN-002",
    title: "Keep Harvest Freshness Longer with Inverter French Door",
    subtitle: "10-Year compressor warranty with intelligent dual humidity cooling.",
    ctaText: "Shop Refrigerators",
    ctaLink: "/products?category=refrigerators",
    imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&q=80&w=1200",
    badge: "Energy Star A+++",
    status: "Published",
    startDate: "2026-10-01",
    endDate: "2026-11-15"
  },
  {
    id: "BAN-003",
    title: "Smart Laundry Revolution: Steam Wash & AI Fabric Care",
    subtitle: "99.9% allergen removal with silent direct-drive inverter motor.",
    ctaText: "View Washing Machines",
    ctaLink: "/products?category=washing-machines",
    imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&q=80&w=1200",
    badge: "Save 30% Energy",
    status: "Draft",
    startDate: "2026-11-01",
    endDate: "2026-12-15"
  }
];

export const initialCampaigns = [
  {
    id: "CMP-001",
    title: "Meskel Festival Tech Bonanza",
    targetSegment: "All Active Customers",
    subject: "Special Festive Upgrade Offers: Up to 15,000 ETB Off Smart TVs",
    status: "Sent",
    recipientsCount: 4200,
    openRate: "38.4%",
    clickRate: "12.2%",
    sentDate: "2026-09-22"
  },
  {
    id: "CMP-002",
    title: "VIP Exclusive: Private Preview of Orbit Pro Titan 5G",
    targetSegment: "VIP Customers",
    subject: "Exclusive Invitation: Reserve the Orbit Pro Titan 5G with Free Earbuds",
    status: "Sent",
    recipientsCount: 380,
    openRate: "64.2%",
    clickRate: "29.8%",
    sentDate: "2026-10-02"
  },
  {
    id: "CMP-003",
    title: "Seasonal AC Preventive Maintenance Reminder",
    targetSegment: "AC & Fridge Buyers",
    subject: "Ensure Peak Efficiency: Complimentary AC Filter Inspection This Month",
    status: "Draft",
    recipientsCount: 1450,
    openRate: "-",
    clickRate: "-",
    sentDate: null
  }
];

export const initialReviews = [
  {
    id: "REV-001",
    productId: "prod_001",
    productName: "Orbit 55\" QLED 4K Smart TV",
    customerName: "Abebe Kebede",
    rating: 5,
    title: "Unbelievable Picture Quality for the Price",
    comment: "The colors pop right out of the screen. Hooked up my gaming console and 120Hz is buttery smooth. Highly recommended!",
    date: "2026-10-08",
    status: "Approved"
  },
  {
    id: "REV-002",
    productId: "prod_002",
    productName: "Orbit 500L French Door Refrigerator",
    customerName: "Sara Tadesse",
    rating: 5,
    title: "Spacious, Whisper Quiet, and Extremely Elegant",
    comment: "Fits all our grocery needs for weeks. Vegetables stay crisp and fresh for over 10 days. The water dispenser is convenient.",
    date: "2026-10-09",
    status: "Approved"
  },
  {
    id: "REV-003",
    productId: "prod_004",
    productName: "Orbit 1.5 Ton Inverter Split AC",
    customerName: "Dawit Alemu",
    rating: 4,
    title: "Cools the living room in under 5 minutes",
    comment: "Very powerful unit and very quiet on eco mode. Installation technician did a neat and clean job.",
    date: "2026-10-10",
    status: "Approved"
  },
  {
    id: "REV-004",
    productId: "prod_007",
    productName: "Orbit Smart Multi-Zone Air Fryer Oven 25L",
    customerName: "Tigist W.",
    rating: 2,
    title: "Manual could have clearer cooking instructions",
    comment: "The unit works well but the recipe booklet lacks local Ethiopian recipes. Please provide more recipe guides.",
    date: "2026-10-11",
    status: "Pending"
  }
];

export const initialRoles = [
  {
    id: "super_admin",
    name: "Super Admin",
    description: "Unrestricted access across all financial, inventory, security, and staff settings.",
    userCount: 2,
    permissions: {
      analytics: { view: true, export: true },
      orders: { view: true, create: true, edit: true, delete: true, refund: true },
      products: { view: true, create: true, edit: true, delete: true },
      inventory: { view: true, adjust: true, import: true, export: true },
      customers: { view: true, create: true, edit: true, delete: true },
      support: { view: true, assign: true, resolve: true },
      marketing: { view: true, create: true, publish: true },
      settings: { view: true, edit: true, rbac: true }
    }
  },
  {
    id: "store_manager",
    name: "Store Manager",
    description: "Manages day-to-day operations, sales fulfillment, product updates, and customer relations.",
    userCount: 4,
    permissions: {
      analytics: { view: true, export: true },
      orders: { view: true, create: true, edit: true, delete: false, refund: true },
      products: { view: true, create: true, edit: true, delete: false },
      inventory: { view: true, adjust: true, import: true, export: true },
      customers: { view: true, create: true, edit: true, delete: false },
      support: { view: true, assign: true, resolve: true },
      marketing: { view: true, create: true, publish: true },
      settings: { view: true, edit: false, rbac: false }
    }
  },
  {
    id: "support_agent",
    name: "Support Agent",
    description: "Dedicated to tickets, customer communication, warranties, and service dispatch.",
    userCount: 8,
    permissions: {
      analytics: { view: false, export: false },
      orders: { view: true, create: false, edit: false, delete: false, refund: false },
      products: { view: true, create: false, edit: false, delete: false },
      inventory: { view: true, adjust: false, import: false, export: false },
      customers: { view: true, create: true, edit: true, delete: false },
      support: { view: true, assign: true, resolve: true },
      marketing: { view: false, create: false, publish: false },
      settings: { view: false, edit: false, rbac: false }
    }
  },
  {
    id: "warehouse_staff",
    name: "Warehouse Staff",
    description: "Stock intake, inventory counts, picking, packing, and shipment tracking.",
    userCount: 6,
    permissions: {
      analytics: { view: false, export: false },
      orders: { view: true, create: false, edit: true, delete: false, refund: false },
      products: { view: true, create: false, edit: false, delete: false },
      inventory: { view: true, adjust: true, import: true, export: true },
      customers: { view: false, create: false, edit: false, delete: false },
      support: { view: false, assign: false, resolve: false },
      marketing: { view: false, create: false, publish: false },
      settings: { view: false, edit: false, rbac: false }
    }
  },
  {
    id: "content_editor",
    name: "Content Editor",
    description: "Catalog descriptions, marketing banners, email drafts, and review moderation.",
    userCount: 3,
    permissions: {
      analytics: { view: true, export: false },
      orders: { view: false, create: false, edit: false, delete: false, refund: false },
      products: { view: true, create: true, edit: true, delete: false },
      inventory: { view: false, adjust: false, import: false, export: false },
      customers: { view: false, create: false, edit: false, delete: false },
      support: { view: false, assign: false, resolve: false },
      marketing: { view: true, create: true, publish: true },
      settings: { view: false, edit: false, rbac: false }
    }
  }
];

export const initialAuditLogs = [
  {
    id: "AUD-9912",
    actor: "Admin (Tadesse W.)",
    role: "Super Admin",
    action: "Updated Order Status",
    resource: "Order #ORD-2026-8910",
    details: "Changed status from Pending to Processing (Telebirr confirmed)",
    timestamp: "2026-10-12 14:35:10",
    status: "Success"
  },
  {
    id: "AUD-9911",
    actor: "Helen M.",
    role: "Store Manager",
    action: "Approved Return Request",
    resource: "Return #RET-2026-041",
    details: "Authorized 21,675 ETB refund for customer Bethlehem Haile",
    timestamp: "2026-10-11 16:20:00",
    status: "Success"
  },
  {
    id: "AUD-9910",
    actor: "Solomon T.",
    role: "Warehouse Staff",
    action: "Inventory Restock",
    resource: "Product ORB-TV-55-QLED",
    details: "Added +20 units to available physical stock",
    timestamp: "2026-10-10 11:15:22",
    status: "Success"
  },
  {
    id: "AUD-9909",
    actor: "Meron A.",
    role: "Content Editor",
    action: "Published Promotion",
    resource: "Coupon CINEMAPACK15",
    details: "Activated 15% discount code for QLED home theater category",
    timestamp: "2026-10-09 09:40:00",
    status: "Success"
  },
  {
    id: "AUD-9908",
    actor: "Yonas G.",
    role: "Support Agent",
    action: "Created Service Repair",
    resource: "Repair #REP-2026-080",
    details: "Dispatched technician for French Door Refrigerator water filter",
    timestamp: "2026-10-08 10:10:05",
    status: "Success"
  }
];

export const initialNotifications = [
  {
    id: "notif_001",
    title: "Low Stock Alert: French Door Refrigerator",
    message: "Orbit 500L French Door has 12 units remaining (Threshold: 15).",
    type: "warning",
    link: "/admin/inventory",
    timestamp: "10 mins ago",
    read: false
  },
  {
    id: "notif_002",
    title: "Urgent Support Ticket Assigned",
    message: "Ticket #TICK-1023 regarding refrigerator filter requires attention.",
    type: "urgent",
    link: "/admin/support",
    timestamp: "35 mins ago",
    read: false
  },
  {
    id: "notif_003",
    title: "New High-Value Order Placed",
    message: "Order #ORD-2026-8910 (75,250 ETB) requires warehouse fulfillment.",
    type: "info",
    link: "/admin/orders",
    timestamp: "1 hour ago",
    read: false
  },
  {
    id: "notif_004",
    title: "Warranty Expiring in 7 Days",
    message: "Warranty #WAR-2024-089 for Eskinder Nega expires on Oct 20.",
    type: "alert",
    link: "/admin/support/warranties",
    timestamp: "3 hours ago",
    read: true
  }
];
