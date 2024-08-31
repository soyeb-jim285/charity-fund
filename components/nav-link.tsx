"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

export const NavButton = ({ href, label, isActive }: Props) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        pathname === href ? "text-foreground" : "text-foreground/60",
      )}
    >
      {label}
    </Link>
  );
};
