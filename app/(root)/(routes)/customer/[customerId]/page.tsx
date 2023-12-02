import { TagForm } from "@/components/tag-form";
import prismadb from "@/lib/prismadb";

interface BusinessIdPageProps {
  params: {
    customerId: string;
  };
}

const CustomerIdPage = async ({ params }: BusinessIdPageProps) => {
  const customer = await prismadb.customer.findUnique({
    where: {
      id: params.customerId,
    },
  });

  const tags = await prismadb.tag.findMany();
  return <TagForm initialData={customer} tags={tags} />;
};

export default CustomerIdPage;
