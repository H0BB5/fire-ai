import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import { startOfDay, formatISO } from "date-fns";

const resend = new Resend(process.env.RESEND_API_KEY);

const prisma = new PrismaClient();

const now = new Date();
const utcDate = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
);
const currentDate = startOfDay(utcDate);

console.log("TIMEZONE/CURRENT DAY SET", formatISO(currentDate));

export default async function sendEmail() {
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
