import { Customer, Technician } from "@prisma/client";
import Image from "next/image";
import { Card, CardHeader, CardFooter } from "./ui/card";
import Link from "next/link";
import { Building, SquareUser, Tag, Tags } from "lucide-react";

interface CustomerProps {
  data: (Customer & {
    _count: {
      tags: number;
    };
    technician: Partial<Technician>;
  })[];
}

export const customers = ({ data }: CustomerProps) => {
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
          className="bg-card rounded-lg cursor-pointer border shadow-md hover:opacity-75 hover:shadow-sm transition"
        >
          <Link href={`/customer/${item.id}`}>
            <div className="bg-card rounded-lg">
              <CardHeader className="flex items-center justify-center text-center text-muted-foreground relative">
                <span className="absolute top-3 right-3">
                  <Building className="w-3 h-3" />
                </span>
                <div className="relative w-32 h-32">
                  {/* // since customers have tags and tags have the images
                // we can style the image based off the customer details */}
                  <div className="rounded-xl object-cover">
                    {/* <Image
                  src={item.src}
                  fill
                  className="rounded-xl object-cover"
                  alt="customer"
                /> */}
                    <p className="font-bold">{item.businessName}</p>
                    <p className="text-xs">{item.address}</p>
                  </div>
                </div>
              </CardHeader>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <p className="lowercase flex items-center">
                  <SquareUser className="w-3 h-3 mr-1" />{" "}
                  {item.technician.email}
                </p>
                <div className="flex items-center">
                  {item._count.tags > 1 ? (
                    <Tags className="w-3 h-3 mr-1" />
                  ) : (
                    <Tag className="w-3 h-3 mr-1" />
                  )}
                  {item._count.tags}
                </div>
              </CardFooter>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};

export default customers;
