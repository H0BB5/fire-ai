import prismadb from "@/lib/prismadb";

export async function send() {
  // find all notifications that need to be sent today
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
      // send email
    }

    // send text
    if (notification.method === "sms") {
      // send text
    }
  }

  return { response: "[API_NOTIFICATIONS] Notifications sent!" };
}
