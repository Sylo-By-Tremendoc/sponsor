import { cn } from "../../utils/class-name";
import Typography from "./Typography";
import { HiChevronDown, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { usePagination } from "@/hooks/use-pagination";
import { FiMoreHorizontal } from "react-icons/fi";
import useResponsive from "@/hooks/use-responsive";
import ActionButton from "./ActionButton";
import { useEffect, useRef, useState } from "react";
// import ActionButton from "./ActionButton";

interface PaginationProps {
  pageNumber: number;
  pageSize: number;
  totalEntries: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination = ({
  pageSize,
  pageNumber,
  totalEntries,
  onPageChange,
}: PaginationProps) => {
  const { isMobile } = useResponsive();
  const pagination = usePagination({
    page: pageNumber,
    total: totalEntries,
    onChange: onPageChange,
    itemsPerPage: pageSize,
    siblings: isMobile ? 1 : 2,
    boundaries: isMobile ? 1 : 2,
  });

  const totalPages = Math.ceil(totalEntries / pageSize);
  const startIndex = (pageNumber - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + pageSize - 1, totalEntries);

  const handlePrevPage = () => {
    if (pageNumber > 1) {
      onPageChange(pageNumber - 1);
    }
  };

  const handleNextPage = () => {
    if (pageNumber < totalPages) {
      onPageChange(pageNumber + 1);
    }
  };

  const renderEntryInfo = () => {
    if (totalEntries === 0) {
      return "No entries";
    }

    if (startIndex === endIndex && endIndex === totalEntries) {
      return `Showing the last entry of ${totalEntries} entries`;
    }

    return `Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`;
  };

  return (
    <div className="flex justify-between items-center p-4 border-t bg-white">
      <Typography variant="subTextSemibold" className="hidden md:block">
        {renderEntryInfo()}
      </Typography>

      <div className="flex gap-5 justify-end items-center w-full md:justify-auto md:w-auto">
        <div className="flex items-center rounded-lg">
          <button
            disabled={pageNumber === 1}
            className={
              " outline-none bg-transparent border border-mid-grey size-7 flex items-center" +
              " justify-center shrink-0 disabled:cursor-not-allowed disabled:bg-mid-grey/10 disabled:border-opacity-50 rounded"
            }
            onClick={handlePrevPage}
          >
            <HiChevronLeft />
          </button>

          {pagination.range.map((page, index) => {
            if (page === "dots") {
              return (
                <span
                  key={index}
                  className="flex justify-center items-center w-9 h-9"
                >
                  <FiMoreHorizontal className="w-4 h-4" />
                  <span className="sr-only">More pages</span>
                </span>
              );
            }

            return (
              <button
                key={index}
                aria-label={`Go to page ${page}`}
                className={cn(
                  "outline-none border border-mid-grey px-1 min-w-[1.8rem] h-[1.7rem] flex items-center justify-center shrink-0 overflow-hidden font-normal text-sm cursor-pointer",
                  pagination.active === page
                    ? "bg-gradient-to-b from-primary to-secondary text-white opacity-100"
                    : "bg-transparent hover:bg-lightGrey opacity-70"
                )}
                onClick={() => pagination.setPage(page)}
              >
                {page}
              </button>
            );
          })}

          <button
            disabled={pageNumber >= totalPages}
            className={
              " outline-none bg-transparent border border-mid-grey size-7 flex items-center " +
              " justify-center shrink-0 disabled:cursor-not-allowed disabled:bg-mid-grey/10 disabled:border-opacity-50 rounded"
            }
            onClick={handleNextPage}
          >
            <HiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

export const PageSizeSelect: React.FC<{
  pageSize: number;
  className?: string;
  handlePageSizeChange?: (pageSize: number) => void;
}> = ({ pageSize, className = "", handlePageSizeChange }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const pageSizeOptions = [10, 25, 50, 100, 200, 500];

  // close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={popoverRef}
      className={cn("relative inline-block text-left", className)}
    >
      <div onClick={() => setOpen((prev) => !prev)}>
        <ActionButton
          text={`Showing ${pageSize} Entries`}
          rightIcon={
            <HiChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                open && "rotate-180"
              )}
            />
          }
          className="pr-3 pl-4"
        />
      </div>

      {open && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-xl bg-white border shadow-md ring-1 ring-black/5 z-20 animate-in fade-in slide-in-from-top-1">
          {pageSizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => {
                handlePageSizeChange?.(size);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-4 py-2 text-sm flex items-center gap-2 hover:bg-gray-100 rounded-lg transition",
                pageSize === size && "bg-gray-100 text-primary font-semibold"
              )}
            >
              <Typography variant="subText">{size}</Typography>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
