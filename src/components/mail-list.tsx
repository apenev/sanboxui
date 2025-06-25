"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Mail } from "../../data/sales-data"
import { formatDistanceToNow } from "date-fns"
import { de } from "date-fns/locale"

interface MailListProps {
  items: Mail[]
  selectedMail?: Mail | null
  onSelectMail: (mail: Mail) => void
}

export function MailList({ items, selectedMail, onSelectMail }: MailListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="flex flex-col gap-2 p-4 pt-0">
        {items.map((item) => (
          <Button
            key={item.id}
            variant={selectedMail?.id === item.id ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-2 p-3 h-auto",
              !item.read && "font-semibold"
            )}
            onClick={() => onSelectMail(item)}
          >
            <div className="flex flex-col gap-1 text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {item.name}
                </span>
                {!item.read && (
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {item.subject}
              </div>
              <div className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(item.date), {
                  addSuffix: true,
                  locale: de,
                })}
              </div>
            </div>
          </Button>
        ))}
      </div>
    </ScrollArea>
  )
} 