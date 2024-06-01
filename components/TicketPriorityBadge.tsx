import React from "react";
import { Badge } from "./ui/badge";
import { Priority } from "@prisma/client";
import { Flame } from "lucide-react";

interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  [Priority.HIGH]: { label: "High", level: 1 },
  [Priority.MEDIUM]: { label: "Medium", level: 2 },
  [Priority.LOW]: { label: "Low", level: 3 },
};

const TicketPriorityBadge = ({ priority }: Props) => {
  const level = priorityMap[priority].level;
  return (
    <div className="flex justify-center">
      <Flame className={`${level >= 1 ? "text-red-500" : "text-red-200"}`} />
      <Flame className={`${level >= 2 ? "text-red-500" : "text-red-200"}`} />
      <Flame className={`${level >= 3 ? "text-red-500" : "text-red-200"}`} />
    </div>
  );
};

export default TicketPriorityBadge;
