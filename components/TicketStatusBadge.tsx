import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
  [Status.OPEN]: { label: "Open", color: "bg-red-400" },
  [Status.STARTED]: { label: "Started", color: "bg-blue-400" },
  [Status.CLOSED]: { label: "Closed", color: "bg-green-400" },
};

const TicketStatusBadge = ({ status }: Props) => {
  return (
    <div>
      <Badge className={statusMap[status].color}>
        {statusMap[status].label}
      </Badge>
    </div>
  );
};

export default TicketStatusBadge;
