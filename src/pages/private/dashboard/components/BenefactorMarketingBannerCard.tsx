import SkeletonLoader from "@/components/common/SkeletonLoader";
import Typography from "@/components/common/Typography";

export const BenefactorMarketingBannerCard = ({
  bannerInfo,
}: {
  bannerInfo: {
    id: string;
    title: string;
    description: string;
    image: string;
  };
}) => {
  return (
    <div className="relative w-full h-[250px] rounded-2xl overflow-hidden">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${bannerInfo?.image})` }}
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />

      <div className="relative z-10 h-full flex items-center">
        <div className="mt-6 px-6 md:px-12 lg:px-16 max-w-lg text-white">
          <Typography
            variant="largeTextBold"
            className="mb-2 text-3xl leading-tight"
          >
            {bannerInfo.title}
          </Typography>

          <Typography
            variant="smallText"
            className="text-gray-200 leading-relaxed text-sm md:text-base"
          >
            {bannerInfo.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export const BenefactorMarketingBannerCardLoader = () => {
  return (
    <SkeletonLoader className="h-full w-full border-2 border-dashed rounded-xl" />
  );
};
