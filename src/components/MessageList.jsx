import ChatBubble from "./ChatBubble";
import "./MessageList.css";

export default function MessageList({ messages }) {
  return (
    <div className="message-list">
      {messages.map((msg, i) => (
        <ChatBubble key={i} message={msg.text} from={msg.from} />
      ))}
    </div>
  );
}

