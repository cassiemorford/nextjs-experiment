import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status } from "@prisma/client";

interface SearchParams {
  page: string;
  status: Status;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  let where = {};

  const statuses = Object.values(Status);

  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  if (status) {
    where = {
      status,
    };
  } else {
    where = {
      NOT: [{ status: Status.CLOSED }],
    };
  }
  const ticketCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: pageSize * (page - 1),
  });

  return (
    <div>
      <div className="flex justify-between gap-4">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          New
        </Link>
        <StatusFilter />
      </div>
      <DataTable tickets={tickets} />
      <Pagination
        currentPage={page}
        itemCount={ticketCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Tickets;
