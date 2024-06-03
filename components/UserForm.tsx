"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Role, User } from "@prisma/client";
import { userSchema } from "@/validationSchemas/users";

type UserFormData = z.infer<typeof userSchema>;

interface Props {
  user?: User;
}

const UserForm = ({ user }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  async function onSubmit(values: z.infer<typeof userSchema>) {
    console.log("submit");
    try {
      setIsSubmitting(true);
      if (user) {
        await axios.patch(`/api/users/${user.id}`, values);
      } else {
        await axios.post("/api/users", values);
      }
      setIsSubmitting(false);
      router.push("/tickets");
    } catch (error) {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            defaultValue={user?.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Full Name..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            defaultValue={user?.username}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    required={!user}
                    placeholder="Password..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex w-full space-x-4 py-4">
            <FormField
              control={form.control}
              defaultValue={user?.role}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          placeholder="Role..."
                          defaultValue={user?.role}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Role.ADMIN}>Admin</SelectItem>
                      <SelectItem value={Role.TECH}>Tech</SelectItem>
                      <SelectItem value={Role.USER}>User</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting}>
            Save
          </Button>
          {!!Object.keys(form.formState.errors).length && (
            <p>{JSON.stringify(form.formState.errors)}</p>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserForm;
