/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
  Settings,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Nav } from "@/components/nav"
import { MailList } from "./mail-list"
import { MailDisplay } from "./mail-display"
import { useMail } from "./use-mail"
import { ThemeToggle } from "@/components/theme-toggle"

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: any[]
  defaultLayout?: number[]
  defaultCollapsed?: boolean
  navCollapsedSize?: number
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize = 4,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [selectedMail, setSelectedMail] = React.useState<string | null>(null)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Determine current theme
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full w-full"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={30}
          onCollapse={() => {
            setIsCollapsed(true)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`
          }}
          onExpand={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`
          }}
          onResize={() => {
            setIsCollapsed(false)
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`
          }}
          className={cn(
            "border-r",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center",
              isCollapsed ? "h-[52px] justify-center" : "px-2"
            )}
          >
            {mounted && (
              <img 
                src={isCollapsed 
                  ? (currentTheme === 'dark' 
                      ? "/images/salescopilotalone-dark.png" 
                      : "/images/salescopilotalone-light.png")
                  : (currentTheme === 'dark' 
                      ? "/images/salescopilot-dark.png" 
                      : "/images/salescopilot-light.png")
                }
                alt="Sales Copilot" 
                width={isCollapsed ? 30 : 150} 
                height={30} 
                className={`object-contain ${!isCollapsed ? 'ml-1' : ''}`}
              />
            )}
          </div>
          <Separator />
          {mounted && (
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Inbox",
                  label: "128",
                  icon: Inbox,
                  variant: "default",
                  href: "/"
                },
                {
                  title: "Drafts",
                  label: "9",
                  icon: File,
                  variant: "ghost",
                },
                {
                  title: "Sent",
                  label: "",
                  icon: Send,
                  variant: "ghost",
                },
                {
                  title: "Trash",
                  label: "",
                  icon: Trash2,
                  variant: "ghost",
                },
              ]}
            />
          )}
          <Separator />
          {mounted && (
            <Nav
              isCollapsed={isCollapsed}
              links={[
                {
                  title: "Sales Requests",
                  label: "972",
                  icon: Users2,
                  variant: "ghost",
                },
                {
                  title: "Updates",
                  label: "342",
                  icon: AlertCircle,
                  variant: "ghost",
                },
                {
                  title: "Admin",
                  label: "",
                  icon: Settings,
                  variant: "ghost",
                  href: "/admin"
                }
              ]}
            />
          )}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={20}>
          <Tabs defaultValue="all" className="h-full">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <div className="ml-auto flex items-center gap-2">
                <TabsList>
                  <TabsTrigger value="all">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread">
                    Unread
                  </TabsTrigger>
                  <TabsTrigger value="read">
                    Read
                  </TabsTrigger>
                  <TabsTrigger value="important">
                    Important
                  </TabsTrigger>
                </TabsList>
                <ThemeToggle />
              </div>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <MailList items={mails} selectedMail={selectedMail} onSelectMail={setSelectedMail} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <MailList items={mails.filter((item) => !item.read)} selectedMail={selectedMail} onSelectMail={setSelectedMail} />
            </TabsContent>
            <TabsContent value="read" className="m-0">
              <MailList items={mails.filter((item) => item.read)} selectedMail={selectedMail} onSelectMail={setSelectedMail} />
            </TabsContent>
            <TabsContent value="important" className="m-0">
              <MailList items={mails.filter((item) => item.labels?.includes("Important"))} selectedMail={selectedMail} onSelectMail={setSelectedMail} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} className="border-l">
          <MailDisplay
            mail={mails.find((item) => item.id === selectedMail) || null}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}