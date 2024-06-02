"use client";

import { Status } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const statuses: { label: string; value?: string }[] = [
  { label: "Open / Started" },
  { label: "Open", value: Status.OPEN },
  { label: "Started", value: Status.STARTED },
  { label: "Closed", value: Status.CLOSED },
];

const StatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select
      defaultValue={searchParams.get("status") || ""}
      onValueChange={(status: string) => {
        const params = new URLSearchParams();
        if (status) params.append("status", status);
        const query = params.size ? `?${params.toString()}` : ``;
        router.push(`/tickets/${query}`);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {statuses.map((s) => (
            <SelectItem key={s.value || "0"} value={s.value || "0"}>
              {s.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
