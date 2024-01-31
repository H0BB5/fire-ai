import { NextResponse } from "next/server";
import sendEmail from "../sendEmail";

export default async function GET() {
  try {
    const sentNotifications = await sendEmail();

    return new NextResponse(
      "[API_NOTIFICATIONS] Notifications sent!" +
        JSON.stringify(sentNotifications),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("[API_NOTIFICATIONS] Error sending notifications", {
      status: 500,
    });
  }
}
