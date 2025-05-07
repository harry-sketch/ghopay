"use client";

import Image from "next/image";
import React from "react";
import QRCode from "react-qr-code";

const page = () => {
  return (
    <div className="flex h-full w-full flex-col items-center px-2 py-10 md:py-20">
      <div className="flex items-center gap-2">
        <Image
          src="/assets/Logo.png"
          alt="gopay"
          width={100}
          height={100}
          className="object-contain"
        />
        <div className="text-2xl font-bold text-[#00D743] md:text-4xl">
          GHOPay
        </div>
      </div>

      <div className="my-10">
        <div className="rounded-2xl border-8 border-[#B3EE41] p-4">
          <QRCode
            size={500}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={"gg"}
            viewBox={`0 0 500 500`}
          />
        </div>
      </div>

      <button
        type="button"
        className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
      >
        Add Funds
      </button>
    </div>
  );
};

export default page;
