import { TagForm } from "@/components/tag-form";
import prismadb from "@/lib/prismadb";
import { DatePicker } from "../../components/sample-date-picker";
import { DatePicker as DatePickerB } from "../../components/date-picker";

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
      <div className="flex justify-between my-32">
        <DatePicker />
        <DatePickerB />
      </div>
      <TagForm initialData={customer} tags={tags} />
    </>
  );
};

export default TagIdPage;
