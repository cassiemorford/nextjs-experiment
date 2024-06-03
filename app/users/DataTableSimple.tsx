import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
const userColumns = ["name", "username", "role"];

interface Props {
  users: User[];
}

const DataTableSimple = ({ users }: Props) => {
  return (
    <div>
      <Table className="rounded-t border">
        <TableHeader>
          <TableRow className="bg-secondary hover:bg-secondary">
            {userColumns.map((c) => (
              <TableHead>{c}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((u) => (
            <>
              <TableRow key={u.id}>
                <TableCell>
                  <Link href={`/users/${u.id}`}>{u.name}</Link>
                </TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.role}</TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DataTableSimple;
