"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { label: "Dashboard", href: "/" },
  { label: "Tickets", href: "/tickets" },
  { label: "Users", href: "/users" },
];

const MainNavLinks = () => {
  const currentPath = usePathname();
  return (
    <div className="flex flex-row items-center gap-2">
      {links.map(({ label, href }) => {
        return (
          <Link
            key={label}
            href={href}
            className={`navbar-link ${
              currentPath === href ? "cursor-default text-primary/70" : ""
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
};

export default MainNavLinks;
