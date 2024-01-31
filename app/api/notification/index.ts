import { NextResponse } from "next/server";
import sendEmail from "./email";

export default async function handler() {
  const emailNotifications = await sendEmail();

  return new NextResponse(
    "[API_NOTIFICATIONS] Notifications sent!" +
      JSON.stringify(emailNotifications),
    {
      status: 200,
    }
  );
}
