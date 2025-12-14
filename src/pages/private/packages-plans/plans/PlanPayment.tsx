import { Button } from "@/components/common/Button";
import LineThrough from "@/components/common/LineThrough";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import RightSection from "@/components/navbar/components/RightSection";
import { TitleText } from "@/pages/public/home/components";
import { convertPrice } from "@/utils/constant";
import { HiArrowLeft } from "react-icons/hi";
import AddBeneficiaryInformation, {
  AddBeneficiaryPopover,
} from "./component/AddBeneficiaryInformation";
import { useState } from "react";
import type { BeneficiaryInfo } from "./component/BeneficiaryInformationCard";
import DeleteBeneficiaryModal from "./component/DeleteBeneficiaryModal";
import AddCardModal from "../components/AddCardModal";
import DeleteCardModal from "../components/DeleteCardModal";
import type { PaymentCardInfo } from "../components/PaymentCard";
import { useNavigate } from "react-router-dom";
import SelectPlanDrawer from "./component/SelectPlanDrawer";
import AddPaymentMethod from "./component/AddPaymentMethod";
import GetStartedModal from "@/pages/public/home/GetStartedModal";
import PaymentSummary from "./component/PaymentSummary";
import MobilePaymentSummaryDrawer from "./component/MobilePaymentSummary";

const PlanPayment = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryInfo[]>([]);
  const [paymentCardDetails, setPaymentCardDetails] =
    useState<PaymentCardInfo | null>(null);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<BeneficiaryInfo | null>(null);

  const [openAddCardDetails, setOpenAddCardDetails] = useState(false);
  const [showSelectPlanDrawer, setShowSelectPlanDrawer] = useState(false);
  const [
    openAddBeneficiaryInformationModal,
    setOpenAddBeneficiaryInformationModal,
  ] = useState(false);
  const [showDeleteBeneficiaryModal, setShowDeleteBeneficiaryModal] =
    useState(false);
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false);

  const [showGetStartedModal, setShowGetStartedModal] = useState(false);

  const handleAdd = (newBeneficiary: BeneficiaryInfo) => {
    setBeneficiaries((prev) => {
      if (selectedBeneficiary?.id) {
        // Only update the one that matches the ID
        return prev.map((item) =>
          item.id === selectedBeneficiary.id
            ? { ...item, ...newBeneficiary }
            : item
        );
      }

      // If no selected, add a new one
      return [...prev, { ...newBeneficiary, id: crypto.randomUUID() }];
    });

    setSelectedBeneficiary(null);
  };

  const handleEdit = (val: BeneficiaryInfo) => {
    setSelectedBeneficiary(val);
    setOpenAddBeneficiaryInformationModal(true);
  };

  const handleDelete = (val: BeneficiaryInfo) => {
    setSelectedBeneficiary(val);
    setShowDeleteBeneficiaryModal(true);
  };

  const handleSelectPlan = (val: string) => {
    console.log(val);
    setShowSelectPlanDrawer(false);
    setOpenAddBeneficiaryInformationModal(true);
  };

  const handleAddExistingBeneficiary = () => {
    setSelectedBeneficiary(null);
    setOpenAddBeneficiaryInformationModal(true);
  };

  const handleAddNewBeneficiary = () => {
    setSelectedBeneficiary(null);
    setShowGetStartedModal(true);
  };

  const handleMakePayment = () => {
    navigate("package-plans");
  };

  return (
    <div className="flex flex-col bg-[#F7F7F7] h-screen overflow-hidden">
      <header className="px-4 md:px-20 py-5 shadow-xs flex justify-between items-center bg-[#F7F7F7]">
        <div
          className="flex items-center space-x-2 hover: cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="flex items-center gap-1">
            <span className="bg-primary w-4 h-4 rounded-full inline-block"></span>
            <span className="text-primary font-semibold text-lg">sylo</span>
          </div>
          <span className="text-sm">By Tremendoc</span>
        </div>

        {/* <div className="hidden md:flex items-center gap-2 text-sm"> */}
          <RightSection />
        {/* </div> */}
      </header>
      <div className="flex flex-1 justify-between gap-8 px-4 md:px-32 overflow-hidden">
        <div className="py-7 lg:col-span-2 flex flex-col gap-8 overflow-y-auto pb-28 md:pb-7">
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

          {/* Your Package */}
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

            <div className="bg-white border border-mid-grey rounded-2xl p-5 flex justify-between items-center gap-8">
              <div>
                <Typography variant={"mediumText"} className="mb-2">
                  Easy Care (Individual)
                </Typography>
                <Typography
                  variant={"smallText"}
                  className="text-charcoal-gray"
                >
                  Lorem Ipsum is simply dummy text of the printing industry.
                </Typography>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold">{convertPrice(7.99)}</p>
                <Typography
                  variant={"smallText"}
                  className="text-charcoal-gray"
                >
                  Perfect for sponsoring one special person
                </Typography>
              </div>
            </div>
          </section>

          <LineThrough />

          <div className="p-5 space-y-3 bg-white rounded-2xl">
            <Typography variant={"largeText"}>
              Beneficiary Information
            </Typography>
            <AddBeneficiaryInformation
              beneficiaries={beneficiaries}
              handleAdd={handleAdd}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              selectedBeneficiary={selectedBeneficiary!}
              setSelectedBeneficiary={setSelectedBeneficiary}
              openAddBeneficiaryInformationModal={
                openAddBeneficiaryInformationModal
              }
              setOpenAddBeneficiaryInformationModal={
                setOpenAddBeneficiaryInformationModal
              }
            />
          </div>

          {beneficiaries.length > 0 && (
            <AddBeneficiaryPopover
              onUseExisting={handleAddExistingBeneficiary}
              onAddNew={handleAddNewBeneficiary}
            />
          )}

          <LineThrough />

          {/* Payment Method */}
          <div className="space-y-4">
            <Typography variant={"xlargeText"}>Payment Method</Typography>

            <AddPaymentMethod
              paymentCardDetails={paymentCardDetails!}
              setPaymentCardDetails={setPaymentCardDetails}
              handleDeleteCardDetails={() => setOpenDeleteCardModal(true)}
            />
          </div>
        </div>

        {/* RIGHT — Sticky Summary */}
        <div className="hidden md:block pb-7 pt-[4.6rem] lg:col-span-1  overflow-y-auto">
          <PaymentSummary
            beneficiaries={beneficiaries}
            paymentCardDetails={paymentCardDetails!}
            handleMakePayment={handleMakePayment}
          />
        </div>
      </div>

      <AddCardModal
        openAddCardDetails={openAddCardDetails}
        setOpenAddCardDetails={setOpenAddCardDetails}
        setPaymentCardDetails={setPaymentCardDetails}
      />
      <DeleteCardModal
        openDeleteCardModal={openDeleteCardModal}
        setOpenDeleteCardModal={setOpenDeleteCardModal}
        handleDelete={() => {
          setPaymentCardDetails(null);
          setOpenDeleteCardModal(false);
        }}
      />
      <DeleteBeneficiaryModal
        selectedBeneficiary={selectedBeneficiary!}
        setSelectedBeneficiary={setSelectedBeneficiary}
        showDeleteBeneficiaryModal={showDeleteBeneficiaryModal}
        setShowDeleteBeneficiaryModal={setShowDeleteBeneficiaryModal}
        handleDelete={() => {
          setBeneficiaries((prev) =>
            prev.filter((item) => item.id !== selectedBeneficiary?.id)
          );
          setSelectedBeneficiary(null);
          setShowDeleteBeneficiaryModal(false);
        }}
      />
      <GetStartedModal
        showGetStartedModal={showGetStartedModal}
        setShowGetStartedModal={setShowGetStartedModal}
        handleContinue={() => {
          setShowGetStartedModal(false);
          setShowSelectPlanDrawer(true);
        }}
      />
      <SelectPlanDrawer
        isOpen={showSelectPlanDrawer}
        setIsOpen={setShowSelectPlanDrawer}
        handleSelectPlan={handleSelectPlan}
      />

      <MobilePaymentSummaryDrawer
        beneficiaries={beneficiaries}
        paymentCardDetails={paymentCardDetails!}
        handleMakePayment={handleMakePayment}
      />
    </div>
  );
};

export default PlanPayment;
