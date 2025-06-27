/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useTheme } from "next-themes"
import * as React from "react"
import dynamic from "next/dynamic"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AccountSwitcher } from "./account-switcher"
import { MailDisplay } from "./mail/mail-display"
import { MailList } from "./mail/mail-list"
import { Nav } from "./nav"
import { type Mail } from "../data/sales-data"
import { useMail } from "./mail/use-mail"

// Dynamically import framer-motion components to prevent SSR hydration mismatch
const motion = dynamic(() => import("framer-motion").then(mod => ({ default: mod.motion })), { ssr: false })
const AnimatePresence = dynamic(() => import("framer-motion").then(mod => ({ default: mod.AnimatePresence })), { ssr: false })

interface NavLink {
  title: string
  label?: string
  icon: React.ComponentType<any>
  variant: "default" | "ghost"
  href?: string
}

const mainNavLinks: NavLink[] = []
const secondaryNavLinks: NavLink[] = []

interface MailProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  mails: Mail[]
  defaultLayout: number[] | undefined
  defaultCollapsed?: boolean
  navCollapsedSize: number
}

export function Mail({
  accounts,
  mails,
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)
  const [selectedMail, setSelectedMail] = React.useState<Mail | null>(null)
  const { theme: mode } = useTheme()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Nav links={mainNavLinks} isCollapsed={isCollapsed} />
              </motion.div>
            )}
          </AnimatePresence>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-2 border-b p-4">
              <AccountSwitcher accounts={accounts} />
              <Separator orientation="vertical" className="h-6" />
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="E-Mails durchsuchen..."
                  className="pl-8"
                />
              </div>
            </div>
            <MailList
              items={mails}
              selectedMail={selectedMail}
              onSelectMail={setSelectedMail}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          <MailDisplay
            mail={selectedMail}
            onBack={() => setSelectedMail(null)}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}