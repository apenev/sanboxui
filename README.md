# Sales Copilot App

Eine moderne E-Mail-Management-Anwendung speziell für Sales-Teams, entwickelt mit Next.js 15, React 19 und TypeScript.

## 🚀 Features

### 📧 E-Mail Management
- **Dreispaltiges Layout**: Navigation, E-Mail-Liste und E-Mail-Anzeige
- **Intelligente Filterung**: Alle, Ungelesen, Gelesen, Wichtig
- **Responsive Design**: Funktioniert auf Desktop und Tablet
- **Echtzeit-Updates**: Sofortige Aktualisierung der E-Mail-Status

### 🎯 Sales-spezifische Funktionen
- **Sales Anfragen**: Spezielle Kategorie für Verkaufsanfragen
- **Kundenverwaltung**: Übersicht über alle Kundenkontakte
- **Angebotsmanagement**: Verwaltung von Angeboten und Preisanfragen
- **Label-System**: Kategorisierung von E-Mails (Cloud, POS, Security, etc.)

### 🎨 Moderne UI/UX
- **Dark/Light Mode**: Unterstützung für verschiedene Themes
- **Smooth Animations**: Flüssige Übergänge und Interaktionen
- **Accessibility**: Barrierefreie Bedienung
- **Keyboard Navigation**: Vollständige Tastaturunterstützung

## 🛠️ Technologie-Stack

- **Framework**: Next.js 15 mit App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI Primitives
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Type Safety**: TypeScript

## 📦 Installation

1. **Repository klonen**:
   ```bash
   git clone <repository-url>
   cd salescopilot-app
   ```

2. **Abhängigkeiten installieren**:
   ```bash
   npm install
   ```

3. **Entwicklungsserver starten**:
   ```bash
   npm run dev
   ```

4. **Anwendung öffnen**:
   Öffnen Sie [http://localhost:3000](http://localhost:3000) in Ihrem Browser.

## 🏗️ Projektstruktur

```
salescopilot-app/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx      # Root Layout
│   │   ├── page.tsx        # Hauptseite
│   │   └── globals.css     # Globale Styles
│   ├── components/         # React Komponenten
│   │   ├── ui/            # Basis UI Komponenten
│   │   └── mail/          # Mail-spezifische Komponenten
│   ├── data/              # Mock-Daten
│   │   └── sales-data.ts  # E-Mail und Kunden-Daten
│   └── lib/               # Utility Funktionen
│       └── utils.ts       # CSS-Klassen Helper
├── public/                # Statische Assets
└── package.json           # Projekt-Konfiguration
```

## 📧 E-Mail-Daten

Die Anwendung verwendet Mock-Daten mit realistischen Sales-Szenarien:

- **Kunden**: Verschiedene Unternehmen mit unterschiedlichen Branchen
- **Produkte**: Cloud-Services, POS-Systeme, Security-Audits, Hardware
- **E-Mails**: Anfragen, Preisanfragen, Beratungsgesuche, Großbestellungen

## 🎨 Customization

### Themes anpassen
Die Farben können in `src/app/globals.css` angepasst werden:

```css
:root {
  --primary: 222.2 47.4% 11.2%;
  --secondary: 210 40% 96%;
  /* Weitere Variablen... */
}
```

### Neue E-Mails hinzufügen
E-Mails können in `src/data/sales-data.ts` hinzugefügt werden:

```typescript
{
  id: "7",
  name: "Neuer Kunde",
  email: "kontakt@neuerkunde.de",
  subject: "Anfrage",
  text: "E-Mail-Text...",
  date: "2024-05-10T10:00:00Z",
  read: false,
  labels: ["Anfrage", "Wichtig"],
}
```

## 🚀 Deployment

### Vercel (Empfohlen)
1. Verbinden Sie Ihr Repository mit Vercel
2. Vercel erkennt automatisch Next.js
3. Deployment erfolgt automatisch bei jedem Push

### Andere Plattformen
```bash
npm run build
npm start
```

## 🤝 Beitragen

1. Fork das Repository
2. Erstellen Sie einen Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📝 License

Dieses Projekt ist unter der MIT License lizenziert.

## 🆘 Support

Bei Fragen oder Problemen:
- Erstellen Sie ein Issue im Repository
- Kontaktieren Sie das Entwicklungsteam

---

**Entwickelt mit ❤️ für moderne Sales-Teams**
