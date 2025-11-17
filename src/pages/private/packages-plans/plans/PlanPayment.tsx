import { Button } from "@/components/common/Button";
import LineThrough from "@/components/common/LineThrough";
import Pill from "@/components/common/Pill";
import Typography from "@/components/common/Typography";
import RightSection from "@/components/navbar/RightSection";
import { TitleText } from "@/pages/public/home/components";
import { convertPrice } from "@/utils/constant";
import { HiArrowLeft } from "react-icons/hi";
import PaymentMethod from "./component/PaymentMethod";
import TextInput from "@/components/common/TextInput";
import AddBeneficiaryInformation from "./component/AddBeneficiaryInformation";
import { useState } from "react";
import type { BeneficiaryInfo } from "./component/BeneficiaryInformationCard";
import DeleteBeneficiaryModal from "./component/DeleteBeneficiaryModal";
import AddBeneficiaryInformationModal from "./component/AddBeneficiaryInformationModal";
import AddCardModal from "../components/AddCardModal";
import DeleteCardModal from "../components/DeleteCardModal";
import type { PaymentCardInfo } from "../components/PaymentCard";
import { useNavigate } from "react-router-dom";

const PlanPayment = () => {
  const navigate = useNavigate();
  const [beneficiaries, setBeneficiaries] = useState<BeneficiaryInfo[]>([]);
  const [paymentCardDetails, setPaymentCardDetails] =
    useState<PaymentCardInfo | null>(null);

  const [selectedBeneficiary, setSelectedBeneficiary] =
    useState<BeneficiaryInfo | null>(null);

  const [openAddCardDetails, setOpenAddCardDetails] = useState(false);
  const [
    openAddBeneficiaryInformationModal,
    setOpenAddBeneficiaryInformationModal,
  ] = useState(false);
  const [showDeleteBeneficiaryModal, setShowDeleteBeneficiaryModal] =
    useState(false);
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false);

  const handleAdd = (newBeneficiary: BeneficiaryInfo) => {
    setBeneficiaries((prev) => {
      // If we are editing an existing beneficiary
      if (selectedBeneficiary) {
        return prev.map((item) =>
          item.id === selectedBeneficiary.id ? newBeneficiary : item
        );
      }

      // Otherwise, we are adding a new one
      return [...prev, newBeneficiary];
    });

    // Clear selected beneficiary after update
    setSelectedBeneficiary(null);
  };

  return (
    <div className="flex flex-col bg-[#F7F7F7] h-screen overflow-hidden">
      <header className="px-4 md:px-20 py-5 shadow-xs flex justify-between items-center bg-[#F7F7F7]">
        <div className="flex items-center space-x-2">
          <div className="flex items-center gap-1">
            <span className="bg-primary w-4 h-4 rounded-full inline-block"></span>
            <span className="text-primary font-semibold text-lg">sylo</span>
          </div>
          <span className="text-sm">By Tremendoc</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-sm">
          <RightSection />
        </div>
      </header>

      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-7 px-4 md:px-32 overflow-y-hidden bg-danger"> */}
      <div className="flex flex-1 justify-between gap-8 px-4 md:px-32 overflow-hidden">
        <div className="py-7 lg:col-span-2 flex flex-col gap-8 overflow-y-auto">
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
                onClick={() => navigate("/package-plans/plans")}
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

          {/* Add Beneficiary */}
          <AddBeneficiaryInformation
            beneficiaries={beneficiaries}
            onClick={(beneficiary) => {
              setSelectedBeneficiary(beneficiary);
              setOpenAddBeneficiaryInformationModal(true);
            }}
            handleAdd={() => setOpenAddBeneficiaryInformationModal(true)}
            handleDelete={(beneficiary) => {
              setSelectedBeneficiary(beneficiary);
              setShowDeleteBeneficiaryModal(true);
            }}
          />

          <LineThrough />

          {/* Payment Method */}
          <PaymentMethod
            paymentCardDetails={paymentCardDetails!}
            handleAddCardDetails={() => setOpenAddCardDetails(true)}
            handleDeleteCardDetails={() => setOpenDeleteCardModal(true)}
          />
        </div>

        {/* RIGHT — Sticky Summary */}
        <div className="pb-7 pt-19 lg:col-span-1  overflow-y-auto">
          <div className="flex flex-col bg-white border border-mid-grey py-5 px-1 rounded-2xl shadow-md space-y-4">
            <Typography variant={"largeText"} className="px-3">
              Payment Summary
            </Typography>

            <LineThrough />

            <div className="flex-1 overflow-auto px-3 pt-1">
              <div className="border border-dashed border-primary bg-light-green p-4 rounded-xl space-y-2">
                <Typography variant={"mediumText"}>
                  Easy Care (Individual)
                </Typography>
                <Typography
                  variant={"smallText"}
                  className="text-charcoal-gray"
                >
                  Lorem Ipsum is simply dummy text of the printing industry.
                </Typography>
              </div>

              <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

              <div className="space-y-2.5 mb-6">
                <Typography variant={"mediumText"}>
                  Payment Breakdown
                </Typography>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <Typography variant={"smallText"}>Package × 1</Typography>
                    <Typography variant={"smallText"}>
                      {convertPrice(7.99)}
                    </Typography>
                  </div>

                  <div className="flex justify-between">
                    <Typography variant={"smallText"}>
                      Taxes and Surcharges
                    </Typography>
                    <Typography variant={"smallText"}>
                      {convertPrice(1.0)}
                    </Typography>
                  </div>
                </div>
              </div>

              <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

              <div className="flex justify-between items-end gap-3">
                <div className="space-y-2 flex-1">
                  <Typography
                    variant={"xxSmallText"}
                    className="text-charcoal-gray"
                  >
                    Enter promo code or gift card number
                  </Typography>
                  <TextInput placeholder="Promo code or gift card" />
                </div>
                <button className="text-xs text-primary border border-primary h-full py-2.5 px-3 rounded-xl shrink-0">
                  Apply
                </button>
              </div>

              <div className="my-4 w-full border border-dashed border-mid-grey contain-none"></div>

              <div className="flex justify-between items-center gap-3 mb-6">
                <Typography variant={"largeText"}>Trip Total</Typography>
                <Typography variant={"largeText"}>
                  {convertPrice(8.99)}
                </Typography>
              </div>

              <Button
                className="w-full"
                disabled={
                  beneficiaries.length === 0 || paymentCardDetails === null
                }
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      <AddBeneficiaryInformationModal
        selectedBeneficiary={selectedBeneficiary!}
        openAddBeneficiaryInformationModal={openAddBeneficiaryInformationModal}
        setOpenAddBeneficiaryInformationModal={
          setOpenAddBeneficiaryInformationModal
        }
        handleAdd={handleAdd}
      />

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
        showDeleteBeneficiaryModal={showDeleteBeneficiaryModal}
        setShowDeleteBeneficiaryModal={setShowDeleteBeneficiaryModal}
        handleDelete={() => {
          setBeneficiaries((prev) =>
            prev.filter((item) => item.id !== selectedBeneficiary?.id)
          );
          setShowDeleteBeneficiaryModal(false);
        }}
      />
    </div>
  );
};

export default PlanPayment;
