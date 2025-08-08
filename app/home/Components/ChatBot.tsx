"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, Loader } from "lucide-react";
import {
  FaRobot,
  FaRegLightbulb,
  FaClock,
  FaShieldAlt,
  FaRegComments,
  FaHeadset,
  FaBrain,
} from "react-icons/fa";

interface Message {
  type: "bot" | "user";
  content: string;
  options?: string[];
}

const initialMessage: Message = {
  type: "bot",
  content: "Hello! How can I help you today?",
  options: [
    "Tell me about your services",
    "I want to start a project",
    "I have a question",
    "Other inquiry",
  ],
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add viewport height fix for mobile
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVH();
    window.addEventListener("resize", setVH);
    return () => window.removeEventListener("resize", setVH);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage: Message = {
        type: "bot",
        content: data.message,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionClick = (option: string) => {
    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: option }]);

    // Add bot response based on option
    const botResponses: { [key: string]: string } = {
      "Tell me about your services":
        "We offer various IT services including web development, mobile apps, and cloud solutions. What specific service interests you?",
      "I want to start a project":
        "Great! Could you tell me more about your project requirements?",
      "I have a question":
        "I'll be happy to answer your questions. What would you like to know?",
      "Other inquiry":
        "Please feel free to describe your inquiry and I'll assist you.",
    };

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: botResponses[option] || "How can I help you with that?",
          options: [
            "Contact sales team",
            "Schedule a meeting",
            "View pricing",
            "Talk to expert",
          ],
        },
      ]);
    }, 500);
  };

  return (
    <>
      

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-2 right-4 
          md:bottom-8 md:right-8 z-[60]"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-12 h-12 md:w-14 md:h-14 z-40 bg-yale_blue-500 text-white 
            rounded-full shadow-lg hover:bg-yale_blue-600 transition-all 
            duration-300  flex items-center justify-center touch-manipulation"
          aria-label="Toggle chat"
        >
          <MessageSquare size={24} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed md:absolute bottom-5 right-2  w-[90%] mx-auto md:w-96 
                h-[calc(100vh-env(safe-area-inset-bottom)-4rem)] md:max-h-[500px] 
                bg-white rounded-t-xl md:rounded-lg shadow-xl overflow-hidden 
                border border-yale_blue-100 flex flex-col"
              style={{
                height: `calc(${window.innerHeight * 0.01}px * 100 - 10rem)`,
              }}
            >
              {/* Chat Header */}
              <div
                className="p-4 bg-yale_blue-500 text-white flex 
                justify-between items-center sticky top-0 z-10"
              >
                <h3 className="font-bold text-lg"> Ai Chat Support</h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-yale_blue-600 rounded-full 
                    transition-colors touch-manipulation"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages Container */}
              <div
                className="flex-1 overflow-y-auto overscroll-contain 
                p-4 bg-gray-50"
              >
                <div className="space-y-4 max-w-full">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-3 rounded-lg max-w-[80%] break-words ${
                          message.type === "user"
                            ? "bg-yale_blue-500 text-white"
                            : "bg-gray-100 text-yale_blue-400"
                        }`}
                      >
                        <p>{message.content}</p>
                        {message.options && (
                          <div className="mt-3 space-y-2">
                            {message.options.map((option, optionIndex) => (
                              <motion.button
                                key={optionIndex}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleOptionClick(option)}
                                className="w-full text-left px-3 py-2 rounded 
                                  bg-white text-yale_blue-500 hover:bg-yale_blue-50 
                                  transition-colors text-sm"
                              >
                                {option}
                              </motion.button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="p-3 rounded-lg bg-gray-100">
                        <Loader className="w-5 h-5 animate-spin" />
                      </div>
                    </div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t border-gray-200 bg-white 
                  flex gap-2 items-center sticky bottom-0 
                  "
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg 
                    focus:outline-none focus:border-yale_blue-500 
                    focus:ring-1 focus:ring-yale_blue-500  text-yale_blue-200
                    appearance-none"
                  style={{
                    WebkitAppearance: "none",
                    marginBottom: "env(safe-area-inset-bottom, 0px)",
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-3 bg-yale_blue-500 text-white rounded-lg
                    hover:bg-yale_blue-600 transition-colors 
                    disabled:opacity-50 disabled:cursor-not-allowed
                    active:scale-95 touch-manipulation flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={20} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default ChatBot;





