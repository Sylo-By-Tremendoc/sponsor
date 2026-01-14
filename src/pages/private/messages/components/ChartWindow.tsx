import type { Conversation } from "@/types/message";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { cn } from "@/utils/class-name";
import { EmptyChatState } from "./EmptyChatState";

export default function ChatWindow({
  conversation,
  draft,
  setDraft,
  onSend,
  onAttach,
  attached,
  sending,
  isMobile,
  handleBackClick,
}: {
  conversation: Conversation | null;
  draft: string;
  setDraft: (v: string) => void;
  onSend: () => void;
  onAttach: (f?: File) => void;
  attached: File | null;
  sending: boolean;
  isMobile: boolean;
  handleBackClick?: (va: boolean) => void;
}) {
  const noConversation = !conversation;

  return (
    <main
      className={cn(
        "flex-1 flex flex-col bg-white border-l border-mid-grey h-full",
        isMobile ? "flex flex-col md:hidden" : "hidden md:flex"
      )}
    >
      {noConversation ? (
        <EmptyChatState />
      ) : (
        <>
          <ChatHeader
            conversation={conversation}
            handleBackClick={handleBackClick}
          />

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
        </>
      )}
    </main>
  );
}
