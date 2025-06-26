/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"
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
        <h3 className="text-2xl font-semibold">No email selected</h3>
        <p className="text-sm text-muted-foreground">
          Select an email from the list to display it.
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
              <TooltipContent>Archive</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Reply className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reply</TooltipContent>
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
            <TooltipContent>Archive</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ArchiveX className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mark as spam</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mx-1 h-6" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Reply className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <ReplyAll className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Reply all</TooltipContent>
          </Tooltip>
          <Button className="ml-auto" size="sm">
            <Send className="h-4 w-4 mr-2" />
            Send reply
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
                  {salesRequest.priority === "high" ? "High" : 
                   salesRequest.priority === "medium" ? "Medium" : "Low"}
                </Badge>
                <Badge variant="outline">{salesRequest.aiAnalysis.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{salesRequest.subject}</p>
              <p className="text-xs text-muted-foreground">
                From: {salesRequest.client.email} • {format(new Date(salesRequest.date), "MMM dd, yyyy, HH:mm", { locale: enUS })}
              </p>
            </div>
          </div>

          <Tabs defaultValue="message" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="message">Message</TabsTrigger>
              <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
            </TabsList>

            {/* Original Message */}
            <TabsContent value="message" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Original Message
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
                    AI Analysis
                  </CardTitle>
                  <CardDescription>
                    Automatically generated assessment and recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Confidence and Type */}
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-primary" />
                      <span className="font-medium">Type: {salesRequest.aiAnalysis.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Confidence:</span>
                      <Progress value={salesRequest.aiAnalysis.confidence * 100} className="w-20" />
                      <span className="text-sm font-medium">{Math.round(salesRequest.aiAnalysis.confidence * 100)}%</span>
                    </div>
                  </div>

                  {/* Market Analysis */}
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="flex items-center gap-2 font-medium mb-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      Market Analysis
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {salesRequest.aiAnalysis.marketAnalysis}
                    </p>
                  </div>

                  {/* Risk Assessment */}
                  <div className="p-3 bg-muted rounded-lg">
                    <h4 className="flex items-center gap-2 font-medium mb-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Risk Assessment
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
                      Matching Products
                    </h4>
                    {salesRequest.aiAnalysis.matchingProducts.map((product) => (
                      <div key={product.id} className="p-3 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm font-medium">${product.price.toLocaleString("en-US")}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                          <div><span className="font-medium">Category:</span> {product.category}</div>
                          <div><span className="font-medium">Stock:</span> {product.stock} units</div>
                          <div><span className="font-medium">Delivery:</span> {product.deliveryTime}</div>
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
                        Market Data
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>Average Price: ${salesRequest.aiAnalysis.marketData.averagePrice.toLocaleString("en-US")}</div>
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
                        AI Price Suggestion
                      </h4>
                      <div className="text-2xl font-bold text-primary">
                        ${salesRequest.aiAnalysis.suggestedPrice.toLocaleString("en-US")}
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
                    Customer Data
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.company}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Industry</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.industry}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Annual Revenue</label>
                      <p className="text-sm text-muted-foreground">${salesRequest.client.revenue.toLocaleString("en-US")}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Risk Score</label>
                      <p className="text-sm text-muted-foreground">{salesRequest.client.riskScore}/100</p>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="flex items-center gap-2 font-medium mb-3">
                      <Calendar className="h-4 w-4" />
                      Order History
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Total Orders</label>
                        <p className="text-sm text-muted-foreground">{salesRequest.client.orderHistory.totalOrders}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Order</label>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(salesRequest.client.orderHistory.lastOrderDate), "MM/dd/yyyy", { locale: enUS })}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Average Order Value</label>
                        <p className="text-sm text-muted-foreground">
                          ${salesRequest.client.orderHistory.averageOrderValue.toLocaleString("en-US")}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Total Revenue</label>
                        <p className="text-sm text-muted-foreground">
                          ${salesRequest.client.orderHistory.totalRevenue.toLocaleString("en-US")}
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
                    Edit Response
                  </CardTitle>
                  <CardDescription>
                    AI-generated response with placeholders. Edit the response and fill in the placeholders.
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
                          placeholder={`Value for ${key}`}
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Editable Response */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Response Text</label>
                    <Textarea
                      value={editableResponse}
                      onChange={(e) => setEditableResponse(e.target.value)}
                      className="min-h-[300px] text-sm"
                      placeholder="Edit your response here..."
                    />
                  </div>

                  {/* Preview */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Preview (with placeholders replaced)</label>
                    <div className="p-3 bg-muted rounded-lg whitespace-pre-wrap text-sm">
                      {replaceePlaceholders(editableResponse, placeholders)}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send response
                    </Button>
                    <Button variant="outline">
                      Save as draft
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