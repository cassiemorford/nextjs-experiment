import prisma from "@/prisma/db";
import DataTable from "./DataTable";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { Status, Ticket } from "@prisma/client";

export interface SearchParams {
  page: string;
  status: Status;
  orderBy: keyof Ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 10;
  const page = parseInt(searchParams.page) || 1;
  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";
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
    orderBy: { [orderBy]: "asc" },
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
      <DataTable tickets={tickets} searchParams={searchParams} />
      <Pagination
        currentPage={page}
        itemCount={ticketCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Tickets;
