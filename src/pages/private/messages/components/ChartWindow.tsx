import type { Conversation } from "@/types/message";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatWindow({
  conversation,
  draft,
  setDraft,
  onSend,
  onAttach,
  attached,
  sending,
}: {
  conversation: Conversation;
  draft: string;
  setDraft: (v: string) => void;
  onSend: () => void;
  onAttach: (f?: File) => void;
  attached: File | null;
  sending: boolean;
}) {
  return (
    <main className="flex-1 hidden md:flex flex-col bg-white border-l border-mid-grey">
      <ChatHeader conversation={conversation} />

      <MessageList
        messages={conversation.messages}
        isTyping={conversation.isTyping}
      />

      <ChatInput
        draft={draft}
        setDraft={setDraft}
        onSend={onSend}
        onAttach={onAttach}
        attached={attached}
        sending={sending}
      />
    </main>
  );
}
