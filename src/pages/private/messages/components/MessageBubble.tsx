import Typography from "@/components/common/Typography";
import type { Message } from "@/types/message";

export default function MessageBubble({ message }: { message: Message }) {
  return (
    <div
      className={`mb-4 flex ${
        message.fromMe ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`${message.fromMe ? "order-2" : "order-1"} max-w-[70%]`}>
        <div
          className={`${
            message.fromMe
              ? "bg-primary text-white rounded-lg px-4 py-2"
              : "bg-white border border-mid-grey rounded-lg px-4 py-2"
          }`}
        >
          {message.text && (
            <Typography variant="smallText" className="whitespace-pre-wrap">
              {message.text}
            </Typography>
          )}

          {message.attachment && (
            <div className="mt-2 p-2 border rounded bg-slate-50 text-sm">
              <div className="font-medium">{message.attachment.name}</div>
              <div className="text-xs text-slate-500">
                {Math.round(message.attachment.size / 1024)} KB
              </div>
            </div>
          )}
        </div>

        <div className="text-xs text-slate-400 mt-1 text-right">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
