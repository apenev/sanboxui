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
      marketAnalysis: `**CompetitorProbe Results**
Total results: 10

**C9300-24U-A** | **444.51** | **Cisco C9300-24U-A** | Gebraucht | **planet.refurbished**
**C9300-24U-A** | **524.42** | **Cisco C9300-24U-A Catalyst 9300 24-Port UPOE Switch with Network Advantage** | Gut - Refurbished | **esphere_network**
**C9300-24U-A** | **611.82** | **Cisco C9300-24U-A | refurbished | incl. VAT** | Gebraucht | **minutio**
**C9300-24U-A** | **654.00** | **Cisco C9300-24U-A Switch - 24 Anschlüsse - L3 - managed - stapelbar inkl VAT** | Sehr gut - Refurbished | **cybertrading_gmbh**
**C9300-24U-A** | **754.67** | **Cisco C9300-24U-A generalüberholt** | Gebraucht | **it-planet-com**
**C9300-24U-A** | **824.00** | **Cisco C9300-24U-A Switch - 24 Anschlüsse - L3 - managed - stapelbar inkl VAT** | Sehr gut - Refurbished | **cybertrading_gmbh**
**C9300-24U-A** | **1624.00** | **Cisco C9300-24U-A Switch - 24 Anschlüsse - L3 - managed - stapelbar inkl VAT** | Neu: Sonstige (siehe Artikelbeschreibung) | **cybertrading_gmbh**
**C9300-24U-A** | **1670.64** | **Cisco C9300-24U-A neu** | Neu | **it-planet-com**
**C9300-24U-A** | **1974.00** | **Cisco C9300-24U-A Switch - 24 Anschlüsse - L3 - managed - stapelbar inkl VAT** | Neu | **cybertrading_gmbh**
**C9300-24U-A** | **4278.19** | **Cisco - C9300-24U-A - Catalyst 9300 - Network Advantage - Switch - L3 - managed** | Neu | **tonitrus_gmbh**

**EbayProbe Results**
Total results: 40

**C9300-24U-A** | **Cisco Catalyst 9300 24-port UPOE | Network Advantage | C9300-24U-A** | Used | **597.79 EUR** | Link | Good option for sourcing - used condition at competitive price
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24-port UPOE Switch, Network Advantage** | Used | **257.70 EUR** | Link | Excellent sourcing opportunity - very low price for used condition
**C9300-24U-A** | **CISCO C9300-24U-A / CATALYST 9300 24 UPOE SWITCH 24-PORT 1G +NETWORK ADVANTAGE** | Used | **257.91 EUR** | Link | Excellent sourcing opportunity - very low price for used condition
**C9300-24U-A** | **Cisco C9300-24U-A 24-Port UPoE Network Advantage Switch Cosmetic Damage** | Used | **213.50 EUR** | Link | Good sourcing option despite cosmetic damage - very low price
**C9300-24U-A** | **Cisco C9300-24U-A 9300 24-Port UPOE Network Advantage Switch** | Used | **333.06 EUR** | Link | Good sourcing opportunity - competitive used price
**C9300-24U-A** | **Cisco Catalyst 9300 24 UPOE C9300-24U-A** | Used | **340.74 EUR** | Link | Good sourcing opportunity - competitive used price
**C9300-24U-A** | **Cisco Catalyst 9300 24 UPOE C9300-24U-A** | Used | **341.59 EUR** | Link | Good sourcing opportunity - competitive used price
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24 POrt UPOE Advantage** | Used | **384.30 EUR** | Link | Good sourcing opportunity - competitive used price
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24-Port UPOE w/ AC Power WARRANTY** | Used | **422.73 EUR** | Link | Good sourcing option with warranty included
**C9300-24U-A** | **Cisco C9300-24U-A - 24 Ports Fully Managed Power over Ethernet Switch** | Used | **452.62 EUR** | Link | Viable sourcing option from China
**C9300-24U-A** | **Cisco C9300-24U-A 24-port UPOE Ethernet Network Advantage Switch** | Used | **678.93 EUR** | Link | Higher priced used option
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24-port 1G , UPOE, Network Advantage** | Used | **853.15 EUR** | Link | Higher priced used option
**C9300-24U-A** | **Cisco C9300-24U-A 9300 24-Port UPOE Network Advantage Switch- 1 Year Warranty** | Used | **938.55 EUR** | Link | Higher priced but includes 1-year warranty
**C9300-24U-A** | **Cisco C9300-24U-A 9300 24-Port UPOE Network Advantage Switch-Lifetime Warranty** | Very Good - Refurbished | **947.94 EUR** | Link | Good refurbished option with lifetime warranty
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 Series 24-Port UPOE Network Advantage Switch** | New | **1195.60 EUR** | Link | Good new unit price for sourcing
**C9300-24U-A** | **New Cisco C9300-24U-A 24-port 1G copper UPOE switch, modular uplinks, UPOE** | Open box | **1237.45 EUR** | Link | Good open box option
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24 Port UPoE Managed L3 Switch 1pcs PSU, New** | Open box | **1238.30 EUR** | Link | Good open box option
**C9300-24U-A** | **NOB Cisco C9300-24U-A Catalyst 9300 24 Port UPoE Managed L3 Switch** | Open box | **1238.30 EUR** | Link | Good open box option
**C9300-24U-A** | **NEW Cisco Catalyst C9300-24U-A 24 Port UPOE Switch 1- Year Warranty** | New | **1276.73 EUR** | Link | Good new unit with warranty
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24 Port UPoE Managed L3 Switch New** | New | **1408.25 EUR** | Link | New unit option
**C9300-24U-A** | **NEW Cisco Catalyst C9300-24U-A 24 Port UPOE Switch** | New | **1408.25 EUR** | Link | New unit option
**C9300-24U-A** | **Cisco C9300-24U-A 24 Ports Fully Managed Power New Sealed** | New | **1618.65 EUR** | Link | New sealed unit
**C9300-24U-A** | **9300 series C9300-24U-A 48-Port Gigabit UPoE Switch New Sealed Fast Shipping** | New | **1661.03 EUR** | Link | Note: Title mentions 48-port but SKU is 24-port - potential mislisting
**C9300-24U-A** | **Cisco C9300-24U-A 24 Port Gigabit UPoE Network Advantage Switch Fully Tested** | Used | **1974.93 EUR** | Link | Overpriced used unit from Australia
**C9300-24U-A** | **Cisco C9300-24U-A Catalyst 9300 24-port UPOE, Network Advantage** | Open box | **2045.33 EUR** | Link | Overpriced open box unit
**C9300-24U-A** | **New Original CISCO Switch C9300-24U-A DHL Free Shipping** | New | **3214.20 EUR** | Link | Overpriced new unit from China
**C9300-24U-A** | **Cisco C9300-24U-A 9300 24-Port UPOE Network Advantage Switch** | New | **3257.30 EUR** | Link | Overpriced new unit from Hong Kong
**C9300-24U-A** | **New sealed Cisco C9300-24U-A Cisco Catalyst 9300 Series Switch** | New | **3315.23 EUR** | Link | Overpriced new unit from Korea
**C9300-24U-A** | **New Cisco C9300-24U-A DHL UPS fedex Express transport** | New | **3329.75 EUR** | Link | Overpriced new unit from China
**C9300-24U-A** | **Cisco C9300-24U-A 9300 24-Port UPOE Network Advantage Switch** | New | **3365.27 EUR** | Link | Overpriced new unit from Hong Kong
**C9300-24U-A** | **Cisco C9300-24U-A 9300 24-Port UPOE Network Advantage Switch fedex or DHL** | New | **3365.27 EUR** | Link | Overpriced new unit from China
**C9300-24U-A** | **CISCO New Original Genuine Switch C9300-24U-A one-year warranty** | New | **3608.15 EUR** | Link | Overpriced new unit from China
**C9300-24U-A** | **CISCO New Original Genuine Switch C9300-24U-A one-year warranty** | New | **3705.97 EUR** | Link | Overpriced new unit from China
**C9300-24U-A** | **Cisco Catalyst C9300-24U-A C9300-24U-E 24 UPOE Faceplate for Replacement** | New | **65.33 EUR** | Link | Not the actual switch - just faceplate
**C9300-24U-A** | **Cisco C9300-24U-A C9300-24U-E Faceplate for Replacement C9300** | New | **76.86 EUR** | Link | Not the actual switch - just faceplate
**C9300-24U-A** | **Cisco Catalyst C9300-24U-A C9300-24U-E 24 UPOE Faceplate for Replacement /xjk** | New | **68.32 EUR** | Link | Not the actual switch - just faceplate

**Pricing Analysis**

We do not have the **C9300-24U-A** in stock. The competitor market shows a wide range of prices:

• **Used/Refurbished**: **444.51 EUR** to **824.00 EUR**
• **New**: **1624.00 EUR** to **4278.19 EUR**

The lowest competitor price for used/refurbished units is **444.51 EUR** from **planet.refurbished**.

On eBay.com, there are excellent sourcing opportunities:

• **Best used options**: Starting from **213.50 EUR** (with cosmetic damage) to **597.79 EUR**
• **New units**: Starting from **1195.60 EUR** to **1408.25 EUR** (reasonable prices)

For sourcing calculations (adding 200 EUR shipping from US):

• **Used units**: 213.50 + 200 = 413.50 EUR cost, can sell around 540-580 EUR (30%+ margin)
• **New units**: 1195.60 + 200 = 1395.60 EUR cost, can sell around 1815-1900 EUR (30%+ margin)

**Offer for Client**

**Cisco C9300-24U-A - Catalyst 9300 24-Port UPOE Switch with Network Advantage**

We can provide the following options for the **C9300-24U-A**:

**Option 1: Used/Refurbished Unit**
• **Price**: **440 EUR**
• **Condition**: Used, fully tested and functional
• **Lead time**: 2-3 weeks
• **Warranty**: 90 days

**Option 2: New Unit**
• **Price**: **1850 EUR**
• **Condition**: Brand new, factory sealed
• **Lead time**: 2-3 weeks
• **Warranty**: 1 year

**Key Features:**
• 24 x 1G copper ports with UPOE (60W per port)
• 4 x 10G SFP+ uplink ports
• Network Advantage license included
• Stackable (up to 8 units)
• Layer 3 managed switch

Both options include shipping to your location. Please let us know which option works best for your requirements, and we can proceed with the order.`,
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
      marketAnalysis: `Based on your competitive analysis for the **Cisco Catalyst 2960X-48TS-L** switch, here's a strategic pricing recommendation:

**Recommended Pricing Strategy**

**Target Selling Price: €410-415**

• Undercuts competitor (**etree-gmbh**) by **€3-8** while maintaining strong margins
• Positions you competitively without triggering a price war

**Sourcing & Margin Analysis**

**Primary Sourcing Option:**

• Used unit at **€82.84** + **€200** shipping = **€282.84** total cost
• Selling at **€410**: **45%** gross margin (**€127.16** profit)
• Selling at **€415**: **46%** gross margin (**€132.16** profit)

**Alternative Sourcing (Higher Quality):**

• Refurbished with warranty at **€319.56** total cost
• Selling at **€410**: **28%** gross margin (**€90.44** profit)
• Better for brand reputation and customer satisfaction

**Strategic Considerations**

**Advantages of this pricing:**

• Beats competitor price while maintaining healthy margins
• Room for negotiation if customers compare prices
• Strong profit margins even with conservative estimates

**Risk Factors:**

• Used equipment may require additional quality assurance
• Brexit complications with the **€40.55** GB option
• International shipping costs and delivery times

**Recommendation:** Source the tested unit at **€282.84** total cost and price at **€410-412** to optimize the balance between competitiveness and profitability.`,
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
    subject: "SFP Module Compatibility Question",
    text: "Hello,\n\nI have 2x C9200L-24P-4G-A and I need suitable SFP modules that are 10G, what modules can you offer?\n\nBest regards\nNetSecure Consulting",
    date: "2024-01-16T14:20:00Z",
    status: "new",
    priority: "medium",
    thread: {
      id: "thread-3",
      messages: [
        {
          id: "msg-3",
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
      marketAnalysis: `**WAWIProbe Results**
Total results: 1

**SFP-1G-T** | **34.0** | 1 | used | **Arista SFP-1G-T 100/1000BASE-T SFP Copper Transceiver**

**CompetitorProbe Results**
Total results: 60

**SFP-1G-T** | **17.99** | **Arista GBIC SFP-1G-T 1000Base-T SFP RJ-45 100m Transceiver XVR-00007-02** | Hervorragend - Refurbished | **piospartslap**

**SFP-1G-T** | **23.8** | **Juniper 3rd SFP-1G-T-C SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Sehr gut - Refurbished | **cybertrading_gmbh**

**SFP-1G-T** | **15.0** | **Dell 0XTY28 / SFP-1G-T FCLF8521P2BTL-DL 1000base-T 100 m optischer Transceiver** | Gebraucht | **nesevo_com**

**SFP-1G-T** | **9.5** | **Arista SFP-1G-T RJ-45 1000BASE-T XVR-00007-02 1GbE Copper SFP+ Module** | Gebraucht | **pos-traders**

**SFP-1G-T** | **24.95** | **Pureoptics SFP-1G-T-FBX-PO 1000Base-T 100M SFP FRE Transceiver Module** | Gebraucht | **h.elsemann**

**SFP-1G-T** | **18.93** | **Optical transceiver Arista SFP-1G-T 1Gb/s SFP 100m XVR-00007-02** | Gebraucht | **hardwaredirect_eu**

**SFP-1G-T** | **22.68** | **SFP-1G-T FCLF8521P2BTL-DL 0XTY28 SFP-T 1GE RJ45 1000Base-T 100m module** | Gebraucht | **linghou08**

**SFP-1G-T** | **22.68** | **SFP-1G-T FCLF8521P2BTL-DL 0XTY28 SFP-T 1GE RJ45 1000Base-T 100m module** | Gebraucht | **a642jiecan**

**SFP-1G-T** | **29.75** | **Juniper SFP-1G-T-C SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Sehr gut - Refurbished | **cybertrading_gmbh**

**SFP-1G-T** | **21.06** | **Arista SFP-1G-T Arista 1000Base-T RJ45 SFP Modul Arista XVR-00007-02** | Used | **abdula3617**

**SFP-1G-T** | **22.23** | **Dell 1G Gigabit RJ45 1GBase-T SFP Modul Transceiver 0XTY28 SFP-1G-T** | Opened – never used | **mobileworld2442**

**SFP-1G-T** | **12.92** | **Dell SFP-1G-T** | Neu: Sonstige | **planet.refurbished**

**SFP-1G-T** | **25.23** | **SFP-1G-T FCLF8521P2BTL-DL 0XTY28 SFP-T 1GE RJ45 1000Base-T 100m module** | Gebraucht | **jieyun202306-d8**

**SFP-1G-T** | **48.0** | **Dell SFP-1G-T Transceiver Modul 1GbE SFP RJ45 - 0XTY28** | Sehr gut - Refurbished | **gekko-computer**

**SFP-1G-T** | **51.99** | **ARISTA - SFP-1G-T - 1G SR 1000BASE-T Ethernet Module Transceiver** | Gebraucht | **tonitrus_gmbh**

**SFP-1G-T** | **53.61** | **StarTech.com ARISTA NETWORKS SFP-1G-T COMP SFP MODULE - COPPER TRANSCEIVER** | Neu | **rarewaves-outlet**

**SFP-1G-T** | **49.67** | **Fasermodul SEP MultioModo Startech AR-SFP-1G-T-ST** | Neu | **voledv**

**SFP-1G-T** | **57.11** | **TitanLINK Arista SFP-1G-T Premium SFP Transceiver kompatibel** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **59.9** | **DELL EMC Original SFP-1G-T 1000Base-T 100 m Transceiver Module 0XTY28 neu** | Sehr gut - Refurbished | **piospartslap**

**SFP-1G-T** | **50.87** | **Origin Storage SFP-1G-T-JNP Juniper kompatibler Transceiver** | New | **youritdelivered**

**SFP-1G-T** | **50.87** | **Origin Storage AR-SFP-1G-T Arista kompatibler Transceiver** | New | **youritdelivered**

**SFP-1G-T** | **50.87** | **Origin Storage SFP-1G-T-AR Arista kompatibler Transceiver** | New | **youritdelivered**

**SFP-1G-T** | **50.87** | **Origin Storage SFP-1G-T-DE Dell kompatibler Transceiver** | New | **youritdelivered**

**SFP-1G-T** | **16.58** | **Sfpex Arista SFP-1G-T kompatibel RJ45 100Base-T** | Usato | **ntc_tech**

**SFP-1G-T** | **64.24** | **Arista Networks SFP-1G-T kompatibler BlueOptics SFP** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **64.24** | **Intel SFP-1G-T-IT kompatibler BlueOptics SFP** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **64.24** | **Centec SFP-1G-T-CT kompatibler BlueOptics SFP** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **64.24** | **Dell EMC SFP-1G-T kompatibler BlueOptics SFP** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **64.24** | **DZS Zhone SFP-1G-T-ZH kompatibler BlueOptics SFP** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **64.24** | **Asus SFP-1G-T-AU kompatibler BlueOptics SFP** | Neu | **cbogmbh_mh**

**SFP-1G-T** | **39.0** | **Dell SFP-1G-T 1000BASE-T SFP Copper RJ-45 FCLF8521P2BTL-DL XTY28** | Nuevo | **asturcash**

**SFP-1G-T** | **65.45** | **Juniper SFP-1G-T-C SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Neu: Sonstige | **cybertrading_gmbh**

**SFP-1G-T** | **66.0** | **Fasermodul SEP MultioModo Startech AR-SFP-1G-T-ST** | Neu | **elwayug**

**SFP-1G-T** | **16.78** | **Sfpex Arista SFP-1G-T kompatibel RJ45 100BASE-T** | Occasion | **ntc_tech**

**SFP-1G-T** | **58.0** | **gbic ARISTA SFP-1G-T XVR-10007-20** | Gebraucht | **refurb_servers**

**SFP-1G-T** | **71.4** | **Juniper SFP-1G-T-C SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Sehr gut - Refurbished | **cybertrading_gmbh**

**SFP-1G-T** | **71.4** | **Juniper 3rd SFP-1G-T-C SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Sehr gut - Refurbished | **cybertrading_gmbh**

**SFP-1G-T** | **67.2** | **0065030885157 SFP-1G-T KOMPATIBLES/SFP MODUL - KUPFER-TRANSCEIVER** | Neu | **katomixshop**

**SFP-1G-T** | **77.99** | **Lot of 5 Arista 1000BASE-T RJ45 SFP XVR-00007-02 for Arista 08T47V SFP-1G-T** | Gebraucht | **a627jiecansotre**

**SFP-1G-T** | **98.0** | **Dell W127120130 814032 SFP-1G-T 1G 1000BASE-T TRANSCEIVER MODULE** | Gebraucht | **guru2000**

**SFP-1G-T** | **109.15** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **nstindustrie**

**SFP-1G-T** | **86.46** | **ATGBICS SFP-1G-T-DE-C Kupfer Netzwerk Transceiver Modul 1000 Mbit/s** | Nuovo | **ldcsrl-it**

**SFP-1G-T** | **86.46** | **ATGBICS SFP-1G-T-AR-C Kupfer Netzwerk Transceiver Modul 1000 Mbit/s** | Nuovo | **ldcsrl-it**

**SFP-1G-T** | **86.46** | **ATGBICS AR-SFP-1G-T-C Kupfer Netzwerk Transceiver Modul 1000 Mbit/s** | Nuovo | **ldcsrl-it**

**SFP-1G-T** | **86.46** | **ATGBICS SFP-1G-T-X-MSA-AT Kupfer Netzwerk Transceiver Modul 1000 Mbit/s** | Nuovo | **ldcsrl-it**

**SFP-1G-T** | **86.46** | **ATGBICS SFP-1G-T-C Kupfer Netzwerk Transceiver Modul 1000 Mbit/s** | Nuovo | **ldcsrl-it**

**SFP-1G-T** | **90.61** | **ATGBICS SFP-1G-T-I-MSA-AT Kupfer Netzwerk Transceiver Modul 1000 Mbit/s** | Nuovo | **ldcsrl-it**

**SFP-1G-T** | **142.8** | **Arista SFP-1G-T SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Neu | **cybertrading_gmbh**

**SFP-1G-T** | **142.8** | **Juniper SFP-1G-T-C SFP (Mini-GBIC)-Transceiver-Modul inkl VAT** | Neu | **cybertrading_gmbh**

**SFP-1G-T** | **122.22** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **a622jiecana622**

**SFP-1G-T** | **123.22** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **2023a629-jiecan**

**SFP-1G-T** | **136.95** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **2023f9chuanglin**

**SFP-1G-T** | **152.34** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **deyib8**

**SFP-1G-T** | **717.74** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **a622jiecana622**

**SFP-1G-T** | **723.13** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **bizmarketd9**

**SFP-1G-T** | **734.9** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **tianlong77**

**SFP-1G-T** | **742.99** | **SFP-1G-T FCLF8521P2BTL-DL Gigabit Electrical Port Module 0XTY28** | Neu | **jiea628can**

**EbayProbe Results**
Total results: 200+

**SFP-1G-T** | **Dell XTY28 SFP+ to 1GB Copper RJ45 Force10 SFP-1G-T Transceiver Module** | Used | **8.11 EUR** | Link | Viable - Good price for used Dell module, adding 200 EUR shipping = 208.11 EUR total

**SFP-1G-T** | **Arista SFP-1G-T RJ-45 1000BASE-T 1GbE Copper SFP+ Transceiver XVR-00007-02** | Used | **16.22 EUR** | Link | Viable - Arista branded module, total cost 216.22 EUR

**SFP-1G-T** | **F5 SFP-1G-T RJ-45 1000BASE-T OPT-0015-00 1GbE Copper RJ45 Transceiver** | Used | **12.77 EUR** | Link | Viable - F5 branded, total cost 212.77 EUR

**SFP-1G-T** | **One Finisar FCLF8521P2BTL SFP-1G-T 1000BASE-T SFP Copper RJ-45 transceiver** | Open box | **9.39 EUR** | Link | Viable - Finisar OEM, total cost 209.39 EUR

**SFP-1G-T** | **1 pc of ARISTA SFP-1G-T RJ-45 1000BASE-T XVR-00007-02 1GbE Copper SFP+** | Open box | **15.97 EUR** | Link | Viable - Arista branded, total cost 215.97 EUR

**SFP-1G-T** | **AddOn SFP-1G-T-DE-AO Compatible TAA 10/100/1000Base-TX SFP Transceiver** | Used | **8.54 EUR** | Link | Viable - Compatible module, total cost 208.54 EUR

**SFP-1G-T** | **Dell SFP-1G-T-WP 1000BASE-T SFP Copper RJ45 FCLF8521P2BTLDL1 01M0C3 transceiver** | Open box | **15.35 EUR** | Link | Viable - Dell branded, total cost 215.35 EUR

**SFP-1G-T** | **Arista SFP-1G-T RJ-45 1000BASE-T XVR-00007-02 1GbE Copper SFP transceiver** | Used | **15.35 EUR** | Link | Viable - Arista branded, total cost 215.35 EUR

**SFP-1G-T** | **SFP-1G-T Arista Compatible SFP 1000base-T Transceiver SFP-RJ45 XVR-00007-02** | Open box | **12.63 EUR** | Link | Viable - Compatible module, total cost 212.63 EUR

**SFP-1G-T** | **1000BASE-T SFP RJ45 Copper Transceiver Module Compatible with Arista SFP-1G-T** | Open box | **12.77 EUR** | Link | Viable - Compatible module, total cost 212.77 EUR

**SFP-1G-T** | **Dell SFP-1G-T FCLF8521P2BTL-DL 0XTY28 SFP-T 1GE RJ45 1000Base-T 100m transceiver** | Open box | **16.23 EUR** | Link | Viable - Dell branded, total cost 216.23 EUR

**SFP-1G-T** | **ARISTA SFP-1G-T RJ-45 1000BASE-T XVR-10007-20 1GbE Copper SFP** | Used | **12.80 EUR** | Link | Viable - Arista branded, total cost 212.80 EUR

**SFP-1G-T** | **407-BBOS PF911 Dell 1Gbps SFP-1G-T 1000Base-T Copper 100m RJ-45 SFP Transceiver** | Open box | **21.35 EUR** | Link | Viable - Dell branded, total cost 221.35 EUR

**SFP-1G-T** | **Dell SFP-1G-T FCLF8521P2BTL-DL 1000BASE-T Copper RJ45 SFP-T Transceiver 0XTY28** | Used | **17.07 EUR** | Link | Viable - Dell branded, total cost 217.07 EUR

**SFP-1G-T** | **NEW Lot of 5 Genuine Arista SFP-1G-T / XVR-10007-20 Transceiver Module** | New | **51.23 EUR** | Link | Viable - Lot of 5 new Arista modules, 10.25 EUR each + shipping = 210.25 EUR per unit

**SFP-1G-T** | **Dell SFP-1G-T 1G Copper SFP 1000Base-T RJ45 Transceiver Module (XTY28)** | Used | **21.34 EUR** | Link | Viable - Dell branded, total cost 221.34 EUR

**SFP-1G-T** | **Arista SFP-1G-T SFP+ to 1GbE 1000base-T RJ45 Copper XVR-10007-20 Transceiver** | New | **17.07 EUR** | Link | Viable - New Arista module, total cost 217.07 EUR

**SFP-1G-T** | **FCLF-8521-3 Finisar FCLF85213 SFP-1G-T 1000BASE-T Copper RJ-45 SFP-T SFP RJ45** | Used | **5.94 EUR** | Link | Viable - Very good price for Finisar, total cost 205.94 EUR

**SFP-1G-T** | **Arista SFP-1G-T compatible SFP-RJ45 XVR-00007-02 SFP-T 1000base-T 100m RJ45** | New | **11.08 EUR** | Link | Viable - New compatible module, total cost 211.08 EUR

**SFP-1G-T** | **Finisar SFP-1G-T RJ-45 1000BASE-T FCLF-8521-3 1GbE Copper RJ45 SFP Transceiver** | Used | **12.77 EUR** | Link | Viable - Finisar branded, total cost 212.77 EUR

**Pricing Analysis**

We have one unit of **Arista SFP-1G-T** in used condition priced at **34 EUR** in stock. The competitor prices range from **9.5 EUR** to over **700 EUR**, with most reasonable prices falling between **15-60 EUR** for used/refurbished units and **50-150 EUR** for new units.

On eBay.com, there are excellent sourcing opportunities with prices starting from **5.94 EUR** for used **Finisar** modules and going up to around **25 EUR** for new branded modules. After adding **200 EUR** shipping from the US, the total sourcing cost would range from **205.94 EUR** to **225 EUR**.

The most competitive European competitor prices are around **9.5-25 EUR** for used/refurbished units, which suggests strong price competition in the market.`,
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
    id: "4",
    client: clients[1],
    subject: "Quote Request for Cisco 2960X Switch",
    text: "Hello,\n\nCan you give me a quote for WS-C2960X-48TS-L, is it on stock? If not what would be the price for 4 of them?\n\nBest regards\nMark Johnson",
    date: "2024-01-17T10:45:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-4",
      messages: [
        {
          id: "msg-4",
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
      marketAnalysis: `**CompetitorProbe Results**
Total results: 1

**2960X-48TS-L** | **418.54 EUR** | **Cisco Catalyst 2960X-48TS-L - Switch - managed** | New | **etree-gmbh**

**EbayProbe Results**
Total results: 8

**2960X-48TS-L** | **CISCO WS-C2960X-48TS-L 48 Port GIGABIT Switch 2960X-48TS-L TESTED ios-15.2 2960X** | Used | **82.84 EUR** | Link | Viable - tested unit at good price, but needs +200 EUR shipping

**2960X-48TS-L** | **Cisco WS-2960X-48TS-L Catalyst 2960-x Series 48 Port Network Switch 100-240v-ac** | New – Open box | **1941.64 EUR** | Link | Not viable - price too high even for new condition

**2960X-48TS-L** | **Cisco Catalyst 2960X-48TS-L - switch - 48 ports - managed - r (WS-C2960X-48TS-L)** | New | **1280.15 EUR** | Link | Not viable - price too high after shipping costs

**2960X-48TS-L** | **Cisco WS-2960X-48TS-L V05 48-Port PoE+ Network Switch-Lifetime Warranty** | Very Good - Refurbished | **119.56 EUR** | Link | Viable - good condition with warranty, competitive after shipping

**2960X-48TS-L** | **Cisco Catalyst WS-2960X-48TS-L V05 48-Port PoE+ Network Switch** | Used | **119.56 EUR** | Link | Viable - good price for used condition

**2960X-48TS-L** | **Cisco WS-C2960X-48TS-L Gigabit switch 2960X-48TS-L** | Used | **40.55 EUR** | Link | Viable - excellent price, but from GB (Brexit considerations)

**2960X-48TS-L** | **Cisco Catalyst 2960X-48TS-L - switch - 48 ports - managed - r (WS-C2960X-48TS-L)** | New | **1601.25 EUR** | Link | Not viable - price too high

**2960X-48TS-L** | **Cisco Catalyst WS-2960X-48TS-L V03 48-Port PoE+ Network Switch** | Used | **69.69 EUR** | Link | Viable - good price from Australia, but shipping may be complex

**Pricing Analysis**

We do not have the **Cisco Catalyst 2960X-48TS-L** in stock. Our main competitor (**etree-gmbh**) is offering a new unit at **418.54 EUR**.

From eBay.com, we have several viable sourcing options:

• **Best option**: Used unit at **82.84 EUR** + **200 EUR** shipping = **282.84 EUR** total cost
• **Alternative**: Refurbished unit with warranty at **119.56 EUR** + **200 EUR** shipping = **319.56 EUR** total cost
• **Budget option**: Used unit from GB at **40.55 EUR** (but Brexit complications may apply)

For sourcing strategy:

• **Cost**: **282.84 EUR** (used unit from US)
• **With 30% margin**: **367.69 EUR**
• **Competitor price**: **418.54 EUR**
• **Our competitive price should be around 410-415 EUR** to beat competitor while maximizing profit

**Offer for Client**

**Cisco Catalyst 2960X-48TS-L - 48-Port Gigabit Managed Switch**

We can offer you the **Cisco Catalyst 2960X-48TS-L** at **410 EUR**.

**Product Details:**

• 48 x 10/100/1000 Ethernet ports
• 4 x 1G SFP uplink ports
• Layer 2 switching
• Managed switch with full feature set
• **Condition**: Used/Refurbished (fully tested)
• **Warranty**: Standard warranty included

**Delivery**: 2-3 weeks (sourced from our trusted suppliers)

This price beats our main competitor by approximately **2%** while ensuring quality and reliability. The switch will be fully tested before shipment.

Would you like to proceed with this offer or do you need any additional specifications?`,
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