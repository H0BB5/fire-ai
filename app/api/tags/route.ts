import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const technician = await currentUser();
    const {
      frontTagSrc,
      // backTagSrc,
      businessName,
      customer,
      type,
      location,
      serial,
      rating,
      notes,
      // expiration
    } = body;
    const { address } = customer;
    console.log("[TAG_POST]", body);
    // check if technician is logged in
    if (!technician || !technician.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!businessName || !address || !type || !location || !serial || !rating) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    let technicianRecord = await prismadb.technician.findUnique({
      where: { email: technician.emailAddresses[0].emailAddress },
    });

    // Optionally create a Technician record if it doesn't exist
    if (!technicianRecord) {
      technicianRecord = await prismadb.technician.create({
        data: {
          technicianId: technician.id,
          firstName: technician.firstName || "Account has no name",
          email: technician.emailAddresses[0].emailAddress,
        },
      });
    }

    // Create the tag with either a new customer or connect to an existing one
    const tag = await prismadb.tag.create({
      data: {
        tagId: businessName,
        technician: {
          connect: { id: technicianRecord.id },
        },
        customer: {
          create: {
            customerId: businessName,
            businessName: businessName,
            address,
            technicianNotes: notes,
            technician: {
              connect: { id: technicianRecord.id },
            },
          },
        },
        businessName,
        type,
        location,
        serial,
        rating,
        frontTagSrc,
      },
    });

    return NextResponse.json(tag);
  } catch (error) {
    console.log("[TAG_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
