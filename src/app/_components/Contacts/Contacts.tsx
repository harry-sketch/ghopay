"use client";

import React, { useEffect, useState } from "react";
import {
  evmAddress,
  type Follower,
  type Username,
} from "@lens-protocol/client";
import { fetchFollowers, fetchUsernames } from "@lens-protocol/client/actions";
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
    return followers;
  } else {
    console.error("Error fetching followers:", result.error);
    return [];
  }
};

const Contacts = () => {
  const [followers, setFollowers] = useState<Follower[]>([]);
  const { data: authenticatedUser } = useAuthenticatedUser();

  const router = useRouter();

  const [searchVal, setSearchVal] = useState("");

  const [searchUserResult, setSearchUserResult] = useState<Username[]>([]);

  const handleSearch = async (searchUser: string) => {
    if (searchUser === "") {
      setSearchUserResult([]);
      return;
    }

    const resumed = await lensclient.resumeSession();

    if (resumed.isErr()) {
      return console.error(resumed.error);
    }

    const sessionClient = resumed.value;

    const result = await fetchUsernames(sessionClient, {
      filter: {
        localNameQuery: searchUser,
      },
    });

    if (result.isOk()) {
      const username: Username[] = [...result.value.items];
      setSearchUserResult(username);
    } else {
      console.error("Error fetching followers:", result.error);
      return [];
    }
  };

  useEffect(() => {
    void (async () => {
      if (authenticatedUser?.address) {
        const data = await fetchFollowersData(authenticatedUser.address);
        if (data) setFollowers(data);
      }
    })();
  }, [authenticatedUser?.address]);

  useEffect(() => {
    console.log({ searchUserResult });
  }, [searchUserResult]);

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

      <Login />

      <div className="my-4 flex items-center gap-1.5 rounded-lg border border-[#00D743]/80 bg-[#00D743]/50 px-2 py-3">
        <div>{commonIcons.search}</div>
        <input
          type="text"
          value={searchVal}
          onChange={async (e) => {
            setSearchVal(e.target.value);
            if (e.target.value.length > 0) {
              await handleSearch(e.target.value);
            }
          }}
          placeholder="search contacts.."
          className="w-full bg-transparent py-1 text-base font-medium text-black placeholder:text-black focus:outline-none"
        />
      </div>

      <div className="h-[26.5rem] overflow-y-auto rounded-lg bg-white">
        {searchUserResult.length > 0 &&
          searchUserResult?.map(({ localName, ownedBy, id }) => (
            <Link
              href={`/pay/${localName}?add=${ownedBy}`}
              key={`follower-${id}`}
              className="mb-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-1.5 transition-all duration-300 ease-in-out hover:bg-[#00D743] hover:text-white"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-400 text-xl capitalize">
                {localName.slice(0, 1)}
              </div>
              <div className="text-lg font-medium capitalize">{localName}</div>
            </Link>
          ))}
        {searchUserResult.length <= 0 &&
          followers.map(({ follower }) => (
            <Link
              href={`/pay/${follower.username?.localName}?pfp=${follower.metadata?.picture}&add=${follower.address}`}
              key={`follower-${follower.username?.id}`}
              className="mb-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-1.5 transition-all duration-300 ease-in-out hover:bg-[#00D743] hover:text-white"
            >
              {follower.metadata?.picture ? (
                <Image
                  src={follower.metadata?.picture as string}
                  alt={follower.metadata?.name ?? ""}
                  width={80}
                  height={80}
                  className="rounded-full object-contain"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-400 text-xl capitalize">
                  {follower.username?.localName.slice(0, 1)}
                </div>
              )}

              <div className="text-lg font-medium capitalize">
                {follower.username?.localName}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Contacts;
