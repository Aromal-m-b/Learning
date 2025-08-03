import { useState, useRef, useEffect } from "react"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { ThemeToggle } from "./theme-toggle"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sparkles } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hello! I'm your personal AI assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date(Date.now() - 60000)
  },
  {
    id: "2", 
    content: "Hi there! Can you help me with my tasks today?",
    sender: "user",
    timestamp: new Date(Date.now() - 30000)
  },
  {
    id: "3",
    content: "Of course! I'd be happy to help you with your tasks. What would you like to work on first?",
    sender: "bot",
    timestamp: new Date()
  }
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]')
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "That's a great question! Let me help you with that.",
        "I understand what you're looking for. Here's what I think...",
        "Interesting! I'd be happy to assist you with this.",
        "That's a thoughtful request. Let me provide some insights.",
        "Thanks for sharing that with me. Here's my response..."
      ]
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        sender: "bot",
        timestamp: new Date()
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-chat-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">Personal AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <ThemeToggle />
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1">
        <div className="py-4 space-y-2">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isTyping && (
            <div className="flex w-full gap-3 px-4 py-3">
              <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-bot-message text-bot-message-foreground border">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="rounded-2xl px-4 py-2 text-sm bg-bot-message text-bot-message-foreground border shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
    </div>
  )
}