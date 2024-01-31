import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
// pages/api/notification/route.ts

export const runtime = "edge";

const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

// sendDate should be 90 days before expiry date
// sendDate should be 30 days before expiry date
// sendDate should be 7 days before expiry date

export async function GET() {
  const notifications = await prisma.notification.findMany({
    where: {
      sendDate: {
        equals: currentDate,
      },
    },
  });

  const emailNotifications = notifications.filter((n) => {
    return String(n.method).includes("email");
  });

  for (const notification of emailNotifications) {
    const tag = await prisma.tag.findUnique({
      where: { id: notification.tagId },
    });
    const msg = {
      from: "onboarding@resend.dev",
      to: `dylanjhobbs@gmail.com`,
      subject: `[${tag?.businessName}] - Tag Expiring`,
      html: `Tag is expiring for ${tag?.businessName}\n\nPlease login to your account and contact the customer\n\nhttp://localhost:3000/tag/${tag?.id}`,
    };

    resend.emails.send(msg);

    // Update notification as sent
    await prisma.notification.update({
      where: { id: notification.id },
      data: { status: "Sent" },
    });
  }

  console.log(emailNotifications);

  return new NextResponse(
    "[API_NOTIFICATIONS] Notifications sent!" +
      JSON.stringify(emailNotifications),
    {
      status: 200,
    }
  );
}
