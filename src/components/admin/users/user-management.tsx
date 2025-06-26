"use client"

import * as React from "react"
import { Plus, Search, MoreHorizontal, Edit, Trash2, Shield, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarInitials } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "sales_agent" | "manager" | "viewer"
  status: "active" | "inactive" | "pending"
  lastLogin: string
  department: string
  phone?: string
  joinDate: string
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "admin",
    status: "active",
    lastLogin: "2024-01-15T10:30:00Z",
    department: "IT",
    phone: "+1 (555) 123-4567",
    joinDate: "2023-03-15"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "sales_agent",
    status: "active",
    lastLogin: "2024-01-15T09:15:00Z",
    department: "Sales",
    phone: "+1 (555) 234-5678",
    joinDate: "2023-06-20"
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@company.com",
    role: "manager",
    status: "active",
    lastLogin: "2024-01-14T16:45:00Z",
    department: "Sales",
    phone: "+1 (555) 345-6789",
    joinDate: "2022-11-10"
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@company.com",
    role: "sales_agent",
    status: "inactive",
    lastLogin: "2024-01-10T14:20:00Z",
    department: "Sales",
    joinDate: "2023-08-05"
  },
  {
    id: "5",
    name: "Lisa Thompson",
    email: "lisa.thompson@company.com",
    role: "viewer",
    status: "pending",
    lastLogin: "Never",
    department: "Marketing",
    joinDate: "2024-01-12"
  }
]

const roleColors = {
  admin: "destructive",
  sales_agent: "default",
  manager: "secondary",
  viewer: "outline"
} as const

const statusColors = {
  active: "default",
  inactive: "secondary",
  pending: "outline"
} as const

export function UserManagement() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedTab, setSelectedTab] = React.useState("all")

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (selectedTab === "all") return matchesSearch
    return matchesSearch && user.status === selectedTab
  })

  const getUserInitials = (name: string) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase()
  }

  const formatLastLogin = (lastLogin: string) => {
    if (lastLogin === "Never") return "Never"
    return new Date(lastLogin).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <div className="flex items-center gap-4 flex-1">
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-sm text-muted-foreground">
                Manage users, roles and permissions
              </p>
            </div>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="space-y-6">
          {/* Search and Filters */}
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockUsers.filter(u => u.status === "active").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {mockUsers.filter(u => u.status === "pending").length}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inactive Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockUsers.filter(u => u.status === "inactive").length}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Users</CardTitle>
                  <CardDescription>
                    Manage user accounts and permissions
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <TabsList>
                  <TabsTrigger value="all">All Users</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="inactive">Inactive</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
                
                <TabsContent value={selectedTab} className="mt-4">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback>
                                <AvatarInitials initials={getUserInitials(user.name)} />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium">{user.name}</h4>
                                <Badge variant={roleColors[user.role]}>
                                  {user.role.replace("_", " ")}
                                </Badge>
                                <Badge variant={statusColors[user.status]}>
                                  {user.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {user.email}
                                </div>
                                {user.phone && (
                                  <div className="flex items-center gap-1">
                                    <Phone className="h-3 w-3" />
                                    {user.phone}
                                  </div>
                                )}
                                <div>{user.department}</div>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right text-sm">
                              <div className="font-medium">Last Login</div>
                              <div className="text-muted-foreground">
                                {formatLastLogin(user.lastLogin)}
                              </div>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Shield className="h-4 w-4 mr-2" />
                                  Manage Permissions
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete User
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}