"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return <main className="mx-auto h-screen max-w-2xl">{children}</main>;
};

export default Wrapper;
