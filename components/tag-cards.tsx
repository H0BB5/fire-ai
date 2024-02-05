"use client";
import React from "react";

import { Customer, Tag, Technician } from "@prisma/client";
import Image from "next/image";
import { Card, CardHeader, CardFooter } from "./ui/card";
import Link from "next/link";
import { Flame, MapPin, Tag as TagIcon, Trash } from "lucide-react";

import { useRouter } from "next/navigation";

interface CustomerProps {
  data: (Tag & {
    customer: Partial<Customer>;
    technician: Partial<Technician>;
  })[];
  onDelete: (tagId: string) => void;
}

export const TagCards = ({ data, onDelete }: CustomerProps) => {
  const router = useRouter();

  if (data.length === 0)
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="grayscale" alt="Empty" src="/empty.png" />
        </div>
        <p className="text-sm text-foreground/80">No Tags found.</p>
      </div>
    );

  return (
    // This will be a map of customers - will have to do the same similarly for tags
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 pb-10">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-card cursor-pointer shadow-md hover:opacity-75 hover:shadow-lg transition p-px rounded-lg hover:rounded-sm border-gradient"
        >
          <Link href={`/tag/${item.id}`}>
            <div className="grid grid-rows-layout bg-card rounded-lg">
              <CardHeader className="text-center text-foreground/80 py-0 relative pt-3 px-3">
                <span className="absolute top-3 right-3">
                  <TagIcon className="w-3 h-3" />
                </span>
                <p className="font-semibold mt-0">{item.businessName}</p>
              </CardHeader>
              <div className="my-4 justify-self-center relative w-32 h-32">
                <div className="rounded-xl object-cover shadow-lg">
                  <Image
                    sizes={"w-auto h-full"}
                    src={item.frontTagSrc}
                    fill
                    className="rounded-xl"
                    alt="customer"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
              <CardFooter className="relative self-end text-xs text-foreground/80 pb-3 px-3">
                <div className="w-full">
                  <p className="flex items-center text-xs">
                    <Flame className="w-3 h-3 mr-1" /> {item.type}
                  </p>
                  <p className="flex items-start text-xs mt-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.customer.address}
                  </p>
                  <span
                    className="absolute bottom-3 right-3"
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(item.id);
                    }}
                  >
                    <Trash className="w-3 h-3" color={"tomato"} />
                  </span>
                  {/* <div className="flex items-center">
                    {item._count.tags > 1 ? (
                      <Tags className="w-3 h-3 mr-1" />
                    ) : (
                      <TagIcon className="w-3 h-3 mr-1" />
                    )}
                    {item._count.tags}
                  </div> */}
                </div>
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};
