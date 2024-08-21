"use client";
import { UserButton } from "@clerk/nextjs";
import { HeaderLogo } from "./header-logo";
import { Navigation } from "./navigation";
import { useState } from "react";

export const Header = () => {
  const [useLoggedIn, setUseLoggedIn] = useState(false);
  return (
    <header className="bg-gradient-to-b from-[#1e66f5] to-[#04a5e5] px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
};
