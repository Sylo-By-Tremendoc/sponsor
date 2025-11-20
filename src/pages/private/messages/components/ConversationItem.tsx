import Typography from "@/components/common/Typography";
import type { Conversation } from "@/types/message";

const ConversationItem = ({
  data,
  active,
  onSelect,
}: {
  data: Conversation;
  active: boolean;
  onSelect: () => void;
}) => {
  return (
    <button
      onClick={onSelect}
      className={`flex items-center gap-3 w-full text-left py-4 px-3 border-b border-mid-grey hover:bg-slate-50 ${
        active ? "bg-green-50" : ""
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
          data.avatarColor ?? "bg-slate-400"
        }`}
      >
        {data.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")}
      </div>

      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex justify-between items-center">
          <Typography variant="smallText" className="truncate font-medium">
            {data.name}
          </Typography>
          <Typography variant="xxSmallText" className="text-slate-400">
            {new Date(
              data.messages[data.messages.length - 1].createdAt
            ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Typography>
        </div>

        <div className="flex justify-between items-end gap-5">
          <Typography variant="xSmallText" className="truncate text-slate-500">
            {data.lastMessage}
          </Typography>

          {data.isTyping ? (
            <Typography variant="xSmallText" className="text-slate-400">
              typing...
            </Typography>
          ) : data.unread ? (
            <Typography
              variant="capitalizedText"
              className="bg-rose-500 text-white w-4 h-4 rounded-full flex items-center justify-center"
            >
              {data.unread}
            </Typography>
          ) : null}
        </div>
      </div>
    </button>
  );
};

export default ConversationItem;
