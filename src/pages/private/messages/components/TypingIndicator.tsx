import Typography from "@/components/common/Typography";

export default function TypingIndicator() {
  return (
    <div className="mb-4 flex justify-start">
      <div className="max-w-[70%]">
        <div className="bg-white border border-mid-grey rounded-lg px-4 py-2">
          <Typography
            variant="smallText"
            className="animate-pulse text-slate-400"
          >
            Typing...
          </Typography>
        </div>
      </div>
    </div>
  );
}
