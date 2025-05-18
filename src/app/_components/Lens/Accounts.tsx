/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useState } from "react";
import { type Account } from "@lens-protocol/client";
import { useLogin, useAccountsAvailable } from "@lens-protocol/react";
import { useAccount, useWalletClient } from "wagmi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../components/ui/avatar";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { useRouter } from "next/navigation";

interface AccountSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentAccount?: Account | null;
  onSuccess?: (account?: Account) => void;
  trigger?: React.ReactNode;
}

export function AccountSelector({
  open,
  onOpenChange,
  currentAccount = null,
  onSuccess,
  trigger,
}: AccountSelectorProps) {
  const { data: walletClient } = useWalletClient();
  const { data: availableAccounts, loading: accountsLoading } =
    useAccountsAvailable({ managedBy: walletClient?.account.address });
  const { execute: authenticate, loading: authenticateLoading } = useLogin();
  const router = useRouter();
  const wallet = useAccount();

  const handleSelectAccount = async (account: Account) => {
    if (!walletClient) return;
    try {
      const isOwner = wallet.address === account.owner;
      const authRequest = isOwner
        ? {
            accountOwner: {
              account: account?.address,
              app: "0x8A5Cc31180c37078e1EbA2A23c861Acf351a97cE",
              owner: walletClient.account.address,
            },
          }
        : {
            accountManager: {
              account: account.address,
              app: "0x8A5Cc31180c37078e1EbA2A23c861Acf351a97cE",
              manager: walletClient.account.address,
            },
          };

      await authenticate({
        ...authRequest,
        signMessage: async (message: string) => {
          return await walletClient.signMessage({ message });
        },
      });

      onOpenChange(false);

      const selectedAccount = availableAccounts?.items.find(
        (acc) => acc.account.address === account.address,
      )?.account;

      if (onSuccess) {
        onSuccess(selectedAccount);
      }

      router.refresh();
    } catch (error) {
      console.error("Lens authentication failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger}
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Lens Account</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[600px] py-4 pr-4">
          <div className="grid grid-cols-3 gap-2">
            {accountsLoading && (
              <div className="text-muted-foreground col-span-3 text-sm">
                Loading accounts...
              </div>
            )}
            {availableAccounts && availableAccounts.items.length === 0 && (
              <p className="text-muted-foreground col-span-3 text-sm">
                No Lens profiles found for this wallet.
              </p>
            )}
            {availableAccounts &&
              availableAccounts.items.length > 0 &&
              availableAccounts.items.map((acc) => {
                const isCurrentAccount = currentAccount
                  ? acc.account.address === currentAccount.address
                  : false;

                return (
                  <Button
                    key={acc.account.address}
                    variant="outline"
                    disabled={authenticateLoading || isCurrentAccount}
                    onClick={() => handleSelectAccount(acc.account)}
                    className="flex h-auto flex-col items-center px-2 py-3"
                  >
                    <Avatar className="mb-2 h-10 w-10">
                      <AvatarImage src={acc.account.metadata?.picture} />
                      <AvatarFallback>
                        {acc.account.username?.localName?.charAt(0) ??
                          acc.account.address.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="w-full truncate text-center text-xs">
                      {acc.account.username?.localName ?? acc.account.address}
                      {isCurrentAccount && (
                        <span className="text-muted-foreground block text-xs">
                          (current)
                        </span>
                      )}
                    </span>
                  </Button>
                );
              })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
