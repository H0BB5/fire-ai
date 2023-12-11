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
  const tag = await prismadb.tag.findUnique({
    where: {
      id: params.tagId,
    },
    include: {
      customer: true,
    },
  });

  return <TagForm initialData={tag} />;
};

export default TagIdPage;
TagIdPage.displayName = "Tag ID Page";
