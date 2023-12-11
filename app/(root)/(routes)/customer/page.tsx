import { Tags } from "@/components/tags";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import Customers from "@/components/customers";
import { Building2 } from "lucide-react";

/**
 * This is the dashboard page.
 */
interface RootPageProps {
  searchParams: {
    customerId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.customer.findMany({
    where: {
      customerId: searchParams.customerId,
      businessName: {
        contains: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          tags: true,
        },
      },
      technician: {
        select: {
          email: true,
        },
      },
    },
  });

  const tags = await prismadb.tag.findMany({});

  return (
    <div className="h-full p-4 lg:px-8 lg:pt-6 space-y-2">
      <div className="mb-4">
        <h1 className="flex items-center font-medium text-xl md:text-2xl">
          <Building2 className="w-5 h-5 mr-2" /> Businesses
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&rsquo;s a list of the collected businesses.
        </p>
      </div>
      <SearchInput />
      <Tags data={tags} />
      <Customers data={data} />
    </div>
  );
};

export default RootPage;
RootPage.displayName = "Customers Dashboard Page";
