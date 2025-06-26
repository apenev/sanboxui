"use client"

import * as React from "react"
import { Users, Settings, Shield, Database, Bell, Activity } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface AdminLayoutProps {
  children: React.ReactNode
  activeSection?: string
  onSectionChange?: (section: string) => void
}

const adminSections = [
  {
    id: "users",
    title: "User Management",
    icon: Users,
    description: "Manage users, roles and permissions"
  },
  {
    id: "configuration",
    title: "Configuration",
    icon: Settings,
    description: "System settings and preferences"
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    description: "Security settings and audit logs"
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    description: "Database management and backups"
  },
  {
    id: "notifications",
    title: "Notifications",
    icon: Bell,
    description: "Notification settings and templates"
  },
  {
    id: "monitoring",
    title: "Monitoring",
    icon: Activity,
    description: "System monitoring and analytics"
  }
]

export function AdminLayout({ children, activeSection = "users", onSectionChange }: AdminLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r bg-card">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground">Admin Panel</h2>
          <p className="text-sm text-muted-foreground mt-1">
            System administration and configuration
          </p>
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="space-y-2">
            {adminSections.map((section) => {
              const Icon = section.icon
              const isActive = activeSection === section.id
              
              return (
                <Button
                  key={section.id}
                  variant={isActive ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start h-auto p-4 text-left",
                    isActive && "bg-secondary text-secondary-foreground"
                  )}
                  onClick={() => onSectionChange?.(section.id)}
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{section.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {section.description}
                      </div>
                    </div>
                  </div>
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  )
}