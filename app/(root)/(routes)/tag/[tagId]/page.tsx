import { TagForm } from "@/components/tag-form";
import prismadb from "@/lib/prismadb";

/**
 * This page is used to render the TagForm component.
 */
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
  const date = new Date();
  return (
    <>
      <TagForm initialData={customer} tags={tags} />
    </>
  );
};

export default TagIdPage;
