"use client"

import * as React from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { UserManagement } from "@/components/admin/users/user-management"
import { ConfigurationManagement } from "@/components/admin/configuration/configuration-management"

export default function AdminPage() {
  const [activeSection, setActiveSection] = React.useState("users")

  const renderContent = () => {
    switch (activeSection) {
      case "users":
        return <UserManagement />
      case "configuration":
        return <ConfigurationManagement />
      case "security":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Security Settings</h2>
              <p className="text-muted-foreground">Security management coming soon...</p>
            </div>
          </div>
        )
      case "database":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Database Management</h2>
              <p className="text-muted-foreground">Database tools coming soon...</p>
            </div>
          </div>
        )
      case "notifications":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">Notification Settings</h2>
              <p className="text-muted-foreground">Notification management coming soon...</p>
            </div>
          </div>
        )
      case "monitoring":
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">System Monitoring</h2>
              <p className="text-muted-foreground">Monitoring dashboard coming soon...</p>
            </div>
          </div>
        )
      default:
        return <UserManagement />
    }
  }

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      {renderContent()}
    </AdminLayout>
  )
}