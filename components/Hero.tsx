"use client";

import Link from "next/link";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

export function Hero() {
  const words = [
    {
      text: "Your",
    },
    {
      text: "digital",
    },
    {
      text: "vault,",
    },
    {
      text: "ByteBox.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="bg-slate-900  flex flex-col items-center justify-center h-[20rem]  ">
      <p className="text-neutral-200 text-xs sm:text-base  ">
      Store everything you need in one place
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
      <Link href="/dashboard" >
        <button  className="KeyButton w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        </Link>
        
      </div>
    </div>
  );
}
