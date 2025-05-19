"use client";

import React from "react";
import { PayEmbed } from "thirdweb/react";

import { client } from "~/server/web3/client/client";
import { defineChain, NATIVE_TOKEN_ADDRESS } from "thirdweb";

const lensChain = defineChain({ id: 232 });

interface FundWalletProps {
  amount: string;
  address: string;
}

const FundWallet = ({ amount, address }: FundWalletProps) => {
  return (
    <PayEmbed
      client={client}
      payOptions={{
        mode: "direct_payment",
        metadata: {
          name: "Get GHO on Lens Chain",
        },
        buyWithFiat: {
          preferredProvider: "STRIPE",

          // enable/disable test mode
        },
        buyWithCrypto: {
          // enable/disable test mode
        },
        paymentInfo: {
          chain: lensChain,

          // amount of token to buy
          amount: amount,

          // Lens Account address
          sellerAddress: address,

          token: {
            address: NATIVE_TOKEN_ADDRESS,
            name: "GHO",
            symbol: "GHO",
            icon: "https://explorer.lens.xyz/images/gho.png",
          },
        },
        onPurchaseSuccess: (purchase) => {
          console.log("Purchase success", purchase);
        },
      }}
    />
  );
};

export default FundWallet;
