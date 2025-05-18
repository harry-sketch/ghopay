"use client";

import { ThirdwebProvider } from "thirdweb/react";
import { LensProvider } from "@lens-protocol/react";
import { lensclient } from "./lens/client";
import { Web3Provider } from "./_provider/Web3Provider";

interface Props {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: Props) {
  return (
    <ThirdwebProvider>
      <LensProvider client={lensclient}>
        <Web3Provider>
          <main className="mx-auto h-full max-w-xl md:h-screen">
            {children}
          </main>
        </Web3Provider>
      </LensProvider>
    </ThirdwebProvider>
  );
}
