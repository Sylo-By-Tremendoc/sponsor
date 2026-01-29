import SkeletonLoader from "@/components/common/SkeletonLoader";
import type { MediaParams } from "@/types/media";

export const PartnerCard = ({ partner }: { partner: MediaParams }) => {
  return (
    <div
      className="
        relative h-[240px] rounded-2xl overflow-hidden cursor-pointer
        shadow-sm hover:shadow-md transition-all
      "
    >
      <div
        className="
          absolute inset-0 bg-cover bg-no-repeat bg-center
          transition-transform duration-700
          hover:scale-105
        "
        style={{
          backgroundImage: `url(${partner?.media?.url})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 h-full p-6 flex flex-col justify-end text-white">
        <h3 className="text-lg font-semibold mb-1">{partner?.title}</h3>
        <p className="text-sm text-white/85 leading-relaxed line-clamp-2">
          {partner?.description}
        </p>
      </div>

      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition duration-500 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
};

export const PartnerCardLoader = () => {
  return (
    <div
      className="
        relative h-[240px] rounded-2xl overflow-hidden
        bg-gray-200 dark:bg-gray-800
        animate-pulse
      "
    >
      <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />

      <div className="relative z-10 h-full p-6 flex flex-col justify-end gap-2">
        <SkeletonLoader className="h-4 w-2/3 rounded" />

        <div className="space-y-1">
          <SkeletonLoader className="h-3 w-full rounded" />
          <SkeletonLoader className="h-3 w-5/6 rounded" />
          <SkeletonLoader className="h-3 w-3/4 rounded" />
        </div>
      </div>
    </div>
  );
};

export const PartnerEmptyState = () => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        h-[240px] rounded-2xl
        border-2 border-dashed border-gray-300
        bg-gray-50
        text-center
      "
    >
      {/* Icon */}
      <div className="mb-3 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 7h18M3 12h18M3 17h18"
          />
        </svg>
      </div>

      <h3 className="text-sm font-semibold text-gray-700">
        No Partner logos yet
      </h3>

      <p className="text-xs text-gray-500 mt-1 max-w-xs">
        Partner logos will appear here once they are uploaded.
      </p>
    </div>
  );
};

