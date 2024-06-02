"use client";

import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    router.refresh();
  };

  return (
    <>
      <div>
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => {
            changePage(1);
          }}
        >
          {<ChevronFirst />}
        </Button>
        <Button
          variant="outline"
          disabled={currentPage <= 1}
          onClick={() => {
            changePage(currentPage - 1);
          }}
        >
          {<ChevronLeft />}
        </Button>
        <Button
          variant="outline"
          disabled={pageCount === currentPage}
          onClick={() => {
            changePage(currentPage + 1);
          }}
        >
          <ChevronRight />
        </Button>
        <Button
          variant="outline"
          disabled={pageCount === currentPage}
          onClick={() => {
            changePage(pageCount);
          }}
        >
          <ChevronLast />
        </Button>
      </div>
      <p>
        Page {currentPage} of {pageCount}
      </p>
    </>
  );
};

export default Pagination;
