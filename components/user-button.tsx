import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Settings, UserIcon, Wallet } from "lucide-react";
import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from "@clerk/nextjs";
import { Button } from "./ui/button";

export async function UserButton() {
  const user = await currentUser();
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src={user?.imageUrl} />
              <AvatarFallback>{user?.fullName}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>{user?.fullName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href="/user-profile">
              <DropdownMenuItem>
                <UserIcon className="mr-2 h-4 w-4" />
                <span className="flex-1">Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/settings">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
            </Link>
            <Link href="/transactions">
              <DropdownMenuItem>
                <Wallet className="mr-2 h-4 w-4" />
                Transactions
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <SignOutButton>
              <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SignedIn>
    </div>
  );
}
