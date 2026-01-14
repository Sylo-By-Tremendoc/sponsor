import Typography from "@/components/common/Typography";
import PaymentCard, { type PaymentCardInfo } from "./components/PaymentCard";
import LineThrough from "@/components/common/LineThrough";
import { CustomTable } from "@/components/common/table";
import { useNavigate } from "react-router-dom";
import { useSetPagination } from "@/hooks/use-set-pagination";
import { useState } from "react";
import { cn } from "@/utils/class-name";
import type { ColumnDef } from "@tanstack/react-table";
import { HiOutlinePlus } from "react-icons/hi";
import { convertPrice, formatDate } from "@/utils/constant";

import DeleteCardModal from "./components/DeleteCardModal";
import AddCardModal from "./components/AddCardModal";
import GetStartedModal from "@/pages/public/home/GetStartedModal";
import useGetAllSubscriptionPlans from "./hooks/use-get-all-subscription-plans";
import NetworkError from "@/pages/error/NetworkError";
import type { SubscriptionPlan } from "@/types/plans";
import Container from "@/components/common/Container";
import type { TableFilterField } from "@/types/filter";
import { useCurrencyStore } from "@/store/currency-store";
import {
  SubscriptionSummaryCard,
  SubscriptionSummaryCardLoader,
} from "./components/SubscriptionSummaryCard";
import ViewSubscriptionDetailsModal from "./components/ViewSubscriptionDetailsModal";
import Icons from "@/components/common/Icons";
import ActionsMenu from "@/components/common/ActionsMenu";
import DeleteSubscriptionModal from "./components/DeleteSubscriptionModal";

const PackagePlans = () => {
  const navigate = useNavigate();
  const pagination = useSetPagination();
  const [filters, setFilters] = useState({});

  const currency = useCurrencyStore((state) => state?.currency);

  const { data, isLoading, isFetching, refetch, error } =
    useGetAllSubscriptionPlans({
      enabled: true,
      page: pagination?.page,
      per_page: pagination?.per_page,
      filters,
    });

  const [selectedSubscription, setSelectedSubscription] =
    useState<SubscriptionPlan | null>(null);

  const [paymentCardDetails, setPaymentCardDetails] =
    useState<PaymentCardInfo | null>(null);

  const [openAddCardDetails, setOpenAddCardDetails] = useState(false);
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [openDeleteCardModal, setOpenDeleteCardModal] = useState(false);
  const [
    openViewSubscriptionDetailsModal,
    setOpenViewSubscriptionDetailsModal,
  ] = useState(false);
  const [openDeleteSubscriptionModal, setOpenDeleteSubscriptionModal] =
    useState(false);

  const columns: ColumnDef<SubscriptionPlan>[] = [
    {
      header: "Plan",
      accessorFn: (row) => row.plan.name,
      cell: ({ getValue }) => (
        <span className="font-medium">{getValue<string>()}</span>
      ),
    },

    {
      header: "Beneficiary",
      accessorFn: (row) =>
        `${row.beneficiary.first_name} ${row.beneficiary.last_name}`,
      cell: ({ getValue }) => (
        <span className="truncate">{getValue<string>()}</span>
      ),
    },

    {
      header: "Price",
      accessorFn: (row) => row.price,
      cell: ({ row }) => convertPrice(Number(row.original.price), currency),
    },

    {
      header: "Billing",
      accessorKey: "billing_interval",
      cell: ({ getValue }) => (
        <span className="capitalize">{getValue<string>()}</span>
      ),
    },

    {
      header: "Start Date",
      accessorKey: "starts_at",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },

    {
      header: "End Date",
      accessorKey: "ends_at",
      cell: ({ getValue }) => formatDate(getValue<string>()),
    },

    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue<string>();

        return (
          <span
            className={cn(
              "font-medium capitalize",
              status === "active" && "text-green-600",
              status === "pending" && "text-amber-500",
              status === "canceled" && "text-red-500"
            )}
          >
            {status}
          </span>
        );
      },
    },

    {
      header: "Action",
      id: "actions",
      cell: ({ row }) => (
        <ActionsMenu
          items={[
            {
              icon: <Icons iconName="view" />,
              title: "View",
              action: "view",
            },
            {
              icon: <Icons iconName="delete" />,
              title: "Delete",
              action: "delete",
              danger: true,
            },
          ]}
          onSelect={(action) => {
            handleTableAction(action, row.original);
          }}
        />
      ),
    },
  ];

  const handleTableAction = (
    action: string,
    subscription: SubscriptionPlan
  ) => {
    setSelectedSubscription(subscription);

    if (action === "view") {
      setOpenViewSubscriptionDetailsModal(true);
    } else if (action === "delete") {
      setOpenDeleteSubscriptionModal(true);
    }
  };

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Container className="space-y-4">
      <Typography variant="largeTextBold">Plans</Typography>

      <div className="grid md:grid-cols-2 gap-5">
        {isLoading || isFetching ? (
          <SubscriptionSummaryCardLoader />
        ) : (
          <SubscriptionSummaryCard
            total={data?.meta?.total || 0}
            onActionClick={() => setShowGetStartedModal(true)}
          />
        )}

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
        title={"Subscriptions"}
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading || isFetching}
        totalEntries={data?.meta?.total || 0}
        pageSize={pagination.per_page}
        pageNumber={pagination.page || 1}
        handlePageChange={pagination.handlePageChange}
        filterProps={{
          filters: tableFilters,
          onApply: (values) => {
            setFilters(values);
            pagination.handlePageChange(1);
          },
          onReset: () => {
            setFilters({});
            pagination.handlePageChange(1);
          },
        }}
        onRowClick={(row) => {
          setSelectedSubscription(row?.original);
          setOpenViewSubscriptionDetailsModal(true);
        }}
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

      {selectedSubscription && (
        <ViewSubscriptionDetailsModal
          details={selectedSubscription}
          openViewSubscriptionDetailsModal={openViewSubscriptionDetailsModal}
          setOpenViewSubscriptionDetailsModal={
            setOpenViewSubscriptionDetailsModal
          }
        />
      )}

      {selectedSubscription && (
        <DeleteSubscriptionModal
          selectedSubscription={selectedSubscription}
          openDeleteSubscriptionModal={openDeleteSubscriptionModal}
          setOpenDeleteSubscriptionModal={setOpenDeleteSubscriptionModal}
          handleDelete={() => {
            refetch();
            setOpenDeleteSubscriptionModal(false);
          }}
        />
      )}

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

const tableFilters: TableFilterField[] = [
  {
    type: "text",
    name: "name",
    label: "Name",
  },
  {
    type: "text",
    name: "email",
    label: "Email",
  },
];
