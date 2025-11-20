import type { Message } from "@/types/message";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { useRef, useEffect } from "react";

export default function MessageList({
  messages,
  isTyping,
}: {
  messages: Message[];
  isTyping?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages.length]);

  return (
    <div className="flex-1 overflow-y-auto p-6" ref={ref}>
      <div className="max-w-3xl mx-auto">
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}

        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
}
