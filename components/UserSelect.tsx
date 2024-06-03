"use client";
import { Ticket, User } from "@prisma/client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import axios from "axios";

interface Props {
  ticket: Ticket;
  users: User[];
}

const UserSelect = ({ ticket, users }: Props) => {
  const [isAssigning, setIsAssigning] = useState(false);
  const [error, setError] = useState<String | undefined>(undefined);

  const assignTicket = async (userId: string) => {
    setError(undefined);
    setIsAssigning(true);
    try {
      await axios.patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null : userId,
      });
    } catch {
      setError("Unable to assign ticket");
    }
    setIsAssigning(false);
  };

  return (
    <Select
      defaultValue={ticket.assignedToUserId?.toString() || "0"}
      onValueChange={assignTicket}
      disabled={isAssigning}
    >
      <SelectTrigger>
        <SelectValue
          placeholder="select user"
          defaultValue={ticket.assignedToUserId?.toString() || "0"}
        ></SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="0">Unassign</SelectItem>
        {users.map((u) => (
          <SelectItem key={u.id} value={u.id.toString()}>
            {u.username}
          </SelectItem>
        ))}
      </SelectContent>
      <p>{error}</p>
    </Select>
  );
};

export default UserSelect;
