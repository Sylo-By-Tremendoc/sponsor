import { CustomTable } from "@/components/common/table";
import Typography from "@/components/common/Typography";
import { useSetPagination } from "@/hooks/use-set-pagination";
import { cn } from "@/utils/class-name";
import type { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

type Notification = {
  id: string;
  notification: string;
  time: string;
  isActive: boolean;
};

const Notifications = () => {
  const navigate = useNavigate();
  const pagination = useSetPagination();
  const [, setSearch] = useState("");

  const isLoading = false;

  const data: Notification[] = [
    {
      id: "1",
      notification:
        "A new doctor, Dr. Sarah Johnson, has registered and awaits your approval.",
      time: "21 minutes ago",
      isActive: true,
    },
    {
      id: "2",
      notification:
        "Your payment for ‘Premium Health Plan’ has been successfully processed.",
      time: "2 hours ago",
      isActive: false,
    },
    {
      id: "3",
      notification:
        "Peter Omiwole updated his beneficiary information for Easy Care (Individual).",
      time: "5 hours ago",
      isActive: true,
    },
    {
      id: "4",
      notification:
        "Subscription for ‘Corporate Wellness Plan’ will expire in 3 days.",
      time: "Yesterday",
      isActive: false,
    },
    {
      id: "5",
      notification:
        "New feedback received from Grace Afolabi on your recent workshop.",
      time: "2 days ago",
      isActive: false,
    },
    {
      id: "6",
      notification:
        "System maintenance scheduled for 12th November, 10:00PM – 2:00AM.",
      time: "3 days ago",
      isActive: false,
    },
  ];

  const columns: ColumnDef<Notification>[] = [
    {
      header: "Notification",
      accessorKey: "notification",
      cell: ({ row }) => {
        const { notification, time, isActive } = row.original;
        return (
          <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3 flex-1">
              {isActive && (
                <span className="shrink-0 w-2 h-2  bg-primary rounded-full"></span>
              )}
              <Typography
                variant={"smallText"}
                className={cn(
                  "text-gray-800",
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
      cell: () => (
        <button className="hover:bg-gray-100 rounded-full p-1">
          <HiDotsHorizontal className="w-4 h-4 text-gray-600" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <Typography variant={"largeTextBold"}>Notifications</Typography>

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
    </div>
  );
};

export default Notifications;
