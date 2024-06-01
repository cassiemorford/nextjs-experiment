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
import React from "react";

interface Props {
  tickets: Ticket[];
}

const headers = ["Title", "Status", "Priority", "Created At"];

const DataTable = ({ tickets }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((h) => (
                <TableHead>{h}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets ? (
              tickets.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{t.title}</TableCell>
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
