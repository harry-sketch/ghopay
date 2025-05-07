"use client";

import React from "react";
import { ThirdwebProvider } from "thirdweb/react";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <main className="mx-auto flex h-screen max-w-5xl flex-col items-center justify-center p-2">
      <ThirdwebProvider> {children}</ThirdwebProvider>
    </main>
  );
};

export default Wrapper;
