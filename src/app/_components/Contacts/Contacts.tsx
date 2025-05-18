"use client";

import React, { useEffect, useState } from "react";
import { evmAddress, type Follower } from "@lens-protocol/client";
import { fetchFollowers } from "@lens-protocol/client/actions";
import { lensclient } from "~/app/lens/client";
import { Login } from "../Lens/Login";
import { useAuthenticatedUser } from "@lens-protocol/react";
import { commonIcons } from "~/app/_assets/commonIcons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const fetchFollowersData = async (address: string) => {
  const resumed = await lensclient.resumeSession();

  if (resumed.isErr()) {
    return console.error(resumed.error);
  }

  const sessionClient = resumed.value;
  const result = await fetchFollowers(sessionClient, {
    account: evmAddress(address),
  });

  if (result.isOk()) {
    const followers: Follower[] = [...result.value.items];
    console.log({ followers });
    return followers;
  } else {
    console.error("Error fetching followers:", result.error);
    return [];
  }
};

const Contacts = () => {
  const [followers, setFollowers] = useState([] as Follower[]);
  const { data: authenticatedUser } = useAuthenticatedUser();

  const router = useRouter();

  const [searchVal, setSearchVal] = useState("");

  useEffect(() => {
    void (async () => {
      if (authenticatedUser?.address) {
        const data = await fetchFollowersData(authenticatedUser.address);
        console.log({ data });
        if (data) setFollowers(data);
      }
    })();
  }, [authenticatedUser?.address]);

  console.log({ followers });
  console.log({ authenticatedUser });

  return (
    <div className="flex h-full flex-col px-2 py-10 md:px-0 md:py-20">
      <button
        onClick={() => router.push("/")}
        type="button"
        className="mb-2 ml-auto flex cursor-pointer items-center rounded-lg bg-black py-2 pr-2 text-white"
      >
        <div>{commonIcons["chevron-left"]}</div>
        <div>Go Back</div>
      </button>
      <div className="text-2xl font-semibold text-black">Search Contacts</div>

      <div className="mt-4">
        <div>recent</div>
      </div>

      <div className="my-4 flex items-center gap-1.5 rounded-lg border border-[#00D743]/80 bg-[#00D743]/50 px-2 py-3">
        <div>{commonIcons.search}</div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="search contacts.."
          className="w-full bg-transparent py-1 text-base font-medium text-black placeholder:text-black focus:outline-none"
        />
      </div>

      <div className="h-[26.5rem] overflow-y-auto rounded-lg bg-white">
        {followers.map(({ follower }) => (
          <Link
            href={`/pay/${follower.username?.localName}?pfp=${follower.metadata?.picture}&add=${follower.address}`}
            key={`followr-${follower.username?.id}`}
            className="mb-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-1.5 transition-all duration-300 ease-in-out hover:bg-[#00D743] hover:text-white"
          >
            {follower.metadata?.picture && (
              <Image
                src={follower.metadata?.picture as string}
                alt={follower.metadata?.name ?? ""}
                width={80}
                height={80}
                className="rounded-full object-contain"
              />
            )}

            <div className="text-lg font-medium capitalize">
              {follower.username?.localName}
            </div>
          </Link>
        ))}
      </div>
    </div>
    // <div>
    //   <div className="flex h-full flex-col px-2 py-10 md:px-0 md:py-20">
    //     <button
    //       onClick={() => router.push("/")}
    //       type="button"
    //       className="mb-2 ml-auto flex cursor-pointer items-center rounded-lg bg-black py-2 pr-2 text-white"
    //     >
    //       <div>{commonIcons["chevron-left"]}</div>
    //       <div>Go Back</div>
    //     </button>
    //     <div className="text-2xl font-semibold text-black">Search Contacts</div>

    //     <div className="my-4 flex items-center gap-1.5 rounded-lg border border-[#00D743]/80 bg-[#00D743]/50 px-2 py-3">
    //       <div>{commonIcons.search}</div>
    //       <input
    //         type="text"
    //         value={searchVal}
    //         onChange={(e) => setSearchVal(e.target.value)}
    //         placeholder="search contacts.."
    //         className="w-full bg-transparent py-1 text-base font-medium text-black placeholder:text-black focus:outline-none"
    //       />
    //     </div>

    //     <div className="h-[26.5rem] overflow-y-auto rounded-lg bg-white p-4">
    //       {followers.map(({ follower }, i) => {
    //         console.log({ follower });

    //         return <div key={i}>{follower.username?.localName}</div>;
    //       })}
    //     </div>
    //   </div>
    //   <div>
    //     <Login />
    //   </div>
    // </div>
  );
};

export default Contacts;
