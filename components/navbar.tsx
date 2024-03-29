"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "./mobile-sidebar";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export const Navbar = () => {
  return (
    <div className="fixed w-full z-50 flex justify-between py-2 px-4 border-b border-primary/10 bg-background h-16">
      <MobileSidebar />

      <div className="flex items-center">
        <Link href="/">
          <Image
            className={"dark:block hidden h-auto"}
            src={"/alexander-safety-logo-light.svg"}
            alt="Alexander Safety Logo"
            width={58}
            height={40}
            priority={true}
          />
          <Image
            className={"dark:hidden block h-auto"}
            src={"/alexander-safety-logo-dark.svg"}
            alt="Alexander Safety Logo"
            width={58}
            height={40}
            priority={true}
          />
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};
