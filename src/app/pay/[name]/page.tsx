"use client";

import Image from "next/image";
import React, { use } from "react";

type Params = Promise<{ name: string }>;

const PayName = ({ params }: { params: Params }) => {
  const param = use(params);

  return (
    <div className="flex h-full w-full flex-col items-center border pt-10 md:pt-20">
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
    </div>
  );
};

export default PayName;
