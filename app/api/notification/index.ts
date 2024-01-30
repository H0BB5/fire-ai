import { NextResponse } from "next/server";
import { sendEmail } from "./email";
import prismadb from "@/lib/prismadb";

export async function POST() {
  const notifications = await prismadb.notification.findMany({
    where: {
      sendDate: {
        equals: new Date(),
      },
    },
  });

  // send notifications with SendGrid and Twilio
  for (const notification of notifications) {
    console.log("sending notification", notification);

    // send email
    if (notification.method === "email") {
      const reminder = {
        title: notification.title,
        body: notification.body,
        status: notification.status,
      };
      await sendEmail(reminder);
    }

    // send text
    if (notification.method === "sms") {
      const reminder = {
        title: notification.title,
        body: notification.body,
        status: notification.status,
      };
      await sendEmail(reminder);
    }
  }

  // Send the notification
}
