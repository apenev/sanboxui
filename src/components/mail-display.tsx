import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail } from "@/data/sales-data"

interface MailDisplayProps {
  mail: Mail | null
}

export function MailDisplay({ mail }: MailDisplayProps) {
  if (!mail) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h3 className="text-lg font-medium">No message selected</h3>
          <p className="text-sm text-muted-foreground">
            Choose a message from the list to view it here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center p-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={mail.avatar} />
            <AvatarFallback>
              {mail.name
                .split(" ")
                .map((chunk) => chunk[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <p className="text-sm font-medium leading-none">{mail.name}</p>
            <p className="text-xs text-muted-foreground">{mail.email}</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Badge variant={mail.read ? "secondary" : "default"}>
            {mail.read ? "Read" : "Unread"}
          </Badge>
          <p className="text-xs text-muted-foreground">{mail.date}</p>
        </div>
      </div>
      <Separator />
      <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
        <h3 className="font-semibold">{mail.subject}</h3>
        <ScrollArea className="mt-4 h-full">
          <div className="space-y-4">
            <p>{mail.text}</p>
          </div>
        </ScrollArea>
      </div>
      <Separator className="mt-auto" />
      <div className="p-4">
        <div className="flex gap-2">
          <Button size="sm">Reply</Button>
          <Button variant="outline" size="sm">
            Forward
          </Button>
        </div>
      </div>
    </div>
  )
}