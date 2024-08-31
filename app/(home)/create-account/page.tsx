"use client";

import { Separator } from "@/components/ui/separator";
import { CreateAccountForm } from "@/feature/accounts/components/createAccount-form";

export default function Page() {
  return (
    <div className="container">
      <div className="space-y-0.5">
        <h1 className="text-4xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-6" />
      <CreateAccountForm onSubmit={() => {}} />
    </div>
  );
}
