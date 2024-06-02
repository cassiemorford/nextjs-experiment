import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { ArrowDown } from "lucide-react";
import { SearchParams } from "./page";
import { Button } from "@/components/ui/button";

interface Props {
  tickets: Ticket[];
  searchParams: SearchParams;
}

const headers = [
  { displayValue: "Title", dbValue: "title" },
  { displayValue: "Status", dbValue: "status" },
  { displayValue: "Priority", dbValue: "priority" },
  { displayValue: "Created At", dbValue: "createdAt" },
];

const DataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead>
                  <Link
                    href={{ query: { ...searchParams, orderBy: h.dbValue } }}
                  >
                    {h.displayValue}
                    {searchParams.orderBy === h.dbValue && (
                      <ArrowDown className="inline p-1" />
                    )}
                  </Link>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets ? (
              tickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <Link href={`/tickets/${t.id}`}>{t.title}</Link>
                  </TableCell>
                  <TableCell>
                    <TicketStatusBadge status={t.status} />
                  </TableCell>
                  <TableCell>
                    <TicketPriorityBadge priority={t.priority} />
                  </TableCell>
                  <TableCell>
                    {t.createdAt.toLocaleDateString("en-US", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p> no tickets loaded</p>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
