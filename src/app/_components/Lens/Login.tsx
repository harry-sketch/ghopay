"use client";

import { Button } from "~/components/ui/button";
import { DialogTrigger } from "~/components/ui/dialog";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { AccountSelector } from "./Accounts";

export const Login = () => {
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const { data: authenticatedUser } = useAuthenticatedUser();
  console.log(authenticatedUser);

  return (
    <div className="mb-2 space-y-2 p-2">
      <ConnectKitButton.Custom>
        {({
          isConnected: isWalletConnected,
          show,
          truncatedAddress,
          ensName,
        }) => {
          const connectKitDisplayName = ensName ?? truncatedAddress;

          if (!isWalletConnected) {
            return (
              <>
                <Button onClick={show} className="w-full">
                  Connect Wallet
                </Button>
              </>
            );
          }

          if (isWalletConnected && !authenticatedUser) {
            return (
              <AccountSelector
                open={showAccountSelector}
                onOpenChange={setShowAccountSelector}
                trigger={
                  <DialogTrigger asChild>
                    <Button className="w-full">Sign in with Lens</Button>
                  </DialogTrigger>
                }
                onSuccess={() => {
                  console.log(authenticatedUser);
                }}
              />
            );
          }

          if (isWalletConnected && authenticatedUser) {
            const displayIdentity = connectKitDisplayName ?? "...";
            return (
              <div className="flex w-full items-center justify-between gap-2 text-sm">
                <span
                  className="text-muted-foreground truncate"
                  title={authenticatedUser.address}
                >
                  Signed in as:{" "}
                  <span className="text-primary font-semibold">
                    {displayIdentity}
                  </span>
                </span>
              </div>
            );
          }

          return (
            <p className="text-muted-foreground text-xs">Checking status...</p>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
};
