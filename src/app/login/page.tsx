"use client";

import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="flex h-72 w-full flex-col items-center justify-between">
      <div className="flex items-center gap-3">
        <Image
          src="/assets/Logo.png"
          alt="gopay"
          width={100}
          height={100}
          className="object-contain"
        />

        <div className="text-4xl font-bold font-medium text-[#00D743]">
          GHOPay
        </div>
      </div>

      <button
        type="button"
        className="w-full rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
      >
        Connect
      </button>
    </div>
  );
};

export default page;
