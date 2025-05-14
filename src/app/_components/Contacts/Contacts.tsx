"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMobile } from "~/app/_hooks/useMobile";
import { evmAddress } from "@lens-protocol/client";
import { fetchFollowers } from "@lens-protocol/client/actions";
import { lensclient } from "~/app/lens/client";
import { useAccount } from "wagmi";
import { log } from "console";

const useFollowers = async (address: string) => {
  const result = await fetchFollowers(lensclient, {
    account: evmAddress(address),
  });

  console.log({ result });
  return result;
};

const Contacts = () => {
  const { address } = useAccount();
  console.log({ address });

  const data = useFollowers(address!);

  const { isMobile } = useMobile();
  const gg = isMobile ? 4 : 7;
  const [searchVal, setSearchVal] = useState("");
  const [followers, setFollowers] = useState(null);

  const dummyContestArr = [
    { name: "harsh" },
    { name: "ramit" },
    { name: "deepso" },
    { name: "John Doe" },
    { name: "Jane Doe" },
    { name: "Dummy" },
    { name: "Abc" },
  ] as const;

  useEffect(() => {
    const getFollowers = async () => {
      console.log({ address });

      if (!address) return;
      try {
        const result = await fetchFollowers(lensclient, {
          account: evmAddress(address),
          filter: {
            graphs: [{ globalGraph: true }],
          },
        });
        console.log({ result });

        setFollowers(result);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    void getFollowers();
  }, [address]);

  console.log({ followers });

  return (
    // <div className="flex h-full flex-col px-2 py-10 md:px-0 md:py-20">
    //   <button
    //     onClick={() => router.push("/")}
    //     type="button"
    //     className="mb-2 ml-auto flex cursor-pointer items-center rounded-lg bg-black py-2 pr-2 text-white"
    //   >
    //     <div>{commonIcons["chevron-left"]}</div>
    //     <div>Go Back</div>
    //   </button>
    //   <div className="text-2xl font-semibold text-black">Search Contacts</div>

    //   <div className="mt-4">
    //     <div>recent</div>
    //   </div>

    //   <div className="my-4 flex items-center gap-1.5 rounded-lg border border-[#00D743]/80 bg-[#00D743]/50 px-2 py-3">
    //     <div>{commonIcons.search}</div>
    //     <input
    //       type="text"
    //       value={searchVal}
    //       onChange={(e) => setSearchVal(e.target.value)}
    //       placeholder="search contacts.."
    //       className="w-full bg-transparent py-1 text-base font-medium text-black placeholder:text-black focus:outline-none"
    //     />
    //   </div>

    //   <div className="h-[26.5rem] overflow-y-auto rounded-lg bg-white p-4">
    //     {dummyContestArr.map(({ name }) => (
    //       <Link
    //         href={`/pay/${name}?customBg=${encodeURIComponent(bg)}`}
    //         className="mb-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-1.5 transition-all duration-300 ease-in-out hover:bg-[#00D743] hover:text-white"
    //         key={name}
    //       >
    //         <div
    //           className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold uppercase"
    //           style={{
    //             backgroundColor: bg,
    //           }}
    //         >
    //           {name.slice(0, 1)}
    //         </div>
    //         <div className="text-lg font-medium capitalize">{name}</div>
    //       </Link>
    //     ))}
    //   </div>
    // </div>
    <div>ggg</div>
  );
};

export default Contacts;
