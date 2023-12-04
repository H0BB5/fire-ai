import { imageOCR } from "./process-image";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  try {
    const body = await req.json();
    const { imageUrl } = body;
    const response = await imageOCR(imageUrl);

    return NextResponse.json(response);
  } catch (error) {
    console.log("[API_POST]", error);
    return NextResponse.json({ error: "Internal Error" });
  }
}
