import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { HiArrowLeft } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FieldLabelText } from "@/components/common/FormHelper";
import LineThrough from "@/components/common/LineThrough";
import { defaultImages, formatDate } from "@/utils/constant";
import {
  BeneficiaryHeaderLoader,
  PlanUpgradeCardLoader,
  ProfileDetailsLoader,
  RelationshipCard,
} from "../components/RelationshipCard";
import {
  AnalyticsCard,
  AnalyticsCardLoader,
} from "../components/AnalyticsCard";
import useGetSingleBeneficiaryDetails from "./hooks/use-get-single-beneficiary-details";
import NetworkError from "@/pages/error/NetworkError";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import Container from "@/components/common/Container";
import { useMemo, useState } from "react";
import {
  formatDateOfBirth,
  formatGender,
  formatPhoneNumber,
  formatToGetAge,
} from "@/utils/formatters";
import useGetSingleBeneficiaryPlan from "./hooks/use-get-single-beneficiary-plan";
import GetStartedModal from "@/pages/public/home/GetStartedModal";
import { SubscriptionDetailsCard } from "../../packages-plans/components/SubscriptionDetailsCard";

const SingleBeneficiaryDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [showGetStartedModal, setShowGetStartedModal] = useState(false);

  const { data, isLoading, isFetching, error, refetch } =
    useGetSingleBeneficiaryDetails(!!id, id!);

  const {
    data: plans,
    isLoading: isLoadingPlan,
    isFetching: isFetchingPlan,
  } = useGetSingleBeneficiaryPlan(!!id, id!);

  const relationshipData = useMemo(
    () => [
      {
        icon: {
          name: "age",
          bg: "#DDEFFF",
          color: "#0A83F3",
        },
        title: "Age",
        description: formatToGetAge(data?.date_of_birth),
      },
      {
        icon: {
          name: "relationship",
          bg: "#FFE4D4",
          color: "#FF6200",
        },
        title: "Relationship",
        description: data?.relationship || "—",
      },
      {
        icon: {
          name: "gender",
          bg: "#D6FFD8",
          color: "#16B51B",
        },
        title: "Gender",
        description: formatGender(data?.gender),
      },
    ],
    [data]
  );

  const analyticsData = [
    {
      icon: {
        name: "onboarding",
        bg: "#DCFFDD",
        color: "#14DBA3",
      },
      title: "Plan Duration",
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

  const personalInformation = useMemo(
    () => [
      { label: "First Name", value: data?.first_name || "—" },
      { label: "Last Name", value: data?.last_name || "—" },
      { label: "Gender", value: formatGender(data?.gender) },
      {
        label: "Date of Birth",
        value: formatDateOfBirth(data?.date_of_birth),
      },
      {
        label: "Phone Number",
        value: formatPhoneNumber(data?.phone),
      },
      { label: "Email Address", value: data?.email || "—" },
      { label: "Address", value: data?.address || "—" },
    ],
    [data]
  );

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Container className="flex flex-col space-y-5 relative">
      {isLoading || isFetching ? (
        <BeneficiaryHeaderLoader />
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-mid-grey">
          <div className="flex items-center gap-2">
            <button
              className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              onClick={() => window.history.back()}
            >
              <HiArrowLeft size={18} className="text-gray-700" />
            </button>
            <Typography variant="largeTextBold">
              {data?.first_name} {data?.last_name}
            </Typography>
          </div>

          <Button
            variant="outline"
            className="hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            Suspend Beneficiary
          </Button>
        </div>
      )}

      <div className="flex-1 items-start overflow-y-auto grid md:grid-cols-3 gap-3">
        {isLoading || isFetching ? (
          <ProfileDetailsLoader />
        ) : (
          <div className="sticky top-0 flex flex-col justify-center items-center gap-5 bg-white rounded-xl border border-mid-grey p-3">
            <img
              src={defaultImages?.avatar}
              alt="Beneficiary Avatar"
              className="w-[143px] h-[143px] rounded-full object-cover border border-mid-grey mt-3"
            />
            <div className="text-center">
              <Typography variant={"mediumTextBold"}>
                {data?.first_name} {data?.last_name}
              </Typography>
              <Link
                to="#"
                className="text-xs text-primary underline cursor-pointer"
              >
                {data?.email}
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
                {data?.created_at ? formatDate(data?.created_at) : "--"}
              </Typography>
            </div>
          </div>
        )}

        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="grid md:grid-cols-3 items-center gap-3">
            {isLoading || isFetching
              ? Array.from({ length: 3 }).map((_, index) => (
                  <AnalyticsCardLoader key={index} />
                ))
              : analyticsData.map((item) => (
                  <AnalyticsCard
                    key={item.title}
                    title={item.title}
                    date={item.date}
                    icon={item.icon}
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

                  {isLoading || isFetching ? (
                    <SkeletonLoader className="h-4 w-full max-w-[140px] rounded" />
                  ) : item.label === "Email" ? (
                    <Typography
                      as="a"
                      variant="smallText"
                      href={`mailto:${item.value}`}
                      className="text-primary font-medium underline truncate"
                    >
                      {item.value}
                    </Typography>
                  ) : (
                    <Typography
                      variant="smallText"
                      className="font-medium truncate"
                    >
                      {item.value}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>

          <LineThrough className="py-3" />

          <div className="p-4 bg-white rounded-2xl border border-mid-grey space-y-2">
            <Typography variant={"mediumTextBold"}>
              Active PlanPlan
            </Typography>

            {isLoadingPlan || isFetchingPlan ? (
              <PlanUpgradeCardLoader />
            ) : plans?.length === 0 ? (
              <div className="border border-dashed border-gray-300 bg-gray-50 rounded-2xl p-6 text-center">
                <Typography variant="smallTextBold" className="text-gray-700">
                  No Active Plan
                </Typography>
                <Typography variant="xSmallText" className="text-gray-500 mt-1">
                  This beneficiary does not currently have a subscription plan.
                </Typography>

                <Button
                  className="mt-4 text-xs"
                  onClick={() => setShowGetStartedModal(true)}
                >
                  Choose a Plan
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {plans?.map((item, index) => (
                 <SubscriptionDetailsCard key={index} plan={item?.plan} onUpgrade={() => {}} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <GetStartedModal
        showGetStartedModal={showGetStartedModal}
        setShowGetStartedModal={setShowGetStartedModal}
        handleContinue={() =>
          navigate(`/package-plans/plans?beneficiaryId=${data?.id}`)
        }
      />
    </Container>
  );
};

export default SingleBeneficiaryDetails;
