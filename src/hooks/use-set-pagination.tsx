import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSetPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const _page = searchParams.get("page") || 1;
  const _per_page = searchParams.get("per_page") || 10;

  const [page, setPage] = useState(Number(_page));
  const [pageSize, setPageSize] = useState(Number(_per_page));

  const handlePageChange = (page: number) => {
    setPage(page);
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        page: page.toString(),
      });
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPage(1);
    setPageSize(pageSize);
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        per_page: pageSize.toString(),
        page: "1",
      });
    });
  };

  return { page, per_page: pageSize, handlePageChange, handlePageSizeChange };
};
