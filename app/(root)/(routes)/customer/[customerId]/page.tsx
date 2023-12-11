import { CustomerForm } from "@/components/customer-form";
import prismadb from "@/lib/prismadb";

interface CustomerIdPageProps {
  params: {
    customerId: string;
  };
}

const CustomerIdPage = async ({ params }: CustomerIdPageProps) => {
  const customer = await prismadb.customer.findUnique({
    where: {
      id: params.customerId,
    },
  });

  const tags = await prismadb.tag.findMany();
  return <CustomerForm initialData={customer} tags={tags} />;
};

export default CustomerIdPage;
CustomerIdPage.displayName = "Customer ID Page";
