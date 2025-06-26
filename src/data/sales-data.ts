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
  type: "Product Request" | "Price Inquiry" | "Consultation" | "Bulk Order" | "Support" | "Used Equipment Sale"
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
  name: "DataCore Networks AG",
  email: "purchasing@datacore-networks.com",
  company: "DataCore Networks AG",
  revenue: 12800000,
  industry: "Telecommunications",
  orderHistory: {
    totalOrders: 245,
    lastOrderDate: "2024-06-20T09:15:00Z",
    averageOrderValue: 35000,
    totalRevenue: 8575000
  },
  riskScore: 8
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
  name: "Cloud Migration Suite",
  category: "Cloud",
  price: 8999,
  stock: 15,
  deliveryTime: "2-3 business days",
  specs: {
    speed: "Quick start",
    ports: ["API", "Web"],
    features: ["Automation", "Monitoring"],
  },
},
{
  id: "2",
  name: "POS Terminal Pro",
  category: "POS Systems",
  price: 1290,
  stock: 45,
  deliveryTime: "In stock",
  specs: {
    speed: "Ready to use",
    ports: ["USB", "LAN"],
    features: ["Touchscreen", "Cloud backup"],
  },
},
{
  id: "3",
  name: "Security Audit Basic",
  category: "Security",
  price: 1990,
  stock: 0,
  deliveryTime: "1 week",
  specs: {
    speed: "1 week",
    ports: ["Remote"],
    features: ["Report", "Recommendations"],
  },
},
{
  id: "4",
  name: "Barcode Scanner Pro",
  category: "Hardware",
  price: 89,
  stock: 250,
  deliveryTime: "1-2 business days",
  specs: {
    speed: "High speed",
    ports: ["USB", "Bluetooth"],
    features: ["1D/2D", "Waterproof"],
  }
}
]
  

export const salesRequests: SalesRequest[] = [
  {
    id: "1",
    client: clients[0],
    subject: "Quote for Cloud Migration",
    text: "Dear Team,\n\nWe would like to migrate our infrastructure to the cloud. Please send us a quote for the migration and ongoing support.\n\nBest regards\nPenev Inc",
    date: "2024-05-10T09:00:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-1",
      messages: [
        {
          id: "msg-1",
          from: "contact@penevinc.com",
          to: "sales@company.com",
          date: "2024-05-10T09:00:00Z",
          content: "Dear Team,\n\nWe would like to migrate our infrastructure to the cloud. Please send us a quote for the migration and ongoing support.\n\nBest regards\nPenev Inc"
        }
      ]
    },
    aiAnalysis: {
      type: "Product Request",
      confidence: 0.93,
      marketAnalysis: "Penev Inc is an established IT company with stable growth strategy. The cloud migration market shows strong demand with 15% annual growth.",
      matchingProducts: [products[0]],
      suggestedPrice: 8999,
      marketData: {
        averagePrice: 9500,
        priceRange: { min: 7500, max: 12000 },
        trend: "rising",
        competitorPrices: [
          { competitor: "CloudTech Solutions", price: 9200 },
          { competitor: "MigrationPro", price: 8750 }
        ],
        recommendation: "Our price is 5% below market average - very competitive."
      },
      riskAssessment: {
        score: 85,
        factors: ["Strong payment history", "Growing industry", "Long-term partnership"]
      },
      suggestedResponse: "Dear Penev Inc Team,\n\nThank you for your interest in our Cloud Migration Suite. Based on your inquiry, we're happy to create a customized quote for you.\n\n**Quote:**\n- Cloud Migration Suite: [PRICE] $\n- Delivery time: [DELIVERY_TIME]\n- Support: [SUPPORT_OPTIONS]\n\nDue to your long-standing partnership, we can offer you a special price of [SPECIAL_PRICE] $.\n\nPlease don't hesitate to contact us with any questions.\n\nBest regards\nYour Sales Team",
      placeholders: {
        "PRICE": "8,999",
        "DELIVERY_TIME": "2-3 business days",
        "SUPPORT_OPTIONS": "24/7 Premium Support",
        "SPECIAL_PRICE": "8,499"
      }
    },
  },
  {
    id: "2",
    client: clients[1],
    subject: "Price Overview for POS Systems",
    text: "Hello,\n\nWe need a current price overview for your POS systems. Are there volume discounts?\n\nBest regards\nLabyPreise GmbH",
    date: "2024-05-09T14:30:00Z",
    status: "new",
    priority: "medium",
    thread: {
      id: "thread-2",
      messages: [
        {
          id: "msg-2",
          from: "contact@labypreise.de",
          to: "sales@company.com",
          date: "2024-05-09T14:30:00Z",
          content: "Hello,\n\nWe need a current price overview for your POS systems. Are there volume discounts?\n\nBest regards\nLabyPreise GmbH"
        }
      ]
    },
    aiAnalysis: {
      type: "Price Inquiry",
      confidence: 0.88,
      marketAnalysis: "LabyPreise GmbH is an established trading partner with high order volume. POS systems show stable market with good margins.",
      matchingProducts: [products[1]],
      suggestedPrice: 1290,
      marketData: {
        averagePrice: 1350,
        priceRange: { min: 1100, max: 1600 },
        trend: "stable",
        competitorPrices: [
          { competitor: "POS Direct", price: 1320 },
          { competitor: "Terminal Solutions", price: 1280 }
        ],
        recommendation: "Competitive pricing with potential for volume discounts."
      },
      riskAssessment: {
        score: 92,
        factors: ["Excellent payment history", "High-volume customer", "Long-term relationship"]
      },
      suggestedResponse: "Hello LabyPreise GmbH Team,\n\nThank you for your inquiry about our POS systems.\n\n**Current Price List:**\n- POS Terminal Pro: [UNIT_PRICE] $ (unit price)\n- From 10 units: [VOLUME_PRICE_10] $ per unit\n- From 25 units: [VOLUME_PRICE_25] $ per unit\n\n**Additional Benefits:**\n- [DELIVERY_TIME]\n- [WARRANTY]\n- [SUPPORT]\n\nWe'd be happy to create an individual quote based on your desired quantity.\n\nBest regards\nYour Sales Team",
      placeholders: {
        "UNIT_PRICE": "1,290",
        "VOLUME_PRICE_10": "1,190",
        "VOLUME_PRICE_25": "1,090",
        "DELIVERY_TIME": "In stock",
        "WARRANTY": "3-year warranty",
        "SUPPORT": "Free setup service"
      }
    },
  },
  {
    id: "3",
    client: clients[2],
    subject: "IT Security Consultation",
    text: "Good day,\n\nI'm interested in IT security consultation for my company. Please contact me to schedule an appointment.\n\nBest regards\nLeo Penev",
    date: "2024-05-08T11:15:00Z",
    status: "new",
    priority: "low",
    thread: {
      id: "thread-3",
      messages: [
        {
          id: "msg-3",
          from: "contact@leopenev.com",
          to: "sales@company.com",
          date: "2024-05-08T11:15:00Z",
          content: "Good day,\n\nI'm interested in IT security consultation for my company. Please contact me to schedule an appointment.\n\nBest regards\nLeo Penev"
        }
      ]
    },
    aiAnalysis: {
      type: "Consultation",
      confidence: 0.81,
      marketAnalysis: "Leo Penev runs a smaller consulting company. IT security is a growing market with high demand in the SME segment.",
      matchingProducts: [products[2]],
      suggestedPrice: 1990,
      riskAssessment: {
        score: 75,
        factors: ["Smaller order size", "Consulting industry", "New business relationship"]
      },
      suggestedResponse: "Good day Mr. Penev,\n\nThank you for your interest in our IT security consultation.\n\n**Our Offer:**\n- Security Audit Basic: [PRICE] $\n- Scope: [SCOPE]\n- Duration: [DURATION]\n- Delivery time: [DELIVERY_TIME]\n\n**Available Appointments:**\n- [APPOINTMENT_1]\n- [APPOINTMENT_2]\n- [APPOINTMENT_3]\n\nWe'd be happy to schedule a non-binding initial consultation.\n\nBest regards\nYour Security Team",
      placeholders: {
        "PRICE": "1,990",
        "SCOPE": "Complete security analysis",
        "DURATION": "1 week",
        "DELIVERY_TIME": "Can start immediately",
        "APPOINTMENT_1": "Next Tuesday",
        "APPOINTMENT_2": "Next Thursday", 
        "APPOINTMENT_3": "Monday next week"
      }
    },
  },
  {
    id: "4",
    client: clients[3],
    subject: "Bulk Order Barcode Scanners",
    text: "Dear Sir or Madam,\n\nWe would like to order 50 barcode scanners. Please send us a quote including delivery time.\n\nBest regards\nLabyPreise AG",
    date: "2024-05-07T16:45:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-4",
      messages: [
        {
          id: "msg-4",
          from: "contact@labypreise-ag.com",
          to: "sales@company.com",
          date: "2024-05-07T16:45:00Z",
          content: "Dear Sir or Madam,\n\nWe would like to order 50 barcode scanners. Please send us a quote including delivery time.\n\nBest regards\nLabyPreise AG"
        }
      ]
    },
    aiAnalysis: {
      type: "Bulk Order",
      confidence: 0.95,
      marketAnalysis: "LabyPreise AG is a premium wholesale customer with excellent payment history. Barcode scanners have stable demand in the retail sector.",
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