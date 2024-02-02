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
  // Get notifications for the day with tag included
  const notifications = await prisma.notification.findMany({
    where: {
      sendDate: {
        gte: currentDate,
        lt: nextDay,
      },
    },
    include: {
      tag: true,
    },
  });

  // Construct email data with notificationId included
  const emailData = notifications.map((notification) => ({
    to: "dylanjhobbs@gmail.com", // Consider making this dynamic based on the notification or related customer
    from: "onboarding@resend.dev",
    subject: `[${notification.tag.businessName}] - Upcoming Expiration`,
    html: `Expiration notice for ${notification.tag.businessName}\n\n
      Date of Expiration: ${notification.tag.expirationDate}\n
      Equipment Type: ${notification.tag.type}\n\n
      <a href="tags.alexandersafety.com/tag/${notification.tag.tagId}>View Tag</a>\n\n\n
      Please contact ${notification.tag.businessName} to schedule an inspection.`,
    notificationId: notification.id, // Include the notification ID for later update
  }));

  await Promise.all(
    emailData.map(async (email) => {
      try {
        await resend.emails.send({
          to: email.to,
          from: email.from,
          subject: email.subject,
          html: email.html,
        });

        // Update notification status to "Sent"
        await prisma.notification.update({
          where: { id: email.notificationId },
          data: { status: "Sent" },
        });
      } catch (error) {
        console.error(
          "Error sending email for notification ID " +
            email.notificationId +
            ":",
          error
        );
      }
    })
  );

  return notifications.length; // Return the count of processed notifications
}
