import { useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useSetPagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const _page = searchParams.get("page") || 1;
  const _pageSize = searchParams.get("pageSize") || 10;

  const [pageNumber, setPageNumber] = useState(Number(_page));
  const [pageSize, setPageSize] = useState(Number(_pageSize));

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        page: page.toString(),
      });
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    setPageNumber(1);
    setPageSize(pageSize);
    setSearchParams((prevParams) => {
      return new URLSearchParams({
        ...Object.fromEntries(prevParams.entries()),
        pageSize: pageSize.toString(),
        page: "1",
      });
    });
  };

  return { pageNumber, pageSize, handlePageChange, handlePageSizeChange };
};
