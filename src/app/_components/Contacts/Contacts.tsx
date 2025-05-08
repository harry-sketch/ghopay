"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useMobile } from "~/app/_hooks/useMobile";

const Contacts = () => {
  const { isMobile } = useMobile();
  const gg = isMobile ? 4 : 7;
  const [searchVal, setSearchVal] = useState("");

  const dummyContestArr = [
    { name: "harsh" },
    { name: "ramit" },
    { name: "deepso" },
  ] as const;

  return (
    <div className="flex h-full flex-col items-center px-2 py-10 md:py-20">
      <div className="mb-1 text-2xl font-medium text-[#005E0D]">
        Find Contacts
      </div>
      <input
        type="text"
        value={searchVal}
        placeholder="search contacts"
        onChange={(e) => setSearchVal(e.target.value)}
        className="w-full rounded-lg border border-[#5FE035] bg-[#D5FF7A] p-3 focus:outline-none md:w-96"
      />

      <div className="my-10 w-full">
        <div className="mb-4 text-start text-base font-medium">Pay Again</div>
        <div className="grid grid-cols-5 gap-2 md:grid-cols-8">
          {Array.from({ length: gg }).map((_, i) => (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0FF99] p-2 text-black"
              key={i}
            >
              hh
            </div>
          ))}
        </div>
      </div>

      <div className="w-full p-2">
        <div className="text-base font-medium">From Contacts</div>
        <div className="h-fit w-full overflow-y-auto md:h-96">
          {dummyContestArr.map(({ name }) => (
            <Link
              key={name}
              href={`/pay/${name}`}
              className="flex items-center gap-2"
            >
              <div>avatar</div>
              <div>{name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
