import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { Button } from "@/react-app/components/ui/button";
import { Textarea } from "@/react-app/components/ui/textarea";
import { ScrollArea } from "@/react-app/components/ui/scroll-area";
import { Heart, ArrowLeft, MessageCircleHeart, Send, Bot, User, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm HealthMate, your AI health companion. I'm here to listen and support you. How are you feeling today? Feel free to share any health concerns, stress, or just chat about your wellbeing.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages([...newMessages, { role: "assistant", content: "I'm sorry, I'm having trouble responding right now. Please try again in a moment." }]);
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.message }]);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "I'm sorry, I couldn't connect. Please check your connection and try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-950 dark:via-emerald-950/20 dark:to-teal-950/30">
      <Navigation />
      
      <div className="flex-1 flex flex-col pt-16 max-w-4xl mx-auto w-full px-4">
        {/* Header */}
        <div className="py-6">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <MessageCircleHeart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">AI Health Companion</h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Share your feelings and health concerns</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4 pb-4">
            {messages.map((message, index) => (
              <MessageBubble key={index} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white dark:bg-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
                  <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="py-4 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm -mx-4 px-4">
          <div className="flex gap-3 items-end">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[48px] max-h-[120px] resize-none bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-emerald-500 focus:ring-emerald-500/20"
              disabled={isLoading}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="h-12 w-12 p-0 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg shadow-emerald-500/25"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 text-center">
            Not medical advice. Always consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? "bg-slate-200 dark:bg-slate-700" 
          : "bg-gradient-to-br from-emerald-500 to-teal-600"
      }`}>
        {isUser ? (
          <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        ) : (
          <Bot className="w-4 h-4 text-white" />
        )}
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
        isUser 
          ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-tr-sm" 
          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-sm border border-slate-200/50 dark:border-slate-700/50"
      }`}>
        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
}

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            HealthMate
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/chat">
            <Button variant="ghost" size="sm" className="text-emerald-600">Chat</Button>
          </Link>
          <Link to="/reports">
            <Button variant="ghost" size="sm">Reports</Button>
          </Link>
          <Link to="/doctors">
            <Button variant="ghost" size="sm">Doctors</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
