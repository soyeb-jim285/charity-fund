import Link from "next/link";
import { Button } from "./ui/button";

export const LoginSigninButton = () => {
  return (
    <div>
      <Button variant="secondary" className="mr-4">
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button variant="default">
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
};
