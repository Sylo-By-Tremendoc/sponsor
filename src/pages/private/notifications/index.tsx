import { CustomTable } from "@/components/common/table";
import Typography from "@/components/common/Typography";
import { useSetPagination } from "@/hooks/use-set-pagination";
import { cn } from "@/utils/class-name";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import NotificationDrawer from "./components/NotificationDrawer";
import Container from "@/components/common/Container";
import Icons from "@/components/common/Icons";
import ActionsMenu from "@/components/common/ActionsMenu";
import DeleteNotificationModal from "./components/DeleteNotificationModal";
import useGetAllNotification from "./hooks/use-get-all-notifications";
import NetworkError from "@/pages/error/NetworkError";
import type { TableFilterField } from "@/types/filter";

export type NotificationParams = {
  id: string;
  notification: string;
  time: string;
  isActive: boolean;
};

const Notifications = () => {
  const pagination = useSetPagination();
  const [filters, setFilters] = useState({});

  const { data, isLoading, isFetching, refetch, error } = useGetAllNotification(
    {
      enabled: true,
      page: pagination?.page,
      per_page: pagination?.per_page,
      filters,
    }
  );

  const [selectedNotification, setSelectedNotification] =
    useState<NotificationParams | null>(null);

  const [isOpenNotificationDrawer, setIsOpenNotificationDrawer] =
    useState(false);
  const [openDeleteNotificationModal, setOpenDeleteNotificationModal] =
    useState(false);

  const columns: ColumnDef<NotificationParams>[] = [
    {
      header: "Notification",
      accessorKey: "notification",
      cell: ({ row }) => {
        const { notification, time, isActive } = row.original;
        return (
          <div className="min-w-[20rem] flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              {isActive && (
                <span className="shrink-0 w-2 h-2  bg-primary rounded-full"></span>
              )}
              <Typography
                variant={"smallText"}
                className={cn(
                  "text-gray-800 line-clamp-2",
                  isActive ? "font-semibold" : "font-normal text-gray-600"
                )}
              >
                {notification}
              </Typography>
            </div>

            <Typography
              variant={"xSmallText"}
              className={cn(
                "text-gray-500 px-3 py-1 bg-feint-grey rounded-full",
                isActive && "text-primary bg-light-green"
              )}
            >
              {time}
            </Typography>
          </div>
        );
      },
    },
    {
      header: "Action",
      id: "actions",
      cell: ({ row }: { row: any }) => {
        return (
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
        );
      },
    },
  ];

  const handleTableAction = (
    action: string,
    notification: NotificationParams
  ) => {
    setSelectedNotification(notification);

    if (action === "view") {
      setIsOpenNotificationDrawer(true);
    } else if (action === "delete") {
      setOpenDeleteNotificationModal(true);
    }
  };

  if (error) return <NetworkError onClick={() => refetch()} />;

  return (
    <Container className="space-y-5">
      <Typography variant={"largeTextBold"}>Notifications</Typography>

      <CustomTable
        title={`${data?.meta?.total || 0} ${
          data?.meta?.total || 0 > 1 ? "Notifications" : "Notification"
        }`}
        data={data?.data || []}
        columns={columns}
        isLoading={isLoading || isFetching}
        totalEntries={data?.meta?.total || 0}
        pageSize={pagination.per_page}
        pageNumber={pagination.page || 1}
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
        handlePageChange={pagination.handlePageChange}
        // handlePageSizeChange={pagination.handlePageSizeChange}
        onRowClick={(row) => {
          setIsOpenNotificationDrawer(true);
          setSelectedNotification(row.original);
        }}
        emptyText="No Notifications at the moment."
      />

      <NotificationDrawer
        selectedNotification={selectedNotification!}
        isOpen={isOpenNotificationDrawer}
        setIsOpen={setIsOpenNotificationDrawer}
      />

      <DeleteNotificationModal
        selectedNotification={selectedNotification!}
        openDeleteNotificationModal={openDeleteNotificationModal}
        setOpenDeleteNotificationModal={setOpenDeleteNotificationModal}
        handleDelete={() => {
          setOpenDeleteNotificationModal(false);
        }}
      />
    </Container>
  );
};

export default Notifications;

const tableFilters: TableFilterField[] = [
  {
    type: "select",
    name: "status",
    label: "Status",
    options: [
      { label: "Read", value: "read" },
      { label: "Unread", value: "unread" },
    ],
  },
  {
    type: "date",
    name: "date",
    label: "Date",
  },
];
