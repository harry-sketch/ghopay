"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import React, { use, useEffect, useRef, useState } from "react";
import { prepareTransaction, sendTransaction } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { parseEther } from "viem";
import { commonIcons } from "~/app/_assets/commonIcons";
import { client } from "~/server/web3/client/client";
import { lens } from "~/server/web3/lib";

type Params = Promise<{ name: string }>;

const PayName = ({ params }: { params: Params }) => {
  const activeAccount = useActiveAccount();
  const param = use(params);

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const searchParam = useSearchParams();

  const customBg = searchParam.get("customBg") ?? "";

  const [amount, setAmount] = useState("0");

  const handleTxn = async (address: string, amount: string) => {
    const transaction = prepareTransaction({
      to: address,
      value: parseEther(amount),
      chain: lens,
      client: client,
    });

    if (activeAccount) {
      const res = await sendTransaction({
        transaction,
        account: activeAccount,
      });
      console.log({ res });
    }
    // add toast
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

        <input
          ref={inputRef}
          type="text"
          value={amount}
          onChange={(e) => {
            if (String(e.target.value) === "0") {
              return;
            }
            setAmount(String(e.target.value));
          }}
          placeholder="enter amount"
          className="my-5 w-fit text-center text-4xl focus:outline-none"
        />

        <div className="mx-auto flex w-fit items-center justify-center gap-1 text-xl font-medium">
          <div>{amount}</div>
          <div className="text-center">GHO</div>
        </div>
      </div>

      {/* add confirmation modal */}
      <button
        type="button"
        className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#00D743] p-4 text-lg font-medium text-white md:w-96"
        onClick={async () => {
          await handleTxn(
            "0x905040585A59C5B0E83Be2b247fC15a81FF4E533", // need to make it dynamic
            String(amount),
          );
        }}
      >
        Pay
      </button>

      <button
        onClick={() => router.push("/contacts")}
        type="button"
        className="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg p-4 text-lg font-medium text-black md:w-96"
      >
        <div>{commonIcons["chevron-left"]}</div>

        <div>Go Back</div>
      </button>
    </div>
  );
};

export default PayName;
