"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { commonIcons } from "~/app/_assets/commonIcons";
import { genRandomColors } from "~/app/_utils";
import { useRouter } from "next/navigation";

const Contacts = () => {
  const [bg, setBg] = useState<string>("");

  const router = useRouter();

  const [searchVal, setSearchVal] = useState("");

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
    setBg(genRandomColors());
  }, []);

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

      <div className="my-4 flex items-center gap-1.5 rounded-lg border border-green-400 bg-[#BBF4CF] px-2 py-3">
        <div>{commonIcons.search}</div>
        <input
          type="text"
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="search contacts.."
          className="w-full bg-transparent py-1 text-base font-medium text-black placeholder:text-black focus:outline-none"
        />
      </div>

      <div className="h-[26.5rem] overflow-y-auto rounded-lg bg-[#ccc]/10 p-4">
        {dummyContestArr.map(({ name }) => (
          <Link
            href={`/pay/${name}?customBg=${encodeURIComponent(bg)}`}
            className="mb-2 flex w-full cursor-pointer items-center gap-4 rounded-lg p-1.5 transition-all duration-300 ease-in-out hover:bg-[#E0FF99]"
            key={name}
          >
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold uppercase"
              style={{
                backgroundColor: bg,
              }}
            >
              {name.slice(0, 1)}
            </div>
            <div className="text-lg font-medium capitalize">{name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
