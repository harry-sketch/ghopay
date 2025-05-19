"use client";

import React from "react";
import { commonIcons } from "~/app/_assets/commonIcons";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

const History = () => {
  const router = useRouter();

  // const fetchUserHandler = async (address: string) => {
  //   const resumed = await lensclient.resumeSession();

  //   if (resumed.isErr()) {
  //     return console.error(resumed.error);
  //   }

  //   const sessionClient = resumed.value;
  //   const result = await fetchAccount(sessionClient, {
  //     address: evmAddress(address),
  //   });
  //   if (result.isErr()) {
  //     return console.error(result.error);
  //   }

  //   if (result.isOk()) {
  //     return result.value;
  //   }
  // };

  const { data, isLoading } = api.transaction.allTransactions.useQuery();

  const allTransactions = data ?? [];

  return (
    <div className="px-2 py-10 md:px-0 md:py-20">
      <div className="flex items-center justify-between border-b border-black">
        <div className="text-2xl font-semibold text-black capitalize">
          history
        </div>
        <button
          onClick={() => router.push("/")}
          type="button"
          className="mb-2 ml-auto flex cursor-pointer items-center rounded-lg bg-black py-2 pr-2 text-white"
        >
          <div>{commonIcons["chevron-left"]}</div>
          <div>Go Back</div>
        </button>
      </div>

      <div className="mt-5 md:mt-10">
        {isLoading
          ? "loading..."
          : allTransactions.length > 0
            ? allTransactions.map(
                ({ amount, id, transactionHash, transactionTo }, i) => (
                  <div
                    className="mb-5 flex w-full items-center justify-between"
                    key={id}
                  >
                    <div className="flex items-center gap-2">
                      <div>{i + 1}.</div>

                      <div>
                        {`${transactionTo.slice(0, 5)}....${transactionTo.slice(-5)}`}
                      </div>
                    </div>

                    <div>
                      <div>{amount}</div>

                      <button
                        className="flex cursor-pointer items-center gap-1"
                        type="button"
                        onClick={() =>
                          window.open(
                            `https://explorer.lens.xyz/tx/${transactionHash}`,
                            "_blank",
                          )
                        }
                      >
                        <div>
                          {`${transactionHash.slice(0, 5)}....${transactionHash.slice(-5)}`}
                        </div>
                        <div>
                          <svg
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.2996 10V4M12.2996 4H6.29964M12.2996 4L4.46631 11.8333"
                              stroke="#000"
                              strokeOpacity="0.6"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </button>
                    </div>
                  </div>
                ),
              )
            : "no results found"}
      </div>
    </div>
  );
};

export default History;
