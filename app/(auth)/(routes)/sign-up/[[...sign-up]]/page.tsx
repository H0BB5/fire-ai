import React from "react";
import { SignUp } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col h-[100svh]">
      <div className="flex items-end h-1/6">
        <Image
          className="mx-auto mb-6 dark:block hidden"
          src={"/alexander-safety-logo-light.svg"}
          alt="Alexander Safety Logo"
          width={100}
          height={69}
        />
        <Image
          className="mx-auto mb-6 dark:hidden block"
          src={"/alexander-safety-logo-dark.svg"}
          alt="Alexander Safety Logo"
          width={100}
          height={69}
        />
      </div>
      <div className="h-5/6">
        <SignUp />
      </div>
    </div>
  );
}
