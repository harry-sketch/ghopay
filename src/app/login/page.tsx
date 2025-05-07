"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton, ThirdwebProvider } from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";

const Login = () => {
  const wallet = inAppWallet({
    auth: {
      mode: "popup", // options are "popup" | "redirect" | "window";
      options: ["email", "google"], // ex: ["discord", "farcaster", "apple", "facebook", "google", "passkey"],
      redirectUrl: "http://localhost:3000", // the URL to redirect to after authentication
    },
  });

  const client = createThirdwebClient({
    clientId: "11061b92f667a9945df17ac608a2e196",
  });

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

        <button
          type="button"
          onClick={() => router.push("/")}
          className="w-full cursor-pointer rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default Login;
