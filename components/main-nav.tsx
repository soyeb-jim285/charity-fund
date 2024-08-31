"use client";

import { usePathname } from "next/navigation";
import { NavButton } from "./nav-link";
import { HeaderLogo } from "./header-logo";

export const mainroutes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/funds",
    label: "Funds",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/about",
    label: "About",
  },
];
export function MainNav() {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <HeaderLogo />
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        {mainroutes.map((route) => (
          <NavButton
            key={route.href}
            href={route.href}
            label={route.label}
            isActive={pathname === route.href}
          />
        ))}
      </nav>
    </div>
  );
}
