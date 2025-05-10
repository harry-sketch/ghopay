/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React from "react";
import { ThirdwebProvider } from "thirdweb/react";
import { LensProvider } from "@lens-protocol/react";
import { lensclient } from "../lens/client";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <main className="mx-auto h-full max-w-xl md:h-screen">
      <LensProvider client={lensclient}>{children}</LensProvider>
    </main>
  );
};

export default Wrapper;
