import UserForm from "@/components/UserForm";
import React from "react";
import DataTableSimple from "./DataTableSimple";
import prisma from "@/prisma/db";

const Users = async () => {
  const allUsers = await prisma.user.findMany();
  return (
    <>
      <UserForm />
      <h1 className="mt-10">User List</h1>
      <DataTableSimple users={allUsers} />
    </>
  );
};

export default Users;
