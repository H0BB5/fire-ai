import { Tags } from "@/components/tags";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";

const RootPage = async () => {
  const tags = await prismadb.tag.findMany({});

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Tags data={tags} />
    </div>
  );
};

export default RootPage;
