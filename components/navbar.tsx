"use client";

import { Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileSidebar } from "./mobile-sidebar";
import { useTheme } from "next-themes";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

export const Navbar = () => {
  const { theme } = useTheme();
  console.log(theme);
  return (
    <div className="fixed w-full z-50 flex justify-between py-2 px-4 border-b border-primary/10 bg-background h-16">
      <MobileSidebar />

      <div className="flex items-center">
        <Link href="/">
          <Image
            className={"dark:block hidden"}
            src={"/alexander-safety-logo-light.svg"}
            alt="Alexander Safety Logo"
            width={75}
            height={52}
            priority={true}
          />
          <Image
            className={"dark:hidden block"}
            src={"/alexander-safety-logo-dark.svg"}
            alt="Alexander Safety Logo"
            width={75}
            height={52}
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
