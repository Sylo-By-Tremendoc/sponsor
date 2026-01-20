import Typography from "@/components/common/Typography";

const OverviewFAQItem = ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) => {
  return (
    <div className="space-y-5 p-4 bg-[#084637] rounded-2xl">
      <Typography variant="largeText">{question}</Typography>

      <Typography variant="smallText" className="line-clamp-3">
        {answer}
      </Typography>
    </div>
  );
};

export default OverviewFAQItem;
