import Typography from "@/components/common/Typography";

export const EmptyChatState = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-70 pointer-events-none" />

      <div className="absolute w-80 h-80 bg-blue-200/40 rounded-full blur-3xl -top-24 -left-24 animate-pulse pointer-events-none" />
      <div className="absolute w-80 h-80 bg-purple-200/40 rounded-full blur-3xl -bottom-24 -right-24 animate-pulse pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fadeIn">
        <div className="w-24 h-24 rounded-2xl flex items-center justify-center animate-float">
          <svg
            className="w-12 h-12 text-indigo-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4-.8L3 20l1.3-3.9A7.972 7.972 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </div>

        <Typography variant={"mediumTextBold"} className="text-gray-700">
          No Conversation Selected
        </Typography>

        <Typography variant={"smallText"} className="text-charcoal-gray mt-2 max-w-xs mx-auto leading-relaxed">
          Choose a conversation from the list to start chatting. You can also
          create a new message anytime.
        </Typography>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0); }
          }
          .animate-float {
            animation: float 3.8s ease-in-out infinite;
          }

          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(8px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.9s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};
