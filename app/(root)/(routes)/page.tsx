import { Tags } from "@/components/tags";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import Customers from "@/components/customers";

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
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Tags data={tags} />
      <Customers data={data} />
    </div>
  );
};

export default RootPage;
RootPage.displayName = "Dashboard Page";
