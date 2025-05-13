"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useMobile } from "~/app/_hooks/useMobile";
import { useActiveAccount, useWalletBalance } from "thirdweb/react";
import { client } from "~/server/web3/client/client";
import { lens } from "~/server/web3/lib";

const Home = () => {
  const { isMobile } = useMobile();
  const gg = isMobile ? 4 : 7;

  const router = useRouter();

  const activeAccount = useActiveAccount();

  const { data } = useWalletBalance({
    address: activeAccount?.address,
    chain: lens,
    client: client,
  });

  console.log({ data });

  return (
    <main className="flex h-full w-full flex-col items-center px-2 py-10 md:h-screen md:px-0 md:py-20">
      <div className="flex w-full items-center justify-around gap-2">
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

        <div className="flex items-center gap-2 rounded-lg bg-[#E8FFB0] p-2">
          <div className="rounded-2xl bg-[#E7E34E] p-1.5 text-sm font-normal text-black">
            GP
          </div>
          <div className="text-base font-medium text-[#21701C]">1000</div>
        </div>
      </div>

      <div className="my-5 flex h-40 w-full flex-col items-center justify-center rounded-lg bg-[#BBF4CF] p-4 md:my-10">
        <div className="font-xl text-xl font-semibold capitalize">balance</div>
        <div className="mt-1 text-xl font-medium">{data?.displayValue} GHO</div>
      </div>

      <div className="flex w-full flex-col items-start capitalize">
        <div className="mb-2 text-xl font-medium capitalize">recent</div>
        <div className="grid grid-cols-5 gap-2 md:grid-cols-8">
          {Array.from({ length: gg }).map((_, i) => (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0FF99] p-2 text-black"
              key={i}
            >
              hh
            </div>
          ))}

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#005E0D] p-2 text-center text-xs text-white">
            View more
          </div>
        </div>
      </div>

      <div className="my-5 flex w-full items-center justify-center gap-2 md:my-10">
        <button
          onClick={() => router.push("/funds")}
          type="button"
          className="text-medium flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#BBF4CF] px-2.5 py-4 text-center text-xl text-[#095711] capitalize md:h-16"
        >
          deposit
        </button>
        <button
          onClick={() => router.push("/history")}
          type="button"
          className="text-medium flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#BBF4CF] px-2.5 py-4 text-center text-xl text-[#095711] capitalize md:h-16"
        >
          history
        </button>
      </div>

      <button
        onClick={() => router.push("/contacts")}
        type="button"
        className="mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#005E0D] p-4 text-lg font-medium text-white md:w-96"
      >
        Send GHO
      </button>
    </main>
  );
};

export default Home;
