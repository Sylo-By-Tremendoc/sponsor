import { useState } from "react";
import { useSearchParams } from "react-router-dom";

type UseSetPaginationProps = {
  defaultPage?: number;
  defaultPerPage?: number;
};

export const useSetPagination = ({
  defaultPage = 1,
  defaultPerPage = 10,
}: UseSetPaginationProps = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageFromUrl = Number(searchParams.get("page"));
  const perPageFromUrl = Number(searchParams.get("per_page"));

  const [page, setPage] = useState(
    Number.isFinite(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : defaultPage,
  );

  const [pageSize, setPageSize] = useState(
    Number.isFinite(perPageFromUrl) && perPageFromUrl > 0
      ? perPageFromUrl
      : defaultPerPage,
  );

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", nextPage.toString());
      return params;
    });
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPage(1);
    setPageSize(nextPageSize);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("per_page", nextPageSize.toString());
      params.set("page", "1");
      return params;
    });
  };

  return {
    page,
    per_page: pageSize,
    handlePageChange,
    handlePageSizeChange,
  };
};
