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
import { convertPrice, formatDate } from "@/utils/constant";

import DeleteCardModal from "./components/DeleteCardModal";
import AddCardModal from "./components/AddCardModal";
import GetStartedModal from "@/pages/public/home/GetStartedModal";
import useGetAllSubscriptionPlans from "./hooks/use-get-all-subscription-plans";
import NetworkError from "@/pages/error/NetworkError";
import type { SubscriptionPlan } from "@/types/plans";
import Container from "@/components/common/Container";

const PackagePlans = () => {
  const navigate = useNavigate();
  const pagination = useSetPagination();
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching, refetch, error } =
    useGetAllSubscriptionPlans({
      enabled: true,
      pageNumber: pagination?.pageNumber,
      pageSize: pagination?.pageSize,
      search,
    });

  console.log("data", data);

  const [paymentCardDetails, setPaymentCardDetails] =
    useState<PaymentCardInfo | null>(null);

  const [openAddCardDetails, setOpenAddCardDetails] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false);

  const columns: ColumnDef<SubscriptionPlan>[] = [
    {
      id: "name",
      header: "Plan",
      accessorKey: "name",
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
      id: "created_at",
      header: "Start Date",
      accessorKey: "created_at",
      cell: (info) => {
        const created_at = info.getValue<string>();
        return formatDate(created_at);
      },
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

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Container className="space-y-5">
      <Typography variant="largeTextBold">Package/Plans</Typography>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="flex flex-col justify-between gap-5 p-4 bg-white border border-mid-grey rounded-2xl min-h-[187px]">
          <div className="space-y-1">
            <Typography variant={"mediumTextSemibold"}>
              Subscription Plans
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
        data={data || []}
        columns={columns}
        isLoading={isLoading || isFetching}
        totalEntries={data?.length || 0}
        pageSize={pagination.pageSize}
        pageNumber={pagination.pageNumber || 1}
        onSearch={(search) => setSearch(search)}
        handlePageChange={pagination.handlePageChange}
        // handlePageSizeChange={pagination.handlePageSizeChange}
        onRowClick={(row) => navigate(`/beneficiaries/${row.original?.id}`)}
        emptyText="No subscribed plans at the moment"
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
    </Container>
  );
};

export default PackagePlans;
