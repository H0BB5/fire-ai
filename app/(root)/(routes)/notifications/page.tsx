import { Tags } from "@/components/tags";
import { SearchInput } from "@/components/search-input";
import prismadb from "@/lib/prismadb";
import Customers from "@/components/customers";
import { MessageSquareDot } from "lucide-react";
import { DataTable } from "./data-table";

import { Notification, columns } from "./columns";

export const dynamic = "force-dynamic";
/**
 * This is the dashboard page.
 */
interface RootPageProps {
  searchParams: {
    tagId: string;
    name: string;
  };
}

interface NotificationTableProps {
  businessName: string;
  type: string;
  expirationDate: Date | string;
  status: string;
  createdAt: Date | string;
}

async function getData({ searchParams }: RootPageProps) {
  // Fetch data from your API here.
  const data = await prismadb.notification.findMany({
    where: {
      tagId: searchParams.tagId,
    },
    orderBy: {
      sendDate: "desc",
    },
    include: {
      tag: {
        select: {
          id: true,
          type: true,
          expirationDate: true,
          businessName: true,
          technician: {
            select: {
              email: true,
            },
          },
          notification: {
            select: {
              status: true,
              sendDate: true,
            },
          },
        },
      },
    },
  });

  return data.map((notification) => ({
    id: notification.id,
    businessName: notification.tag.businessName,
    email: notification.tag.technician.email,
    expirationDate: notification.tag.expirationDate.toISOString(), // Assuming you need ISO string format
    type: notification.tag.type,
    sendDate: notification.sendDate?.toISOString(),
    status: notification.status,
    tagId: notification.tag.id,
  }));
}

const RootPage = async ({ searchParams }: RootPageProps) => {
  // const data = await prismadb.notification.findMany({
  //   where: {
  //     customerId: searchParams.customerId,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });
  const data = await getData({ searchParams });

  return (
    <div className="h-full p-4 lg:px-8 lg:pt-6 space-y-2">
      <div className="mb-4">
        <h1 className="flex items-center font-medium text-xl md:text-2xl">
          <MessageSquareDot className="w-5 h-5 mr-2" /> Notifications
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here&rsquo;s a list of the collected Notifications.
        </p>
      </div>
      <div className="px-0 container mx-0 py-5 md:py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default RootPage;
RootPage.displayName = "Customers Dashboard Page";
