import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: {
    id: string
    content: string
    sender: "user" | "bot"
    timestamp: Date
  }
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.sender === "user"

  return (
    <div className={cn("flex w-full gap-3 px-4 py-3", isUser && "flex-row-reverse")}>
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
        isUser 
          ? "bg-user-message text-user-message-foreground" 
          : "bg-bot-message text-bot-message-foreground border"
      )}>
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      
      <div className={cn(
        "flex flex-col space-y-1 max-w-xs lg:max-w-md xl:max-w-lg",
        isUser && "items-end"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-2 text-sm",
          isUser 
            ? "bg-user-message text-user-message-foreground" 
            : "bg-bot-message text-bot-message-foreground border shadow-sm"
        )}>
          {message.content}
        </div>
        
        <span className="text-xs text-muted-foreground px-1">
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </span>
      </div>
    </div>
  )
}