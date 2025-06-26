"use client"

import * as React from "react"
import { Save, RefreshCw, AlertTriangle, CheckCircle, Settings, Mail, Database, Shield, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ConfigSection {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  settings: ConfigSetting[]
}

interface ConfigSetting {
  key: string
  label: string
  description: string
  type: "text" | "number" | "boolean" | "select" | "textarea"
  value: any
  options?: { label: string; value: string }[]
  required?: boolean
  validation?: (value: any) => string | null
}

const configSections: ConfigSection[] = [
  {
    id: "general",
    title: "General Settings",
    description: "Basic application configuration",
    icon: Settings,
    settings: [
      {
        key: "app_name",
        label: "Application Name",
        description: "The name of your application",
        type: "text",
        value: "Sales Copilot",
        required: true
      },
      {
        key: "company_name",
        label: "Company Name",
        description: "Your company name",
        type: "text",
        value: "Your Company Ltd.",
        required: true
      },
      {
        key: "timezone",
        label: "Default Timezone",
        description: "Default timezone for the application",
        type: "select",
        value: "UTC",
        options: [
          { label: "UTC", value: "UTC" },
          { label: "Europe/Berlin", value: "Europe/Berlin" },
          { label: "America/New_York", value: "America/New_York" },
          { label: "Asia/Tokyo", value: "Asia/Tokyo" }
        ]
      },
      {
        key: "maintenance_mode",
        label: "Maintenance Mode",
        description: "Enable maintenance mode to prevent user access",
        type: "boolean",
        value: false
      }
    ]
  },
  {
    id: "email",
    title: "Email Configuration",
    description: "Email server and notification settings",
    icon: Mail,
    settings: [
      {
        key: "smtp_host",
        label: "SMTP Host",
        description: "SMTP server hostname",
        type: "text",
        value: "smtp.gmail.com",
        required: true
      },
      {
        key: "smtp_port",
        label: "SMTP Port",
        description: "SMTP server port",
        type: "number",
        value: 587,
        required: true
      },
      {
        key: "smtp_username",
        label: "SMTP Username",
        description: "SMTP authentication username",
        type: "text",
        value: "your-email@company.com",
        required: true
      },
      {
        key: "smtp_encryption",
        label: "Encryption",
        description: "Email encryption method",
        type: "select",
        value: "tls",
        options: [
          { label: "None", value: "none" },
          { label: "TLS", value: "tls" },
          { label: "SSL", value: "ssl" }
        ]
      },
      {
        key: "email_notifications",
        label: "Email Notifications",
        description: "Enable email notifications",
        type: "boolean",
        value: true
      }
    ]
  },
  {
    id: "ai",
    title: "AI Configuration",
    description: "AI and machine learning settings",
    icon: Database,
    settings: [
      {
        key: "ai_provider",
        label: "AI Provider",
        description: "Select AI service provider",
        type: "select",
        value: "openai",
        options: [
          { label: "OpenAI", value: "openai" },
          { label: "Azure OpenAI", value: "azure" },
          { label: "Anthropic", value: "anthropic" }
        ]
      },
      {
        key: "ai_model",
        label: "AI Model",
        description: "AI model to use for analysis",
        type: "select",
        value: "gpt-4",
        options: [
          { label: "GPT-4", value: "gpt-4" },
          { label: "GPT-3.5 Turbo", value: "gpt-3.5-turbo" },
          { label: "Claude-3", value: "claude-3" }
        ]
      },
      {
        key: "ai_confidence_threshold",
        label: "Confidence Threshold",
        description: "Minimum confidence level for AI suggestions (0-100)",
        type: "number",
        value: 80
      },
      {
        key: "auto_response_enabled",
        label: "Auto Response",
        description: "Enable automatic response generation",
        type: "boolean",
        value: false
      }
    ]
  },
  {
    id: "security",
    title: "Security Settings",
    description: "Authentication and security configuration",
    icon: Shield,
    settings: [
      {
        key: "session_timeout",
        label: "Session Timeout (minutes)",
        description: "User session timeout in minutes",
        type: "number",
        value: 60
      },
      {
        key: "password_min_length",
        label: "Minimum Password Length",
        description: "Minimum required password length",
        type: "number",
        value: 8
      },
      {
        key: "require_2fa",
        label: "Require 2FA",
        description: "Require two-factor authentication for all users",
        type: "boolean",
        value: false
      },
      {
        key: "allowed_domains",
        label: "Allowed Email Domains",
        description: "Comma-separated list of allowed email domains",
        type: "textarea",
        value: "company.com, partner.com"
      }
    ]
  }
]

export function ConfigurationManagement() {
  const [activeTab, setActiveTab] = React.useState("general")
  const [settings, setSettings] = React.useState<Record<string, any>>(() => {
    const initialSettings: Record<string, any> = {}
    configSections.forEach(section => {
      section.settings.forEach(setting => {
        initialSettings[setting.key] = setting.value
      })
    })
    return initialSettings
  })
  const [hasChanges, setHasChanges] = React.useState(false)

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log("Saving settings:", settings)
    setHasChanges(false)
    // Show success message
  }

  const handleReset = () => {
    // Reset to original values
    const originalSettings: Record<string, any> = {}
    configSections.forEach(section => {
      section.settings.forEach(setting => {
        originalSettings[setting.key] = setting.value
      })
    })
    setSettings(originalSettings)
    setHasChanges(false)
  }

  const renderSetting = (setting: ConfigSetting) => {
    const value = settings[setting.key]

    switch (setting.type) {
      case "text":
        return (
          <Input
            value={value || ""}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            placeholder={setting.description}
          />
        )
      
      case "number":
        return (
          <Input
            type="number"
            value={value || ""}
            onChange={(e) => updateSetting(setting.key, parseInt(e.target.value) || 0)}
            placeholder={setting.description}
          />
        )
      
      case "boolean":
        return (
          <Switch
            checked={value || false}
            onCheckedChange={(checked) => updateSetting(setting.key, checked)}
          />
        )
      
      case "select":
        return (
          <Select value={value} onValueChange={(newValue) => updateSetting(setting.key, newValue)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {setting.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case "textarea":
        return (
          <Textarea
            value={value || ""}
            onChange={(e) => updateSetting(setting.key, e.target.value)}
            placeholder={setting.description}
            rows={3}
          />
        )
      
      default:
        return null
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4 flex-1">
            <div>
              <h1 className="text-2xl font-bold">Configuration</h1>
              <p className="text-sm text-muted-foreground">
                System settings and preferences
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-yellow-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
            <Button variant="outline" onClick={handleReset} disabled={!hasChanges}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            {configSections.map((section) => {
              const Icon = section.icon
              return (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {section.title}
                </TabsTrigger>
              )
            })}
          </TabsList>

          {configSections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <section.icon className="h-6 w-6" />
                    <div>
                      <CardTitle>{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {section.settings.map((setting, index) => (
                        <div key={setting.key}>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                  {setting.label}
                                  {setting.required && (
                                    <span className="text-destructive ml-1">*</span>
                                  )}
                                </label>
                                <p className="text-xs text-muted-foreground">
                                  {setting.description}
                                </p>
                              </div>
                              {setting.type === "boolean" && (
                                <div className="flex items-center gap-2">
                                  {renderSetting(setting)}
                                </div>
                              )}
                            </div>
                            {setting.type !== "boolean" && (
                              <div className="max-w-md">
                                {renderSetting(setting)}
                              </div>
                            )}
                          </div>
                          {index < section.settings.length - 1 && (
                            <Separator className="mt-6" />
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}