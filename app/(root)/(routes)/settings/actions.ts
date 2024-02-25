"use server";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend("re_WEwgAD7K_3Zzz6TKVLdYeMR1qWdmDE8PH");
const prisma = new PrismaClient();

const now = new Date();
const currentDate = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
);
const nextDay = new Date(
  Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1)
);

interface TriggerCronProps {
  recipient: string;
}

const schema = z.object({
  email: z
    .string({
      invalid_type_error: "Recipient email address is required",
    })
    .email({
      message: "Invalid email address",
    }),
});

export async function onSubmit(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    console.log("ERRORS", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.success) {
    const recipient: string = validatedFields.data.email;
    const res = await TriggerCron({ recipient });
    console.log(res);
    return res;
  }
}

export const TriggerCron = async ({ recipient }: TriggerCronProps) => {
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
  const emailData = notifications.map((notification) => ({
    to: recipient,
    from: "onboarding@h0bb5.dev",
    subject: `[${notification.tag.businessName}] - Upcoming Expiration #${notification.id}`,
    html: `<h1>Expiration notice for ${notification.tag.businessName}</h1>
      <p>Date of Expiration: ${notification.tag.expirationDate}<p>
      <p>Equipment Type: ${notification.tag.type}</p>
      <p><a href="https://tags.alexandersafety.ca/tag/${notification.tag.id}">View Tag</a></p>
      <p>Please contact ${notification.tag.businessName} to schedule an inspection.</p>`,
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

        // Update notification status to "sent"
        await prisma.notification.update({
          where: { id: email.notificationId },
          data: { status: "sent" },
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

  return notifications.length;
};
