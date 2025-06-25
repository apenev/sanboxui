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
  type: "Produktanfrage" | "Preisanfrage" | "Beratung" | "Großbestellung" | "Support" | "Gebrauchtverkauf"
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

export const clients: Client[] = [
  {
    id: "1",
    name: "Penev Inc",
    email: "kontakt@penevinc.com",
    company: "Penev Inc",
    revenue: 1200000,
    industry: "IT-Dienstleistungen",
    orderHistory: {
      totalOrders: 45,
      lastOrderDate: "2024-04-15T10:30:00Z",
      averageOrderValue: 8500,
      totalRevenue: 382500
    },
    riskScore: 15
  },
  {
    id: "2",
    name: "LabyPreise GmbH",
    email: "kontakt@labypreise.de",
    company: "LabyPreise GmbH",
    revenue: 2200000,
    industry: "Handel",
    orderHistory: {
      totalOrders: 78,
      lastOrderDate: "2024-05-01T14:20:00Z",
      averageOrderValue: 12000,
      totalRevenue: 936000
    },
    riskScore: 8
  },
  {
    id: "3",
    name: "Leo Penev",
    email: "kontakt@leopenev.com",
    company: "Leo Penev",
    revenue: 350000,
    industry: "Beratung",
    orderHistory: {
      totalOrders: 12,
      lastOrderDate: "2024-03-20T09:15:00Z",
      averageOrderValue: 2500,
      totalRevenue: 30000
    },
    riskScore: 25
  },
  {
    id: "4",
    name: "LabyPreise AG",
    email: "kontakt@labypreise-ag.com",
    company: "LabyPreise AG",
    revenue: 1800000,
    industry: "Großhandel",
    orderHistory: {
      totalOrders: 120,
      lastOrderDate: "2024-05-08T16:45:00Z",
      averageOrderValue: 15000,
      totalRevenue: 1800000
    },
    riskScore: 5
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "Cloud Migration Suite",
    category: "Cloud",
    price: 8999,
    stock: 15,
    deliveryTime: "2-3 Werktage",
    specs: {
      speed: "Schnellstart",
      ports: ["API", "Web"],
      features: ["Automatisierung", "Monitoring"],
    },
  },
  {
    id: "2",
    name: "POS Terminal Pro",
    category: "Kassensysteme",
    price: 1290,
    stock: 45,
    deliveryTime: "Sofort lieferbar",
    specs: {
      speed: "Sofort einsatzbereit",
      ports: ["USB", "LAN"],
      features: ["Touchscreen", "Cloud-Backup"],
    },
  },
  {
    id: "3",
    name: "Security Audit Basic",
    category: "Security",
    price: 1990,
    stock: 0,
    deliveryTime: "1 Woche",
    specs: {
      speed: "1 Woche",
      ports: ["Remote"],
      features: ["Bericht", "Empfehlungen"],
    },
  },
  {
    id: "4",
    name: "Barcode Scanner Pro",
    category: "Hardware",
    price: 89,
    stock: 250,
    deliveryTime: "1-2 Werktage",
    specs: {
      speed: "Hochgeschwindigkeit",
      ports: ["USB", "Bluetooth"],
      features: ["1D/2D", "Wasserfest"],
    },
  },
]

export const salesRequests: SalesRequest[] = [
  {
    id: "1",
    client: clients[0],
    subject: "Angebot für Cloud-Migration",
    text: "Sehr geehrtes Team,\n\nwir möchten unsere Infrastruktur in die Cloud migrieren. Bitte senden Sie uns ein Angebot für die Migration und den laufenden Support.\n\nMit freundlichen Grüßen\nPenev Inc",
    date: "2024-05-10T09:00:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-1",
      messages: [
        {
          id: "msg-1",
          from: "kontakt@penevinc.com",
          to: "sales@company.com",
          date: "2024-05-10T09:00:00Z",
          content: "Sehr geehrtes Team,\n\nwir möchten unsere Infrastruktur in die Cloud migrieren. Bitte senden Sie uns ein Angebot für die Migration und den laufenden Support.\n\nMit freundlichen Grüßen\nPenev Inc"
        }
      ]
    },
    aiAnalysis: {
      type: "Produktanfrage",
      confidence: 0.93,
      marketAnalysis: "Penev Inc ist ein etabliertes IT-Unternehmen mit stabiler Wachstumsstrategie. Der Cloud-Migration-Markt zeigt starke Nachfrage mit 15% jährlichem Wachstum.",
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
        recommendation: "Unser Preis liegt 5% unter dem Marktdurchschnitt - sehr wettbewerbsfähig."
      },
      riskAssessment: {
        score: 85,
        factors: ["Starke Zahlungshistorie", "Wachsende Industrie", "Langfristige Partnerschaft"]
      },
      suggestedResponse: "Sehr geehrtes Team von Penev Inc,\n\nvielen Dank für Ihr Interesse an unserer Cloud Migration Suite. Basierend auf Ihrer Anfrage erstellen wir Ihnen gerne ein maßgeschneidertes Angebot.\n\n**Angebot:**\n- Cloud Migration Suite: [PREIS] €\n- Lieferzeit: [LIEFERZEIT]\n- Support: [SUPPORT_OPTIONEN]\n\nAufgrund Ihrer langjährigen Partnerschaft können wir Ihnen einen Sonderpreis von [SONDERPREIS] € anbieten.\n\nFür Rückfragen stehen wir Ihnen gerne zur Verfügung.\n\nMit freundlichen Grüßen\nIhr Sales Team",
      placeholders: {
        "PREIS": "8.999",
        "LIEFERZEIT": "2-3 Werktage",
        "SUPPORT_OPTIONEN": "24/7 Premium Support",
        "SONDERPREIS": "8.499"
      }
    },
  },
  {
    id: "2",
    client: clients[1],
    subject: "Preisübersicht für POS-Systeme",
    text: "Hallo,\n\nwir benötigen eine aktuelle Preisübersicht für Ihre POS-Systeme. Gibt es Mengenrabatte?\n\nBeste Grüße\nLabyPreise GmbH",
    date: "2024-05-09T14:30:00Z",
    status: "new",
    priority: "medium",
    thread: {
      id: "thread-2",
      messages: [
        {
          id: "msg-2",
          from: "kontakt@labypreise.de",
          to: "sales@company.com",
          date: "2024-05-09T14:30:00Z",
          content: "Hallo,\n\nwir benötigen eine aktuelle Preisübersicht für Ihre POS-Systeme. Gibt es Mengenrabatte?\n\nBeste Grüße\nLabyPreise GmbH"
        }
      ]
    },
    aiAnalysis: {
      type: "Preisanfrage",
      confidence: 0.88,
      marketAnalysis: "LabyPreise GmbH ist ein etablierter Handelspartner mit hohem Bestellvolumen. POS-Systeme zeigen stabilen Markt mit guten Margen.",
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
        recommendation: "Competitive pricing mit Potenzial für Mengenrabatte."
      },
      riskAssessment: {
        score: 92,
        factors: ["Exzellente Zahlungshistorie", "Großvolumen-Kunde", "Langfristige Beziehung"]
      },
      suggestedResponse: "Hallo Team von LabyPreise GmbH,\n\nvielen Dank für Ihre Anfrage zu unseren POS-Systemen.\n\n**Aktuelle Preisliste:**\n- POS Terminal Pro: [EINZELPREIS] € (Einzelpreis)\n- Ab 10 Stück: [MENGENPREIS_10] € pro Stück\n- Ab 25 Stück: [MENGENPREIS_25] € pro Stück\n\n**Zusätzliche Vorteile:**\n- [LIEFERZEIT]\n- [GARANTIE]\n- [SUPPORT]\n\nGerne erstellen wir Ihnen ein individuelles Angebot basierend auf Ihrer gewünschten Stückzahl.\n\nBeste Grüße\nIhr Sales Team",
      placeholders: {
        "EINZELPREIS": "1.290",
        "MENGENPREIS_10": "1.190",
        "MENGENPREIS_25": "1.090",
        "LIEFERZEIT": "Sofort lieferbar",
        "GARANTIE": "3 Jahre Garantie",
        "SUPPORT": "Kostenloser Setup-Service"
      }
    },
  },
  {
    id: "3",
    client: clients[2],
    subject: "Beratung zu IT-Sicherheit",
    text: "Guten Tag,\n\nich habe Interesse an einer Beratung zur IT-Sicherheit für mein Unternehmen. Bitte kontaktieren Sie mich für einen Termin.\n\nViele Grüße\nLeo Penev",
    date: "2024-05-08T11:15:00Z",
    status: "new",
    priority: "low",
    thread: {
      id: "thread-3",
      messages: [
        {
          id: "msg-3",
          from: "kontakt@leopenev.com",
          to: "sales@company.com",
          date: "2024-05-08T11:15:00Z",
          content: "Guten Tag,\n\nich habe Interesse an einer Beratung zur IT-Sicherheit für mein Unternehmen. Bitte kontaktieren Sie mich für einen Termin.\n\nViele Grüße\nLeo Penev"
        }
      ]
    },
    aiAnalysis: {
      type: "Beratung",
      confidence: 0.81,
      marketAnalysis: "Leo Penev führt ein kleineres Beratungsunternehmen. IT-Sicherheit ist ein wachsender Markt mit hoher Nachfrage im KMU-Segment.",
      matchingProducts: [products[2]],
      suggestedPrice: 1990,
      riskAssessment: {
        score: 75,
        factors: ["Kleinere Auftragsgröße", "Beratungsbranche", "Neue Geschäftsbeziehung"]
      },
      suggestedResponse: "Guten Tag Herr Penev,\n\nvielen Dank für Ihr Interesse an unserer IT-Sicherheitsberatung.\n\n**Unser Angebot:**\n- Security Audit Basic: [PREIS] €\n- Umfang: [UMFANG]\n- Dauer: [DAUER]\n- Lieferzeit: [LIEFERZEIT]\n\n**Termine verfügbar:**\n- [TERMIN_1]\n- [TERMIN_2]\n- [TERMIN_3]\n\nGerne können wir ein unverbindliches Erstgespräch vereinbaren.\n\nViele Grüße\nIhr Security Team",
      placeholders: {
        "PREIS": "1.990",
        "UMFANG": "Vollständige Sicherheitsanalyse",
        "DAUER": "1 Woche",
        "LIEFERZEIT": "Kann sofort starten",
        "TERMIN_1": "Nächste Woche Dienstag",
        "TERMIN_2": "Nächste Woche Donnerstag", 
        "TERMIN_3": "Übernächste Woche Montag"
      }
    },
  },
  {
    id: "4",
    client: clients[3],
    subject: "Großbestellung Barcode-Scanner",
    text: "Sehr geehrte Damen und Herren,\n\nwir möchten 50 Barcode-Scanner bestellen. Bitte senden Sie uns ein Angebot inkl. Lieferzeit.\n\nMit freundlichen Grüßen\nLabyPreise AG",
    date: "2024-05-07T16:45:00Z",
    status: "new",
    priority: "high",
    thread: {
      id: "thread-4",
      messages: [
        {
          id: "msg-4",
          from: "kontakt@labypreise-ag.com",
          to: "sales@company.com",
          date: "2024-05-07T16:45:00Z",
          content: "Sehr geehrte Damen und Herren,\n\nwir möchten 50 Barcode-Scanner bestellen. Bitte senden Sie uns ein Angebot inkl. Lieferzeit.\n\nMit freundlichen Grüßen\nLabyPreise AG"
        }
      ]
    },
    aiAnalysis: {
      type: "Großbestellung",
      confidence: 0.95,
      marketAnalysis: "LabyPreise AG ist ein Premium-Großhandelskunde mit ausgezeichneter Zahlungshistorie. Barcode-Scanner haben stabile Nachfrage im Handelssektor.",
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
        recommendation: "Großmengenrabatt möglich - sehr attraktiver Deal."
      },
      riskAssessment: {
        score: 95,
        factors: ["Premium-Kunde", "Große Bestellmenge", "Exzellente Historie"]
      },
      suggestedResponse: "Sehr geehrte Damen und Herren,\n\nvielen Dank für Ihre Großbestellung von 50 Barcode-Scannern.\n\n**Angebot:**\n- 50x Barcode Scanner Pro\n- Einzelpreis: [EINZELPREIS] €\n- Mengenrabatt: [RABATT]%\n- Gesamtpreis: [GESAMTPREIS] € (netto)\n\n**Konditionen:**\n- Lieferzeit: [LIEFERZEIT]\n- Zahlungsziel: [ZAHLUNGSZIEL]\n- Garantie: [GARANTIE]\n\n**Zusatzleistungen:**\n- [ZUSATZ_1]\n- [ZUSATZ_2]\n\nWir freuen uns auf Ihre Bestellung.\n\nMit freundlichen Grüßen\nIhr Sales Team",
      placeholders: {
        "EINZELPREIS": "89",
        "RABATT": "15",
        "GESAMTPREIS": "3.782,50",
        "LIEFERZEIT": "1-2 Werktage",
        "ZAHLUNGSZIEL": "30 Tage netto",
        "GARANTIE": "2 Jahre Garantie",
        "ZUSATZ_1": "Kostenlose Konfiguration",
        "ZUSATZ_2": "Gratis Ersatzteile für 1 Jahr"
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
    request.priority === "high" ? "Wichtig" : request.priority === "medium" ? "Normal" : "Niedrig",
    ...(request.aiAnalysis.confidence > 0.9 ? ["KI-Sicher"] : []),
    ...(request.client.riskScore < 10 ? ["Premium"] : [])
  ],
  salesRequest: request
}))

// Accounts werden in der page.tsx erstellt, da JSX in .ts Dateien nicht funktioniert 