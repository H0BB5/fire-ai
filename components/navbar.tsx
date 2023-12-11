"use client";

import { Menu, Sparkles } from "lucide-react";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
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
            src="/alexander-safety.png"
            alt="Alexander Safety Logo"
            width={80}
            height={55}
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
