import { TagForm } from "@/components/tag-form";
import prismadb from "@/lib/prismadb";

interface TagIdProps {
  params: {
    tagId: string;
  };
}

const TagIdPage = async ({ params }: TagIdProps) => {
  const customer = await prismadb.tag.findUnique({
    where: {
      id: params.tagId,
    },
  });

  const tags = await prismadb.tag.findMany();
  return <TagForm initialData={customer} tags={tags} />;
};

export default TagIdPage;
