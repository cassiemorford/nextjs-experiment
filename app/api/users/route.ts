import prisma from "@/prisma/db";
import { userSchema } from "@/validationSchemas/users";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import options from "../auth/[...nextauth]/options";
import { Role } from "@prisma/client";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session || session.user.role !== Role.ADMIN) {
    return NextResponse.json(
      { error: "User does not have the permissions to create a new user" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format, { status: 400 });
  }

  const duplicate = await prisma.user.findUnique({
    where: { username: body.username },
  });

  if (duplicate) {
    return NextResponse.json(
      { message: "Username is already taken" },
      { status: 409 }
    );
  }

  const hashPassword = await bcrypt.hash(body.password, 10);

  body.password = hashPassword;

  const newUser = await prisma.user.create({ data: { ...body } });

  return NextResponse.json(newUser, { status: 201 });
}
