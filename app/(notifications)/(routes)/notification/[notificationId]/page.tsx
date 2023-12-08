import { auth, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";
import { NotificationClient } from "./components/client";

interface NotificationIdPageProps {
  params: {
    notificationId: string;
  };
}

const NotificationIdPage = async ({ params }: NotificationIdPageProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const tag = await prismadb.tag.findUnique({
    where: {
      id: params.notificationId,
    },
    include: {
      notification: {
        orderBy: {
          createdAt: "asc",
        },
      },
      _count: {
        select: {
          notification: true,
        },
      },
      technician: {
        select: {
          email: true,
        },
      },
    },
  });

  if (!tag) {
    return redirect("/");
  }

  return <NotificationClient tag={tag} />;
};

export default NotificationIdPage;
