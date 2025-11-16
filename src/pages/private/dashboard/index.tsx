import type { ColumnDef } from "@tanstack/react-table";
import { CustomTable } from "../../../components/common/table";
import { cn } from "../../../utils/class-name";
import { HiDotsHorizontal } from "react-icons/hi";
import { useState } from "react";
import { useSetPagination } from "@/hooks/use-set-pagination";
import { useNavigate } from "react-router-dom";
import LineThrough from "@/components/common/LineThrough";
import DashboardCard from "./DashboardCard";
import Typography from "@/components/common/Typography";

type Beneficiary = {
  id: string;
  name: string;
  avatarUrl?: string;
  relationship: string;
  dateAdded: string;
  packageName: string;
  packageDuration: string;
  status: "Active" | "Inactive";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const pagination = useSetPagination();
  const [, setSearch] = useState("");

   const isLoading = false;

 const data: Beneficiary[] = [
    {
      id: "1",
      name: "Lina Kabenski",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      relationship: "Brother",
      dateAdded: "16 Aug, 2024 - 10:00AM",
      packageName: "Easy Care (Individual)",
      packageDuration: "1 Month",
      status: "Active",
    },
    {
      id: "2",
      name: "Gregory Henry",
      relationship: "Child",
      dateAdded: "16 Aug, 2024 - 10:00AM",
      packageName: "Easy Care (Individual)",
      packageDuration: "1 Month",
      status: "Inactive",
    },

    {
      id: "1",
      name: "Lina Kabenski",
      avatarUrl: "https://randomuser.me/api/portraits/men/2.jpg",
      relationship: "Brother",
      dateAdded: "16 Aug, 2024 - 10:00AM",
      packageName: "Easy Care (Individual)",
      packageDuration: "1 Month",
      status: "Active",
    },
    {
      id: "2",
      name: "Gregory Henry",
      relationship: "Child",
      dateAdded: "16 Aug, 2024 - 10:00AM",
      packageName: "Easy Care (Individual)",
      packageDuration: "1 Month",
      status: "Inactive",
    },
  ];

  const analytics = [
    {
      title: "Total Beneficiary",
      icon: {
        name: "users",
        color: "#DCFFDD",
      },
      count: 4,
    },
    {
      title: "Total Package",
      icon: {
        name: "users",
        color: "#DDEBFF",
      },
      count: 4,
    },
  ];


  const columns: ColumnDef<Beneficiary>[] = [
    {
      header: "Beneficial",
      accessorKey: "name",
      cell: ({ row }) => {
        const { avatarUrl, name } = row.original;
        return (
          <div className="flex items-center gap-2">
            <div className="relative w-[30px] h-[30px] rounded-full overflow-hidden bg-gray-200">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-300" />
              )}
            </div>
            {name}
          </div>
        );
      },
    },
    {
      header: "Relationship",
      accessorKey: "relationship",
      cell: (info) => info.getValue(),
    },
    {
      header: "Date Added",
      accessorKey: "dateAdded",
      cell: (info) => info.getValue(),
    },
    {
      header: "Package Name",
      accessorKey: "packageName",
      cell: (info) => info.getValue(),
    },
    {
      header: "Package Duration",
      accessorKey: "packageDuration",
      cell: (info) => info.getValue(),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        const isActive = status.toLowerCase() === "active";
        return (
          <div
            className={cn(
              "font-medium",
              isActive ? "text-green-600" : "text-red-500"
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
      <div>
        <Typography variant={"largeTextBold"}>Hi, Peter Omiwole</Typography>
        <Typography variant={"smallText"} className="text-charcoal-gray pt-1">
          Check the latest update on your account
        </Typography>
      </div>

      <div className="grid md:grid-cols-3 items-center gap-5">
        <div className="hidden md:flex md:col-span-2 border bg-black h-full rounded-2xl"></div>

        <div className="flex flex-col gap-5">
          {analytics?.map((item, index) => (
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

export default Dashboard;
