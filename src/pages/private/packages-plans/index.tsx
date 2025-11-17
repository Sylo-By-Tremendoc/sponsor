import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import PaymentCard, { type PaymentCardInfo } from "./components/PaymentCard";
import LineThrough from "@/components/common/LineThrough";
import { CustomTable } from "@/components/common/table";
import { useNavigate } from "react-router-dom";
import { useSetPagination } from "@/hooks/use-set-pagination";
import { useState } from "react";
import { cn } from "@/utils/class-name";
import type { ColumnDef } from "@tanstack/react-table";
import { HiDotsHorizontal, HiOutlinePlus } from "react-icons/hi";
import { convertPrice } from "@/utils/constant";

import DeleteCardModal from "./components/DeleteCardModal";
import AddCardModal from "./components/AddCardModal";
import GetStartedModal from "@/pages/public/home/GetStartedModal";

type SubscriptionPlan = {
  id: string;
  plan: string;
  price: number;
  duration: string;
  startDate: string;
  beneficiaryName: string;
  market: string;
  status: "Active" | "Expired" | "Pending";
};

const PackagePlans = () => {
  const navigate = useNavigate();
  const pagination = useSetPagination();
  const [, setSearch] = useState("");

  const [paymentCardDetails, setPaymentCardDetails] =
    useState<PaymentCardInfo | null>(null);

  const [openAddCardDetails, setOpenAddCardDetails] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false);

  const isLoading = false;

  const data: SubscriptionPlan[] = [
    {
      id: "1",
      plan: "Easy Care (Individual)",
      price: 7.77,
      duration: "6 Months",
      startDate: "16 Aug, 2024 - 10:00AM",
      beneficiaryName: "Peter Omiwole",
      market: "Nigeria",
      status: "Active",
    },
    {
      id: "2",
      plan: "Premium Health Plus",
      price: 12.5,
      duration: "12 Months",
      startDate: "10 Jan, 2025 - 09:30AM",
      beneficiaryName: "Sarah Johnson",
      market: "Ghana",
      status: "Pending",
    },
    {
      id: "3",
      plan: "Family Care Basic",
      price: 9.99,
      duration: "6 Months",
      startDate: "25 Feb, 2025 - 02:00PM",
      beneficiaryName: "David Okeke",
      market: "Nigeria",
      status: "Active",
    },
    {
      id: "4",
      plan: "Corporate Wellness",
      price: 15.2,
      duration: "1 Year",
      startDate: "02 Mar, 2025 - 11:00AM",
      beneficiaryName: "Grace Afolabi",
      market: "Kenya",
      status: "Expired",
    },
    {
      id: "5",
      plan: "Essential Plan",
      price: 5.0,
      duration: "3 Months",
      startDate: "18 Apr, 2025 - 04:30PM",
      beneficiaryName: "John Doe",
      market: "Nigeria",
      status: "Active",
    },
    {
      id: "6",
      plan: "Platinum Coverage",
      price: 20.75,
      duration: "1 Year",
      startDate: "05 May, 2025 - 08:15AM",
      beneficiaryName: "Emily White",
      market: "Ghana",
      status: "Pending",
    },
  ];

  const columns: ColumnDef<SubscriptionPlan>[] = [
    {
      id: "plan",
      header: "Plan",
      accessorKey: "plan",
      cell: (info) => info.getValue(),
    },
    {
      id: "beneficiaryName",
      header: "Beneficiary",
      accessorKey: "beneficiaryName",
      cell: (info) => info.getValue(),
    },
    {
      id: "price",
      header: "Price",
      accessorKey: "price",
      cell: (info) => {
        const price = info.getValue<number>();
        return convertPrice(price);
      },
    },
    {
      id: "duration",
      header: "Duration",
      accessorKey: "duration",
      cell: (info) => info.getValue(),
    },
    {
      id: "startDate",
      header: "Start Date",
      accessorKey: "startDate",
      cell: (info) => info.getValue(),
    },
    {
      id: "market",
      header: "Market",
      accessorKey: "market",
      cell: (info) => info.getValue(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <div
            className={cn(
              "font-medium",
              status === "Active"
                ? "text-green-600"
                : status === "Pending"
                ? "text-amber-500"
                : "text-red-500"
            )}
          >
            {status}
          </div>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: () => (
        <button className="hover:bg-gray-100 rounded-full">
          <HiDotsHorizontal className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <Typography variant="largeTextBold">Package/Plans</Typography>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col justify-between gap-5 p-4 bg-white border border-mid-grey rounded-2xl min-h-[187px]">
          <div className="space-y-1">
            <Typography variant={"mediumTextSemibold"}>
              Subscription Plans Count
            </Typography>
            <Typography variant={"xSmallText"} className="text-charcoal-gray">
              Your Active Subscription Package{" "}
            </Typography>
          </div>

          <div className="flex justify-between items-end gap-5">
            <Typography className="text-[4rem] font-bold leading-none">
              4
            </Typography>
            <Button onClick={() => setShowGetStartedModal(true)}>
              By New Plan
            </Button>
          </div>
        </div>

        {paymentCardDetails ? (
          <PaymentCard
            cardDetails={paymentCardDetails}
            onDelete={() => setOpenDeleteCardModal(true)}
          />
        ) : (
          <div
            className="flex flex-col justify-center items-center gap-1 border border-dashed rounded-lg cursor-pointer"
            style={{
              borderWidth: "2px",
              borderColor: "#ccc",
              borderStyle: "dashed",
            }}
            onClick={() => setOpenAddCardDetails(true)}
          >
            <div className="p-1 bg-primary rounded-full">
              <HiOutlinePlus size={25} className="text-white" />
            </div>
            <Typography
              variant={"smallText"}
              className="font-medium text-charcoal-gray"
            >
              Add Card
            </Typography>
          </div>
        )}
      </div>

      <LineThrough className="py-3" />

      <CustomTable
        data={data}
        columns={columns}
        isLoading={isLoading}
        totalEntries={data?.length}
        pageSize={pagination.pageSize}
        pageNumber={pagination.pageNumber || 1}
        onSearch={(search) => setSearch(search)}
        handlePageChange={pagination.handlePageChange}
        // handlePageSizeChange={pagination.handlePageSizeChange}
        onRowClick={(row) => navigate(`/beneficiaries/${row.original?.id}`)}
      />

      <GetStartedModal
        showGetStartedModal={showGetStartedModal}
        setShowGetStartedModal={setShowGetStartedModal}
        handleContinue={() => navigate("/package-plans/plans")}
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
    </div>
  );
};

export default PackagePlans;
