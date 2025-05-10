"use client";

import React from "react";
import { lightTheme, PayEmbed } from "thirdweb/react";
import { lens } from "~/server/web3/lib";
import { client } from "~/server/web3/client/client";

const FundWallet = () => {
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
