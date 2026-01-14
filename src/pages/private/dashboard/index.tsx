import type { ColumnDef } from "@tanstack/react-table";
import { CustomTable } from "../../../components/common/table";
import { cn } from "../../../utils/class-name";
import { useMemo, useState } from "react";
import { useSetPagination } from "@/hooks/use-set-pagination";
import LineThrough from "@/components/common/LineThrough";
import { DashboardCard, DashboardCardLoader } from "./components/DashboardCard";
import Typography from "@/components/common/Typography";
import useAuth from "@/hooks/use-auth";
import NetworkError from "@/pages/error/NetworkError";
import Container from "@/components/common/Container";
import type { TableFilterField } from "@/types/filter";
import type { SubscriptionPlan } from "@/types/plans";
import { convertPrice, formatDate } from "@/utils/constant";
import { useCurrencyStore } from "@/store/currency-store";
import useGetAllSubscriptionPlans from "../packages-plans/hooks/use-get-all-subscription-plans";
import ActionsMenu from "@/components/common/ActionsMenu";
import Icons from "@/components/common/Icons";
import ViewSubscriptionDetailsModal from "../packages-plans/components/ViewSubscriptionDetailsModal";
import DeleteSubscriptionModal from "../packages-plans/components/DeleteSubscriptionModal";
import { DashboardCarousel } from "./components/DashboardCarousel";

const Dashboard = () => {
  const { authUser } = useAuth();
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

  const [
    openViewSubscriptionDetailsModal,
    setOpenViewSubscriptionDetailsModal,
  ] = useState(false);
  const [openDeleteSubscriptionModal, setOpenDeleteSubscriptionModal] =
    useState(false);

  const analytics = useMemo(
    () => [
      {
        title: "Total Beneficiary",
        icon: {
          name: "users",
          color: "#DCFFDD",
        },
        count: data?.meta?.total ?? 0,
      },
      {
        title: "Total Package",
        icon: {
          name: "users",
          color: "#DDEBFF",
        },
        count: data?.meta?.total ?? 0,
      },
    ],
    [data?.meta?.total]
  );

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
            // {
            //   icon: <Icons iconName="delete" />,
            //   title: "Delete",
            //   action: "delete",
            //   danger: true,
            // },
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
    <Container className="space-y-5">
      <div>
        <Typography variant={"largeTextBold"}>
          Hi, {authUser?.user?.first_name} {authUser?.user?.last_name}
        </Typography>
        <Typography variant={"smallText"} className="text-charcoal-gray pt-1">
          Check the latest update on your account
        </Typography>
      </div>

      <div className="grid md:grid-cols-3 items-center gap-5">
        <div className="hidden md:flex md:col-span-2 h-full">
          <DashboardCarousel />
        </div>
        <div className="flex flex-col gap-5">
          {isLoading || isFetching
            ? Array.from({ length: 2 }).map((_, index) => (
                <DashboardCardLoader key={index} />
              ))
            : analytics?.map((item, index) => (
                <DashboardCard
                  key={index}
                  title={item?.title}
                  icon={item?.icon}
                  count={item?.count}
                />
              ))}
        </div>
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
    </Container>
  );
};

export default Dashboard;

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
