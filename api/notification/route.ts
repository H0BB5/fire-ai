import { NextRequest, NextResponse } from "next/server";
import sendEmail from "./sendEmail";

export const revalidate = 0;
export async function GET(request: NextRequest) {
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
