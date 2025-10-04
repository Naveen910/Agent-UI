import "./ChatBubble.css";

export default function ChatBubble({ message, from }) {
  return (
    <div className={`chat-bubble ${from === "user" ? "user" : "bot"}`}>
      <p>{message}</p>
    </div>
  );
}


