"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { ConnectButton } from "thirdweb/react";
import { client, wallet } from "~/server/web3/lib";

const Login = () => {
  const router = useRouter();

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

        {/* <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full cursor-pointer rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
        >
          Connect
        </button> */}

        <ConnectButton
          connectButton={{
            className: "custom-connect_btn",
          }}
          client={client}
          wallets={[wallet]}
          onConnect={() => router.push("/")}
        />
      </div>
    </div>
  );
};

export default Login;
