"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useState } from "react";
import { commonIcons } from "~/app/_assets/commonIcons";

type Params = Promise<{ name: string }>;

const PayName = ({ params }: { params: Params }) => {
  const param = use(params);

  const router = useRouter();

  const searchParam = useSearchParams();

  const customBg = searchParam.get("customBg") ?? "";

  const [amount, setAmount] = useState(0);

  return (
    <div className="px-2 py-10 md:px-0 md:py-20">
      <div className="flex items-center justify-center gap-2">
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

      <div className="mx-auto my-5 flex flex-col items-center justify-center md:my-10">
        <div
          style={{
            backgroundColor: customBg,
          }}
          className="flex h-28 w-28 items-center justify-center rounded-full text-center text-2xl font-bold text-black capitalize"
        >
          {param.name.slice(0, 1)}
        </div>
        <div className="mt-5 text-2xl font-semibold text-[#00D743] capitalize md:text-4xl">
          {param.name}
        </div>

        <div className="mx-auto my-4 flex items-center justify-center border-b text-lg font-medium">
          <div className="text-center">$</div>
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              if (isNaN(Number(e.target.value))) {
                return;
              }
              setAmount(Number(e.target.value));
            }}
            placeholder="enter amount"
            className="w-fit text-center focus:outline-none"
          />
        </div>

        <input
          type="text"
          placeholder="Add a note"
          className="mt-5 w-full border-b border-[#5FE035] focus:outline-none md:w-96"
        />
      </div>

      <button
        type="button"
        className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
      >
        Pay
      </button>

      <button
        onClick={() => router.push("/contacts")}
        type="button"
        className="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-black p-4 text-lg font-medium text-white md:w-96"
      >
        <div>{commonIcons["chevron-left"]}</div>

        <div>Go Back</div>
      </button>
    </div>
  );
};

export default PayName;
