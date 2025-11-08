// ...existing code...
import { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import "./ChatWindow.css";

export default function ChatWindow() {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! 👋" }]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text) => {
    const userMsg = { from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    try {
      
      const res = await fetch(
        "http://65.1.101.129:3004/webhook/b115dc9c-6248-49b0-8075-e206d2ac97ce",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        }
      );

      const data = await res.json();
      const botReply = data[0]?.output || "No response from n8n";
      const botMsg = { from: "bot", text: botReply };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMsg]);
        setIsTyping(false);
      }, 800); // small delay to simulate typing
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Could not connect to Agent" },
      ]);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-title">Agent</div>
        <div className="chat-status">Online</div>
      </div>

      <div className="messages-area">
        <MessageList messages={messages} />
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  );
}
// ...existing code...