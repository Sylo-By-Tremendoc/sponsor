import MultiTextInput from "@/components/common/MultiTextInput";
import Typography from "@/components/common/Typography";
import { FiSmile, FiPaperclip, FiSend } from "react-icons/fi";

export default function ChatInput({
  draft,
  setDraft,
  onSend,
  onAttach,
  attached,
  sending,
}: {
  draft: string;
  setDraft: (v: string) => void;
  onSend: () => void;
  onAttach: (f?: File) => void;
  attached: File | null;
  sending: boolean;
}) {
  return (
    <div className="shrink-0 p-4 border-t border-mid-grey">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <div className="space-y-2 flex-1">
          {attached && (
            <div className="mt-2 p-2 border border-mid-grey rounded inline-flex items-center justify-between gap-5 bg-slate-50">
              <Typography variant={"smallText"}>
                {attached.name} •{" "}
                <span className="text-xs">
                  {" "}
                  {Math.round(attached.size / 1024)} KB
                </span>
              </Typography>
              <button
                onClick={() => onAttach(undefined)}
                className="text-xs text-slate-500"
              >
                Remove
              </button>
            </div>
          )}

          <MultiTextInput
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Send a message"
            className="resize-none min-h-5"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <label className="p-2 rounded-full hover:bg-feint-grey cursor-pointer">
            <FiSmile size={18} />
          </label>

          <label className="p-2 rounded-full hover:bg-feint-grey cursor-pointer">
            <FiPaperclip size={18} />
            <input
              type="file"
              className="hidden"
              onChange={(e) => onAttach(e.target.files?.[0])}
            />
          </label>

          <button
            onClick={onSend}
            disabled={sending}
            className="bg-primary rounded-full w-9 h-9 flex items-center justify-center"
          >
            <FiSend size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
