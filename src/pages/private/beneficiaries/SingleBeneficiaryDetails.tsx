import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import RelationshipCard from "./components/RelationshipCard";
import AnalyticsCard from "./components/AnalyticsCard";
import { FieldLabelText } from "@/components/common/FormHelper";
import LineThrough from "@/components/common/LineThrough";
import { convertPrice } from "@/utils/constant";

const SingleBeneficiaryDetails = () => {
  const relationshipData = [
    {
      icon: {
        name: "age",
        bg: "#DDEFFF",
        color: "#0A83F3",
      },
      title: "Age",
      description: "30 Years",
    },
    {
      icon: {
        name: "relationship",
        bg: "#FFE4D4",
        color: "#FF6200",
      },
      title: "Relationship",
      description: "Sister",
    },
    {
      icon: {
        name: "gender",
        bg: "#D6FFD8",
        color: "#16B51B",
      },
      title: "Gender",
      description: "Female",
    },
  ];

  const analyticsData = [
    {
      icon: {
        name: "onboarding",
        bg: "#DCFFDD",
        color: "#14DBA3",
      },
      title: "Package Duration",
      date: "29 Days Left",
    },
    {
      icon: {
        name: "onboarding",
        bg: "#CCE5FF",
        color: "#201DF5",
      },
      title: "Onboarding Start Date",
      date: "14th Oct. 25",
    },
    {
      icon: {
        name: "onboarding",
        bg: "#FFEFE5",
        color: "#FF5500",
      },
      title: "Onboarding End Date",
      date: "14th Nov. 25",
    },
  ];

  const personalInformation = [
    {
      label: "First Name",
      value: "Charles",
    },
    {
      label: "Last Name",
      value: "Omiwole",
    },
    {
      label: "Gender",
      value: "Male",
    },
    {
      label: "Date of Birth",
      value: "03/10/1991",
    },
    {
      label: "Phone Number",
      value: "+2347067421332",
    },
    {
      label: "Email Address",
      value: "linakabenski@gmail.com",
    },
    {
      label: "State",
      value: "Lagos State",
    },
    {
      label: "Country",
      value: "Nigeria",
    },
    {
      label: "Address",
      value: "9 Sultan Bello street, Agric.",
    },
  ];
  return (
    <div className="flex flex-col space-y-5 relative">
      <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-mid-grey">
        <div className="flex items-center gap-2">
          <button
            className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => window.history.back()}
          >
            <HiArrowLeft size={18} className="text-gray-700" />
          </button>
          <Typography variant="largeTextBold">Charles Omiwole</Typography>
        </div>

        <Button
          variant="outline"
          className="hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          Suspend Beneficiary
        </Button>
      </div>

      <div className="flex-1 items-start overflow-y-auto grid md:grid-cols-3 gap-3">
        <div className="sticky top-0 flex flex-col justify-center items-center gap-5 bg-white rounded-xl border border-mid-grey p-3">
          <img
            src="https://randomuser.me/api/portraits/men/2.jpg"
            alt="User Avatar"
            className="w-[143px] h-[143px] rounded-full object-cover border border-mid-grey mt-3"
          />
          <div className="text-center">
            <Typography variant={"mediumTextBold"}>Charles Omiwole</Typography>
            <Link
              to="#"
              className="text-xs text-primary underline cursor-pointer"
            >
              charles.omiwole@gmail.com
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-2 w-full">
            {relationshipData?.map((item, index) => (
              <RelationshipCard
                key={index}
                title={item?.title}
                description={item?.description}
                icon={item?.icon}
              />
            ))}
          </div>

          <div className="space-y-1 text-center p-2 bg-[#F5F5F5] rounded-lg w-full">
            <Typography variant={"xSmallText"} className="text-charcoal-gray">
              Date Added
            </Typography>
            <Typography variant={"smallText"} className="font-medium">
              5th September, 2024
            </Typography>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="grid md:grid-cols-3 items-center gap-3">
            {analyticsData?.map((item, index) => (
              <AnalyticsCard
                key={index}
                title={item.title}
                date={item?.date}
                icon={item?.icon}
              />
            ))}
          </div>

          <div className="p-4 bg-white rounded-2xl border border-mid-grey space-y-2">
            <Typography variant={"mediumTextBold"}>
              Personal Information
            </Typography>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 items-center">
              {personalInformation?.map((item, index) => (
                <div key={index} className="space-y-1">
                  <FieldLabelText view label={item?.label} />
                  <Typography variant={"smallText"} className="font-medium">
                    {item?.value}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <LineThrough className="py-3" />

          <div className="p-4 bg-white rounded-2xl border border-mid-grey space-y-2">
            <Typography variant={"mediumTextBold"}>
              Active Package Plan
            </Typography>

            <div className="border border-primary bg-[#F4FFF4] rounded-2xl p-4">
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <div>
                  <Typography variant={"mediumText"}>
                    Easy Care (Individual)
                  </Typography>
                  <Typography
                    variant={"smallText"}
                    className="text-charcoal-gray pt-1"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. 
                  </Typography>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <Typography variant={"heading4"}>
                    {convertPrice(7.99)}
                  </Typography>
                  <Typography
                    variant={"xxSmallText"}
                    className="text-charcoal-gray"
                  >
                    Perfect for sponsoring <br /> one special person
                  </Typography>
                </div>
              </div>

              <div className="flex justify-between items-center gap-5 mt-3">
                <Link to="#" className="text-xs text-primary underline">
                  View all benefits
                </Link>

                <Button className="text-xs">Upgrade Plan</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBeneficiaryDetails;
