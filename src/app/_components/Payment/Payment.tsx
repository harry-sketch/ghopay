"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import React, { use, useEffect, useRef, useState } from "react";
import { prepareTransaction, sendTransaction } from "thirdweb";
import { parseEther } from "viem";
import { commonIcons } from "~/app/_assets/commonIcons";
import { lens } from "~/server/web3/lib";
import { client } from "~/server/web3/client/client";
import { useActiveAccount } from "thirdweb/react";
import { useToast } from "~/app/_hooks/useToast";
import type { Params } from "../../pay/[name]/page";
import { api } from "~/trpc/react";

interface Props {
  params: Params;
  walletAddress: string;
}

const Payment: React.FC<Props> = ({ params, walletAddress }) => {
  const activeAccount = useActiveAccount();
  const param = use(params);

  const utils = api.useUtils();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync } = api.transaction.sendTransaction.useMutation({
    onSuccess: async () => {
      await utils.transaction.allTransactions.invalidate();
      await utils.goPoints.gData.invalidate();
    },
  });

  const { mutateAsync: addPointsMutation } = api.user.goPoints.useMutation();

  const { mutateAsync: goPointsMutation } = api.goPoints.goPoints.useMutation();

  const searchParam = useSearchParams();

  const pfp = searchParam.get("pfp") ?? "";

  const address = searchParam.get("add") ?? "";

  const [amount, setAmount] = useState("0");

  const handleTxn = async (address: string, amount: string) => {
    try {
      if (!activeAccount) return;

      setIsLoading(true);

      const transaction = prepareTransaction({
        to: address,
        value: parseEther(amount),
        chain: lens,
        client: client,
      });

      const res = await sendTransaction({
        transaction,
        account: activeAccount,
      });

      if (res.transactionHash) {
        await mutateAsync({
          amount,
          from: walletAddress,
          to: address,
          transactionHash: res.transactionHash,
        });

        const gpoints = Number(amount) * 0.1;

        await addPointsMutation({
          gpoints: String(gpoints),
        });

        await goPointsMutation({
          gplabel: "transaction",
          gpoints: String(gpoints),
        });

        toast.success({
          title: `transaction successfull`,
          message: `https://explorer.lens.xyz/tx/${res.transactionHash}`,
        });

        setIsLoading(false);
      }
    } catch (error) {
      console.log({ error });
      setIsLoading(false);
      toast.error({
        message: "error in sending gho",
        title: "error in sending gho",
      });
    }
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
        <div className="flex h-28 w-28 items-center justify-center rounded-full text-center text-2xl font-bold text-black capitalize">
          {pfp ? (
            <Image
              src={pfp}
              alt={"gg"}
              width={120}
              height={120}
              className="rounded-full object-contain"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-400 text-xl text-white capitalize">
              {param.name.slice(0, 1)}
            </div>
          )}
        </div>
        <div className="mt-5 text-2xl font-semibold text-[#00D743] capitalize md:text-4xl">
          {param.name}
        </div>

        <div className="mt-5 text-2xl font-semibold text-[#00D743] capitalize md:text-4xl">
          {`${address.slice(0, 5)}....${address.slice(-5)}`}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
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
        disabled={isLoading}
        onClick={async () => {
          console.log("started");
          await handleTxn(address, String(amount));
        }}
        type="button"
        className={`mx-auto flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#00D743] p-4 text-lg font-medium text-white md:w-96 ${isLoading && "opacity-50"}`}
      >
        {isLoading ? "please wait.." : "Pay"}
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

export default Payment;
