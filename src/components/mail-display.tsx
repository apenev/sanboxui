"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Mail } from "../../data/sales-data"
import { format } from "date-fns"
import { de } from "date-fns/locale"
import { ArrowLeft, Reply, Forward, Archive, Trash2 } from "lucide-react"

interface MailDisplayProps {
  mail: Mail | null
  onBack: () => void
}

export function MailDisplay({ mail, onBack }: MailDisplayProps) {
  if (!mail) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-semibold">Keine E-Mail ausgewählt</h3>
          <p className="text-sm text-muted-foreground">
            Wähle eine E-Mail aus der Liste aus, um sie zu lesen.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b p-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">{mail.subject}</h2>
          <p className="text-sm text-muted-foreground">
            Von: {mail.name} &lt;{mail.email}&gt;
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Reply className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Forward className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Archive className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            {format(new Date(mail.date), "EEEE, d. MMMM yyyy 'um' HH:mm", {
              locale: de,
            })}
          </p>
        </div>
        <Separator className="mb-4" />
        <ScrollArea className="h-full">
          <div className="prose prose-sm max-w-none">
            <div className="whitespace-pre-wrap">{mail.text}</div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
} 