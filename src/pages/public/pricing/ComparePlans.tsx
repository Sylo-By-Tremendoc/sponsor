import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/common/TableInfo";
import Typography from "../../../components/common/Typography";
import { convertPrice } from "../../../utils/constant";
import { Section, TitleText } from "../home/components";

const ComparePlans = () => {
  const planData = [
    {
      section: "Hospital Care",
      price: {
        basic: 25000,
        standard: 40000,
        enhanced: 60000,
        premium: 85000,
      },
      benefits: [
        {
          name: "Inpatient care",
          basic: "✓",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Outpatient consultations",
          basic: "✓",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Specialist referrals",
          basic: "—",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Post-surgery care",
          basic: "—",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Maternity care",
          basic: "—",
          standard: "—",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Room upgrade (Private)",
          basic: "—",
          standard: "—",
          enhanced: "—",
          premium: "✓",
        },
      ],
    },
    {
      section: "Medication & Tests",
      price: {
        basic: 20000,
        standard: 35000,
        enhanced: 55000,
        premium: 75000,
      },
      benefits: [
        {
          name: "Basic lab tests",
          basic: "✓",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Nutritional supplements",
          basic: "—",
          standard: "—",
          enhanced: "—",
          premium: "✓",
        },
      ],
    },
    {
      section: "Emergency & Extras",
      price: {
        basic: 15000,
        standard: 25000,
        enhanced: 40000,
        premium: 60000,
      },
      benefits: [
       
        {
          name: "Dental care",
          basic: "—",
          standard: "—",
          enhanced: "—",
          premium: "✓",
        },
        {
          name: "Vision screening",
          basic: "—",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Wellness counselling",
          basic: "—",
          standard: "—",
          enhanced: "✓",
          premium: "✓",
        },
      ],
    },
    {
      section: "Telemedicine",
      price: {
        basic: 10000,
        standard: 18000,
        enhanced: 25000,
        premium: 35000,
      },
      benefits: [
       
        {
          name: "AI health monitoring",
          basic: "—",
          standard: "—",
          enhanced: "—",
          premium: "✓",
        },
      ],
    },
    {
      section: "Maternal & Child Health",
      price: {
        basic: 12000,
        standard: 20000,
        enhanced: 35000,
        premium: 50000,
      },
      benefits: [
        {
          name: "Therapy sessions",
          basic: "—",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Stress management programs",
          basic: "—",
          standard: "—",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "24/7 emotional support line",
          basic: "—",
          standard: "—",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Depression screening",
          basic: "✓",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Family counselling",
          basic: "—",
          standard: "—",
          enhanced: "—",
          premium: "✓",
        },
      ],
    },
    {
      section: "Chronic Disease Care",
      price: {
        basic: 18000,
        standard: 30000,
        enhanced: 50000,
        premium: 70000,
      },
      benefits: [
        {
          name: "Diabetes management",
          basic: "—",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Hypertension care",
          basic: "✓",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Regular monitoring",
          basic: "—",
          standard: "✓",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Specialist follow-up",
          basic: "—",
          standard: "—",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Home health visits",
          basic: "—",
          standard: "—",
          enhanced: "✓",
          premium: "✓",
        },
        {
          name: "Custom medication plan",
          basic: "—",
          standard: "—",
          enhanced: "—",
          premium: "✓",
        },
      ],
    },
  ];

  return (
    <Section className="flex flex-col gap-5 bg-white md:py-10">
      <TitleText className="text-center mb-4">Compare Plans</TitleText>

      <Table className="min-w-full border-collapse">
        <TableHeader>
          <TableRow className="bg-[#F4F4F4] text-center">
            <TableHead className="text-[13px] font-semibold p-3 w-12">
              S/N
            </TableHead>
            <TableHead className="text-[13px] font-semibold text-left p-3">
              Benefits
            </TableHead>
            <TableHead className="text-[13px] font-semibold p-3 whitespace-nowrap">
              Beta Life Basic
            </TableHead>
            <TableHead className="text-[13px] font-semibold p-3 whitespace-nowrap">
              Beta Life Standard
            </TableHead>
            <TableHead className="text-[13px] font-semibold p-3 whitespace-nowrap">
              Beta Life Enhanced
            </TableHead>
            <TableHead className="text-[13px] font-semibold p-3 whitespace-nowrap">
              Beta Life Premium
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {planData.map((section, sectionIndex) => (
            <>
              {/* Section Header */}
              <TableRow
                key={section.section}
                className="hover:bg-gray-50 transition-all border-b border-dashed border-gray-300"
              >
                <TableCell
                  colSpan={2}
                  className="p-3 text-[14px] uppercase tracking-wide border-r border-gray-300"
                >
                  {sectionIndex + 1}. {section.section}
                </TableCell>

                <TableCell className="text-[12px] font-medium tracking-wide text-center p-3 border-r border-gray-300">
                  {convertPrice(section?.price?.basic)}
                </TableCell>
                <TableCell className="text-[12px] font-medium tracking-wide text-center p-3 border-r border-gray-300">
                  {convertPrice(section?.price?.standard)}
                </TableCell>
                <TableCell className="text-[12px] font-medium tracking-wide text-center p-3 border-r border-gray-300">
                  {convertPrice(section?.price?.enhanced)}
                </TableCell>
                <TableCell className="text-[12px] font-medium tracking-wide text-center p-3">
                  {convertPrice(section?.price?.premium)}
                </TableCell>
              </TableRow>

              {/* Benefits under this section */}
              {section.benefits.map((item, benefitIndex) => (
                <TableRow
                  key={benefitIndex}
                  className="hover:bg-gray-50 transition-all border-b border-dashed border-gray-300"
                >
                  <TableCell className="text-center font-bold text-[13px] border-r border-gray-300 p-3">
                    {sectionIndex + 1 + String.fromCharCode(97 + benefitIndex)}{" "}
                  </TableCell>

                  <TableCell className="text-[13px] text-left p-3 border-r border-gray-300">
                    {item.name}
                  </TableCell>

                  <TableCell className="text-center p-3 border-r border-gray-300">
                    {item.basic}
                  </TableCell>
                  <TableCell className="text-center p-3 border-r border-gray-300">
                    {item.standard}
                  </TableCell>
                  <TableCell className="text-center p-3 border-r border-gray-300">
                    {item.enhanced}
                  </TableCell>
                  <TableCell className="text-center p-3">
                    {item.premium}
                  </TableCell>
                </TableRow>
              ))}
            </>
          ))}
        </TableBody>
      </Table>

      <Typography variant={"xSmallText"} className="m-auto pt-5">
        By using this service you agree to our{" "}
        <Link to="#" className="text-primary hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="#" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </Typography>
    </Section>
  );
};

export default ComparePlans;
