import Typography from "@/components/common/Typography";
import { useEffect, useMemo, useRef, useState } from "react";
import ConversationsList from "./components/ConversationsList";
import ChatWindow from "./components/ChartWindow";
import type { Conversation, Message } from "@/types/message";
import { mockConversations } from "@/mockData";

const Messages = () => {
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);

  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id);
  const activeConversation = useMemo(
    () => conversations?.find((c) => c?.id === activeConvId) ?? conversations[0],
    [conversations, activeConvId]
  );

  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const messageListRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll when messages change
  useEffect(() => {
    if (!messageListRef.current) return;
    const el = messageListRef.current;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [activeConversation.messages.length, activeConvId]);

  // Simulate remote typing for demo
  useEffect(() => {
    // pick a random conversation to simulate typing (only if none are typing)
    const timer = setInterval(() => {
      setConversations((prev) => {
        const idx = Math.floor(Math.random() * prev.length);
        const next = prev.map((c) => ({ ...c, isTyping: false }));
        // occasionally set one to typing for a few seconds
        if (Math.random() > 0.8) {
          next[idx] = { ...next[idx], isTyping: true };
          setTimeout(() => {
            setConversations((p) => p.map((x) => ({ ...x, isTyping: false })));
          }, 2500);
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleAttach = (file?: File) => {
    if (!file) return;
    // simple validation: <= 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File too large. Max 5MB.");
      return;
    }

    setAttachedFile(file);
  };

  const handleSend = async () => {
    if (!draft.trim() && !attachedFile) return;
    setSending(true);
    // emulate upload/send latency
    await new Promise((r) => setTimeout(r, 700));

    const newMsg: Message = {
      id: "m" + Math.random().toString(36).slice(2, 9),
      fromMe: true,
      text: draft.trim() || undefined,
      attachment: attachedFile
        ? {
            name: attachedFile.name,
            size: attachedFile.size,
            type: attachedFile.type,
          }
        : undefined,
      createdAt: new Date().toISOString(),
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              messages: [...c.messages, newMsg],
              lastMessage: newMsg.text ?? newMsg.attachment?.name,
            }
          : c
      )
    );

    setDraft("");
    setAttachedFile(null);
    setSending(false);
  };

  return (
    <div className="space-y-4 h-full">
      <Typography variant="largeTextBold">Messages</Typography>

      <div className="flex rounded-2xl overflow-hidden h-[96%]">
        <ConversationsList
          conversations={conversations}
          activeId={activeConvId}
          query={query}
          setQuery={setQuery}
          onSelect={setActiveConvId}
        />

        <ChatWindow
          conversation={activeConversation}
          draft={draft}
          setDraft={setDraft}
          onSend={handleSend}
          onAttach={handleAttach}
          attached={attachedFile}
          sending={sending}
        />
      </div>
    </div>
  );
};

export default Messages;
