import { useMemo, useState } from "react";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

export const DOTS = "dots";

export interface PaginationParams {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: number;

  /** Controlled active page number */
  page?: number;

  /** Total amount of items */
  total: number;

  /** Number of items per page, defaults to 10 */
  itemsPerPage?: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;
}

export function usePagination({
  total,
  itemsPerPage = 10,
  siblings = 1,
  boundaries = 1,
  page,
  initialPage = 1,
  onChange,
}: PaginationParams) {
  const _totalPages = Math.max(Math.trunc(Math.ceil(total / itemsPerPage)), 0);
  const [activePage, setActivePage] = useState(page || initialPage);

  if (page !== undefined && page !== activePage) {
    setActivePage(page);
  }

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
    onChange?.(pageNumber);
  };

  const setPage = (pageNumber: number) => {
    if (pageNumber <= 0) {
      handlePageChange(1);
    } else if (pageNumber > _totalPages) {
      handlePageChange(_totalPages);
    } else {
      handlePageChange(pageNumber);
    }
  };

  const next = () => setPage(activePage + 1);
  const previous = () => setPage(activePage - 1);
  const first = () => setPage(1);
  const last = () => setPage(_totalPages);

  const paginationRange = useMemo((): (number | "dots")[] => {
    const totalPageNumbers = siblings * 2 + 3 + boundaries * 2;
    if (totalPageNumbers >= _totalPages) {
      return range(1, _totalPages);
    }

    const leftSiblingIndex = Math.max(activePage - siblings, boundaries);
    const rightSiblingIndex = Math.min(
      activePage + siblings,
      _totalPages - boundaries
    );

    const shouldShowLeftDots = leftSiblingIndex > boundaries + 2;
    const shouldShowRightDots =
      rightSiblingIndex < _totalPages - (boundaries + 1);

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = siblings * 2 + boundaries + 2;
      return [
        ...range(1, leftItemCount),
        DOTS,
        ...range(_totalPages - (boundaries - 1), _totalPages),
      ];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = boundaries + 1 + 2 * siblings;
      return [
        ...range(1, boundaries),
        DOTS,
        ...range(_totalPages - rightItemCount, _totalPages),
      ];
    }

    return [
      ...range(1, boundaries),
      DOTS,
      ...range(leftSiblingIndex, rightSiblingIndex),
      DOTS,
      ...range(_totalPages - boundaries + 1, _totalPages),
    ];
  }, [_totalPages, siblings, activePage]);

  return {
    range: paginationRange,
    active: activePage,
    setPage,
    next,
    previous,
    first,
    last,
  };
}
