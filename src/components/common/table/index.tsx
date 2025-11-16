import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type Row,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./component";
import { useMemo } from "react";
import CheckBoxInput from "../CheckBoxInput";
import { cn } from "../../../utils/class-name";
import Typography from "../Typography";
import SkeletonLoader from "../SkeletonLoader";
import Icons from "../Icons";
import If from "../If";
import Pagination from "../Pagination";
import TextInput from "../TextInput";
import { useDebouncedCallback } from "use-debounce";

interface CustomTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageSize?: number;
  pageNumber?: number;
  totalEntries: number;
  isLoading?: boolean;
  enableRowSelection?: boolean;
  className?: string;
  searchPlaceholder?: string;
  onSearch?: (searchText: string) => void;
  handlePageChange: (page: number) => void;
  onRowClick?: (row: Row<TData>) => void;
}

export function CustomTable<TData, TValue>({
  columns,
  data,
  onSearch,
  totalEntries,
  pageSize = 10,
  pageNumber = 1,
  isLoading = false,
  enableRowSelection = true,
  searchPlaceholder,
  className,
  onRowClick,
  handlePageChange,
}: CustomTableProps<TData, TValue>) {
  const conditionalRowProps = (row: Row<TData>) => {
    return {
      onClick: () => {
        if (onRowClick) {
          onRowClick(row);
        }
      },
    };
  };

  const tableColumns = useMemo(() => {
    const columnArr: ColumnDef<TData, TValue>[] = [
      ...(enableRowSelection
        ? [
            {
              id: "row-select",
              header: ({ table }: { table: any }) => (
                <CheckBoxInput
                  variant="secondary"
                  checked={table.getIsAllPageRowsSelected()}
                  onChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                  width="1.2rem"
                  height="1.2rem"
                  aria-label="Select all"
                  className="border-mid-grey"
                />
              ),
              cell: ({ row }: { row: Row<TData> }) => (
                <div onClick={(e) => e.stopPropagation()}>
                  <CheckBoxInput
                    variant="secondary"
                    checked={row.getIsSelected()}
                    onChange={(value) => row.toggleSelected(!!value)}
                    width="1.2rem"
                    height="1.2rem"
                    aria-label="Select row"
                    className="border-mid-grey"
                  />
                </div>
              ),
              enableSorting: false,
              enableHiding: false,
              size: 50,
            },
          ]
        : []),
      ...columns.map((column, index) => ({
        maxSize: 800,
        size: column.id === "actions" ? 40 : undefined,
        id: index.toString(),
        ...column,
      })),
    ];

    return columnArr;
  }, [columns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: tableColumns,

    //  onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: totalEntries,
    debugHeaders: false,
    debugColumns: false,
    columnResizeMode: "onChange",
    enableColumnResizing: true,
  });

  const handleSearch = useDebouncedCallback((searchText: string) => {
    onSearch?.(searchText);
  }, 500);

  return (
    <div className={cn("relative w-full overflow-auto space-y-2", className)}>
      <div className="mb-3 flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
        {onSearch && (
          <div className="w-full md:w-[203px]">
            <TextInput
              height="35px"
              placeholder={searchPlaceholder || "Search..."}
              type="search"
              name="search"
              searchIconSize={16}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-white"
            />
          </div>
        )}

        <div className="flex items-center gap-2">
          <Typography
            variant={"smallTextBold"}
            className="font-medium text-charcoal-gray"
          >
            Filter By:
          </Typography>
          <select className="border rounded-md px-2 py-1 text-sm">
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="border border-mid-grey rounded-[15px] overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="group sticky top-0 z-30 rounded bg-gray-50 border-b border-mid-grey"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "relative group whitespace-nowrap bg-gray-50",
                        header.column.id === "row-select" ? "w-10" : "",
                        header.column.id === "actions" &&
                          "flex justify-center items-center"
                      )}
                    >
                      <div className="whitespace-nowrap">
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center gap-3">
                            <Typography
                              variant="subTextSemibold"
                              className="cursor-pointer uppercase text-[#4B4B4B]"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </Typography>

                            {/* Sorting icons */}
                            {header.column.columnDef.enableSorting && (
                              <div
                                className="cursor-pointer"
                                onClick={header.column.getToggleSortingHandler()}
                              >
                                <Icons
                                  iconName="arrowUpFill"
                                  fill={
                                    header.column.getIsSorted() === "asc"
                                      ? "green"
                                      : "gray"
                                  }
                                  className="h-2 w-2"
                                />
                                <Icons
                                  iconName="arrowDownFill"
                                  fill={
                                    header.column.getIsSorted() === "desc"
                                      ? "green"
                                      : "gray"
                                  }
                                  className="h-2 w-2"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {header.column.id !== "row-select" &&
                        header.column.id !== "actions" && (
                          <div
                            onDoubleClick={() => header.column.resetSize()}
                            onMouseDown={header.getResizeHandler()}
                            onTouchStart={header.getResizeHandler()}
                            className={cn(
                              "group/resize flex flex-row absolute w-2.5 h-[1.2rem] top-[14.5px] items-center justify-center cursor-col-resize bottom-2.5 right-0 touch-none select-none"
                            )}
                          >
                            <div
                              className={cn(
                                "cursor-col-resize rounded-lg w-px h-full group-hover/resize:w-2.5 group-hover/resize:h-full",
                                !header.column.getIsResizing() &&
                                  "bg-[#D9D9D9]",
                                header.column.getIsResizing() &&
                                  "bg-primary w-2.5 h-[70%]"
                              )}
                            />
                          </div>
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {!isLoading && (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel()?.rows?.map((row) => (
                    <TableRow
                      key={row?.id}
                      data-state={row?.getIsSelected() && "selected"}
                      {...conditionalRowProps(row)}
                      className={cn(
                        "group border-b border-mid-grey hover:bg-feint-grey data-[state=selected]:bg-feint-grey"
                      )}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const isActionsColumn = cell.column.id === "actions";
                        return (
                          <TableCell
                            key={cell.id}
                            className={cn(
                              "py-4",
                              onRowClick && "cursor-pointer"
                            )}
                            onClick={
                              isActionsColumn
                                ? (e) => e.stopPropagation()
                                : undefined
                            }
                          >
                            <Typography
                              variant="smallText"
                              className={cn(
                                "py-2 line-clamp-3",
                                !["actions", "row-select"].includes(
                                  cell.column.id
                                ) && "",
                                isActionsColumn && "flex justify-center"
                              )}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Typography>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={tableColumns.length}
                      className="h-24 text-center"
                    >
                      <Typography variant="xSmallText">No results.</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}

            {/* Skeleton Loaders */}
            {isLoading &&
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {tableColumns.map((_, colIndex) => (
                    <TableCell className="py-4" key={colIndex}>
                      <SkeletonLoader className="h-4 rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <If condition={totalEntries > 0}>
        <Pagination
          totalEntries={totalEntries}
          pageSize={pageSize}
          pageNumber={pageNumber}
          onPageChange={handlePageChange}
        />
      </If>
    </div>
  );
}
