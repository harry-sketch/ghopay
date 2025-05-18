"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import QRCode from "react-qr-code";
import FundWallet from "../_components/FundWallet";
import { useActiveAccount } from "thirdweb/react";
import { commonIcons } from "../_assets/commonIcons";
import { useRouter } from "next/navigation";

const Page = () => {
  const [addFunds, setAddFunds] = useState(false);
  const [amount, setAmount] = useState("0");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const activeAccount = useActiveAccount();

  const address = activeAccount?.address ?? "";

  console.log(activeAccount?.address);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <div className="flex h-full w-full flex-col items-center px-2 py-10 md:py-20">
      {addFunds && <FundWallet amount={amount} />}

      {!addFunds && (
        <>
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
          <div className="my-5">
            <div className="rounded-2xl border-8 border-[#B3EE41] p-4">
              <QRCode
                size={300}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                value={address}
                viewBox={`0 0 500 500`}
              />
            </div>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            placeholder="enter amount"
            className="w-fit text-center text-4xl focus:outline-none"
          />

          <div className="mx-auto flex w-fit items-center justify-center gap-1 text-xl font-medium">
            <div className="mb-0.5">{amount}</div>
            <div className="text-center">GHO</div>
          </div>

          <button
            type="button"
            className="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
            onClick={() => setAddFunds(true)}
          >
            Add Funds
          </button>

          <button
            onClick={() => router.push("/")}
            type="button"
            className="mx-auto mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg p-4 text-lg font-medium text-black md:w-96"
          >
            <div>{commonIcons["chevron-left"]}</div>

            <div>Go Back</div>
          </button>
        </>
      )}
    </div>
  );
};

export default Page;
