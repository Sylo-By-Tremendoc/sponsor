import RightSection from "@/components/navbar/components/RightSection";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import PaymentSummary from "../component/PaymentSummary";
import Typography from "@/components/common/Typography";
import { Button } from "@/components/common/Button";
import LineThrough from "@/components/common/LineThrough";
import { HiArrowLeft } from "react-icons/hi";
import Pill from "@/components/common/Pill";
import { TitleText } from "@/pages/public/home/components";
import { convertPrice, replaceEmptyStringsWithNull } from "@/utils/constant";
import { useEffect, useMemo, useState } from "react";
import BeneficiaryInformation from "./components/BeneficiaryInformation";
import type { BeneficiariesParams } from "@/types/beneficiary";
import RemoveBeneficiaryModal from "./components/DeleteBeneficiaryModal";
import useGetSinglePlanDetails from "../hooks/use-get-single-plan-details";
import NetworkError from "@/pages/error/NetworkError";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import { useCurrencyStore } from "@/store/currency-store";
import useGetSingleBeneficiaryDetails from "@/pages/private/beneficiaries/single-beneficiary-details/hooks/use-get-single-beneficiary-details";
import VerifyOTPModal from "./components/verify-otp-modal";
import { toast } from "react-toastify";
import useCreateSubscription from "../hooks/use-create-subscription";
import { getErrorMessage } from "@/utils/get-error-message";
import InviteBenefactor from "./components/InviteBenefactor";
import { RadioButtonInput } from "@/components/common/RadioButtonInput";
import { motion, AnimatePresence } from "framer-motion";
import CardPaymentModal from "./components/CardPaymentModal";
import MobilePaymentSummaryDrawer from "../component/MobilePaymentSummary";
import PlanPurchaseSuccessModal from "./components/PlanPurchaseSuccessModal";
import Icons from "@/components/common/Icons";
import * as RadioGroup from "@radix-ui/react-radio-group";
import useCreateSharedPayment from "../hooks/use-create-shared-payment";

const PlanPaymentPage = () => {
  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const beneficiaryId = searchParams.get("beneficiaryId");
  const [sharedPaymentId, setSharedPaymentId] = useState("");
  const [sharedContributionAmount, setSharedContributionAmount] = useState(0);

  const navigate = useNavigate();

  const currency = useCurrencyStore((state) => state?.currency);

  const { data: singleBeneficiary } = useGetSingleBeneficiaryDetails(
    !!beneficiaryId,
    beneficiaryId!
  );

  const [beneficiaries, setBeneficiaries] = useState<BeneficiariesParams[]>([]);
  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<BeneficiariesParams | null>(null);

  const [openVerifyOTPModal, setOpenVerifyOTPModal] = useState(false);
  const [showCardPaymentModal, setShowCardPaymentModal] = useState(false);
  const [pendingPaymentStatus, setPendingPaymentStatus] = useState(false);
  const [showSelectBeneficiaryDrawer, setShowSelectBeneficiaryDrawer] =
    useState(false);
  const [showRemoveBeneficiaryModal, setShowRemoveBeneficiaryModal] =
    useState(false);
  const [openPlanPurchaseSuccessModal, setOpenPlanPurchaseSuccessModal] =
    useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentType, setPaymentType] = useState<"single" | "shared">("single");

  const {
    data: singlePlanDetails,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetSinglePlanDetails(!!id, id!);

  const createSubscription = useCreateSubscription();
  const createSharedPayment = useCreateSharedPayment(sharedPaymentId);

  const handleOnSelect = (beneficiaryId: string) => {
    setBeneficiaries((prev: any) =>
      prev.map((beneficiary: any) =>
        beneficiary.id === beneficiaryId
          ? { ...beneficiary, isSelected: !beneficiary.isSelected }
          : beneficiary
      )
    );
  };

  const handleRemoveBeneficiaries = (beneficiaryId: string) => {
    setBeneficiaries((prev) =>
      prev.map((b) =>
        b.id === beneficiaryId ? { ...b, isSelected: false } : b
      )
    );
    setShowRemoveBeneficiaryModal(false);
  };

  const price = Number(singlePlanDetails?.plan?.price || 0);
  const serviceCharge = price * 0.05;
  const totalPrice = price + serviceCharge;

  const addedBeneficiaries = useMemo(
    () => beneficiaries?.filter((beneficiary) => beneficiary.isSelected) || [],
    [beneficiaries]
  );

  const buildSubscriptionPayload = (paymentMethodId: string) => ({
    plan_id: singlePlanDetails?.plan?.id ?? null,
    beneficiary_id: addedBeneficiaries?.[0]?.id ?? null,
    billing_interval: singlePlanDetails?.plan?.billing_interval ?? null,
    payment_method_id: paymentMethodId ?? null,
  });

  const buildSharedPaymentPayload = (paymentMethodId: string) => ({
    payment_method_id: paymentMethodId ?? null,
    contribution_amount: sharedContributionAmount ?? 0,
  });

  const handleCreatePlanSubscription = (paymentMethodId: string) => {
    if (!paymentMethodId) return;

    const payload =
      paymentType === "shared"
        ? buildSharedPaymentPayload(paymentMethodId)
        : buildSubscriptionPayload(paymentMethodId);

    const submittedData = replaceEmptyStringsWithNull(payload);

    const mutation =
      paymentType === "shared" ? createSharedPayment : createSubscription;

    mutation?.mutate(submittedData, {
      onSuccess: (res) => {
        console.log("RESPONSE", res);
        const pending = res?.data?.status;

        if (pending != "active") {
          setPendingPaymentStatus(true);
        }

        setShowCardPaymentModal(false);
        setOpenPlanPurchaseSuccessModal(true);
      },
      onError: (error: any) => {
        setIsSubmitting(false);
        toast.error(getErrorMessage(error, "Failed to create subscription"));
      },
    });
  };

  useEffect(() => {
    const paymentId = localStorage.getItem("sharedPaymentId");
    if (paymentId) {
      setSharedPaymentId(paymentId);
    }
  }, []);

  useEffect(() => {
    if (!singleBeneficiary) return;

    setBeneficiaries((prev: any) => {
      const exists = prev.some((item: any) => item.id === singleBeneficiary.id);

      if (exists) {
        // Ensure it's selected if already present
        return prev.map((item: any) =>
          item.id === singleBeneficiary.id
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        );
      }

      return [
        ...prev.map((item: any) => ({ ...item, isSelected: false })),
        { ...singleBeneficiary, isSelected: true },
      ];
    });
  }, [singleBeneficiary]);

  useEffect(() => {
    if (clientSecret) {
      setShowCardPaymentModal(true);
    }
  }, [clientSecret]);

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <div className="flex flex-col bg-[#F7F7F7] h-screen overflow-hidden">
      <header className="px-4 md:px-20 py-5 shadow-xs flex justify-between items-center bg-[#F7F7F7]">
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Icons iconName="logo" />
          <Typography variant={"xSmallText"}>By Tremendoc</Typography>
        </div>

        <RightSection />
      </header>

      <div className="flex flex-1 justify-between gap-8 px-4 md:px-32 overflow-hidden">
        <div className="py-7 flex-1 flex flex-col gap-8 overflow-y-auto pb-28 md:pb-7">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <button
                className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => window.history.back()}
              >
                <HiArrowLeft size={18} className="text-gray-700" />
              </button>
              <Pill text="CHANGE PACKAGE" />
            </div>
            <TitleText className="text-start mb-0 mx-0">
              Who are you buying for?
            </TitleText>
          </div>

          <LineThrough />

          <section>
            <div className="flex justify-between items-center mb-4">
              <Typography variant={"largeText"}>Your Package</Typography>
              <Button
                className="text-white"
                onClick={() => navigate("/pricing")}
              >
                Change Package
              </Button>
            </div>

            <div className="bg-white border border-mid-grey rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-8">
              <div className="w-full">
                {isLoading || isFetching ? (
                  <SkeletonLoader className="w-20 h-7 rounded-md mb-2" />
                ) : (
                  <Typography variant={"mediumText"} className="mb-2">
                    {singlePlanDetails?.plan?.name || ""}
                  </Typography>
                )}

                {isLoading || isFetching ? (
                  <div className="space-y-1">
                    <SkeletonLoader className="w-full h-3 rounded-sm" />
                    <SkeletonLoader className="w-full h-3 rounded-sm" />
                    <SkeletonLoader className="w-full h-3 rounded-sm" />
                  </div>
                ) : (
                  <Typography
                    variant="smallText"
                    className="text-charcoal-gray"
                  >
                    {singlePlanDetails?.plan?.description ||
                      "A thoughtfully designed healthcare plan that provides dependable coverage, quality care access, and peace of mind for you and your loved ones."}
                  </Typography>
                )}
              </div>

              <div className="text-right">
                {isLoading || isFetching ? (
                  <SkeletonLoader className="w-20 h-10 rounded-md mb-2" />
                ) : (
                  <p className="text-3xl font-semibold">
                    {convertPrice(
                      Number(singlePlanDetails?.plan?.price),
                      currency
                    )}
                  </p>
                )}

                {isLoading || isFetching ? (
                  <SkeletonLoader className="w-20 h-4 rounded-md" />
                ) : (
                  <Typography
                    variant={"smallText"}
                    className="text-charcoal-gray"
                  >
                    Perfect for sponsoring one special person
                  </Typography>
                )}
              </div>
            </div>
          </section>

          <LineThrough />

          <div className="p-5 space-y-3 bg-white rounded-2xl">
            <div className="space-y-1">
              <Typography variant={"largeText"}>
                Beneficiary Information
              </Typography>

              <Typography variant="smallText" className="text-charcoal-gray">
                Select an existing beneficiary or add a new one to continue.
              </Typography>
            </div>

            <BeneficiaryInformation
              beneficiaries={beneficiaries}
              setBeneficiaries={setBeneficiaries}
              showSelectBeneficiaryDrawer={showSelectBeneficiaryDrawer}
              setShowSelectBeneficiaryDrawer={setShowSelectBeneficiaryDrawer}
              onSelect={handleOnSelect}
              handleDelete={(beneficiaries) => {
                setSelectedBeneficiary(beneficiaries);
                setShowRemoveBeneficiaryModal(true);
              }}
            />
          </div>
          {singlePlanDetails?.plan?.billing_interval === "yearly" &&
            addedBeneficiaries?.length > 0 && (
              <>
                <LineThrough />

                <div className="space-y-4 pb-8">
                  <Typography variant={"largeText"}>Payment Method</Typography>

                  <div className="space-y-2">
                    <div className="flex justify-between gap-5">
                      <Typography
                        variant={"smallText"}
                        className="text-charcoal-gray"
                      >
                        Do you want to cover the payment alone or invite
                        co-benefactors?
                      </Typography>

                      <Typography
                        variant="smallText"
                        className="text-primary hover:underline shrink-0"
                      >
                        How it works
                      </Typography>
                    </div>

                    <RadioGroup.Root
                      value={paymentType}
                      onValueChange={(val) =>
                        setPaymentType(val as "single" | "shared")
                      }
                      className="flex flex-col md:flex-row gap-5"
                    >
                      <RadioButtonInput
                        name="payment"
                        value="single"
                        label="Cover payment alone"
                      />
                      <RadioButtonInput
                        name="payment"
                        value="shared"
                        label="Shared payment (Invite co-benefactors)"
                      />
                    </RadioGroup.Root>
                  </div>

                  {/* Animated Invite Benefactor */}
                  <AnimatePresence>
                    {paymentType === "shared" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <InviteBenefactor
                          total={totalPrice}
                          paymentInfo={{
                            plan_id: singlePlanDetails?.plan?.id || "",
                            beneficiary_id: addedBeneficiaries?.[0]?.id || "",
                            billing_interval:
                              singlePlanDetails?.plan?.billing_interval || "",
                          }}
                          setSharedContributionAmount={
                            setSharedContributionAmount
                          }
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
        </div>

        <div className="hidden md:block pb-7 pt-[4.6rem] lg:col-span-1 overflow-y-auto shrink-0 max-w-[25rem]">
          <PaymentSummary
            beneficiaries={addedBeneficiaries}
            isLoading={isLoading || isFetching}
            plan={singlePlanDetails?.plan!}
            onSuccess={() => setOpenVerifyOTPModal(true)}
          />
        </div>
      </div>

      <VerifyOTPModal
        openVerifyOTPModal={openVerifyOTPModal}
        setOpenVerifyOTPModal={setOpenVerifyOTPModal}
        handleStripeSetup={(secret) => {
          setClientSecret(secret);
          setOpenVerifyOTPModal(false);
        }}
      />

      {showCardPaymentModal && clientSecret && (
        <CardPaymentModal
          isSubmitting={isSubmitting}
          clientSecret={clientSecret}
          showCardPaymentModal={showCardPaymentModal}
          setIsSubmitting={setIsSubmitting}
          setShowCardPaymentModal={setShowCardPaymentModal}
          onSuccess={(id) => handleCreatePlanSubscription(id)}
        />
      )}

      {singlePlanDetails?.plan && (
        <MobilePaymentSummaryDrawer
          isLoading={false}
          plan={singlePlanDetails?.plan}
          beneficiaries={addedBeneficiaries}
          onSuccess={() => setOpenVerifyOTPModal(true)}
        />
      )}

      <PlanPurchaseSuccessModal
        pendingPaymentStatus={pendingPaymentStatus}
        openPlanPurchaseSuccessModal={openPlanPurchaseSuccessModal}
        onViewPlan={() => navigate("/package-plans")}
      />

      <RemoveBeneficiaryModal
        selectedBeneficiary={selectedBeneficiary!}
        showRemoveBeneficiaryModal={showRemoveBeneficiaryModal}
        setShowRemoveBeneficiaryModal={setShowRemoveBeneficiaryModal}
        setSelectedBeneficiary={setSelectedBeneficiary}
        handleRemove={handleRemoveBeneficiaries}
      />
    </div>
  );
};

export default PlanPaymentPage;
