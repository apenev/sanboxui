export type RequestStatus = "new" | "in_progress" | "completed" | "cancelled"
export type RequestPriority = "low" | "medium" | "high"

export interface Client {
  id: string
  name: string
  email: string
  company: string
  revenue: number
  industry: string
  orderHistory: {
    totalOrders: number
    lastOrderDate: string
    averageOrderValue: number
    totalRevenue: number
  }
  riskScore: number
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  deliveryTime: string
  specs: {
    speed: string
    ports: string[]
    features: string[]
  }
}

export interface MarketData {
  averagePrice: number
  priceRange: {
    min: number
    max: number
  }
  trend: "rising" | "falling" | "stable"
  competitorPrices: {
    competitor: string
    price: number
  }[]
  recommendation: string
}

export interface AIAnalysis {
  type: "RFQ ( Request for Quote )" | "Technical question" | "Consultation" | "Bulk Order" | "Support" | "Used Equipment Sale" | "WTB ( want to buy )"
  confidence: number
  marketAnalysis: string
  matchingProducts: Product[]
  suggestedPrice?: number
  marketData?: MarketData
  riskAssessment: {
    score: number
    factors: string[]
  }
  suggestedResponse: string
  placeholders: {
    [key: string]: string
  }
}

export interface SalesRequest {
  id: string
  client: Client
  subject: string
  text: string
  date: string
  status: RequestStatus
  priority: RequestPriority
  aiAnalysis: AIAnalysis
  thread: {
    id: string
    messages: {
      id: string
      from: string
      to: string
      date: string
      content: string
    }[]
  }
}

export const clients: Client[] = [{
  id: "1",
  name: "TechFlow Solutions GmbH",
  email: "procurement@techflow-solutions.de",
  company: "TechFlow Solutions GmbH",
  revenue: 4500000,
  industry: "IT Services & Cloud Solutions",
  orderHistory: {
    totalOrders: 156,
    lastOrderDate: "2024-06-18T11:30:00Z",
    averageOrderValue: 18500,
    totalRevenue: 2886000
  },
  riskScore: 12
},
{
  id: "2",
  name: "Mark Johnson",
  email: "mjohnson@technet-solutions-example.com",
  company: "TechNet Solutions LLC",
  revenue: 1200000,
  industry: "Network Solutions",
  orderHistory: {
    totalOrders: 0,
    lastOrderDate: "Never",
    averageOrderValue: 0,
    totalRevenue: 0
  },
  riskScore: 45
},
{
  id: "3",
  name: "Alpine Infrastructure Partners",
  email: "orders@alpine-infra.at",
  company: "Alpine Infrastructure Partners",
  revenue: 850000,
  industry: "System Integration",
  orderHistory: {
    totalOrders: 28,
    lastOrderDate: "2024-05-12T14:20:00Z",
    averageOrderValue: 8200,
    totalRevenue: 229600
  },
  riskScore: 22
},
{
  id: "4",
  name: "Vienna Digital Hub GmbH",
  email: "tech@vienna-digital.com",
  company: "Vienna Digital Hub GmbH",
  revenue: 2900000,
  industry: "Digital Transformation",
  orderHistory: {
    totalOrders: 89,
    lastOrderDate: "2024-06-15T16:45:00Z",
    averageOrderValue: 14500,
    totalRevenue: 1290500
  },
  riskScore: 15
},
{
  id: "5",
  name: "NetSecure Consulting",
  email: "procurement@netsecure.de",
  company: "NetSecure Consulting",
  revenue: 1650000,
  industry: "Cybersecurity",
  orderHistory: {
    totalOrders: 67,
    lastOrderDate: "2024-06-10T08:30:00Z",
    averageOrderValue: 22000,
    totalRevenue: 1474000
  },
  riskScore: 18
}
]

export const products: Product[] = [{
  id: "1",
  name: "Cisco Catalyst 9300-24P",
  category: "Network Switches",
  price: 4850,
  stock: 8,
  deliveryTime: "2-3 business days",
  specs: {
    speed: "24x 1G + 4x 10G SFP+",
    ports: ["24x RJ45", "4x SFP+"],
    features: ["PoE+", "Modular", "Stacking", "Redundant PSU"],
  },
},
{
  id: "2",
  name: "Cisco Catalyst 9300-24U",
  category: "Network Switches",
  price: 5650,
  stock: 5,
  deliveryTime: "2-3 business days",
  specs: {
    speed: "24x 1G + 4x 10G SFP+",
    ports: ["24x RJ45", "4x SFP+"],
    features: ["UPOE", "Modular", "Stacking", "Redundant PSU"],
  },
},
{
  id: "3",
  name: "Cisco Catalyst 3850-24XU",
  category: "Network Switches",
  price: 6200,
  stock: 3,
  deliveryTime: "1 week",
  specs: {
    speed: "24x 1G + 2x 10G SFP+",
    ports: ["24x RJ45", "2x SFP+"],
    features: ["UPOE", "Modular", "Stacking", "Redundant PSU"],
  },
},
{
  id: "4",
  name: "Cisco Catalyst 9200L-24PXG",
  category: "Network Switches",
  price: 3850,
  stock: 12,
  deliveryTime: "In stock",
  specs: {
    speed: "24x 1G + 4x 10G SFP+",
    ports: ["24x RJ45", "4x SFP+"],
    features: ["PoE+", "Fixed PSU", "No Stacking"],
  },
},
{
  id: "5",
  name: "1G SFP Module - Copper",
  category: "Network Hardware",
  price: 45,
  stock: 120,
  deliveryTime: "In stock",
  specs: {
    speed: "1 Gbps",
    ports: ["RJ45"],
    features: ["Copper", "Compatible with C9200L"],
  }
},
{
  id: "6",
  name: "1G SFP Module - Fiber",
  category: "Network Hardware", 
  price: 65,
  stock: 85,
  deliveryTime: "In stock",
  specs: {
    speed: "1 Gbps",
    ports: ["LC Fiber"],
    features: ["Single-mode", "Compatible with C9200L"],
  }
},
{
  id: "7",
  name: "Cisco Catalyst 2960X-48TS-L",
  category: "Network Switches",
  price: 2850,
  stock: 2,
  deliveryTime: "In stock (2 units), 5 business days for additional units",
  specs: {
    speed: "48x 1G ports",
    ports: ["48x RJ45", "4x SFP+"],
    features: ["Layer 2", "PoE+", "Stackable"],
  }
}
]
  

export const salesRequests: SalesRequest[] = [
  {
    id: "1",
    client: clients[0],
    subject: "Network Switch Requirements - 24 Port with 10G Uplinks",
    text: "Please give me a comprehensive list of network switches that will meet the following criteria:\n- 24 1G RJ45 ports\n- at least 2x 10G uplinks ( SFP+ ), more uplinks is better!\n- PoE - consider that all kinds of POE are welcome, but give preference to UPOE\n- modular design is preferred - modularity in power supplies and fans\n- 2 power supplies are needed for redundancy\n- stacking as an option would be nice, but please list also models that do not have stacking capabalities\n- Brand : Cisco \n\nPlease list ONLY the SKUs, Please dont forget to include also 9300",
    date: "2024-05-10T09:00:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-1",
      messages: [
        {
          id: "msg-1",
          from: "procurement@techflow-solutions.de",
          to: "sales@company.com",
          date: "2024-05-10T09:00:00Z",
          content: "Please give me a comprehensive list of network switches that will meet the following criteria:\n- 24 1G RJ45 ports\n- at least 2x 10G uplinks ( SFP+ ), more uplinks is better!\n- PoE - consider that all kinds of POE are welcome, but give preference to UPOE\n- modular design is preferred - modularity in power supplies and fans\n- 2 power supplies are needed for redundancy\n- stacking as an option would be nice, but please list also models that do not have stacking capabalities\n- Brand : Cisco \n\nPlease list ONLY the SKUs, Please dont forget to include also 9300"
        }
      ]
    },
    aiAnalysis: {
      type: "Technical question",
      confidence: 0.7,
      marketAnalysis: "TechFlow Solutions GmbH is requesting detailed technical specifications for Cisco network switches. This appears to be a technical evaluation phase before a potential purchase. The enterprise networking market shows strong demand for modular, high-performance switches with redundancy features.",
      matchingProducts: [products[0], products[1], products[2], products[3]],
      riskAssessment: {
        score: 85,
        factors: ["Strong payment history", "Growing industry", "Long-term partnership", "Technical expertise"]
      },
      suggestedResponse: "Based strictly on the provided data, here is a comprehensive list of Cisco network switches that meet your criteria:\n\n**Criteria Recap:**\n- 24 x 1G RJ45 ports\n- At least 2x 10G SFP+ uplinks (more uplinks is better)\n- PoE (all types considered, UPOE preferred)\n- Modular design preferred (modular power supplies and fans)\n- 2 power supplies for redundancy\n- Stacking is a plus (but not required)\n- Brand: Cisco\n\n**SKUs that meet your requirements:**\n\n1. **[SKU_1]** - [DESCRIPTION_1]\n2. **[SKU_2]** - [DESCRIPTION_2]\n3. **[SKU_3]** - [DESCRIPTION_3]\n4. **[SKU_4]** - [DESCRIPTION_4]\n5. **[SKU_5]** - [DESCRIPTION_5]\n6. **[SKU_6]** - [DESCRIPTION_6]\n7. **[SKU_7]** - [DESCRIPTION_7]\n8. **[SKU_8]** - [DESCRIPTION_8]\n9. **[SKU_9]** - [DESCRIPTION_9]\n10. **[SKU_10]** - [DESCRIPTION_10]\n\n**Notes:**\n- All listed models have 24 RJ45 ports and support PoE (with some supporting UPOE).\n- All have at least 2x 10G SFP+ uplinks (some have more, or modular uplink options).\n- All support redundant, modular power supplies (2 slots).\n- Most support stacking capabilities.\n- All are Cisco branded.\n- Preference for UPOE models: Look for SKUs with \"U\" or \"XU\" designations.\n\n**9300 Series models are included as requested.**\n\nWould you like detailed specifications, pricing, or availability information for any of these models?\n\nBest regards\nYour Technical Sales Team",
      placeholders: {
        "SKU_1": "WS-C3850-24XU",
        "DESCRIPTION_1": "24 ports, 2x 10G SFP+, UPOE, Modular, Stacking",
        "SKU_2": "WS-C3850-24XU-L",
        "DESCRIPTION_2": "24 ports, 2x 10G SFP+, UPOE, Modular, Stacking",
        "SKU_3": "WS-C3850-24XU-S",
        "DESCRIPTION_3": "24 ports, 2x 10G SFP+, UPOE, Modular, Stacking",
        "SKU_4": "WS-C3850-24XU-E",
        "DESCRIPTION_4": "24 ports, 2x 10G SFP+, UPOE, Modular, Stacking",
        "SKU_5": "C9300-24P",
        "DESCRIPTION_5": "24 ports, 4x 10G SFP+, PoE+, Modular, Stacking",
        "SKU_6": "C9300-24U",
        "DESCRIPTION_6": "24 ports, 4x 10G SFP+, UPOE, Modular, Stacking",
        "SKU_7": "C9300-24UX",
        "DESCRIPTION_7": "24 ports, 8x 10G SFP+, UPOE, Modular, Stacking",
        "SKU_8": "C9200L-24PXG-2Y",
        "DESCRIPTION_8": "24 ports, 4x 10G SFP+, PoE+, Fixed PSU, No Stacking",
        "SKU_9": "C9200L-24PXG-4X-E",
        "DESCRIPTION_9": "24 ports, 4x 10G SFP+, PoE+, Fixed PSU, No Stacking",
        "SKU_10": "C9200L-24PXG-4X-A",
        "DESCRIPTION_10": "24 ports, 4x 10G SFP+, PoE+, Fixed PSU, No Stacking"
      }
    },
  },
  {
    id: "2",
    client: clients[1],
    subject: "Used Cisco Switch for Sale - Cisco Catalyst 2960-X Series",
    text: "Hello,\n\nI hope this email finds you well. My name is Mark Johnson and I work for a network solutions company here in Dallas.\n\nWe recently completed a network upgrade for one of our enterprise clients and have some used but fully functional Cisco switches available. Since I know many businesses are always looking for cost-effective networking solutions, I thought I'd reach out with the following offer:\n\nCisco Catalyst 2960-X-48TS-L\n\n48 x 10/100/1000 Ethernet Ports\n2 x 10G SFP+ Uplink Ports\nLayer 2 Switching\nPoE+ Support (370W)\nRack-mountable (1U)\n\nThis switch was operational for approximately 2 years in a climate-controlled data center environment and is in excellent condition. All ports are fully functional, and we can arrange an on-site functionality test if desired.\n\nAsking Price: $750 (plus applicable taxes)\nFor comparison: A new switch of this series currently retails for over $2,000.\n\nThe unit comes with original power cables and rack mounting hardware. We also have the original Cisco documentation and can provide proof of purchase if needed.\n\nIf you're interested or need additional technical specifications, please don't hesitate to contact me. I can also provide photos of the equipment and arrange for inspection.\n\nBest regards,\nMark Johnson\nTechNet Solutions LLC\nPhone: (214) 555-0123\nEmail: mjohnson@technet-solutions-example.com",
    date: "2024-05-09T14:30:00Z",
    status: "new",
    priority: "medium",
    thread: {
      id: "thread-2",
      messages: [
        {
          id: "msg-2",
          from: "mjohnson@technet-solutions-example.com",
          to: "sales@company.com",
          date: "2024-05-09T14:30:00Z",
          content: "Hello,\n\nI hope this email finds you well. My name is Mark Johnson and I work for a network solutions company here in Dallas.\n\nWe recently completed a network upgrade for one of our enterprise clients and have some used but fully functional Cisco switches available. Since I know many businesses are always looking for cost-effective networking solutions, I thought I'd reach out with the following offer:\n\nCisco Catalyst 2960-X-48TS-L\n\n48 x 10/100/1000 Ethernet Ports\n2 x 10G SFP+ Uplink Ports\nLayer 2 Switching\nPoE+ Support (370W)\nRack-mountable (1U)\n\nThis switch was operational for approximately 2 years in a climate-controlled data center environment and is in excellent condition. All ports are fully functional, and we can arrange an on-site functionality test if desired.\n\nAsking Price: $750 (plus applicable taxes)\nFor comparison: A new switch of this series currently retails for over $2,000.\n\nThe unit comes with original power cables and rack mounting hardware. We also have the original Cisco documentation and can provide proof of purchase if needed.\n\nIf you're interested or need additional technical specifications, please don't hesitate to contact me. I can also provide photos of the equipment and arrange for inspection.\n\nBest regards,\nMark Johnson\nTechNet Solutions LLC\nPhone: (214) 555-0123\nEmail: mjohnson@technet-solutions-example.com"
        }
      ]
    },
    aiAnalysis: {
      type: "WTB ( want to buy )",
      confidence: 0.85,
      marketAnalysis: "Mark Johnson from TechNet Solutions LLC is offering a used Cisco Catalyst 2960-X-48TS-L switch. This is a reverse sales inquiry where they want to sell equipment to us. The used networking equipment market shows good demand for quality Cisco switches at competitive prices.",
      matchingProducts: [products[6]],
      riskAssessment: {
        score: 65,
        factors: ["New business relationship", "Used equipment sale", "External vendor", "Requires verification"]
      },
      suggestedResponse: "Dear Mark Johnson,\n\nThank you for reaching out to us regarding the used Cisco Catalyst 2960-X-48TS-L switch.\n\nWe have forwarded your request to our internal procurement team for evaluation. You can expect an answer within [RESPONSE_TIME] business days.\n\n**Next Steps:**\nOur procurement team will review:\n- [REVIEW_ITEM_1]\n- [REVIEW_ITEM_2]\n- [REVIEW_ITEM_3]\n- [REVIEW_ITEM_4]\n\n**Required Information:**\nTo expedite the process, please prepare:\n- [REQUIRED_1]\n- [REQUIRED_2]\n- [REQUIRED_3]\n\nWe appreciate your interest in working with us and will be in touch soon.\n\nBest regards\nProcurement Team",
      placeholders: {
        "RESPONSE_TIME": "5",
        "REVIEW_ITEM_1": "Equipment condition and specifications",
        "REVIEW_ITEM_2": "Pricing competitiveness",
        "REVIEW_ITEM_3": "Documentation completeness",
        "REVIEW_ITEM_4": "Current market demand",
        "REQUIRED_1": "Detailed photos of the equipment",
        "REQUIRED_2": "Proof of purchase documentation",
        "REQUIRED_3": "Functionality test results"
      }
    },
  },
  {
    id: "3",
    client: clients[3],
    subject: "Bulk Order Barcode Scanners",
    text: "Dear Sir or Madam,\n\nWe would like to order 50 barcode scanners. Please send us a quote including delivery time.\n\nBest regards\nVienna Digital Hub GmbH",
    date: "2024-05-07T16:45:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-3",
      messages: [
        {
          id: "msg-3",
          from: "tech@vienna-digital.com",
          to: "sales@company.com",
          date: "2024-05-07T16:45:00Z",
          content: "Dear Sir or Madam,\n\nWe would like to order 50 barcode scanners. Please send us a quote including delivery time.\n\nBest regards\nVienna Digital Hub GmbH"
        }
      ]
    },
    aiAnalysis: {
      type: "WTB ( want to buy )",
      confidence: 0.95,
      marketAnalysis: "Vienna Digital Hub GmbH is a premium customer with excellent payment history. Barcode scanners have stable demand in the retail sector.",
      matchingProducts: [products[3]],
      suggestedPrice: 4450,
      marketData: {
        averagePrice: 95,
        priceRange: { min: 75, max: 120 },
        trend: "stable",
        competitorPrices: [
          { competitor: "ScanTech", price: 92 },
          { competitor: "BarcodePoint", price: 88 }
        ],
        recommendation: "Volume discount possible - very attractive deal."
      },
      riskAssessment: {
        score: 95,
        factors: ["Premium customer", "Large order quantity", "Excellent history"]
      },
      suggestedResponse: "Dear Sir or Madam,\n\nThank you for your bulk order of 50 barcode scanners.\n\n**Quote:**\n- 50x Barcode Scanner Pro\n- Unit price: [UNIT_PRICE] $\n- Volume discount: [DISCOUNT]%\n- Total price: [TOTAL_PRICE] $ (net)\n\n**Terms:**\n- Delivery time: [DELIVERY_TIME]\n- Payment terms: [PAYMENT_TERMS]\n- Warranty: [WARRANTY]\n\n**Additional Services:**\n- [EXTRA_1]\n- [EXTRA_2]\n\nWe look forward to your order.\n\nBest regards\nYour Sales Team",
      placeholders: {
        "UNIT_PRICE": "89",
        "DISCOUNT": "15",
        "TOTAL_PRICE": "3,782.50",
        "DELIVERY_TIME": "1-2 business days",
        "PAYMENT_TERMS": "30 days net",
        "WARRANTY": "2-year warranty",
        "EXTRA_1": "Free configuration",
        "EXTRA_2": "Free spare parts for 1 year"
      }
    },
  },
  {
    id: "4",
    client: clients[4],
    subject: "SFP Module Compatibility Question",
    text: "Hello,\n\nI have 2x C9200L-24P-4G-A and I need suitable SFP modules that are 10G, what modules can you offer?\n\nBest regards\nNetSecure Consulting",
    date: "2024-01-16T14:20:00Z",
    status: "new",
    priority: "medium",
    thread: {
      id: "thread-4",
      messages: [
        {
          id: "msg-4",
          from: "procurement@netsecure.de",
          to: "sales@company.com",
          date: "2024-01-16T14:20:00Z",
          content: "Hello,\n\nI have 2x C9200L-24P-4G-A and I need suitable SFP modules that are 10G, what modules can you offer?\n\nBest regards\nNetSecure Consulting"
        }
      ]
    },
    aiAnalysis: {
      type: "Technical question",
      confidence: 0.96,
      marketAnalysis: "NetSecure Consulting is a cybersecurity company with good technical knowledge. This is a technical compatibility question that requires accurate product information.",
      matchingProducts: [products[4], products[5]],
      riskAssessment: {
        score: 82,
        factors: ["Established customer", "Technical inquiry", "Good payment history"]
      },
      suggestedResponse: "Hello NetSecure Consulting,\n\nThank you for your inquiry about SFP modules for your Cisco Catalyst switches.\n\n**Important Technical Information:**\nBased on the information provided, the Cisco Catalyst 9200L-24P-4G-A switch has 4 fixed 1G SFP uplink ports and only supports 1G SFP modules for these uplink ports. It does not support 10G SFP modules. Therefore, you cannot use 10G SFP modules with this switch model. Only 1G SFP modules are suitable and supported for the uplink ports on the C9200L-24P-4G-A.\n\n**Available 1G SFP Modules:**\n- [COPPER_MODULE]: [COPPER_PRICE] $ - [COPPER_SPECS]\n- [FIBER_MODULE]: [FIBER_PRICE] $ - [FIBER_SPECS]\n\n**Alternative Solutions:**\nIf you require 10G connectivity, you would need to consider upgrading to a switch model that supports 10G SFP+ modules, such as the Catalyst 9200L series with 10G uplinks.\n\nPlease let us know if you need assistance with compatible 1G modules or information about 10G-capable switches.\n\nBest regards\nYour Technical Sales Team",
      placeholders: {
        "COPPER_MODULE": "1G SFP Module - Copper",
        "COPPER_PRICE": "45",
        "COPPER_SPECS": "RJ45, Compatible with C9200L",
        "FIBER_MODULE": "1G SFP Module - Fiber",
        "FIBER_PRICE": "65", 
        "FIBER_SPECS": "LC Fiber, Single-mode, Compatible with C9200L"
      }
    },
  },
  {
    id: "5",
    client: clients[1],
    subject: "Quote Request for Cisco 2960X Switch",
    text: "Hello,\n\nCan you give me a quote for WS-C2960X-48TS-L, is it on stock? If not what would be the price for 4 of them?\n\nBest regards\nMark Johnson",
    date: "2024-01-17T10:45:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-5",
      messages: [
        {
          id: "msg-5",
          from: "mjohnson@technet-solutions-example.com",
          to: "sales@company.com",
          date: "2024-01-17T10:45:00Z",
          content: "Hello,\n\nCan you give me a quote for WS-C2960X-48TS-L, is it on stock? If not what would be the price for 4 of them?\n\nBest regards\nMark Johnson"
        }
      ]
    },
    aiAnalysis: {
      type: "RFQ ( Request for Quote )",
      confidence: 0.94,
      marketAnalysis: "Mark Johnson from TechNet Solutions LLC is requesting a quote for Cisco switches. This appears to be a legitimate purchase inquiry from a network solutions company.",
      matchingProducts: [products[6]],
      suggestedPrice: 11400,
      marketData: {
        averagePrice: 2900,
        priceRange: { min: 2700, max: 3200 },
        trend: "stable",
        competitorPrices: [
          { competitor: "NetworkPro", price: 2920 },
          { competitor: "CiscoPartner", price: 2880 }
        ],
        recommendation: "Competitive pricing for business customer with volume potential."
      },
      riskAssessment: {
        score: 75,
        factors: ["New business relationship", "Network solutions industry", "Volume inquiry", "Professional request"]
      },
      suggestedResponse: "Hello Mark Johnson,\n\nThank you for your inquiry about the Cisco Catalyst 2960X-48TS-L switch.\n\n**Stock Status & Quote:**\nYes, we have it on stock but we have just 2 units available. We could provide 2 more within 5 business days.\n\n**Pricing for 4 units:**\n- Unit price: [UNIT_PRICE] $\n- Total for 4 units: [TOTAL_PRICE] $ (net)\n- Volume discount: [DISCOUNT]% applied\n\n**Delivery Schedule:**\n- [IMMEDIATE_STOCK] units: [IMMEDIATE_DELIVERY]\n- [ADDITIONAL_STOCK] units: [ADDITIONAL_DELIVERY]\n\n**Product Specifications:**\n- [PORTS]\n- [FEATURES]\n- [WARRANTY]\n\n**Additional Services:**\n- [SERVICE_1]\n- [SERVICE_2]\n\nWe'd be happy to discuss your networking requirements further.\n\nBest regards\nYour Sales Team",
      placeholders: {
        "UNIT_PRICE": "2,850",
        "TOTAL_PRICE": "10,830",
        "DISCOUNT": "5",
        "IMMEDIATE_STOCK": "2",
        "IMMEDIATE_DELIVERY": "Available immediately",
        "ADDITIONAL_STOCK": "2",
        "ADDITIONAL_DELIVERY": "5 business days",
        "PORTS": "48x 1G RJ45 ports + 4x SFP+ uplinks",
        "FEATURES": "Layer 2 switching, PoE+, Stackable",
        "WARRANTY": "Cisco limited lifetime warranty",
        "SERVICE_1": "Free configuration assistance",
        "SERVICE_2": "Technical support included"
      }
    },
  },
]

export interface Mail {
  id: string
  name: string
  email: string
  subject: string
  text: string
  date: string
  read: boolean
  labels: string[]
  salesRequest?: SalesRequest  // Link to detailed sales request data
}

// Convert sales requests to mail format for the mail list
export const mails: Mail[] = salesRequests.map(request => ({
  id: request.id,
  name: request.client.name,
  email: request.client.email,
  subject: request.subject,
  text: request.text,
  date: request.date,
  read: request.status !== "new",
  labels: [
    request.aiAnalysis.type,
    request.priority === "high" ? "Important" : request.priority === "medium" ? "Normal" : "Low",
    ...(request.aiAnalysis.confidence > 0.9 ? ["AI-Confident"] : []),
    ...(request.client.riskScore < 10 ? ["Premium"] : [])
  ],
  salesRequest: request
}))

// Accounts are created in page.tsx since JSX doesn't work in .ts files