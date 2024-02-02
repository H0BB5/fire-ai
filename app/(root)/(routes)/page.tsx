import { Tags } from "@/components/tags";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import { TagCards } from "@/components/tag-cards";
import { Tags as TagsIcon } from "lucide-react";

/**
 * This is the dashboard page.
 */
interface RootPageProps {
  searchParams: {
    tagId: string;
    name: string;
  };
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  const data = await prismadb.tag.findMany({
    where: {
      tagId: searchParams.tagId,
      businessName: {
        contains: searchParams.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      customer: {
        select: {
          address: true,
        },
      },
      _count: {
        select: {
          notification: true,
        },
      },
      notification: {
        select: {
          status: true,
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
          <TagsIcon className="w-5 h-5 lg:w-6 lg:h-6 mr-2" /> Fire Tags
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&rsquo;s a list of the collected customer tags
        </p>
      </div>
      <SearchInput />
      <Tags data={tags} />
      <TagCards data={data} />
    </div>
  );
};

export default RootPage;
RootPage.displayName = "Dashboard Page";
