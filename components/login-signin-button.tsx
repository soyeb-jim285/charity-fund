import Link from "next/link";
import { Button } from "./ui/button";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export const LoginSigninButton = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <Button variant="default" size="sm" className="mr-2">
            Sign In
          </Button>
        </SignInButton>
        <SignUpButton>
          <Button variant="secondary" size="sm">
            Sign Up
          </Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <ClerkLoading>
          <Loader2 className="animate-spin" size="sm" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton />
        </ClerkLoaded>
      </SignedIn>
    </div>
  );
};
