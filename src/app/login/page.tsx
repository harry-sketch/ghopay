"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ConnectButton } from "thirdweb/react";
import { wallet } from "~/server/web3/lib";
import { client } from "~/server/web3/client/client";
import { api } from "../../trpc/react";
import { getUserEmail } from "thirdweb/wallets/in-app";

import { defineChain } from "thirdweb";

const Login = () => {
  const router = useRouter();

  const chain = defineChain(232);

  const { mutateAsync } = api.auth.login.useMutation({
    onSuccess: () => router.push("/"),
  });

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex h-72 w-full flex-col items-center justify-between p-2">
        <div className="flex items-center gap-3">
          <Image
            src="/assets/Logo.png"
            alt="gopay"
            width={100}
            height={100}
            className="object-contain"
          />

          <div className="text-4xl font-bold text-[#00D743]">GHOPay</div>
        </div>

        <ConnectButton
          connectButton={{
            className: "custom-connect_btn",
          }}
          chain={chain}
          client={client}
          wallets={[wallet]}
          onConnect={async (wallet) => {
            try {
              const account = wallet.getAccount();
              const email = await getUserEmail({ client });

              if (account && email) {
                await mutateAsync({
                  email: email,
                  walletAddress: account?.address,
                });
              }
            } catch (error) {
              console.log({ error });
            }
          }}
        />
      </div>
    </div>
  );
};

export default Login;
