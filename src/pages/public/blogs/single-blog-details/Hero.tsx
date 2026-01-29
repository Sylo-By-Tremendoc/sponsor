import type { BlogParams } from "@/types/blogs";
import heroImg from "../../../../assets/images/contact-us-hero-img.png";
import HeroSection from "@/components/common/HeroSection";
import SkeletonLoader from "@/components/common/SkeletonLoader";

const Hero = ({
  blog,
  isLoading,
}: {
  blog?: BlogParams;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <HeroSkeleton />;
  }

  // const subTopics = blog?.categories?.map((cat) => ({ name: cat.name })) || [];

  const subTopics = [
    { name: "Insurance" },
    { name: "Posts" },
    { name: "Uncategorized " },
    { name: "Comprehensive Coverage: Ensuring Your Pets Are Fully Insured" },
  ];

  return (
    <HeroSection
      title={<>{blog?.title}</>}
      backgroundImage={blog?.main_attachment?.url || heroImg}
      breadcrumbs={subTopics}
    />
  );
};

export default Hero;

const HeroSkeleton = () => {
  return (
    <section className="relative h-[22rem] md:h-[26rem] w-full rounded-b-3xl overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 bg-black/30" />

      <div className="flex flex-col justify-end gap-3 px-[1rem] py-10 md:px-16 max-w-3xl h-full ">
        <SkeletonLoader className="w-3/4 h-10 rounded-md" />
        <SkeletonLoader className="w-2/3 h-10 rounded-md" />
      </div>
    </section>
  );
};
