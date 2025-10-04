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
      // Send message to n8n webhook
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
      }, 800); // add small delay to simulate typing
    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Could not connect to n8n" },
      ]);
    }
  };

  return (
    <div className="chat-window">
      <MessageList messages={messages} />
      {isTyping && (
        <div className="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <div ref={messagesEndRef} />
      <MessageInput onSend={sendMessage} />
    </div>
  );
}
