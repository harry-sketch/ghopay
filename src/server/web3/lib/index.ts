import { inAppWallet } from "thirdweb/wallets";
import { env } from "~/env";

export const wallet = inAppWallet({
  auth: {
    mode: "popup", // options are "popup" | "redirect" | "window";
    options: ["google", "email"], // ex: ["discord", "farcaster", "apple", "facebook", "google", "passkey"],
  },
  metadata: {
    name: "GhoPay",
  },
});

export const lens = {
  id: 232,
  name: "Lens Mainnet",
  nativeCurrency: { name: "GHO", symbol: "GHO", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        `https://232.rpc.thirdweb.com/${env.NEXT_PUBLIC_THIRDWEB_CLIENT}`,
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
