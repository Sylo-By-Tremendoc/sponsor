import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import ChatWindow from "./ChartWindow";
import type { Conversation } from "@/types/message";

const MobileChatDrawer = ({
  isOpen,
  setIsOpen,
  conversation,
  draft,
  setDraft,
  onSend,
  onAttach,
  attached,
  sending,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  conversation: Conversation;
  draft: string;
  setDraft: (v: string) => void;
  onSend: () => void;
  onAttach: (f?: File) => void;
  attached: File | null;
  sending: boolean;
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        side="right"
        className="rounded-t-none w-screen h-screen"
        onCloseAutoFocus={(e) => e.preventDefault()}
        showClose={false}
      >
        <ChatWindow
          conversation={conversation}
          draft={draft}
          setDraft={setDraft}
          onSend={onSend}
          onAttach={onAttach}
          attached={attached}
          sending={sending}
          isMobile
          handleBackClick={setIsOpen}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default MobileChatDrawer;
