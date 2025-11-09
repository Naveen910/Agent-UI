import "./ChatBubble.css";

export default function ChatBubble({ message, from, time, avatar }) {
  const isUser = from === "user";

  return (
    <div className={`chat-bubble-container ${isUser ? "right" : "left"}`}>
      {!isUser && avatar && <img src={avatar} alt="bot" className="chat-avatar" />}
      <div className={`chat-bubble ${isUser ? "user" : "bot"}`}>
        <p className="chat-text" style={{ whiteSpace: "pre-wrap" }}>{message}</p>
        {time && <span className="chat-time">{time}</span>}
      </div>
    </div>
  );
}
