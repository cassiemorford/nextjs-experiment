import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ticket } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import { useRouter } from "next/navigation";
import axios from "axios";

interface Props {
  ticket: Ticket;
}

const TicketDetail = ({ ticket }: Props) => {
  return (
    <div className="lg:grid lg:grid-cols-4">
      <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4 min-h-72">
        <CardHeader>
          <div className="flex justify-between mb-3">
            <TicketStatusBadge status={ticket.status} />
            <TicketPriorityBadge priority={ticket.priority} />
          </div>
          <CardTitle>{ticket.title}</CardTitle>
          <CardContent className="prose dark:prose-invert">
            <p className="mb-4">
              Created: {ticket.createdAt.toLocaleDateString()}{" "}
            </p>
            <ReactMarkdown>{ticket.description}</ReactMarkdown>
          </CardContent>
        </CardHeader>
      </Card>
      <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
        <Link
          href={`/tickets/edit/${ticket.id}`}
          className={`mt-8 ${buttonVariants({ variant: "default" })}`}
        >
          Edit
        </Link>
        <DeleteButton ticketId={ticket.id} />
      </div>
    </div>
  );
};

export default TicketDetail;
