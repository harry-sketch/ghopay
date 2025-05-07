"use client";

import React from "react";
import { createThirdwebClient } from "thirdweb";
import { lightTheme, PayEmbed } from "thirdweb/react";

const FundWallet = () => {
  const client = createThirdwebClient({
    clientId: `${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}`,
  });

  const lens = {
    id: 232,
    name: "Lens Mainnet",
    nativeCurrency: { name: "GHO", symbol: "GHO", decimals: 18 },
    rpcUrls: {
      default: {
        http: [
          `https://232.rpc.thirdweb.com/${process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}`,
          "https://rpc.lens.xyz",
        ],
      },
    },
    rpc: "https://rpc.lens.xyz",
    blockExplorers: [
      {
        name: "Lens Block Explorer",
        url: "https://explorer.lens.xyz",
        apiUrl: "https://explorer.lens.xyz/api",
      },
    ],
  };

  return (
    <PayEmbed
      client={client}
      payOptions={{
        mode: "fund_wallet",
        metadata: {
          name: "Get funds",
        },
        prefillBuy: {
          chain: lens,
          amount: "0.01",
        },
        // ... theme, currency, amounts, payment methods, etc.
      }}
      theme={lightTheme({
        colors: { modalBg: "hsl(300, 20%, 99%)" },
      })}
    />
  );
};

export default FundWallet;
