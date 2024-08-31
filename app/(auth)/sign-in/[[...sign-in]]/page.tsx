import { SignIn, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <h1 className="text-4xl font-extrabold">Welcome back!</h1>
          <p className="text-foreground/60">
            Log in to your account to continue.
          </p>
        </div>
        <div className="flex item-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-foreground/10 hidden lg:flex items-center justify-center">
        <Image
          src="/logo.svg"
          alt="logo"
          width="150"
          height="150"
          className="dark:invert"
        />
      </div>
    </div>
  );
}
