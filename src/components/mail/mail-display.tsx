"use client"

import * as React from "react"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { 
  Reply, ReplyAll, Forward, Archive, ArchiveX, Trash2, 
  Sparkles, Brain, TrendingUp, CheckCircle2, Euro, 
  Building2, Calendar, Users, BarChart3, Shield,
  Star, FileText, Edit3, Send
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { SalesRequest } from "@/data/sales-data"

interface Mail {
  id: string
  name: string
  email: string
  subject: string
  text: string
  date: string
  read: boolean
  labels: string[]
  salesRequest?: SalesRequest
}

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  const [editableResponse, setEditableResponse] = React.useState("")
  const [placeholders, setPlaceholders] = React.useState<{[key: string]: string}>({})

  React.useEffect(() => {
    if (mail?.salesRequest) {
      setEditableResponse(mail.salesRequest.aiAnalysis.suggestedResponse)
      setPlaceholders(mail.salesRequest.aiAnalysis.placeholders)
    }
  }, [mail])

  if (!mail) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mx-auto mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-10 w-10"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
        <h3 className="text-2xl font-semibold">Keine E-Mail ausgewählt</h3>
        <p className="text-sm text-muted-foreground">
          Wählen Sie eine E-Mail aus der Liste aus, um sie anzuzeigen.
        </p>
      </div>
    )
  }

  const salesRequest = mail.salesRequest
  if (!salesRequest) {
    // Fallback for mails without sales request data
    return (
      <div className="flex h-full flex-col">
        <div className="flex items-center p-2">
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Archive className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Archivieren</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Reply className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Antworten</TooltipContent>
            </Tooltip>
          </div>
        </div>
        <Separator />
        <div className="flex flex-1 flex-col p-4">
          <h2 className="text-lg font-semibold">{mail.subject}</h2>
          <p className="text-sm text-muted-foreground">{mail.text}</p>
        </div>
      </div>
    )
  }

  const replaceePlaceholders = (text: string, placeholders: {[key: string]: string}): string => {
    let result = text
    Object.entries(placeholders).forEach(([key, value]) => {
      result = result.replace(new RegExp(`\\[${key}\\]`, 'g'), value)
    })
    return result
  }

  return (
    <div className="flex h-full flex-col">
      {/* Header with actions */}
      <div className="flex items-center p-2">
        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Archive className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Archivieren</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ArchiveX className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Als Spam markieren</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Löschen</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Antworten</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ReplyAll className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Allen antworten</TooltipContent>
          </Tooltip>
          <Button className="ml-auto" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Antwort senden
          </Button>
        </div>
      </div>
      <Separator />

      <ScrollArea className="flex-1">
        <div className="p-6">
          {/* Customer and Email Header */}
          <div className="flex items-start gap-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                {salesRequest.client.name
                  .split(" ")
                  .map((chunk) => chunk[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold">{salesRequest.client.name}</h2>
                <Badge variant={salesRequest.priority === "high" ? "destructive" : 
                               salesRequest.priority === "medium" ? "default" : "secondary"}>
                  {salesRequest.priority === "high" ? "Hoch" : 
                   salesRequest.priority === "medium" ? "Mittel" : "Niedrig"}
                </Badge>
                <Badge variant="outline">{salesRequest.aiAnalysis.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{salesRequest.subject}</p>
              <p className="text-xs text-muted-foreground">
                Von: {salesRequest.client.email} • {format(new Date(salesRequest.date), "dd. MMM yyyy, HH:mm", { locale: de })}
              </p>
            </div>
          </div>

          <Tabs defaultValue="message" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="message">Nachricht</TabsTrigger>
              <TabsTrigger value="analysis">KI-Analyse</TabsTrigger>
              <TabsTrigger value="customer">Kunde</TabsTrigger>
              <TabsTrigger value="response">Antwort</TabsTrigger>
            </TabsList>

            {/* Original Message */}
            <TabsContent value="message" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Ursprüngliche Nachricht
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-sm">{salesRequest.text}</div>
                  {mail.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-4">
                      {mail.labels.map((label) => (
                        <Badge key={label} variant="secondary" className="text-xs">
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* AI Analysis */}
            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    KI-Analyse
                  </CardTitle>
                  <CardDescription>
                    Automatisch generierte Einschätzung und Empfehlungen
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Confidence and Type */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="font-medium">Typ: {salesRequest.aiAnalysis.type}</span>
                    </div>
                                         <div className="flex items-center gap-2">
                       <span className="text-sm">Konfidenz:</span>
                       <Progress value={salesRequest.aiAnalysis.confidence * 100} className="w-20" />
                       <span className="text-sm font-medium">{Math.round(salesRequest.aiAnalysis.confidence * 100)}%</span>
                     </div>
                  </div>

                  {/* Market Analysis */}
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="flex items-center gap-2 font-medium mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Marktanalyse
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {salesRequest.aiAnalysis.marketAnalysis}
                    </p>
                  </div>

                  {/* Risk Assessment */}
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="flex items-center gap-2 font-medium mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Risikobewertung
                    </h4>
                                         <div className="flex items-center gap-2 mb-2">
                       <span className="text-sm">Score:</span>
                       <Progress 
                         value={salesRequest.aiAnalysis.riskAssessment.score} 
                         className={`w-32 ${
                           salesRequest.aiAnalysis.riskAssessment.score > 80 ? '[&>div]:bg-green-500' :
                           salesRequest.aiAnalysis.riskAssessment.score > 60 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-red-500'
                         }`}
                       />
                       <span className="text-sm font-medium">{salesRequest.aiAnalysis.riskAssessment.score}/100</span>
                     </div>
                    <div className="space-y-1">
                      {salesRequest.aiAnalysis.riskAssessment.factors.map((factor, index) => (
                        <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {factor}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matching Products */}
                  <div className="space-y-2">
                    <h4 className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Passende Produkte
                    </h4>
                    {salesRequest.aiAnalysis.matchingProducts.map((product) => (
                      <div key={product.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm font-medium">{product.price.toLocaleString("de-DE")} €</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div><span className="font-medium">Kategorie:</span> {product.category}</div>
                          <div><span className="font-medium">Lagerbestand:</span> {product.stock} Stück</div>
                          <div><span className="font-medium">Lieferzeit:</span> {product.deliveryTime}</div>
                          <div><span className="font-medium">Features:</span> {product.specs.features.join(", ")}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Market Data */}
                  {salesRequest.aiAnalysis.marketData && (
                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="flex items-center gap-2 font-medium mb-2">
                        <BarChart3 className="h-4 w-4 text-primary" />
                        Marktdaten
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>Durchschnittspreis: {salesRequest.aiAnalysis.marketData.averagePrice.toLocaleString("de-DE")} €</div>
                        <div>Trend: <Badge variant="outline">{salesRequest.aiAnalysis.marketData.trend}</Badge></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{salesRequest.aiAnalysis.marketData.recommendation}</p>
                    </div>
                  )}

                  {/* Price Suggestion */}
                  {salesRequest.aiAnalysis.suggestedPrice && (
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <h4 className="flex items-center gap-2 font-medium mb-1">
                        <Euro className="h-4 w-4 text-primary" />
                        KI-Preisvorschlag
                      </h4>
                      <div className="text-2xl font-bold text-primary">
                        {salesRequest.aiAnalysis.suggestedPrice.toLocaleString("de-DE")} €
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Customer Data */}
            <TabsContent value="customer" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Kundendaten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Unternehmen</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.company}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Branche</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Jahresumsatz</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.revenue.toLocaleString("de-DE")} €</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Risiko-Score</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.riskScore}/100</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="flex items-center gap-2 font-medium mb-3">
                      <Calendar className="h-4 w-4" />
                      Bestellhistorie
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Gesamtbestellungen</label>
                        <p className="text-sm text-muted-foreground">{salesRequest.client.orderHistory.totalOrders}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Letzte Bestellung</label>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(salesRequest.client.orderHistory.lastOrderDate), "dd.MM.yyyy", { locale: de })}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Durchschnittlicher Bestellwert</label>
                        <p className="text-sm text-muted-foreground">
                          {salesRequest.client.orderHistory.averageOrderValue.toLocaleString("de-DE")} €
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Gesamtumsatz</label>
                        <p className="text-sm text-muted-foreground">
                          {salesRequest.client.orderHistory.totalRevenue.toLocaleString("de-DE")} €
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Response Editor */}
            <TabsContent value="response" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    Antwort bearbeiten
                  </CardTitle>
                  <CardDescription>
                    KI-generierte Antwort mit Platzhaltern. Bearbeiten Sie die Antwort und füllen Sie die Platzhalter aus.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Placeholders */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(placeholders).map(([key, value]) => (
                                             <div key={key} className="space-y-2">
                         <label className="text-sm font-medium">{key}</label>
                         <Input
                           type="text"
                           value={value}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlaceholders(prev => ({ ...prev, [key]: e.target.value }))}
                           placeholder={`Wert für ${key}`}
                         />
                       </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Editable Response */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Antworttext</label>
                    <Textarea
                      value={editableResponse}
                      onChange={(e) => setEditableResponse(e.target.value)}
                      className="min-h-[300px] text-sm"
                      placeholder="Bearbeiten Sie hier Ihre Antwort..."
                    />
                  </div>

                  {/* Preview */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Vorschau (mit Platzhaltern ersetzt)</label>
                    <div className="p-3 bg-muted rounded-lg whitespace-pre-wrap text-sm">
                      {replaceePlaceholders(editableResponse, placeholders)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Antwort senden
                    </Button>
                    <Button variant="outline">
                      Als Entwurf speichern
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </div>
  )
} 