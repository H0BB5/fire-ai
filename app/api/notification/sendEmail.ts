import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();

const now = new Date();
const currentDate = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
);
const nextDay = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
);

console.log("TIMEZONE/CURRENT DAY SET", currentDate.toISOString());

export default async function sendEmail() {
  const notifications = await prisma.notification.findMany({
    where: {
      sendDate: {
        gte: currentDate,
        lt: nextDay,
      },
    },
  });

  const emailNotifications = notifications.filter((n) => {
    return String(n.method).includes("email");
  });

  let sentNotifications = [];
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

    sentNotifications.push(notification);
  }
  return sentNotifications;
}
