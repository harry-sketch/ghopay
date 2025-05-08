"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { use } from "react";

type Params = Promise<{ name: string }>;

const PayName = ({ params }: { params: Params }) => {
  const param = use(params);

  const router = useRouter();

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

      <div className="my-10 flex flex-col items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F29747] text-2xl font-medium capitalize">
          {param.name.slice(0, 1)}
        </div>

        <div className="md:text-4x mt-5 text-2xl font-semibold text-[#00D743] capitalize">
          {param.name}
        </div>
        <div className="md:text-4x my-5 text-center text-2xl font-semibold text-[#00D743]">
          $-
        </div>
        <input
          type="text"
          placeholder="Add a note"
          className="w-full border-b border-[#5FE035] focus:outline-none md:w-96"
        />
      </div>

      <button
        type="button"
        className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
      >
        Pay
      </button>

      <button
        onClick={() => router.push("/")}
        type="button"
        className="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-lg font-medium text-white md:w-96"
      >
        Go Back
      </button>
    </div>
  );
};

export default PayName;
