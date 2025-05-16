"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMobile } from "~/app/_hooks/useMobile";
import {
  evmAddress,
  ResultAsync,
  UnexpectedError,
  type Follower,
  type Paginated,
} from "@lens-protocol/client";
import { fetchFollowers } from "@lens-protocol/client/actions";
import { lensclient } from "~/app/lens/client";
import { useAccount } from "wagmi";
import { log } from "console";
import { Login } from "../Lens/Login";
import { useAuthenticatedUser } from "@lens-protocol/react";
import router from "next/router";
import { commonIcons } from "~/app/_assets/commonIcons";

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
  const { data: authenticatedUser, loading: authUserLoading } =
    useAuthenticatedUser();

  const { isMobile } = useMobile();
  const gg = isMobile ? 4 : 7;
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

  return (
    <>
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

        <div className="h-[26.5rem] overflow-y-auto rounded-lg bg-white p-4">
          {followers.map(({ follower }, i) => {
            console.log({ follower });

            return <div key={i}>{follower.username?.localName}</div>;
          })}
        </div>
      </div>
      <div>
        <Login />
      </div>
    </>
  );
};

export default Contacts;
