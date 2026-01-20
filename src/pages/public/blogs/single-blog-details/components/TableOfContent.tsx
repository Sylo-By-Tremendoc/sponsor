import Icons from "@/components/common/Icons";
import Typography from "@/components/common/Typography";
import { HiOutlineDocumentText } from "react-icons/hi";

const TableOfContent = () => {
  const outlineItems = [
    "Comprehensive Coverage: Ensuring Your Pets Are Fully Insured",
    "Understanding the Importance of Pet Insurance",
    "What Does Comprehensive Coverage Include?",
    "Choosing the Right Insurance Plan for Your Pet",
    "Maximizing Your Pet Insurance Benefits",
    "Conclusion",
  ];

  return (
    <div className="space-y-4 p-4 text-white bg-[#08382C] rounded-2xl h-full">
      <div className="flex items-center gap-3 p-4 bg-[#084637] rounded-2xl">
        <HiOutlineDocumentText size={25} />

        <Typography variant={"mediumText"}>Table Of Content</Typography>
      </div>

      <ul className="space-y-2 list-disc pl-7 p-5 bg-[#084637] rounded-2xl">
        {outlineItems.map((item, index) => (
          <li key={index} className="leading-relaxed text-[12px]">
            {item}
          </li>
        ))}
      </ul>

      <div className="space-y-5 py-8 border-y border-charcoal-gray ">
        <Icons iconName="blogContent" />
        <Typography variant={"smallText"}>
          Lorem ipsum dolor sit amet consectetur adipiscing elit Mauris mattis
          semper libero eu consequat augue convallis vitae Mauris porttitor
          maximus magna ornare imperdiet arcu fermentum eu
        </Typography>
      </div>
    </div>
  );
};

export default TableOfContent;
