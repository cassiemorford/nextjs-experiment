"use client";

import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteButton = ({ ticketId }: { ticketId: number }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteTicket = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/tickets/${ticketId}`);
      router.push("/tickets");
      router.refresh();
    } catch {
      setIsDeleting(false);
      setError("Deletion failed, please try again");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        disabled={isDeleting}
        className={`mt-8 ${buttonVariants({ variant: "destructive" })}`}
      >
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your ticket.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={isDeleting} onClick={deleteTicket}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
        <p className="text-destructive">{error}</p>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
