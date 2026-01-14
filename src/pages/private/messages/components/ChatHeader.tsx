import Typography from "@/components/common/Typography";
import type { Conversation } from "@/types/message";
import {
  HiChevronLeft,
  HiDotsHorizontal,
  HiOutlineSearch,
} from "react-icons/hi";

const ChatHeader = ({
  conversation,
  handleBackClick,
}: {
  conversation: Conversation;
  handleBackClick?: (val: boolean) => void;
}) => {
  return (
    <div className="p-4 border-b border-mid-grey flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1 border border-mid-grey rounded-lg"
          onClick={() => handleBackClick?.(false)}
        >
          <HiChevronLeft size={25} />
        </button>

        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
            conversation.avatarColor ?? "bg-slate-400"
          }`}
        >
          {conversation.name
            .split(" ")
            .map((n) => n[0])
            .slice(0, 2)
            .join("")}
        </div>

        <div>
          <Typography variant="mediumTextSemibold">
            {conversation.name}
          </Typography>
          <Typography
            as="a"
            href={`mailto:${conversation.email}`}
            variant="smallText"
            className="text-primary hover:underline cursor-pointer"
          >
            {conversation.email}
          </Typography>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-feint-grey">
          <HiOutlineSearch size={18} />
        </button>
        <button className="p-2 rounded-md hover:bg-feint-grey">
          <HiDotsHorizontal />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
