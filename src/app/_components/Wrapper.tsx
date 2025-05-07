"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <main className="mx-auto flex h-screen max-w-2xl flex-col items-center justify-center">
      {children}
    </main>
  );
};

export default Wrapper;
