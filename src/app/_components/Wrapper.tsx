"use client";

import React from "react";
import { ThirdwebProvider } from "thirdweb/react";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <main className="mx-auto h-full max-w-xl md:h-screen">{children}</main>
  );
};

export default Wrapper;
