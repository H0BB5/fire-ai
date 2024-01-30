import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();
const currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

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
    const customer = await prisma.customer.findUnique({
      where: { customerId: tag?.customerId },
    });
    let tagNumber = uuidv4();
    const msg = {
      from: "onboarding@resend.dev",
      to: `dylanjhobbs@gmail.com`,
      subject: `Tag is expiring for ${customer?.businessName} - ${tagNumber}`,
      html: `Your tag is expiring for ${customer?.businessName}\n\nPlease login to your account and contact the customer\n\nhttp://localhost:3000/tag/${tag?.id}`,
    };

    resend.emails.send(msg);

    // Update notification as sent
    await prisma.notification.update({
      where: { id: notification.id },
      data: { status: "Sent" },
    });
  }

  const smsNotifications = notifications.filter((n) => {
    return String(n.method).includes("sms");
  });

  console.log(emailNotifications);

  return new NextResponse("[API_NOTIFICATIONS] Notifications sent!", {
    status: 200,
  });
}
