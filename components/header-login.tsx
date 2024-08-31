"use client";
import { SignIn, UserButton, useUser } from "@clerk/nextjs";
import { LoginSigninButton } from "./login-signin-button";
import { Loader2 } from "lucide-react";

export const HeaderLogin = () => {
  const { isLoaded } = useUser();
  return (
    <div>
      {isLoaded ? (
        <LoginSigninButton />
      ) : (
        <Loader2 size="sm" className="animate-spin"></Loader2>
      )}
    </div>
  );
};
