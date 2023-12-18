import { Customer, Tag, Technician } from "@prisma/client";
import Image from "next/image";
import { Card, CardHeader, CardFooter } from "./ui/card";
import Link from "next/link";
import { Flame, MapPin, SquareUser, Tag as TagIcon, Tags } from "lucide-react";

interface CustomerProps {
  data: (Tag & {
    customer: Partial<Customer>;
    technician: Partial<Technician>;
  })[];
}

export const TagCards = ({ data }: CustomerProps) => {
  if (data.length === 0)
    return (
      <div className="pt-10 flex flex-col items-center justify-center space-y-3">
        <div className="relative w-60 h-60">
          <Image fill className="grayscale" alt="Empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground">No Tags found.</p>
      </div>
    );

  return (
    // This will be a map of customers - will have to do the same similarly for tags
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 pb-10">
      {data.map((item) => (
        <Card
          key={item.id}
          className="bg-card cursor-pointer shadow-md hover:opacity-75 hover:shadow-lg transition p-px rounded-lg border-gradient"
        >
          <Link href={`/tag/${item.id}`}>
            <div className="bg-card rounded-lg">
              <CardHeader className="flex items-center justify-center text-center text-muted-foreground pt-4 z-1">
                <span className="absolute top-3 right-3">
                  <TagIcon className="w-3 h-3" />
                </span>
                <p className="font-bold">{item.businessName}</p>
                <div className="relative w-32 h-32">
                  <div className="rounded-xl object-cover shadow-lg">
                    <Image
                      src={item.frontTagSrc}
                      fill
                      className="rounded-xl object-cover"
                      alt="customer"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex flex-col text-xs text-muted-foreground pb-4">
                <div className="w-full">
                  <p className="flex items-center text-xs">
                    <Flame className="w-3 h-3 mr-1" /> {item.type}
                  </p>
                  <p className="flex items-center text-xs mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    {item.location}
                  </p>

                  <div className="flex items-center">
                    {/* {item._count.tags > 1 ? (
                  <Tags className="w-3 h-3 mr-1" />
                ) : (
                  <TagIcon className="w-3 h-3 mr-1" />
                )} */}
                    {/* {item._count.tags} */}
                  </div>
                </div>
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};
