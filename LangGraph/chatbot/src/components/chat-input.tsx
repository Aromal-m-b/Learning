import { useState } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="border-t bg-background/80 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="flex gap-2 p-4">
        <div className="flex-1 relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            disabled={disabled}
            className="min-h-[60px] resize-none rounded-2xl border-input-border bg-background focus:border-ring focus:ring-2 focus:ring-ring/20 transition-all"
            rows={1}
          />
        </div>
        
        <Button
          type="submit"
          size="icon"
          disabled={!input.trim() || disabled}
          className="h-[60px] w-[60px] rounded-2xl bg-primary hover:bg-primary-hover transition-colors"
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </form>
    </div>
  )
}