import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("[API_NOTIFICATIONS] Notifications sent!");
  const notifications = await prisma.notification.findMany({
    where: {
      sendDate: {
        equals: new Date(),
      },
    },
  });

  await Promise.all(
    notifications.map(async (notification) => {
      await prisma.notification.update({
        where: {
          id: notification.id,
        },
        data: {
          status: "Sent",
        },
      });
    })
  );

  res.status(200).json({ notifications });
}
