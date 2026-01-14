import { Section } from "../../home/components";

const NoLocationOrAgeRangeSelected = ({ onClick }: { onClick: () => void }) => {
  return (
    <Section className="px-6 pt-0! pb-20 md:pt-10! text-center">
      <h3 className="text-xl font-semibold mb-3">
        Please complete your preferences
      </h3>
      <p className="text-gray-600 mb-6 max-w-xl mx-auto">
        To help us tailor the best planfor you, please select your
        beneficiary country and age range..
      </p>

      <button
        onClick={onClick}
        className="bg-primary text-white py-3 px-6 rounded-xl font-medium transition cursor-pointer"
      >
        Complete Setup
      </button>
    </Section>
  );
};

export default NoLocationOrAgeRangeSelected;
